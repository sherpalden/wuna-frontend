import {
  Container,
  Grid,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
} from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { StyledButton } from 'components/common/Button';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import AddressFormm from './AddressForm';
import ExperienceDocs from './ExperienceDocs';
import PersonalInfoForm from './PersonalInfoForm';
import QualificationInfoForm from './QualificationInfoForm';
import { DocumentProvider } from 'hooks/useDocument/documentContext';

const StyledHeaderWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

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
        <Box p={3} pl={1}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

const UpdateDetails = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="xl">
      <StyledHeaderWrapper>
        <Grid container spacing={4}>
          <Grid item xs={6} lg={6}>
            <Typography variant="h5"> Update Details </Typography>
          </Grid>
          <Grid item xs={6} lg={6} align="right">
            <StyledButton
              color="primary"
              variant="contained"
              submitBtn
              onClick={() => console.log('Apply for Card')}
              startIcon={<CreditCardRoundedIcon size={20} />}
            >
              <Typography variant="inherit">Apply For Card</Typography>
            </StyledButton>
          </Grid>
        </Grid>
      </StyledHeaderWrapper>

      <Grid container spacing={3}>
        <Grid item lg={12} md={12} xs={12}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="Personal" {...a11yProps(0)} />
              <Tab label="Qualification/Experience" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid container spacing={4}>
              <Grid xs={12}>
                <PersonalInfoForm />
              </Grid>
              <Grid xs={12}>
                <AddressFormm />
                <QualificationInfoForm />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DocumentProvider>
              <ExperienceDocs />
            </DocumentProvider>
          </TabPanel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateDetails;
