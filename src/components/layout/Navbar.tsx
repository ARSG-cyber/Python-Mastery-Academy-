import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Play,
  RotateCcw
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';
import { Button } from '../common/Button';

interface NavbarProps {
  onToggleMobile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobile }) => {
  const { effectiveTheme, toggleTheme } = useTheme();
  const { progress, updateSettings } = useProgress();
  const navigate = useNavigate();
  const location = useLocation();

  const isSoundEnabled = progress.settings?.soundEnabled ?? true;

  const handleToggleSound = () => {
    updateSettings({ soundEnabled: !isSoundEnabled });
  };

  const getPageTitle = (path: string) => {
    if (path === '/') return 'Learning Dashboard';
    if (path.startsWith('/learn')) return 'Python Curriculum';
    if (path.startsWith('/topic')) return 'Topic Exploration';
    if (path.startsWith('/quiz-setup')) return 'Configure Practice Quiz';
    if (path.startsWith('/quiz')) return 'Active Quiz Session';
    if (path.startsWith('/results')) return 'Quiz Performance Results';
    if (path.startsWith('/mistakes')) return 'Mistakes Notebook';
    if (path.startsWith('/revision')) return 'Spaced Revision Practice';
    if (path.startsWith('/progress')) return 'Progress & Analytics';
    if (path.startsWith('/about')) return 'About Python Programming';
    if (path.startsWith('/settings')) return 'Preferences & Data';
    return 'Python Mastery Academy';
  };

  const hasActiveQuiz = !!progress.activeQuiz && location.pathname !== '/quiz';

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{getPageTitle(location.pathname)}</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {hasActiveQuiz && (
          <Button
            size="sm"
            variant="warning"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={() => navigate('/quiz')}
            className="animate-pulse hidden sm:inline-flex"
          >
            Resume In-Progress Quiz
          </Button>
        )}

        {/* Sound toggle button */}
        <button
          onClick={handleToggleSound}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={isSoundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
          aria-label={isSoundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
        >
          {isSoundEnabled ? (
            <Volume2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {/* Dark mode toggle button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label={`Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {effectiveTheme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {location.pathname !== '/quiz' && location.pathname !== '/quiz-setup' && (
          <Button
            size="sm"
            variant="primary"
            icon={<Play className="w-3.5 h-3.5 fill-current" />}
            onClick={() => navigate('/quiz-setup')}
          >
            <span className="hidden sm:inline">Start</span> Quiz
          </Button>
        )}
      </div>
    </header>
  );
};
