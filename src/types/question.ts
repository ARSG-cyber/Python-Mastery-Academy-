export type QuestionType =
  | 'single_choice'
  | 'multiple_choice'
  | 'true_false'
  | 'code_output'
  | 'fill_blank'
  | 'method_id'
  | 'error_detection'
  | 'syntax_correction'
  | 'concept_comparison'
  | 'valid_method';

export type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  topicId: string;
  subtopic: string;
  difficulty: QuestionDifficulty;
  questionText: string;
  questionType: QuestionType;
  options?: QuestionOption[];
  correctOptionId?: string | string[]; // stable option id (string for single, string[] for multiple)
  correctAnswer: string | string[]; // answer text preserved for display/fallback
  explanation: string;
  incorrectExplanations?: Record<string, string>; // keyed by optionId or option text
  codeSnippet?: string;
  expectedOutput?: string;
  hint?: string;
  tags: string[];
  sourceOrNotes?: string;
  isVerified: boolean;
  pythonVersionReq?: string;
}

export interface RawQuestion extends Omit<Question, 'options'> {
  options?: (QuestionOption | string)[];
}

export interface QuestionValidationResult {
  isValid: boolean;
  errors: string[];
  distribution?: {
    totalEvaluated: number;
    positionCounts: Record<number, number>;
  };
}
