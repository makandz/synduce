import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./views/Home/HomePage.module.css";
import "./components/Navbar/Navbar.module.css";
import "./views/Login/LoginPage.module.css";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
