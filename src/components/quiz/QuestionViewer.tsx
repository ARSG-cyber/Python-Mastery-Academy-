import React, { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  SkipForward,
  ChevronLeft,
  LogOut,
  Send,
  CheckSquare,
  Square
} from 'lucide-react';
import { Question } from '../../types/question';
import { AnswerEvaluation, checkAnswer } from '../../lib/scoring';
import { CodeBlock } from '../common/CodeBlock';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { FeedbackCard } from './FeedbackCard';

export interface QuestionViewerProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  topicTitle?: string;
  selectedAnswer?: string | string[];
  isSubmitted: boolean;
  isSkipped: boolean;
  hintUsed: boolean;
  onSelectAnswer: (answer: string | string[]) => void;
  onSubmitAnswer: () => void;
  onSkipQuestion: () => void;
  onNextQuestion: () => void;
  onPreviousQuestion?: () => void;
  onUseHint: () => void;
  onEndQuiz: () => void;
  allowPrevious?: boolean;
  hintsEnabled?: boolean;
  isInMistakes?: boolean;
  onToggleMistake?: () => void;
}

export const QuestionViewer: React.FC<QuestionViewerProps> = ({
  question,
  currentIndex,
  totalQuestions,
  topicTitle = 'Python Mastery',
  selectedAnswer,
  isSubmitted,
  isSkipped,
  hintUsed,
  onSelectAnswer,
  onSubmitAnswer,
  onSkipQuestion,
  onNextQuestion,
  onPreviousQuestion,
  onUseHint,
  onEndQuiz,
  allowPrevious = true,
  hintsEnabled = true,
  isInMistakes = false,
  onToggleMistake,
}) => {
  const [showHint, setShowHint] = useState(hintUsed);

  const isMultipleAnswer = question.questionType === 'multiple_choice';
  const options = question.options || [];

  const handleToggleMultiple = (option: string) => {
    if (isSubmitted) return;
    const currentList = Array.isArray(selectedAnswer) ? [...selectedAnswer] : [];
    const index = currentList.indexOf(option);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(option);
    }
    onSelectAnswer(currentList);
  };

  const handleSingleSelect = (option: string) => {
    if (isSubmitted) return;
    onSelectAnswer(option);
  };

  const handleRevealHint = () => {
    setShowHint(true);
    onUseHint();
  };

  // Evaluate answer if submitted
  const evaluation: AnswerEvaluation | null = isSubmitted
    ? checkAnswer(question, selectedAnswer)
    : null;

  const hasSelection = isMultipleAnswer
    ? Array.isArray(selectedAnswer) && selectedAnswer.length > 0
    : !!selectedAnswer;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-subtle p-5 sm:p-8 transition-all">
      {/* Question metadata header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm">
            {topicTitle}
          </Badge>
          {isSkipped && (
            <Badge variant="warning" size="sm">
              Skipped
            </Badge>
          )}
          <Badge
            variant={
              question.difficulty === 'beginner'
                ? 'success'
                : question.difficulty === 'intermediate'
                ? 'warning'
                : 'purple'
            }
            size="sm"
          >
            {question.difficulty}
          </Badge>
          {question.subtopic && (
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
              • {question.subtopic}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hintsEnabled && question.hint && (
            <Button
              size="sm"
              variant={showHint ? 'secondary' : 'ghost'}
              onClick={handleRevealHint}
              icon={<Lightbulb className={`w-3.5 h-3.5 ${showHint ? 'text-amber-500 fill-amber-500' : ''}`} />}
              disabled={showHint}
            >
              <span className="text-xs">{showHint ? 'Hint Revealed' : 'Hint'}</span>
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={onEndQuiz}
            icon={<LogOut className="w-3.5 h-3.5 text-slate-400" />}
            title="End quiz session early"
          >
            <span className="text-xs text-slate-500 hidden sm:inline">End Quiz</span>
          </Button>
        </div>
      </div>

      {/* Hint Banner if active */}
      {showHint && question.hint && (
        <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2.5 animate-fade-in">
          <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5 fill-amber-500/20" />
          <div>
            <span className="font-semibold text-amber-800 dark:text-amber-300">Study Hint: </span>
            {question.hint}
          </div>
        </div>
      )}

      {/* Question Prompt */}
      <div className="mt-6">
        <h3 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {question.questionText}
        </h3>

        {/* Code Snippet if applicable */}
        {question.codeSnippet && (
          <div className="mt-4">
            <CodeBlock code={question.codeSnippet} language="python" showLineNumbers={true} />
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="mt-6 space-y-3">
        {isMultipleAnswer && (
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-brand-500" />
            Select ALL options that apply. You must choose the complete correct set to earn credit.
          </p>
        )}

        {options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          const isSelected = isMultipleAnswer
            ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
            : selectedAnswer === option;

          // Checking status after submit
          let optionStyle = 'border-slate-200 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 bg-white dark:bg-slate-900';
          let letterStyle = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
          let StatusIcon = null;

          if (isSubmitted) {
            const isCorrectOption = isMultipleAnswer
              ? Array.isArray(question.correctAnswer) && question.correctAnswer.includes(option)
              : question.correctAnswer === option;

            if (isCorrectOption) {
              optionStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 shadow-sm';
              letterStyle = 'bg-emerald-600 text-white';
              StatusIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />;
            } else if (isSelected && !isCorrectOption) {
              optionStyle = 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
              letterStyle = 'bg-rose-600 text-white';
              StatusIcon = <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0" />;
            } else {
              optionStyle = 'border-slate-200/50 dark:border-slate-800/50 opacity-60 bg-white dark:bg-slate-900';
            }
          } else if (isSelected) {
            optionStyle = 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/30 text-brand-950 dark:text-brand-100 ring-1 ring-brand-500';
            letterStyle = 'bg-brand-600 text-white';
          }

          return (
            <div
              key={option}
              onClick={() => {
                if (isMultipleAnswer) {
                  handleToggleMultiple(option);
                } else {
                  handleSingleSelect(option);
                }
              }}
              role="button"
              tabIndex={isSubmitted ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  if (isMultipleAnswer) handleToggleMultiple(option);
                  else handleSingleSelect(option);
                }
              }}
              className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all ${
                isSubmitted ? 'cursor-default' : 'cursor-pointer hover:shadow-subtle'
              } ${optionStyle}`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 transition-colors ${letterStyle}`}>
                  {letter}
                </span>
                <span className="text-sm sm:text-base font-medium break-words leading-relaxed font-mono">
                  {option}
                </span>
              </div>

              <div className="flex items-center gap-2 pl-3 flex-shrink-0">
                {isMultipleAnswer && !isSubmitted && (
                  isSelected ? (
                    <CheckSquare className="w-5 h-5 text-brand-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )
                )}
                {StatusIcon}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback Panel once submitted */}
      {isSubmitted && evaluation && (
        <div className="mt-6">
          <FeedbackCard
            question={question}
            evaluation={evaluation}
            onContinue={onNextQuestion}
            isInMistakes={isInMistakes}
            onToggleMistake={onToggleMistake}
            isLastQuestion={currentIndex === totalQuestions - 1}
          />
        </div>
      )}

      {/* Control Actions Bar */}
      {!isSubmitted && (
        <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {allowPrevious && onPreviousQuestion && currentIndex > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPreviousQuestion}
                icon={<ChevronLeft className="w-4 h-4" />}
              >
                Previous
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onSkipQuestion}
              icon={<SkipForward className="w-4 h-4" />}
              title="Skip this question for now"
            >
              Skip
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={onSubmitAnswer}
              disabled={!hasSelection}
              icon={<Send className="w-4 h-4" />}
              iconPosition="right"
            >
              Submit Answer
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
