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
    <aside className="w-64 bg-[#0b1329] border-r border-slate-800 flex flex-col h-full text-slate-300 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <NavLink to="/" onClick={onCloseMobile} className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-[#306998] flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <span className="text-xl">🐍</span>
          </div>
          <div>
            <div className="font-bold text-base text-white tracking-tight flex items-center gap-1.5">
              <span>Python Mastery</span>
            </div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Academy
            </div>
          </div>
        </NavLink>
      </div>

      {/* Streak Callout */}
      <div className="px-4 pt-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white">
                {progress.streak.currentStreak} Day{progress.streak.currentStreak === 1 ? '' : 's'} Streak
              </div>
              <div className="text-[10px] text-slate-400">
                {progress.streak.currentStreak > 0 ? 'Keep it up!' : 'Start practising today'}
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono text-amber-400 font-bold bg-amber-400/10 px-2 py-0.5 rounded-full">
            🔥 {progress.streak.currentStreak}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Learning Tracks
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white font-semibold shadow-sm shadow-brand-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500 text-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Summary Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Award className="w-4 h-4 text-brand-400" />
            Answered
          </span>
          <span className="font-mono font-semibold text-white">
            {progress.totalAnswered} questions
          </span>
        </div>
        <div className="mt-2 text-[10px] text-slate-500 flex justify-between">
          <span>Accuracy</span>
          <span className="text-brand-400 font-mono font-semibold">
            {progress.totalAnswered > 0
              ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
              : 0}%
          </span>
        </div>
      </div>
    </aside>
  );
};
