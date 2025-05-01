import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './Context/AuthContext.tsx'
import { ProblemProvider } from './Context/ProblemContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProblemProvider>
        <App />
      </ProblemProvider>
    </AuthProvider>
  </StrictMode>,
)
