import React from 'react';
import NotificationCard from 'components/common/NotificationCard';
import Styled from 'styled-components';
import { Card } from '@material-ui/core';

const StyledList = Styled(Card)`
  padding: 10px;
  margin-Bottom: 20px;
  cursor: pointer;
`;

function NotificationList({ notificationList, updateNotification }) {
  const onClick = (n) => async () => {
    await updateNotification(n._id);
  };
  return (
    <>
      {notificationList.map((element) => (
        <StyledList onClick={onClick(element)}>
          <NotificationCard notificationDetails={element} />
        </StyledList>
      ))}
    </>
  );
}

export default NotificationList;
