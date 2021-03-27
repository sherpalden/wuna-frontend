import React from 'react';
import ListRequest from './ListUserRequest';
import { RequestProvider } from 'hooks/useRequest/requestContext';
import { Route, Switch } from 'react-router-dom';

function ThirdPartyRequest() {
  return (
    <RequestProvider>
      <Switch>
        <Route component={ListRequest} path="/request-from-users" />
      </Switch>
    </RequestProvider>
  );
}

export default ThirdPartyRequest;
