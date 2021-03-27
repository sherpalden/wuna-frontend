import React from 'react';
import { useHistory } from 'react-router-dom';
import { useThirdParty } from 'hooks/useThirdParty/thirdPartyContext';
import OrganizationForm from '../common/OrganizationForm';
import ContentHeader from '../../common/ContentHeader';

const AddThirdParty = () => {
  const {
    state: { loading, error },
    addThirdParty,
  } = useThirdParty();
  const history = useHistory();

  const handleSubmit = async (enterprise) => await addThirdParty(enterprise);
  const handleCancel = () => history.push('/third-parties');

  return (
    <>
      <ContentHeader heading="Third Party" handleBack={handleCancel} />
      <OrganizationForm
        enterprise={false}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        loading={loading}
        submitButtonLabel="Create"
        error={error}
      />
    </>
  );
};

export default AddThirdParty;
