import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

const MultiSelectComponent = ({ label, name, value, onChange, options = [] }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        multiple
        renderValue={(selected) => selected.join(', ')}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectComponent;
