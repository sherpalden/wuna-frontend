import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

// alert types can be: error, warning, info, success
const OutlinedAlert = ({ alertType, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert variant="outlined" severity={alertType}>
        {message}
      </Alert>
    </div>
  );
};

export default OutlinedAlert;
