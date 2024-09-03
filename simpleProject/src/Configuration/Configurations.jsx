import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

function Configurations() {
  // State to manage which accordion is expanded, set to 'panel2' by default
  const [expanded, setExpanded] = useState('panel2');

  // Handler to toggle expansion
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Initial rows and columns for the first DataGrid table
  const initialRowsTable1 = [
    { id: 1, name: 'John Doe', age: 35, isEditMode: false },
    { id: 2, name: 'Jane Smith', age: 29, isEditMode: false },
  ];

  const columnsTable1 = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const isInEditMode = params.row.isEditMode;
        return isInEditMode ? (
          <>
            <IconButton
              aria-label="save"
              onClick={() => handleSave(params.row.id, params.row, 1)}
              color="primary"
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              aria-label="cancel"
              onClick={() => handleCancel(params.row.id, 1)}
              color="secondary"
            >
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              aria-label="edit"
              onClick={() => handleEdit(params.row.id, 1)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params.row.id, 1)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'age', headerName: 'Age', width: 110, editable: true },
  ];

  // Initial rows and columns for the second DataGrid table
  const initialRowsTable2 = [
    { id: 1, product: 'Laptop', price: 1200, isEditMode: false },
    { id: 2, product: 'Phone', price: 800, isEditMode: false },
  ];

  const columnsTable2 = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => {
        const isInEditMode = params.row.isEditMode;
        return isInEditMode ? (
          <>
            <IconButton
              aria-label="save"
              onClick={() => handleSave(params.row.id, params.row, 2)}
              color="primary"
            >
              <SaveIcon />
            </IconButton>
            <IconButton
              aria-label="cancel"
              onClick={() => handleCancel(params.row.id, 2)}
              color="secondary"
            >
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              aria-label="edit"
              onClick={() => handleEdit(params.row.id, 2)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(params.row.id, 2)}
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'product', headerName: 'Product', width: 150, editable: true },
    { field: 'price', headerName: 'Price', width: 110, editable: true },
  ];

  // State to manage rows for each table
  const [rowsTable1, setRowsTable1] = useState(initialRowsTable1);
  const [rowsTable2, setRowsTable2] = useState(initialRowsTable2);

  const [newRowIdTable1, setNewRowIdTable1] = useState(initialRowsTable1.length + 1);
  const [newRowIdTable2, setNewRowIdTable2] = useState(initialRowsTable2.length + 1);

  // Handlers for table 1
  const handleEdit = (id, table) => {
    if (table === 1) {
      setRowsTable1((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isEditMode: true } : row
        )
      );
    } else {
      setRowsTable2((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isEditMode: true } : row
        )
      );
    }
  };

  const handleSave = (id, updatedRow, table) => {
    if (table === 1) {
      setRowsTable1((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...updatedRow, isEditMode: false } : row
        )
      );
    } else {
      setRowsTable2((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...updatedRow, isEditMode: false } : row
        )
      );
    }
  };

  const handleCancel = (id, table) => {
    if (table === 1) {
      setRowsTable1((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isEditMode: false } : row
        )
      );
    } else {
      setRowsTable2((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isEditMode: false } : row
        )
      );
    }
  };

  const handleDelete = (id, table) => {
    if (table === 1) {
      setRowsTable1(rowsTable1.filter((r) => r.id !== id));
    } else {
      setRowsTable2(rowsTable2.filter((r) => r.id !== id));
    }
  };

  // Handlers for adding new records
  const handleAddNewRecordTable1 = () => {
    const newId = newRowIdTable1;
    const newRow = { id: newId, name: '', age: '', isEditMode: true };
    setRowsTable1([...rowsTable1, newRow]);
    setNewRowIdTable1(newId + 1);
  };

  const handleAddNewRecordTable2 = () => {
    const newId = newRowIdTable2;
    const newRow = { id: newId, product: '', price: '', isEditMode: true };
    setRowsTable2([...rowsTable2, newRow]);
    setNewRowIdTable2(newId + 1);
  };

  return (
    <Container maxWidth="lg" sx={{ margin: '20px auto', padding: '0' }}>
      {/* Collapsible section for the first DataGrid table */}
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleAccordionChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Show/Hide Table 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewRecordTable1}
                sx={{ marginBottom: 2 }}
              >
                Add New Record
              </Button>
              <div style={{ height: 400, width: '100%', overflowY: 'auto' }}>
                <DataGrid
                  rows={rowsTable1}
                  columns={columnsTable1}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

      {/* Second DataGrid table in another collapsible section */}
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleAccordionChange('panel2')}
        sx={{ marginTop: 2 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Show/Hide Table 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card sx={{ width: '100%' }}>
            <CardContent>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddNewRecordTable2}
                sx={{ marginBottom: 2 }}
              >
                Add New Record
              </Button>
              <div style={{ height: 400, width: '100%', overflowY: 'auto' }}>
                <DataGrid
                  rows={rowsTable2}
                  columns={columnsTable2}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default Configurations;
