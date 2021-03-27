import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { StyledButton } from 'components/common/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import EditForm from './EditForm';
import useEditForm from 'hooks/useEditForm';

function PersonalInfoForm(props) {
  const { onSubmit } = props;
  const { control, handleSubmit, errors } = useForm();
  const [disabled, setDisabled] = useEditForm(true);

  return (
    <EditForm
      title="Personal Information"
      disabled={disabled}
      setDisabled={setDisabled}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <Controller
              name="first_name"
              as={
                <TextField
                  fullWidth
                  id="first_name"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={
                    errors.first_name && errors.first_name.type === 'required'
                  }
                  helperText={errors.first_name && 'First Name is required'}
                  disabled={disabled}
                />
              }
              control={control}
              rules={{
                required: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Controller
              name="last_name"
              as={
                <TextField
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={
                    errors.last_name && errors.last_name.type === 'required'
                  }
                  helperText={errors.last_name && 'Last Name is required'}
                  disabled={disabled}
                />
              }
              control={control}
              rules={{
                required: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Controller
              name="date_of_birth"
              as={
                <TextField
                  fullWidth
                  id="date_of_birth"
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  size="small"
                  error={
                    errors.date_of_birth &&
                    errors.date_of_birth.type === 'required'
                  }
                  helperText={
                    errors.date_of_birth && 'Date of Birth is required'
                  }
                  defaultValue="2017-05-24"
                  disabled={disabled}
                />
              }
              control={control}
              rules={{
                required: true,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <FormLabel component="legend">Gender</FormLabel>
            <Controller
              name="gender"
              as={
                <RadioGroup
                  fullWidth
                  id="gender"
                  label="Gender"
                  variant="outlined"
                  type="gender"
                  size="small"
                  error={errors.gender && errors.gender.type === 'required'}
                  helperText={errors.gender && 'Gender is required'}
                  disabled={disabled}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                    disabled={disabled}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                    disabled={disabled}
                  />
                  <FormControlLabel
                    value="lgbtq"
                    control={<Radio />}
                    label="LGBTQ"
                    disabled={disabled}
                  />
                </RadioGroup>
              }
              control={control}
              rules={{
                required: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            {!disabled && (
              <StyledButton
                color="primary"
                type="submit"
                variant="contained"
                disabled={disabled}
                submitBtn
              >
                Save
              </StyledButton>
            )}
          </Grid>
        </Grid>
      </form>
    </EditForm>
  );
}

export default PersonalInfoForm;
