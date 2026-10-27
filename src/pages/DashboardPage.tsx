import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Play,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Clock,
  Compass
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { TOPICS } from '../data/topics';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { calculateAccuracy, formatTime } from '../lib/scoring';

export const DashboardPage: React.FC = () => {
  const { progress } = useProgress();
  const navigate = useNavigate();

  const totalAnswered = progress.totalAnswered;
  const totalCorrect = progress.totalCorrect;
  const accuracy = calculateAccuracy(totalCorrect, totalAnswered);

  const availableTopics = TOPICS.filter(t => t.isAvailable);
  const topicsPracticedCount = Object.keys(progress.topicStats).length;
  const activeMistakes = Object.values(progress.mistakes).filter(m => !m.isUnderstood);

  // Next recommended topic (first unpracticed or available)
  const nextTopic = availableTopics.find(t => !progress.topicStats[t.id]) || availableTopics[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 1. Simple Welcome Heading & Primary Actions */}
      <div className="border-b border-[#E8E5DF] dark:border-[#2C2A26] pb-6 pt-2">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#242424] dark:text-[#FAF9F6]">
            Python Mastery Academy
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#77736D] dark:text-[#A8A49D] leading-relaxed">
            Study Python methods, syntax, and data structures through focused interactive questions.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/quiz-setup')}
              icon={<Play className="w-3.5 h-3.5 fill-current" />}
            >
              Start Quiz
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate(`/topic/${nextTopic.id}`)}
              icon={<BookOpen className="w-3.5 h-3.5" />}
            >
              Continue Learning
            </Button>

            {activeMistakes.length > 0 && (
              <button
                onClick={() => navigate('/mistakes')}
                className="text-xs text-[#C96B45] hover:underline flex items-center gap-1.5 ml-2 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Review {activeMistakes.length} mistakes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Small set of useful progress statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Answered */}
        <div className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
          <div className="text-xs text-[#77736D] dark:text-[#A8A49D]">Questions Answered</div>
          <div className="mt-1.5 text-2xl font-mono font-semibold text-[#242424] dark:text-[#FAF9F6]">
            {totalAnswered}
          </div>
          <div className="mt-1 text-[11px] text-[#77736D] dark:text-[#A8A49D]">
            {totalCorrect} correct
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
          <div className="text-xs text-[#77736D] dark:text-[#A8A49D]">Overall Accuracy</div>
          <div className="mt-1.5 text-2xl font-mono font-semibold text-[#287A52] dark:text-[#3BA472]">
            {accuracy}%
          </div>
          <div className="mt-1 text-[11px] text-[#77736D] dark:text-[#A8A49D]">
            Across all attempts
          </div>
        </div>

        {/* Learning Streak */}
        <div className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
          <div className="text-xs text-[#77736D] dark:text-[#A8A49D]">Current Streak</div>
          <div className="mt-1.5 text-2xl font-mono font-semibold text-[#C96B45]">
            {progress.streak.currentStreak} <span className="text-sm font-normal text-[#77736D]">days</span>
          </div>
          <div className="mt-1 text-[11px] text-[#77736D] dark:text-[#A8A49D]">
            Best: {progress.streak.bestStreak} days
          </div>
        </div>

        {/* Topics Studied */}
        <div className="p-4 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
          <div className="text-xs text-[#77736D] dark:text-[#A8A49D]">Topics Studied</div>
          <div className="mt-1.5 text-2xl font-mono font-semibold text-[#242424] dark:text-[#FAF9F6]">
            {topicsPracticedCount} <span className="text-sm font-normal text-[#77736D]">/ {availableTopics.length}</span>
          </div>
          <div className="mt-1 text-[11px] text-[#77736D] dark:text-[#A8A49D]">
            Core modules
          </div>
        </div>
      </div>

      {/* 3. Empty State or Active Learning Layout */}
      {totalAnswered === 0 ? (
        <Card className="text-center py-10 px-6">
          <div className="w-10 h-10 rounded-full bg-[#FAF0EB] text-[#C96B45] mx-auto flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-semibold text-[#242424] dark:text-[#FAF9F6]">
            Ready to test your Python knowledge?
          </h3>
          <p className="text-xs sm:text-sm text-[#77736D] dark:text-[#A8A49D] max-w-sm mx-auto mt-1 mb-5">
            Take a 10-question practice quiz or browse the topic curriculum to begin building mastery.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/quiz-setup')}
              icon={<Play className="w-3.5 h-3.5 fill-current" />}
            >
              Start First Quiz
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/learn')}
              icon={<Compass className="w-3.5 h-3.5" />}
            >
              View Curriculum
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Topics Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DF] dark:border-[#2C2A26]">
              <h3 className="text-sm font-semibold text-[#242424] dark:text-[#FAF9F6] uppercase tracking-wider">
                Topics
              </h3>
              <button
                onClick={() => navigate('/learn')}
                className="text-xs text-[#C96B45] hover:underline flex items-center gap-1"
              >
                All Topics <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-[#E8E5DF] dark:divide-[#2C2A26] rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C]">
              {availableTopics.slice(0, 5).map((topic) => {
                const stats = progress.topicStats[topic.id];
                const topicAcc = stats ? calculateAccuracy(stats.correct, stats.answered) : null;

                return (
                  <div
                    key={topic.id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-[#FAF9F6] dark:hover:bg-[#282623] transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-[#242424] dark:text-[#FAF9F6] truncate">
                        {topic.title}
                      </div>
                      <div className="text-xs text-[#77736D] dark:text-[#A8A49D] mt-0.5 truncate">
                        {topic.description}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      {topicAcc !== null ? (
                        <div className="text-right">
                          <span className="font-mono text-xs font-semibold text-[#287A52] dark:text-[#3BA472]">
                            {topicAcc}%
                          </span>
                          <div className="text-[10px] text-[#77736D]">
                            {stats.answered} answered
                          </div>
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#77736D] px-2 py-0.5 rounded bg-[#F3F1EC] dark:bg-[#282623]">
                          Not started
                        </span>
                      )}

                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => navigate(`/quiz-setup?topic=${topic.id}`)}
                      >
                        Quiz
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Compact Recent Activity & Mistakes */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DF] dark:border-[#2C2A26] mb-3">
                <h3 className="text-sm font-semibold text-[#242424] dark:text-[#FAF9F6] uppercase tracking-wider">
                  Recent Quizzes
                </h3>
                <span className="text-xs text-[#77736D]">
                  {progress.quizHistory.length} total
                </span>
              </div>

              {progress.quizHistory.length === 0 ? (
                <p className="text-xs text-[#77736D]">No quizzes completed yet.</p>
              ) : (
                <div className="space-y-2">
                  {progress.quizHistory.slice(0, 4).map((q) => {
                    const topic = q.topicId ? TOPICS.find(t => t.id === q.topicId) : null;
                    return (
                      <div
                        key={q.id}
                        className="p-3 rounded-lg border border-[#E8E5DF] dark:border-[#2C2A26] bg-white dark:bg-[#1F1E1C] text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#242424] dark:text-[#FAF9F6] truncate max-w-[150px]">
                            {topic ? topic.title : 'Mixed Topics'}
                          </span>
                          <span className={`font-mono font-semibold ${q.accuracy >= 70 ? 'text-[#287A52]' : 'text-[#B94B45]'}`}>
                            {q.accuracy}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[#77736D] text-[11px] mt-1">
                          <span>{q.correctAnswers}/{q.totalQuestions} correct</span>
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
            </div>

            {/* Subtle Mistakes Link / Card */}
            {activeMistakes.length > 0 && (
              <div className="p-4 rounded-xl border border-[#F2C5C3] dark:border-[#6B2824] bg-[#FBF0EF] dark:bg-[#301614]/30">
                <div className="text-xs font-semibold text-[#B94B45] dark:text-[#EDB0AC]">
                  {activeMistakes.length} Questions for Revision
                </div>
                <p className="text-xs text-[#55514B] dark:text-[#A8A49D] mt-1 mb-3">
                  Revisit your incorrect answers to strengthen recall.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full text-xs"
                  onClick={() => navigate('/mistakes')}
                >
                  Review Mistakes
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
