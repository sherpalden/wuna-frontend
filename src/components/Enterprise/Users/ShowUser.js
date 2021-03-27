import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useUsers } from 'hooks/useUser/usersContext';
import UserForm from 'components/common/User/UserForm';
import ContentHeader from '../../common/ContentHeader';
import formatDate from '../../../utils/formatDate';
import WorkHistory from 'components/common/WorkHistory';
import { getExperience } from 'services/experienceClient';
import { AppBar, Box, Grid, Tab, Tabs, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

function transformUserForm({
  email,
  name: { firstName, middleName, lastName } = {},
  dateOfBirth,
  address: { addressLine1, addressLine2, suburb, state, postal } = {},
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
  const {
    state: { loading, user },
    getUser,
  } = useUsers();
  const { id: userId } = useParams();
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const [workHistories, setWorkHistories] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    getUser(userId);
    // eslint-disable-next-line
  }, [userId]);

  const values = useMemo(() => {
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <ContentHeader heading="User" handleBack={handleBack} />

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
      </Grid>
    </Grid>
  );
}

export default ShowUser;
