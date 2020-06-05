import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import Landing from './Landing';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Landing} />
    </Switch>
  </HashRouter>
);