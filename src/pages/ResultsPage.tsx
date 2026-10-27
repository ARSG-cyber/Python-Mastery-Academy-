import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Play,
  LayoutDashboard,
  Lightbulb,
  BookOpen
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { ALL_QUESTIONS } from '../data/questions';
import { TOPICS } from '../data/topics';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatTime } from '../lib/scoring';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { progress } = useProgress();

  const attemptId = searchParams.get('attempt');
  const attempt = progress.quizHistory.find(q => q.id === attemptId) || progress.quizHistory[0];

  useEffect(() => {
    if (attempt && attempt.accuracy >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Fallback if canvas-confetti cannot run
      }
    }
  }, [attempt]);

  if (!attempt) {
    return (
      <Card className="p-8 text-center space-y-4 max-w-lg mx-auto">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Quiz Result Found</h3>
        <p className="text-sm text-slate-500">Take a quiz first to view results and analytics.</p>
        <Button variant="primary" onClick={() => navigate('/quiz-setup')}>
          Start Practice Quiz
        </Button>
      </Card>
    );
  }

  const missedQuestions = attempt.questions
    .filter(q => !q.isCorrect && !q.isSkipped)
    .map(q => ({
      result: q,
      question: ALL_QUESTIONS.find(item => item.id === q.questionId)!,
    }))
    .filter(item => item.question !== undefined);

  // Retry only missed questions
  const handleRetryMissed = () => {
    if (missedQuestions.length === 0) return;
    navigate('/quiz-setup?mode=revision');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Performance Banner */}
      <div className="bg-gradient-to-br from-white via-slate-50 to-indigo-50/30 dark:from-slate-900 dark:via-[#0d152c] dark:to-[#131b36] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center shadow-inner">
          <Trophy className="w-8 h-8 fill-amber-500/20" />
        </div>

        <div>
          <Badge variant="primary" size="md">
            {attempt.mode.toUpperCase()} QUIZ COMPLETED
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3">
            {attempt.accuracy >= 80
              ? 'Outstanding Mastery!'
              : attempt.accuracy >= 60
              ? 'Great Effort, Solid Progress!'
              : 'Learning in Progress!'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto mt-1">
            Review the breakdown below to inspect which Python concepts you nailed and where misconceptions occurred.
          </p>
        </div>

        {/* Big Score Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 font-medium">Final Accuracy</div>
            <div className={`text-2xl sm:text-3xl font-extrabold font-mono mt-1 ${
              attempt.accuracy >= 80 ? 'text-emerald-500' : attempt.accuracy >= 60 ? 'text-brand-600' : 'text-rose-500'
            }`}>
              {attempt.accuracy}%
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 font-medium">Correct</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-500 mt-1">
              {attempt.correctAnswers} <span className="text-xs font-normal text-slate-400">/ {attempt.totalQuestions}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 font-medium">Incorrect</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-500 mt-1">
              {attempt.incorrectAnswers}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-xs text-slate-500 font-medium">Time Spent</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-700 dark:text-slate-300 mt-1">
              {formatTime(attempt.timeSpentSeconds)}
            </div>
          </div>
        </div>

        {/* Main CTA action buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          {missedQuestions.length > 0 && (
            <Button
              size="md"
              variant="danger"
              onClick={handleRetryMissed}
              icon={<RotateCcw className="w-4 h-4" />}
            >
              Retry Missed Questions ({missedQuestions.length})
            </Button>
          )}

          <Button
            size="md"
            variant="primary"
            onClick={() => navigate('/quiz-setup')}
            icon={<Play className="w-4 h-4 fill-current" />}
          >
            Start Another Quiz
          </Button>

          <Button
            size="md"
            variant="outline"
            onClick={() => navigate('/')}
            icon={<LayoutDashboard className="w-4 h-4" />}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>

      {/* Detailed Missed Questions Review */}
      {missedQuestions.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-500" />
            <span>Missed Questions Breakdown & Explanations</span>
          </h3>

          <div className="space-y-4">
            {missedQuestions.map(({ question, result }, index) => {
              const topic = TOPICS.find(t => t.id === question.topicId);
              const selectedStr = Array.isArray(result.selectedAnswer)
                ? result.selectedAnswer.join(', ')
                : String(result.selectedAnswer || 'None');
              const misconception = question.incorrectExplanations && question.incorrectExplanations[selectedStr];

              return (
                <Card key={question.id} className="p-6 border-rose-200/80 dark:border-rose-950/60">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-rose-600 dark:text-rose-400">
                      Missed Question #{index + 1} • {topic?.title || question.topicId}
                    </span>
                    <Badge variant={question.difficulty === 'beginner' ? 'success' : 'warning'} size="sm">
                      {question.difficulty}
                    </Badge>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {question.questionText}
                    </h4>

                    {question.codeSnippet && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-900 text-emerald-300 font-mono text-xs whitespace-pre overflow-x-auto">
                        {question.codeSnippet}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40">
                      <span className="font-semibold text-rose-700 dark:text-rose-300 block mb-0.5">Your Selected Answer:</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">{selectedStr}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300 block mb-0.5">Correct Answer:</span>
                      <span className="font-mono text-slate-800 dark:text-slate-200">
                        {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {misconception && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-950 dark:text-amber-200">
                      <span className="font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-1 mb-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        Misconception Behind Choice:
                      </span>
                      {misconception}
                    </div>
                  )}

                  <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1 mb-1">
                      <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                      Pedagogical Explanation:
                    </span>
                    {question.explanation}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <Card className="p-6 text-center bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
            Zero Incorrect Answers!
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            You answered every single attempted question accurately. Outstanding execution!
          </p>
        </Card>
      )}
    </div>
  );
};
