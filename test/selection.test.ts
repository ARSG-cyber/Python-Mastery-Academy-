import { describe, it, expect } from 'vitest';
import { selectQuestions } from '../src/lib/questionSelection';

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
});
