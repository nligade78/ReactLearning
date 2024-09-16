import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import SelectComponent from '../InputesFields/SelectComponent';

const lobOptions = [
  { label: 'LOB1', value: 'LOB1' },
  { label: 'LOB2', value: 'LOB2' },
  { label: 'LOB3', value: 'LOB3' },
];

const FormCreator = ({ open, onClose, rowData, onSave, isNewRecord, table }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(rowData || {}); // Initialize formData with rowData
    setErrors({}); // Clear errors when rowData changes
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors((prev) => ({ ...prev, [field]: '' })); // Clear error when user starts typing
  };

  const validateFields = () => {
    let newErrors = {};
    if (table === 'Table 1') {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.LOB) newErrors.LOB = 'LOB is required';
    } else if (table === 'Table 2') {
      if (!formData.street) newErrors.street = 'Street is required';
      if (!formData.suite) newErrors.suite = 'Suite is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.zipcode) newErrors.zipcode = 'Zipcode is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateFields()) {
      onSave(formData);
    }
  };

  const handleBlur = (field) => {
    if (field === 'zipcode' && table === 'Table 2' && isNewRecord) {
      const zipcode = formData.zipcode || '';
      if (zipcode.length > 0 && !/^\d{5}$/.test(zipcode)) {
        setErrors({ ...errors, zipcode: 'Zipcode must be exactly 5 digits.' });
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isNewRecord ? 'Add New Record' : 'Edit Record'}</DialogTitle>
      <DialogContent>
        {table === 'Table 1' && (
          <>
            <TextField
              label="Name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              margin="normal"
              fullWidth
              error={Boolean(errors.name)}
              helperText={errors.name}
              disabled={!isNewRecord}
            />
            <TextField
              label="Username"
              value={formData.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
              margin="normal"
              fullWidth
              error={Boolean(errors.username)}
              helperText={errors.username}
              disabled={!isNewRecord}
            />
            <TextField
              label="Email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              margin="normal"
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
            <SelectComponent
              label="LOB"
              options={lobOptions}
              value={formData.LOB || ''}
              onChange={(value) => handleChange('LOB', value)}
              error={Boolean(errors.LOB)}
              helperText={errors.LOB}
              disabled={!isNewRecord}
            />
          </>
        )}
        {table === 'Table 2' && (
          <>
            <TextField
              label="Street"
              value={formData.street || ''}
              onChange={(e) => handleChange('street', e.target.value)}
              margin="normal"
              fullWidth
              error={Boolean(errors.street)}
              helperText={errors.street}
            />
            <TextField
              label="Suite"
              value={formData.suite || ''}
              onChange={(e) => handleChange('suite', e.target.value)}
              margin="normal"
              fullWidth
              error={Boolean(errors.suite)}
              helperText={errors.suite}
            />
            <TextField
              label="City"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              margin="normal"
              fullWidth
              error={Boolean(errors.city)}
              helperText={errors.city}
            />
            <TextField
              label="Zipcode"
              value={formData.zipcode || ''}
              onChange={(e) => handleChange('zipcode', e.target.value)}
              onBlur={() => handleBlur('zipcode')}
              margin="normal"
              fullWidth
              error={Boolean(errors.zipcode)}
              helperText={errors.zipcode}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCreator;
