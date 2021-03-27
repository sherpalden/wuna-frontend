import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import EmailPasswordModal from 'components/common/EmailPasswordModal';
import { useUsers } from 'hooks/useUser/usersContext';
import ContentHeader from '../../common/ContentHeader';
import AssociateUserForm from './AssociateUserForm';

// TODO: END USER
function AddUser() {
  const {
    state: { user, redirectTo },
    createUser,
    toggleModalClose,
  } = useUsers();
  const history = useHistory();
  const { id: thirdPartyId } = useParams();

  const handleModelClose = () => {
    toggleModalClose();
    history.push('/');
  };

  const handleBack = () => {
    history.push(`/third-parties/${thirdPartyId}/view`);
  };

  return (
    <div>
      {redirectTo && (
        <EmailPasswordModal
          open={redirectTo}
          handleClose={handleModelClose}
          email={user.email}
          password={user.password}
        />
      )}
      <ContentHeader heading="Add user" handleBack={handleBack} />
      <AssociateUserForm createUser={createUser} />
    </div>
  );
}

export default AddUser;
