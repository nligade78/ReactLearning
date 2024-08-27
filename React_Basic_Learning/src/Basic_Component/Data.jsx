
import React, { useState, useEffect } from 'react';
import TextFieldComponent from '../InputesFields/TextFieldComponent';
import SelectComponent from '../InputesFields/SelectComponent';
import MultiSelectComponent from '../InputesFields/MultiSelectComponent';
import { transactionTypeOptions,lobOptions } from './Options';
// import { lobOptions, transactionTypeOptions, typeCodeOptions } from './options';
// Define all provider type options
const allProviderTypeOptions = [
  { value: "Professional Org", label: "Professional Org" },
  { value: "Individual", label: "Individual" },
  // Add other provider types if needed
];
// Define options specific to each transaction type
const transactionProviderOptions = {
  "Add Address": [{ value: "Professional Org", label: "Professional Org" }],
  "Update Linkage": [{ value: "Individual", label: "Individual" }],
  // Add other transaction types and their corresponding provider options here
};
const initialJson181 = {
  "header": {
    "transactionID":"",
    "name": "",
    "hobbies": [],
    "ticketType": ""
  },
  "Profile": {
    "abc": "",
    "keyData": {
      "IND_NPI": "",
      "ORG_NPI": "",
      "TIN": "",
      "ZIP": "",
      "SPECIALITY_CODE": "",
      "typeCode": "",
      "LOB": []
    }
  },
  "providerAddress": [
    {
      "address": {
        "id": "",
        "keyData": {
          "typeCode": "",
          "addressLine1": "",
          "zipCode": ""
        }
      }
    }
  ]
};
const initialJson182 = {
  "header": {
    "name": "",
    "hobbies": [],
    "ticketType": ""
  },
  "Profile": {
    "abc": "",
    "keyData": {
      "IND_NPI": "",
      "ORG_NPI": "",
      "TIN": "",
      "ZIP": "",
      "SPECIALITY_CODE": "",
      "typeCode": "",
      "LOB": []
    }
  },
  "providerAddress": [
    {
      "address": {
        "action": "",
        "keyData": {
          "typeCode": "",
          "addressLine1": "",
          "zipCode": ""
        }
      }
    }
  ]
};

const Data = () => {
  const [formData, setFormData] = useState(initialJson181);
  const [providerOptions, setProviderOptions] = useState(allProviderTypeOptions);
  useEffect(() => {
    // Reset provider options when formData changes to ensure the selected typeCode is valid
    const currentType = formData.Profile.keyData.typeCode;
    if (currentType) {
      const matchingOptions = allProviderTypeOptions.find(option => option.value === currentType);
      if (matchingOptions) {
        setProviderOptions([matchingOptions]);
      } else {
        setProviderOptions(allProviderTypeOptions);
      }
    } else {
      setProviderOptions(allProviderTypeOptions);
    }
  }, [formData.Profile.keyData.typeCode]);
 
  const handleTransactionTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      header: {
        ...prevState.header,
        ticketType: value,
      },
      Profile: {
        ...prevState.Profile,
        keyData: {
          ...prevState.Profile.keyData,
          typeCode: "", // Clear typeCode when changing transaction type
        },
      },
    }));
    // Update provider options based on selected transaction type
    setProviderOptions(transactionProviderOptions[value] || allProviderTypeOptions);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState };
      const keys = name.split('.');
      let current = newState;
      // Check if the field is zipCode under providerAddress
      if (keys.length === 4 && keys[0] === 'providerAddress' && keys[2] === 'keyData' && keys[3] === 'zipCode') {
        return {
          ...newState,
          providerAddress: [
            {
              ...newState.providerAddress[0],
              address: {
                ...newState.providerAddress[0].address,
                keyData: {
                  ...newState.providerAddress[0].address.keyData,
                  zipCode: value,
                },
              },
            },
          ],
        };
      }
      // Update the state for other fields
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = value;
        } else {
          current = current[key];
        }
      });
      return newState;
    });
  };
  const handleMultiSelectChange = (event) => {
    const {
      target: { value, name },
    } = event;
    setFormData((prevState) => {
      const newState = { ...prevState };
      const keys = name.split('.');
      let current = newState;
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          current[key] = typeof value === 'string' ? value.split(',') : value;
        } else {
          current = current[key];
        }
      });
      return newState;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted JSON:', formData);
  };
  const handleClear = () => {
    setFormData((prevState) => {
      const newFormData = { ...prevState };
      newFormData.header.ticketType = "";
      newFormData.Profile.keyData.IND_NPI = "";
      newFormData.Profile.keyData.ORG_NPI = "";
      newFormData.Profile.keyData.TIN = "";
      newFormData.Profile.keyData.ZIP = "";
      newFormData.Profile.keyData.SPECIALITY_CODE = "";
      newFormData.Profile.keyData.LOB = [];
      newFormData.providerAddress[0].address.id = "";
      newFormData.providerAddress[0].address.keyData.zipCode = "";
      return newFormData;
    });
    // Reset to show all provider type options on clear
    setProviderOptions(allProviderTypeOptions);
  };
  return (
    <div>
      <h1>Dynamic JSON Form</h1>
      <form onSubmit={handleSubmit}>
        <SelectComponent
          label="Transaction Type"
          name="header.ticketType"
          value={formData.header.ticketType || ''}
          onChange={handleTransactionTypeChange}
          options={transactionTypeOptions}
        />
      
        <TextFieldComponent
          label="IND_NPI"
          name="Profile.keyData.IND_NPI"
          value={formData.Profile.keyData.IND_NPI || ''}
          onChange={handleChange}
        />
        <TextFieldComponent
          label="ORG_NPI"
          name="Profile.keyData.ORG_NPI"
          value={formData.Profile.keyData.ORG_NPI || ''}
          onChange={handleChange}
        />
        <TextFieldComponent
          label="TIN"
          name="Profile.keyData.TIN"
          value={formData.Profile.keyData.TIN || ''}
          onChange={handleChange}
        />
        <TextFieldComponent
          label="SPECIALITY_CODE"
          name="Profile.keyData.SPECIALITY_CODE"
          value={formData.Profile.keyData.SPECIALITY_CODE || ''}
          onChange={handleChange}
        />
        <MultiSelectComponent
          label="LOB"
          name="Profile.keyData.LOB"
          value={formData.Profile.keyData.LOB || []}
          onChange={handleMultiSelectChange}
          options={lobOptions}
        />
        <TextFieldComponent
          label="Address ID"
          name="providerAddress.0.address.id"
          value={formData.providerAddress[0].address.id || ''}
          onChange={handleChange}
        />
        <TextFieldComponent
          label="ZIP Code"
          name="providerAddress.0.keyData.zipCode"
          value={formData.providerAddress[0].address.keyData.zipCode || ''}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </form>
      <h2>Generated JSON:</h2>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};
export default Data;
