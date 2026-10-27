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

  it('contains questions covering Python functions, parameters, and mutable defaults', () => {
    const mutableDefaultQ = ALL_QUESTIONS.find(q => q.id === 'fn-001');
    expect(mutableDefaultQ).toBeDefined();
    expect(mutableDefaultQ?.topicId).toBe('parameters-arguments');
    expect(mutableDefaultQ?.correctAnswer).toContain('[1]');
  });

  it('contains questions covering OOP, classes, self, and dataclasses', () => {
    const oopQ = ALL_QUESTIONS.find(q => q.id === 'oop-001');
    expect(oopQ).toBeDefined();
    expect(oopQ?.topicId).toBe('classes-objects');

    const dataclassQ = ALL_QUESTIONS.find(q => q.id === 'oop-006');
    expect(dataclassQ).toBeDefined();
  });

  it('contains questions covering exception handling and file context managers', () => {
    const excQ = ALL_QUESTIONS.find(q => q.id === 'exc-001');
    expect(excQ).toBeDefined();
    expect(excQ?.correctAnswer).toBe('else finally');

    const fileQ = ALL_QUESTIONS.find(q => q.id === 'exc-004');
    expect(fileQ).toBeDefined();
  });

  it('contains questions covering modern Python features including match-case and type hints', () => {
    const matchCaseQ = ALL_QUESTIONS.find(q => q.id === 'adv-007');
    expect(matchCaseQ).toBeDefined();
    expect(matchCaseQ?.topicId).toBe('match-case');

    const typeHintsQ = ALL_QUESTIONS.find(q => q.id === 'adv-006');
    expect(typeHintsQ).toBeDefined();
  });

  describe('V2 Question Bank Quality & Schema Integrity', () => {
    it('verifies that every question has a valid, non-empty hint', () => {
      for (const q of ALL_QUESTIONS) {
        expect(q.hint).toBeDefined();
        expect(q.hint!.trim().length).toBeGreaterThan(10);
      }
    });

    it('verifies that normalized questions have valid, unique option IDs', () => {
      for (const q of ALL_QUESTIONS) {
        if (q.options && q.options.length > 0) {
          const optIds = (q.options as any[]).map(o => (typeof o === 'string' ? o : o.id));
          const uniqueIds = new Set(optIds);
          expect(uniqueIds.size).toBe(optIds.length);
        }
      }
    });

    it('verifies that every single-choice question has an existing correct answer', () => {
      for (const q of ALL_QUESTIONS) {
        if (q.questionType !== 'multiple_choice') {
          const optionTexts = (q.options as any[]).map(o => (typeof o === 'string' ? o : o.text));
          expect(optionTexts).toContain(q.correctAnswer);
        }
      }
    });

    it('verifies that multiple-choice questions have all correct options present', () => {
      const multiQuestions = ALL_QUESTIONS.filter(q => q.questionType === 'multiple_choice');
      expect(multiQuestions.length).toBeGreaterThan(0);
      for (const q of multiQuestions) {
        expect(Array.isArray(q.correctAnswer)).toBe(true);
        const optionTexts = (q.options as any[]).map(o => (typeof o === 'string' ? o : o.text));
        for (const correctItem of q.correctAnswer as string[]) {
          expect(optionTexts).toContain(correctItem);
        }
      }
    });

    it('detects and reports malformed questions with missing answers or options', () => {
      const malformed = [
        {
          id: 'invalid-001',
          topicId: 'test',
          difficulty: 'beginner' as const,
          questionText: 'Test question?',
          questionType: 'single_choice' as const,
          options: [
            { id: 'opt-a', text: 'A' },
            { id: 'opt-b', text: 'B' }
          ],
          correctOptionId: 'opt-c', // Not in options
          correctAnswer: 'C',
          explanation: 'Some explanation.',
          hint: 'Think about valid options.',
          tags: ['test'],
          isVerified: true
        }
      ];

      const report = validateQuestionBank(malformed as any);
      expect(report.isValid).toBe(false);
      expect(report.errors.length).toBeGreaterThan(0);
      expect(report.errors.some(e => e.includes('not found in options'))).toBe(true);
    });
  });
});
