import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.LOGIN} component={LoginPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
