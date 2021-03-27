import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Typography,
  Grid,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import TextInput from 'components/common/inputs/TextInput';
import { StyledButton } from 'components/common/Button';
import Checkbox from '../inputs/Checkbox';
import { Card, CardContent, CardActions } from 'components/common/card';
import OutlinedAlert from '../Alert';

function UserForm({
  handleSubmit,
  handleCancel,
  defaultValues,
  organizationUser,
  loading,
  error,
  submitButtonLabel = 'Create',
  values,
  show = false,
}) {
  const {
    control,
    setValue,
    handleSubmit: handleFormSubmit,
    errors,
    watch,
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (show && values) {
      Object.keys(values).forEach((key) => setValue(key, values[key]));
    }
  }, [show, setValue, values]);

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
  const file = watch('identificationImage');
  return (
    <form onSubmit={handleFormSubmit(handleSubmit)}>
      <Card elevation={0}>
        <CardContent>
          {error && <OutlinedAlert alertType="error" message={error} />}
          <Grid container spacing={4}>
            <Grid item xs={12} lg={6}>
              <Controller
                name="email"
                as={
                  <TextInput
                    fullWidth
                    id="email"
                    label="Email Address"
                    type="email"
                    error={errors.email && errors.email.type === 'required'}
                    helperText={errors.email && 'Email is required'}
                  />
                }
                control={control}
                rules={console.log}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name="dateOfBirth"
                as={
                  <TextInput
                    fullWidth
                    id="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    error={
                      errors.dateOfBirth &&
                      errors.dateOfBirth.type === 'required'
                    }
                    helperText={
                      errors.dateOfBirth && 'Date of Birth is required'
                    }
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Name
              </Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Controller
                name="identificationImage"
                as={
                  <TextInput
                    type="file"
                    onChange={({ target: { files } }) => {
                      if (files[0]) {
                        setValue('identificationImage', files[0]);
                      }
                    }}
                    value={file?.file}
                    fullWidth
                    id="identificationImage"
                    label="Identification Image*"
                    inputProps={{ accept: 'image/*' }}
                    error={errors.identificationImage}
                    helperText={errors.identificationImage}
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
                name="firstName"
                as={
                  <TextInput
                    fullWidth
                    id="firstName"
                    label="First Name"
                    type="firstName"
                    error={
                      errors.firstName && errors.firstName.type === 'required'
                    }
                    helperText={errors.firstName && 'First Name is required'}
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
                    type="middleName"
                    error={
                      errors.middleName && errors.middleName.type === 'required'
                    }
                    helperText={errors.middleName && 'Middle Name is required'}
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
                    type="lastName"
                    error={
                      errors.lastName && errors.lastName.type === 'required'
                    }
                    helperText={errors.lastName && 'Last Name is required'}
                  />
                }
                control={control}
                rules={{
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Address
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Controller
                name="addressLine1"
                as={
                  <TextInput
                    fullWidth
                    id="addressLine1"
                    label="Address Line 1"
                    type="addressLine1"
                    error={
                      errors.addressLine1 &&
                      errors.addressLine1.type === 'required'
                    }
                    helperText={
                      errors.addressLine1 && 'Address Line 1 is required'
                    }
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
                name="addressLine2"
                as={
                  <TextInput
                    fullWidth
                    id="addressLine2"
                    label="Address Line 2"
                    type="addressLine2"
                    error={
                      errors.addressLine2 &&
                      errors.addressLine2.type === 'required'
                    }
                    helperText={
                      errors.addressLine2 && 'Address Line 2 is required'
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
                    label="Suburb"
                    type="suburb"
                    error={errors.suburb && errors.suburb.type === 'required'}
                    helperText={errors.suburb && 'Suburb is required'}
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
                    label="Postal"
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
            {!(organizationUser || show) && (
              <>
                <Grid item xs={12} lg={12}>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Employment Details
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Controller
                    name="startDate"
                    as={
                      <TextInput
                        fullWidth
                        id="startDate"
                        label="Start Date"
                        type="date"
                        error={
                          errors.startDate &&
                          errors.startDate.type === 'required'
                        }
                        helperText={
                          errors.startDate && 'Start Date is required'
                        }
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
                    name="endDate"
                    as={
                      <TextInput
                        fullWidth
                        id="endDate"
                        label="End Date"
                        type="date"
                        error={
                          errors.endDate && errors.endDate.type === 'required'
                        }
                        helperText={errors.endDate && 'End Date is required'}
                      />
                    }
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Controller
                    name="jobTitle"
                    as={
                      <TextInput
                        fullWidth
                        id="jobTitle"
                        label="Job Title"
                        type="jobTitle"
                        error={
                          errors.jobTitle && errors.jobTitle.type === 'required'
                        }
                        helperText={errors.jobTitle && 'Job Title is required'}
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
                    name="currentWorkplace"
                    as={
                      <Checkbox
                        id="currentWorkplace"
                        label="Current Work Place"
                        type="currentWorkplace"
                        error={
                          errors.currentWorkplace &&
                          errors.currentWorkplace.type === 'required'
                        }
                        helperText={
                          errors.currentWorkplace &&
                          'Current Work Place is required'
                        }
                      />
                    }
                    control={control}
                    rules={{
                      required: true,
                    }}
                  />
                </Grid>
              </>
            )}
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

UserForm.defaultProps = {
  organizationUser: false,
  defaultValues: {},
};

export default UserForm;
