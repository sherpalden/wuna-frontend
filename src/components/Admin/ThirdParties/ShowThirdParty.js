import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Fab } from '@material-ui/core';
import { useThirdParty } from 'hooks/useThirdParty/thirdPartyContext';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import OrganizationForm from '../common/OrganizationForm';
import StyledLink from '../../common/StyledLink';
import ContentHeader from '../../common/ContentHeader';
import { StyledButton } from 'components/common/Button';

import ListThirdPartyUser from './ListThirdPartyUser';

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

function ShowThirdParty() {
  const {
    state: { loading, error, thirdParty },
    getThirdParty,
  } = useThirdParty();

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getThirdParty(id);
    // eslint-disable-next-line
  }, [id]);

  const defaultValues = useMemo(() => {
    return convertToFormData(thirdParty || {});
  }, [thirdParty]);

  const handleSubmit = (params) => {
    // TODO: Save enterprise details
    console.log(params);
    // const enterprise = {
    //   name: params.name,
    //   email: params.email,
    //   phone: params.enterprisePhone,
    //   contactPerson: {
    //     firstName: params.firstName,
    //     middleName: params.middleName,
    //     lastName: params.lastName,
    //     phone: params.phone,
    //     jobTitle: params.jobTitle
    //   },
    //   address: {
    //     addressLine1: params.addressLine1,
    //     addressLine2: params.addressLine2,
    //     suburb: params.suburb,
    //     state: params.state,
    //     postal: params.postal
    //   }
    // };

    // addEnterprise(enterprise);
  };

  const handleCancel = () => {
    history.push('/third-parties');
  };

  return (
    <div>
      <ContentHeader heading="Third party" handleBack={handleCancel}>
        <StyledLink to={`/third-parties/${id}/add-user`}>
          <Fab color="primary" aria-label="add" variant="extended">
            <StyledButton submitBtn>
              <AddRoundedIcon />
              Add ThirdParty user
            </StyledButton>
          </Fab>
        </StyledLink>
      </ContentHeader>
      {thirdParty && (
        <OrganizationForm
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          error={error}
          loading={loading}
          submitButtonLabel="Save changes"
          defaultValues={defaultValues}
        />
      )}
      <ListThirdPartyUser thirdPartyID={id} />
    </div>
  );
}

export default ShowThirdParty;
