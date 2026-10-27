import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Play,
  Zap,
  Target,
  Flame,
  RotateCcw,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import { TOPICS } from '../data/topics';
import { ALL_QUESTIONS } from '../data/questions';
import { useProgress } from '../context/ProgressContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { QuizMode } from '../types/progress';
import { QuestionDifficulty } from '../types/question';

export const QuizSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { progress } = useProgress();

  const preselectedTopic = searchParams.get('topic') || 'all';
  const preselectedMode = (searchParams.get('mode') as QuizMode) || 'quick';

  const [mode, setMode] = useState<QuizMode>(preselectedMode);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(preselectedTopic);
  const [difficulty, setDifficulty] = useState<'all' | QuestionDifficulty>(
    progress.settings?.defaultDifficulty || 'all'
  );
  const [questionCount, setQuestionCount] = useState<number>(
    mode === 'standard' ? 20 : mode === 'deep' ? 50 : 10
  );
  const [hintsEnabled, setHintsEnabled] = useState<boolean>(
    progress.settings?.hintsEnabled ?? true
  );
  const [immediateFeedback, setImmediateFeedback] = useState<boolean>(
    progress.settings?.immediateFeedback ?? true
  );
  const [timerEnabled, setTimerEnabled] = useState<boolean>(
    progress.settings?.timerEnabled ?? false
  );
  const [timerMinutes, setTimerMinutes] = useState<number>(
    progress.settings?.timerDurationMinutes ?? 10
  );

  // Update questionCount default whenever mode changes
  const handleModeChange = (newMode: QuizMode) => {
    setMode(newMode);
    if (newMode === 'quick') setQuestionCount(10);
    else if (newMode === 'standard') setQuestionCount(20);
    else if (newMode === 'deep') setQuestionCount(50);
    else if (newMode === 'challenge') setQuestionCount(15);
  };

  // Compute available pool count
  const activeMistakeIds = Object.keys(progress.mistakes).filter(
    id => !progress.mistakes[id].isUnderstood
  );

  let poolCount = 0;
  if (mode === 'revision') {
    poolCount = activeMistakeIds.length;
  } else {
    let pool = ALL_QUESTIONS;
    if (selectedTopicId !== 'all') {
      pool = pool.filter(q => q.topicId === selectedTopicId);
    }
    if (mode === 'challenge') {
      pool = pool.filter(q => q.difficulty === 'advanced' || q.difficulty === 'intermediate');
    } else if (difficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === difficulty);
    }
    poolCount = pool.length;
  }

  const effectiveCount = Math.min(questionCount, poolCount);

  const handleStartQuiz = () => {
    const params = new URLSearchParams({
      mode,
      topic: selectedTopicId,
      difficulty,
      count: String(questionCount),
      hints: String(hintsEnabled),
      immediate: String(immediateFeedback),
      timer: String(timerEnabled),
      minutes: String(timerMinutes),
    });
    navigate(`/quiz?${params.toString()}`);
  };

  const availableTopics = TOPICS.filter(t => t.isAvailable);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Configure Practice Quiz
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Customize your study session: choose a focused topic, difficulty level, timer settings, and feedback modes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Mode Selection */}
        <Card className="p-6">
          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">
            Choose Quiz Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'quick', label: 'Quick Quiz', desc: '10 Questions', icon: Zap },
              { id: 'standard', label: 'Standard', desc: '20 Questions', icon: Target },
              { id: 'deep', label: 'Deep Practice', desc: 'Up to 50 Qs', icon: Sparkles },
              { id: 'challenge', label: 'Challenge', desc: 'Hard Questions', icon: Flame },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeChange(item.id as QuizMode)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 ring-2 ring-brand-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-brand-600 dark:text-brand-400' : 'text-slate-500'}`} />
                  <div className="font-bold text-sm text-slate-900 dark:text-white">{item.label}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              );
            })}
          </div>

          {activeMistakeIds.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => handleModeChange('revision')}
                className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  mode === 'revision'
                    ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-2 ring-rose-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">
                      Revision Mode (Mistakes Notebook)
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Practice only questions you previously answered incorrectly ({activeMistakeIds.length} available)
                    </div>
                  </div>
                </div>
                <Badge variant="danger" size="sm">
                  {activeMistakeIds.length} Qs
                </Badge>
              </button>
            </div>
          )}
        </Card>

        {/* Topic & Difficulty Settings */}
        {mode !== 'revision' && (
          <Card className="p-6 space-y-5">
            <div>
              <label htmlFor="topic-select" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                Select Curriculum Topic
              </label>
              <select
                id="topic-select"
                value={selectedTopicId}
                onChange={(e) => setSelectedTopicId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">🌟 All Available Topics (Comprehensive Mixed Quiz)</option>
                {availableTopics.map((topic) => {
                  const count = ALL_QUESTIONS.filter(q => q.topicId === topic.id).length;
                  return (
                    <option key={topic.id} value={topic.id}>
                      {topic.title} ({count} questions)
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty-select" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Target Difficulty
                </label>
                <select
                  id="difficulty-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'all' | QuestionDifficulty)}
                  disabled={mode === 'challenge'}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50"
                >
                  <option value="all">All Difficulties (Adaptive)</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Number of Questions */}
              <div>
                <label htmlFor="count-select" className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
                  Question Count
                </label>
                <select
                  id="count-select"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value={5}>5 Questions (Micro Practice)</option>
                  <option value={10}>10 Questions (Quick Session)</option>
                  <option value={15}>15 Questions (Focused)</option>
                  <option value={20}>20 Questions (Standard Quiz)</option>
                  <option value={30}>30 Questions (Thorough)</option>
                  <option value={50}>50 Questions (Deep Practice)</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Practice Preferences */}
        <Card className="p-6 space-y-4">
          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1">
            Learning Experience Preferences
          </label>

          <div className="space-y-3">
            {/* Immediate Feedback */}
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <div>
                <div className="font-semibold text-sm text-slate-900 dark:text-white">
                  Immediate Feedback & Explanations
                </div>
                <div className="text-xs text-slate-500">
                  Show correct answers and misconception breakdowns right after submitting each question
                </div>
              </div>
              <input
                type="checkbox"
                checked={immediateFeedback}
                onChange={(e) => setImmediateFeedback(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
            </label>

            {/* Study Hints */}
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40">
              <div>
                <div className="font-semibold text-sm text-slate-900 dark:text-white">
                  Allow Conceptual Hints
                </div>
                <div className="text-xs text-slate-500">
                  Allow viewing subtle clues before submitting an answer
                </div>
              </div>
              <input
                type="checkbox"
                checked={hintsEnabled}
                onChange={(e) => setHintsEnabled(e.target.checked)}
                className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
              />
            </label>

            {/* Timed Challenge */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">
                    Enable Countdown Timer
                  </div>
                  <div className="text-xs text-slate-500">
                    Add gentle time-management constraint to the quiz
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                />
              </label>

              {timerEnabled && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <span className="text-xs text-slate-600 dark:text-slate-400">Duration:</span>
                  <div className="flex gap-2">
                    {[5, 10, 15, 20].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setTimerMinutes(mins)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                          timerMinutes === mins
                            ? 'bg-brand-600 text-white border-brand-600'
                            : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {mins} min
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Availability Notification Callout */}
        <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <div className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
              <span className="font-bold">{poolCount} question{poolCount === 1 ? '' : 's'}</span> available matching your criteria.
              {poolCount < questionCount && poolCount > 0 && (
                <span className="block text-indigo-700 dark:text-indigo-300 text-xs mt-0.5">
                  Notice: Requested {questionCount} questions, but only {poolCount} are currently available in this specific filter. You will receive all {poolCount}.
                </span>
              )}
            </div>
          </div>
          <Badge variant="primary" size="md">
            {effectiveCount} Qs Quiz
          </Badge>
        </div>

        {/* Action Button */}
        <Button
          size="lg"
          variant="primary"
          className="w-full text-base py-4 font-bold shadow-md shadow-brand-500/20"
          onClick={handleStartQuiz}
          disabled={poolCount === 0}
          icon={<Play className="w-5 h-5 fill-current" />}
        >
          {poolCount === 0 ? 'No Questions Matching Criteria' : `Launch Quiz (${effectiveCount} Questions)`}
        </Button>
      </div>
    </div>
  );
};
