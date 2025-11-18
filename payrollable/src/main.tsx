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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route 
            path="/homepage"
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          >
            <Route 
              path="db/:action" 
              element={<DBActionPage />}
            />
            <Route 
              path="simple" 
              element={<></>}
            />
            <Route 
              path="advanced" 
              element={<></>}
            />
          </Route>
        </Routes>    
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
