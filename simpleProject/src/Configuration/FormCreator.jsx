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

  useEffect(() => {
    setFormData(rowData); // Initialize formData with rowData
  }, [rowData]);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isEditable = (field) => {
    if (isNewRecord) return true; // All fields are enabled for new records
    if (table === 'Table 1' && field === 'email') return true; // Only 'email' is editable in Table 1
    if (table === 'Table 2' && (field === 'city' || field === 'zipcode')) return true; // 'city' and 'zipcode' are editable in Table 2
    return false; // Disable other fields when editing
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isNewRecord ? 'Add New Record' : 'Edit Record'}</DialogTitle>
      <DialogContent>
        {table === 'Table 1' ? (
          <>
            <TextField
              margin="dense"
              label="Name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              fullWidth
              disabled={!isEditable('name')}
            />
            <TextField
              margin="dense"
              label="Username"
              value={formData.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
              fullWidth
              disabled={!isEditable('username')}
            />
            <TextField
              margin="dense"
              label="Email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              fullWidth
              disabled={!isEditable('email')}
            />
            <SelectComponent
              label="LOB"
              value={formData.LOB || ''}
              onChange={(value) => handleChange('LOB', value)}
              options={lobOptions}
              disabled={!isEditable('LOB')}
            />
          </>
        ) : (
          <>
            <TextField
              margin="dense"
              label="Street"
              value={formData.street || ''}
              onChange={(e) => handleChange('street', e.target.value)}
              fullWidth
              disabled={!isEditable('street')}
            />
            <TextField
              margin="dense"
              label="Suite"
              value={formData.suite || ''}
              onChange={(e) => handleChange('suite', e.target.value)}
              fullWidth
              disabled={!isEditable('suite')}
            />
            <TextField
              margin="dense"
              label="City"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              fullWidth
              disabled={!isEditable('city')}
            />
            <TextField
              margin="dense"
              label="Zipcode"
              value={formData.zipcode || ''}
              onChange={(e) => handleChange('zipcode', e.target.value)}
              fullWidth
              disabled={!isEditable('zipcode')}
            />
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => onSave(formData)}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCreator;
