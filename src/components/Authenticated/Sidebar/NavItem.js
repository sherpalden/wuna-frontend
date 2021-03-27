import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { StyledButton } from 'components/common/Button';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%',
    paddingLeft: '20px',
    height: '56px',
    borderRadius: '0',
    borderLeft: '4px solid transparent',
  },
  icon: {
    marginRight: theme.spacing(1),
    color: '#BFC5D2',
    opacity: 1,
  },
  title: {
    color: '#BFC5D2',
  },
  active: {
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    background: `${theme.palette.primary.main} 0% 0% no-repeat padding-box`,
    backgroundColor: theme.palette.secondary.main,
    '& $title': {
      color: theme.palette.primary.main,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
}));

const NavItem = ({ className, href, icon: Icon, title, ...rest }) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <StyledButton
        activeClassName={classes.active}
        className={classes.button}
        component={RouterLink}
        to={href}
      >
        {Icon && (
          <ListItemIcon>
            <Icon className={classes.icon} size="20" />
          </ListItemIcon>
        )}
        <ListItemText className={classes.title} primary={title} />
      </StyledButton>
    </ListItem>
  );
};

export default NavItem;
