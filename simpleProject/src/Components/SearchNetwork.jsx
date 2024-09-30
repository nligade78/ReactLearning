import React, { useState, useEffect } from 'react';
import { add_linkage } from '../InputPayload/add_linkage';
import MultiSelectComponent from '../InputesFields/MultiSelectComponent';
import SelectComponent from '../InputesFields/SelectComponent';
import TextFieldComponent from '../InputesFields/TextFieldComponent';
import { transactionTypeOptions } from '../Constants/Constants';
import NetworkTable from '../Table/NetworkTable';
import { handleBlur, validateNumeric } from './validation'; // Import the handleBlur and validation function

const SearchNetwork = () => {
  const [formData, setFormData] = useState(add_linkage); // Initial form data
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [npiOptions, setNpiOptions] = useState([]); // NPI options
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // State to store data to send to NetworkTable
  const [formErrors, setFormErrors] = useState({}); // State for form errors

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

    if (value === 'Add Address') {
      setData([]); // Clear data for 'Add Address'
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

          setDescriptionOptions(options);

          const firstCompletedTrue = data.find((item) => item.completed);
          if (firstCompletedTrue) {
            setFormData((prevState) => ({
              ...prevState,
              profile: {
                ...prevState.profile,
                keyData: {
                  ...prevState.profile.keyData,
                  taxonomyCd: [`${firstCompletedTrue.id}`],
                },
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

  // Populate NPI options based on PRIMARY_SPCLTY_IND
  useEffect(() => {
    const npiList = add_linkage.map((item) => ({
      value: item.NPI,
      label: `${item.NPI} - ${item.SPCLTY_DESC}`,
      primary: item.PRIMARY_SPCLTY_IND === 'Y',
    }));

    const selectedNpis = npiList
      .filter((item) => item.primary)
      .map((item) => item.value);

    setNpiOptions(npiList);
    setFormData((prevState) => ({
      ...prevState,
      profile: {
        ...prevState.profile,
        npi: selectedNpis, // Pre-select NPIs where PRIMARY_SPCLTY_IND is 'Y'
      },
    }));
  }, []);

  // Function to get selected description labels
  const getSelectedDescriptionLabels = () => {  
    const selectedIds = formData.profile.keyData.taxonomyCd || [];
    const selectedOptions = descriptionOptions.filter(
      (option) => selectedIds.includes(option.value.split('-')[0])
    );
    return selectedOptions.map((option) => option.value);
  };

  const getSelectedNpiLabels = () => {
    const selectedNpis = formData.profile.npi || [];
    const selectedOptions = npiOptions.filter(
      (option) => selectedNpis.includes(option.value)
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
          label="Master Prov ID"
          name="profile.masterProvID"
          value={formData.profile.masterProvID || ''}
          onChange={handleChange}
          onBlur={(e) => handleBlur(e, setFormErrors)} // Validate on blur
          error={!!formErrors['profile.masterProvID']} // Pass error state
          helperText={formErrors['profile.masterProvID']} // Show error message
        />

        <TextFieldComponent
          label="LOB"
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

        <MultiSelectComponent
          label="Description"
          name="description"
          value={getSelectedDescriptionLabels()}
          onChange={handleChange}
          options={descriptionOptions}
          disabled={!descriptionOptions.length}
        />

        <MultiSelectComponent
          label="NPI"
          name="npi"
          value={getSelectedNpiLabels()}
          onChange={handleChange}
          options={npiOptions}
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
