import { Question } from '../types/question';

export interface AnswerEvaluation {
  isCorrect: boolean;
  isPartial: boolean;
  missedOptions?: string[];
  extraOptions?: string[];
  userSelection: string | string[];
}

/**
 * Evaluates a user answer against the question's correct answer.
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
    const correctAnswers = Array.isArray(question.correctAnswer)
      ? question.correctAnswer
      : [question.correctAnswer];
    const userAnswers = Array.isArray(selectedAnswer)
      ? selectedAnswer
      : [selectedAnswer];

    const correctSet = new Set(correctAnswers);
    const userSet = new Set(userAnswers);

    const missedOptions = correctAnswers.filter(ans => !userSet.has(ans));
    const extraOptions = userAnswers.filter(ans => !correctSet.has(ans));

    const isFullyCorrect = missedOptions.length === 0 && extraOptions.length === 0;
    const isPartial = !isFullyCorrect && userAnswers.some(ans => correctSet.has(ans));

    return {
      isCorrect: isFullyCorrect,
      isPartial,
      missedOptions,
      extraOptions,
      userSelection: userAnswers,
    };
  }

  // Single choice / code output / true_false / valid_method / etc.
  const expected = String(question.correctAnswer).trim();
  const actual = String(selectedAnswer).trim();
  const isCorrect = expected === actual;

  return {
    isCorrect,
    isPartial: false,
    userSelection: selectedAnswer,
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
