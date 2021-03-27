import {
  Container,
  Fab,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import ContentHeader from 'components/common/ContentHeader';
import StyledLink from 'components/common/StyledLink';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import React, { useEffect, useState } from 'react';
import { getMyExperiences } from 'services/experienceClient';
import WorkHistory from 'components/common/WorkHistory';
import { StyledButton } from 'components/common/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
}));

const OrganizationHistories = () => {
  const [workHistories, setWorkHistories] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    const getExperiences = async () => {
      try {
        const { data, status } = await getMyExperiences();
        if (status > 400) {
        } else {
          setWorkHistories(data.experiences || []);
        }
      } catch (error) {}
    };
    getExperiences();
  }, []);

  return (
    <Container maxWidth="xl">
      <ContentHeader heading="Organization History">
        <StyledLink to="/organization-history/add">
          <Fab color="primary" aria-label="add" variant="extended">
            <StyledButton submitBtn>
              <AddRoundedIcon />
              Add
            </StyledButton>
          </Fab>
        </StyledLink>
      </ContentHeader>
      <br />
      <Grid container spacing={2}>
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
            <Paper className={classes.paper}>
              <Typography align="center">Work History Not Found</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default OrganizationHistories;
