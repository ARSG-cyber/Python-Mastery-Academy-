import React from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  BookOpen,
  BookmarkPlus,
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';
import { Question } from '../../types/question';
import { AnswerEvaluation } from '../../lib/scoring';
import { Button } from '../common/Button';

export interface FeedbackCardProps {
  question: Question;
  evaluation: AnswerEvaluation;
  onContinue: () => void;
  isInMistakes?: boolean;
  onToggleMistake?: () => void;
  isLastQuestion?: boolean;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  question,
  evaluation,
  onContinue,
  isInMistakes = false,
  onToggleMistake,
  isLastQuestion = false,
}) => {
  const { isCorrect, isPartial, userSelection } = evaluation;

  // Selected option explanation for misconception analysis
  const selectedStr = Array.isArray(userSelection) ? userSelection[0] : String(userSelection);
  const misconception = question.incorrectExplanations && question.incorrectExplanations[selectedStr];

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all animate-fade-in ${
        isCorrect
          ? 'bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-950/30 dark:border-emerald-500/40'
          : isPartial
          ? 'bg-amber-500/10 border-amber-500/30 dark:bg-amber-950/30 dark:border-amber-500/40'
          : 'bg-rose-500/10 border-rose-500/30 dark:bg-rose-950/30 dark:border-rose-500/40'
      }`}
    >
      {/* Header status */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          ) : isPartial ? (
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <HelpCircle className="w-6 h-6" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <XCircle className="w-6 h-6" />
            </div>
          )}

          <div>
            <h4
              className={`text-base sm:text-lg font-bold ${
                isCorrect
                  ? 'text-emerald-800 dark:text-emerald-300'
                  : isPartial
                  ? 'text-amber-800 dark:text-amber-300'
                  : 'text-rose-800 dark:text-rose-300'
              }`}
            >
              {isCorrect
                ? 'Correct! Excellent job.'
                : isPartial
                ? 'Partially Correct'
                : 'Incorrect. Here is what to remember:'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isCorrect
                ? 'You grasped the underlying concept cleanly.'
                : Array.isArray(question.correctAnswer)
                ? `Correct answers: ${question.correctAnswer.join(', ')}`
                : `Correct answer: ${question.correctAnswer}`}
            </p>
          </div>
        </div>

        {onToggleMistake && (
          <Button
            size="sm"
            variant={isInMistakes ? 'secondary' : 'outline'}
            onClick={onToggleMistake}
            icon={isInMistakes ? <BookmarkCheck className="w-4 h-4 text-brand-600 dark:text-brand-400" /> : <BookmarkPlus className="w-4 h-4" />}
            title="Track question in Mistakes Notebook"
          >
            <span className="hidden sm:inline">{isInMistakes ? 'In Notebook' : 'Add to Mistakes'}</span>
          </Button>
        )}
      </div>

      {/* Misconception analysis if incorrect */}
      {!isCorrect && misconception && (
        <div className="mt-4 p-3.5 rounded-xl bg-rose-100/60 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800/60 text-xs sm:text-sm text-rose-950 dark:text-rose-200 leading-relaxed">
          <div className="font-semibold flex items-center gap-1.5 mb-1 text-rose-700 dark:text-rose-300">
            <Lightbulb className="w-4 h-4" />
            Why "{selectedStr}" is a common misconception:
          </div>
          <p>{misconception}</p>
        </div>
      )}

      {/* Main technical explanation */}
      <div className="mt-4 p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5">
          <BookOpen className="w-4 h-4 text-brand-500" />
          Technical Explanation:
        </div>
        <p>{question.explanation}</p>

        {question.expectedOutput && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-slate-500">Expected Output:</span>
            <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-xs text-brand-600 dark:text-brand-400 font-semibold">
              {question.expectedOutput}
            </code>
          </div>
        )}
      </div>

      {/* Continue button */}
      <div className="mt-5 flex justify-end">
        <Button
          variant="primary"
          onClick={onContinue}
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          {isLastQuestion ? 'View Results' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
};
