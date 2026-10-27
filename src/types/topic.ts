export type TopicCategory =
  | 'FOUNDATION'
  | 'DATA TYPES'
  | 'OPERATORS'
  | 'STRINGS'
  | 'COLLECTIONS'
  | 'CONTROL FLOW'
  | 'FUNCTIONS'
  | 'MODULES AND PACKAGES'
  | 'EXCEPTIONS'
  | 'FILES AND DATA'
  | 'OBJECT-ORIENTED PYTHON'
  | 'ITERATION AND GENERATORS'
  | 'FUNCTIONAL PYTHON'
  | 'ADVANCED PYTHON'
  | 'PRACTICAL PYTHON'
  | 'BEGINNER'
  | 'FUNCTIONS AND MODULES'
  | 'INTERMEDIATE'
  | 'ADVANCED INTRODUCTION';

export type TopicDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type TopicStatus = 'not_started' | 'in_progress' | 'completed' | 'coming_soon';

export interface Topic {
  id: string;
  order: number;
  title: string;
  description: string;
  category: TopicCategory;
  difficulty: TopicDifficulty;
  learningObjectives: string[];
  isAvailable: boolean; // True if it has active questions in question bank
  iconName?: string;
}

export interface TopicProgressStats {
  topicId: string;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  status: TopicStatus;
  lastAttemptAt?: string;
}
