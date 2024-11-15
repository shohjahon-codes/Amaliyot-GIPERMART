
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App /> 
    <CssBaseline />
  </BrowserRouter>,
)
