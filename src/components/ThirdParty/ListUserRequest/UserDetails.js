import React, { useEffect, useState } from 'react';
import ContentHeader from 'components/common/ContentHeader';
import { useHistory, useParams } from 'react-router-dom';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import UserDetailsView from 'components/common/User';
import { getUserDetailsById } from 'services/usersClient';
import { useSnackbar } from 'notistack';
import { getUser } from 'services/usersClient';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 20,
    marginBottom: 20,
  },
  label: {
    color: theme.palette.grey['light'],
  },
  heading: {
    color: theme.palette.grey['500'],
    paddingBottom: '0px !important',
  },
}));

function UserDetails() {
  const history = useHistory();
  const { id: userId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await getUser(userId);
        if (response.status === 200 && active) {
          setUser(response.data.user);
        }
      } catch (e) {
        enqueueSnackbar('Error while fetching user details', {
          variant: 'error',
        });
      }
    })();
    return () => {
      active = false;
    };
  }, [userId, enqueueSnackbar]);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const response = await getUserDetailsById(userId);
        if (response.status === 200 && active) {
          setUserDetails(response.data.userDetails);
        }
      } catch (e) {
        enqueueSnackbar('Error while fetching user details', {
          variant: 'error',
        });
      }
    })();
    return () => {
      active = false;
    };
  }, [userId, enqueueSnackbar]);

  const handleback = () => {
    history.push('/request-from-users');
  };
  return (
    <>
      <ContentHeader heading="User Details" handleBack={handleback} />
      <Paper elevation={0}>
        <Grid container spacing={2} className={classes.card}>
          <Grid item xs={12} lg={12}>
            <Typography
              variant="h6"
              color="secondary"
              className={classes.heading}
            >
              Personal
            </Typography>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                First Name
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.name?.firstName || 'N/A'}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                Middle Name
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.name?.middleName || 'N/A'}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                Last Name
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.name?.lastName || 'N/A'}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                Date Of Birth
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.dateOfBirth || 'N/A'}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                Email
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.email || 'N/A'}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                Address Line 1
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.address?.addressLine1 || 'N/A'}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                State
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.address?.state}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                Postal
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.address?.postal}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={4} lg={4}>
            <Grid item xs={12} lg={12}>
              <Typography variant="caption" className={classes.label}>
                Suburb
              </Typography>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography>{user?.address?.suburb}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <UserDetailsView userDetails={userDetails} />
      </Paper>
    </>
  );
}

export default UserDetails;
