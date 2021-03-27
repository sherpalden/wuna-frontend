import React, { useReducer } from 'react';
import { useSnackbar } from 'notistack';
import actionCreator from 'utils/actionCreator';
import * as experienceClient from 'services/experienceClient';

const ExperienceContext = React.createContext();

const GET_MY_EXPERIENCE = 'GET_MY_EXPERIENCE';
const GET_MY_EXPERIENCE_SUCCESS = 'GET_MY_EXPERIENCE_SUCCESS';
const GET_MY_EXPERIENCE_ERROR = 'GET_MY_EXPERIENCE_ERROR';

const getMyExperienceAction = actionCreator(GET_MY_EXPERIENCE);
const getMyExperienceSuccessAction = actionCreator(GET_MY_EXPERIENCE_SUCCESS);
const getMyExperienceErrorAction = actionCreator(GET_MY_EXPERIENCE_ERROR);

const GET_EXPERIENCE = 'GET_EXPERIENCE';
const GET_EXPERIENCE_SUCCESS = 'GET_EXPERIENCE_SUCCESS';
const GET_EXPERIENCE_ERROR = 'GET_EXPERIENCE_ERROR';

const getExperienceAction = actionCreator(GET_EXPERIENCE);
const getExperienceSuccessAction = actionCreator(GET_EXPERIENCE_SUCCESS);
const getExperienceErrorAction = actionCreator(GET_EXPERIENCE_ERROR);

const CREATE_EXPERIENCE = 'CREATE_EXPERIENCE';
const CREATE_EXPERIENCE_SUCCESS = 'CREATE_EXPERIENCE_SUCCESS';
const CREATE_EXPERIENCE_ERROR = 'CREATE_EXPERIENCE_ERROR';

const createExperienceAction = actionCreator(CREATE_EXPERIENCE);
const createExperienceSuccessAction = actionCreator(CREATE_EXPERIENCE_SUCCESS);
const createExperienceErrorAction = actionCreator(CREATE_EXPERIENCE_ERROR);

const EXPERIENCE_CREATED = 'Experience Created';

const SERVER_ERROR = 'Server Error';

const initialState = {
  myExperience: null,
  experiences: {},
  loading: false,
  error: null,
};

function experienceReducer(state, action) {
  switch (action.type) {
    case GET_MY_EXPERIENCE:
    case CREATE_EXPERIENCE:
    case GET_EXPERIENCE:
      return { ...state, loading: true, error: null };
    case CREATE_EXPERIENCE_SUCCESS:
      const { experiences: oldExperience } = state;
      const { id, payload } = action;
      return {
        experiences: { ...oldExperience, [id]: payload },
        loading: false,
        error: null,
      };
    case GET_MY_EXPERIENCE_ERROR:
    case CREATE_EXPERIENCE_ERROR:
    case GET_EXPERIENCE_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

function ExperienceProvider({ children }) {
  const [state, dispatch] = useReducer(experienceReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();
  async function getMyExperience() {
    try {
      dispatch(getMyExperienceAction());
      const {
        status,
        data: { data },
      } = await experienceClient.getMyExperiences();
      if (status >= 400) {
        enqueueSnackbar(data.message, { variant: 'error' });
        dispatch(getMyExperienceErrorAction(data.message));
      } else {
        dispatch(getMyExperienceSuccessAction(data));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getMyExperienceErrorAction('Error getting enterprise'));
    }
  }

  async function createExperience(params) {
    try {
      dispatch(createExperienceAction());
      const { status, data } = await experienceClient.createExperience(params);
      if (status >= 400) {
        dispatch(createExperienceErrorAction(data.message));
        enqueueSnackbar(data.message, {
          variant: 'error',
        });
      } else {
        dispatch(createExperienceSuccessAction(data));
        enqueueSnackbar(EXPERIENCE_CREATED, {
          variant: 'success',
        });
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(createExperienceErrorAction('Error while creating enterprise'));
    }
  }

  async function getExperience(userId) {
    try {
      dispatch(getExperienceAction());
      const {
        status,
        data: { data },
      } = await experienceClient.getExperience(userId);
      if (status >= 400) {
        enqueueSnackbar(data.message, { variant: 'error' });
        dispatch(getExperienceErrorAction(data.message));
      } else {
        dispatch(getExperienceSuccessAction(data));
      }
    } catch (e) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getExperienceErrorAction('Error while creating enterprise'));
    }
  }

  return (
    <ExperienceContext.Provider
      value={{
        state,
        getMyExperience,
        createExperience,
        getExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
}

function useExperience() {
  const context = React.useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error('useThirdParty must be used within a ThirdPartyProvider');
  }
  return context;
}

export { ExperienceContext, ExperienceProvider, useExperience };
