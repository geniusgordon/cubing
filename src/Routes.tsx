import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home';
import {
  PllRecognitionTrainer,
  CollRecognitionTrainer,
  CrossTrainer,
} from './containers/Trainers';
import AppBar from './components/AppBar';

function Routes() {
  return (
    <Router basename="/cubing-tools">
      <AppBar />
      <Route path="/" exact component={Home} />
      <Route
        path="/trainers/recognition/pll"
        exact
        component={PllRecognitionTrainer}
      />
      <Route
        path="/trainers/recognition/coll"
        exact
        component={CollRecognitionTrainer}
      />
      <Route
        path="/trainers/cross"
        exact
        component={CrossTrainer}
      />
    </Router>
  );
}

export default Routes;
