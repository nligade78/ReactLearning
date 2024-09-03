import React from 'react';
import { Checkbox, FormControl, InputLabel, MenuItem, ListItemText, Select } from '@mui/material';

const MultiSelectComponent = ({ label, name, value, onChange, options, disabled }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(e) => onChange({ target: { name, value: e.target.value } })}
        renderValue={(selected) => selected.join(', ')}  // Correctly render the selected values
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.includes(option.value)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectComponent;

const handleMarketChange = (e) => {
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      header: {
        ...prevState.header,
        originalDetails: {
          ...prevState.header.originalDetails,
          contractState: value,  // Set contractState in header
        },
      },
      providerAddress: [
        {
          ...prevState.providerAddress[0],
          address: {
            ...prevState.providerAddress[0].address,
            keyData: {
              ...prevState.providerAddress[0].address.keyData,
              state: value,  // Set state in providerAddress
            },
          },
        },
      ],
    }));
  };

--------------

  // Separate options based on PRIMARY_SPCLTY_IND
      const primarySpecialty = data.find(item => item.PRIMARY_SPCLTY_IND === 'Y');
      const otherSpecialties = data.filter(item => item.PRIMARY_SPCLTY_IND !== 'Y').map(item => ({
        value: `${item.SPCLTY_CD}-${item.SPCLTY_DESC}-${item.PRIMARY_SPCLTY_IND}`,
        label: `${item.SPCLTY_CD} - ${item.SPCLTY_DESC} - ${item.PRIMARY_SPCLTY_IND}`,
      }));

      // Populate the description field with the primary specialty directly
      if (primarySpecialty) {
        setFormData(prevState => ({
          ...prevState,
          profile: {
            ...prevState.profile,
            keyData: {
              ...prevState.profile.keyData,
              specialityCd: primarySpecialty.SPCLTY_CD,
            },
          },
        }));
      }

      setDescriptionOptions(otherSpecialties);
