import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useUsers } from 'hooks/useUser/usersContext';
import UserForm from 'components/common/User/UserForm';
import styled from 'styled-components';
import ContentHeader from '../../common/ContentHeader';
import formatDate from '../../../utils/formatDate';
import { getExperience } from 'services/experienceClient';
import { AppBar, Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import WorkHistory from 'components/common/WorkHistory';
import { useSnackbar } from 'notistack';
import ResetEmailPasswordModal from 'components/common/Modal/ResetEmailandPassword';
import { StyledButton } from 'components/common/Button';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButtonWrapper = styled.div`
  padding: 20px;
`;

function transformUserForm({
  address: { addressLine1, addressLine2, suburb, state, postal } = {},
  dateOfBirth,
  email,
  name: { firstName, middleName, lastName } = {},
}) {
  return {
    email,
    firstName,
    middleName,
    lastName,
    dateOfBirth: formatDate(dateOfBirth),
    addressLine1,
    addressLine2,
    suburb,
    state,
    postal,
  };
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={2}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function ShowUser() {
  const [value, setValue] = useState(0);
  const [workHistories, setWorkHistories] = useState([]);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openResetModal, setOpenResetModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (_, newValue) => setValue(newValue);

  const {
    state: { loading, user },
    getUser,
  } = useUsers();

  const { id: userId } = useParams();
  const history = useHistory();
  const values = useMemo(() => {
    return transformUserForm(user || {});
  }, [user]);

  useEffect(() => {
    getUser(userId);
    // eslint-disable-next-line
  }, [userId]);

  const handleSubmit = (params) => {
    // TODO: Handle submit
    console.log(params);
  };

  const handleBack = () => {
    history.push('/users');
  };

  const handleCancel = () => {
    getUser(userId);
  };

  const handleConfirmationModal = () => setOpenConfirmationModal(false);

  const handleResetModal = () => setOpenResetModal(false);

  useEffect(() => {
    const getExperiences = async () => {
      try {
        const { data } = await getExperience(userId);
        setWorkHistories(data?.experiences || []);
      } catch (error) {
        enqueueSnackbar(error?.message || 'Error while fetching experience', {
          variant: 'error',
        });
      }
    };
    getExperiences();
  }, [enqueueSnackbar, userId]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} lg={12}>
        <StyledWrapper>
          <ContentHeader heading="User" handleBack={handleBack} />
          <StyledButtonWrapper>
            <Box pr={1} display="inline-flex">
              <StyledButton
                variant="contained"
                color="primary"
                submitBtn
                size="medium"
                title="Regenerate Password"
                onClick={() => setOpenConfirmationModal(true)}
              >
                <Typography variant="inherit">Regenerate Password</Typography>
              </StyledButton>
            </Box>
          </StyledButtonWrapper>
        </StyledWrapper>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Personal" {...a11yProps(0)} />
            <Tab label="Work History" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {user && (
            <UserForm
              show
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              submitButtonLabel="Save changes"
              organizationUser={false}
              values={values}
              loading={loading}
            />
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {workHistories.length > 0 ? (
            <>
              {workHistories.map((history, index) => (
                <Grid key={`${history.id}-${index}`} item xs={12} lg={12}>
                  <WorkHistory {...history} />
                </Grid>
              ))}
            </>
          ) : (
            <Grid item xs={12} lg={12}>
              <Typography>No Record Found</Typography>
            </Grid>
          )}
        </TabPanel>
        <ResetEmailPasswordModal
          openResetModal={openResetModal}
          handleResetClose={handleResetModal}
          handleResetOpen={setOpenResetModal}
          handleConfirmationClose={handleConfirmationModal}
          openConfirmationModal={openConfirmationModal}
        />
      </Grid>
    </Grid>
  );
}

export default ShowUser;
