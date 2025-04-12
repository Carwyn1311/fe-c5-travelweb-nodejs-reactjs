import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './features/Error Boundary/Error Boundary';
import AppContent from './AppContent/AppContent';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;