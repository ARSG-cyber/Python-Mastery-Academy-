import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TOPICS } from '../data/topics';
import { ALL_QUESTIONS } from '../data/questions';
import { useProgress } from '../context/ProgressContext';
import { selectQuestions } from '../lib/questionSelection';
import { checkAnswer, calculateAccuracy } from '../lib/scoring';
import { playSuccessSound, playIncorrectSound } from '../lib/sound';
import { QuestionViewer } from '../components/quiz/QuestionViewer';
import { QuizTimer } from '../components/quiz/QuizTimer';
import { ProgressBar } from '../components/common/ProgressBar';
import { Modal } from '../components/common/Modal';
import { ActiveQuizSession, QuizAttemptRecord, QuizMode } from '../types/progress';
import { QuestionDifficulty } from '../types/question';

export const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { progress, recordQuiz, setActiveSession, updateMistake } = useProgress();

  const [session, setSession] = useState<ActiveQuizSession | null>(null);
  const [showEndModal, setShowEndModal] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or restore quiz session
  useEffect(() => {
    // 1. Check if there is an existing in-progress session to restore
    if (progress.activeQuiz && progress.activeQuiz.questionIds.length > 0) {
      setSession(progress.activeQuiz);
      setTimeSpent(progress.activeQuiz.timeSpentSeconds || 0);
      return;
    }

    // 2. Otherwise initialize a new session from URL search parameters
    const mode = (searchParams.get('mode') as QuizMode) || 'quick';
    const topicId = searchParams.get('topic') || undefined;
    const difficulty = (searchParams.get('difficulty') as 'all' | QuestionDifficulty) || 'all';
    const count = Number(searchParams.get('count')) || 10;
    const timerEnabled = searchParams.get('timer') === 'true';
    const minutes = Number(searchParams.get('minutes')) || 10;

    const revisionIds = Object.keys(progress.mistakes).filter(
      id => !progress.mistakes[id].isUnderstood
    );

    const selection = selectQuestions({
      mode,
      topicId: topicId === 'all' ? undefined : topicId,
      difficulty,
      count,
      revisionQuestionIds: revisionIds,
    });

    if (selection.questions.length === 0) {
      navigate('/quiz-setup');
      return;
    }

    const newSession: ActiveQuizSession = {
      sessionId: `session_${Date.now()}`,
      mode,
      topicId: topicId === 'all' ? undefined : topicId,
      difficulty,
      questionIds: selection.questions.map(q => q.id),
      currentIndex: 0,
      answers: {},
      submissionStates: {},
      skippedStates: {},
      hintsUsed: {},
      displayedOptions: selection.displayedOptions,
      startedAt: new Date().toISOString(),
      timeRemainingSeconds: timerEnabled ? minutes * 60 : undefined,
      timeSpentSeconds: 0,
    };

    setSession(newSession);
    setActiveSession(newSession);
  }, []);

  // Time tracker effect
  useEffect(() => {
    if (!session) return;

    timerRef.current = setInterval(() => {
      setTimeSpent(prev => {
        const next = prev + 1;
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [session]);

  if (!session) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        Loading quiz session...
      </div>
    );
  }

  const currentQuestionId = session.questionIds[session.currentIndex];
  const currentQuestion = ALL_QUESTIONS.find(q => q.id === currentQuestionId);

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center text-slate-500">
        Question data missing. Please restart quiz.
      </div>
    );
  }

  const topicObj = currentQuestion.topicId ? TOPICS.find(t => t.id === currentQuestion.topicId) : null;
  const isSubmitted = !!session.submissionStates[currentQuestionId];
  const isSkipped = !!session.skippedStates[currentQuestionId];
  const currentAnswer = session.answers[currentQuestionId];
  const hintUsed = !!session.hintsUsed[currentQuestionId];

  // Answer selection
  const handleSelectAnswer = (answer: string | string[]) => {
    if (isSubmitted) return;
    const updatedAnswers = {
      ...session.answers,
      [currentQuestionId]: answer,
    };
    const updated = {
      ...session,
      answers: updatedAnswers,
      timeSpentSeconds: timeSpent,
    };
    setSession(updated);
    setActiveSession(updated);
  };

  // Submit current answer
  const handleSubmitAnswer = () => {
    if (isSubmitted || !currentAnswer) return;

    const evaluation = checkAnswer(currentQuestion, currentAnswer);
    const soundEnabled = progress.settings?.soundEnabled ?? true;

    if (evaluation.isCorrect) {
      playSuccessSound(soundEnabled);
    } else {
      playIncorrectSound(soundEnabled);
    }

    const updatedSubmissions = {
      ...session.submissionStates,
      [currentQuestionId]: true,
    };

    // If previously marked skipped, clear it
    const updatedSkipped = { ...session.skippedStates };
    delete updatedSkipped[currentQuestionId];

    const updated = {
      ...session,
      submissionStates: updatedSubmissions,
      skippedStates: updatedSkipped,
      timeSpentSeconds: timeSpent,
    };
    setSession(updated);
    setActiveSession(updated);
  };

  // Skip question
  const handleSkipQuestion = () => {
    const updatedSkipped = {
      ...session.skippedStates,
      [currentQuestionId]: true,
    };

    // Advance to next if possible
    if (session.currentIndex < session.questionIds.length - 1) {
      const updated = {
        ...session,
        skippedStates: updatedSkipped,
        currentIndex: session.currentIndex + 1,
        timeSpentSeconds: timeSpent,
      };
      setSession(updated);
      setActiveSession(updated);
    } else {
      // Last question skipped, finish quiz
      handleFinishQuiz({
        ...session,
        skippedStates: updatedSkipped,
      });
    }
  };

  // Next question
  const handleNextQuestion = () => {
    if (session.currentIndex < session.questionIds.length - 1) {
      const updated = {
        ...session,
        currentIndex: session.currentIndex + 1,
        timeSpentSeconds: timeSpent,
      };
      setSession(updated);
      setActiveSession(updated);
    } else {
      handleFinishQuiz(session);
    }
  };

  // Previous question
  const handlePreviousQuestion = () => {
    if (session.currentIndex > 0) {
      const updated = {
        ...session,
        currentIndex: session.currentIndex - 1,
        timeSpentSeconds: timeSpent,
      };
      setSession(updated);
      setActiveSession(updated);
    }
  };

  // Use hint
  const handleUseHint = () => {
    const updatedHints = {
      ...session.hintsUsed,
      [currentQuestionId]: true,
    };
    const updated = {
      ...session,
      hintsUsed: updatedHints,
    };
    setSession(updated);
    setActiveSession(updated);
  };

  // Finish quiz & calculate record
  const handleFinishQuiz = (activeState: ActiveQuizSession) => {
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;

    const questionResults = activeState.questionIds.map((qId) => {
      const q = ALL_QUESTIONS.find(item => item.id === qId)!;
      const ans = activeState.answers[qId];
      const isSub = !!activeState.submissionStates[qId];
      const isSkip = !!activeState.skippedStates[qId] || !isSub;

      if (isSkip) {
        skippedCount += 1;
        return {
          questionId: qId,
          topicId: q.topicId,
          selectedAnswer: ans,
          isCorrect: false,
          isSkipped: true,
        };
      }

      const evalResult = checkAnswer(q, ans);
      if (evalResult.isCorrect) {
        correctCount += 1;
      } else {
        incorrectCount += 1;
      }

      return {
        questionId: qId,
        topicId: q.topicId,
        selectedAnswer: ans,
        isCorrect: evalResult.isCorrect,
        isSkipped: false,
      };
    });

    const total = activeState.questionIds.length;
    const answeredCount = correctCount + incorrectCount;
    const accuracy = calculateAccuracy(correctCount, answeredCount);

    const record: QuizAttemptRecord = {
      id: activeState.sessionId,
      topicId: activeState.topicId,
      mode: activeState.mode,
      date: new Date().toISOString(),
      totalQuestions: total,
      correctAnswers: correctCount,
      incorrectAnswers: incorrectCount,
      skippedAnswers: skippedCount,
      accuracy,
      timeSpentSeconds: timeSpent,
      questions: questionResults,
    };

    recordQuiz(record);
    setActiveSession(null);
    navigate(`/results?attempt=${record.id}`);
  };

  const handleTimeUp = () => {
    handleFinishQuiz(session);
  };

  const progressPercentage = Math.round(
    ((session.currentIndex + 1) / session.questionIds.length) * 100
  );

  const isInMistakes = !!progress.mistakes[currentQuestionId]?.isMarkedForRevision;
  const toggleMistake = () => {
    updateMistake(currentQuestionId, { isMarkedForRevision: !isInMistakes });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      {/* Top Progress & Timer Bar */}
      <div className="flex items-center justify-between gap-4 bg-white dark:bg-[#1F1E1C] border border-[#E8E5DF] dark:border-[#2C2A26] rounded-xl px-5 py-3 transition-colors">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs sm:text-sm font-semibold text-[#242424] dark:text-[#FAF9F6]">
            Question {session.currentIndex + 1}
            <span className="text-[#77736D] font-normal"> of {session.questionIds.length}</span>
          </span>
          <span className="text-xs text-[#77736D] font-normal hidden sm:inline">
            ({progressPercentage}% completed)
          </span>
        </div>

        <div className="w-1/3 max-w-[160px] hidden sm:block">
          <ProgressBar value={progressPercentage} size="sm" variant="brand" />
        </div>

        <div className="flex items-center gap-3">
          {session.timeRemainingSeconds !== undefined && (
            <QuizTimer
              initialSeconds={session.timeRemainingSeconds}
              onTimeUp={handleTimeUp}
            />
          )}
        </div>
      </div>

      {/* Main Interactive Question Viewer with question key for state isolation */}
      <QuestionViewer
        key={currentQuestionId}
        question={currentQuestion}
        currentIndex={session.currentIndex}
        totalQuestions={session.questionIds.length}
        topicTitle={topicObj?.title || 'Python Mastery'}
        displayedOptions={session.displayedOptions?.[currentQuestionId]}
        selectedAnswer={currentAnswer}
        isSubmitted={isSubmitted}
        isSkipped={isSkipped}
        hintUsed={hintUsed}
        onSelectAnswer={handleSelectAnswer}
        onSubmitAnswer={handleSubmitAnswer}
        onSkipQuestion={handleSkipQuestion}
        onNextQuestion={handleNextQuestion}
        onPreviousQuestion={handlePreviousQuestion}
        onUseHint={handleUseHint}
        onEndQuiz={() => setShowEndModal(true)}
        allowPrevious={true}
        hintsEnabled={searchParams.get('hints') !== 'false'}
        isInMistakes={isInMistakes}
        onToggleMistake={toggleMistake}
      />

      {/* End Quiz Confirmation Modal */}
      <Modal
        isOpen={showEndModal}
        onClose={() => setShowEndModal(false)}
        title="End Quiz Early?"
        description="Are you sure you want to end this quiz? Your answered questions will be scored and saved in your analytics."
        confirmText="Yes, End Quiz"
        confirmVariant="danger"
        onConfirm={() => {
          setShowEndModal(false);
          handleFinishQuiz(session);
        }}
      />
    </div>
  );
};
