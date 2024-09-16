import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from './DataTable'; // Table component with DataGrid
import TableSelector from './TableSelector'; // Table selector component
import FormCreator from './FormCreator'; // Modal form component

const Configurations = () => {
  const [selectedTable, setSelectedTable] = useState('Table 1');
  const [rowsTable1, setRowsTable1] = useState([]);
  const [rowsTable2, setRowsTable2] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch data for Table 1
    fetch('automationUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ configFlag: 'Automation' }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRowsTable1(
          data.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          }))
        );
      });
  }, []);

  useEffect(() => {
    // Fetch data for Table 2
    fetch('contiguousUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ configFlag: 'Contiguous' }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRowsTable2(
          data.map((user) => ({
            id: user.id,
            street: user.address.street,
            suite: user.address.suite,
            city: user.address.city,
            zipcode: user.address.zipcode,
          }))
        );
      });
  }, []);

  const columnsTable1 = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'username', headerName: 'Username', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
  ];

  const columnsTable2 = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
    { field: 'street', headerName: 'Street', width: 150, editable: false },
    { field: 'suite', headerName: 'Suite', width: 150, editable: false },
    { field: 'city', headerName: 'City', width: 150, editable: true },
    { field: 'zipcode', headerName: 'Zipcode', width: 150, editable: true },
  ];

  const handleTableChange = (table) => {
    setSelectedTable(table);
  };

  const handleEdit = (row) => {
    setEditRowData(row);
    setIsNewRecord(false);
    setEditDialogOpen(true);
  };

  const handleAddNewRecord = () => {
    setEditRowData({});
    setIsNewRecord(true);
    setEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
  };

  const handleSave = (data) => {
    // Validate zipcode for Table 2 if it's a new record
    if (selectedTable === 'Table 2' && isNewRecord && (data.zipcode || '').length !== 5) {
      setErrorMessage('Zipcode must be exactly 5 digits.');
      setErrorDialogOpen(true);
      return;
    }

    // Save data logic
    if (selectedTable === 'Table 1') {
      setRowsTable1((prev) =>
        prev.map((row) => (row.id === data.id ? data : row))
      );
    } else if (selectedTable === 'Table 2') {
      setRowsTable2((prev) =>
        prev.map((row) => (row.id === data.id ? data : row))
      );
    }
    setEditDialogOpen(false);
  };

  const handleErrorClose = () => {
    setErrorDialogOpen(false);
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h6">Configurations</Typography>
          <TableSelector onChange={handleTableChange} />
          <Button variant="contained" color="primary" onClick={handleAddNewRecord}>
            Add New Record
          </Button>
          <DataTable
            rows={selectedTable === 'Table 1' ? rowsTable1 : rowsTable2}
            columns={selectedTable === 'Table 1' ? columnsTable1 : columnsTable2}
          />
        </CardContent>
      </Card>
      <FormCreator
        open={editDialogOpen}
        onClose={handleCloseDialog}
        rowData={editRowData}
        onSave={handleSave}
        isNewRecord={isNewRecord}
        table={selectedTable}
       
      />
      <Dialog open={errorDialogOpen} onClose={handleErrorClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{errorMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleErrorClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Configurations;
