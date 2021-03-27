import React from 'react';
import { Grid } from '@material-ui/core';
import DashboardInfoBox from 'components/common/DashboardInfoBox';

const EnterpriseInfoBox = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <DashboardInfoBox
            value="1,233"
            initial="D"
            label="Today"
            name="day"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DashboardInfoBox
            value="12,000"
            initial="M"
            label="This Month"
            name="month"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DashboardInfoBox
            value="12,000"
            initial="Y"
            label="This Year"
            name="year"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EnterpriseInfoBox;
