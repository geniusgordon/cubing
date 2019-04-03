import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home';
import {
  PllRecognitionTrainer,
  CollRecognitionTrainer,
} from './containers/Trainers';
import AppBar from './components/AppBar';

function Routes() {
  return (
    <Router>
      <AppBar />
      <Route path="/" exact component={Home} />
      <Route
        path="/recognition-trainer/pll"
        exact
        component={PllRecognitionTrainer}
      />
      <Route
        path="/recognition-trainer/coll"
        exact
        component={CollRecognitionTrainer}
      />
    </Router>
  );
}

export default Routes;
