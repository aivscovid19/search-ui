import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FoamTreeSearchPage from './components/quickSearchPage';
import DeepSearchPage from './components/deepSearchPage';
import './components/mobileStyles.css'
import { DeepSearchResult } from './components/deepSearchPage/deepSearchReuslts';

export default () => (
  <HashRouter>
    <Switch>
      <Route path='/deepsearch/result/:id' component={DeepSearchResult} />
      <Route path='/deepsearch/search/:search' component={DeepSearchPage} />
      <Route path='/search/:search' component={FoamTreeSearchPage} />
      <Route path='/' component={LandingPage} />
    </Switch>
  </HashRouter>
);