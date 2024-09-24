import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectComponent = ({ label, name, value, onChange, options = [], size = 'small' }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel
        sx={{
          fontSize: '0.75rem', // Smaller font size for the label
          top: size === 'small' ? -1 : 0, // Adjust label position based on size
        }}
      >
        {label}
      </InputLabel>
      <Select
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        size={size}
        sx={{
          '.MuiSelect-select': {
            fontSize: '0.75rem', // Smaller font size for the selected value
            padding: '10px 8px', // Adjust padding
          },
          '.MuiSelect-icon': {
            top: size === 'small' ? 'calc(50% - 12px)' : 'calc(50% - 16px)', // Adjust icon position
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: '0.75rem', // Smaller font size for dropdown options
              fontFamily: 'Arial, sans-serif', // Custom font for options
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;