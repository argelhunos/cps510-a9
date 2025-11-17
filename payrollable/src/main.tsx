import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext.tsx';
import Login from './components/Login.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

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
          />
        </Routes>    
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
