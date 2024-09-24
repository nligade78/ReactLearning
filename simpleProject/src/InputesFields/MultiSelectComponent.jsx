import React from 'react';
import { Checkbox, FormControl, InputLabel, MenuItem, ListItemText, Select, Typography } from '@mui/material';

const MultiSelectComponent = ({ label, name, value, onChange, options = [], disabled ,size = 'small' }) => {
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
        multiple
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
        renderValue={(selected) => selected.join(', ')}  // Correctly render the selected values
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              fontSize: '0.70rem', // Reduced font size for dropdown options
              fontFamily: 'Arial, sans-serif', // Custom font for options
            }}
          >
            <Checkbox
              checked={value.includes(option.value)}
              sx={{
                padding: '4px', // Reduce padding around the checkbox
                transform: 'scale(0.8)', // Scale down the checkbox size
              }}
            />
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontSize: '0.70rem', // Set the font size for the option text
                  }}
                >
                  {option.label}
                </Typography>
              }
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectComponent;
