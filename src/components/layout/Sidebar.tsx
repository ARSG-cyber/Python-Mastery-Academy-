import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  PlayCircle,
  RotateCcw,
  AlertCircle,
  BarChart3,
  Settings,
  Info,
  Flame,
  Award
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { progress } = useProgress();
  const mistakeCount = Object.values(progress.mistakes).filter(m => !m.isUnderstood).length;

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/learn', label: 'Curriculum', icon: BookOpen },
    { to: '/quiz-setup', label: 'Take Quiz', icon: PlayCircle },
    { to: '/mistakes', label: 'Mistakes Notebook', icon: AlertCircle, badge: mistakeCount > 0 ? mistakeCount : undefined },
    { to: '/revision', label: 'Revision Mode', icon: RotateCcw },
    { to: '/progress', label: 'Analytics & Stats', icon: BarChart3 },
    { to: '/about', label: 'About Python', icon: Info },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-[#1F1E1C] border-r border-[#E8E5DF] dark:border-[#2C2A26] flex flex-col h-full text-[#242424] dark:text-[#E8E5DF] select-none transition-colors">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E8E5DF] dark:border-[#2C2A26] flex items-center justify-between">
        <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-[#FAF0EB] dark:bg-[#282623] border border-[#EBC0AF] dark:border-[#3D3A35] flex items-center justify-center text-[#C96B45] group-hover:border-[#C96B45] transition-colors">
            <span className="text-lg">🐍</span>
          </div>
          <div>
            <div className="font-semibold text-sm text-[#242424] dark:text-[#FAF9F6] tracking-tight">
              Python Mastery
            </div>
            <div className="text-[11px] text-[#77736D] dark:text-[#A8A49D] tracking-wide">
              Academy
            </div>
          </div>
        </NavLink>
      </div>

      {/* Streak Callout */}
      <div className="px-4 pt-4">
        <div className="bg-[#FAF9F6] dark:bg-[#282623] border border-[#E8E5DF] dark:border-[#2C2A26] rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#FAF0EB] dark:bg-[#33170B] text-[#C96B45] flex items-center justify-center">
              <Flame className="w-4 h-4 fill-[#C96B45]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-[#242424] dark:text-[#FAF9F6]">
                {progress.streak.currentStreak} Day{progress.streak.currentStreak === 1 ? '' : 's'}
              </div>
              <div className="text-[10px] text-[#77736D] dark:text-[#A8A49D]">
                {progress.streak.currentStreak > 0 ? 'Consistent practice' : 'Start streak today'}
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#C96B45] font-semibold bg-[#FAF0EB] dark:bg-[#33170B] px-2 py-0.5 rounded">
            Day {progress.streak.currentStreak}
          </span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-semibold text-[#77736D] dark:text-[#A8A49D] uppercase tracking-wider">
          Study
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-[#FAF0EB] dark:bg-[#282623] text-[#C96B45] dark:text-[#DF9F84] font-semibold'
                    : 'text-[#77736D] dark:text-[#A8A49D] hover:text-[#242424] dark:hover:text-[#FAF9F6] hover:bg-[#F3F1EC] dark:hover:bg-[#282623]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="text-[11px] font-medium px-1.5 py-0.2 rounded bg-[#FBF0EF] text-[#B94B45] border border-[#F2C5C3]">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Summary Footer */}
      <div className="p-4 border-t border-[#E8E5DF] dark:border-[#2C2A26] bg-[#FAF9F6] dark:bg-[#181715]">
        <div className="flex items-center justify-between text-xs text-[#77736D] dark:text-[#A8A49D]">
          <span className="flex items-center gap-1.5 font-medium text-[#242424] dark:text-[#FAF9F6]">
            <Award className="w-3.5 h-3.5 text-[#C96B45]" />
            Answered
          </span>
          <span className="font-mono font-medium text-[#242424] dark:text-[#FAF9F6]">
            {progress.totalAnswered} questions
          </span>
        </div>
        <div className="mt-1.5 text-[11px] text-[#77736D] dark:text-[#A8A49D] flex justify-between">
          <span>Accuracy</span>
          <span className="text-[#287A52] font-mono font-medium">
            {progress.totalAnswered > 0
              ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
              : 0}%
          </span>
        </div>
      </div>
    </aside>
  );
};
