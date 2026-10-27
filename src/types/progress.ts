import { QuestionDifficulty } from './question';

export interface QuestionAttempt {
  questionId: string;
  topicId: string;
  selectedAnswer: string | string[];
  isCorrect: boolean;
  isSkipped: boolean;
  timeSpentSeconds: number;
  attemptedAt: string;
}

export interface QuizAttemptRecord {
  id: string;
  topicId?: string; // undefined if mixed quiz
  mode: QuizMode;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedAnswers: number;
  accuracy: number;
  timeSpentSeconds: number;
  questions: {
    questionId: string;
    topicId: string;
    selectedAnswer?: string | string[];
    isCorrect: boolean;
    isSkipped: boolean;
  }[];
}

export type QuizMode =
  | 'learn' // Guided immediate feedback with hints
  | 'practice' // Topic & count focused practice
  | 'exam' // Silent assessment: no feedback/hints until completion
  | 'challenge' // Difficult & edge case questions
  | 'quick' // 10 questions quick session
  | 'standard' // 20 questions standard
  | 'deep' // In-depth session
  | 'revision' // Mistakes revision
  | 'mixed' // Mixed topics
  | 'topic' // Single topic
  | 'untimed'
  | 'timed';

export interface MistakeEntry {
  questionId: string;
  topicId: string;
  dateLastIncorrect: string;
  incorrectAttempts: number;
  laterCorrectAttempts: number;
  isMarkedForRevision: boolean;
  isUnderstood: boolean;
  lastSelectedAnswer?: string | string[];
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  preferredQuestionCount: number;
  defaultDifficulty: 'all' | QuestionDifficulty;
  immediateFeedback: boolean;
  hintsEnabled: boolean;
  timerEnabled: boolean;
  timerDurationMinutes: number;
}

export interface ActiveQuizSession {
  sessionId: string;
  mode: QuizMode;
  topicId?: string;
  difficulty?: 'all' | QuestionDifficulty;
  questionIds: string[];
  currentIndex: number;
  answers: Record<string, string | string[]>; // questionId -> selected optionId(s)
  displayedOptions?: Record<string, { id: string; text: string }[]>; // questionId -> shuffled display options
  submissionStates: Record<string, boolean>; // questionId -> isSubmitted
  skippedStates: Record<string, boolean>; // questionId -> isSkipped
  hintsUsed: Record<string, boolean>; // questionId -> usedHint
  startedAt: string;
  timeRemainingSeconds?: number;
  timeSpentSeconds: number;
}

export interface LearnerProgressData {
  schemaVersion: number;
  lastUpdated: string;
  streak: {
    currentStreak: number;
    bestStreak: number;
    lastActiveDate: string | null;
  };
  totalAnswered: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalSkipped: number;
  topicStats: Record<string, {
    answered: number;
    correct: number;
    lastAttemptDate?: string;
  }>;
  mistakes: Record<string, MistakeEntry>; // questionId -> MistakeEntry
  quizHistory: QuizAttemptRecord[];
  activeQuiz: ActiveQuizSession | null;
  settings: UserSettings;
}
