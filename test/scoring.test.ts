import { describe, it, expect } from 'vitest';
import { checkAnswer, calculateAccuracy, formatTime } from '../src/lib/scoring';
import { Question } from '../src/types/question';

describe('Scoring and Evaluation Engine', () => {
  const singleQuestion: Question = {
    id: 'test-single',
    topicId: 'string-methods',
    subtopic: 'Immutability',
    difficulty: 'beginner',
    questionText: 'What is the output of "python".upper() if not assigned?',
    questionType: 'single_choice',
    options: ['PYTHON', 'python', 'None'],
    correctAnswer: 'python',
    explanation: 'Strings are immutable.',
    tags: ['test'],
    isVerified: true,
  };

  const multiQuestion: Question = {
    id: 'test-multi',
    topicId: 'string-methods',
    subtopic: 'Validation',
    difficulty: 'intermediate',
    questionText: 'Select all boolean methods:',
    questionType: 'multiple_choice',
    options: ['startswith()', 'endswith()', 'split()', 'find()'],
    correctAnswer: ['startswith()', 'endswith()'],
    explanation: 'startswith and endswith return booleans.',
    tags: ['test'],
    isVerified: true,
  };

  it('correctly evaluates a single-choice correct answer', () => {
    const result = checkAnswer(singleQuestion, 'python');
    expect(result.isCorrect).toBe(true);
    expect(result.isPartial).toBe(false);
  });

  it('correctly evaluates a single-choice incorrect answer', () => {
    const result = checkAnswer(singleQuestion, 'PYTHON');
    expect(result.isCorrect).toBe(false);
    expect(result.isPartial).toBe(false);
  });

  it('correctly evaluates multiple-choice full correct answer', () => {
    const result = checkAnswer(multiQuestion, ['startswith()', 'endswith()']);
    expect(result.isCorrect).toBe(true);
    expect(result.isPartial).toBe(false);
    expect(result.missedOptions).toHaveLength(0);
    expect(result.extraOptions).toHaveLength(0);
  });

  it('correctly detects partial selection in multiple-choice', () => {
    const result = checkAnswer(multiQuestion, ['startswith()']);
    expect(result.isCorrect).toBe(false);
    expect(result.isPartial).toBe(true);
    expect(result.missedOptions).toContain('endswith()');
  });

  it('correctly detects extra incorrect option in multiple-choice', () => {
    const result = checkAnswer(multiQuestion, ['startswith()', 'endswith()', 'split()']);
    expect(result.isCorrect).toBe(false);
    expect(result.extraOptions).toContain('split()');
  });

  it('calculates accuracy safely with zero questions without NaN', () => {
    expect(calculateAccuracy(0, 0)).toBe(0);
    expect(calculateAccuracy(5, 0)).toBe(0);
    expect(calculateAccuracy(0, 10)).toBe(0);
  });

  it('calculates valid percentage accuracy correctly', () => {
    expect(calculateAccuracy(8, 10)).toBe(80);
    expect(calculateAccuracy(1, 3)).toBe(33.3);
    expect(calculateAccuracy(10, 10)).toBe(100);
  });

  it('formats seconds to MM:SS string', () => {
    expect(formatTime(0)).toBe('00:00');
    expect(formatTime(65)).toBe('01:05');
    expect(formatTime(600)).toBe('10:00');
  });
});
