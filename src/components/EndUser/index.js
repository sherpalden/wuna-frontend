import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Documents from './Documents';
import UpdateDetails from './UpdateDetails';
import DocumentAccessControl from './DocumentAccessControl';
import OrganizationHistory from './OrganizationHistory';
import UserDetails from './Profile';
import { UserDetailsProvider } from 'hooks/useUser/userDetailsContext';
import { CardProvider } from 'hooks/useCard/cardContext';
import Request from './ThirdPartyRequest';
import Notification from '../notifications/index';

function EndUser() {
  return (
    <UserDetailsProvider>
      <CardProvider>
        <Switch>
          <Route component={UserDetails} path="/user-details" />
          <Route component={Documents} path="/documents" />
          <Route component={UpdateDetails} path="/update-details" />
          <Route
            component={DocumentAccessControl}
            path="/document-access-control"
          />
          <Route component={OrganizationHistory} path="/organization-history" />
          <Route component={Request} path="/request-from-thirdparty" />
          <Route component={Notification} path="/notifications" />
          <Redirect to="/documents" />
        </Switch>
      </CardProvider>
    </UserDetailsProvider>
  );
}

export default EndUser;
