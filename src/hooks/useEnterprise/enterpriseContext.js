import React, { useReducer, useEffect } from 'react';
import actionCreator from 'utils/actionCreator';
import * as enterpriseClient from 'services/enterpriseClient';
import { useSnackbar } from 'notistack';

const EnterpriseContext = React.createContext();

const GET_ENTERPRISE_LIST = 'get_enterprise_list';
const GET_ENTERPRISE_LIST_SUCCESS = 'get_enterprise_list_success';
const GET_ENTERPRISE_LIST_ERROR = 'get_enterprise_list_error';

const ADD_ENTERPRISE = 'add_enterprise';
const ADD_ENTERPRISE_SUCCESS = 'add_enterprise_success';
const ADD_ENTERPRISE_ERROR = 'add_enterprise_error';
const ADD_ENTERPRISE_CLEAN = 'add_enterprise_clean';

const GET_ENTERPRISE = 'get_enterprise';
const GET_ENTERPRISE_SUCCESS = 'get_enterprise_success';
const GET_ENTERPRISE_ERROR = 'get_enterprise_error';

const RESET_ENTERPRISE_PASSWORD = 'reset_enterprise_password';
const RESET_ENTERPRISE_PASSWORD_SUCCESS = 'reset_enterprise_password_success';
const RESET_ENTERPRISE_PASSWORD_ERROR = 'reset_enterprise_password_error';

const CLOSE_ENTERPRISE_MODAL = 'close_enterprise_modal';

const getEnterpriseList = actionCreator(GET_ENTERPRISE_LIST);
const getEnterpriseListSuccess = actionCreator(GET_ENTERPRISE_LIST_SUCCESS);
const getEnterpriseListError = actionCreator(GET_ENTERPRISE_LIST_ERROR);

const addEnterprise = actionCreator(ADD_ENTERPRISE);
const addEnterpriseSuccess = actionCreator(ADD_ENTERPRISE_SUCCESS);
const addEnterpriseError = actionCreator(ADD_ENTERPRISE_ERROR);
const addEnterpriseClean = actionCreator(ADD_ENTERPRISE_CLEAN);

const getEnterprise = actionCreator(GET_ENTERPRISE);
const getEnterpriseSuccess = actionCreator(GET_ENTERPRISE_SUCCESS);
const getEnterpriseError = actionCreator(GET_ENTERPRISE_ERROR);

const resetEnterprisePassword = actionCreator(RESET_ENTERPRISE_PASSWORD);
const resetEnterprisePasswordSuccess = actionCreator(
  RESET_ENTERPRISE_PASSWORD_SUCCESS
);
const resetEnterprisePasswordError = actionCreator(
  RESET_ENTERPRISE_PASSWORD_ERROR
);

const SERVER_ERROR = 'Server Error';

const ENTERPRISE_PASSWORD_RESET_SUCCESSFUL =
  'Enterprise Password Reset Successful';
const ENTERPRISE_ADDED = 'Enterprise Added';

const closeEnterpriseModal = actionCreator(CLOSE_ENTERPRISE_MODAL);

const initialState = {
  enterpriseList: [],
  enterprise: null,
  loading: false,
  addEnterprise: {
    error: null,
    success: null,
  },
};

function enterpriseReducer(state, action) {
  switch (action.type) {
    case GET_ENTERPRISE_LIST:
      return { ...state, error: null, loading: true };
    case GET_ENTERPRISE_LIST_SUCCESS:
      return {
        ...state,
        enterpriseList: action.payload,
        error: null,
        loading: false,
      };
    case GET_ENTERPRISE_LIST_ERROR:
      return {
        ...state,
        enterpriseList: [],
        error: action.payload,
        loading: false,
      };
    case ADD_ENTERPRISE:
      return {
        ...state,
        loading: true,
        addEnterprise: {
          error: null,
        },
      };
    case ADD_ENTERPRISE_SUCCESS:
      return {
        ...state,
        enterprise: action.payload.enterprise,
        loading: false,
        addEnterprise: {
          error: null,
        },
      };
    case ADD_ENTERPRISE_ERROR:
      return {
        ...state,
        enterprise: null,
        loading: false,
        addEnterprise: {
          error: action.payload,
        },
      };
    case ADD_ENTERPRISE_CLEAN:
      return {
        ...state,
        enterprise: null,
        loading: false,
        addEnterprise: {
          error: null,
        },
      };
    case GET_ENTERPRISE:
      return { ...state, enterprise: null, loading: true, error: null };
    case GET_ENTERPRISE_SUCCESS:
      return {
        ...state,
        enterprise: action.payload.enterprise,
        loading: false,
        error: null,
        success: true,
      };
    // TODO: Remove from here and move to user
    case GET_ENTERPRISE_ERROR:
      return { ...state, enterprise: null, loading: false, error: null };
    case RESET_ENTERPRISE_PASSWORD:
      return { ...state, enterprise: null, loading: true };
    case RESET_ENTERPRISE_PASSWORD_SUCCESS:
      return { ...state, enterprise: action.payload, loading: false };
    case RESET_ENTERPRISE_PASSWORD_ERROR:
      return { ...state, enterprise: false, loading: false };
    case CLOSE_ENTERPRISE_MODAL:
      return { ...state, redirectTo: false, loading: false };
    default:
      throw new Error();
  }
}

