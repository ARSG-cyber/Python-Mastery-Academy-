import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RotateCcw,
  CheckCircle2,
  Filter,
  BookmarkCheck,
  BookmarkX,
  BookOpen
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ALL_QUESTIONS } from '../data/questions';
import { TOPICS } from '../data/topics';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const MistakesPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress, updateMistake } = useProgress();

  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [filterUnderstood, setFilterUnderstood] = useState<'active' | 'understood' | 'all'>('active');

  const mistakesList = Object.values(progress.mistakes);

  const filteredMistakes = mistakesList.filter((m) => {
    const matchesTopic = selectedTopic === 'all' || m.topicId === selectedTopic;
    const matchesStatus =
      filterUnderstood === 'all'
        ? true
        : filterUnderstood === 'understood'
        ? m.isUnderstood
        : !m.isUnderstood;

    return matchesTopic && matchesStatus;
  });

  const activeMistakesCount = mistakesList.filter(m => !m.isUnderstood).length;

  const handleStartRevisionQuiz = (topicId?: string) => {
    const url = topicId && topicId !== 'all'
      ? `/quiz-setup?mode=revision&topic=${topicId}`
      : `/quiz-setup?mode=revision`;
    navigate(url);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
            <span>Mistakes Notebook</span>
            {activeMistakesCount > 0 && (
              <Badge variant="danger" size="md">
                {activeMistakesCount} Pending
              </Badge>
            )}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Turn errors into understanding. Review and re-test questions you missed until concepts become second nature.
          </p>
        </div>

        {activeMistakesCount > 0 && (
          <Button
            variant="primary"
            size="md"
            onClick={() => handleStartRevisionQuiz(selectedTopic)}
            icon={<RotateCcw className="w-4 h-4" />}
          >
            Practice Mistakes ({activeMistakesCount})
          </Button>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Filters:</span>

          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Topics</option>
            {TOPICS.filter(t => t.isAvailable).map((t) => (
              <option key={t.id} value={t.id}>
                {t.title}
              </option>
            ))}
          </select>

          <select
            value={filterUnderstood}
            onChange={(e) => setFilterUnderstood(e.target.value as 'active' | 'understood' | 'all')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="active">Needs Practice (Active)</option>
            <option value="understood">Marked as Understood</option>
            <option value="all">Show All Recorded</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredMistakes.length} recorded mistake{filteredMistakes.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* Mistakes List */}
      {filteredMistakes.length === 0 ? (
        <Card className="p-12 text-center border-dashed border-2">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {filterUnderstood === 'active' ? 'No Active Mistakes!' : 'No Mistakes Recorded'}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-6">
            {filterUnderstood === 'active'
              ? 'You have addressed all flagged misconceptions or marked them understood. Great work!'
              : 'Mistakes made during quizzes will automatically appear here for spaced revision.'}
          </p>
          <Button variant="primary" onClick={() => navigate('/quiz-setup')}>
            Take a Quiz
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((entry) => {
            const question = ALL_QUESTIONS.find(q => q.id === entry.questionId);
            const topic = TOPICS.find(t => t.id === entry.topicId);

            if (!question) return null;

            return (
              <Card
                key={entry.questionId}
                className={`p-6 transition-all ${
                  entry.isUnderstood
                    ? 'border-emerald-200/80 dark:border-emerald-950/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">
                      {topic?.title || entry.topicId}
                    </Badge>
                    <Badge variant={question.difficulty === 'beginner' ? 'success' : 'warning'} size="sm">
                      {question.difficulty}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">
                      Failed {entry.incorrectAttempts}x • Solved later {entry.laterCorrectAttempts}x
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={entry.isUnderstood ? 'secondary' : 'outline'}
                      onClick={() =>
                        updateMistake(entry.questionId, {
                          isUnderstood: !entry.isUnderstood,
                          isMarkedForRevision: entry.isUnderstood,
                        })
                      }
                      icon={entry.isUnderstood ? <BookmarkX className="w-3.5 h-3.5" /> : <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />}
                    >
                      <span className="text-xs">
                        {entry.isUnderstood ? 'Move to Active' : 'Mark as Understood'}
                      </span>
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {question.questionText}
                  </h4>

                  {question.codeSnippet && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs whitespace-pre overflow-x-auto">
                      {question.codeSnippet}
                    </div>
                  )}

                  <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <div className="font-semibold text-slate-900 dark:text-white mb-1 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                      Correct Answer:
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold ml-1">
                        {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                      </span>
                    </div>
                    <p>{question.explanation}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
