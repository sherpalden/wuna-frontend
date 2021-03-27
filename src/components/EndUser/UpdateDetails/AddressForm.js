import { Grid, TextField } from '@material-ui/core';
import { StyledButton } from 'components/common/Button';
import { useForm, Controller } from 'react-hook-form';
import React from 'react';

import EditForm from './EditForm';
import useEditForm from 'hooks/useEditForm';

export const AddressFormm = (props) => {
  const { onSubmit } = props;
  const { control, handleSubmit, errors } = useForm();
  const [disabled, setDisabled] = useEditForm(true);

  return (
    <EditForm title="Address" disabled={disabled} setDisabled={setDisabled}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            <Controller
              name="address_1"
              as={
                <TextField
                  fullWidth
                  id="address_1_"
                  label="Address Line 1"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={
                    errors.address_1 && errors.address_1.type === 'required'
                  }
                  helperText={errors.address_1 && 'Address Line 1 is required'}
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
              name="address_2"
              as={
                <TextField
                  fullWidth
                  id="address_2"
                  label="Address Line 2"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={
                    errors.address_2 && errors.address_2.type === 'required'
                  }
                  helperText={errors.address_2 && 'Address Line 2 is required'}
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
              name="region"
              as={
                <TextField
                  fullWidth
                  id="region"
                  label="Region"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={errors.region && errors.region.type === 'required'}
                  helperText={errors.region && 'Region is required'}
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
              name="city"
              as={
                <TextField
                  fullWidth
                  id="city"
                  label="City Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={errors.city && errors.city.type === 'required'}
                  helperText={errors.city && 'City is required'}
                  disabled={disabled}
                />
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
                submitBtn
                type="submit"
                variant="contained"
                disabled={disabled}
              >
                Save
              </StyledButton>
            )}
          </Grid>
        </Grid>
      </form>
    </EditForm>
  );
};

export default AddressFormm;
