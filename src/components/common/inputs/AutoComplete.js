import React, { useState } from 'react';
import TextField from './TextInput';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  makeStyles,
} from '@material-ui/core';

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

const AutocompleteInput = ({
  id,
  fullWidth,
  helperText,
  error,
  label = '',
  className,
  getOptionLabel,
  filterOptions,
  options = [],
  value,
  onChange,
  ...otherProps
}) => {
  const [open, setOpen] = useState(false);
  const loading = open && options?.length === 0;
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
      <Autocomplete
        {...otherProps}
        id={id}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        value={value}
        onChange={onChange}
        handleHomeEndKeys
        getOptionSelected={console.log}
        filterOptions={filterOptions}
        getOptionLabel={getOptionLabel}
        options={options}
        loading={loading}
        freeSolo
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <TextField {...params} error={error} variant="outlined" />
          </div>
        )}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default AutocompleteInput;
