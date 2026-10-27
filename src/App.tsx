import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { router } from './router';

export const App: React.FC = () => {
  return (
    <ProgressProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ProgressProvider>
  );
};

export default App;
