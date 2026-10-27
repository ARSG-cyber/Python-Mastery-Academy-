import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { TOPICS } from '../data/topics';
import { ALL_QUESTIONS } from '../data/questions';
import { useProgress } from '../context/ProgressContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { calculateAccuracy } from '../lib/scoring';

export const TopicPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { progress } = useProgress();

  const topic = TOPICS.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <Card className="p-8 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Topic Not Found</h3>
        <p className="text-sm text-slate-500">The requested topic could not be found in the curriculum.</p>
        <Button variant="primary" onClick={() => navigate('/learn')}>
          Back to Curriculum
        </Button>
      </Card>
    );
  }

  const topicQuestions = ALL_QUESTIONS.filter((q) => q.topicId === topic.id);
  const stats = progress.topicStats[topic.id];
  const accuracy = stats ? calculateAccuracy(stats.correct, stats.answered) : 0;

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate('/learn')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Curriculum Library
      </button>

      {/* Main Topic Card */}
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-[#0d162d] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="md">
              {topic.category}
            </Badge>
            <Badge
              variant={
                topic.difficulty === 'beginner'
                  ? 'success'
                  : topic.difficulty === 'intermediate'
                  ? 'warning'
                  : 'purple'
              }
              size="md"
            >
              {topic.difficulty}
            </Badge>
          </div>

          <span className="text-xs font-mono font-bold text-slate-400">
            Curriculum Topic #{topic.order.toString().padStart(2, '0')}
          </span>
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {topic.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            {topic.description}
          </p>
        </div>

        {/* Quick Stats Pill Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Question Bank</div>
            <div className="text-xl font-bold font-mono text-brand-600 dark:text-brand-400 mt-0.5">
              {topicQuestions.length} Available
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Your Attempts</div>
            <div className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              {stats?.answered || 0} Questions
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Topic Accuracy</div>
            <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* Action Button */}
        {topic.isAvailable ? (
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate(`/quiz-setup?topic=${topic.id}`)}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              Practice This Topic
            </Button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Questions for this topic are actively being designed and verified. In the meantime, try out the string methods and fundamentals tracks!
          </div>
        )}
      </div>

      {/* Learning Objectives Checklist */}
      <Card className="p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>Core Learning Objectives</span>
        </h3>

        <ul className="space-y-3">
          {topic.learningObjectives.map((obj, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                ✓
              </div>
              <span className="leading-relaxed">{obj}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Sample Question Previews if Available */}
      {topicQuestions.length > 0 && (
        <Card className="p-6 sm:p-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-500" />
            <span>Sample Question Preview</span>
          </h3>

          <div className="space-y-4">
            {topicQuestions.slice(0, 3).map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 text-sm space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold">Question #{idx + 1} ({q.subtopic})</span>
                  <Badge variant={q.difficulty === 'beginner' ? 'success' : 'warning'} size="sm">
                    {q.difficulty}
                  </Badge>
                </div>
                <div className="font-medium text-slate-900 dark:text-white">
                  {q.questionText}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
