import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FormCreator from './FormCreator';
import DataTable from './DataTable';
import TableSelector from './TableSelector';

const Configurations = () => {
  const [selectedTable, setSelectedTable] = useState('Table 1');
  const [rowsTable1, setRowsTable1] = useState([]);
  const [rowsTable2, setRowsTable2] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [isNewRecord, setIsNewRecord] = useState(false);

  useEffect(() => {
    // Fetch data from API and set it for Table 1 and Table 2
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setRowsTable1(data.map(user => ({
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        })));

        setRowsTable2(data.map(user => ({
          id: user.id,
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
        })));
      });
  }, []);

  const columnsTable1 = [
    { field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => (
      <IconButton onClick={() => handleEdit(params.row)} color="primary">
        <EditIcon />
      </IconButton>
    )},
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'username', headerName: 'Username', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 200, editable: true }, // Only this column is editable
  ];

  const columnsTable2 = [
    { field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => (
      <IconButton onClick={() => handleEdit(params.row)} color="primary">
        <EditIcon />
      </IconButton>
    )},
    { field: 'street', headerName: 'Street', width: 150, editable: false },
    { field: 'suite', headerName: 'Suite', width: 150, editable: false },
    { field: 'city', headerName: 'City', width: 150, editable: true }, // Editable
    { field: 'zipcode', headerName: 'Zipcode', width: 150, editable: true }, // Editable
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

  const handleSave = async (rowData) => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/users'; // Replace with your actual endpoint

      const jsonPayload = selectedTable === 'Table 1' 
        ? {
            id: rowData.id,
            name: rowData.name,
            username: rowData.username,
            email: rowData.email,
          }
        : {
            id: rowData.id,
            address: {
              street: rowData.street,
              suite: rowData.suite,
              city: rowData.city,
              zipcode: rowData.zipcode,
            },
          };

      const response = await fetch(url, {
        method: isNewRecord ? 'POST' : 'PUT', // Use POST for new records, PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = await response.json();
      console.log(updatedData,"respo");

      if (isNewRecord) {
        if (selectedTable === 'Table 1') {
          setRowsTable1([...rowsTable1, { ...rowData, id: updatedData.id }]);
        } else {
          setRowsTable2([...rowsTable2, { ...rowData, id: updatedData.id }]);
        }
      } else {
        if (selectedTable === 'Table 1') {
          setRowsTable1(rowsTable1.map((row) => (row.id === rowData.id ? rowData : row)));
        } else {
          setRowsTable2(rowsTable2.map((row) => (row.id === rowData.id ? rowData : row)));
        }
      }

      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };

  const handleCloseDialog = () => {
    setEditDialogOpen(false);
  };

  return ( 
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4">Configurations Page</Typography>
          <TableSelector
            selectedTable={selectedTable}
            onTableChange={handleTableChange}
            onAddNewRecord={handleAddNewRecord}
          />
          <DataTable
            rows={selectedTable === 'Table 1' ? rowsTable1 : rowsTable2}
            columns={selectedTable === 'Table 1' ? columnsTable1 : columnsTable2}
            onEdit={handleEdit}
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
    </Container>
  );
};

export default Configurations;
