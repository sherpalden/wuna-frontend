import React, { useReducer, useCallback } from 'react';
import actionCreator from 'utils/actionCreator';
import * as userClient from 'services/usersClient';
import { useSnackbar } from 'notistack';

const UsersContext = React.createContext();

const GET_USERS = 'get_users';
const GET_USERS_SUCCESS = 'get_users_success';
const GET_USERS_ERROR = 'get_users_error';

const getUsersAction = actionCreator(GET_USERS);
const getUsersSuccessAction = actionCreator(GET_USERS_SUCCESS);
const getUsersErrorAction = actionCreator(GET_USERS_ERROR);

const GET_USER = 'get_user';
const GET_USER_SUCCESS = 'get_user_success';
const GET_USER_ERROR = 'get_user_error';

const getUserAction = actionCreator(GET_USER);
const getUserSuccessAction = actionCreator(GET_USER_SUCCESS);
const getUserErrorAction = actionCreator(GET_USER_ERROR);

const CREATE_USER = 'CREATE_USER';
const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

const createUserAction = actionCreator(CREATE_USER);
const createUserSuccessAction = actionCreator(CREATE_USER_SUCCESS);
const createUserErrorAction = actionCreator(CREATE_USER_ERROR);

const CLOSE_MODAL = 'CLOSE_MODAL';
const closeModal = actionCreator(CLOSE_MODAL);

const GET_USER_CREDENTIALS = 'get_user_credentials';
const GET_USER_CREDENTIALS_SUCCESS = 'get_user_credentials_success';
const GET_USER_CREDENTIALS_ERROR = 'get_user_credentials_error';

const getUserCredentials = actionCreator(GET_USER_CREDENTIALS);
const getUserCredentialsSuccess = actionCreator(GET_USER_CREDENTIALS_SUCCESS);
const getUserCredentialsError = actionCreator(GET_USER_CREDENTIALS_ERROR);

const USER_CREATED = 'User Created';
const USER_CREDENTIALS_EXIST = 'User Credentials Exist';

const SERVER_ERROR = 'Server Error';

const initialState = {
  users: [],
  loading: false,
  error: null,
  redirectTo: false,
  user: null,
  credentials: null,
};

function usersReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return { ...state, error: null, loading: true };
    case GET_USERS_SUCCESS:
      return { ...state, users: action.payload, loading: false };
    case GET_USERS_ERROR:
      return { ...state, users: [], error: action.payload, loading: false };
    case GET_USER:
      return { ...state, error: null, loading: true };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case GET_USER_ERROR:
      return {
        ...state,
        user: false,
        error: payload,
        loading: false,
      };
    case CREATE_USER:
      return { ...state, error: null, loading: true };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        redirectTo: true,
      };
    case CREATE_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case GET_USER_CREDENTIALS:
      return { ...state, error: null, loading: true };
    case GET_USER_CREDENTIALS_SUCCESS:
      return {
        ...state,
        credentials: action.payload,
        loading: false,
        redirectTo: true,
      };
    case GET_USER_CREDENTIALS_ERROR:
      return {
        ...state,
        credentials: payload,
        loading: false,
        redirectTo: true,
      };
    case CLOSE_MODAL:
      return { ...state, redirectTo: false, user: {} };
    default:
      throw new Error();
  }
}

// We might not even need this
// NOTE/TODO: Simple hooks sharing shall be enough
function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  // TODO: Map errors properly
  const getUsers = useCallback(async () => {
    try {
      dispatch(getUsersAction());
      const { status, data } = await userClient.getAll();
      if (status >= 400) {
        enqueueSnackbar(data.message, { variant: 'error' });
        dispatch(getUsersErrorAction(data));
      } else {
        dispatch(getUsersSuccessAction(data?.data || []));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getUsersErrorAction('Error listing users'));
    }
  }, [dispatch, enqueueSnackbar]);

  // TODO: create user refine validation errors
  async function createUser(params, errorCallback, successCallBack) {
    try {
      dispatch(createUserAction());
      const response = await userClient.addUser(params);
      if (response.status >= 400) {
        if (errorCallback && typeof errorCallback === 'function')
          errorCallback(response?.data);
        dispatch(createUserErrorAction(response?.data?.message));
      } else {
        const { credentials } = response.data;
        enqueueSnackbar(USER_CREATED, { variant: 'success' });
        dispatch(createUserSuccessAction(credentials));
        if (successCallBack && typeof successCallBack === 'function')
          successCallBack(credentials);
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(createUserErrorAction(e.message));
    }
  }

  async function getUser(id) {
    try {
      dispatch(getUserAction());
      const response = await userClient.getUser(id);
      const { message } = response.data;

      if (response.status >= 400) {
        enqueueSnackbar(response?.data?.message, { variant: 'error' });
        dispatch(getUserErrorAction(message));
      } else {
        const { user } = response.data;
        dispatch(getUserSuccessAction(user));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getUserErrorAction(e.message));
    }
  }

  async function getUserCredential(id) {
    try {
      dispatch(getUserCredentials());
      const response = await userClient.getUserCredentials(id);
      const { message } = response.data;

      if (response.status >= 400) {
        enqueueSnackbar(message, { variant: 'error' });
        dispatch(getUserCredentialsError(message));
      } else {
        const { credentials } = response.data;
        enqueueSnackbar(USER_CREDENTIALS_EXIST, { variant: 'success' });
        dispatch(getUserCredentialsSuccess(credentials));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getUserCredentialsError(e.message));
    }
  }

  return (
    <UsersContext.Provider
      value={{
        state,
        getUser,
        getUsers,
        createUser,
        toggleModalClose: closeModal,
        getUserCredential,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

function useUsers() {
  const context = React.useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
}

export { UsersContext, UsersProvider, useUsers };
