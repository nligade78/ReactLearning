import React from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = ({ label, name, value, onChange, onBlur, size = 'small', error, helperText }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      size={size}
      error={error}  // <-- Apply error state
      helperText={helperText}  // <-- Optional helper text to show the error message
      sx={{
        fontSize: '0.75rem', // Smaller font size for the input
        '& .MuiInputBase-input': {
          fontSize: '0.75rem', // Smaller font size for text input
          // padding: '10px 80px', // Adjust padding
          padding: '10px 8px',
        },
        '& .MuiFormLabel-root': {
          fontSize: '0.75rem', // Smaller font size for label
          marginTop:'3px'
        },
        '& .MuiOutlinedInput-root.Mui-error': {
          '& fieldset': {
            borderColor: 'red', // <-- Red border when error is true
          },
        },
      }}
    />
  );
};

export default TextFieldComponent;
