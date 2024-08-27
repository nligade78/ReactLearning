import React from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = ({ label, name, value, onChange }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextFieldComponent;
