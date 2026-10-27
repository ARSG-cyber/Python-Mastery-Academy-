import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  LayoutDashboard,
  Lightbulb,
  BookOpen,
  Filter
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ALL_QUESTIONS } from '../data/questions';
import { TOPICS } from '../data/topics';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { CodeBlock } from '../components/common/CodeBlock';
import { formatTime } from '../lib/scoring';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { progress } = useProgress();

  const attemptId = searchParams.get('attempt');
  const attempt = progress.quizHistory.find(q => q.id === attemptId) || progress.quizHistory[0];

  const [reviewFilter, setReviewFilter] = useState<'missed' | 'all'>('missed');

  if (!attempt) {
    return (
      <Card className="p-8 text-center space-y-4 max-w-lg mx-auto">
        <h3 className="text-lg font-semibold text-[#242424] dark:text-[#FAF9F6]">No Quiz Result Found</h3>
        <p className="text-xs text-[#77736D]">Take a quiz first to view results and analytics.</p>
        <Button variant="primary" onClick={() => navigate('/quiz-setup')}>
          Start Practice Quiz
        </Button>
      </Card>
    );
  }

  const allQuestionsWithResults = attempt.questions
    .map(q => ({
      result: q,
      question: ALL_QUESTIONS.find(item => item.id === q.questionId)!,
    }))
    .filter(item => item.question !== undefined);

  const missedQuestions = allQuestionsWithResults.filter(
    item => !item.result.isCorrect && !item.result.isSkipped
  );

  const displayedQuestions = reviewFilter === 'missed' && missedQuestions.length > 0
    ? missedQuestions
    : allQuestionsWithResults;

  // Helper to resolve answer ID to text
  const resolveAnswerText = (q: any, answerVal: any): string => {
    if (!answerVal) return 'None';
    if (Array.isArray(answerVal)) {
      return answerVal.map(val => {
        const found = q.options?.find((o: any) => o.id === val || o.text === val || o === val);
        return found ? (found.text || found) : val;
      }).join(', ');
    }
    const found = q.options?.find((o: any) => o.id === answerVal || o.text === answerVal || o === answerVal);
    return found ? (found.text || found) : String(answerVal);
  };

  const handleRetryMissed = () => {
    if (missedQuestions.length === 0) return;
    navigate('/quiz-setup?mode=revision');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Calm, Dignified Performance Card */}
      <div className="bg-white dark:bg-[#1F1E1C] border border-[#E8E5DF] dark:border-[#2C2A26] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-[#FAF0EB] text-[#C96B45] mx-auto flex items-center justify-center">
          <Trophy className="w-6 h-6" />
        </div>

        <div>
          <Badge variant="primary" size="sm">
            {attempt.mode.toUpperCase()} SESSION COMPLETED
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#242424] dark:text-[#FAF9F6] mt-2 tracking-tight">
            {attempt.accuracy >= 80
              ? 'Excellent Performance'
              : attempt.accuracy >= 60
              ? 'Good Progress'
              : 'Keep Practicing'}
          </h2>
          <p className="text-xs sm:text-sm text-[#77736D] dark:text-[#A8A49D] max-w-md mx-auto mt-1">
            {attempt.accuracy >= 80
              ? 'You demonstrated reliable understanding of the tested concepts.'
              : 'Review your responses below to reinforce challenging areas.'}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto pt-2">
          <div className="p-3.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-[#FAF9F6] dark:bg-[#181715]">
            <div className="text-xs text-[#77736D]">Accuracy</div>
            <div className={`text-xl sm:text-2xl font-semibold font-mono mt-0.5 ${
              attempt.accuracy >= 70 ? 'text-[#287A52]' : 'text-[#C96B45]'
            }`}>
              {attempt.accuracy}%
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-[#FAF9F6] dark:bg-[#181715]">
            <div className="text-xs text-[#77736D]">Correct</div>
            <div className="text-xl sm:text-2xl font-semibold font-mono text-[#287A52] mt-0.5">
              {attempt.correctAnswers} <span className="text-xs font-normal text-[#77736D]">/ {attempt.totalQuestions}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-[#FAF9F6] dark:bg-[#181715]">
            <div className="text-xs text-[#77736D]">Incorrect</div>
            <div className="text-xl sm:text-2xl font-semibold font-mono text-[#B94B45] mt-0.5">
              {attempt.incorrectAnswers}
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-[#E8E5DF] dark:border-[#2C2A26] bg-[#FAF9F6] dark:bg-[#181715]">
            <div className="text-xs text-[#77736D]">Time Spent</div>
            <div className="text-xl sm:text-2xl font-semibold font-mono text-[#242424] dark:text-[#FAF9F6] mt-0.5">
              {formatTime(attempt.timeSpentSeconds)}
            </div>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
          {missedQuestions.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={handleRetryMissed}
              icon={<RotateCcw className="w-3.5 h-3.5 text-[#C96B45]" />}
            >
              Practice Missed ({missedQuestions.length})
            </Button>
          )}

          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/quiz-setup')}
            icon={<Play className="w-3.5 h-3.5 fill-current" />}
          >
            Start Another Quiz
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate('/')}
            icon={<LayoutDashboard className="w-3.5 h-3.5" />}
          >
            Dashboard
          </Button>
        </div>
      </div>

      {/* Questions Review Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DF] dark:border-[#2C2A26]">
          <h3 className="text-sm font-semibold text-[#242424] dark:text-[#FAF9F6] uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C96B45]" />
            Session Review
          </h3>

          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-[#77736D]" />
            <button
              onClick={() => setReviewFilter('missed')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                reviewFilter === 'missed'
                  ? 'bg-[#FAF0EB] text-[#C96B45]'
                  : 'text-[#77736D] hover:text-[#242424]'
              }`}
            >
              Missed ({missedQuestions.length})
            </button>
            <button
              onClick={() => setReviewFilter('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                reviewFilter === 'all'
                  ? 'bg-[#FAF0EB] text-[#C96B45]'
                  : 'text-[#77736D] hover:text-[#242424]'
              }`}
            >
              All Questions ({allQuestionsWithResults.length})
            </button>
          </div>
        </div>

        {displayedQuestions.length === 0 ? (
          <Card className="p-6 text-center border-[#C3E4D4] bg-[#EBF5F0]/50 dark:bg-[#152E20]/20">
            <CheckCircle2 className="w-6 h-6 text-[#287A52] mx-auto mb-1.5" />
            <h4 className="text-sm font-semibold text-[#287A52]">
              All Questions Answered Correctly!
            </h4>
            <p className="text-xs text-[#55514B] dark:text-[#A8A49D] mt-0.5">
              You answered every question accurately in this session.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {displayedQuestions.map(({ question, result }, index) => {
              const topic = TOPICS.find(t => t.id === question.topicId);
              const selectedDisplay = resolveAnswerText(question, result.selectedAnswer);
              const misconception = question.incorrectExplanations && (
                question.incorrectExplanations[selectedDisplay] ||
                (typeof result.selectedAnswer === 'string' && question.incorrectExplanations[result.selectedAnswer])
              );

              return (
                <div
                  key={question.id}
                  className={`p-5 rounded-2xl border transition-colors space-y-3 bg-white dark:bg-[#1F1E1C] ${
                    result.isCorrect
                      ? 'border-[#C3E4D4] dark:border-[#206342]'
                      : 'border-[#F2C5C3] dark:border-[#6B2824]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-[#77736D]">
                    <div className="flex items-center gap-2">
                      {result.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#287A52]" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#B94B45]" />
                      )}
                      <span className="font-medium text-[#242424] dark:text-[#FAF9F6]">
                        Question {index + 1} • {topic?.title || question.topicId}
                      </span>
                    </div>

                    <Badge variant={question.difficulty === 'beginner' ? 'success' : 'warning'} size="sm">
                      {question.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-[#242424] dark:text-[#FAF9F6]">
                      {question.questionText}
                    </h4>

                    {question.codeSnippet && (
                      <div className="mt-2.5">
                        <CodeBlock code={question.codeSnippet} language="python" showLineNumbers={true} />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className={`p-2.5 rounded-xl border ${
                      result.isCorrect
                        ? 'bg-[#EBF5F0] border-[#C3E4D4] dark:bg-[#152E20]/30 dark:border-[#206342]'
                        : 'bg-[#FBF0EF] border-[#F2C5C3] dark:bg-[#301614]/30 dark:border-[#6B2824]'
                    }`}>
                      <span className={`text-[11px] block font-medium ${
                        result.isCorrect ? 'text-[#287A52]' : 'text-[#B94B45]'
                      }`}>
                        Your Selection:
                      </span>
                      <span className="font-mono text-[#242424] dark:text-[#FAF9F6]">{selectedDisplay}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#EBF5F0] dark:bg-[#152E20]/30 border border-[#C3E4D4] dark:border-[#206342]">
                      <span className="text-[11px] text-[#287A52] block font-medium">Correct Answer:</span>
                      <span className="font-mono text-[#242424] dark:text-[#FAF9F6]">
                        {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {!result.isCorrect && misconception && (
                    <div className="p-2.5 rounded-xl bg-[#FEF6EE] dark:bg-[#332012]/30 border border-[#F9DBAF] dark:border-[#7A3608] text-xs text-[#55514B] dark:text-[#E8E5DF]">
                      <span className="font-semibold text-[#B54708] flex items-center gap-1 mb-0.5">
                        <Lightbulb className="w-3.5 h-3.5" />
                        Common misconception:
                      </span>
                      {misconception}
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-[#FAF9F6] dark:bg-[#181715] border border-[#E8E5DF] dark:border-[#2C2A26] text-xs text-[#55514B] dark:text-[#A8A49D] leading-relaxed">
                    <span className="font-semibold text-[#242424] dark:text-[#FAF9F6] flex items-center gap-1 mb-0.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#C96B45]" />
                      Explanation:
                    </span>
                    {question.explanation}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
