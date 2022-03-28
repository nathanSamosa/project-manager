import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './client/components/App';

import './client/styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
