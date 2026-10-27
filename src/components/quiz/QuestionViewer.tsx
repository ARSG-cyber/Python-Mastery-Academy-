import React, { useState, useEffect, useMemo } from 'react';
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
import { Question, QuestionOption } from '../../types/question';
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
  // Hint visibility is strictly scoped to this question
  const [showHint, setShowHint] = useState(hintUsed);

  useEffect(() => {
    setShowHint(hintUsed);
  }, [question.id, hintUsed]);

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

  const handleToggleMultiple = (optionId: string) => {
    if (isSubmitted) return;
    const currentList = Array.isArray(selectedAnswer) ? [...selectedAnswer] : [];
    const index = currentList.indexOf(optionId);
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      currentList.push(optionId);
    }
    onSelectAnswer(currentList);
  };

  const handleSingleSelect = (optionId: string) => {
    if (isSubmitted) return;
    onSelectAnswer(optionId);
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
    <div className="bg-white dark:bg-[#1F1E1C] border border-[#E8E5DF] dark:border-[#2C2A26] rounded-xl p-5 sm:p-8 transition-colors">
      {/* Header bar: Topic, Difficulty, and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#E8E5DF] dark:border-[#2C2A26]">
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
                : 'default'
            }
            size="sm"
          >
            {question.difficulty}
          </Badge>
          {question.subtopic && (
            <span className="text-xs text-[#77736D] dark:text-[#A8A49D] font-normal hidden sm:inline">
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
              icon={<Lightbulb className={`w-3.5 h-3.5 ${showHint ? 'text-[#C96B45]' : 'text-[#77736D]'}`} />}
              disabled={showHint}
            >
              <span className="text-xs">{showHint ? 'Hint Revealed' : 'Show Hint'}</span>
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

      {/* Scoped Hint Callout */}
      {showHint && question.hint && (
        <div className="mt-4 p-3.5 rounded-lg bg-[#FAF0EB] dark:bg-[#282623] border border-[#EBC0AF] dark:border-[#3D3A35] text-xs sm:text-sm text-[#242424] dark:text-[#E8E5DF] flex items-start gap-2.5 animate-fade-in">
          <Lightbulb className="w-4 h-4 text-[#C96B45] flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-[#C96B45]">Hint: </span>
            {question.hint}
          </div>
        </div>
      )}

      {/* Question Prompt */}
      <div className="mt-6">
        <h3 className="text-base sm:text-lg font-semibold text-[#242424] dark:text-[#FAF9F6] leading-snug">
          {question.questionText}
        </h3>

        {/* Code Snippet */}
        {question.codeSnippet && (
          <div className="mt-4">
            <CodeBlock code={question.codeSnippet} language="python" showLineNumbers={true} />
          </div>
        )}
      </div>

      {/* Answer Options Area */}
      <div className="mt-6 space-y-2.5">
        {isMultipleAnswer && (
          <p className="text-xs text-[#77736D] dark:text-[#A8A49D] font-normal flex items-center gap-1.5 mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-[#C96B45]" />
            Select all options that apply.
          </p>
        )}

        {optionsList.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          // Check if option is selected by ID or text fallback
          const isSelected = isMultipleAnswer
            ? Array.isArray(selectedAnswer) && (selectedAnswer.includes(option.id) || selectedAnswer.includes(option.text))
            : selectedAnswer === option.id || selectedAnswer === option.text;

          // Checking status after submit
          let optionStyle = 'border-[#E8E5DF] dark:border-[#2C2A26] hover:border-[#D8D4CC] dark:hover:border-[#3D3A35] bg-white dark:bg-[#1F1E1C] text-[#242424] dark:text-[#E8E5DF]';
          let letterStyle = 'bg-[#F3F1EC] text-[#77736D] dark:bg-[#282623] dark:text-[#A8A49D]';
          let StatusIcon = null;

          if (isSubmitted) {
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
              optionStyle = 'border-[#E8E5DF]/50 dark:border-[#2C2A26]/50 opacity-50 bg-white dark:bg-[#1F1E1C] text-[#77736D]';
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
              tabIndex={isSubmitted ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault();
                  if (isMultipleAnswer) handleToggleMultiple(option.id);
                  else handleSingleSelect(option.id);
                }
              }}
              className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-lg border text-left transition-colors min-h-[52px] ${
                isSubmitted ? 'cursor-default' : 'cursor-pointer'
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
                {isMultipleAnswer && !isSubmitted && (
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

      {/* Feedback Panel after submit */}
      {isSubmitted && evaluation && (
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

      {/* Action Controls Bar */}
      {!isSubmitted && (
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
