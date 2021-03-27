import React from 'react';
import {
  FormControlLabel,
  FormHelperText,
  FormControl,
  Checkbox as MuiCheckbox,
} from '@material-ui/core';

export default function Checkbox({
  onChange,
  onBlur,
  value,
  name,
  label,
  ref,
  error,
  helperText,
  required = false,
  color,
  disabled,
}) {
  const handleChange = (e) => onChange(e.target.checked);

  return (
    <FormControl
      disabled={disabled}
      required={required}
      error={error}
      component="fieldset"
    >
      <FormControlLabel
        disabled={disabled}
        control={
          <MuiCheckbox
            color={color}
            checked={value}
            onBlur={onBlur}
            disabled={disabled}
            onChange={handleChange}
            name={name}
            inputRef={ref}
          />
        }
        label={label}
      />
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
}

Checkbox.defaultProps = {
  color: 'primary',
};
