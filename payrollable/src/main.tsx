import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { AuthProvider } from './context/AuthContext.tsx';
import Login from './components/Login.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';
import DBActionPage from './components/DBActionPage.tsx';
import SimpleQueryPage from './components/SimpleQueryPage.tsx';
import QueryResultsPage from './components/QueryResultsPage.tsx';
import AdvancedQueryPage from './components/AdvancedQueryPage.tsx';
import TableInsertionPage from './components/TableInsertionPage.tsx';

// Root of the web application. Defines the routes of the web application.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wraps the entire app with AuthProvider so all components can access user auth state */}
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          {/* /homepage and its child routes are protected. user must be authenticated */}
          <Route 
            path="/homepage"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          >
            {/* Nested routes under /homepage */}
            <Route 
              path="db/:action" 
              element={<DBActionPage />}
            />
            <Route 
              path="simple" 
              element={<SimpleQueryPage />}
            />
            <Route 
              path="advanced" 
              element={<AdvancedQueryPage />}
            />
            <Route 
              path="inserts" 
              element={<TableInsertionPage />}
            />
            <Route 
              path="query/:queryId"
              element={<QueryResultsPage />}
            />
          </Route>
        </Routes>    
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
