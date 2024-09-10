import React, { useState, useEffect,useContext } from 'react';
import { add_linkage } from '../InputPayload/add_linkage';
import { add_address } from '../InputPayload/add_address';
import { transactionTypeOptions } from '../Constants/Constants';
import TextFieldComponent from '../InputesFields/TextFieldComponent';
import SelectComponent from '../InputesFields/SelectComponent';
import { AuthContext } from '../Hooks/AuthProvider';


const SearchNetwork = () => {
  const { user } = useContext(AuthContext);
  console.log(user, "user");
  const [formData, setFormData] = useState(add_linkage);
  const [descriptionOptions, setDescriptionOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData((prevState) => ({
        ...prevState,
        header: {
          ...prevState.header,
          originalDetails: {
            ...prevState.header.originalDetails,
            requestors: [
              {
                firstName: user.firstName || '',
                lastname: user.lastname || '',
                email: user.email || '',
              },
            ],
          },
        },
      }));
    }
  }, [user]);

  const handleTransactionTypeChange = (e) => {
    const { value } = e.target;

    // Set the payload based on the selected transaction type
    const newFormData = value === 'Add Address' ? add_address : add_linkage;
    setFormData((prevState) => ({
      ...newFormData,
      header: {
        ...newFormData.header,
        ticketType: value,
        originalDetails: {
          ...newFormData.header.originalDetails,
          requestors: prevState.header.originalDetails.requestors, // Preserve user details
        },
      },
    }));

    // Clear the table rows if the transaction type is 'Add Address'
    if (value === 'Add Address') {
      setRows([]);
    }
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

    if (name === 'profile.masterProvID' && value) {
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
    }
  };

  const handleClear = () => {
    setFormData(add_linkage);
    setRows([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);

    if (formData.header.ticketType === 'Update Linkage') {
      setRows([
        { id: 1, state: 'NY', con_state: 'NY', sourceCode: '123', sourceCodeText: 'Example Text' },
      ]);
    } else {
      setRows([]);
    }
  };

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
          label="Master Prov ID"
          name="profile.masterProvID"
          value={formData.profile.masterProvID || ''}
          onChange={handleChange}
        />

        <TextFieldComponent
          label="LOB"
          name="profile.lob"
          value={formData.profile.lob || ''}
          onChange={handleChange}
        />

        <TextFieldComponent
          label="Market"
          name="profile.market"
          value={formData.profile.market || ''}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default SearchNetwork;
