import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

ReactDOM.render(
  <Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="http://localhost:3000/">
          <img src="assets/Logo-bestprice.png" width="30" height="30" className="d-inline-block align-top" alt="logo"></img>
          Best Price Demo
        </a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="http://localhost:3000/"> Αρχική</a>
            </li>
          </ul>
        </div>
      </nav>
      <Routes />
    </div>
  </Router>,
  document.getElementById('root')
);

