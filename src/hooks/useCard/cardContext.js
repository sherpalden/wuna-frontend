import React, { useReducer } from 'react';
import { filter, uniqBy } from 'lodash';
import actionCreator from 'utils/actionCreator';
import * as cardClient from 'services/cardClient';
import { useSnackbar } from 'notistack';

const CardContext = React.createContext();

const CARD_UPDATED = 'Card Updated';
const CARD_CREATED = 'Card Created';

const SERVER_ERROR = 'Server Error';

const GET_ALL_CARDS = 'GET_ALL_CARDS';
const GET_ALL_CARDS_SUCCESS = 'GET_ALL_CARDS_SUCCESS';
const GET_ALL_CARDS_ERROR = 'GET_ALL_CARDS_ERROR';

const getAllCardsAction = actionCreator(GET_ALL_CARDS);
const getAllCardsSuccessAction = actionCreator(GET_ALL_CARDS_SUCCESS);
const getAllCardsErrorAction = actionCreator(GET_ALL_CARDS_ERROR);

const CREATE_CARD = 'CREATE_CARD';
const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS';
const CREATE_CARD_ERROR = 'CREATE_CARD_ERROR';

const createCardAction = actionCreator(CREATE_CARD);
const createCardSuccessAction = actionCreator(CREATE_CARD_SUCCESS);
const createCardErrorAction = actionCreator(CREATE_CARD_ERROR);

const UPDATE_CARD = 'UPDATE_CARD';
const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS';
const UPDATE_CARD_ERROR = 'UPDATE_CARD_ERROR';

const updateCardAction = actionCreator(UPDATE_CARD);
const updateCardSuccessAction = actionCreator(UPDATE_CARD_SUCCESS);
const updateCardErrorAction = actionCreator(UPDATE_CARD_ERROR);

const GET_CARD_DETAILS = 'GET_CARD_DETAILS';
const GET_CARD_DETAILS_SUCCESS = 'GET_CARD_DETAILS_SUCCESS';
const GET_CARD_DETAILS_ERROR = 'GET_CARD_DETAILS_ERROR';

const getCardDetailsAction = actionCreator(GET_CARD_DETAILS);
const getCardDetailsSuccessAction = actionCreator(GET_CARD_DETAILS_SUCCESS);
const getCardDetailsErrorAction = actionCreator(GET_CARD_DETAILS_ERROR);

const SET_CARD = 'SET_CARD';
const setCardAction = actionCreator(SET_CARD);

const GET_MY_CARD = 'GET_MY_CARD';
const GET_MY_CARD_SUCCESS = 'GET_MY_CARD_SUCCESS';
const GET_MY_CARD_ERROR = 'GET_MY_CARD_ERROR';

const getMyCardAction = actionCreator(GET_MY_CARD);
const getMyCardSuccessAction = actionCreator(GET_MY_CARD_SUCCESS);
const getMyCardErrorAction = actionCreator(GET_MY_CARD_ERROR);

const initialState = {
  loading: false,
  error: null,
  card: null,
  cards: [],
};

function cardReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_CARDS:
    case CREATE_CARD:
    case UPDATE_CARD:
    case GET_MY_CARD:
      return { ...state, loading: true, error: null };
    case GET_ALL_CARDS_SUCCESS:
      return { ...state, cards: payload, loading: false };
    case CREATE_CARD_SUCCESS:
    case GET_CARD_DETAILS_SUCCESS:
    case GET_MY_CARD_SUCCESS:
    case UPDATE_CARD_SUCCESS:
      return {
        ...state,
        card: payload,
        cards: uniqBy([...state?.cards, payload], 'id'),
        loading: false,
      };
    case SET_CARD:
      return {
        ...state,
        card: payload,
        loading: false,
      };
    case GET_ALL_CARDS_ERROR:
    case CREATE_CARD_ERROR:
    case UPDATE_CARD_ERROR:
    case GET_MY_CARD_ERROR:
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
}

function CardProvider({ children }) {
  const [state, dispatch] = useReducer(cardReducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  async function getAllCards() {
    try {
      dispatch(getAllCardsAction());
      const {
        status,
        data: { message, data },
      } = await cardClient.getAllCards();
      if (status >= 400) {
        enqueueSnackbar(message, { variant: 'error' });
        dispatch(getAllCardsErrorAction(message));
      } else {
        dispatch(getAllCardsSuccessAction(data));
      }
    } catch (error) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getAllCardsErrorAction(error.message));
    }
  }

  async function createCard() {
    try {
      dispatch(createCardAction());
      const {
        status,
        data: { message, card },
      } = await cardClient.addCard();
      if (status >= 400) {
        enqueueSnackbar(message, { variant: 'error' });
        dispatch(createCardErrorAction(message));
      } else {
        enqueueSnackbar(CARD_CREATED, { variant: 'success' });
        dispatch(createCardSuccessAction(card));
      }
    } catch (error) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(createCardErrorAction(error.message));
    }
  }

  async function updateCard(id, data) {
    try {
      dispatch(updateCardAction());
      const {
        status,
        data: { message, card },
      } = await cardClient.updateCard(id, data);
      if (status >= 400) {
        enqueueSnackbar(message, { variant: 'error' });
        dispatch(updateCardErrorAction(message));
      } else {
        enqueueSnackbar(CARD_UPDATED, { variant: 'success' });
        dispatch(updateCardSuccessAction(card));
      }
    } catch (error) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(updateCardErrorAction(error.message));
    }
  }

  async function getCardDetail(id) {
    try {
      dispatch(getCardDetailsAction());
      const cardDetails = filter(state.cards, { id });
      if (cardDetails.length > 0) {
        dispatch(setCardAction(cardDetails[0]));
      } else {
        const {
          status,
          data: { message, card },
        } = await cardClient.getCard(id);
        if (status >= 400) {
          enqueueSnackbar(message, { variant: 'error' });
          dispatch(getCardDetailsErrorAction(message));
        } else {
          dispatch(getCardDetailsSuccessAction(card));
        }
      }
    } catch (error) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getCardDetailsErrorAction(error.message));
    }
  }

  async function getMyCard() {
    try {
      dispatch(getMyCardAction());
      const {
        status,
        data: { message, card },
      } = await cardClient.getMyCard();
      if (status > 400) {
        enqueueSnackbar(message, { variant: 'error' });
        dispatch(getMyCardErrorAction(message));
      } else {
        dispatch(getMyCardSuccessAction(card));
      }
    } catch (error) {
      enqueueSnackbar(SERVER_ERROR, { variant: 'error' });
      dispatch(getMyCardErrorAction(error.message));
    }
  }
  return (
    <CardContext.Provider
      value={{
        state,
        getAllCards,
        createCard,
        updateCard,
        getCardDetail,
        getMyCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

function useCard() {
  const context = React.useContext(CardContext);
  if (context === undefined) {
    throw new Error(
      'useUsersDetails must be used within a UserDetailsProvider'
    );
  }
  return context;
}

export { CardContext, useCard, CardProvider };
