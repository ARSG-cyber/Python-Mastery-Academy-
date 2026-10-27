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
    options: [
      { id: 'opt-0', text: 'PYTHON' },
      { id: 'opt-1', text: 'python' },
      { id: 'opt-2', text: 'None' }
    ],
    correctOptionId: 'opt-1',
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
    options: [
      { id: 'opt-sw', text: 'startswith()' },
      { id: 'opt-ew', text: 'endswith()' },
      { id: 'opt-sp', text: 'split()' },
      { id: 'opt-fd', text: 'find()' }
    ],
    correctOptionId: ['opt-sw', 'opt-ew'],
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

  it('correctly evaluates answers using stable option IDs', () => {
    const questionWithIds: Question = {
      id: 'test-opt-ids',
      topicId: 'string-methods',
      subtopic: 'Strings',
      difficulty: 'beginner',
      questionText: 'What does upper() do?',
      questionType: 'single_choice',
      options: [
        { id: 'opt-upper', text: 'Converts to uppercase' },
        { id: 'opt-lower', text: 'Converts to lowercase' },
        { id: 'opt-strip', text: 'Strips whitespace' }
      ],
      correctOptionId: 'opt-upper',
      correctAnswer: 'Converts to uppercase',
      explanation: 'upper() converts characters to uppercase.',
      hint: 'Think about casing.',
      tags: ['test'],
      isVerified: true,
    };

    // Correct option ID
    const evalCorrect = checkAnswer(questionWithIds, 'opt-upper');
    expect(evalCorrect.isCorrect).toBe(true);

    // Incorrect option ID
    const evalWrong = checkAnswer(questionWithIds, 'opt-lower');
    expect(evalWrong.isCorrect).toBe(false);

    // Legacy text fallback still works
    const evalText = checkAnswer(questionWithIds, 'Converts to uppercase');
    expect(evalText.isCorrect).toBe(true);
  });

  it('preserves answer evaluation regardless of option order / shuffling', () => {
    const questionWithIds: Question = {
      id: 'test-shuffle-eval',
      topicId: 'string-methods',
      subtopic: 'Strings',
      difficulty: 'beginner',
      questionText: 'What does upper() do?',
      questionType: 'single_choice',
      options: [
        { id: 'opt-a', text: 'Option A' },
        { id: 'opt-b', text: 'Option B' },
        { id: 'opt-c', text: 'Option C' },
        { id: 'opt-d', text: 'Option D' }
      ],
      correctOptionId: 'opt-c',
      correctAnswer: 'Option C',
      explanation: 'Option C is correct.',
      tags: ['test'],
      isVerified: true,
    };

    // Selected option ID 'opt-c' is always correct regardless of display index
    expect(checkAnswer(questionWithIds, 'opt-c').isCorrect).toBe(true);
    expect(checkAnswer(questionWithIds, 'opt-a').isCorrect).toBe(false);
    expect(checkAnswer(questionWithIds, 'opt-b').isCorrect).toBe(false);
    expect(checkAnswer(questionWithIds, 'opt-d').isCorrect).toBe(false);
  });

  it('hints do not affect answer evaluation or scores', () => {
    const result1 = checkAnswer(singleQuestion, 'python');
    const result2 = checkAnswer(singleQuestion, 'python');
    expect(result1.isCorrect).toBe(true);
    expect(result2.isCorrect).toBe(true);
    expect(result1.isCorrect).toBe(result2.isCorrect);
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
