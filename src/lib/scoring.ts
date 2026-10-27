import { Question, QuestionOption } from '../types/question';

export interface AnswerEvaluation {
  isCorrect: boolean;
  isPartial: boolean;
  missedOptions?: string[];
  extraOptions?: string[];
  userSelection: string | string[];
  selectedText?: string | string[];
}

/**
 * Resolves option ID or text to option display text.
 */
export function resolveOptionText(options: QuestionOption[] | undefined, value: string): string {
  if (!options) return value;
  const found = options.find(opt => opt.id === value || opt.text === value);
  return found ? found.text : value;
}

/**
 * Evaluates a user answer against the question's correct option ID or answer text.
 * Compares stable option IDs when available, while maintaining fallback compatibility.
 */
export function checkAnswer(
  question: Question,
  selectedAnswer: string | string[] | undefined
): AnswerEvaluation {
  if (selectedAnswer === undefined || selectedAnswer === '') {
    return {
      isCorrect: false,
      isPartial: false,
      userSelection: selectedAnswer || '',
    };
  }

  // Handle multiple-answer questions
  if (question.questionType === 'multiple_choice') {
    const correctIds = Array.isArray(question.correctOptionId)
      ? question.correctOptionId
      : Array.isArray(question.correctAnswer)
      ? question.correctAnswer
      : [question.correctOptionId || question.correctAnswer];

    const userSelections = Array.isArray(selectedAnswer)
      ? selectedAnswer
      : [selectedAnswer];

    // Build sets matching either option ID or text
    const correctIdSet = new Set(correctIds);
    const correctTextSet = new Set(
      Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer]
    );

    // Check matches
    const isUserSelectionCorrect = (val: string) =>
      correctIdSet.has(val) || correctTextSet.has(val);

    const missed = correctIds
      .filter(id => {
        const optText = resolveOptionText(question.options, id);
        return !userSelections.includes(id) && !userSelections.includes(optText);
      })
      .map(id => resolveOptionText(question.options, id));

    const extra = userSelections
      .filter(val => !isUserSelectionCorrect(val))
      .map(val => resolveOptionText(question.options, val));

    const isFullyCorrect = missed.length === 0 && extra.length === 0;
    const isPartial = !isFullyCorrect && userSelections.some(val => isUserSelectionCorrect(val));

    return {
      isCorrect: isFullyCorrect,
      isPartial,
      missedOptions: missed,
      extraOptions: extra,
      userSelection: userSelections,
      selectedText: userSelections.map(val => resolveOptionText(question.options, val)),
    };
  }

  // Single choice / code output / true_false / valid_method
  const userVal = String(selectedAnswer).trim();
  const correctId = String(question.correctOptionId || '').trim();
  const correctText = String(question.correctAnswer || '').trim();

  // Answer is correct if it matches the correctOptionId OR correctAnswer text
  const isCorrect = userVal === correctId || userVal === correctText;

  return {
    isCorrect,
    isPartial: false,
    userSelection: selectedAnswer,
    selectedText: resolveOptionText(question.options, userVal),
  };
}

/**
 * Calculates percentage accuracy safely, returning 0 if total is 0.
 * Prevents NaN or division by zero errors.
 */
export function calculateAccuracy(correct: number, total: number): number {
  if (!total || total <= 0) return 0;
  if (!correct || correct <= 0) return 0;
  const percentage = (correct / total) * 100;
  return Math.min(100, Math.round(percentage * 10) / 10);
}

/**
 * Formats seconds into MM:SS display.
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
