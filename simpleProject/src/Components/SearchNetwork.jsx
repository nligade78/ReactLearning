import React, { useState } from 'react';
import { add_linkage } from '../InputPayload/add_linkage';
import { transactionTypeOptions } from '../Constants/Constants';
import SelectComponent from '../InputesFields/SelectComponent';
import TextFieldComponent from '../InputesFields/TextFieldComponent';

const SearchNetwork = () => {
  const [formData, setFormData] = useState(add_linkage);
  const [networkData, setNetworkData] = useState([]);
  const [descriptionOptions, setDescriptionOptions] = useState([]); // State to store description options
  const [loading, setLoading] = useState(false);

  const handleTransactionTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      header: {
        ...prevState.header,
        ticketType: value,
      },
    }));
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      const newState = { ...prevState };
      const keys = name.split('.');
      let current = newState;

      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          if (name === 'description') {
            // Extract only the id part before the first hyphen
            const id = value.split('-')[0];
            current['profile']['keyData']['taxonomyCd'] = id;
          } else {
            current[key] = value;
          }
        } else {
          current = current[key];
        }
      });

      return newState;
    });

    // Trigger API call when masterProvID changes
    if (name === 'profile.masterProvID' && value) {
      setLoading(true);
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${value}`);
        const data = await response.json();

        // Update descriptionOptions with concatenated id and title
        const options = data.map(item => ({
          value: `${item.id}-${item.title}`, // Store the full concatenated value
          label: `${item.id} - ${item.title}`,
        }));

        setDescriptionOptions(options);
      } catch (error) {
        console.error('Error fetching data:', error);
        setDescriptionOptions([]); // Clear options on error
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Handle submit logic
  };

  // Function to get the correct option label to display
  const getSelectedDescriptionLabel = () => {
    const selectedId = formData.profile.keyData.taxonomyCd;
    const selectedOption = descriptionOptions.find(option => option.value.startsWith(`${selectedId}-`));
    return selectedOption ? selectedOption.value : '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectComponent
        label="Transaction type"
        name="formData.header.ticketType"
        value={formData.header.ticketType || ''}
        onChange={handleTransactionTypeChange}
        options={transactionTypeOptions}
      />

      <TextFieldComponent
        label="Master Prov ID"
        name="profile.masterProvID"
        value={formData.profile.masterProvID || ''}
        onChange={handleChange}
      />

      <SelectComponent
        label="Description"
        name="description"
        value={getSelectedDescriptionLabel()} // Use the function to get the correct label
        onChange={handleChange}
        options={descriptionOptions}
        disabled={!descriptionOptions.length} // Disable if no options available
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};

export default SearchNetwork;
