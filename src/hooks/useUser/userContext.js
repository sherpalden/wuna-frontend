import React from 'react';
import { useAuth } from 'hooks/useAuth/authContext';

const UserContext = React.createContext();

export function UserProvider({ children }) {
  const {
    state: { user, userLoading, loading },
  } = useAuth();

  return (
    <UserContext.Provider
      value={{ user: user, userLoading: userLoading, loading: loading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}
