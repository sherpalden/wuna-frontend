import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Users from './Users';
import ShareWithThirdParty from './ShareWithThirdParty';
import Search from './ThirdParty/index';
import Notification from 'components/notifications';

function Enterprise() {
  return (
    <Switch>
      <Route component={Users} path="/users" />
      <Route component={ShareWithThirdParty} path="/share-with-third-party" />
      <Route component={Search} path="/request-to-third-party" />
      <Route component={Notification} path="/notifications" />
      <Redirect to="/users" />
    </Switch>
  );
}

export default Enterprise;
