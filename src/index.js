import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.render(
  <Router>
      <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="best-price">
                        Best Price Demo
                    </a>
                </nav>
          <Routes />
      </div>
  </Router>,
  document.getElementById('root')
);

