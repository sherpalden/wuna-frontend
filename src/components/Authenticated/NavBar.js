import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Avatar,
} from '@material-ui/core';
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import { makeStyles, fade } from '@material-ui/core/styles';
import LogoSrc from 'images/holdaccess-resized.jpg';
import { useAuth } from 'hooks/useAuth/authContext';
import MenuIcon from '@material-ui/icons/Menu';
import { useNotification } from 'hooks/useNotification/useNotification';
import NotificationDialogBox from 'components/common/NotificationDialogBox';
import MenuDialogBox from 'components/common/MenuDialogBox';
import { useInterval } from 'hooks/useInterval';
import useUser from 'hooks/useUser/userContext';
import { getAuthorization } from 'utils/authCookie';

const Logo = (props) => {
  return <img alt="Logo" src={LogoSrc} {...props} />;
};

const serverUrl = process.env.REACT_APP_API_ENDPOINT;
const Profile = ({ user, classes, handleOpenMenuDialogBox }) => {
  const token = getAuthorization();
  return (
    <Avatar
      src={
        `${serverUrl}${user?.identificationimage?.link}?token=${token}` ||
        '/brokenimage.jpg'
      }
      alt={user?.name?.firstName}
      className={classes.sizeAvatar}
      onClick={handleOpenMenuDialogBox}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    borderBottom: `2px solid ${fade(theme.palette.grey.main, 0.12)}`,
    zIndex: 999,
  },
  menuButton: {
    marginRight: 36,
    color: theme.palette.grey.light,
  },
  sizeAvatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    marginBottom: 4,
    marginLeft: 5,
    cursor: 'pointer',
    marginRight: 40,
  },
  notificationButton: {
    marginRight: 30,
  },
}));

const NavBar = ({ handleMenuClick }) => {
  const { logout } = useAuth();
  const {
    state: { notifications, unseenCount },
    getNotificationList,
    updateNotification,
  } = useNotification();
  const classes = useStyles();
  const { user } = useUser();

  const [anchorEl, setAnchorEl] = useState();
  const [openMenuDialogBox, setopenMenuDialogBox] = useState();

  useEffect(() => {
    getNotificationList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // pooling notifications api on each 3 min
  useInterval(async () => {
    await getNotificationList();
  }, 180000);

  const handleClose = () => setAnchorEl(false);
  const handleCloseMenuDialogBox = () => setopenMenuDialogBox(false);
  const handleOpenMenuDialogBox = (e) => setopenMenuDialogBox(e.currentTarget);
  const handleGetNotificationList = (e) => setAnchorEl(e.currentTarget);

  return (
    <AppBar elevation={0} className={classes.root}>
      <NotificationDialogBox
        anchorEl={anchorEl}
        handleClose={handleClose}
        notifications={notifications}
        updateNotification={updateNotification}
      />
      <MenuDialogBox
        anchorEl={openMenuDialogBox}
        handleClose={handleCloseMenuDialogBox}
        logout={logout}
        user={user}
      />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleMenuClick}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <RouterLink to="/">
          <Logo height="40" />
        </RouterLink>
        <Box flexGrow={1} />
        <IconButton
          color="secondary"
          title="Notifications"
          onClick={handleGetNotificationList}
          className={classes.notificationButton}
        >
          <Badge badgeContent={unseenCount} color="primary">
            <NotificationsActiveRoundedIcon color="primary" />
          </Badge>
        </IconButton>
        <Profile
          user={user}
          classes={classes}
          handleOpenMenuDialogBox={handleOpenMenuDialogBox}
        />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
