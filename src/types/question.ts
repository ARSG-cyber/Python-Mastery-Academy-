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

export interface Question {
  id: string;
  topicId: string;
  subtopic: string;
  difficulty: QuestionDifficulty;
  questionText: string;
  questionType: QuestionType;
  options?: string[];
  correctAnswer: string | string[]; // string for single_choice/true_false/code_output, string[] for multiple_choice
  explanation: string;
  incorrectExplanations?: Record<string, string>;
  codeSnippet?: string;
  expectedOutput?: string;
  hint?: string;
  tags: string[];
  sourceOrNotes?: string;
  isVerified: boolean;
  pythonVersionReq?: string;
}

export interface QuestionValidationResult {
  isValid: boolean;
  errors: string[];
}
