import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BalanceWheel from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BalanceWheel />
  </StrictMode>,
)
