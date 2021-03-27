import { useForm, Controller } from 'react-hook-form';
import { StyledButton } from 'components/common/Button';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import useEditForm from 'hooks/useEditForm';
import EditForm from './EditForm';

function QualificationInfoForm(props) {
  const { onSubmit } = props;
  const { control, handleSubmit, errors } = useForm();
  const [disabled, setDisabled] = useEditForm(true);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EditForm
        title="Qualification Information"
        setDisabled={setDisabled}
        disabled={disabled}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} lg={4}>
            {/* First Name */}
            <Controller
              name="job"
              as={
                <TextField
                  fullWidth
                  id="job"
                  label="Job Career/Title"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={errors.job && errors.job.type === 'required'}
                  helperText={errors.job && 'First Name is required'}
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
              name="employee_number"
              as={
                <TextField
                  fullWidth
                  id="employee_number"
                  label="Employee Number"
                  variant="outlined"
                  type="number"
                  size="small"
                  error={
                    errors.employee_number &&
                    errors.employee_number.type === 'required'
                  }
                  helperText={
                    errors.employee_number && 'Employee Number is required'
                  }
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
              name="visa_name"
              as={
                <TextField
                  fullWidth
                  id="visa_name"
                  label="Current Visa Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={
                    errors.visa_name && errors.visa_name.type === 'required'
                  }
                  helperText={errors.visa_name && 'VISA Name is required'}
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
          <Grid item xs={12} lg={4}>
            <Controller
              name="card_sponsor_name"
              as={
                <TextField
                  fullWidth
                  id="card_sponsor_name"
                  label="Card Sponsor Name"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={
                    errors.card_sponsor_name &&
                    errors.card_sponsor_name.type === 'required'
                  }
                  helperText={
                    errors.card_sponsor_name && 'Card Sponsor Name is required'
                  }
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
              name="holdaccess_card_number"
              as={
                <TextField
                  fullWidth
                  id="holdaccess_card_number"
                  label="Hold Access Card Number"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={
                    errors.holdaccess_card_number &&
                    errors.holdaccess_card_number.type === 'required'
                  }
                  helperText={
                    errors.holdaccess_card_number &&
                    'Hold Access card number is required'
                  }
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
              name="student_number"
              as={
                <TextField
                  fullWidth
                  id="student_number"
                  label="Student Number"
                  variant="outlined"
                  type="text"
                  size="small"
                  error={
                    errors.student_number &&
                    errors.student_number.type === 'required'
                  }
                  helperText={
                    errors.student_number && 'Student Number is required'
                  }
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
                type="submit"
                submitBtn
                variant="contained"
              >
                Save
              </StyledButton>
            )}
          </Grid>
        </Grid>
      </EditForm>
    </form>
  );
}

export default QualificationInfoForm;
