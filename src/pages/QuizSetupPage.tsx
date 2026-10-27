import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Play,
  BookOpen,
  Target,
  GraduationCap,
  Flame
} from 'lucide-react';
import { TOPICS } from '../data/topics';
import { ALL_QUESTIONS } from '../data/questions';
import { useProgress } from '../context/ProgressContext';
import { Button } from '../components/common/Button';
import { QuizMode } from '../types/progress';
import { QuestionDifficulty } from '../types/question';

export const QuizSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { progress } = useProgress();

  const preselectedTopic = searchParams.get('topic') || 'all';
  const preselectedMode = (searchParams.get('mode') as QuizMode) || 'practice';

  const [mode, setMode] = useState<QuizMode>(preselectedMode);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(preselectedTopic);
  const [difficulty, setDifficulty] = useState<'all' | QuestionDifficulty>(
    progress.settings?.defaultDifficulty || 'all'
  );
  const [questionCount, setQuestionCount] = useState<number>(
    preselectedMode === 'learn' ? 10 : preselectedMode === 'exam' ? 20 : 15
  );
  const [hintsEnabled, setHintsEnabled] = useState<boolean>(
    preselectedMode === 'exam' ? false : (progress.settings?.hintsEnabled ?? true)
  );
  const [timerEnabled, setTimerEnabled] = useState<boolean>(
    progress.settings?.timerEnabled ?? false
  );
  const [timerMinutes, setTimerMinutes] = useState<number>(
    progress.settings?.timerDurationMinutes ?? 15
  );

  // Handle mode selection and update intelligent defaults
  const handleModeChange = (newMode: QuizMode) => {
    setMode(newMode);
    if (newMode === 'learn') {
      setQuestionCount(10);
      setHintsEnabled(true);
      setTimerEnabled(false);
    } else if (newMode === 'practice') {
      setQuestionCount(15);
      setHintsEnabled(true);
    } else if (newMode === 'exam') {
      setQuestionCount(20);
      setHintsEnabled(false);
    } else if (newMode === 'challenge') {
      setQuestionCount(12);
      setDifficulty('advanced');
    }
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

  const effectiveCount = Math.min(questionCount, Math.max(1, poolCount));

  const handleStartQuiz = () => {
    const params = new URLSearchParams({
      mode,
      topic: selectedTopicId,
      difficulty: mode === 'challenge' ? 'advanced' : difficulty,
      count: String(questionCount),
      hints: String(mode === 'exam' ? false : hintsEnabled),
      timer: String(timerEnabled),
      minutes: String(timerMinutes),
    });
    navigate(`/quiz?${params.toString()}`);
  };

  const availableTopics = TOPICS.filter(t => t.isAvailable);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#242424] dark:text-[#FAF9F6]">
          Configure Session
        </h2>
        <p className="text-sm text-[#77736D] dark:text-[#A8A49D] mt-1.5 leading-relaxed">
          Select an intentional learning mode and tailor questions to your current study goals.
        </p>
      </div>

      <div className="space-y-5">
        {/* Four Primary Learning Modes */}
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49D]">
            Learning Mode
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              {
                id: 'learn',
                title: 'Learn Mode',
                desc: 'Step-by-step guidance with immediate explanations and optional hints.',
                icon: BookOpen,
                badge: 'Beginner Friendly'
              },
              {
                id: 'practice',
                title: 'Practice Mode',
                desc: 'Target specific topics, adjust question count, and receive instant feedback.',
                icon: Target,
                badge: 'Flexible'
              },
              {
                id: 'exam',
                title: 'Exam Mode',
                desc: 'Simulate a formal test. No hints or immediate feedback until the exam concludes.',
                icon: GraduationCap,
                badge: 'Assessment'
              },
              {
                id: 'challenge',
                title: 'Challenge Mode',
                desc: 'Tackle tricky edge cases, predict-the-output puzzles, and advanced mechanics.',
                icon: Flame,
                badge: 'Advanced'
              },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = mode === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleModeChange(item.id as QuizMode)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-[#C96B45] bg-[#FAF0EB] dark:bg-[#282623] text-[#242424] dark:text-[#FAF9F6] shadow-sm ring-1 ring-[#C96B45]'
                      : 'border-[#E8E5DF] dark:border-[#2C2A26] hover:border-[#D8D4CC] dark:hover:border-[#3D3A35] bg-white dark:bg-[#1F1E1C] text-[#242424] dark:text-[#E8E5DF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-[#C96B45]' : 'text-[#77736D]'}`} />
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-[#C96B45] text-white'
                        : 'bg-[#F3F1EC] dark:bg-[#282623] text-[#77736D] dark:text-[#A8A49D]'
                    }`}>
                      {item.badge}
                    </span>
                  </div>
                  <div className="font-semibold text-sm text-[#242424] dark:text-[#FAF9F6]">
                    {item.title}
                  </div>
                  <div className="text-xs text-[#77736D] dark:text-[#A8A49D] mt-1 leading-normal">
                    {item.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Options Card: Topic, Difficulty, Count, Settings */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C] space-y-5 shadow-sm">
          {/* Topic Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49D] mb-2">
              Topic Selection
            </label>
            <select
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-[#FAF9F6] dark:bg-[#181715] text-sm text-[#242424] dark:text-[#FAF9F6] focus:outline-none focus:ring-1 focus:ring-[#C96B45]"
            >
              <option value="all">All Topics (Curriculum Blend)</option>
              {availableTopics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title} ({topic.category})
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty & Question Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49D] mb-2">
                Difficulty Level
              </label>
              <select
                value={mode === 'challenge' ? 'advanced' : difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                disabled={mode === 'challenge'}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-[#FAF9F6] dark:bg-[#181715] text-sm text-[#242424] dark:text-[#FAF9F6] focus:outline-none focus:ring-1 focus:ring-[#C96B45] disabled:opacity-50"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49D] mb-2">
                Questions: {questionCount}
              </label>
              <div className="flex items-center gap-2">
                {[5, 10, 15, 20, 30].map((cnt) => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`flex-1 py-2 rounded-lg text-xs font-mono font-medium border transition-colors ${
                      questionCount === cnt
                        ? 'border-[#C96B45] bg-[#FAF0EB] text-[#C96B45]'
                        : 'border-[#E8E5DF] dark:border-[#2C2A26] text-[#77736D] hover:border-[#D8D4CC]'
                    }`}
                  >
                    {cnt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="pt-2 border-t border-[#E8E5DF] dark:border-[#2C2A26] space-y-3">
            {mode !== 'exam' && (
              <label className="flex items-center justify-between text-xs sm:text-sm text-[#242424] dark:text-[#FAF9F6] cursor-pointer">
                <div>
                  <div className="font-medium">Enable Question Hints</div>
                  <div className="text-xs text-[#77736D]">Provide pedagogical clues on demand</div>
                </div>
                <input
                  type="checkbox"
                  checked={hintsEnabled}
                  onChange={(e) => setHintsEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C96B45] focus:ring-[#C96B45] border-[#E8E5DF]"
                />
              </label>
            )}

            <label className="flex items-center justify-between text-xs sm:text-sm text-[#242424] dark:text-[#FAF9F6] cursor-pointer">
              <div>
                <div className="font-medium">Timed Session</div>
                <div className="text-xs text-[#77736D]">Pace your responses with a timer</div>
              </div>
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#C96B45] focus:ring-[#C96B45] border-[#E8E5DF]"
              />
            </label>

            {timerEnabled && (
              <div className="flex items-center gap-2 pl-4">
                <span className="text-xs text-[#77736D]">Duration:</span>
                {[5, 10, 15, 20].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimerMinutes(mins)}
                    className={`px-2.5 py-1 rounded text-xs font-mono border ${
                      timerMinutes === mins
                        ? 'border-[#C96B45] bg-[#FAF0EB] text-[#C96B45]'
                        : 'border-[#E8E5DF] dark:border-[#2C2A26] text-[#77736D]'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Start Button */}
        <Button
          size="lg"
          variant="primary"
          onClick={handleStartQuiz}
          className="w-full font-medium"
          icon={<Play className="w-4 h-4 fill-current" />}
        >
          Begin {mode.toUpperCase()} Session ({effectiveCount} Questions)
        </Button>
      </div>
    </div>
  );
};
