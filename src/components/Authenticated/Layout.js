import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Sidebar from 'components/Authenticated/Sidebar/Sidebar';
import NavBar from 'components/Authenticated/NavBar';
import styled from 'styled-components';
import ThirdParty from 'components/ThirdParty';
import Roles from 'utils/role';
import Admin from '../Admin';
import Enterprise from '../Enterprise';
import EndUser from '../EndUser';
import useUser from '../../hooks/useUser/userContext';
import { UsersProvider } from 'hooks/useUser/usersContext';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F4F6FC',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    width: '100%',
    overflow: 'hidden',
    padding: '128px 56px 64px',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
}));

const StyledPaper = styled.div`
  padding: 2%;
  width: 100%;
`;

function Component() {
  const { user } = useUser();

  if (user.role === Roles.WUNA_ADMIN) {
    return <Admin />;
  }

  if (user.role === Roles.ENTERPRISE_USER) {
    return <Enterprise />;
  }

  if (user.role === Roles.THIRD_PARTY) {
    return <ThirdParty />;
  }

  if (user.role === Roles.END_USER) {
    return <EndUser />;
  }

  throw new Error('User is not present');
}

function Layout() {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleDrawerToggle = () => setSidebarOpen((open) => !open);

  return (
    <UsersProvider>
      <div className={classes.root}>
        <NavBar handleMenuClick={handleDrawerToggle} />
        <Sidebar open={sidebarOpen} handleClose={handleDrawerToggle} />
        <div className={classes.wrapper}>
          <StyledPaper>
            <Component />
          </StyledPaper>
        </div>
      </div>
    </UsersProvider>
  );
}

export default Layout;
