import React, { useState, useRef } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Download,
  Upload,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Database,
  Sliders
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { useTheme } from '../context/ThemeContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { CURRENT_SCHEMA_VERSION, exportProgressJson } from '../lib/storage';
import { QuestionDifficulty } from '../types/question';

export const SettingsPage: React.FC = () => {
  const { progress, updateSettings, resetAllProgress, importProgress } = useProgress();
  const { theme, setTheme } = useTheme();

  const [showResetModal, setShowResetModal] = useState(false);
  const [importStatus, setImportStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const settings = progress.settings;

  // Export progress handler
  const handleExport = () => {
    const jsonStr = exportProgressJson(progress);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `python-mastery-academy-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import file handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = importProgress(content);
      if (result.success) {
        setImportStatus({
          type: 'success',
          message: 'Progress imported successfully! All records, streak, and preferences updated.',
        });
      } else {
        setImportStatus({
          type: 'error',
          message: result.error || 'Failed to import JSON.',
        });
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Settings & Data Management
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Configure learning interface preferences, sound effects, default quiz settings, and manage persistent storage.
        </p>
      </div>

      {/* Notification banner if import was performed */}
      {importStatus && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm animate-fade-in ${
            importStatus.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800'
          }`}
        >
          {importStatus.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-500 flex-shrink-0" />
          )}
          <span>{importStatus.message}</span>
        </div>
      )}

      {/* Appearance Settings */}
      <Card className="p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-brand-500" />
          <span>Appearance & Theme</span>
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'light', label: 'Light', icon: Sun },
            { id: 'dark', label: 'Dark', icon: Moon },
            { id: 'system', label: 'System', icon: Database },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = theme === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTheme(item.id as 'light' | 'dark' | 'system')}
                className={`p-4 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-brand-600 bg-brand-50/70 dark:bg-brand-950/40 text-brand-900 dark:text-brand-100 ring-2 ring-brand-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <Icon className={`w-5 h-5 mx-auto mb-2 ${isSelected ? 'text-brand-600' : 'text-slate-400'}`} />
                <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Quiz Default Preferences */}
      <Card className="p-6 space-y-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <SettingsIcon className="w-4 h-4 text-brand-500" />
          <span>Quiz Defaults & Feedback</span>
        </h3>

        <div className="space-y-4">
          {/* Sound toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-brand-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <span>Audio Feedback</span>
              </div>
              <div className="text-xs text-slate-500">
                Synthesizes subtle sound effects on correct and incorrect answers
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
          </div>

          {/* Immediate Feedback toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-semibold text-sm text-slate-900 dark:text-white">
                Immediate Feedback & Explanations
              </div>
              <div className="text-xs text-slate-500">
                Reveal the solution and pedagogical explanation directly after answering each question
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.immediateFeedback}
              onChange={(e) => updateSettings({ immediateFeedback: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
          </div>

          {/* Hints Enabled */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <div className="font-semibold text-sm text-slate-900 dark:text-white">
                Enable Conceptual Hints
              </div>
              <div className="text-xs text-slate-500">
                Show hint button to view subtle conceptual clues during quizzes
              </div>
            </div>
            <input
              type="checkbox"
              checked={settings.hintsEnabled}
              onChange={(e) => updateSettings({ hintsEnabled: e.target.checked })}
              className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
            />
          </div>

          {/* Preferred Question Count */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label htmlFor="settings-count" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Preferred Question Count
              </label>
              <select
                id="settings-count"
                value={settings.preferredQuestionCount}
                onChange={(e) => updateSettings({ preferredQuestionCount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
                <option value={30}>30 Questions</option>
                <option value={50}>50 Questions</option>
              </select>
            </div>

            {/* Default Difficulty */}
            <div>
              <label htmlFor="settings-diff" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Default Difficulty
              </label>
              <select
                id="settings-diff"
                value={settings.defaultDifficulty}
                onChange={(e) => updateSettings({ defaultDifficulty: e.target.value as 'all' | QuestionDifficulty })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Storage and Data Backup */}
      <Card className="p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Database className="w-4 h-4 text-brand-500" />
            <span>Progress Data & Local Storage</span>
          </span>
          <span className="text-xs font-mono text-slate-400">
            Schema v{CURRENT_SCHEMA_VERSION}
          </span>
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Your progress is securely saved in your browser's localStorage. You can export a JSON backup to transfer between devices or restore later.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            onClick={handleExport}
            icon={<Download className="w-4 h-4" />}
          >
            Export Progress JSON
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => fileInputRef.current?.click()}
            icon={<Upload className="w-4 h-4" />}
          >
            Import Progress JSON
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />

          <Button
            variant="danger"
            size="md"
            onClick={() => setShowResetModal(true)}
            icon={<Trash2 className="w-4 h-4" />}
          >
            Reset All Progress
          </Button>
        </div>
      </Card>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset All Progress?"
        description="This will clear your learning streak, quiz history, question attempts, and Mistakes Notebook. This action cannot be undone unless you have exported a JSON backup."
        confirmText="Yes, Permanently Reset"
        confirmVariant="danger"
        onConfirm={() => {
          resetAllProgress();
          setShowResetModal(false);
          setImportStatus({
            type: 'success',
            message: 'All learner progress data has been safely reset to default state.',
          });
        }}
      />
    </div>
  );
};
