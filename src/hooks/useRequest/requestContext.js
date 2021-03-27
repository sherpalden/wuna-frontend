import React, { useReducer } from 'react';
import actionCreator from 'utils/actionCreator';
import * as requestClient from 'services/thirdPartyUser';
import { useSnackbar } from 'notistack';

const RequestContext = React.createContext();

const ADD_REQUEST = 'add_request';
const ADD_REQUEST_ERROR = 'add_request_error';
const ADD_REQUEST_SUCCESS = 'add_request_success';

const addThirdPartyUserAction = actionCreator(ADD_REQUEST);
const addThirdPartyUserErrorAction = actionCreator(ADD_REQUEST_ERROR);
const addThirdPartyUserSuccessAction = actionCreator(ADD_REQUEST_SUCCESS);

const GET_REQUEST_LIST = 'get_request_list';
const GET_REQUEST_LIST_ERROR = 'get_request_error_list';
const GET_REQUEST_LIST_SUCCESS = 'get_request_success_list';

const getThirdPartyUserListAction = actionCreator(GET_REQUEST_LIST);
const getThirdPartyUserListErrorAction = actionCreator(GET_REQUEST_LIST_ERROR);
const getThirdPartyUserListSuccessAction = actionCreator(
  GET_REQUEST_LIST_SUCCESS
);

const UPDATE_REQUEST = 'UPDATE_REQUEST';
const UPDATE_REQUEST_ERROR = 'UPDATE_REQUEST_ERROR';
const UPDATE_REQUEST_SUCCESS = 'UPDATE_REQUEST_SUCCESS';

const updateThirdPartyUserAction = actionCreator(UPDATE_REQUEST);
const updateThirdPartyUserErrorAction = actionCreator(UPDATE_REQUEST_ERROR);
const updateThirdPartyUserSuccessAction = actionCreator(UPDATE_REQUEST_SUCCESS);

const THIRDPARTYUSER_CREATED = 'ThirdPartyUser Created';
const THIRDPARTYUSER_UPDATED = 'ThirdPartyUser Updated';

const SERVER_ERROR = 'Server Error';

const initialState = {
  thirdPartyUsers: [],
  thirdPartyUser: null,
  loading: false,
  error: null,
};

function requestReducer(state, action) {
  const { thirdPartyUsers = [] } = state;
  switch (action.type) {
    case GET_REQUEST_LIST:
    case UPDATE_REQUEST:
    case ADD_REQUEST:
      return { ...state, error: null, loading: true };
    case GET_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        thirdPartyUsers: action.payload,
        error: null,
        loading: false,
      };
    case ADD_REQUEST_SUCCESS:
      return {
        ...state,
        thirdPartyUser: action.payload,
        thirdPartyUsers: thirdPartyUsers.push(action.payload),
        loading: false,
        error: null,
      };
    case UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        thirdPartyUsers: thirdPartyUsers.map((tpu) =>
          tpu._id === action.payload._id ? action.payload : tpu
        ),
        loading: false,
        error: null,
      };
    case GET_REQUEST_LIST_ERROR:
    case UPDATE_REQUEST_ERROR:
    case ADD_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

function RequestProvider({ children }) {
  const [state, dispatch] = useReducer(requestReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  async function getThirdPartyUserList() {
    try {
      dispatch(getThirdPartyUserListAction());
      const { status, data } = await requestClient.getAll();
      if (status >= 400) {
        enqueueSnackbar(data?.message, {
          variant: 'error',
        });
        dispatch(getThirdPartyUserListErrorAction(data.message));
      } else {
        dispatch(getThirdPartyUserListSuccessAction(data.thirdPartyUsers));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getThirdPartyUserListErrorAction('Error creating Request'));
    }
  }

  async function createThirdPartyUser(params, callback) {
    try {
      dispatch(addThirdPartyUserAction());
      const { status, data } = await requestClient.createThirdPartyUser(params);
      if (status >= 400) {
        if (callback && typeof callback === 'function') callback(data);
        dispatch(addThirdPartyUserErrorAction(data));
      } else {
        enqueueSnackbar(THIRDPARTYUSER_CREATED, { variant: 'success' });
        dispatch(addThirdPartyUserSuccessAction(data.thirdPartyUser));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(addThirdPartyUserErrorAction(e?.response?.data?.message));
    }
  }

  async function updateThirdPartyUser(id, params) {
    try {
      dispatch(updateThirdPartyUserAction());
      const { status, data } = await requestClient.updateThirdPartyUser(
        id,
        params
      );
      if (status >= 400) {
        enqueueSnackbar(data.message, { variant: 'success' });
        dispatch(updateThirdPartyUserErrorAction(data.message));
      } else {
        enqueueSnackbar(THIRDPARTYUSER_UPDATED, { variant: 'success' });
        dispatch(updateThirdPartyUserSuccessAction(data.thirdPartyUser));
      }
    } catch (err) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(updateThirdPartyUserErrorAction(err.message));
    }
  }
  return (
    <RequestContext.Provider
      value={{
        state,
        getThirdPartyUserList,
        createThirdPartyUser,
        updateThirdPartyUser,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
}

function useRequest() {
  const context = React.useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequest must be used within a RequestProvider');
  }
  return context;
}

export { RequestContext, RequestProvider, useRequest };
