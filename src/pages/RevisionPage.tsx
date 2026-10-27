import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Play,
  ArrowRight,
  BrainCircuit,
  Target
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { TOPICS } from '../data/topics';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const RevisionPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const mistakesList = Object.values(progress.mistakes);
  const activeMistakes = mistakesList.filter(m => !m.isUnderstood);
  const understoodCount = mistakesList.filter(m => m.isUnderstood).length;

  // Group active mistakes by topic
  const topicCounts: Record<string, number> = {};
  for (const m of activeMistakes) {
    topicCounts[m.topicId] = (topicCounts[m.topicId] || 0) + 1;
  }

  const topicEntries = Object.entries(topicCounts)
    .map(([topicId, count]) => {
      const topicObj = TOPICS.find(t => t.id === topicId);
      return {
        id: topicId,
        title: topicObj?.title || topicId,
        count,
      };
    })
    .sort((a, b) => b.count - a.count);

  const weakestTopic = topicEntries[0];

  const handleStartRevision = (topicId?: string) => {
    if (activeMistakes.length === 0) return;
    const url = topicId ? `/quiz-setup?mode=revision&topic=${topicId}` : `/quiz-setup?mode=revision`;
    navigate(url);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0d162d] to-[#1a233d] border border-slate-800 rounded-3xl p-6 sm:p-10 text-white shadow-lg space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
          <BrainCircuit className="w-4 h-4" />
          <span>Active Spaced Retrieval Engine</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
          Targeted Revision Mode
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          The fastest way to master Python is repeatedly confronting the edge cases, syntax nuances, and method semantics you missed before.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <Button
            size="lg"
            variant="primary"
            disabled={activeMistakes.length === 0}
            onClick={() => handleStartRevision()}
            icon={<Play className="w-4 h-4 fill-current" />}
          >
            {activeMistakes.length > 0
              ? `Start Revision Quiz (${activeMistakes.length} Questions)`
              : 'All Mistakes Mastered!'}
          </Button>

          {weakestTopic && (
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 text-slate-200 hover:bg-slate-800"
              onClick={() => handleStartRevision(weakestTopic.id)}
              icon={<Target className="w-4 h-4 text-amber-400" />}
            >
              Practice Weakest: {weakestTopic.title}
            </Button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
            Active Revision Queue
          </div>
          <div className="text-3xl font-extrabold font-mono text-rose-500 mt-2">
            {activeMistakes.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Questions waiting for re-testing
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
            Concepts Mastered
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-500 mt-2">
            {understoodCount}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Marked as understood & resolved
          </div>
        </Card>

        <Card className="p-6">
          <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
            Total Logged Errors
          </div>
          <div className="text-3xl font-extrabold font-mono text-brand-600 dark:text-brand-400 mt-2">
            {mistakesList.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Across all practice sessions
          </div>
        </Card>
      </div>

      {/* Breakdown by Topic */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between">
          <span>Active Revision by Topic</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate('/mistakes')}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Open Mistakes Notebook
          </Button>
        </h3>

        {topicEntries.length === 0 ? (
          <Card className="p-8 text-center bg-slate-50/50 dark:bg-slate-900/50 border-dashed border-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Revision Queue is Clear!
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              You have no active questions in your revision notebook. Continue taking quizzes to automatically capture areas for future practice.
            </p>
            <Button variant="primary" size="sm" onClick={() => navigate('/quiz-setup')}>
              Start a New Quiz
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicEntries.map((item) => (
              <Card
                key={item.id}
                className="p-5 flex items-center justify-between hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.count} question{item.count === 1 ? '' : 's'} flagged for revision
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleStartRevision(item.id)}
                  icon={<Play className="w-3.5 h-3.5 fill-current" />}
                >
                  Revise ({item.count})
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Pedagogical Why Revision Works Section */}
      <Card className="p-6 sm:p-8 bg-slate-100/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Why Spaced Revision Produces Real Python Mastery
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 pt-2">
          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">1. Overcomes the Forgetting Curve</span>
            Reviewing concepts after making mistakes triggers strong cognitive consolidation, cementing tricky syntax in long-term memory.
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">2. Eliminates Python Illusions</span>
            Predicting code output forces you to parse like the Python interpreter instead of passively recognizing keywords.
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white block mb-1">3. Pinpoints Tricky Edge Cases</span>
            Distinguishing string immutability, `find()` vs `index()`, and Unicode digits requires deliberate targeted recall.
          </div>
        </div>
      </Card>
    </div>
  );
};
