import React from 'react';
import Request from './Request';
import { makeStyles, Paper, Typography } from '@material-ui/core';
import { RequestProvider } from 'hooks/useRequest/requestContext';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    marginTop: 20,
  },
}));

function Search() {
  const classes = useStyles();
  return (
    <div>
      <RequestProvider>
        <Typography variant="h4">Search</Typography>
        <Paper elevation={0} className={classes.root}>
          <Request />
        </Paper>
      </RequestProvider>
    </div>
  );
}

export default Search;
