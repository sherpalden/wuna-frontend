import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard';
import Users from './Users';
import Enterprises from './Enterprises';
import Card from '../Card';
import ThirdParties from './ThirdParties';
import Notification from 'components/notifications';

function Admin() {
  return (
    <Switch>
      <Route exact component={Dashboard} path="/dashboard" />
      <Route component={Users} path="/users" />
      <Route component={Enterprises} path="/enterprises" />
      <Route component={Card} path="/cards" />
      <Route component={ThirdParties} path="/third-parties" />
      <Route component={Notification} path="/notifications" />
      <Redirect to="/dashboard" />
    </Switch>
  );
}

export default Admin;
