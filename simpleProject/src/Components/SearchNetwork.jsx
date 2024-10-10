import React, { useState, useEffect } from 'react';
import { add_linkage } from '../InputPayload/add_linkage';
import SelectComponent from '../InputesFields/SelectComponent';
import TextFieldComponent from '../InputesFields/TextFieldComponent';
import { transactionTypeOptions } from '../Constants/Constants';
import NetworkTable from '../Table/NetworkTable';

const SearchNetwork = () => {
  const [formData, setFormData] = useState(add_linkage); // Initial form data
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // State to store data to send to NetworkTable
  const [formErrors, setFormErrors] = useState({}); // State for form errors
  const [masterProvIDLabel, setMasterProvIDLabel] = useState('Master Prov ID'); // State to manage label
  const [lobLabel, setLobLabel] = useState('LOB'); // State to manage label

  // Handle transaction type change
  const handleTransactionTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      header: {
        ...prevState.header,
        ticketType: value,
      },
    }));

    // Change label based on the selected transaction type
    if (value === 'Add Address') {
      setMasterProvIDLabel('Org Prov ID');
      setLobLabel('Org LOB')
      setData([]); // Clear data for 'Add Address'
    } else {
      setMasterProvIDLabel('IND Prov ID'); // Default label
      setLobLabel('IND LOB')
    }
  };

// Handle input field changes
const handleChange = async (e) => {
  const { name, value } = e.target;
  setFormData((prevState) => {
    const newState = { ...prevState };
    const keys = name.split('.');
    let current = newState;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        if (name === 'description') {
          const ids = value.map((v) => v.split('-')[0]);
          current['profile']['keyData']['taxonomyCd'] = ids;
        } else {
          current[key] = value;
        }
      } else {
        current = current[key];
      }
    });

    return newState;
  });

  // Check if the transaction type is "Update Linkage" and masterProvID is numeric before calling the API
  if (name === 'profile.masterProvID' && formData.header.ticketType === 'Update Linkage') {
    if (validateNumeric(value)) {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${value}`);
        const data = await response.json();

        const options = data.map((item) => ({
          value: `${item.id}-${item.title}-${item.completed}`,
          label: `${item.id} - ${item.title} - ${item.completed}`,
        }));

        const npiOptions = data.map((item) => ({
          value: `${item.NPI}`,
          label: `NPI: ${item.NPI}`,
          primary: item.PRIMARY_SPCLTY_IND === 'Y' ? true : false,
        }));

        setDescriptionOptions(options);

        const firstPrimarySpecialty = data.find((item) => item.PRIMARY_SPCLTY_IND === 'Y');
        if (firstPrimarySpecialty) {
          setFormData((prevState) => ({
            ...prevState,
            profile: {
              ...prevState.profile,
              keyData: {
                ...prevState.profile.keyData,
                taxonomyCd: [`${firstPrimarySpecialty.id}`],
              },
              npi: firstPrimarySpecialty.NPI, // Set NPI for primary specialty
            },
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setDescriptionOptions([]);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Master Prov ID is not a valid number");
    }
  }
};

// Handle clearing form and table data
const handleClear = () => {
  setFormData(add_linkage); // Reset form data
  setData([]); // Clear data sent to NetworkTable
  setFormErrors({}); // Clear form errors
};

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Submitted Data:', formData);
};

// Function to get selected description labels
const getSelectedDescriptionLabels = () => {  
  const selectedIds = formData.profile.keyData.taxonomyCd || [];
  const selectedOptions = descriptionOptions.filter(
    (option) => selectedIds.includes(option.value.split('-')[0])
  );
  return selectedOptions.map((option) => option.value);
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SelectComponent
          label="Transaction type"
          name="transactionType"
          value={formData.header.ticketType || ''}
          onChange={handleTransactionTypeChange}
          options={transactionTypeOptions}
        />

        <TextFieldComponent
          label={masterProvIDLabel} // Use dynamic label
          name="profile.masterProvID"
          value={formData.profile.masterProvID || ''}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e, setFormErrors)} // Validate on blur
          error={!!formErrors['profile.masterProvID']} // Pass error state
          helperText={formErrors['profile.masterProvID']} // Show error message
        />

        <TextFieldComponent
          label={lobLabel}
          name="profile.lob"
          value={formData.profile.lob || ''}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e, setFormErrors)} // Validate on blur
          error={!!formErrors['profile.lob']} // Pass error state
          helperText={formErrors['profile.lob']} // Show error message
        />

        <TextFieldComponent
          label="Market"
          name="profile.market"
          value={formData.profile.market || ''}
          onChange={handleChange}
        />

        <SelectComponent
          label="Description"
          name="description"
          value={getSelectedDescriptionLabels()}
          onChange={handleChange}
          options={descriptionOptions}
          disabled={!descriptionOptions.length}
        />

        <TextFieldComponent
          label="NPI"
          name="profile.npi"
          value={formData.profile.npi || ''}
          onChange={handleChange}
          disabled={loading} // Disable the NPI field while loading
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>

      <NetworkTable transactionType={formData.header.ticketType} data={data} />
    </div>
  );
};

export default SearchNetwork;
