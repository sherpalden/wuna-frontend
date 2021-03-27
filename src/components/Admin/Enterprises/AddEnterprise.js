import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useEnterprise } from 'hooks/useEnterprise/enterpriseContext';
import OrganizationForm from '../common/OrganizationForm';
import ContentHeader from '../../common/ContentHeader';

const AddEnterprise = () => {
  const {
    state: {
      loading,
      addEnterprise: { error },
    },
    addEnterprise,
    cleanAddEnterprise,
  } = useEnterprise();

  const history = useHistory();
  useEffect(() => {
    return cleanAddEnterprise;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (enterprise) => await addEnterprise(enterprise);
  const handleCancel = () => history.push('/enterprises');

  return (
    <>
      <ContentHeader heading="Enterprises" handleBack={handleCancel} />
      <OrganizationForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        loading={loading}
        submitButtonLabel="Create"
        error={error}
      />
    </>
  );
};

export default AddEnterprise;
