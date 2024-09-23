import React from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = ({ label, name, value, onChange, size = 'small' }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      size={size}
      sx={{
        fontSize: '0.75rem', // Smaller font size for the input
        '& .MuiInputBase-input': {
          fontSize: '0.75rem', // Smaller font size for text input
          padding: '8px 12px', // Adjust padding
        },
        '& .MuiFormLabel-root': {
          fontSize: '0.75rem', // Smaller font size for label
        },
      }}
    />
  );
};

export default TextFieldComponent;
