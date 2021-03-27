import React from 'react';
import { Menu, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { StyledButton } from 'components/common/Button';
import NotificationCard from './NotificationCard';
import StyledLink from './StyledLink';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: 50,
    minWidth: 200,
  },
  paper: {
    minWidth: 350,
  },
  menuitem: {
    textAlign: 'center',
    padding: '10px 0',
    '& .makeStyles-root-21': {
      marginLeft: 0,
    },
    '& .MuiListItem-gutters': {
      padding: 0,
    },
  },
  menuheader: {
    paddingLeft: 20,
    outline: 'none',
    fontFamily: 'Helvetica',
    fontSize: '20px',
  },
  link: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
  },
}));

function NotificationDialogBox({
  anchorEl,
  handleClose,
  notifications,
  updateNotification,
}) {
  const classes = useStyles();
  const onClick = (n) => async () => {
    await updateNotification(n._id);
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      disableAutoFocus={true}
      className={classes.menu}
      classes={{ paper: classes.paper }}
    >
      <Typography className={classes.menuheader}>
        {notifications.length > 0 ? 'Notifications' : 'No Notifications Found'}
      </Typography>
      <div className={classes.menuitem}>
        {notifications.map((element) => (
          <MenuItem onClick={onClick(element)}>
            <NotificationCard notificationDetails={element} />
          </MenuItem>
        ))}
      </div>
      <StyledLink to="/notifications" className={classes.link}>
        <StyledButton size="small" onClick={() => handleClose()}>
          See more
        </StyledButton>
      </StyledLink>
    </Menu>
  );
}

export default NotificationDialogBox;
