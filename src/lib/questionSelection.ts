import { Question, QuestionDifficulty } from '../types/question';
import { ALL_QUESTIONS } from '../data/questions';
import { QuizMode } from '../types/progress';

export interface QuestionSelectionOptions {
  mode: QuizMode;
  topicId?: string;
  difficulty?: 'all' | QuestionDifficulty;
  count?: number;
  revisionQuestionIds?: string[];
}

export interface QuestionSelectionResult {
  questions: Question[];
  requestedCount: number;
  availableCount: number;
  notice?: string;
}

/**
 * Fisher-Yates shuffle for unbiased random shuffling.
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Selects questions according to mode, topic, difficulty, and requested count.
 */
export function selectQuestions(options: QuestionSelectionOptions): QuestionSelectionResult {
  const { mode, topicId, difficulty = 'all', count, revisionQuestionIds = [] } = options;

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
    // If not enough of exact difficulty, fall back to whole pool
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
    };
  }

  if (availableCount < targetCount) {
    notice = `This selection has ${availableCount} question${availableCount === 1 ? '' : 's'} available (fewer than the requested ${targetCount}). Using all available questions.`;
  }

  // Shuffle and take requested count without duplicates
  const shuffled = shuffleArray(pool);
  const selected = shuffled.slice(0, Math.min(targetCount, availableCount));

  return {
    questions: selected,
    requestedCount: targetCount,
    availableCount,
    notice,
  };
}
