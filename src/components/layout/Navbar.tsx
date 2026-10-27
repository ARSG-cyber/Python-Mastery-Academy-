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
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#1F1E1C]/95 backdrop-blur-md border-b border-[#E8E5DF] dark:border-[#2C2A26] px-4 sm:px-8 py-3 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden p-2 rounded-lg text-[#77736D] hover:text-[#242424] hover:bg-[#F3F1EC] dark:hover:bg-[#282623] focus:outline-none"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-semibold text-[#242424] dark:text-[#FAF9F6]">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {hasActiveQuiz && (
          <Button
            size="sm"
            variant="warning"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={() => navigate('/quiz')}
            className="hidden sm:inline-flex"
          >
            Resume Quiz
          </Button>
        )}

        {/* Sound toggle button */}
        <button
          onClick={handleToggleSound}
          className="p-2 rounded-lg text-[#77736D] hover:text-[#242424] dark:text-[#A8A49D] dark:hover:text-[#FAF9F6] hover:bg-[#F3F1EC] dark:hover:bg-[#282623] transition-colors"
          title={isSoundEnabled ? 'Sound Effects Enabled' : 'Sound Effects Muted'}
          aria-label={isSoundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
        >
          {isSoundEnabled ? (
            <Volume2 className="w-4 h-4 text-[#C96B45]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#77736D]" />
          )}
        </button>

        {/* Dark mode toggle button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[#77736D] hover:text-[#242424] dark:text-[#A8A49D] dark:hover:text-[#FAF9F6] hover:bg-[#F3F1EC] dark:hover:bg-[#282623] transition-colors"
          title={`Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label={`Switch to ${effectiveTheme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {effectiveTheme === 'dark' ? (
            <Sun className="w-4 h-4 text-[#DF9F84]" />
          ) : (
            <Moon className="w-4 h-4 text-[#77736D]" />
          )}
        </button>

        {location.pathname !== '/quiz' && location.pathname !== '/quiz-setup' && (
          <Button
            size="sm"
            variant="primary"
            icon={<Play className="w-3.5 h-3.5 fill-current" />}
            onClick={() => navigate('/quiz-setup')}
          >
            Start Quiz
          </Button>
        )}
      </div>
    </header>
  );
};