function EnterpriseProvider({ children }) {
  const [state, dispatch] = useReducer(enterpriseReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getList() {
    try {
      dispatch(getEnterpriseList());
      const {
        status,
        data: { data },
      } = await enterpriseClient.getAll();
      if (status >= 400) {
        enqueueSnackbar(data.message, { variant: 'error' });
        dispatch(getEnterpriseListError(data.message));
      } else {
        dispatch(getEnterpriseListSuccess(data));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getEnterpriseListError('Error creating Enterprise'));
    }
  }

  async function add(params) {
    try {
      dispatch(addEnterprise());
      const response = await enterpriseClient.add(params);
      if (response.status >= 400) {
        dispatch(
          addEnterpriseError(
            response?.data?.message || 'error while adding enterprise '
          )
        );
      } else {
        const { enterprise } = response.data;
        enqueueSnackbar(ENTERPRISE_ADDED, { variant: 'success' });
        dispatch(addEnterpriseSuccess({ enterprise }));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(addEnterpriseError(e.response.data.message));
    }
  }

  async function get(id) {
    try {
      dispatch(getEnterprise());
      const response = await enterpriseClient.show(id);

      if (response.status >= 400) {
        enqueueSnackbar(response.data.message, { variant: 'error' });
        dispatch(getEnterpriseError(response.data.message));
      } else {
        dispatch(
          getEnterpriseSuccess({ enterprise: response.data.enterprise })
        );
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getEnterpriseError(e.response.data.message));
    }
  }

  async function getEnterpriseByEmail(id) {
    try {
      dispatch(getEnterprise());
      dispatch(getEnterpriseSuccess(id));
      /* const response = await enterpriseClient.show({ email: id });
       * if(response.status >= 400) {
       *   dispatch(getEnterpriseError(response.data.message));
       * } else {
       *   dispatch(getEnterpriseSuccess(response.data.enterprise));
       * } */
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getEnterpriseError(e.response.data.message));
    }
  }

  async function resetEnterprisePasswordById(id) {
    try {
      dispatch(resetEnterprisePassword());
      const response = await enterpriseClient.resetPassword({ id: id });
      if (response.status >= 400) {
        enqueueSnackbar(response.data.message, { variant: 'error' });
        dispatch(resetEnterprisePasswordError(response.data.message));
      } else {
        enqueueSnackbar(ENTERPRISE_PASSWORD_RESET_SUCCESSFUL, {
          variant: 'success',
        });
        dispatch(resetEnterprisePasswordSuccess(response.data.credentials));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(resetEnterprisePasswordError(e.response.data.message));
    }
  }

  async function resetModalCheck() {
    dispatch(closeEnterpriseModal());
  }

  return (
    <EnterpriseContext.Provider
      value={{
        state,
        getEnterpriseList: getList,
        addEnterprise: add,
        cleanAddEnterprise: () => dispatch(addEnterpriseClean()),
        getEnterprise: get,
        getEnterpriseByEmail,
        // TODO: Remove from here
        resetEnterprisePasswordById: (id) => resetEnterprisePasswordById(id),
        closeEnterpriseModal: resetModalCheck,
      }}
    >
      {children}
    </EnterpriseContext.Provider>
  );
}

function useEnterprise() {
  const context = React.useContext(EnterpriseContext);
  if (context === undefined) {
    throw new Error('useEnterprise must be used within a EnterpriseProvider');
  }
  return context;
}

export { EnterpriseContext, EnterpriseProvider, useEnterprise };
