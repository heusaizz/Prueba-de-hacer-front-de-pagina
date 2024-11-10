import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./App.css";

// src/main.jsx
const token = localStorage.getItem('jwtToken');
const isLoggedIn = !!token;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App isLoggedIn={isLoggedIn} />
  </StrictMode>,
);