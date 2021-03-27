import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextInput from './inputs/TextInput';
import { StyledButton } from 'components/common/Button';
import { useForm, Controller } from 'react-hook-form';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoginForm(props) {
  const { onSubmit, loading } = props;
  const { control, handleSubmit, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Controller
            name="email"
            as={
              <TextInput
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                type="email"
                size="small"
                error={errors.email && errors.email.type === 'required'}
                helperText={errors.email && 'Email is required'}
              />
            }
            control={control}
            rules={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="password"
            as={
              <TextInput
                fullWidth
                label="Password"
                name="password"
                size="small"
                type="password"
                variant="outlined"
                error={errors.password && errors.password.type === 'required'}
                helperText={errors.password && 'Password is required'}
              />
            }
            control={control}
            rules={{
              required: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledButton
            fullWidth
            color="primary"
            type="submit"
            submitBtn
            variant="contained"
            endIcon={loading && <CircularProgress color="white" size={15} />}
          >
            Sign In
          </StyledButton>
        </Grid>
      </Grid>
    </form>
  );
}
