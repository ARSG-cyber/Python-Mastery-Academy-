import {
  LearnerProgressData,
  QuizAttemptRecord,
  ActiveQuizSession,
  UserSettings,
  MistakeEntry
} from '../types/progress';

export const STORAGE_KEY = 'python_mastery_academy_progress_v1';
export const CURRENT_SCHEMA_VERSION = 1;

export const DEFAULT_USER_SETTINGS: UserSettings = {
  theme: 'light',
  soundEnabled: true,
  preferredQuestionCount: 10,
  defaultDifficulty: 'all',
  immediateFeedback: true,
  hintsEnabled: true,
  timerEnabled: false,
  timerDurationMinutes: 10,
};

export const INITIAL_PROGRESS_DATA: LearnerProgressData = {
  schemaVersion: CURRENT_SCHEMA_VERSION,
  lastUpdated: new Date().toISOString(),
  streak: {
    currentStreak: 0,
    bestStreak: 0,
    lastActiveDate: null,
  },
  totalAnswered: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  totalSkipped: 0,
  topicStats: {},
  mistakes: {},
  quizHistory: [],
  activeQuiz: null,
  settings: DEFAULT_USER_SETTINGS,
};

/**
 * Calculates updated learning streak based on today's date and the last active date.
 */
export function updateStreak(currentStreak: { currentStreak: number; bestStreak: number; lastActiveDate: string | null }): {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
} {
  const today = new Date().toISOString().slice(0, 10);
  if (!currentStreak.lastActiveDate) {
    return {
      currentStreak: 1,
      bestStreak: Math.max(1, currentStreak.bestStreak),
      lastActiveDate: today,
    };
  }

  const lastDate = currentStreak.lastActiveDate.slice(0, 10);
  if (lastDate === today) {
    return {
      ...currentStreak,
      lastActiveDate: today,
    };
  }

  const last = new Date(lastDate);
  const now = new Date(today);
  const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));

  if (diffDays === 1) {
    const newStreak = currentStreak.currentStreak + 1;
    return {
      currentStreak: newStreak,
      bestStreak: Math.max(newStreak, currentStreak.bestStreak),
      lastActiveDate: today,
    };
  }

  // Streak broken if diffDays > 1
  return {
    currentStreak: 1,
    bestStreak: currentStreak.bestStreak,
    lastActiveDate: today,
  };
}

/**
 * Safely loads learner progress data from localStorage.
 * Recovers gracefully from corrupted data or missing properties.
 */
export function loadProgress(): LearnerProgressData {
  if (typeof window === 'undefined') {
    return { ...INITIAL_PROGRESS_DATA };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...INITIAL_PROGRESS_DATA };
    }

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      console.warn('Malformed progress data in localStorage. Resetting to defaults.');
      return { ...INITIAL_PROGRESS_DATA };
    }

    // Merge with defaults to ensure all fields exist even if previous schema had fewer properties
    const merged: LearnerProgressData = {
      schemaVersion: parsed.schemaVersion ?? CURRENT_SCHEMA_VERSION,
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      streak: {
        currentStreak: Number(parsed.streak?.currentStreak) || 0,
        bestStreak: Number(parsed.streak?.bestStreak) || 0,
        lastActiveDate: parsed.streak?.lastActiveDate || null,
      },
      totalAnswered: Number(parsed.totalAnswered) || 0,
      totalCorrect: Number(parsed.totalCorrect) || 0,
      totalIncorrect: Number(parsed.totalIncorrect) || 0,
      totalSkipped: Number(parsed.totalSkipped) || 0,
      topicStats: parsed.topicStats && typeof parsed.topicStats === 'object' ? parsed.topicStats : {},
      mistakes: parsed.mistakes && typeof parsed.mistakes === 'object' ? parsed.mistakes : {},
      quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
      activeQuiz: parsed.activeQuiz && typeof parsed.activeQuiz === 'object' ? parsed.activeQuiz : null,
      settings: {
        ...DEFAULT_USER_SETTINGS,
        ...(parsed.settings && typeof parsed.settings === 'object' ? parsed.settings : {}),
      },
    };

    return merged;
  } catch (err) {
    console.error('Failed to parse localStorage progress data:', err);
    return { ...INITIAL_PROGRESS_DATA };
  }
}

/**
 * Persists learner progress data to localStorage safely.
 */
