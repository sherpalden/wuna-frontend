import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import ContentHeader from 'components/common/ContentHeader';
import { StyledButton } from 'components/common/Button';
import { useHistory } from 'react-router-dom';
import TextField from 'components/common/inputs/TextInput';
import Checkbox from 'components/common/inputs/Checkbox';
import AutocompleteInput from 'components/common/inputs/AutoComplete';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useExperience } from 'hooks/useExperiences/experienceContext';
import { getAll } from 'services/enterpriseClient';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
}));

const validationSchema = Yup.object().shape({
  enterpriseId: Yup.string(),
  jobTitle: Yup.string().required('Job Title is required'),
  startDate: Yup.date().required('Start Date is Required'),
  endDate: Yup.date()
    .nullable(undefined)
    .transform((curr, orig) => (orig === '' ? null : curr))
    .when('currentWorkplace', {
      is: (currentWorkplace) => currentWorkplace === false,
      then: Yup.date().required('End Date is required'),
    }),
  currentWorkplace: Yup.bool(),
  enterpriseName: Yup.string().when(['enterpriseId', 'currentWorkplace'], {
    is: (enterpriseId, currentWorkplace) => !currentWorkplace && !enterpriseId,
    then: Yup.string().required('Enterprise Name is required'),
  }),
  addressLine1: Yup.string().when(['enterpriseId', 'currentWorkplace'], {
    is: (enterpriseId, currentWorkplace) => !currentWorkplace && !enterpriseId,
    then: Yup.string().required('Address line is required'),
  }),
  addressLine2: Yup.string().when(['enterpriseId', 'currentWorkplace'], {
    is: (enterpriseId, currentWorkplace) => !currentWorkplace && !enterpriseId,
    then: Yup.string(),
  }),
  suburb: Yup.string().when(['enterpriseId', 'currentWorkplace'], {
    is: (enterpriseId, currentWorkplace) => !currentWorkplace && !enterpriseId,
    then: Yup.string(),
  }),
  state: Yup.string().when(['enterpriseId', 'currentWorkplace'], {
    is: (enterpriseId, currentWorkplace) => !currentWorkplace && !enterpriseId,
    then: Yup.string().required('State is required'),
  }),
  postal: Yup.string().when(['enterpriseId', 'currentWorkplace'], {
    is: (enterpriseId, currentWorkplace) => !currentWorkplace && !enterpriseId,
    then: Yup.string()
      .required('Postal code is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(4, 'Must be exactly 4 digits')
      .max(4, 'Must be exactly 4 digits'),
  }),
});

const AddOrganizationHistory = () => {
  const classes = useStyles();
  const router = useHistory();
  const { createExperience } = useExperience();
  const handleBack = () => router.push('/organization-history');

  const [enterpriseList, setEnterpriseList] = useState([]);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const { data } = await getAll();
        if (active) {
          setEnterpriseList(data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const handleFormSubmit = ({
    enterpriseId,
    jobTitle,
    startDate,
    endDate,
    currentWorkplace,
    enterpriseName,
    addressLine1,
    addressLine2,
    suburb,
    state,
    postal,
  }) => {
    let params = {};
    if (enterpriseId || currentWorkplace) {
      params = {
        enterpriseId,
        jobTitle,
        startDate,
        endDate,
        currentWorkplace,
      };
    } else {
      params = {
        jobTitle,
        startDate,
        endDate,
        currentWorkplace,
        enterpriseInfo: {
          name: enterpriseName,
          address: {
            addressLine1,
            addressLine2,
            suburb,
            state,
            postal,
          },
        },
      };
    }
    createExperience(params);
    handleBack();
  };

  const [enterpriseDetail, setEnterpriseDetail] = useState('');

  const onChangeEnterpriseName = (setFieldValue) => (event, newValue) => {
    if (typeof newValue === 'string') {
      setEnterpriseDetail({
        name: newValue,
      });
      setFieldValue('enterpriseName', newValue);
      setFieldValue('enterpriseId', '');
    } else if (newValue?.inputValue) {
      setEnterpriseDetail({
        name: newValue?.inputValue,
      });
      setFieldValue('enterpriseName', newValue?.inputValue);
      setFieldValue('enterpriseId', '');
    } else {
      setEnterpriseDetail(newValue);
      setFieldValue('enterpriseName', newValue?.name);
      setFieldValue('enterpriseId', newValue?._id);
    }
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'string') {
      return option || '';
    }
    return option.name || '';
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        name: `Add "${params.inputValue}"`,
      });
    }
    return filtered;
  };

  return (
    <Container maxWidth="xl">
      <ContentHeader heading="Add Work History" handleBack={handleBack} />
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <Formik
            initialValues={{
              jobTitle: '',
              startDate: '',
              endDate: undefined,
              currentWorkplace: true,
              enterpriseId: '',
              enterpriseName: '',
              addressLine1: '',
              addressLine2: '',
              suburb: '',
              state: '',
              postal: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              errors,
              values,
              touched,
              handleBlur,
              handleSubmit,
              setFieldValue,
              handleChange,
            }) => (
              <form onSubmit={handleSubmit}>
                <Paper elevation={0} className={classes.paper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        fullWidth
                        id="jobTitle"
                        name="jobTitle"
                        label="Job Title *"
                        variant="outlined"
                        type="text"
                        size="small"
                        value={values.jobTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.jobTitle && errors.jobTitle}
                        helperText={errors.jobTitle}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        fullWidth
                        id="startDate"
                        label="Start Date *"
                        variant="outlined"
                        type="date"
                        size="small"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.startDate && errors.startDate}
                        helperText={errors.startDate}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField
                        fullWidth
                        id="endDate"
                        label={`End Date ${values.currentWorkplace ? '' : '*'}`}
                        variant="outlined"
                        type="date"
                        size="small"
                        value={values.endDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.endDate && errors.endDate}
                        helperText={errors.endDate}
                      />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <Checkbox
                        id="currentWorkplace"
                        label="Current Work Place *"
                        type="currentWorkplace"
                        value={values.currentWorkplace}
                        error={
                          touched.currentWorkplace && errors.currentWorkplace
                        }
                        helperText={errors.currentWorkplace}
                        onBlur={handleBlur}
                        onChange={(checked) =>
                          setFieldValue('currentWorkplace', checked)
                        }
                      />
                    </Grid>

                    <Grid container item xl={12} lg={12} spacing={2}>
                      <Grid item xs={12}>
                        <Typography>Company Detail</Typography>
                      </Grid>
                      {
                        <Grid item xs={12} lg={4}>
                          <AutocompleteInput
                            fullWidth
                            id="enterpriseInfo.name"
                            label="Name *"
                            variant="outlined"
                            type="text"
                            size="small"
                            options={enterpriseList}
                            onChange={onChangeEnterpriseName(setFieldValue)}
                            filterOptions={filterOptions}
                            getOptionLabel={getOptionLabel}
                            value={enterpriseDetail}
                            onBlur={handleBlur}
                            error={
                              touched.enterpriseName && errors.enterpriseName
                            }
                            helperText={errors.enterpriseName}
                          />
                        </Grid>
                      }
                      {!values.enterpriseId && values.enterpriseName && (
                        <>
                          <Grid item xs={12} lg={4}>
                            <TextField
                              fullWidth
                              id="addressLine1"
                              name="addressLine1"
                              label="Address Line 1 *"
                              variant="outlined"
                              type="text"
                              size="small"
                              value={values.addressLine1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched?.addressLine1 && errors.addressLine1
                              }
                              helperText={errors.addressLine1}
                            />
                          </Grid>
                          <Grid item xs={12} lg={4}>
                            <TextField
                              fullWidth
                              id="addressLine2"
                              name="addressLine2"
                              label="Address Line 2"
                              variant="outlined"
                              type="text"
                              size="small"
                              value={values.addressLine2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.addressLine2}
                              helperText={errors.addressLine2}
                            />
                          </Grid>
                          <Grid item xs={12} lg={4}>
                            <TextField
                              fullWidth
                              id="subrub"
                              name="subrub"
                              label="Sub rub"
                              variant="outlined"
                              type="text"
                              size="small"
                              value={values.subrub}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.subrub && errors.subrub}
                              helperText={errors.subrub}
                            />
                          </Grid>
                          <Grid item xs={12} lg={4}>
                            <TextField
                              fullWidth
                              id="state"
                              name="state"
                              label="State *"
                              variant="outlined"
                              type="text"
                              size="small"
                              value={values.state}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.state && errors.state}
                              helperText={errors.state}
                            />
                          </Grid>
                          <Grid item xs={12} lg={4}>
                            <TextField
                              fullWidth
                              id="postal"
                              label="Postal Code *"
                              variant="outlined"
                              type="number"
                              size="small"
                              value={values.postal}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched?.postal && errors.postal}
                              helperText={errors.postal}
                            />
                          </Grid>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={12}>
                      <StyledButton
                        type="submit"
                        color="secondary"
                        variant="contained"
                      >
                        Submit
                      </StyledButton>
                    </Grid>
                  </Grid>
                </Paper>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddOrganizationHistory;
