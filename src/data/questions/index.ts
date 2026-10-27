import { Question, QuestionValidationResult } from '../../types/question';
import { STRING_QUESTIONS } from './stringMethods';
import { FUNDAMENTALS_QUESTIONS } from './pythonFundamentals';
import { CONTROL_FLOW_AND_COLLECTIONS_QUESTIONS } from './controlFlowAndCollections';

export const ALL_QUESTIONS: Question[] = [
  ...STRING_QUESTIONS,
  ...FUNDAMENTALS_QUESTIONS,
  ...CONTROL_FLOW_AND_COLLECTIONS_QUESTIONS
];

export const QUESTION_MAP: Map<string, Question> = new Map(
  ALL_QUESTIONS.map(q => [q.id, q])
);

export function getQuestionsByTopic(topicId: string): Question[] {
  return ALL_QUESTIONS.filter(q => q.topicId === topicId);
}

export function getQuestionById(id: string): Question | undefined {
  return QUESTION_MAP.get(id);
}

/**
 * Validates the question bank integrity.
 * Ensures all questions follow strict schema rules and no duplicate IDs exist.
 */
export function validateQuestionBank(questions: Question[] = ALL_QUESTIONS): QuestionValidationResult {
  const errors: string[] = [];
  const seenIds = new Set<string>();

  for (const q of questions) {
    if (!q.id) {
      errors.push(`Question missing ID: ${JSON.stringify(q)}`);
      continue;
    }

    if (seenIds.has(q.id)) {
      errors.push(`Duplicate question ID detected: "${q.id}"`);
    }
    seenIds.add(q.id);

    if (!q.topicId) {
      errors.push(`Question "${q.id}" is missing topicId.`);
    }

    if (!q.questionText || q.questionText.trim() === '') {
      errors.push(`Question "${q.id}" is missing questionText.`);
    }

    if (!q.explanation || q.explanation.trim() === '') {
      errors.push(`Question "${q.id}" is missing explanation.`);
    }

    // Type specific checks
    if (q.questionType === 'multiple_choice') {
      if (!Array.isArray(q.correctAnswer) || q.correctAnswer.length === 0) {
        errors.push(`Multiple-choice question "${q.id}" correctAnswer must be a non-empty array of strings.`);
      } else if (q.options) {
        for (const ans of q.correctAnswer) {
          if (!q.options.includes(ans)) {
            errors.push(`Question "${q.id}" correct answer "${ans}" not found in options: ${q.options.join(', ')}`);
          }
        }
      }
    } else {
      // Single choice, code output, true/false, etc.
      if (typeof q.correctAnswer !== 'string' || q.correctAnswer.trim() === '') {
        errors.push(`Single-answer question "${q.id}" correctAnswer must be a non-empty string.`);
      } else if (q.options && q.options.length > 0) {
        if (!q.options.includes(q.correctAnswer)) {
          errors.push(`Question "${q.id}" correct answer "${q.correctAnswer}" not found in options: ${q.options.join(', ')}`);
        }
      }
    }

    // Check code output
    if (q.questionType === 'code_output' && !q.codeSnippet) {
      errors.push(`Question "${q.id}" has type code_output but is missing codeSnippet.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Development validation log
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  const validation = validateQuestionBank();
  if (!validation.isValid) {
    console.error('⚠️ [Question Bank Validation Errors]:', validation.errors);
  } else {
    console.info(`✅ [Question Bank Loaded]: ${ALL_QUESTIONS.length} questions verified.`);
  }
}
