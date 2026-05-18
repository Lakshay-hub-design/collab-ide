import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './app/routes/AppRoutes.tsx'
import AppProvider from './app/providers/AppProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProvider>
)
