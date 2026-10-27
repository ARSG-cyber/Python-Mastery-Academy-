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
        <h2 className="text-2xl font-bold tracking-tight text-[#242424] dark:text-[#EAE6DF]">
          Configure Practice Quiz
        </h2>
        <p className="text-sm text-[#77736D] mt-1">
          Customize your study session: choose a focused topic, difficulty level, timer settings, and feedback modes.
        </p>
      </div>

      <div className="space-y-6">
        {/* Mode Selection */}
        <Card className="p-6">
          <label className="block text-sm font-semibold text-[#242424] dark:text-[#EAE6DF] mb-3">
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
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#C96B45] bg-[#FAF0EB] dark:bg-[#33170B] text-[#242424] dark:text-white shadow-sm ring-1 ring-[#C96B45]'
                      : 'border-[#E8E5DF] dark:border-[#2C2A26] hover:border-[#D1CDC7] bg-white dark:bg-[#201E1C] text-[#242424] dark:text-[#EAE6DF]'
                  }`}
                >
                  <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#C96B45]' : 'text-[#77736D]'}`} />
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div className="text-[11px] text-[#77736D] mt-0.5">{item.desc}</div>
                </button>
              );
            })}
          </div>

          {activeMistakeIds.length > 0 && (
            <div className="mt-3">
              <button
                type="button"
                onClick={() => handleModeChange('revision')}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                  mode === 'revision'
                    ? 'border-[#B94B45] bg-[#FDF2F2] dark:bg-[#301614] text-[#242424] dark:text-white ring-1 ring-[#B94B45]'
                    : 'border-[#E8E5DF] dark:border-[#2C2A26] hover:border-[#D1CDC7] bg-white dark:bg-[#201E1C]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FBF0EF] dark:bg-[#301614] text-[#B94B45] flex items-center justify-center">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#242424] dark:text-white">
                      Revision Mode (Mistakes Notebook)
                    </div>
                    <div className="text-xs text-[#77736D]">
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
              <label htmlFor="topic-select" className="block text-sm font-semibold text-[#242424] dark:text-[#EAE6DF] mb-2">
                Select Curriculum Topic
              </label>
              <select
                id="topic-select"
                value={selectedTopicId}
                onChange={(e) => setSelectedTopicId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#201E1C] text-sm font-medium text-[#242424] dark:text-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-[#C96B45] focus:border-[#C96B45]"
              >
                <option value="all">All Available Topics (Comprehensive Mixed Quiz)</option>
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
                <label htmlFor="difficulty-select" className="block text-sm font-semibold text-[#242424] dark:text-[#EAE6DF] mb-2">
                  Target Difficulty
                </label>
                <select
                  id="difficulty-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as 'all' | QuestionDifficulty)}
                  disabled={mode === 'challenge'}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#201E1C] text-sm font-medium text-[#242424] dark:text-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-[#C96B45] focus:border-[#C96B45] disabled:opacity-50"
                >
                  <option value="all">All Difficulties (Adaptive)</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Number of Questions */}
              <div>
                <label htmlFor="count-select" className="block text-sm font-semibold text-[#242424] dark:text-[#EAE6DF] mb-2">
                  Question Count
                </label>
                <select
                  id="count-select"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#201E1C] text-sm font-medium text-[#242424] dark:text-[#EAE6DF] focus:outline-none focus:ring-1 focus:ring-[#C96B45] focus:border-[#C96B45]"
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
          <label className="block text-sm font-semibold text-[#242424] dark:text-[#EAE6DF] mb-1">
            Learning Experience Preferences
          </label>

          <div className="space-y-3">
            {/* Immediate Feedback */}
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] cursor-pointer hover:bg-[#F3F1EC]/50 dark:hover:bg-[#282623]/50 transition-colors">
              <div>
                <div className="font-semibold text-sm text-[#242424] dark:text-[#EAE6DF]">
                  Immediate Feedback & Explanations
                </div>
                <div className="text-xs text-[#77736D]">
                  Show correct answers and misconception breakdowns right after submitting each question
                </div>
              </div>
              <input
                type="checkbox"
                checked={immediateFeedback}
                onChange={(e) => setImmediateFeedback(e.target.checked)}
                className="w-4 h-4 text-[#C96B45] accent-[#C96B45] rounded border-[#E8E5DF] focus:ring-[#C96B45]"
              />
            </label>

            {/* Study Hints */}
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] cursor-pointer hover:bg-[#F3F1EC]/50 dark:hover:bg-[#282623]/50 transition-colors">
              <div>
                <div className="font-semibold text-sm text-[#242424] dark:text-[#EAE6DF]">
                  Allow Conceptual Hints
                </div>
                <div className="text-xs text-[#77736D]">
                  Allow viewing subtle clues before submitting an answer
                </div>
              </div>
              <input
                type="checkbox"
                checked={hintsEnabled}
                onChange={(e) => setHintsEnabled(e.target.checked)}
                className="w-4 h-4 text-[#C96B45] accent-[#C96B45] rounded border-[#E8E5DF] focus:ring-[#C96B45]"
              />
            </label>

            {/* Timed Challenge */}
            <div className="p-3.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-semibold text-sm text-[#242424] dark:text-[#EAE6DF]">
                    Enable Countdown Timer
                  </div>
                  <div className="text-xs text-[#77736D]">
                    Add gentle time-management constraint to the quiz
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="w-4 h-4 text-[#C96B45] accent-[#C96B45] rounded border-[#E8E5DF] focus:ring-[#C96B45]"
                />
              </label>

              {timerEnabled && (
                <div className="pt-2 border-t border-[#E8E5DF] dark:border-[#2C2A26] flex items-center gap-3">
                  <span className="text-xs text-[#77736D]">Duration:</span>
                  <div className="flex gap-2">
                    {[5, 10, 15, 20].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setTimerMinutes(mins)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-colors ${
                          timerMinutes === mins
                            ? 'bg-[#C96B45] text-white border-[#C96B45]'
                            : 'border-[#E8E5DF] dark:border-[#2C2A26] hover:bg-[#F3F1EC] text-[#242424] dark:text-[#EAE6DF]'
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
        <div className="p-4 rounded-xl bg-[#FAF0EB] dark:bg-[#33170B]/50 border border-[#F0D5C7] dark:border-[#5A2B18] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-[#C96B45] flex-shrink-0" />
            <div className="text-xs sm:text-sm text-[#242424] dark:text-[#EAE6DF]">
              <span className="font-bold">{poolCount} question{poolCount === 1 ? '' : 's'}</span> available matching your criteria.
              {poolCount < questionCount && poolCount > 0 && (
                <span className="block text-[#77736D] text-xs mt-0.5">
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
          className="w-full text-base py-3.5 font-semibold"
          onClick={handleStartQuiz}
          disabled={poolCount === 0}
          icon={<Play className="w-4 h-4 fill-current" />}
        >
          {poolCount === 0 ? 'No Questions Matching Criteria' : `Launch Quiz (${effectiveCount} Questions)`}
        </Button>
      </div>
    </div>
  );
};
