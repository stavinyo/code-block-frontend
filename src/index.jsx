import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { RootCmp } from './RootCmp';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <RootCmp />
  </Router>
);


