import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddEnterprise from './AddEnterprise';
import ShowEnterprise from './ShowEnterprise';
import AddEnterpriseUser from './AddEnterpriseUser';
import ListEnterprise from './ListEnterprise';
import { EnterpriseProvider } from 'hooks/useEnterprise/enterpriseContext';
import { UsersProvider } from '../../../hooks/useUser/usersContext';

const Enterprises = () => {
  return (
    <EnterpriseProvider>
      <UsersProvider>
        <Switch>
          <Route
            exact
            path="/enterprises/:id/view"
            render={() => <ShowEnterprise />}
          />
          <Route
            exact
            path="/enterprises/:id/add-user"
            render={() => <AddEnterpriseUser />}
          />
          <Route exact path="/enterprises" render={() => <ListEnterprise />} />
          <Route
            exact
            path="/enterprises/add"
            render={() => <AddEnterprise />}
          />
        </Switch>
      </UsersProvider>
    </EnterpriseProvider>
  );
};

export default Enterprises;
