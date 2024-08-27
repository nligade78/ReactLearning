import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectComponent = ({ label, name, value, onChange, options = [] }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
