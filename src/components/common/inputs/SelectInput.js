import React from 'react';
import { Input } from 'components/common/inputs/TextInput';
import { MenuItem, Select } from '@material-ui/core';

const SelectInput = ({ options = [], ...others }) => {
  return (
    <Select input={<Input />} {...others}>
      {options.map((option, index) => (
        <MenuItem key={`${options.value}-${index}`} value={option.value}>
          {options.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectInput;
