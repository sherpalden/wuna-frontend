import React from 'react';
import {
  InputBase,
  FormControl,
  InputLabel,
  makeStyles,
  withStyles,
  createStyles,
  FormHelperText,
} from '@material-ui/core';

export const Input = withStyles((theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#E0E7FF33',
      border: '1px solid #2E5BFF14',
      fontSize: 16,
      padding: '10px 16px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        borderColor: theme.palette.secondary.main,
      },
      '&:focus': {
        borderColor: theme.palette.primary.main,
      },
    },
    error: {
      '& input': {
        borderColor: theme.palette.error.main,
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme) => ({
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

export default function TextInput({
  fullWidth,
  label,
  id,
  className,
  error,
  helperText,
  ...restProps
}) {
  const classes = useStyles();

  return (
    <FormControl className={className} fullWidth={fullWidth} error={error}>
      <InputLabel
        shrink
        htmlFor={id}
        classes={{ root: classes.label, error: classes.error }}
      >
        {label}
      </InputLabel>
      <Input fullWidth={fullWidth} id={id} error={error} {...restProps} />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}
