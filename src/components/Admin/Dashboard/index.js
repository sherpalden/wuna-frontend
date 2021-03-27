import React from 'react';
import Grid from '@material-ui/core/Grid';
import DashboardInfoBox from 'components/common/DashboardInfoBox';
import styled from 'styled-components';
import ActivityImage from 'images/activity-map.jpg';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import QrIcon from 'components/common/icons/QrIcon';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';

const EnrollmentHeader = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-top: 20px;
  background-color: white;
  align-items: center;
  height: 56px;
  text-align: left;
  letter-spacing: 0px;
  color: #8798ad;
  text-transform: uppercase;
  opacity: 1;
`;

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
          <DashboardInfoBox
            value="1,233"
            initial={<BusinessRoundedIcon />}
            label="Enterprise Enrolled"
            name="day"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DashboardInfoBox
            value="12,000"
            initial={<PeopleRoundedIcon />}
            label="Users Enrolled"
            name="month"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <DashboardInfoBox
            value="12,000"
            initial={<QrIcon />}
            label="Card Request Received"
            name="year"
          />
        </Grid>
      </Grid>
      <EnrollmentHeader>Enterprise Enrollment Activity Map</EnrollmentHeader>
      <img src={ActivityImage} alt="Activity Map" />
    </React.Fragment>
  );
};

export default AdminDashboard;
