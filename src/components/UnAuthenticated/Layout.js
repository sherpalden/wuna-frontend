import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Login from 'components/Login';

function UnauthenticatedLayout({ children }) {
  return (
    <Grid container>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}

export default function Layout() {
  return (
    <UnauthenticatedLayout>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    </UnauthenticatedLayout>
  );
}
