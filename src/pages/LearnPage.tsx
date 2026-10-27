import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Clock,
  ArrowRight
} from 'lucide-react';
import { TOPICS, TOPIC_CATEGORIES } from '../data/topics';
import { ALL_QUESTIONS } from '../data/questions';
import { useProgress } from '../context/ProgressContext';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { calculateAccuracy } from '../lib/scoring';

export const LearnPage: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Filter topics
  const filteredTopics = TOPICS.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' || topic.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Python Curriculum Library
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          A structured 50-topic pathway covering fundamental concepts, control flow, collections, methods, and advanced Python architecture.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics (e.g. string methods, slicing, loops)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Categories</option>
            {TOPIC_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Category Grouping */}
      {TOPIC_CATEGORIES.map((category) => {
        const topicsInCategory = filteredTopics.filter(t => t.category === category);
        if (topicsInCategory.length === 0) return null;

        return (
          <div key={category} className="space-y-4 pt-2">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {category} ({topicsInCategory.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topicsInCategory.map((topic) => {
                const topicQuestions = ALL_QUESTIONS.filter(q => q.topicId === topic.id);
                const questionCount = topicQuestions.length;
                const stats = progress.topicStats[topic.id];
                const accuracy = stats ? calculateAccuracy(stats.correct, stats.answered) : 0;

                return (
                  <Card
                    key={topic.id}
                    hoverable={topic.isAvailable}
                    onClick={() => {
                      if (topic.isAvailable) {
                        navigate(`/topic/${topic.id}`);
                      }
                    }}
                    className={`flex flex-col justify-between p-5 relative transition-all ${
                      !topic.isAvailable ? 'opacity-70 bg-slate-50/50 dark:bg-slate-950/40' : ''
                    }`}
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                          #{topic.order.toString().padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-1.5">
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

                          {topic.isAvailable ? (
                            <Badge variant="python" size="sm">
                              {questionCount} Qs
                            </Badge>
                          ) : (
                            <Badge variant="default" size="sm">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-brand-600 transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {topic.description}
                      </p>
                    </div>

                    {/* Bottom Status / Stats */}
                    <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800">
                      {topic.isAvailable ? (
                        stats && stats.answered > 0 ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-medium">
                              <span className="text-slate-500">Mastery</span>
                              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">
                                {accuracy}% ({stats.answered} answered)
                              </span>
                            </div>
                            <ProgressBar value={accuracy} size="sm" variant={accuracy >= 80 ? 'success' : 'brand'} />
                          </div>
                        ) : (
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>Not attempted yet</span>
                            <span className="text-brand-600 dark:text-brand-400 font-semibold flex items-center gap-1">
                              Practice <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Curriculum in development</span>
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
