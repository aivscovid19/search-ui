import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FoamTreeSearchPage from './components/FoamTreeSearchPage/';
import DeepSearchPage from './components/DeepSearchPage/';

export default () => (
  <HashRouter>
    <Switch>
      <Route path='/search/deep' component={DeepSearchPage} />
      <Route path='/:search' component={FoamTreeSearchPage} />
      <Route path='/' component={LandingPage} />
    </Switch>
  </HashRouter>
);