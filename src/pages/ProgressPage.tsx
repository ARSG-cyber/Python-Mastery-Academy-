import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Award,
  CheckCircle2,
  Clock,
  Download,
  TrendingUp
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { TOPICS } from '../data/topics';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { calculateAccuracy, formatTime } from '../lib/scoring';

export const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const totalAnswered = progress.totalAnswered;
  const totalCorrect = progress.totalCorrect;
  const totalIncorrect = progress.totalIncorrect;
  const totalSkipped = progress.totalSkipped;
  const accuracy = calculateAccuracy(totalCorrect, totalAnswered);

  // Curriculum completion stats
  const availableTopics = TOPICS.filter(t => t.isAvailable);
  const completedTopicsCount = availableTopics.filter(t => {
    const stats = progress.topicStats[t.id];
    return stats && stats.answered >= 5 && (stats.correct / stats.answered) >= 0.8;
  }).length;

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Learning Progress & Analytics
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Real data from your interactive quiz sessions, tracking question volume, accuracy, and curriculum coverage.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate('/settings')}
          icon={<Download className="w-3.5 h-3.5" />}
        >
          Export / Import Data
        </Button>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Overall Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white mt-3">
            {accuracy}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Based on {totalAnswered} questions
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Correct Answers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400 mt-3">
            {totalCorrect}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {totalIncorrect} incorrect • {totalSkipped} skipped
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Learning Streak</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-amber-500 mt-3">
            {progress.streak.currentStreak} Days
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Personal best: {progress.streak.bestStreak} days
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase">
            <span>Topics Mastered</span>
            <Award className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-brand-600 dark:text-brand-400 mt-3">
            {completedTopicsCount} <span className="text-xs font-normal text-slate-400">/ {availableTopics.length}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            ≥ 80% accuracy with 5+ Qs
          </div>
        </Card>
      </div>

      {/* Topic by Topic Performance Table */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Topic Mastery Breakdown
        </h3>

        {availableTopics.length === 0 ? (
          <p className="text-sm text-slate-500">No active topics found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="pb-3 pl-2">Topic</th>
                  <th className="pb-3 px-3">Difficulty</th>
                  <th className="pb-3 px-3">Questions Answered</th>
                  <th className="pb-3 px-3">Accuracy</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {availableTopics.map((topic) => {
                  const stats = progress.topicStats[topic.id];
                  const answered = stats?.answered || 0;
                  const correct = stats?.correct || 0;
                  const topicAcc = calculateAccuracy(correct, answered);

                  return (
                    <tr key={topic.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 pl-2 font-medium text-slate-900 dark:text-white">
                        <div>{topic.title}</div>
                        <div className="text-[11px] text-slate-400">{topic.category}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        <Badge
                          variant={
                            topic.difficulty === 'beginner'
                              ? 'success'
                              : topic.difficulty === 'intermediate'
                              ? 'warning'
                              : 'purple'
                          }
                          size="sm"
                        >
                          {topic.difficulty}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-3 font-mono">
                        {answered > 0 ? (
                          <span>{answered} ({correct} correct)</span>
                        ) : (
                          <span className="text-slate-400 italic">Not attempted</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 min-w-[140px]">
                        {answered > 0 ? (
                          <div className="space-y-1">
                            <div className="flex justify-between font-mono font-bold text-xs">
                              <span>{topicAcc}%</span>
                            </div>
                            <ProgressBar
                              value={topicAcc}
                              size="sm"
                              variant={topicAcc >= 80 ? 'success' : topicAcc >= 60 ? 'brand' : 'warning'}
                            />
                          </div>
                        ) : (
                          <span className="text-slate-400 font-mono">-</span>
                        )}
                      </td>
                      <td className="py-3.5 pr-2 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/quiz-setup?topic=${topic.id}`)}
                        >
                          Practice
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Quiz History Log */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Recent Quiz Sessions ({progress.quizHistory.length})
        </h3>

        {progress.quizHistory.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-sm">
            No quiz attempts recorded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {progress.quizHistory.slice(0, 10).map((record) => {
              const topic = record.topicId ? TOPICS.find(t => t.id === record.topicId) : null;
              const dateFormatted = new Date(record.date).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={record.id}
                  className="p-4 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="capitalize">{record.mode} Quiz</span>
                      <span className="text-slate-400 font-normal">•</span>
                      <span className="text-slate-600 dark:text-slate-300">
                        {topic ? topic.title : 'Mixed Curriculum'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>{dateFormatted}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(record.timeSpentSeconds)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-mono font-bold text-base text-slate-900 dark:text-white">
                        {record.accuracy}%
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {record.correctAnswers} / {record.totalQuestions} correct
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/results?attempt=${record.id}`)}
                    >
                      Review
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};
