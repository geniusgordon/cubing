import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Home from './containers/Home';
import {
  PllRecognitionTrainer,
  CollRecognitionTrainer,
  CrossTrainer,
  ZbllTrainer,
} from './containers/Trainers';

function NoMatch() {
  return <Redirect to="/" />;
}

function Routes() {
  return (
    <Router>
      <Switch>
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
        <Route path="/trainers/cross" exact component={CrossTrainer} />
        <Route path="/trainers/zbll" exact component={ZbllTrainer} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default Routes;
