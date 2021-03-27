import React from 'react';
import clsx from 'clsx';
import { Drawer, Hidden, List, makeStyles } from '@material-ui/core';
import NavItem from './NavItem';
import SidebarLinks from 'components/Authenticated/Sidebar/SidebarLinks';
import useUser from 'hooks/useUser/userContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: 0,
  },
  desktopPaper: {
    paddingTop: theme.spacing(20),
  },
  name: {
    color: '#BFC5D2',
    opacity: 1,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

const Sidebar = ({ open, handleClose }) => {
  const classes = useStyles();
  const { user } = useUser();
  const sidebarItems = SidebarLinks[user.role];

  const content = (
    <List>
      {sidebarItems.map((item) => (
        <NavItem
          href={item.href}
          key={item.title}
          title={item.title}
          icon={item.icon}
        />
      ))}
    </List>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={handleClose}
          open={open}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          variant="permanent"
          className={clsx(classes.desktopDrawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.desktopPaper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Sidebar;
