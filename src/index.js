import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';


import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/style.css"
import 'react-loading-skeleton/dist/skeleton.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


