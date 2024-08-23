import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.css'; // Import global styles

// Render the App component into the root element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
