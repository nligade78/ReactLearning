import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import TextFieldComponent from '../InputesFields/TextFieldComponent';
import SelectComponent from '../InputesFields/SelectComponent';

const lobOptions = [
  { label: 'LOB1', value: 'LOB1' },
  { label: 'LOB2', value: 'LOB2' },
  { label: 'LOB3', value: 'LOB3' },
];

const FormCreator = ({ open, onClose, rowData, onSave, isNewRecord, table }) => {
  const [formData, setFormData] = useState({});
  const [touched, setTouched] = useState({}); // Tracks which fields have been touched
  const [errors, setErrors] = useState({});
  const [isSaveDisabled, setIsSaveDisabled] = useState(true); // Save button state

  useEffect(() => {
    setFormData(rowData || {}); // Initialize formData with rowData
    setTouched({}); // Reset touched state when rowData changes
    setErrors({}); // Clear errors when rowData changes
    setIsSaveDisabled(true); // Disable save button initially
  }, [rowData]);

  // Function to compare formData with original rowData
  const isFormDataChanged = (newFormData) => {
    return JSON.stringify(newFormData) !== JSON.stringify(rowData);
  };

  const handleChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };

    // Update form data and touched state
    setFormData(updatedFormData);
    setTouched({ ...touched, [field]: true });

    // Validate specific fields (zipcode in this case)
    if (field === 'zipcode' && table === 'Table 2') {
      const zipcode = value || '';
      if (zipcode.length > 5) {
        setErrors({ ...errors, zipcode: 'Zipcode cannot be more than 5 digits.' });
      } else {
        setErrors({ ...errors, zipcode: '' });
      }
    }

    // Enable/Disable the save button based on changes
    setIsSaveDisabled(!isFormDataChanged(updatedFormData));
  };

  const handleBlur = (field) => {
    // Only validate the field if it has been touched
    if (touched[field]) {
      if (field === 'zipcode' && table === 'Table 2') {
        const zipcode = formData.zipcode || '';
        if (zipcode.length > 0 && !/^\d{5}$/.test(zipcode)) {
          setErrors({ ...errors, zipcode: 'Zipcode must be exactly 5 digits.' });
        }
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isNewRecord ? 'Add New Record' : 'Edit Record'}</DialogTitle>
      <DialogContent>
        {table === 'Table 1' && (
          <>
            <TextFieldComponent
              label="Name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              margin="normal"
              fullWidth
              disabled={!isNewRecord}
              onBlur={() => setTouched({ ...touched, name: true })}
            />
            <TextFieldComponent
              label="Username"
              value={formData.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
              margin="normal"
              fullWidth
              disabled={!isNewRecord}
              onBlur={() => setTouched({ ...touched, username: true })}
            />
            <TextFieldComponent
              label="Email"
              value={formData.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              margin="normal"
              fullWidth
              onBlur={() => setTouched({ ...touched, email: true })}
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
            <TextFieldComponent
              label="Street"
              value={formData.street || ''}
              onChange={(e) => handleChange('street', e.target.value)}
              margin="normal"
              fullWidth
              onBlur={() => setTouched({ ...touched, street: true })}
            />
            <TextFieldComponent
              label="Suite"
              value={formData.suite || ''}
              onChange={(e) => handleChange('suite', e.target.value)}
              margin="normal"
              fullWidth
              onBlur={() => setTouched({ ...touched, suite: true })}
            />
            <TextFieldComponent
              label="City"
              value={formData.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              margin="normal"
              fullWidth
              onBlur={() => setTouched({ ...touched, city: true })}
            />
            <TextFieldComponent
              label="Zipcode"
              value={formData.zipcode || ''}
              onChange={(e) => handleChange('zipcode', e.target.value)}
              onBlur={() => {
                setTouched({ ...touched, zipcode: true });
                handleBlur('zipcode');
              }}
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
        <Button onClick={() => onSave(formData)} color="primary" disabled={isSaveDisabled}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormCreator;
