import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  SkipForward,
  ChevronLeft,
  LogOut,
  ArrowRight,
  CheckSquare,
  Square,
  Send
} from 'lucide-react';
import { Question, QuestionOption } from '../../types/question';
import { QuizMode } from '../../types/progress';
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
  mode?: QuizMode;
  displayedOptions?: QuestionOption[];
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
  mode = 'practice',
  displayedOptions,
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
  const isExamMode = mode === 'exam';
  const effectiveHintsEnabled = hintsEnabled && !isExamMode;

  // Hint visibility is strictly scoped to this question and resets on question change
  const [showHint, setShowHint] = useState(hintUsed && effectiveHintsEnabled);

  useEffect(() => {
    setShowHint(hintUsed && effectiveHintsEnabled);
  }, [question.id, hintUsed, effectiveHintsEnabled]);

  const isMultipleAnswer = question.questionType === 'multiple_choice';

  // Normalize options to QuestionOption[] with stable IDs
  const optionsList: QuestionOption[] = useMemo(() => {
    if (displayedOptions && displayedOptions.length > 0) {
      return displayedOptions;
    }
    return (question.options || []).map((opt, idx) => {
      if (typeof opt === 'string') {
        return { id: `opt-${idx}`, text: opt };
      }
      return opt;
    });
  }, [displayedOptions, question.options]);

  const handleToggleMultiple = useCallback((optionId: string) => {
    if (isSubmitted && !isExamMode) return;
    const currentList = Array.isArray(selectedAnswer) ? [...selectedAnswer] : [];
    const index = currentList.indexOf(optionId);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(optionId);
    }
    onSelectAnswer(currentList);
  }, [isSubmitted, isExamMode, selectedAnswer, onSelectAnswer]);

  const handleSingleSelect = useCallback((optionId: string) => {
    if (isSubmitted && !isExamMode) return;
    onSelectAnswer(optionId);
  }, [isSubmitted, isExamMode, onSelectAnswer]);

  const handleRevealHint = useCallback(() => {
    if (!effectiveHintsEnabled || !question.hint) return;
    setShowHint(true);
    onUseHint();
  }, [effectiveHintsEnabled, question.hint, onUseHint]);

  const hasSelection = isMultipleAnswer
    ? Array.isArray(selectedAnswer) && selectedAnswer.length > 0
    : !!selectedAnswer;

  // Keyboard navigation support: 1-4, A-D, Enter, H
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is focusing an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toLowerCase();

      // Number keys 1-4 or letters a-d
      const keyIndexMap: Record<string, number> = {
        '1': 0, 'a': 0,
        '2': 1, 'b': 1,
        '3': 2, 'c': 2,
        '4': 3, 'd': 3,
      };

      if (key in keyIndexMap && (!isSubmitted || isExamMode)) {
        const targetIndex = keyIndexMap[key];
        if (targetIndex < optionsList.length) {
          e.preventDefault();
          const targetOpt = optionsList[targetIndex];
          if (isMultipleAnswer) {
            handleToggleMultiple(targetOpt.id);
          } else {
            handleSingleSelect(targetOpt.id);
          }
        }
      } else if (key === 'h' && effectiveHintsEnabled && question.hint && !showHint) {
        e.preventDefault();
        handleRevealHint();
      } else if (key === 'enter') {
        e.preventDefault();
        if (isSubmitted && !isExamMode) {
          onNextQuestion();
        } else if (hasSelection) {
          onSubmitAnswer();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isSubmitted,
    isExamMode,
    optionsList,
    isMultipleAnswer,
    handleToggleMultiple,
    handleSingleSelect,
    effectiveHintsEnabled,
    question.hint,
    showHint,
    handleRevealHint,
    hasSelection,
    onSubmitAnswer,
    onNextQuestion
  ]);

  // Evaluate answer if submitted (unless in Exam mode)
  const evaluation: AnswerEvaluation | null = (isSubmitted && !isExamMode)
    ? checkAnswer(question, selectedAnswer)
    : null;

  return (
    <div className="bg-white dark:bg-[#1F1E1C] border border-[#E8E5DF] dark:border-[#2C2A26] rounded-2xl p-5 sm:p-8 transition-colors shadow-sm">
      {/* 1. Header: Topic, Question Index, Difficulty, and Hint/Exit actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E8E5DF] dark:border-[#2C2A26]">
        <div className="flex items-center gap-2.5">
          <Badge variant="primary" size="sm">
            {topicTitle}
          </Badge>
          <span className="text-xs text-[#77736D] dark:text-[#A8A49D] font-mono">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <Badge
            variant={
              question.difficulty === 'beginner'
                ? 'success'
                : question.difficulty === 'intermediate'
                ? 'warning'
                : 'default'
            }
            size="sm"
          >
            {question.difficulty}
          </Badge>
          {isSkipped && (
            <Badge variant="warning" size="sm">
              Skipped
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {effectiveHintsEnabled && question.hint && (
            <Button
              size="sm"
              variant={showHint ? 'secondary' : 'ghost'}
              onClick={handleRevealHint}
              icon={<Lightbulb className={`w-3.5 h-3.5 ${showHint ? 'text-[#C96B45]' : 'text-[#77736D]'}`} />}
              disabled={showHint}
              title="Reveal question hint (H)"
            >
              <span className="text-xs">{showHint ? 'Hint Revealed' : 'Hint (H)'}</span>
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={onEndQuiz}
            icon={<LogOut className="w-3.5 h-3.5 text-[#77736D]" />}
            title="End quiz session"
          >
            <span className="text-xs text-[#77736D] hidden sm:inline">Exit</span>
          </Button>
        </div>
      </div>

      {/* Subtle Progress Line */}
      <div className="w-full bg-[#E8E5DF] dark:bg-[#2C2A26] h-1 rounded-full mt-4 overflow-hidden">
        <div
          className="bg-[#C96B45] h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Scoped Hint Display */}
      {showHint && question.hint && !isExamMode && (
        <div className="mt-4 p-3.5 rounded-xl bg-[#FAF0EB] dark:bg-[#282623] border border-[#EBC0AF] dark:border-[#3D3A35] text-xs sm:text-sm text-[#242424] dark:text-[#E8E5DF] flex items-start gap-2.5 animate-fade-in">
          <Lightbulb className="w-4 h-4 text-[#C96B45] flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-[#C96B45]">Hint: </span>
            {question.hint}
          </div>
        </div>
      )}

      {/* Question Prompt */}
      <div className="mt-6">
        <h3 className="text-base sm:text-lg font-medium text-[#242424] dark:text-[#FAF9F6] leading-relaxed">
          {question.questionText}
        </h3>

        {/* Python Code Snippet presentation */}
        {question.codeSnippet && (
          <div className="mt-4">
            <CodeBlock code={question.codeSnippet} language="python" showLineNumbers={true} />
          </div>
        )}
      </div>

      {/* Four Answer Options */}
      <div className="mt-6 space-y-2.5">
        {isMultipleAnswer && (
          <p className="text-xs text-[#77736D] dark:text-[#A8A49D] font-normal flex items-center gap-1.5 mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-[#C96B45]" />
            Select all options that apply.
          </p>
        )}

        {optionsList.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D
          const numKey = idx + 1; // 1, 2, 3, 4

          const isSelected = isMultipleAnswer
            ? Array.isArray(selectedAnswer) && (selectedAnswer.includes(option.id) || selectedAnswer.includes(option.text))
            : selectedAnswer === option.id || selectedAnswer === option.text;

          // Default styling
          let optionStyle = 'border-[#E8E5DF] dark:border-[#2C2A26] hover:border-[#D8D4CC] dark:hover:border-[#3D3A35] bg-white dark:bg-[#1F1E1C] text-[#242424] dark:text-[#E8E5DF]';
          let letterStyle = 'bg-[#F3F1EC] text-[#77736D] dark:bg-[#282623] dark:text-[#A8A49D]';
          let StatusIcon = null;

          if (isSubmitted && !isExamMode) {
            const isCorrectOption = isMultipleAnswer
              ? (Array.isArray(question.correctOptionId) && question.correctOptionId.includes(option.id)) ||
                (Array.isArray(question.correctAnswer) && (question.correctAnswer.includes(option.id) || question.correctAnswer.includes(option.text)))
              : (question.correctOptionId ? question.correctOptionId === option.id : (question.correctAnswer === option.id || question.correctAnswer === option.text));

            if (isCorrectOption) {
              optionStyle = 'border-[#287A52] bg-[#EBF5F0] dark:bg-[#152E20] text-[#287A52] dark:text-[#A2D4BC] font-medium';
              letterStyle = 'bg-[#287A52] text-white';
              StatusIcon = <CheckCircle2 className="w-4 h-4 text-[#287A52] flex-shrink-0" />;
            } else if (isSelected && !isCorrectOption) {
              optionStyle = 'border-[#B94B45] bg-[#FBF0EF] dark:bg-[#301614] text-[#B94B45] dark:text-[#EDB0AC]';
              letterStyle = 'bg-[#B94B45] text-white';
              StatusIcon = <XCircle className="w-4 h-4 text-[#B94B45] flex-shrink-0" />;
            } else {
              optionStyle = 'border-[#E8E5DF]/50 dark:border-[#2C2A26]/50 opacity-45 bg-white dark:bg-[#1F1E1C] text-[#77736D]';
            }
          } else if (isSelected) {
            optionStyle = 'border-[#C96B45] bg-[#FAF0EB] dark:bg-[#282623] text-[#242424] dark:text-[#FAF9F6] ring-1 ring-[#C96B45]';
            letterStyle = 'bg-[#C96B45] text-white';
          }

          return (
            <div
              key={option.id}
              onClick={() => {
                if (isMultipleAnswer) {
                  handleToggleMultiple(option.id);
                } else {
                  handleSingleSelect(option.id);
                }
              }}
              role="button"
              tabIndex={isSubmitted && !isExamMode ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  if (isMultipleAnswer) handleToggleMultiple(option.id);
                  else handleSingleSelect(option.id);
                }
              }}
              className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-colors min-h-[52px] ${
                isSubmitted && !isExamMode ? 'cursor-default' : 'cursor-pointer'
              } ${optionStyle}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-6 h-6 rounded flex items-center justify-center font-mono font-medium text-xs flex-shrink-0 transition-colors ${letterStyle}`}>
                  {letter}
                </span>
                <span className="text-sm font-normal break-words leading-relaxed font-mono">
                  {option.text}
                </span>
              </div>

              <div className="flex items-center gap-2 pl-3 flex-shrink-0">
                {!isSubmitted && (
                  <span className="hidden sm:inline-block text-[10px] font-mono text-[#A8A49D] px-1.5 py-0.5 rounded bg-[#FAF9F6] dark:bg-[#282623] border border-[#E8E5DF] dark:border-[#3D3A35]">
                    {numKey}
                  </span>
                )}
                {isMultipleAnswer && (!isSubmitted || isExamMode) && (
                  isSelected ? (
                    <CheckSquare className="w-4 h-4 text-[#C96B45]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#77736D]" />
                  )
                )}
                {StatusIcon}
              </div>
            </div>
          );
        })}
      </div>

      {/* Immediate Educational Feedback (Disabled in Exam mode) */}
      {!isExamMode && isSubmitted && evaluation && (
        <div className="mt-6">
          <FeedbackCard
            question={question}
            evaluation={evaluation}
            displayedOptions={optionsList}
            onContinue={onNextQuestion}
            isInMistakes={isInMistakes}
            onToggleMistake={onToggleMistake}
            isLastQuestion={currentIndex === totalQuestions - 1}
          />
        </div>
      )}

      {/* Bottom Action Controls: Skip & Submit / Continue */}
      {(!isSubmitted || isExamMode) && (
        <div className="mt-8 pt-5 border-t border-[#E8E5DF] dark:border-[#2C2A26] flex flex-wrap items-center justify-between gap-3">
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
              title="Skip this question"
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
              icon={isExamMode ? <ArrowRight className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              iconPosition="right"
            >
              {isExamMode
                ? currentIndex === totalQuestions - 1
                  ? 'Submit Exam'
                  : 'Save & Next'
                : 'Submit Answer'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
