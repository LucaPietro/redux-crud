import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Router from './Router';

import Login from './pages/Login';
import Home from './pages/Home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Router path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}
