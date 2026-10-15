import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppearanceProvider } from '@shared/context/AppearanceContext'
import './index.css'
import App from './App.tsx'

// BASE_URL é "/app/" em produção (ver vite.config.ts) e "/" em dev local.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppearanceProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </AppearanceProvider>
  </StrictMode>,
)
