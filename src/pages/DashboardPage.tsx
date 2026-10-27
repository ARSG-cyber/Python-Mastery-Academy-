import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  Flame,
  Award,
  XCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Compass,
  Clock
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { TOPICS } from '../data/topics';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { calculateAccuracy, formatTime } from '../lib/scoring';

export const DashboardPage: React.FC = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  const totalAnswered = progress.totalAnswered;
  const totalCorrect = progress.totalCorrect;
  const totalIncorrect = progress.totalIncorrect;
  const accuracy = calculateAccuracy(totalCorrect, totalAnswered);

  const topicsPracticedCount = Object.keys(progress.topicStats).length;
  const activeMistakes = Object.values(progress.mistakes).filter(m => !m.isUnderstood);

  // Weak topics calculation (accuracy < 70% with at least 3 questions answered)
  const weakTopics = Object.entries(progress.topicStats)
    .filter(([_, stats]) => stats.answered >= 3 && (stats.correct / stats.answered) < 0.7)
    .map(([topicId, stats]) => {
      const topicObj = TOPICS.find(t => t.id === topicId);
      return {
        id: topicId,
        title: topicObj?.title || topicId,
        accuracy: calculateAccuracy(stats.correct, stats.answered),
        answered: stats.answered,
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy);

  // Identify next recommended topic
  const availableTopics = TOPICS.filter(t => t.isAvailable);
  const nextTopic = availableTopics.find(t => !progress.topicStats[t.id]) || availableTopics[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome & Quick Action Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b1329] via-[#111e3f] to-[#1e2a4a] border border-slate-800 text-white p-6 sm:p-10 shadow-lg">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold">
            <span>✨ Interactive Python Study Platform</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-200 to-amber-300">Python Mastery</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Build true Python fluency through active recall, code output predictions, verified questions, and targeted revision notebooks.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/quiz-setup')}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              Start Quick Quiz
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate(`/topic/${nextTopic.id}`)}
              icon={<BookOpen className="w-4 h-4" />}
            >
              Continue Learning
            </Button>

            {activeMistakes.length > 0 && (
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-200 hover:bg-slate-800"
                onClick={() => navigate('/mistakes')}
                icon={<RotateCcw className="w-4 h-4 text-amber-400" />}
              >
                Review Mistakes ({activeMistakes.length})
              </Button>
            )}
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-center">
          <span className="text-[200px] select-none">🐍</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Questions */}
        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Answered</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {totalAnswered}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Total questions attempted
            </div>
          </div>
        </Card>

        {/* Accuracy */}
        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Accuracy</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {accuracy}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
              <span className="text-emerald-600 font-semibold">{totalCorrect} correct</span>
              <span>•</span>
              <span className="text-rose-500 font-semibold">{totalIncorrect} wrong</span>
            </div>
          </div>
        </Card>

        {/* Topics Practiced */}
        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Topics Practiced</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {topicsPracticedCount} <span className="text-sm font-normal text-slate-400">/ 50</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Curriculum breadth
            </div>
          </div>
        </Card>

        {/* Daily Streak */}
        <Card className="p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Learning Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {progress.streak.currentStreak} <span className="text-sm font-normal text-slate-400">days</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Best streak: {progress.streak.bestStreak} days
            </div>
          </div>
        </Card>
      </div>

      {/* Main Grid: Empty state vs Learning Stats */}
      {totalAnswered === 0 ? (
        <Card className="p-8 sm:p-12 text-center border-dashed border-2 border-slate-300 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 mx-auto flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Start Your Python Journey
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
            You haven't completed any quizzes yet. Explore topics in the curriculum or take your first quick quiz to begin tracking your mastery!
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              onClick={() => navigate('/quiz-setup')}
              icon={<Play className="w-4 h-4 fill-current" />}
            >
              Start First Quiz
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/learn')}
              icon={<Compass className="w-4 h-4" />}
            >
              Browse Curriculum
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Topic Mastery & Weak Areas */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weak topics alert if any */}
            {weakTopics.length > 0 && (
              <Card className="border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 p-5">
                <div className="flex items-center gap-2.5 mb-3 text-amber-800 dark:text-amber-300 font-semibold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Topics Needing Practice (&lt; 70% Accuracy)</span>
                </div>
                <div className="space-y-3">
                  {weakTopics.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {item.answered} questions attempted
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="warning" size="sm">
                          {item.accuracy}%
                        </Badge>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => navigate(`/quiz-setup?topic=${item.id}`)}
                        >
                          Practice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Topic Accuracy Breakdown */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Topic Performance Breakdown
                </h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate('/learn')}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  View All Topics
                </Button>
              </div>

              <div className="space-y-4">
                {Object.entries(progress.topicStats).slice(0, 5).map(([topicId, stats]) => {
                  const topic = TOPICS.find(t => t.id === topicId);
                  const topicAcc = calculateAccuracy(stats.correct, stats.answered);

                  return (
                    <div key={topicId} className="space-y-1.5">
                      <div className="flex justify-between text-xs sm:text-sm font-medium">
                        <span className="text-slate-800 dark:text-slate-200">
                          {topic?.title || topicId}
                        </span>
                        <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">
                          {topicAcc}% ({stats.correct}/{stats.answered})
                        </span>
                      </div>
                      <ProgressBar
                        value={topicAcc}
                        variant={topicAcc >= 80 ? 'success' : topicAcc >= 60 ? 'brand' : 'warning'}
                        size="sm"
                      />
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Right Col: Recent Quizzes */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                <span>Recent Quizzes</span>
                <Badge variant="default" size="sm">
                  {progress.quizHistory.length} total
                </Badge>
              </h3>

              {progress.quizHistory.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No quizzes completed yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {progress.quizHistory.slice(0, 5).map((q) => {
                    const topic = q.topicId ? TOPICS.find(t => t.id === q.topicId) : null;
                    return (
                      <div
                        key={q.id}
                        className="p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 text-xs"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-900 dark:text-white capitalize">
                            {q.mode} Quiz {topic ? `• ${topic.title}` : '• Mixed Topics'}
                          </span>
                          <span className={`font-mono font-bold ${q.accuracy >= 80 ? 'text-emerald-500' : q.accuracy >= 60 ? 'text-amber-500' : 'text-rose-500'}`}>
                            {q.accuracy}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                          <span>{q.correctAnswers} / {q.totalQuestions} correct</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(q.timeSpentSeconds)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Quick Mistakes Callout */}
            {activeMistakes.length > 0 && (
              <Card className="p-6 bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/60 dark:border-rose-900/40">
                <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm mb-2">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>{activeMistakes.length} Missed Questions</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  Review questions you answered incorrectly to clear misconceptions and solidify memory.
                </p>
                <Button
                  size="sm"
                  variant="danger"
                  className="w-full"
                  onClick={() => navigate('/mistakes')}
                >
                  Open Mistakes Notebook
                </Button>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
