import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { useEnterprise } from 'hooks/useEnterprise/enterpriseContext';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import OrganizationForm from '../common/OrganizationForm';
import StyledLink from '../../common/StyledLink';
import ContentHeader from '../../common/ContentHeader';
import { StyledButton } from 'components/common/Button';

//palden
import ListEnterpriseUser from './ListEnterpriseUser';

function convertToFormData({
  name,
  email,
  phone: organizationPhone,
  contactPerson: { firstName, middleName, lastName, phone, jobTitle } = {},
  address: { addressLine1, addressLine2, suburb, state, postal } = {},
} = {}) {
  return {
    name,
    email,
    organizationPhone,
    firstName,
    middleName,
    lastName,
    phone,
    jobTitle,
    addressLine1,
    addressLine2,
    suburb,
    state,
    postal,
  };
}

function ShowEnterprise() {
  const {
    state: { loading, error, enterprise },
    getEnterprise,
  } = useEnterprise();

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getEnterprise(id);
    // eslint-disable-next-line
  }, [id]);

  const defaultValues = useMemo(() => {
    return convertToFormData(enterprise || {});
  }, [enterprise]);

  const handleSubmit = (params) => {
    // TODO: Save enterprise details
    console.log(params);
  };

  const handleCancel = () => history.push('/enterprises');

  return (
    <div>
      <ContentHeader heading="Enterprise" handleBack={handleCancel}>
        <StyledLink to={`/enterprises/${id}/add-user`}>
          <Fab color="primary" aria-label="add" variant="extended">
            <StyledButton submitBtn>
              <AddRoundedIcon />
              Add enterprise user
            </StyledButton>
          </Fab>
        </StyledLink>
      </ContentHeader>
      {enterprise && (
        <OrganizationForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          error={error}
          loading={loading}
          submitButtonLabel="Save changes"
          defaultValues={defaultValues}
        />
      )}
      <ListEnterpriseUser enterpriseID={id} />
    </div>
  );
}

export default ShowEnterprise;
