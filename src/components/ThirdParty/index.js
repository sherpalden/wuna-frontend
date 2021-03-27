import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Notification from 'components/notifications';
import ScanCard from 'components/ThirdParty/ScanCard';
import AddDocument from 'components/ThirdParty/AddDocument';
import ThirdPartyRequest from 'components/ThirdParty/ListUserRequest';
import Users from 'components/ThirdParty/Users';
import UserDetails from 'components/ThirdParty/ListUserRequest/UserDetails';

function ThirdParty() {
  return (
    <Switch>
      <Route component={ScanCard} path="/scan" />
      <Route component={AddDocument} path="/documents" />
      <Route component={Users} path="/users" />
      <Route component={Notification} path="/notifications" />
      <Route component={ThirdPartyRequest} path="/request-from-users" />
      <Route path="/request/:id/usersdetails" component={UserDetails} />
      <Redirect to="/scan-card" />
    </Switch>
  );
}

export default ThirdParty;
