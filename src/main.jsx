import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BalanceWheel from './App.jsx'
import './i18n.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BalanceWheel />
  </StrictMode>,
)
