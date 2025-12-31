// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Make sure this file exists
import App from './App.jsx'; // Ensure App.jsx exports the App component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);