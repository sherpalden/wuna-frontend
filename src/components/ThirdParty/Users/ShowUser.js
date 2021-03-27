import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useUsers } from 'hooks/useUser/usersContext';
import UserForm from 'components/common/User/UserForm';
import ContentHeader from '../../common/ContentHeader';

function transformUserForm({
  email,
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  address: { addressLine1, addressLine2, suburb, state, postal } = {},
}) {
  return {
    email,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    addressLine1,
    addressLine2,
    suburb,
    state,
    postal,
  };
}

function ShowUser() {
  const {
    state: { loading, user },
  } = useUsers();

  const history = useHistory();
  const defaultValues = useMemo(() => {
    return transformUserForm(user || {});
  }, [user]);

  const handleSubmit = (params) => {
    // TODO: Change user?
    console.log(params);
    // const user = {
    //   email: params.email,
    //   firstName: params.firstName,
    //   middleName: params.middleName,
    //   lastName: params.lastName,
    //   dateOfBirth: params.dateOfBirth,
    //   address: {
    //     addressLine1: params.addressLine1,
    //     addressLine2: params.addressLine2,
    //     suburb: params.suburb,
    //     state: params.state,
    //     postal: params.postal,
    //   },
    //   startDate: params.startDate,
    //   endDate: params.endDate,
    //   jobTitle: params.jobTitle,
    //   currentWorkPlace: params.currentWorkPlace,
    // };
    // addUser(user);
  };

  const handleBack = () => {
    history.push('/');
  };

  const handleCancel = () => {
    history.push('/users');
  };

  return (
    <>
      <ContentHeader heading="User" handleBack={handleBack} />
      {user && (
        <UserForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          submitButtonLabel="Save changes"
          defaultValues={defaultValues}
          organizationUser={false}
          loading={loading}
        />
      )}
    </>
  );
}

export default ShowUser;
