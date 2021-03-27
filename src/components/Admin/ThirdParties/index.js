import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListThirdParty from './ListThirdParty';
import AddThirdParty from './AddThirdParty';
import ShowThirdParty from './ShowThirdParty';
import AddThirdPartyUser from './AddThirdPartyUser';
import { ThirdPartyProvider } from 'hooks/useThirdParty/thirdPartyContext';
import { UsersProvider } from '../../../hooks/useUser/usersContext';

function ThirdParties() {
  return (
    <ThirdPartyProvider>
      <UsersProvider>
        <Switch>
          <Route exact path="/third-parties" component={ListThirdParty} />
          <Route
            exact
            path="/third-parties/:id/view"
            component={ShowThirdParty}
          />
          <Route
            exact
            path="/third-parties/:id/add-user"
            component={AddThirdPartyUser}
          />
          <Route exact path="/third-parties/add" component={AddThirdParty} />
        </Switch>
      </UsersProvider>
    </ThirdPartyProvider>
  );
}

export default ThirdParties;
