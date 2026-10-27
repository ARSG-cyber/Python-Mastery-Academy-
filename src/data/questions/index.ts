import { Question, QuestionOption, RawQuestion, QuestionValidationResult } from '../../types/question';
import { STRING_QUESTIONS } from './stringMethods';
import { FUNDAMENTALS_QUESTIONS } from './pythonFundamentals';
import { CONTROL_FLOW_AND_COLLECTIONS_QUESTIONS } from './controlFlowAndCollections';

/**
 * Normalizes a question to ensure stable option IDs and correctOptionId are consistently defined.
 * If options are strings, generates stable deterministic IDs and maps correctOptionId.
 */
export function normalizeQuestion(raw: RawQuestion): Question {
  const q = { ...raw };

  if (Array.isArray(q.options) && q.options.length > 0) {
    const normalizedOptions: QuestionOption[] = q.options.map((opt: any, index: number) => {
      if (typeof opt === 'object' && opt !== null && 'id' in opt && 'text' in opt) {
        return opt as QuestionOption;
      }
      // Generate clean stable ID from text or fallback index
      const text = String(opt);
      const slug = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 24);
      const id = slug ? `${q.id}_${slug}_${index}` : `${q.id}_opt_${index}`;
      return { id, text };
    });

    q.options = normalizedOptions;

    // Resolve correctOptionId
    if (!q.correctOptionId) {
      if (q.questionType === 'multiple_choice') {
        const targetTexts = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
        q.correctOptionId = normalizedOptions
          .filter(opt => targetTexts.includes(opt.text))
          .map(opt => opt.id);
      } else {
        const targetText = String(q.correctAnswer).trim();
        const found = normalizedOptions.find(opt => opt.text.trim() === targetText);
        q.correctOptionId = found ? found.id : normalizedOptions[0].id;
      }
    }
  }

  return q as Question;
}

const RAW_QUESTIONS: RawQuestion[] = [
  ...STRING_QUESTIONS,
  ...FUNDAMENTALS_QUESTIONS,
  ...CONTROL_FLOW_AND_COLLECTIONS_QUESTIONS
];

export const ALL_QUESTIONS: Question[] = RAW_QUESTIONS.map(normalizeQuestion);

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
 * Validates the question bank integrity and checks option ID consistency.
 * Analyzes authored answer distribution and verifies hints.
 */
export function validateQuestionBank(questions: Question[] = ALL_QUESTIONS): QuestionValidationResult {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const positionCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0 };
  let totalEvaluated = 0;

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

    if (!q.hint || q.hint.trim() === '') {
      errors.push(`Question "${q.id}" is missing a pedagogical hint.`);
    }

    // Options validation
    if (q.options && q.options.length > 0) {
      const optionIds = new Set<string>();
      for (const opt of q.options) {
        if (!opt.id || opt.id.trim() === '') {
          errors.push(`Question "${q.id}" has an option with missing or empty ID.`);
        }
        if (optionIds.has(opt.id)) {
          errors.push(`Question "${q.id}" has duplicate option ID "${opt.id}".`);
        }
        optionIds.add(opt.id);
      }

      // Check correctOptionId
      if (q.questionType === 'multiple_choice') {
        const rawIds = Array.isArray(q.correctOptionId) ? q.correctOptionId : [q.correctOptionId];
        const correctIds = rawIds.filter((id): id is string => typeof id === 'string' && id.length > 0);
        if (correctIds.length === 0) {
          errors.push(`Multiple-choice question "${q.id}" correctOptionId must be a non-empty array.`);
        }
        for (const cid of correctIds) {
          if (!optionIds.has(cid)) {
            errors.push(`Question "${q.id}" correct option ID "${cid}" not found in options.`);
          }
        }
      } else {
        const correctId = String(q.correctOptionId || '');
        if (!optionIds.has(correctId)) {
          errors.push(`Question "${q.id}" correct option ID "${correctId}" not found in options.`);
        } else {
          // Track position in authored list
          const authoredIndex = q.options.findIndex(opt => opt.id === correctId);
          if (authoredIndex >= 0) {
            positionCounts[authoredIndex] = (positionCounts[authoredIndex] || 0) + 1;
            totalEvaluated++;
          }
        }
      }
    }

    // Code output checks
    if (q.questionType === 'code_output' && !q.codeSnippet) {
      errors.push(`Question "${q.id}" has type code_output but is missing codeSnippet.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    distribution: {
      totalEvaluated,
      positionCounts,
    },
  };
}

// Development validation log
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  const validation = validateQuestionBank();
  if (!validation.isValid) {
    console.warn('⚠️ [Question Bank Validation Errors]:', validation.errors);
  } else {
    console.info(`✅ [Question Bank Loaded]: ${ALL_QUESTIONS.length} questions verified with stable option IDs.`);
  }
}
