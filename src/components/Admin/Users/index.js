import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListUser from './ListUser';
import ShowUser from './ShowUser';
import { UsersProvider } from 'hooks/useUser/usersContext';

function Users() {
  return (
    <UsersProvider>
      <Switch>
        <Route exact path="/users/:id/view" component={ShowUser} />
        <Route exact path="/users" component={ListUser} />
      </Switch>
    </UsersProvider>
  );
}

export default Users;
