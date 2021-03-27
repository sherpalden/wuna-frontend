import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import EmailPasswordModal from 'components/common/EmailPasswordModal';
import { useUsers } from 'hooks/useUser/usersContext';
import UserForm from 'components/common/User/UserForm';
import ContentHeader from '../../common/ContentHeader';
import Roles from '../../../utils/role';

function AddUserForm() {
  const {
    state: { loading, user, error, redirectTo },
    createUser,
    toggleModalClose,
  } = useUsers();

  const history = useHistory();
  const { id: enterpriseId } = useParams();

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
      role: Roles.ENTERPRISE_USER,
      enterpriseId,
    };
    createUser(user);
  };

  const handleModelClose = () => {
    toggleModalClose();
    history.push('/');
  };

  const handleBack = () => {
    history.push(`/enterprises/${enterpriseId}/view`);
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
      <ContentHeader heading="Add Enterprise user" handleBack={handleBack} />
      <UserForm
        handleSubmit={handleSubmit}
        error={error}
        organizationUser={true}
        handleCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}

export default AddUserForm;
