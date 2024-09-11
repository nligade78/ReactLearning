import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FormCreator from './FormCreator'; // Modal form component
import DataTable from './DataTable'; // Table component with DataGrid
import TableSelector from './TableSelector'; // Table selector component

const Configurations = () => {
  const [selectedTable, setSelectedTable] = useState('Table 1');
  const [rowsTable1, setRowsTable1] = useState([]);
  const [rowsTable2, setRowsTable2] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [isNewRecord, setIsNewRecord] = useState(false);

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
    { field: 'email', headerName: 'Email', width: 200, editable: true }, // Only email is editable
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

  const handleSaveAutomation = async (rowData) => {
    try {
      const url = 'automationnewUrl'; // Use your actual automation URL here
      const jsonPayload = {
        id: rowData.id || 'new', // Use 'new' if the id is not provided
        name: rowData.name,
        username: rowData.username,
        email: rowData.email,
        LOB: rowData.LOB,
        user_id: rowData.user_id,
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = await response.json();
      const newId = updatedData.id || rowData.id; // Get new ID from the response if available

      if (isNewRecord) {
        setRowsTable1([...rowsTable1, { ...rowData, id: newId }]);
      } else {
        setRowsTable1(rowsTable1.map((row) => (row.id === rowData.id ? { ...rowData, id: newId } : row)));
      }

      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };

  const handleSaveContiguous = async (rowData) => {
    try {
      const url = 'contiguousnewUrl'; // Use your actual contiguous URL here
      const jsonPayload = {
        id: rowData.id || 'new', // Use 'new' if the id is not provided
        address: {
          street: rowData.street,
          suite: rowData.suite,
          city: rowData.city,
          zipcode: rowData.zipcode,
          user_id: rowData.user_id,
        },
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = await response.json();
      const newId = updatedData.id || rowData.id; // Get new ID from the response if available

      if (isNewRecord) {
        setRowsTable2([...rowsTable2, { ...rowData, id: newId }]);
      } else {
        setRowsTable2(rowsTable2.map((row) => (row.id === rowData.id ? { ...rowData, id: newId } : row)));
      }

      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };

  const handleSave = (rowData) => {
    if (selectedTable === 'Table 1') {
      handleSaveAutomation(rowData);
    } else {
      handleSaveContiguous(rowData);
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
