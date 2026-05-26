import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './app/providers/AppProvider.tsx'
import App from './App.tsx'
import "./styles/scrollbar.css";

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProvider>
)
