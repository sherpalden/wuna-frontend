import React, { useEffect, useState } from 'react';
import { useCard } from 'hooks/useCard/cardContext';
import { useHistory, useParams } from 'react-router-dom';
import ContentHeader from 'components/common/ContentHeader';
import { Box, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { getExperience } from 'services/experienceClient';
import WorkHistory from 'components/common/WorkHistory';
import { useSnackbar } from 'notistack';
import { getUserDetailsById, getUserDetailsExcel } from 'services/usersClient';
import UserDetailsView from 'components/common/User';
import downloadResponseFile from 'utils';
import { StyledButton } from 'components/common/Button';
import qrcode from 'qrcode';

const useStyles = makeStyles(() => ({
  card: {
    padding: 20,
    marginBottom: 20,
  },
  root: {
    padding: 40,
  },
  cardDetail: {
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 4,
  },
}));

const CardDetailView = () => {
  const [workHistories, setWorkHistories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [userDetails, setUserDetails] = useState();

  const {
    state: { card },
    getCardDetail,
    updateCard,
  } = useCard();
  const { id } = useParams();
  const router = useHistory();

  const classes = useStyles();

  useEffect(() => {
    getCardDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await getUserDetailsById(card?.user?._id);
        setUserDetails(data.userDetails);
      } catch (error) {
        enqueueSnackbar(error?.message || 'Error while fetching user details', {
          variant: 'error',
        });
      }
    };
    card?.user?._id && getUserDetails();
  }, [card?.user?._id, enqueueSnackbar]);

  const handleBack = () => {
    router.push('/cards');
  };

  useEffect(() => {
    const getExperiences = async () => {
      try {
        const { data } = await getExperience(card?.user?._id);
        setWorkHistories(data?.experiences || []);
      } catch (error) {
        enqueueSnackbar(error?.message || 'Error while fetching experience', {
          variant: 'error',
        });
      }
    };
    if (card?.user?._id) {
      getExperiences();
    }
  }, [card?.user?._id, enqueueSnackbar]);

  const downloadUserDetails = async () => {
    try {
      const response = await getUserDetailsExcel(card?.user?._id);
      if (!response || response.status > 400) {
        enqueueSnackbar('Error while downloading detail file', {
          variant: 'error',
        });
      } else {
        downloadResponseFile(
          response,
          `${card?.user?.name?.firstName}.xlsx`,
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
      }
    } catch (error) {
      enqueueSnackbar('Error while downloading detail file', {
        variant: 'error',
      });
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <ContentHeader heading="Card Details" handleBack={handleBack}>
          <div>
            {card?.status === 'applied' && (
              <>
                <Box pr={1} display="inline-block">
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    size="medium"
                    approveBtn
                    onClick={() => updateCard(card?.id, { action: 'activate' })}
                  >
                    <Typography variant="inherit">Approve</Typography>
                  </StyledButton>
                </Box>
                <Box pr={1} display="inline-block">
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    size="medium"
                    rejectBtn
                    onClick={() => updateCard(card?.id, { action: 'reject' })}
                  >
                    <Typography variant="inherit">Reject</Typography>
                  </StyledButton>
                </Box>
              </>
            )}
            {card?.status === 'active' && (
              <Box pr={1} display="inline-block">
                <StyledButton
                  variant="contained"
                  color="secondary"
                  size="medium"
                  disableBtn
                  onClick={() => updateCard(card?.id, { action: 'disable' })}
                >
                  <Typography variant="inherit">Disable</Typography>
                </StyledButton>
              </Box>
            )}
            <Box pr={1} display="inline-block">
              <StyledButton
                variant="contained"
                color="primary"
                submitBtn
                size="medium"
                title="download user details"
                onClick={downloadUserDetails}
              >
                <Typography variant="inherit">Download User Detail</Typography>
              </StyledButton>
            </Box>
          </div>
        </ContentHeader>
      </Grid>
      <Grid item xs={12} lg={12}>
        {!card ? (
          <Paper className={classes.root}>
            <Typography>Card Not Found</Typography>
          </Paper>
        ) : (
          <CardDetail card={card} />
        )}
      </Grid>
      <Grid item container xs={12} lg={12} spacing={2}>
        <Grid item xs={12} lg={12}>
          <Typography variant="h5">User Details</Typography>
        </Grid>
        <Grid item xs={12} lg={12}>
          <UserDetailsView userDetails={userDetails} />
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography variant="h5">Work Histories</Typography>
        </Grid>
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
      </Grid>
    </Grid>
  );
};

export const CardDetail = ({ card }) => {
  const classes = useStyles();
  const [qrSrc, setQrSrc] = useState();

  useEffect(() => {
    async function setQrCode() {
      const src = await qrcode.toDataURL(
        `${window.location.origin}/users/${card.user._id}/view`
      );
      setQrSrc(src);
    }

    setQrCode();
  }, [card.user._id]);

  return (
    <Paper variant="elevation" elevation={0} className={classes.card}>
      <Grid container spacing={3}>
        <Grid spacing={3} item xs={12}>
          <img src={qrSrc} alt="qrcode" />
        </Grid>
        <Grid spacing={3} item xs={6} lg={6}>
          <Grid item xs={12}>
            <Typography variant="overline">Card Number</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.cardDetail}>
              {card?.cardNumber || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid spacing={3} item xs={6} lg={6}>
          <Grid item xs={12}>
            <Typography variant="overline">Card Holder Name</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.cardDetail}>
              {card?.user
                ? card?.user?.name?.firstName + ' ' + card?.user?.name?.lastName
                : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid spacing={3} item xs={6} lg={6}>
          <Grid item xs={12}>
            <Typography variant="overline">Card Holder Email</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.cardDetail}>
              {card?.user?.email || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid spacing={3} item xs={6} lg={6}>
          <Grid item xs={12}>
            <Typography variant="overline">Expires At</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.cardDetail}>
              {card?.expiresAt
                ? new Date(card?.expiresAt).toDateString()
                : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid spacing={3} item xs={6} lg={6}>
          <Grid item xs={12}>
            <Typography variant="overline">Address</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.cardDetail}>
              {card?.user?.address?.addressLine1 || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid spacing={3} item xs={6} lg={6}>
          <Grid item xs={12}>
            <Typography variant="overline">Date of Birth</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography className={classes.cardDetail}>
              {card?.user?.dateOfBirth
                ? new Date(card?.user?.dateOfBirth).toDateString()
                : 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CardDetailView;