export function saveProgress(data: LearnerProgressData): void {
  if (typeof window === 'undefined') return;

  try {
    const toSave: LearnerProgressData = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

/**
 * Saves a completed quiz attempt into history, updating statistics, streak, and mistake records.
 */
export function recordQuizAttempt(
  currentData: LearnerProgressData,
  attempt: QuizAttemptRecord
): LearnerProgressData {
  const newStreak = updateStreak(currentData.streak);
  const updatedMistakes: Record<string, MistakeEntry> = { ...currentData.mistakes };
  const updatedTopicStats = { ...currentData.topicStats };

  let additionalAnswered = 0;
  let additionalCorrect = 0;
  let additionalIncorrect = 0;
  let additionalSkipped = 0;

  for (const q of attempt.questions) {
    if (q.isSkipped) {
      additionalSkipped += 1;
      continue;
    }

    additionalAnswered += 1;
    if (q.isCorrect) {
      additionalCorrect += 1;
      // If was previously a mistake, increment laterCorrectAttempts
      if (updatedMistakes[q.questionId]) {
        updatedMistakes[q.questionId] = {
          ...updatedMistakes[q.questionId],
          laterCorrectAttempts: updatedMistakes[q.questionId].laterCorrectAttempts + 1,
        };
      }
    } else {
      additionalIncorrect += 1;
      // Record or update mistake notebook entry
      const existing = updatedMistakes[q.questionId];
      if (existing) {
        updatedMistakes[q.questionId] = {
          ...existing,
          dateLastIncorrect: new Date().toISOString(),
          incorrectAttempts: existing.incorrectAttempts + 1,
          isMarkedForRevision: true,
          lastSelectedAnswer: q.selectedAnswer,
        };
      } else {
        updatedMistakes[q.questionId] = {
          questionId: q.questionId,
          topicId: q.topicId,
          dateLastIncorrect: new Date().toISOString(),
          incorrectAttempts: 1,
          laterCorrectAttempts: 0,
          isMarkedForRevision: true,
          isUnderstood: false,
          lastSelectedAnswer: q.selectedAnswer,
        };
      }
    }

    // Update topic stats
    const currentTopic = updatedTopicStats[q.topicId] || { answered: 0, correct: 0 };
    updatedTopicStats[q.topicId] = {
      answered: currentTopic.answered + 1,
      correct: currentTopic.correct + (q.isCorrect ? 1 : 0),
      lastAttemptDate: new Date().toISOString(),
    };
  }

  const updatedData: LearnerProgressData = {
    ...currentData,
    streak: newStreak,
    totalAnswered: currentData.totalAnswered + additionalAnswered,
    totalCorrect: currentData.totalCorrect + additionalCorrect,
    totalIncorrect: currentData.totalIncorrect + additionalIncorrect,
    totalSkipped: currentData.totalSkipped + additionalSkipped,
    topicStats: updatedTopicStats,
    mistakes: updatedMistakes,
    quizHistory: [attempt, ...currentData.quizHistory].slice(0, 100), // Keep last 100 quizzes
    activeQuiz: null, // Clear active quiz once finished
    lastUpdated: new Date().toISOString(),
  };

  saveProgress(updatedData);
  return updatedData;
}

/**
 * Saves or clears active quiz session in progress (for refresh restoration).
 */
export function setActiveQuizSession(session: ActiveQuizSession | null): LearnerProgressData {
  const current = loadProgress();
  const updated = {
    ...current,
    activeQuiz: session,
  };
  saveProgress(updated);
  return updated;
}

/**
 * Toggles or sets mistake revision status.
 */
export function updateMistakeStatus(
  questionId: string,
  updates: Partial<MistakeEntry>
): LearnerProgressData {
  const current = loadProgress();
  if (!current.mistakes[questionId]) return current;

  const updatedMistakes = {
    ...current.mistakes,
    [questionId]: {
      ...current.mistakes[questionId],
      ...updates,
    },
  };

  const updated = {
    ...current,
    mistakes: updatedMistakes,
  };
  saveProgress(updated);
  return updated;
}

/**
 * Exports progress as a JSON string for download.
 */
export function exportProgressJson(data?: LearnerProgressData): string {
  const toExport = data || loadProgress();
  return JSON.stringify(toExport, null, 2);
}

/**
 * Validates and imports progress JSON data.
 */
export function importProgressJson(jsonStr: string): { success: boolean; error?: string; data?: LearnerProgressData } {
  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Uploaded file is not a valid JSON object.' };
    }

    if (typeof parsed.totalAnswered !== 'number' || !parsed.settings) {
      return { success: false, error: 'JSON does not conform to Python Mastery Academy progress schema.' };
    }

    const validated: LearnerProgressData = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      lastUpdated: new Date().toISOString(),
      streak: {
        currentStreak: Math.max(0, Number(parsed.streak?.currentStreak) || 0),
        bestStreak: Math.max(0, Number(parsed.streak?.bestStreak) || 0),
        lastActiveDate: parsed.streak?.lastActiveDate || null,
      },
      totalAnswered: Math.max(0, Number(parsed.totalAnswered) || 0),
      totalCorrect: Math.max(0, Number(parsed.totalCorrect) || 0),
      totalIncorrect: Math.max(0, Number(parsed.totalIncorrect) || 0),
      totalSkipped: Math.max(0, Number(parsed.totalSkipped) || 0),
      topicStats: parsed.topicStats && typeof parsed.topicStats === 'object' ? parsed.topicStats : {},
      mistakes: parsed.mistakes && typeof parsed.mistakes === 'object' ? parsed.mistakes : {},
      quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
      activeQuiz: null,
      settings: {
        ...DEFAULT_USER_SETTINGS,
        ...(parsed.settings && typeof parsed.settings === 'object' ? parsed.settings : {}),
      },
    };

    saveProgress(validated);
    return { success: true, data: validated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid JSON file';
    return { success: false, error: `Failed to import JSON: ${message}` };
  }
}

/**
 * Resets all learner progress to initial defaults after confirmation.
 */
export function resetProgress(): LearnerProgressData {
  const resetData = { ...INITIAL_PROGRESS_DATA, lastUpdated: new Date().toISOString() };
  saveProgress(resetData);
  return resetData;
}
