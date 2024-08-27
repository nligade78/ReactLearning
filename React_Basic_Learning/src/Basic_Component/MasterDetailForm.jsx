import React, { useState } from 'react';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Typography, Container } from '@mui/material';

const MasterDetailForm = () => {
  const [userId, setUserId] = useState('');
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [descriptionId, setDescriptionId] = useState('');
  const [additionalField1, setAdditionalField1] = useState('');
  const [additionalField2, setAdditionalField2] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [error, setError] = useState('');

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleUserIdBlur = () => {
    if (transactionType === 'Add Address') return;

    if (!userId) {
      setError('Please enter a valid User ID.');
      setDescriptionOptions([]);
      return;
    }

    setError('');
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((item) => ({
          id: item.id,
          label: `${item.id} - ${item.title}`
        }));
        setDescriptionOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setDescriptionOptions([]);
      });
  };

  const handleDescriptionChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = descriptionOptions.find(option => option.label === selectedValue);
    setSelectedDescription(selectedValue);
    setDescriptionId(selectedOption ? selectedOption.id : '');
  };

  const handleAdditionalField1Change = (e) => {
    setAdditionalField1(e.target.value);
  };

  const handleAdditionalField2Change = (e) => {
    setAdditionalField2(e.target.value);
  };

  // const handleTransactionTypeChange = (e) => {
  //   setTransactionType(e.target.value);
  //   if (e.target.value === 'Add Address') {
  //     setDescriptionOptions([]);
  //     setSelectedDescription('');
  //   }
  // };

  const handleTransactionTypeChange = (e) => {  
    const { value } = e.target;

    // Update the transaction type in the form data
    setFormData((prevState) => ({
        ...prevState,
        header: {
            ...prevState.header,
            ticketType: value,
        }
    }));

    // Additional logic when the transaction type changes
    setTransactionType(value);
    if (value === 'Add Address') {
      setDescriptionOptions([]);
      setSelectedDescription('');
    }
};


  const handleSubmit = () => {
    if (transactionType === 'Update Linkage' && !descriptionId) {
      setError('Please select a valid description.');
      return;
    }

    setError('');
    const jsonObject = {
      profile: {
        masterProvId: userId,
        keyData: {
          taxonomyCd: descriptionId,
          type: transactionType,
          field1: additionalField1,
          field2: additionalField2
        }
      }
    };

    // Print JSON object to console
    console.log('Submitted Data:', jsonObject);
  };

  return (
    <Container style={{ padding: '20px', maxWidth: '600px', backgroundColor: 'white' }}>
      <FormControl fullWidth margin="normal">
        <InputLabel>Transaction Type</InputLabel>
        <Select
          label="Transaction Type"
          value={transactionType}
          onChange={handleTransactionTypeChange}
        >
          <MenuItem value="">
            <em>Select Transaction Type</em>
          </MenuItem>
          <MenuItem value="Add Address">Add Address</MenuItem>
          <MenuItem value="Update Linkage">Update Linkage</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Master ID"
          variant="outlined"
          value={userId}
          onChange={handleUserIdChange}
          onBlur={handleUserIdBlur}
          error={!!error}
          helperText={error}
        />
      </FormControl>

      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Description</InputLabel>
        <Select
          label="Description"
          value={selectedDescription}
          onChange={handleDescriptionChange}
          disabled={transactionType === 'Add Address'}
        >
          <MenuItem value="">
            <em>Select a description</em>
          </MenuItem>
          {descriptionOptions.map((option, index) => (
            <MenuItem key={index} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Additional Field 1"
          variant="outlined"
          value={additionalField1}
          onChange={handleAdditionalField1Change}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="Additional Field 2"
          variant="outlined"
          value={additionalField2}
          onChange={handleAdditionalField2Change}
        />
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
    </Container>
  );
};

export default MasterDetailForm;


