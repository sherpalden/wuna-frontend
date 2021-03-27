import React, { useReducer, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import actionCreator from 'utils/actionCreator';
import * as thirdPartyClient from 'services/thirdPartyClient';

const ThirdPartyContext = React.createContext();

const SERVER_ERROR = 'Server Error';

const THIRDPARTY_ADDED = 'ThirdParty Added';
const THIRDPARTY_PASSWORD_RESET_SUCCESSFUl =
  'ThirdParty Password Reset Successful';

const GET_THIRD_PARTY_LIST = 'get_third_party_list';
const GET_THIRD_PARTY_LIST_SUCCESS = 'get_third_party_list_success';
const GET_THIRD_PARTY_LIST_ERROR = 'get_third_party_list_error';

const getThirdPartyList = actionCreator(GET_THIRD_PARTY_LIST);
const getThirdPartyListSuccess = actionCreator(GET_THIRD_PARTY_LIST_SUCCESS);
const getThirdPartyListError = actionCreator(GET_THIRD_PARTY_LIST_ERROR);

const ADD_THIRD_PARTY = 'add_third_party';
const ADD_THIRD_PARTY_SUCCESS = 'add_third_party_success';
const ADD_THIRD_PARTY_ERROR = 'add_third_party_error';

const addThirdParty = actionCreator(ADD_THIRD_PARTY);
const addThirdPartySuccess = actionCreator(ADD_THIRD_PARTY_SUCCESS);
const addThirdPartyError = actionCreator(ADD_THIRD_PARTY_ERROR);

const GET_THIRD_PARTY = 'get_third_party';
const GET_THIRD_PARTY_SUCCESS = 'get_third_party_success';
const GET_THIRD_PARTY_ERROR = 'get_third_party_error';

const getThirdParty = actionCreator(GET_THIRD_PARTY);
const getThirdPartySuccess = actionCreator(GET_THIRD_PARTY_SUCCESS);
const getThirdPartyError = actionCreator(GET_THIRD_PARTY_ERROR);

const RESET_THIRD_PARTY_PASSWORD = 'reset_third_party_password';
const RESET_THIRD_PARTY_PASSWORD_SUCCESS = 'reset_third_party_password_success';
const RESET_THIRD_PARTY_PASSWORD_ERROR = 'reset_third_party_password_error';

const CLOSE_THIRD_PARTY_MODAL = 'close_third_party_modal';

const resetThirdPartyPassword = actionCreator(RESET_THIRD_PARTY_PASSWORD);
const resetThirdPartyPasswordSuccess = actionCreator(
  RESET_THIRD_PARTY_PASSWORD_SUCCESS
);
const resetThirdPartyPasswordError = actionCreator(
  RESET_THIRD_PARTY_PASSWORD_ERROR
);

const closeThirdPartyModal = actionCreator(CLOSE_THIRD_PARTY_MODAL);

const initialState = {
  thirdPartyList: [],
  thirdParty: null,
  loading: false,
  error: null,
  redirectTo: false,
};

function thirdPartyReducer(state, action) {
  switch (action.type) {
    case GET_THIRD_PARTY_LIST:
      return { ...state, loading: true };
    case GET_THIRD_PARTY_LIST_SUCCESS:
      return {
        ...state,
        thirdPartyList: action.payload,
        loading: false,
      };
    case GET_THIRD_PARTY_LIST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ADD_THIRD_PARTY:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_THIRD_PARTY_SUCCESS:
      return {
        ...state,
        thirdParty: action.payload.thirdParty,
        loading: false,
        error: null,
      };
    case ADD_THIRD_PARTY_ERROR:
      return {
        ...state,
        thirdParty: null,
        loading: false,
        error: action.payload,
      };
    case GET_THIRD_PARTY:
      return { ...state, thirdParty: null, loading: true, error: null };
    case GET_THIRD_PARTY_SUCCESS:
      return {
        ...state,
        thirdParty: action.payload.thirdParty,
        loading: false,
        error: null,
        redirectTo: false,
      };
    case GET_THIRD_PARTY_ERROR:
      return { ...state, thirdParty: null, loading: false, error: null };
    case RESET_THIRD_PARTY_PASSWORD:
      return { ...state, thirdParty: null, loading: true };
    case RESET_THIRD_PARTY_PASSWORD_SUCCESS:
      return { ...state, thirdParty: action.payload, loading: false };
    case RESET_THIRD_PARTY_PASSWORD_ERROR:
      return { ...state, thirdParty: false, loading: false };
    case CLOSE_THIRD_PARTY_MODAL:
      return { ...state, redirectTo: false, loading: false };
    default:
      throw new Error();
  }
}

function ThirdPartyProvider({ children }) {
  const [state, dispatch] = useReducer(thirdPartyReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getList() {
    try {
      dispatch(getThirdPartyList());
      const {
        status,
        data: { data },
      } = await thirdPartyClient.getAll();
      if (status >= 400) {
        enqueueSnackbar(data.message, { variant: 'error' });
        dispatch(getThirdPartyListError(data.message));
      } else {
        dispatch(getThirdPartyListSuccess(data));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getThirdPartyListError('Error getting enterprise'));
    }
  }

  async function add(params) {
    try {
      dispatch(addThirdParty());
      const response = await thirdPartyClient.add(params);
      if (response.status >= 400) {
        dispatch(
          addThirdPartyError(
            response?.data?.message ||
              'Some things went wrong while adding third party'
          )
        );
      } else {
        enqueueSnackbar(THIRDPARTY_ADDED, {
          variant: 'success',
        });
        dispatch(addThirdPartySuccess(response.data.thirdParty));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(addThirdPartyError(e.message));
    }
  }

  async function get(id) {
    try {
      dispatch(getThirdParty());
      const response = await thirdPartyClient.show(id);

      if (response.status >= 400) {
        enqueueSnackbar(response.data.message, { variant: 'error' });
        dispatch(getThirdPartyError(response.data.message));
      } else {
        dispatch(
          getThirdPartySuccess({ thirdParty: response.data.thirdParty })
        );
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getThirdPartyError(e.response.data.message));
    }
  }

  // TODO: Move this to users
  async function resetThirdPartyPasswordById(id) {
    try {
      dispatch(resetThirdPartyPassword());
      const response = await thirdPartyClient.resetPassword({ id: id });
      if (response.status >= 400) {
        enqueueSnackbar(response.data.message, { variant: 'error' });
        dispatch(resetThirdPartyPasswordError(response.data.message));
      } else {
        enqueueSnackbar(THIRDPARTY_PASSWORD_RESET_SUCCESSFUl, {
          variant: 'success',
        });
        dispatch(resetThirdPartyPasswordSuccess(response.data.credentials));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(resetThirdPartyPasswordError(e.response.data.message));
    }
  }

  async function resetModalCheck() {
    dispatch(closeThirdPartyModal());
  }

  return (
    <ThirdPartyContext.Provider
      value={{
        state,
        getThirdPartyList: getList,
        addThirdParty: add,
        getThirdParty: get,
        resetThirdPartyPasswordById: (id) => resetThirdPartyPasswordById(id),
        closeThirdPartyModal: resetModalCheck,
      }}
    >
      {children}
    </ThirdPartyContext.Provider>
  );
}

function useThirdParty() {
  const context = React.useContext(ThirdPartyContext);
  if (context === undefined) {
    throw new Error('useThirdParty must be used within a ThirdPartyProvider');
  }
  return context;
}

export { ThirdPartyContext, ThirdPartyProvider, useThirdParty };
