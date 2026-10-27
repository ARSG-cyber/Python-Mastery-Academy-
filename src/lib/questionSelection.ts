import { Question, QuestionDifficulty, QuestionOption } from '../types/question';
import { ALL_QUESTIONS } from '../data/questions';
import { QuizMode } from '../types/progress';

export interface QuestionSelectionOptions {
  mode: QuizMode;
  topicId?: string;
  difficulty?: 'all' | QuestionDifficulty;
  count?: number;
  revisionQuestionIds?: string[];
  rng?: () => number;
}

export interface QuestionSelectionResult {
  questions: Question[];
  requestedCount: number;
  availableCount: number;
  notice?: string;
  displayedOptions: Record<string, QuestionOption[]>;
}

/**
 * Unbiased Fisher-Yates shuffle algorithm.
 * Accepts an optional injectable RNG for deterministic testing.
 * Never mutates the source array.
 */
export function shuffleArray<T>(array: readonly T[], rng: () => number = Math.random): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Returns options prepared for display.
 * Shuffles choice-based questions with Fisher-Yates while preserving true/false order.
 */
export function getDisplayOptions(
  question: Question,
  rng: () => number = Math.random
): QuestionOption[] {
  if (!question.options || question.options.length === 0) {
    return [];
  }

  // Preserve conventional True/False order
  if (question.questionType === 'true_false') {
    return [...question.options];
  }

  // Unbiased shuffle for multiple-choice and other choice questions
  return shuffleArray(question.options, rng);
}

/**
 * Selects questions according to mode, topic, difficulty, and requested count.
 * Generates pre-shuffled display options for each question so display order remains
 * stable throughout the session navigation.
 */
export function selectQuestions(options: QuestionSelectionOptions): QuestionSelectionResult {
  const { mode, topicId, difficulty = 'all', count, revisionQuestionIds = [], rng = Math.random } = options;

  let pool: Question[] = [];

  // 1. Revision Mode
  if (mode === 'revision') {
    const revisionSet = new Set(revisionQuestionIds);
    pool = ALL_QUESTIONS.filter(q => revisionSet.has(q.id));
  } else if (topicId && topicId !== 'all') {
    // 2. Specific Topic Practice
    pool = ALL_QUESTIONS.filter(q => q.topicId === topicId);
  } else {
    // 3. Mixed / All topics
    pool = [...ALL_QUESTIONS];
  }

  // Filter by difficulty if not 'all' or in challenge mode
  if (mode === 'challenge') {
    const hardQuestions = pool.filter(q => q.difficulty === 'advanced' || q.difficulty === 'intermediate');
    pool = hardQuestions.length > 0 ? hardQuestions : pool;
  } else if (difficulty && difficulty !== 'all') {
    const filtered = pool.filter(q => q.difficulty === difficulty);
    if (filtered.length >= 3) {
      pool = filtered;
    }
  }

  // Determine target count
  let targetCount = 10;
  if (count && count > 0) {
    targetCount = count;
  } else {
    switch (mode) {
      case 'learn':
        targetCount = 10;
        break;
      case 'practice':
        targetCount = 15;
        break;
      case 'exam':
        targetCount = 20;
        break;
      case 'quick':
        targetCount = 10;
        break;
      case 'standard':
        targetCount = 20;
        break;
      case 'deep':
        targetCount = 50;
        break;
      case 'challenge':
        targetCount = 15;
        break;
      case 'revision':
        targetCount = Math.max(1, Math.min(pool.length, 20));
        break;
      default:
        targetCount = 10;
        break;
    }
  }

  const availableCount = pool.length;
  let notice: string | undefined;

  if (availableCount === 0) {
    return {
      questions: [],
      requestedCount: targetCount,
      availableCount: 0,
      notice: 'No questions currently available matching the selected criteria.',
      displayedOptions: {},
    };
  }

  if (availableCount < targetCount) {
    notice = `This selection has ${availableCount} question${availableCount === 1 ? '' : 's'} available (fewer than the requested ${targetCount}). Using all available questions.`;
  }

  // Shuffle questions order
  const shuffledQuestions = shuffleArray(pool, rng);
  const selected = shuffledQuestions.slice(0, Math.min(targetCount, availableCount));

  // Generate shuffled options for each question
  const displayedOptions: Record<string, QuestionOption[]> = {};
  for (const q of selected) {
    displayedOptions[q.id] = getDisplayOptions(q, rng);
  }

  return {
    questions: selected,
    requestedCount: targetCount,
    availableCount,
    notice,
    displayedOptions,
  };
}
