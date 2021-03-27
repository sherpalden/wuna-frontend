import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const StyledCardContent = styled(CardContent)`
  position: relative;
  margin-left: 10px;
  &:before {
    content: ' ';
    height: 70%;
    width: 2px;
    background: #2e5bff;
    position: absolute;
    top: 15%;
    left: 0;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {},
  date: {
    color: theme.palette.grey['light'],
  },
  jobTitle: {},
  enterprise: {},
}));

const formatExperienceDate = (date) =>
  `${new Date(date).getFullYear()}/${new Date(date).getMonth()}/${new Date(
    date
  ).getDate()}`;

const WorkHistory = ({
  jobTitle,
  startDate,
  endDate,
  enterprise,
  currentWorkplace,
  enterpriseInfo,
}) => {
  const classes = useStyles();
  return (
    <Card elevation={0}>
      <StyledCardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.date}>
              {`${formatExperienceDate(startDate)} ${
                endDate
                  ? ' - ' + formatExperienceDate(endDate)
                  : currentWorkplace
                  ? ' - present'
                  : ''
              }`}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography variant="h5" color="gray" className={classes.jobTitle}>
              {jobTitle}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography variant="subtitle2" className={classes.enterprise}>
              {enterprise ? enterprise?.name : enterpriseInfo?.name}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography variant="subtitle2" className={classes.enterprise}>
              {enterprise
                ? enterprise?.address?.addressLine1
                : enterpriseInfo?.address?.addressLine1}
            </Typography>
          </Grid>
        </Grid>
      </StyledCardContent>
    </Card>
  );
};

export default WorkHistory;
