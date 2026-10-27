import { describe, it, expect } from 'vitest';
import { ALL_QUESTIONS, validateQuestionBank, getQuestionsByTopic } from '../src/data/questions';
import { STRING_QUESTIONS } from '../src/data/questions/stringMethods';
import { FUNDAMENTALS_QUESTIONS } from '../src/data/questions/pythonFundamentals';

describe('Question Bank Verification', () => {
  it('contains at least 60 distinct verified string questions', () => {
    expect(STRING_QUESTIONS.length).toBeGreaterThanOrEqual(60);
  });

  it('validates entire question bank schema without errors', () => {
    const result = validateQuestionBank(ALL_QUESTIONS);
    expect(result.errors).toEqual([]);
    expect(result.isValid).toBe(true);
  });

  it('contains no duplicate question IDs', () => {
    const ids = ALL_QUESTIONS.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('verifies that every question has a non-empty explanation', () => {
    for (const q of ALL_QUESTIONS) {
      expect(q.explanation.trim().length).toBeGreaterThan(10);
    }
  });

  it('verifies that all code_output questions include a codeSnippet', () => {
    const codeQuestions = ALL_QUESTIONS.filter(q => q.questionType === 'code_output');
    expect(codeQuestions.length).toBeGreaterThan(20);
    for (const q of codeQuestions) {
      expect(q.codeSnippet).toBeDefined();
      expect(q.codeSnippet!.trim().length).toBeGreaterThan(0);
    }
  });

  it('contains Python history questions including Guido and 1991', () => {
    const guidoQ = FUNDAMENTALS_QUESTIONS.find(q => q.correctAnswer === 'Guido van Rossum');
    expect(guidoQ).toBeDefined();

    const yearQ = FUNDAMENTALS_QUESTIONS.find(q => q.correctAnswer === '1991');
    expect(yearQ).toBeDefined();

    const montyQ = FUNDAMENTALS_QUESTIONS.find(q =>
      String(q.correctAnswer).includes("Monty Python")
    );
    expect(montyQ).toBeDefined();
  });

  it('allows fetching questions filtered by topic', () => {
    const stringQuestions = getQuestionsByTopic('string-methods');
    expect(stringQuestions.length).toBeGreaterThanOrEqual(60);
  });
});
