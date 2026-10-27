import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  BookOpen,
  BookmarkPlus,
  BookmarkCheck,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Question, QuestionOption } from '../../types/question';
import { AnswerEvaluation } from '../../lib/scoring';
import { Button } from '../common/Button';

export interface FeedbackCardProps {
  question: Question;
  evaluation: AnswerEvaluation;
  displayedOptions?: QuestionOption[];
  onContinue: () => void;
  isInMistakes?: boolean;
  onToggleMistake?: () => void;
  isLastQuestion?: boolean;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  question,
  evaluation,
  displayedOptions = [],
  onContinue,
  isInMistakes = false,
  onToggleMistake,
  isLastQuestion = false,
}) => {
  const { isCorrect, isPartial, userSelection } = evaluation;
  const [showFullExplanation, setShowFullExplanation] = useState(false);

  // Helper to map option ID to text if needed
  const resolveText = (val: string): string => {
    const found = displayedOptions.find(o => o.id === val);
    return found ? found.text : val;
  };

  const selectedStr = Array.isArray(userSelection)
    ? userSelection.map(resolveText).join(', ')
    : resolveText(String(userSelection));

  // Check misconception explanation by matching option ID or option text
  const userFirstId = Array.isArray(userSelection) ? userSelection[0] : String(userSelection);
  const userFirstText = resolveText(userFirstId);

  const misconception = question.incorrectExplanations && (
    question.incorrectExplanations[userFirstText] ||
    question.incorrectExplanations[userFirstId]
  );

  const correctAnswerText = Array.isArray(question.correctAnswer)
    ? question.correctAnswer.join(', ')
    : String(question.correctAnswer);

  return (
    <div
      className={`rounded-xl border p-5 sm:p-6 transition-all animate-fade-in ${
        isCorrect
          ? 'bg-[#EBF5F0] border-[#C3E4D4] dark:bg-[#152E20] dark:border-[#206342]'
          : isPartial
          ? 'bg-[#FEF6EE] border-[#F9DBAF] dark:bg-[#332012] dark:border-[#7A3608]'
          : 'bg-[#FBF0EF] border-[#F2C5C3] dark:bg-[#301614] dark:border-[#6B2824]'
      }`}
    >
      {/* Status Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {isCorrect ? (
            <div className="w-8 h-8 rounded-lg bg-[#287A52] text-white flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : isPartial ? (
            <div className="w-8 h-8 rounded-lg bg-[#B54708] text-white flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-[#B94B45] text-white flex items-center justify-center flex-shrink-0">
              <XCircle className="w-5 h-5" />
            </div>
          )}

          <div>
            <h4
              className={`text-sm sm:text-base font-semibold ${
                isCorrect
                  ? 'text-[#287A52] dark:text-[#A2D4BC]'
                  : isPartial
                  ? 'text-[#B54708] dark:text-[#FAD2A4]'
                  : 'text-[#B94B45] dark:text-[#EDB0AC]'
              }`}
            >
              {isCorrect
                ? 'Correct'
                : isPartial
                ? 'Partially Correct'
                : 'Incorrect'}
            </h4>
            <p className="text-xs sm:text-sm text-[#55514B] dark:text-[#A8A49D] mt-0.5">
              {isCorrect ? (
                'You identified the correct answer.'
              ) : (
                <>
                  <span className="font-medium text-[#242424] dark:text-[#FAF9F6]">Correct answer: </span>
                  <span className="font-mono">{correctAnswerText}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {onToggleMistake && (
          <Button
            size="sm"
            variant={isInMistakes ? 'secondary' : 'outline'}
            onClick={onToggleMistake}
            icon={isInMistakes ? <BookmarkCheck className="w-3.5 h-3.5 text-[#C96B45]" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
            title="Save to Mistakes Notebook"
          >
            <span className="hidden sm:inline">{isInMistakes ? 'Saved in Mistakes' : 'Save Mistake'}</span>
          </Button>
        )}
      </div>

      {/* Misconception note if applicable */}
      {!isCorrect && misconception && (
        <div className="mt-3.5 p-3 rounded-lg bg-white/80 dark:bg-[#1F1E1C]/80 border border-[#F2C5C3] dark:border-[#6B2824] text-xs sm:text-sm text-[#242424] dark:text-[#E8E5DF] leading-relaxed">
          <div className="font-semibold flex items-center gap-1.5 mb-1 text-[#B94B45] dark:text-[#EDB0AC]">
            <Lightbulb className="w-3.5 h-3.5" />
            Why "{selectedStr}" is a common pitfall:
          </div>
          <p className="text-xs text-[#55514B] dark:text-[#A8A49D]">{misconception}</p>
        </div>
      )}

      {/* Technical Explanation */}
      <div className="mt-3.5 p-3.5 rounded-lg bg-white dark:bg-[#1F1E1C] border border-[#E8E5DF] dark:border-[#2C2A26] text-xs sm:text-sm text-[#242424] dark:text-[#E8E5DF] leading-relaxed">
        <div className="font-semibold text-[#242424] dark:text-[#FAF9F6] flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-[#77736D] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#C96B45]" />
            Explanation
          </span>
          {question.expectedOutput && (
            <button
              onClick={() => setShowFullExplanation(!showFullExplanation)}
              className="text-xs text-[#C96B45] hover:underline flex items-center gap-1 font-normal"
            >
              {showFullExplanation ? 'Hide details' : 'More details'}
              {showFullExplanation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>
        <p className="mt-1.5 text-xs sm:text-sm text-[#55514B] dark:text-[#D8D4CC] leading-relaxed">
          {question.explanation}
        </p>

        {question.expectedOutput && (showFullExplanation || !misconception) && (
          <div className="mt-2.5 pt-2 border-t border-[#E8E5DF] dark:border-[#2C2A26] flex items-center gap-2">
            <span className="text-xs text-[#77736D]">Output:</span>
            <code className="px-1.5 py-0.5 rounded bg-[#F3F1EC] dark:bg-[#282623] font-mono text-xs text-[#C96B45] font-medium">
              {question.expectedOutput}
            </code>
          </div>
        )}
      </div>

      {/* Next Question Continue CTA */}
      <div className="mt-4 flex justify-end">
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
