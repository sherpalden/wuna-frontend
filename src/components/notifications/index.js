import React from 'react';
import { Typography } from '@material-ui/core';
import NotificationList from './NotificationList';
import { useNotification } from 'hooks/useNotification/useNotification';

function Notification() {
  const {
    state: { notifications },
    updateNotification,
  } = useNotification();

  return (
    <div>
      <Typography variant="h4">Notifications</Typography>
      <br />
      <NotificationList
        updateNotification={updateNotification}
        notificationList={notifications}
      />
    </div>
  );
}

export default Notification;
