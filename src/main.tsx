import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ContextProvider from './context/Context.js'

createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
)
