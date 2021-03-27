import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { UsersProvider } from 'hooks/useUser/usersContext';
import ListUser from './ListUser';
import AddUser from './AddUser';
import ShowUser from './ShowUser';

function Users() {
  return (
    <UsersProvider>
      <Switch>
        <Route exact path="/users" component={ListUser} />
        <Route exact path="/users/add" component={AddUser} />
        <Route exact path="/users/:id/view" component={ShowUser} />
      </Switch>
    </UsersProvider>
  );
}

export default Users;
