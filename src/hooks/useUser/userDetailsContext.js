import React, { useReducer } from 'react';
import actionCreator from 'utils/actionCreator';
import * as usersClient from 'services/usersClient';
import { useSnackbar } from 'notistack';

const GET_USER_DETAILS = 'GET_USER_DETAILS';
const GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS';
const GET_USER_DETAILS_ERROR = 'GET_USER_DETAILS_ERROR';

const SERVER_ERROR = 'Server Error';
const USER_DETAILS = 'User Details';

const getUserDetailsAction = actionCreator(GET_USER_DETAILS);
const getUserDetailsSuccessAction = actionCreator(GET_USER_DETAILS_SUCCESS);
const getUserDetailsErrorAction = actionCreator(GET_USER_DETAILS_ERROR);

const UserDetailsContext = React.createContext();

const initialState = {
  loading: false,
  error: null,
  userDetails: null,
};

function userDetailsReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_DETAILS:
      return { ...state, loading: true, error: null };
    case GET_USER_DETAILS_SUCCESS:
      return { ...state, userDetails: payload, loading: false };
    case GET_USER_DETAILS_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}

function UserDetailsProvider({ children }) {
  const [state, dispatch] = useReducer(userDetailsReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();
  const getUserDetails = async () => {
    try {
      dispatch(getUserDetailsAction());
      const {
        status,
        data: { userDetails, message },
      } = await usersClient.getUserDetails();
      if (status >= 400) {
        enqueueSnackbar(message, { variant: 'error' });
        dispatch(getUserDetailsErrorAction(message));
      } else {
        dispatch(getUserDetailsSuccessAction(userDetails));
      }
    } catch (error) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getUserDetailsErrorAction(error.message));
    }
  };

  const createOrUpdateUserDetails = async (details) => {
    try {
      dispatch(getUserDetailsAction());
      const {
        status,
        data: { message, userDetails },
        statusText,
      } = await usersClient.updateUserDetails(details);
      if (status >= 400) {
        enqueueSnackbar(message, { variant: 'error' });
        dispatch(getUserDetailsErrorAction(message));
      } else {
        enqueueSnackbar(USER_DETAILS + ' ' + statusText, {
          variant: 'success',
        });
        dispatch(getUserDetailsSuccessAction(userDetails));
      }
    } catch (error) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getUserDetailsErrorAction(error.message));
    }
  };

  return (
    <UserDetailsContext.Provider
      value={{ state, getUserDetails, createOrUpdateUserDetails }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
}

function useUserDetails() {
  const context = React.useContext(UserDetailsContext);
  if (context === undefined) {
    throw new Error(
      'useUsersDetails must be used within a UserDetailsProvider'
    );
  }
  return context;
}

export { UserDetailsContext, useUserDetails, UserDetailsProvider };
