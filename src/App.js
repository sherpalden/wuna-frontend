import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import theme from 'theme/mui';
import UnAuthenticated from 'components/UnAuthenticated';
import Authenticated from 'components/Authenticated';
import useUser from 'hooks/useUser/userContext';
import { SnackbarProvider } from 'notistack';
import { NotificationProvider } from 'hooks/useNotification/useNotification';
import WunaLoader from './components/common/WunaLoader/WunaLoader';

function App() {
  const { user, userLoading } = useUser();

  if (userLoading) {
    return <WunaLoader />;
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <SnackbarProvider
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {user ? <Authenticated /> : <UnAuthenticated />}
          </SnackbarProvider>
        </NotificationProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
