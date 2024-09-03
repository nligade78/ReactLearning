import React from 'react';
import { Checkbox, FormControl, InputLabel, MenuItem, ListItemText, Select } from '@mui/material';

const MultiSelectComponent = ({ label, name, value, onChange, options, disabled }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(e) => onChange({ target: { name, value: e.target.value } })}
        renderValue={(selected) => selected.join(', ')}  // Correctly render the selected values
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.includes(option.value)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectComponent;
