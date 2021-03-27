import React, { useReducer } from 'react';
import actionCreator from 'utils/actionCreator';
import { filter } from 'lodash';
import * as notificationClient from 'services/notificationClient';

const NotificationContext = React.createContext();

const GET_NOTIFICATION_LIST = 'get_notification_list';
const GET_NOTIFICATION_LIST_ERROR = 'get_notification_error_list';
const GET_NOTIFICATION_LIST_SUCCESS = 'get_notification_success_list';

const UPDATE_NOTIFICATION = 'update_notification';
const UPDATE_NOTIFICATION_ERROR = 'update_notification_list';
const UPDATE_NOTIFICATION_SUCCESS = 'update_notification_list';

const getNotificationListAction = actionCreator(GET_NOTIFICATION_LIST);
const getNotificationListErrorAction = actionCreator(
  GET_NOTIFICATION_LIST_ERROR
);
const getNotificationListSuccessAction = actionCreator(
  GET_NOTIFICATION_LIST_SUCCESS
);

const updateNotificationAction = actionCreator(UPDATE_NOTIFICATION);
const updateNotificationErrorAction = actionCreator(UPDATE_NOTIFICATION_ERROR);
const updateNotificationSuccessAction = actionCreator(
  UPDATE_NOTIFICATION_SUCCESS
);

const initialState = {
  unseenCount: 0,
  notifications: [],
  loading: false,
  error: null,
};

function notificationReducer(state, action) {
  let unseenCount = 0;
  const { notifications } = state;
  switch (action.type) {
    case GET_NOTIFICATION_LIST:
    case UPDATE_NOTIFICATION:
      return { ...state, error: null, loading: true };
    case GET_NOTIFICATION_LIST_SUCCESS:
      unseenCount = filter(action.payload, (o) => o.seen === false).length;
      return {
        ...state,
        unseenCount,
        notifications: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_NOTIFICATION_SUCCESS:
      const updatedNotifications = notifications.map((notification) =>
        notification._id === action.payload._id ? action.payload : notification
      );
      unseenCount = filter(updatedNotifications, (o) => o.seen === false)
        .length;

      return {
        ...state,
        unseenCount,
        notifications: updatedNotifications,
        error: null,
        loading: false,
      };
    case GET_NOTIFICATION_LIST_ERROR:
    case UPDATE_NOTIFICATION_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  async function getNotificationList() {
    try {
      dispatch(getNotificationListAction());
      const { status, data } = await notificationClient.getAll();
      if (status >= 400) {
        dispatch(getNotificationListErrorAction(data.message));
      } else {
        dispatch(getNotificationListSuccessAction(data.notifications));
      }
    } catch (e) {
      dispatch(getNotificationListErrorAction('Error creating Notification'));
    }
  }

  async function updateNotification(id) {
    try {
      dispatch(updateNotificationAction());
      const { status, data } = await notificationClient.updateNotification(id);
      if (status >= 400) {
        dispatch(updateNotificationErrorAction(data.message));
      } else {
        dispatch(updateNotificationSuccessAction(data.notification));
      }
    } catch (e) {
      dispatch(updateNotificationErrorAction('Error updating Notification'));
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        state,
        getNotificationList,
        updateNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification() {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
}

export { useNotification, NotificationProvider, NotificationContext };
