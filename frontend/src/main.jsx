import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import 'overlayscrollbars/overlayscrollbars.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';

// Configure axios here
axios.defaults.baseURL = import.meta.env.VITE_API_URL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
