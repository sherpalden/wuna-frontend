import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Grid,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  Input,
  FormControl,
  InputLabel,
  makeStyles,
} from '@material-ui/core';
import TextInput from 'components/common/inputs/TextInput';
import { StyledButton } from 'components/common/Button';
import OutlinedAlert from 'components/common/Alert';
import { Card, CardActions, CardContent } from 'components/common/card';

function OrganizationForm({
  handleSubmit,
  handleCancel,
  submitButtonLabel,
  loading,
  error,
  defaultValues,
  enterprise,
}) {
  const { control, handleSubmit: handleFormSubmit, errors } = useForm({
    defaultValues,
  });

  const useStyles = makeStyles(() => ({
    selectLabel: {},
    label: {
      fontSize: 14,
      color: '#8798AD',
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    error: {
      fontSize: 14,
      color: 'red',
      marginTop: '8px',
    },
  }));

  const classes = useStyles();

  const onSubmit = (params) => {
    const organization = {
      name: params.name,
      email: params.email,
      phone: params.organizationPhone,
      contactPerson: {
        firstName: params.firstName,
        middleName: params.middleName,
        lastName: params.lastName,
        phone: params.phone,
        jobTitle: params.jobTitle,
      },
      address: {
        addressLine1: params.addressLine1,
        addressLine2: params.addressLine2,
        suburb: params.suburb,
        state: params.state,
        postal: params.postal,
      },
    };

    handleSubmit(organization);
  };

  const label = enterprise ? 'Enterprise' : 'Third Party';

  return (
    <form onSubmit={handleFormSubmit(onSubmit)}>
      <Card elevation={0}>
        <CardContent>
          {error && <OutlinedAlert alertType="error" message={error} />}
          <Grid container spacing={4}>
            <Grid item lg={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {label} Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="name"
                value="name"
                as={
                  <TextInput
                    fullWidth
                    id="name"
                    label="Company Name"
                    type="text"
                    error={errors.name && errors.name.type === 'required'}
                    helperText={errors.name && 'Company Name is Required'}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name="organizationPhone"
                value="organizationPhone"
                as={
                  <TextInput
                    fullWidth
                    id="organizationPhone"
                    label="Phone number"
                    type="text"
                    error={
                      errors.organizationPhone &&
                      errors.phone.type === 'required'
                    }
                    helperText={errors.organizationPhone && 'Phone is Required'}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name="email"
                value="email"
                as={
                  <TextInput
                    fullWidth
                    id="email"
                    label="Email"
                    type="text"
                    error={errors.email && errors.email.type === 'required'}
                    helperText={errors.email && 'Enterprise Email is Required'}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item lg={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {label} Address
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Controller
                name="addressLine1"
                as={
                  <TextInput
                    fullWidth
                    id="addressLine1"
                    label="Address Line 1"
                    type="text"
                    error={
                      errors.addressLine1 &&
                      errors.addressLine1.type === 'required'
                    }
                    helperText={
                      errors.addressLine1 && 'Address Line1 is Required'
                    }
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
                name="addressLine2"
                as={
                  <TextInput
                    fullWidth
                    id="addressLine2"
                    label="Address Line 2"
                    type="text"
                    error={
                      errors.addressLine2 &&
                      errors.addressLine2.type === 'required'
                    }
                    helperText={
                      errors.addressLine2 && 'Address Line2 is Required'
                    }
                  />
                }
                control={control}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <Controller
                name="suburb"
                as={
                  <TextInput
                    fullWidth
                    id="suburb"
                    label="Suburb Name"
                    type="text"
                    error={errors.suburb && errors.suburb.type === 'required'}
                    helperText={errors.suburb && 'Suburb Name is Required'}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <FormControl fullWidth>
                <InputLabel
                  id="stat"
                  shrink
                  classes={{ root: classes.label, error: classes.error }}
                >
                  State
                </InputLabel>
                <Controller
                  name="state"
                  as={
                    <Select
                      fullWidth
                      id="stat"
                      label="State Name"
                      error={errors.state && errors.state.type === 'required'}
                      helperText={errors.state && 'State Name is Required'}
                      input={<Input />}
                    >
                      <MenuItem value={'NORTHERN_TERRITORY'}>
                        Northern Territory{' '}
                      </MenuItem>
                      <MenuItem value={'TASMANIA'}>Tasmania</MenuItem>
                      <MenuItem value={'QUEENSLAND'}>Queensland</MenuItem>
                      <MenuItem value={'NEW_SOUTH_WALES'}>
                        New South Wales
                      </MenuItem>
                      <MenuItem value={'VICTORIA'}>Victoria</MenuItem>
                      <MenuItem value={'AUSTRALIAN_CAPITAL_TERRITORY'}>
                        Australian Capital Territory
                      </MenuItem>
                    </Select>
                  }
                  control={control}
                  rules={{
                    required: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Controller
                name="postal"
                as={
                  <TextInput
                    fullWidth
                    id="postal"
                    label="Postcode"
                    type="number"
                    error={errors?.postal}
                    helperText={
                      errors?.postal?.type === 'required'
                        ? 'Postal is Required'
                        : errors?.postal?.type === 'maxLength'
                        ? 'Must Be Exactly 4'
                        : errors?.postal?.type === 'minLength' &&
                          'Must Be Exactly 4'
                    }
                  />
                }
                control={control}
                rules={{
                  required: true,
                  maxLength: 4,
                  minLength: 4,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card elevation={0}>
        <CardContent>
          <Grid container spacing={4}>
            <Grid item lg={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Contact Person
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Controller
                name="firstName"
                as={
                  <TextInput
                    fullWidth
                    id="firstName"
                    label="First Name"
                    type="text"
                    error={
                      errors.firstName && errors.firstName.type === 'required'
                    }
                    helperText={errors.firstName && 'First Name is Required'}
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
                name="middleName"
                as={
                  <TextInput
                    fullWidth
                    id="middleName"
                    label="Middle Name"
                    type="text"
                    error={
                      errors.middleName && errors.middleName.type === 'required'
                    }
                    helperText={errors.middleName && 'Middle Name is Required'}
                  />
                }
                control={control}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <Controller
                name="lastName"
                as={
                  <TextInput
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    type="text"
                    error={
                      errors.lastName && errors.lastName.type === 'required'
                    }
                    helperText={errors.lastName && 'Last Name is Required'}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name="phone"
                as={
                  <TextInput
                    fullWidth
                    id="phone"
                    label="Phone number"
                    type="text"
                    error={errors.phone && errors.phone.type === 'required'}
                    helperText={errors.phone && 'Phone is Required'}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name="jobTitle"
                as={
                  <TextInput
                    fullWidth
                    id="jobTitle"
                    label="jobTitle"
                    type="text"
                    error={
                      errors.jobTitle && errors.jobTitle.type === 'required'
                    }
                    helperText={errors.jobTitle && 'Job Title is Required'}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <StyledButton
            type="submit"
            color="primary"
            submitBtn
            variant="contained"
            endIcon={loading && <CircularProgress color="white" size={15} />}
          >
            {submitButtonLabel}
          </StyledButton>
          <StyledButton
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleCancel}
          >
            Cancel
          </StyledButton>
        </CardActions>
      </Card>
    </form>
  );
}

OrganizationForm.defaultProps = {
  defaultValues: {
    name: '',
    email: '',
    organizationPhone: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    jobTitle: '',
    addressLine1: '',
    addressLine2: '',
    suburb: '',
    state: '',
    postal: '',
  },
  enterprise: true,
};

export default OrganizationForm;
