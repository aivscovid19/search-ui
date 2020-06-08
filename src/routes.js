import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FoamTreeSearchPage from './components/FoamTreeSearchPage/';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/:search' component={FoamTreeSearchPage} />
    </Switch>
  </HashRouter>
);