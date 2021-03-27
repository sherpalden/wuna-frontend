import React, { useEffect, useState } from 'react';
import { useUserDetails } from 'hooks/useUser/userDetailsContext';
import {
  Box,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import AdditionalDetailsForm from './AdditionalDetailsForm';
import { useCard } from 'hooks/useCard/cardContext';
import { CardDetail } from 'components/Card/CardDetailView';
import { useSnackbar } from 'notistack';
import { getUserResume } from 'services/usersClient';
import useUser from 'hooks/useUser/userContext';
import downloadResponseFile from 'utils';
import { StyledButton } from 'components/common/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    marginBottom: 20,
  },
  warning: {
    padding: 10,
    marginBottom: 20,
    background: theme.palette.secondary.main,
  },
}));

const Profile = () => {
  const {
    state: { loading, userDetails },
    getUserDetails,
    createOrUpdateUserDetails,
  } = useUserDetails();
  const { user } = useUser();
  const {
    state: { card },
    createCard,
    getMyCard,
  } = useCard();
  const classes = useStyles();
  const [edit, setEdit] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (!userDetails) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [userDetails]);

  useEffect(() => {
    getMyCard();
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyForCard = () => {
    createCard();
  };

  const editProfile = () => setEdit((prev) => !prev);
  const handleFormSubmit = (details) => {
    createOrUpdateUserDetails(details);
  };
  const downloadUserResume = async () => {
    try {
      const response = await getUserResume(user?.id);
      if (!response || response.status > 400) {
        enqueueSnackbar('Error while downloading resume', {
          variant: 'error',
        });
      } else {
        downloadResponseFile(
          response,
          `${user?.name?.firstName}.pdf`,
          'application/pdf'
        );
      }
    } catch (error) {
      enqueueSnackbar('Error while downloading resume', {
        variant: 'error',
      });
    }
  };
  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid container item xs={6} lg={6} alignItems="center">
          <Typography variant="h5">Profile</Typography>
        </Grid>
        <Grid container item xs={6} lg={6} justify="flex-end">
          <div>
            {!edit && (
              <>
                <Box pr={1} display="inline-flex">
                  <StyledButton
                    variant="contained"
                    color="primary"
                    submitBtn
                    size="medium"
                    title="download user Resume"
                    onClick={downloadUserResume}
                  >
                    <Typography variant="inherit">Download Resume</Typography>
                  </StyledButton>
                </Box>
                <Box pr={1} display="inline-flex">
                  <StyledButton
                    variant="contained"
                    submitBtn
                    color="primary"
                    size="medium"
                    title="download user Resume"
                    onClick={editProfile}
                  >
                    <Typography variant="inherit">Edit Profile</Typography>
                  </StyledButton>
                </Box>
              </>
            )}
            {(!card ||
              (card?.status === 'disable' && card?.status === 'reject')) && (
              <>
                <Box pr={1} display="inline-flex">
                  <StyledButton
                    variant="contained"
                    size="small"
                    onClick={applyForCard}
                  >
                    <Typography variant="caption">Apply for Card</Typography>
                  </StyledButton>
                </Box>
              </>
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <Grid item lg={12} md={12} xs={12}>
          {card && <CardDetail card={card} />}
          {!userDetails && (
            <Paper className={classes.warning}>
              <Typography variant="subtitle1">
                You don't have user details!! Please set your profile details
                before applying the card
              </Typography>
            </Paper>
          )}
          <Paper className={classes.root}>
            <AdditionalDetailsForm
              disabled={!edit}
              initialState={userDetails}
              loading={loading}
              onSubmit={handleFormSubmit}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
