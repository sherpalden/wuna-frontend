import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    '& .MuiCardContent-root': {
      padding: 0,
    },
    width: '100%',
    background: 'transparent',
    padding: '5px 20px',
  },
  display: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 20px',
  },
  title: {
    fontWeight: 'bold',
  },
  circle: {
    marginTop: '7px',
    marginRight: '10px',
    borderRadius: '100%',
    borderColor: 'blue',
    height: '10px',
    width: '10px',
    backgroundColor: 'blue',
  },
});

function NotificationCard({ notificationDetails }) {
  const classes = useStyles();
  return (
    <div className={classes.display}>
      <div style={{ paddingTop: 0 }}>
        <Typography variant="h6" className={classes.title}>
          {notificationDetails.title}
        </Typography>
        <Typography color="textSecondary">
          {notificationDetails.desc}
        </Typography>
        <Typography
          color="textSecondary"
          variant="subtitle2"
          className={classes.title}
        >
          {new Date(notificationDetails.createdAt).toString()}
        </Typography>
      </div>
      {!notificationDetails.seen && <span className={classes.circle} />}
    </div>
  );
}

export default NotificationCard;
