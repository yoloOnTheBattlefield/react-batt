import React from 'react';
import {
  Router, Route, hashHistory, IndexRoute
} from 'react-router';
import App from './App';
import Nav from './Components/Nav';
import Game from './Components/Game';

export default(
  <Router history={hashHistory}>
    <Route path='/' component={App} >
      <IndexRoute component={Game} />
    </Route>
  </Router>
)
