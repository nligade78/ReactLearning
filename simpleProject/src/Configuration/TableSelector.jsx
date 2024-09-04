import React from 'react';
import { Select, MenuItem, Button } from '@mui/material';

const TableSelector = ({ selectedTable, onTableChange, onAddNewRecord }) => {
  return (
    <div>
      <Select
        value={selectedTable}
        onChange={(e) => onTableChange(e.target.value)}
        sx={{ marginBottom: 2, width: '100%' }}
      >
        <MenuItem value="Table 1">Table 1</MenuItem>
        <MenuItem value="Table 2">Table 2</MenuItem>
      </Select>
      <Button variant="contained" color="primary" onClick={onAddNewRecord} sx={{ marginBottom: 2 }}>
        Add New Record
      </Button>
    </div>
  );
};

export default TableSelector;
