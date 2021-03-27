import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { StyledButton } from 'components/common/Button';
import TextInput from 'components/common/inputs/TextInput';
import { Card } from 'components/common/card';
import Checkbox from 'components/common/inputs/Checkbox';
import { associateUser, listAllUser } from 'services/usersClient';
import AutocompleteInput from 'components/common/inputs/AutoComplete';
import Roles from 'utils/role';
import formatDate from 'utils/formatDate';
import { useSnackbar } from 'notistack';
import { Thumb } from 'components/common/inputs/FileInput';
import { saveIdentificationImage } from 'services/usersClient';

const filter = createFilterOptions();

const initialValues = {
  userId: '',
  email: '',
  dateOfBirth: '',
  firstName: '',
  middleName: '',
  lastName: '',
  addressLine1: '',
  addressLine2: '',
  suburb: '',
  state: '',
  postal: '',
  startDate: '',
  endDate: '',
  jobTitle: '',
  currentWorkplace: false,
  identificationImage: '',
};

const validationSchema = yup.object().shape({
  userId: yup.string(),
  email: yup.string().email('Invalid Email').required('Email is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
  firstName: yup.string().required('First Name is required'),
  middleName: yup.string(),
  lastName: yup.string().required('Last Name is required'),
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(),
  suburb: yup.string().required('Suburb is required'),
  state: yup.string().required('State is required'),
  postal: yup
    .string()
    .required('Postal is required')
    .min(4, 'Must be exactly 4 digits')
    .max(4, 'Must be exactly 4 digits'),
  jobTitle: yup.string().required('Job Title is required'),
  startDate: yup.string().required('Start Date is required'),
  endDate: yup.string().when('currentWorkplace', {
    is: (currentWorkplace) => !currentWorkplace,
    then: yup.string().required('End Date is required'),
  }),
  identificationImage: yup.mixed().required('Identification Image is required'),
});

const AssociateUserForm = ({ createUser, loading = false }) => {
  const [isAssociateUser, setIsAssociateUser] = useState(false);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { data } = await listAllUser({ email: '' });
        if (active) {
          setUserList(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const onChangeEnterpriseName = (setFieldValue) => (event, newValue) => {
    setIsAssociateUser(false);
    if (typeof newValue === 'string') {
      setUser({
        email: newValue,
      });
      setFieldValue('email', newValue);
      setFieldValue('userId', '');
    } else if (newValue?.inputValue) {
      setUser({
        email: newValue?.inputValue,
      });
      setFieldValue('email', newValue?.inputValue);
      setFieldValue('userId', '');
    } else {
      setIsAssociateUser(true);
      setUser(newValue);
      setFieldValue('userId', newValue?._id);
      setFieldValue('email', newValue?.email);
      setFieldValue('dateOfBirth', formatDate(newValue?.dateOfBirth));
      setFieldValue('firstName', newValue?.name?.firstName);
      setFieldValue('middleName', newValue?.name?.middleName);
      setFieldValue('lastName', newValue?.name?.lastName);
      setFieldValue('addressLine1', newValue?.address?.addressLine1);
      setFieldValue('addressLine2', newValue?.address?.addressLine2);
      setFieldValue('suburb', newValue?.address?.suburb);
      setFieldValue('state', newValue?.address?.state);
      setFieldValue('postal', newValue?.address?.postal);
    }
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'string') {
      return option || '';
    }
    return option.email || '';
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        email: `Add "${params.inputValue}"`,
      });
    }
    return filtered;
  };

  const setError = (setFieldError) => (error) => {
    if (error) {
      setFieldError('email', error['email']);
      setFieldError('dateOfBirth', error['dateOfBirth']);
      setFieldError('firstName', error['name.firstName']);
      setFieldError('lastName', error['name.firstName']);
      setFieldError('lastName', error['name.lastName']);
      setFieldError('addressLine1', error['address.addressLine1']);
      setFieldError('addressLine2', error['address.addressLine2']);
      setFieldError('suburb', error['address.suburb']);
      setFieldError('state', error['address.state']);
      setFieldError('postal', error['address.postal']);
    }
  };
  const handleFormSubmit = async (values, { setFieldError }) => {
    try {
      let user = {};
      if (values.userId) {
        user = {
          userId: values.userId,
          startDate: values.startDate,
          endDate: values.endDate,
          jobTitle: values.jobTitle,
          currentWorkplace: values.currentWorkplace,
        };
        await associateUser(user);
        const formData = new FormData();
        formData.append('id', values.userId);
        formData.append('expiryDate', '01/01/2100');
        formData.append('identificationImage', values.identificationImage);
        await saveIdentificationImage(formData);
      } else {
        user = {
          email: values.email,
          name: {
            firstName: values.firstName,
            middleName: values.middleName,
            lastName: values.lastName,
          },
          dateOfBirth: values.dateOfBirth,
          address: {
            addressLine1: values.addressLine1,
            addressLine2: values.addressLine2,
            suburb: values.suburb,
            state: values.state,
            postal: values.postal,
          },
          role: Roles.END_USER,
          startDate: values.startDate,
          endDate: values.endDate,
          jobTitle: values.jobTitle,
          currentWorkplace: values.currentWorkplace,
        };
        await createUser(
          user,
          (error) => {
            if (error?.code === 'user_already_exists') {
              setFieldError('email', 'This email is already used');
            } else {
              setError(setFieldError)(error.errors);
            }
          },
          async (newUser) => {
            const formData = new FormData();
            formData.append('id', newUser.id);
            formData.append('expiryDate', '01/01/2100');
            formData.append('identificationImage', values.identificationImage);
            await saveIdentificationImage(formData);
          }
        );
      }
    } catch (error) {
      enqueueSnackbar('Some error occurred', { variant: 'error' });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <Card elevation={0}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} lg={6} md={6}>
                <AutocompleteInput
                  fullWidth
                  id="email"
                  label="Email Address *"
                  variant="outlined"
                  type="email"
                  size="small"
                  options={userList}
                  onChange={onChangeEnterpriseName(setFieldValue)}
                  filterOptions={filterOptions}
                  getOptionLabel={getOptionLabel}
                  value={user}
                  onBlur={handleBlur}
                  error={touched.email && errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextInput
                  disabled={isAssociateUser}
                  fullWidth
                  id="dateOfBirth"
                  label="Date of Birth *"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dateOfBirth}
                  error={touched.dateOfBirth && errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                />
              </Grid>
              <Grid item container spacing={2} xs={12} lg={12} md={12}>
                <Grid item xs={12} lg={6} md={6}>
                  <TextInput
                    type="file"
                    onChange={({ target: { files } }) => {
                      if (files[0]) {
                        setFieldValue('identificationImage', files[0]);
                      }
                    }}
                    value={values.file}
                    fullWidth
                    id="identificationImage"
                    label="Identification Image*"
                    inputProps={{ accept: 'image/*' }}
                    onBlur={handleBlur}
                    error={errors.identificationImage}
                    helperText={errors.identificationImage}
                  />
                  <Thumb
                    file={values.identificationImage}
                    onRemove={() => setFieldValue('identificationImage', '')}
                  />
                </Grid>
                <Grid container spacing={2} item xs={12} lg={6} md={6}>
                  <Grid item xs={12} lg={12} md={12}>
                    <TextInput
                      disabled={isAssociateUser}
                      fullWidth
                      id="firstName"
                      label="First Name *"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={touched.firstName && errors.firstName}
                      helperText={errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12} md={12}>
                    <TextInput
                      disabled={isAssociateUser}
                      fullWidth
                      id="middleName"
                      label="Middle Name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.middleName}
                      error={touched.middleName && errors.middleName}
                      helperText={errors.middleName}
                    />
                  </Grid>
                  <Grid item xs={12} lg={12} md={12}>
                    <TextInput
                      disabled={isAssociateUser}
                      fullWidth
                      id="lastName"
                      label="Last Name *"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      error={touched.lastName && errors.lastName}
                      helperText={errors.lastName}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextInput
                  disabled={isAssociateUser}
                  fullWidth
                  id="addressLine1"
                  label="Address Line 1 *"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.addressLine1}
                  error={touched.addressLine1 && errors.addressLine1}
                  helperText={errors.addressLine1}
                />
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextInput
                  disabled={isAssociateUser}
                  fullWidth
                  id="addressLine2"
                  label="Address Line 2"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.addressLine2}
                  error={touched.addressLine2 && errors.addressLine2}
                  helperText={errors.addressLine2}
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <TextInput
                  disabled={isAssociateUser}
                  fullWidth
                  id="suburb"
                  label="Suburb *"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.suburb}
                  error={touched.suburb && errors.suburb}
                  helperText={errors.suburb}
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <TextInput
                  disabled={isAssociateUser}
                  fullWidth
                  id="state"
                  label="State *"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.state}
                  error={touched.state && errors.state}
                  helperText={errors.state}
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <TextInput
                  disabled={isAssociateUser}
                  fullWidth
                  id="postal"
                  label="Postal *"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.postal}
                  error={touched.postal && errors.postal}
                  helperText={errors.postal}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                  Employment Details
                </Typography>
              </Grid>

              <Grid item xs={12} lg={4} md={4}>
                <TextInput
                  fullWidth
                  id="jobTitle"
                  label="Job Title *"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.jobTitle}
                  error={touched.jobTitle && errors.jobTitle}
                  helperText={errors.jobTitle}
                />
              </Grid>
              <Grid item xs={12} lg={4} md={4}>
                <TextInput
                  fullWidth
                  id="startDate"
                  label="Start Date *"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.startDate}
                  error={touched.startDate && errors.startDate}
                  helperText={errors.startDate}
                />
              </Grid>

              <Grid item xs={12} lg={4} md={4}>
                <TextInput
                  fullWidth
                  id="endDate"
                  label="End Date *"
                  type="date"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.endDate}
                  error={touched.endDate && errors.endDate}
                  helperText={errors.endDate}
                />
              </Grid>

              <Grid item xs={12} lg={4} md={4}>
                <Checkbox
                  id="currentWorkplace"
                  label="Current Work Place"
                  onChange={(checked) =>
                    setFieldValue('currentWorkplace', checked)
                  }
                  onBlur={handleBlur}
                  value={values.currentWorkplace}
                  error={touched.currentWorkplace && errors.currentWorkplace}
                  helperText={errors.currentWorkplace}
                />
              </Grid>
              <Grid xs={12} lg={12}>
                <br />
                <StyledButton
                  type="submit"
                  submitBtn
                  color="primary"
                  variant="contained"
                  endIcon={
                    (loading || isSubmitting) && (
                      <CircularProgress color="white" size={15} />
                    )
                  }
                >
                  Add User
                </StyledButton>
              </Grid>
            </Grid>
          </form>
        </Card>
      )}
    </Formik>
  );
};

export default AssociateUserForm;
