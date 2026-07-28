import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { JobProvider } from './context/JobProvider';
import { ApplicationProvider } from './context/ApplicationProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <JobProvider>
        <ApplicationProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <App />
          </BrowserRouter>
        </ApplicationProvider>
      </JobProvider>
    </AuthProvider>
  </React.StrictMode>
);