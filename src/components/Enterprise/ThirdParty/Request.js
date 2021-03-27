import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Container, Grid, makeStyles } from '@material-ui/core';
import AutoComplete from 'components/common/inputs/AutoComplete';
import { getAll as getallThirdparty } from 'services/thirdPartyClient';
import { getAll as getallUsers } from 'services/usersClient';
import { StyledButton } from 'components/common/Button';
import { useRequest } from 'hooks/useRequest/requestContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
  },
  button: {
    marginTop: 40,
    width: '30vh',
  },
}));

const validationSchema = Yup.object().shape({
  thirdparty: Yup.string().required('Third Party is required '),
  user: Yup.string().required('User is required'),
});

function Request() {
  const [userList, setUserList] = useState([]);
  const [thirdPartyList, setThirdPartyList] = useState([]);
  const classes = useStyles();
  const { createThirdPartyUser } = useRequest();

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const thirdparty = await getallThirdparty();
        const users = await getallUsers();
        if (active) {
          setThirdPartyList(thirdparty?.data?.data);
          setUserList(
            users?.data?.data.filter((data) => data.role === 'END_USER')
          );
        }
      } catch (error) {
        console.log(error);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const getOptionLabel = (option) => {
    if (typeof option === 'string') {
      return option || '';
    }
    return option.email || '';
  };

  const [thirdPartyDetail, setThirdPartyDetail] = useState({});
  const [userDetail, setUserDetail] = useState({});

  const setError = (setFieldError) => (error) => {
    if (error?.code === 'user_not_found') setFieldError('user', error?.message);
    else setFieldError('thirdparty', error?.message);
  };

  const onChangeThirdParty = (setFieldValue) => (event, newValue) => {
    if (typeof newValue === 'string') {
      setThirdPartyDetail({
        name: newValue,
      });
      setFieldValue('thirdparty', newValue);
      setFieldValue('thirdpartyId', '');
    } else if (newValue?.inputValue) {
      setThirdPartyDetail({
        name: newValue?.inputValue,
      });
      setFieldValue('thirdpartyId', newValue?.inputValue);
      setFieldValue('thirdpartyId', '');
    } else {
      setThirdPartyDetail(newValue);
      setFieldValue('thirdparty', newValue?.email);
      setFieldValue('thirdpartyId', newValue?._id);
    }
  };

  const onChangeUser = (setFieldValue) => (event, newValue) => {
    if (typeof newValue === 'string') {
      setUserDetail({
        name: newValue,
      });
      setFieldValue('user', newValue);
      setFieldValue('userid', '');
    } else if (newValue?.inputValue) {
      setUserDetail({
        name: newValue?.inputValue,
      });
      setFieldValue('user', newValue?.inputValue);
      setFieldValue('userId', '');
    } else {
      setUserDetail(newValue);
      setFieldValue('user', newValue?.email);
      setFieldValue('userId', newValue?._id);
    }
  };
  const handleFormSubmit = async (values, { setFieldError }) => {
    let params = {};
    params = {
      thirdPartyId: `${thirdPartyDetail._id}`,
      userId: `${userDetail._id}`,
    };
    await createThirdPartyUser(params, setError(setFieldError));
    setThirdPartyDetail('');
    setUserDetail('');
  };

  return (
    <Container maxWidth="xl">
      <Formik
        initialValues={{
          thirdparty: '',
          user: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, handleBlur, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <AutoComplete
                  fullWidth
                  id="thirdparty"
                  name="thirdparty"
                  label="THIRD PARTY *"
                  variant="outlined"
                  type="text"
                  size="small"
                  options={thirdPartyList}
                  onChange={onChangeThirdParty(setFieldValue)}
                  getOptionLabel={getOptionLabel}
                  value={thirdPartyDetail}
                  onBlur={handleBlur}
                  error={touched.thirdparty && errors.thirdparty}
                  helperText={touched.thirdparty && errors.thirdparty}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <AutoComplete
                  fullWidth
                  id="user"
                  name="user"
                  label="USER *"
                  variant="outlined"
                  type="text"
                  size="small"
                  options={userList}
                  onChange={onChangeUser(setFieldValue)}
                  getOptionLabel={getOptionLabel}
                  value={userDetail}
                  onBlur={handleBlur}
                  error={touched.user && errors.user}
                  helperText={touched.user && errors.user}
                />
              </Grid>
            </Grid>
            <StyledButton
              className={classes.button}
              type="submit"
              color="primary"
              submitBtn
              variant="contained"
            >
              Request
            </StyledButton>
          </form>
        )}
      </Formik>
    </Container>
  );
}

export default Request;
