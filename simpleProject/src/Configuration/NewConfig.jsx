import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import SelectComponent from './SelectComponent'; // Assuming this is your custom select component

const lobOptions = [
  { label: 'LOB1', value: 'LOB1' },
  { label: 'LOB2', value: 'LOB2' },
  { label: 'LOB3', value: 'LOB3' },
];

const FormCreator = ({ open, onClose, rowData, onSave, isNewRecord, table }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(rowData); // Initialize formData with rowData
    setErrors({}); // Clear errors when rowData changes
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });

    // Inline validation for zipcode
    if (field === 'zipcode' && table === 'Table 2' && isNewRecord) {
      const zipcode = value || '';
      if (/^\d{5}$/.test(zipcode)) {
        setErrors({ ...errors, zipcode: '' });
      } else if (zipcode.length > 5) {
        setErrors({ ...errors, zipcode: 'Zipcode cannot be more than 5 digits.' });
      } else {
        setErrors({ ...errors, zipcode: '' });
      }
    } else {
      // Clear errors for other fields
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleBlur = (field) => {
    if (field === 'zipcode' && table === 'Table 2' && isNewRecord) {
      const zipcode = formData.zipcode || '';
      if (!/^\d{5}$/.test(zipcode) && zipcode.length > 0) {
        setErrors({ ...errors, zipcode: 'Zipcode must be exactly 5 digits.' });
      }
    }
  };

  const handleSaveClick = () => {
    if (Object.keys(errors).length === 0) {
      onSave(formData);
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
              disabled={!isNewRecord}
            />
            <TextField
              label="Username"
              value={formData.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
              margin="normal"
              fullWidth
              disabled={!isNewRecord}
            />
            <TextField
              label="Email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              margin="normal"
              fullWidth
            />
            <SelectComponent
              label="LOB"
              options={lobOptions}
              value={formData.LOB || ''}
              onChange={(value) => handleChange('LOB', value)}
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
            />
            <TextField
              label="Suite"
              value={formData.suite || ''}
              onChange={(e) => handleChange('suite', e.target.value)}
              margin="normal"
              fullWidth
            />
            <TextField
              label="City"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              margin="normal"
              fullWidth
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
        <Button onClick={handleSaveClick} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCreator;
