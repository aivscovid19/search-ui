import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FoamTreeSearchPage from './components/quickSearchPage';
import DeepSearchPage from './components/deepSearchPage';

export default () => (
  <HashRouter>
    <Switch>
      <Route path='/deepsearch/:search' component={DeepSearchPage} />
      <Route path='/:search' component={FoamTreeSearchPage} />
      <Route path='/' component={LandingPage} />
    </Switch>
  </HashRouter>
);