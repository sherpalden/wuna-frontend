import React, { useReducer, useEffect } from 'react';
import actionCreator from 'utils/actionCreator';
import * as authClient from 'services/authClient';
import { useSnackbar } from 'notistack';

const AuthContext = React.createContext();

const LOGIN = 'login';
const LOGIN_ERROR = 'login_error';
const LOGIN_SUCCESS = 'login_success';

const LOGOUT = 'logout';
const LOGOUT_SUCCESS = 'logout_success';

const USER_LOADING = 'USER_LOADING';

const login = actionCreator(LOGIN);
const loginError = actionCreator(LOGIN_ERROR);
const loginSuccess = actionCreator(LOGIN_SUCCESS);
const userLoading = actionCreator(USER_LOADING);

const logout = actionCreator(LOGOUT);
const logoutSuccess = actionCreator(LOGOUT_SUCCESS);

const LOGGED_IN = 'Logged In';
const LOGGED_OUT = 'Logged Out';
const SERVER_ERROR = 'Server_Error';

const initialState = {
  login: {
    error: null,
    loading: false,
  },
  user: null,
  userLoading: true,
};

function authReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        login: {
          error: null,
          loading: true,
        },
        user: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          error: null,
          loading: false,
        },
        user: payload,
        userLoading: false,
      };
    case LOGIN_ERROR:
      const { error } = payload;
      return {
        ...state,
        login: {
          error: error,
          loading: false,
        },
        user: null,
        userLoading: false,
      };
    case LOGOUT:
      return {
        ...state,
        logout: {
          error: payload,
          loading: false,
        },
        user: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logout: {
          error: null,
          loading: false,
        },
        user: null,
      };
    case USER_LOADING:
      return {
        ...state,
        userLoading: true,
      };
    default:
      throw new Error();
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUser() {
    dispatch(userLoading());
    const user = await authClient.getUser();

    if (user === process.env.TOKEN) {
      dispatch(loginError({}));
    } else if (user) {
      dispatch(loginSuccess(user));
    } else {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(loginError({}));
    }
  }

  async function handleLogin(form) {
    try {
      dispatch(login());
      const response = await authClient.login(form);
      const { message } = response.data;
      if (response.status >= 400) {
        enqueueSnackbar(message, { variant: 'error' });
        dispatch(loginError({ error: message }));
      } else {
        enqueueSnackbar(LOGGED_IN, { variant: 'success' });
        const user = await authClient.getUser();
        dispatch(loginSuccess(user));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(loginError('Invalid Email or Password'));
    }
  }

  async function handleLogout() {
    dispatch(logout());
    await authClient.logout();
    enqueueSnackbar(LOGGED_OUT, { variant: 'success' });
    dispatch(logoutSuccess());
  }

  return (
    <AuthContext.Provider
      value={{ state, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth };
