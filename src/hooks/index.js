import React from 'react';
import { AuthProvider } from './useAuth/authContext';
import { UserProvider } from './useUser/userContext';
import { SnackbarProvider } from 'notistack';

function AppProviders({ children }) {
  return (
    <SnackbarProvider
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      autoHideDuration={2000}
    >
      <AuthProvider>
        <UserProvider>{children}</UserProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default AppProviders;
