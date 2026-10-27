import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { formatTime } from '../../lib/scoring';

export interface QuizTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({
  initialSeconds,
  onTimeUp,
  isPaused = false,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (isPaused || secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, secondsLeft, onTimeUp]);

  const isLowTime = secondsLeft < 60;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs font-semibold transition-colors ${
        isLowTime
          ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900 animate-pulse'
          : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
      }`}
    >
      <Clock className={`w-3.5 h-3.5 ${isLowTime ? 'text-rose-500' : 'text-slate-400'}`} />
      <span>{formatTime(secondsLeft)}</span>
    </div>
  );
};
