import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import ListRequest from './ListRequest';
import { RequestProvider } from 'hooks/useRequest/requestContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    marginTop: 20,
  },
}));

function Request() {
  const classes = useStyles();
  return (
    <RequestProvider>
      <Typography variant="h4">Third Party Requests</Typography>
      <Paper elevation={0} className={classes.root}>
        <ListRequest />
      </Paper>
    </RequestProvider>
  );
}

export default Request;
