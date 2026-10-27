import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  LearnerProgressData,
  QuizAttemptRecord,
  ActiveQuizSession,
  UserSettings,
  MistakeEntry
} from '../types/progress';
import {
  loadProgress,
  saveProgress,
  recordQuizAttempt,
  setActiveQuizSession as persistActiveSession,
  updateMistakeStatus as persistMistakeStatus,
  resetProgress as persistReset,
  importProgressJson,
  INITIAL_PROGRESS_DATA
} from '../lib/storage';

interface ProgressContextType {
  progress: LearnerProgressData;
  isLoading: boolean;
  recordQuiz: (attempt: QuizAttemptRecord) => void;
  setActiveSession: (session: ActiveQuizSession | null) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  updateMistake: (questionId: string, updates: Partial<MistakeEntry>) => void;
  resetAllProgress: () => void;
  importProgress: (jsonStr: string) => { success: boolean; error?: string };
  refreshProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<LearnerProgressData>(INITIAL_PROGRESS_DATA);
  const [isLoading, setIsLoading] = useState(true);

  const refreshProgress = useCallback(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  const recordQuiz = useCallback((attempt: QuizAttemptRecord) => {
    setProgress(prev => {
      const updated = recordQuizAttempt(prev, attempt);
      return updated;
    });
  }, []);

  const setActiveSession = useCallback((session: ActiveQuizSession | null) => {
    setProgress(prev => {
      const updated = { ...prev, activeQuiz: session };
      persistActiveSession(session);
      return updated;
    });
  }, []);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setProgress(prev => {
      const updated: LearnerProgressData = {
        ...prev,
        settings: {
          ...prev.settings,
          ...newSettings,
        },
      };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const updateMistake = useCallback((questionId: string, updates: Partial<MistakeEntry>) => {
    setProgress(() => {
      const updated = persistMistakeStatus(questionId, updates);
      return updated;
    });
  }, []);

  const resetAllProgress = useCallback(() => {
    const reset = persistReset();
    setProgress(reset);
  }, []);

  const importProgress = useCallback((jsonStr: string) => {
    const result = importProgressJson(jsonStr);
    if (result.success && result.data) {
      setProgress(result.data);
    }
    return result;
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        isLoading,
        recordQuiz,
        setActiveSession,
        updateSettings,
        updateMistake,
        resetAllProgress,
        importProgress,
        refreshProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export function useProgress(): ProgressContextType {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
