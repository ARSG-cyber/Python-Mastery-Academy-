import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { LearnPage } from './pages/LearnPage';
import { TopicPage } from './pages/TopicPage';
import { QuizSetupPage } from './pages/QuizSetupPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';
import { MistakesPage } from './pages/MistakesPage';
import { RevisionPage } from './pages/RevisionPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { AboutPage } from './pages/AboutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'learn', element: <LearnPage /> },
      { path: 'topic/:topicId', element: <TopicPage /> },
      { path: 'quiz-setup', element: <QuizSetupPage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'mistakes', element: <MistakesPage /> },
      { path: 'revision', element: <RevisionPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
