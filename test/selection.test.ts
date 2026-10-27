import { describe, it, expect } from 'vitest';
import { selectQuestions } from '../src/lib/questionSelection';
import { ALL_QUESTIONS } from '../src/data/questions';

describe('Question Selection Algorithm', () => {
  it('selects requested number of questions for quick quiz', () => {
    const result = selectQuestions({ mode: 'quick' });
    expect(result.questions).toHaveLength(10);
    expect(result.availableCount).toBeGreaterThanOrEqual(10);
  });

  it('selects 20 questions for standard quiz', () => {
    const result = selectQuestions({ mode: 'standard' });
    expect(result.questions).toHaveLength(20);
  });

  it('ensures no duplicate questions exist in the selection', () => {
    const result = selectQuestions({ mode: 'deep', count: 30 });
    const ids = result.questions.map(q => q.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('filters questions strictly by topic when topicId is provided', () => {
    const result = selectQuestions({ mode: 'topic', topicId: 'string-methods', count: 15 });
    expect(result.questions.length).toBe(15);
    for (const q of result.questions) {
      expect(q.topicId).toBe('string-methods');
    }
  });

  it('provides a clear notice when available count is less than requested count', () => {
    const result = selectQuestions({
      mode: 'topic',
      topicId: 'for-loops',
      count: 25,
    });
    expect(result.questions.length).toBeLessThan(25);
    expect(result.notice).toBeDefined();
    expect(result.notice).toContain('fewer than the requested');
  });

  it('selects only questions from revision IDs in revision mode', () => {
    const revisionIds = ['str-001', 'str-002', 'str-003'];
    const result = selectQuestions({
      mode: 'revision',
      revisionQuestionIds: revisionIds,
    });
    expect(result.questions.length).toBe(3);
    for (const q of result.questions) {
      expect(revisionIds).toContain(q.id);
    }
  });

  describe('Option Randomisation & Shuffling', () => {
    it('ensures every option appears exactly once after shuffling', () => {
      const result = selectQuestions({ mode: 'quick' });
      for (const q of result.questions) {
        const displayed = result.displayedOptions[q.id];
        if (displayed && q.options) {
          expect(displayed.length).toBe(q.options.length);
          const displayedIds = displayed.map(o => o.id);
          const uniqueIds = new Set(displayedIds);
          expect(uniqueIds.size).toBe(displayed.length);
        }
      }
    });

    it('does not mutate the original question bank options array', () => {
      const q = ALL_QUESTIONS.find(item => item.id === 'str-001')!;
      const originalFirstOption = q.options![0];
      // Select questions multiple times
      selectQuestions({ mode: 'quick' });
      selectQuestions({ mode: 'deep' });
      // The original options array must remain intact
      expect(q.options![0]).toEqual(originalFirstOption);
    });

    it('supports deterministic RNG for predictable test results', () => {
      // Deterministic sequence
      let counter = 0;
      const fakeRng = () => {
        counter = (counter + 0.25) % 1;
        return counter;
      };

      const result1 = selectQuestions({ mode: 'quick', count: 5, rng: fakeRng });
      counter = 0;
      const result2 = selectQuestions({ mode: 'quick', count: 5, rng: fakeRng });

      const qId = result1.questions[0].id;
      expect(result1.displayedOptions[qId]).toEqual(result2.displayedOptions[qId]);
    });

    it('distributes correct answers across positions A, B, C, D across multiple questions', () => {
      const positionCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
      const runs = 20;

      for (let i = 0; i < runs; i++) {
        const result = selectQuestions({ mode: 'deep', count: 30 });
        for (const q of result.questions) {
          const displayed = result.displayedOptions[q.id];
          if (displayed && displayed.length === 4 && q.questionType !== 'multiple_choice') {
            const correctIdx = displayed.findIndex(opt =>
              q.correctOptionId ? opt.id === q.correctOptionId : opt.text === q.correctAnswer
            );
            if (correctIdx >= 0 && correctIdx < 4) {
              positionCounts[correctIdx as 0 | 1 | 2 | 3]++;
            }
          }
        }
      }

      // Over hundreds of questions sampled with random shuffling,
      // all 4 positions (0=A, 1=B, 2=C, 3=D) must be well-represented (each > 10% of total)
      const total = positionCounts[0] + positionCounts[1] + positionCounts[2] + positionCounts[3];
      expect(total).toBeGreaterThan(100);
      expect(positionCounts[0] / total).toBeGreaterThan(0.12);
      expect(positionCounts[1] / total).toBeGreaterThan(0.12);
      expect(positionCounts[2] / total).toBeGreaterThan(0.12);
      expect(positionCounts[3] / total).toBeGreaterThan(0.12);
    });
  });
});
