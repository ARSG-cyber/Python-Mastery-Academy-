import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadProgress,
  saveProgress,
  recordQuizAttempt,
  updateMistakeStatus,
  exportProgressJson,
  importProgressJson,
  resetProgress,
  STORAGE_KEY,
  INITIAL_PROGRESS_DATA
} from '../src/lib/storage';
import { QuizAttemptRecord } from '../src/types/progress';

describe('Storage and Progress Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads initial defaults when localStorage is empty', () => {
    const data = loadProgress();
    expect(data.totalAnswered).toBe(0);
    expect(data.streak.currentStreak).toBe(0);
    expect(data.quizHistory).toEqual([]);
    expect(data.settings.theme).toBe('light');
  });

  it('recovers gracefully from corrupted JSON in localStorage', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid_json@@@');
    const data = loadProgress();
    expect(data.totalAnswered).toBe(0);
    expect(data.settings).toBeDefined();
  });

  it('saves and loads valid progress data', () => {
    const custom = {
      ...INITIAL_PROGRESS_DATA,
      totalAnswered: 42,
      totalCorrect: 35,
    };
    saveProgress(custom);
    const loaded = loadProgress();
    expect(loaded.totalAnswered).toBe(42);
    expect(loaded.totalCorrect).toBe(35);
  });

  it('records quiz attempts and updates mistakes notebook without duplicates', () => {
    const initial = loadProgress();

    const mockAttempt: QuizAttemptRecord = {
      id: 'quiz-1',
      mode: 'quick',
      date: new Date().toISOString(),
      totalQuestions: 2,
      correctAnswers: 1,
      incorrectAnswers: 1,
      skippedAnswers: 0,
      accuracy: 50,
      timeSpentSeconds: 45,
      questions: [
        {
          questionId: 'str-001',
          topicId: 'string-methods',
          selectedAnswer: 'python',
          isCorrect: true,
          isSkipped: false,
        },
        {
          questionId: 'str-003',
          topicId: 'string-methods',
          selectedAnswer: 'False',
          isCorrect: false,
          isSkipped: false,
        },
      ],
    };

    const updated = recordQuizAttempt(initial, mockAttempt);
    expect(updated.totalAnswered).toBe(2);
    expect(updated.totalCorrect).toBe(1);
    expect(updated.totalIncorrect).toBe(1);
    expect(updated.streak.currentStreak).toBe(1);

    // Mistake recorded
    expect(updated.mistakes['str-003']).toBeDefined();
    expect(updated.mistakes['str-003'].incorrectAttempts).toBe(1);

    // Second attempt with same mistake increments attempt count instead of duplicating
    const secondAttempt: QuizAttemptRecord = {
      ...mockAttempt,
      id: 'quiz-2',
      questions: [
        {
          questionId: 'str-003',
          topicId: 'string-methods',
          selectedAnswer: 'None',
          isCorrect: false,
          isSkipped: false,
        },
      ],
    };

    const secondUpdated = recordQuizAttempt(updated, secondAttempt);
    expect(secondUpdated.mistakes['str-003'].incorrectAttempts).toBe(2);
    expect(Object.keys(secondUpdated.mistakes).length).toBe(1);
  });

  it('updates mistake understood status', () => {
    const initial = loadProgress();
    initial.mistakes['str-005'] = {
      questionId: 'str-005',
      topicId: 'string-methods',
      dateLastIncorrect: new Date().toISOString(),
      incorrectAttempts: 1,
      laterCorrectAttempts: 0,
      isMarkedForRevision: true,
      isUnderstood: false,
    };
    saveProgress(initial);

    const updated = updateMistakeStatus('str-005', { isUnderstood: true, isMarkedForRevision: false });
    expect(updated.mistakes['str-005'].isUnderstood).toBe(true);
    expect(updated.mistakes['str-005'].isMarkedForRevision).toBe(false);
  });

  it('exports and validates imported progress JSON', () => {
    const initial = loadProgress();
    initial.totalAnswered = 99;
    saveProgress(initial);

    const json = exportProgressJson(initial);
    expect(json).toContain('"totalAnswered": 99');

    // Simulate clean state and import
    localStorage.clear();
    const importResult = importProgressJson(json);
    expect(importResult.success).toBe(true);

    const reloaded = loadProgress();
    expect(reloaded.totalAnswered).toBe(99);
  });

  it('rejects invalid JSON during import', () => {
    const result = importProgressJson('{"invalid": true}');
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('resets progress cleanly to defaults', () => {
    const custom = {
      ...INITIAL_PROGRESS_DATA,
      totalAnswered: 50,
    };
    saveProgress(custom);

    const reset = resetProgress();
    expect(reset.totalAnswered).toBe(0);
    expect(loadProgress().totalAnswered).toBe(0);
  });
});
