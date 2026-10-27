import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  BookOpen,
  ArrowRight,
  RotateCcw,
  GraduationCap,
  Target,
  Flame
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { TOPICS, TOPIC_CATEGORIES } from '../data/topics';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { calculateAccuracy } from '../lib/scoring';

export const DashboardPage: React.FC = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  const totalAnswered = progress.totalAnswered;
  const totalCorrect = progress.totalCorrect;
  const accuracy = calculateAccuracy(totalCorrect, totalAnswered);

  const availableTopics = TOPICS.filter(t => t.isAvailable);
  const activeMistakes = Object.values(progress.mistakes).filter(m => !m.isUnderstood);

  // Progressive disclosure category filter for topics
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Next recommended topic (first unpracticed or available)
  const nextTopic = availableTopics.find(t => !progress.topicStats[t.id]) || availableTopics[0];

  const filteredTopics = activeCategory === 'all'
    ? availableTopics.slice(0, 8)
    : availableTopics.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* 1. Small, elegant header with product name and context */}
      <div className="border-b border-[#E8E5DF] dark:border-[#2C2A26] pb-5">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#242424] dark:text-[#FAF9F6]">
          Python Mastery Academy
        </h2>
        <p className="mt-1 text-sm text-[#77736D] dark:text-[#A8A49D] leading-relaxed">
          A calm, focused environment for understanding Python syntax, semantics, and real-world behavior.
        </p>
      </div>

      {/* 2. Primary Spotlight: "What should I do next?" (Continue Learning) */}
      <div className="p-6 sm:p-7 rounded-2xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition-colors">
        <div className="space-y-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C96B45]">
              Recommended Next
            </span>
            <Badge variant="default" size="sm">
              {nextTopic.difficulty}
            </Badge>
          </div>
          <h3 className="text-lg sm:text-xl font-medium text-[#242424] dark:text-[#FAF9F6]">
            {nextTopic.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#77736D] dark:text-[#A8A49D] leading-relaxed">
            {nextTopic.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto flex-shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate(`/quiz?mode=learn&topic=${nextTopic.id}&count=10`)}
            icon={<Play className="w-3.5 h-3.5 fill-current" />}
          >
            Start Learning
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate(`/topic/${nextTopic.id}`)}
            icon={<BookOpen className="w-3.5 h-3.5" />}
          >
            Read Topic
          </Button>
        </div>
      </div>

      {/* 3. Small progress summary: "Where am I in my Python learning journey?" */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
          <div className="text-xs text-[#77736D] dark:text-[#A8A49D]">Answered</div>
          <div className="mt-1 text-xl sm:text-2xl font-mono font-medium text-[#242424] dark:text-[#FAF9F6]">
            {totalAnswered}
          </div>
          <div className="text-[11px] text-[#77736D] mt-0.5">{totalCorrect} correct</div>
        </div>

        <div className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
          <div className="text-xs text-[#77736D] dark:text-[#A8A49D]">Accuracy</div>
          <div className={`mt-1 text-xl sm:text-2xl font-mono font-medium ${
            accuracy >= 70 ? 'text-[#287A52]' : totalAnswered > 0 ? 'text-[#C96B45]' : 'text-[#77736D]'
          }`}>
            {accuracy}%
          </div>
          <div className="text-[11px] text-[#77736D] mt-0.5">Overall precision</div>
        </div>

        <div className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
          <div className="text-xs text-[#77736D] dark:text-[#A8A49D]">Streak</div>
          <div className="mt-1 text-xl sm:text-2xl font-mono font-medium text-[#C96B45]">
            {progress.streak.currentStreak} <span className="text-xs font-normal text-[#77736D]">days</span>
          </div>
          <div className="text-[11px] text-[#77736D] mt-0.5">Best: {progress.streak.bestStreak} days</div>
        </div>

        <div className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
          <div className="text-xs text-[#77736D] dark:text-[#A8A49D]">Topics Explored</div>
          <div className="mt-1 text-xl sm:text-2xl font-mono font-medium text-[#242424] dark:text-[#FAF9F6]">
            {Object.keys(progress.topicStats).length} <span className="text-xs font-normal text-[#77736D]">/ {availableTopics.length}</span>
          </div>
          <div className="text-[11px] text-[#77736D] mt-0.5">Curriculum modules</div>
        </div>
      </div>

      {/* 4. Four Core Learning Modes: "What can I practice?" */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#E8E5DF] dark:border-[#2C2A26]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49D]">
            Practice Modes
          </h3>
          <span className="text-xs text-[#77736D]">Choose your study style</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              id: 'learn',
              title: 'Learn',
              desc: 'Guided sessions with hints and explanations.',
              icon: BookOpen,
              url: '/quiz-setup?mode=learn'
            },
            {
              id: 'practice',
              title: 'Practice',
              desc: 'Targeted drills by topic and difficulty.',
              icon: Target,
              url: '/quiz-setup?mode=practice'
            },
            {
              id: 'exam',
              title: 'Exam',
              desc: 'Formal assessment without hints or answers.',
              icon: GraduationCap,
              url: '/quiz-setup?mode=exam'
            },
            {
              id: 'challenge',
              title: 'Challenge',
              desc: 'Tricky outputs and deep Python edge cases.',
              icon: Flame,
              url: '/quiz-setup?mode=challenge'
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => navigate(item.url)}
                className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C] hover:border-[#C96B45]/50 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF0EB] dark:bg-[#282623] text-[#C96B45] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#242424] dark:text-[#FAF9F6] flex items-center gap-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#77736D] dark:text-[#A8A49D] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 text-xs text-[#C96B45] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Enter Mode <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Python Learning Topics with Progressive Disclosure */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[#E8E5DF] dark:border-[#2C2A26]">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#77736D] dark:text-[#A8A49D]">
            Curriculum Topics
          </h3>

          {/* Simple Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#FAF0EB] text-[#C96B45]'
                  : 'text-[#77736D] hover:text-[#242424]'
              }`}
            >
              All
            </button>
            {TOPIC_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#FAF0EB] text-[#C96B45]'
                    : 'text-[#77736D] hover:text-[#242424]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#E8E5DF] dark:divide-[#2C2A26] rounded-2xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C] overflow-hidden">
          {filteredTopics.map((topic) => {
            const stats = progress.topicStats[topic.id];
            const topicAcc = stats ? calculateAccuracy(stats.correct, stats.answered) : null;

            return (
              <div
                key={topic.id}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FAF9F6] dark:hover:bg-[#282623] transition-colors"
              >
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[#242424] dark:text-[#FAF9F6] truncate">
                      {topic.title}
                    </span>
                    <Badge
                      variant={
                        topic.difficulty === 'beginner'
                          ? 'success'
                          : topic.difficulty === 'intermediate'
                          ? 'warning'
                          : 'default'
                      }
                      size="sm"
                    >
                      {topic.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#77736D] dark:text-[#A8A49D] truncate max-w-xl">
                    {topic.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {topicAcc !== null ? (
                    <div className="text-right hidden sm:block">
                      <span className="font-mono text-xs font-semibold text-[#287A52] dark:text-[#3BA472]">
                        {topicAcc}%
                      </span>
                      <div className="text-[10px] text-[#77736D]">
                        {stats.answered} answered
                      </div>
                    </div>
                  ) : (
                    <span className="text-[11px] text-[#77736D] px-2 py-0.5 rounded bg-[#F3F1EC] dark:bg-[#282623] hidden sm:inline-block">
                      New
                    </span>
                  )}

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/quiz-setup?topic=${topic.id}`)}
                  >
                    Practice
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {activeCategory === 'all' && availableTopics.length > 8 && (
          <div className="text-center pt-1">
            <button
              onClick={() => navigate('/learn')}
              className="text-xs text-[#C96B45] hover:underline font-medium inline-flex items-center gap-1"
            >
              Browse Full Curriculum ({availableTopics.length} Topics) <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* 6. Secondary Area: Reviewing Mistakes */}
      {activeMistakes.length > 0 && (
        <div className="p-5 rounded-2xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-[#FAF9F6] dark:bg-[#1F1E1C] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#B94B45]" />
              <h4 className="text-sm font-semibold text-[#242424] dark:text-[#FAF9F6]">
                Mistakes Notebook ({activeMistakes.length} Pending)
              </h4>
            </div>
            <p className="text-xs text-[#77736D] dark:text-[#A8A49D]">
              Strengthen memory retention by reviewing concepts you missed in previous quizzes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/mistakes')}
            >
              Open Notebook
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => navigate('/quiz-setup?mode=revision')}
              icon={<RotateCcw className="w-3 h-3" />}
            >
              Practice Mistakes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
