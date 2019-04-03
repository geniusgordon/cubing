import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './containers/Home';
import PllRecognitionTrainer from './containers/Trainers/PllRecognitionTrainer';
import AppBar from './components/AppBar';

function Routes() {
  return (
    <Router>
      <AppBar />
      <Route path="/" exact component={Home} />
      <Route
        path="/pll-recognition-trainer"
        exact
        component={PllRecognitionTrainer}
      />
    </Router>
  );
}

export default Routes;
