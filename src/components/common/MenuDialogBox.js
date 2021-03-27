import React from 'react';
import {
  Menu,
  MenuItem,
  makeStyles,
  Typography,
  Avatar,
} from '@material-ui/core';
import StyledLink from './StyledLink';
import { getAuthorization } from 'utils/authCookie';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: '50px',
    '& .MuiListItem-root': {
      paddingLeft: 20,
      padding: 3,
    },
  },
  Avatar: {
    height: theme.spacing(5),
    width: theme.spacing(5),
    alignSelf: 'center',
  },
  header: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    outline: 'none',
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
  },
  text: {
    marginTop: 2,
  },
}));

const serverUrl = process.env.REACT_APP_API_ENDPOINT;

function MenuDialogBox({ anchorEl, handleClose, logout, user }) {
  const classes = useStyles();

  const onClickLogOut = (e) => {
    e.preventDefault();
    logout();
  };
  const token = getAuthorization();
  return (
    <Menu
      id="menu-DialogBox"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      className={classes.menu}
    >
      <div className={classes.header}>
        <Avatar
          alt={user?.name?.firstName}
          src={
            `${serverUrl}${user?.identificationimage?.link}?token=${token}` ||
            '/brokenimage.jpg'
          }
          className={classes.Avatar}
        />
        <Typography variant="caption" className={classes.text}>
          {user?.name.firstName} {user?.name?.middleName || null}{' '}
          {user?.name.lastName}
        </Typography>
        <Typography variant="subtitle1">{user?.email}</Typography>
      </div>
      <MenuItem>
        <StyledLink to="/profile">
          <Typography variant="body1" color={'primary'}>
            Profile
          </Typography>
        </StyledLink>
      </MenuItem>
      <MenuItem onClick={onClickLogOut}>
        <Typography variant="body1" color={'primary'}>
          LOGOUT
        </Typography>
      </MenuItem>
    </Menu>
  );
}

export default MenuDialogBox;
