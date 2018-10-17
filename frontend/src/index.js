import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
