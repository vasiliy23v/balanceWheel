import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BalanceWheel from './App.jsx'
import './i18n.js'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Analytics />
    <BalanceWheel />
  </StrictMode>,
)
