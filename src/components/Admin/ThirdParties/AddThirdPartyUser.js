import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import EmailPasswordModal from 'components/common/EmailPasswordModal';
import { useUsers } from 'hooks/useUser/usersContext';
import UserForm from 'components/common/User/UserForm';
import ContentHeader from '../../common/ContentHeader';
import Roles from 'utils/role';

function AddUserForm() {
  const {
    state: { loading, user, redirectTo, error },
    createUser,
    toggleModalClose,
  } = useUsers();

  const history = useHistory();
  const { id: thirdPartyId } = useParams();

  const handleCancel = () => {
    history.push('/');
  };

  const handleSubmit = (params) => {
    const user = {
      email: params.email,
      name: {
        firstName: params.firstName,
        middleName: params.middleName,
        lastName: params.lastName,
      },
      dateOfBirth: params.dateOfBirth,
      address: {
        addressLine1: params.addressLine1,
        addressLine2: params.addressLine2,
        suburb: params.suburb,
        state: params.state,
        postal: params.postal,
      },
      role: Roles.THIRD_PARTY,
      thirdPartyId,
    };
    createUser(user);
  };

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
      <ContentHeader heading="Add Third Party user" handleBack={handleBack} />
      <UserForm
        handleSubmit={handleSubmit}
        defaultValues={{}}
        organizationUser={true}
        error={error}
        handleCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}

export default AddUserForm;
