import React from 'react';
import { Paper, Divider, Grid, Typography } from '@material-ui/core';
import { StyledButton } from 'components/common/Button';
import { makeStyles } from '@material-ui/core/styles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    margin: '10px',
  },
  header: {
    padding: '10px',
    margin: '10px',
  },
  content: {
    padding: '10px',
    margin: '10px',
  },
}));

const EditForm = (props) => {
  const { title, disabled, setDisabled } = props;

  const classes = useStyles();
  const buttonLabel = disabled ? 'Edit' : 'Cancel';
  const icon = disabled ? (
    <EditRoundedIcon size={20} />
  ) : (
    <BlockRoundedIcon size={20} />
  );

  return (
    <Paper className={classes.root}>
      <Paper className={classes.header}>
        <Grid container>
          <Grid xs={6} lg={6}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          <Divider />
          <Grid xs={6} lg={6} align="right">
            <StyledButton
              onClick={() => setDisabled(!disabled)}
              variant="outlined"
              color="primary"
              startIcon={icon}
            >
              {buttonLabel}
            </StyledButton>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.content}>
        <Grid container>
          <Grid xs={12}>{props.children}</Grid>
        </Grid>
      </Paper>
    </Paper>
  );
};

export default EditForm;
