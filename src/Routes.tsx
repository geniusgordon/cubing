import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home';
import AppBar from './components/AppBar';

function Routes() {
  return (
    <Router>
      <AppBar />
      <Route path="/" exact component={Home} />
    </Router>
  );
}

export default Routes;
