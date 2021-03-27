import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

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
const formatText = (str = '') => str.replace(/_/g, ' ').toLowerCase();

const UserDetailsView = ({ userDetails }) => {
  const classes = useStyles();
  return (
    <Paper variant="elevation" elevation={0} className={classes.card}>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.heading}
          >
            General
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Gender
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>{userDetails?.gender || 'N/A'}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Hold Access Number
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>{userDetails?.holdAccessNumber || 'N/A'}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Spoking languages
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>{userDetails?.languagesSpoken || 'N/A'}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Region
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>{userDetails?.region || 'N/A'}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Nationality
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>{userDetails?.nationality || 'N/A'}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Current Visa Type
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {formatText(userDetails?.currentVisaType) || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Emergency Health Condition
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.emergencyHealthCondition || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Diversity
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>{userDetails?.diversity || 'N/A'}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Originality
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {formatText(userDetails?.originality) || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.heading}
          >
            Emergency Contact
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Name
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.emergencyContact?.name?.firstName +
                userDetails?.emergencyContact?.name?.middleName +
                userDetails?.emergencyContact?.name?.lastName || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Phone
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.emergencyContact?.phone || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Relation
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.emergencyContact?.relation || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Physical Impairment
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.impairments?.physicalImpairment ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Mental Health Impairment
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.impairments?.mentalHealthImpairment ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.heading}
          >
            Maternal Grand Father
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Skin Group
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.maternalGrandFather?.skinGroup || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Oldest Ancestor
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.maternalGrandFather?.oldestAncestor || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Estate Belongings
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.maternalGrandFather?.estateBelongings || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.heading}
          >
            Maternal Grand Mother
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Skin Group
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.maternalGrandMother?.skinGroup || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Oldest Ancestor
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.maternalGrandMother?.oldestAncestor || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Estate Belongings
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.maternalGrandMother?.estateBelongings || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.heading}
          >
            Paternal Grand Father
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Skin Group
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.paternalGrandFather?.skinGroup || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Oldest Ancestor
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.paternalGrandFather?.oldestAncestor || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Estate Belongings
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.paternalGrandFather?.estateBelongings || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Typography
            variant="h6"
            color="secondary"
            className={classes.heading}
          >
            Paternal Grand Father
          </Typography>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Skin Group
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.paternalGrandMother?.skinGroup || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Oldest Ancestor
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.paternalGrandMother?.oldestAncestor || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={4} lg={4}>
          <Grid item xs={12} lg={12}>
            <Typography variant="caption" className={classes.label}>
              Estate Belongings
            </Typography>
          </Grid>
          <Grid item xs={12} lg={12}>
            <Typography>
              {userDetails?.paternalGrandMother?.estateBelongings || 'N/A'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserDetailsView;
