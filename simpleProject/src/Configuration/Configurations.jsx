import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Container,
  Button,
  MenuItem,
  Select,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

function Configurations() {
  const [selectedTable, setSelectedTable] = useState('Table 1');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [isNewRecord, setIsNewRecord] = useState(false); // To manage if we're adding a new record

  const initialRowsTable1 = [
    { id: 1, name: 'John Doe', age: 35, occupation: 'Engineer', flag: 'Y' },
    { id: 2, name: 'Jane Smith', age: 29, occupation: 'Doctor', flag: 'N' },
  ];

  const initialRowsTable2 = [
    { id: 1, product: 'Laptop', price: 1200, quantity: 10, discount: 10, taxable: 'Yes' },
    { id: 2, product: 'Phone', price: 800, quantity: 20, discount: 15, taxable: 'No' },
  ];

  const [rowsTable1, setRowsTable1] = useState(initialRowsTable1);
  const [rowsTable2, setRowsTable2] = useState(initialRowsTable2);

  const columnsTable1 = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton
          aria-label="edit"
          onClick={() => handleEdit(params.row)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      ),
    },
    { field: 'name', headerName: 'Name', width: 150, editable: isNewRecord },
    { field: 'age', headerName: 'Age', width: 110, editable: isNewRecord },
    { field: 'occupation', headerName: 'Occupation', width: 150, editable: isNewRecord },
    { field: 'flag', headerName: 'Flag', width: 110, editable: true },
  ];

  const columnsTable2 = [
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <IconButton
          aria-label="edit"
          onClick={() => handleEdit(params.row)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      ),
    },
    { field: 'product', headerName: 'Product', width: 150, editable: isNewRecord },
    { field: 'price', headerName: 'Price', width: 110, editable: isNewRecord },
    { field: 'quantity', headerName: 'Quantity', width: 110, editable: isNewRecord },
    { field: 'discount', headerName: 'Discount (%)', width: 110, editable: true },
    { field: 'taxable', headerName: 'Taxable', width: 110, editable: true },
  ];

  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
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

  const handleSave = () => {
    if (isNewRecord) {
      if (selectedTable === 'Table 1') {
        setRowsTable1([...rowsTable1, { ...editRowData, id: rowsTable1.length + 1 }]);
      } else {
        setRowsTable2([...rowsTable2, { ...editRowData, id: rowsTable2.length + 1 }]);
      }
    } else {
      const { id } = editRowData;
      if (selectedTable === 'Table 1') {
        setRowsTable1((prevRows) =>
          prevRows.map((row) => (row.id === id ? editRowData : row))
        );
      } else {
        setRowsTable2((prevRows) =>
          prevRows.map((row) => (row.id === id ? editRowData : row))
        );
      }
    }
    setEditDialogOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ margin: '20px auto', padding: '0' }}>
      <Select
        value={selectedTable}
        onChange={handleTableChange}
        sx={{ marginBottom: 2, width: '100%' }}
      >
        <MenuItem value="Table 1">Table 1</MenuItem>
        <MenuItem value="Table 2">Table 2</MenuItem>
      </Select>

      <Button variant="contained" color="primary" onClick={handleAddNewRecord} sx={{ marginBottom: 2 }}>
        Add New Record
      </Button>

      <Card sx={{ width: '100%' }}>
        <CardContent>
          <div style={{ height: 400, width: '100%', overflowY: 'auto' }}>
            <DataGrid
              rows={selectedTable === 'Table 1' ? rowsTable1 : rowsTable2}
              columns={selectedTable === 'Table 1' ? columnsTable1 : columnsTable2}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>{isNewRecord ? 'Add New Record' : 'Edit Row'}</DialogTitle>
        <DialogContent>
          {selectedTable === 'Table 1' ? (
            <>
              <TextField
                margin="dense"
                label="Name"
                value={editRowData.name || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, name: e.target.value })
                }
                fullWidth
                disabled={!isNewRecord && !columnsTable1[1].editable}
              />
              <TextField
                margin="dense"
                label="Age"
                value={editRowData.age || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, age: e.target.value })
                }
                fullWidth
                disabled={!isNewRecord && !columnsTable1[2].editable}
              />
              <TextField
                margin="dense"
                label="Occupation"
                value={editRowData.occupation || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, occupation: e.target.value })
                }
                fullWidth
                disabled={!isNewRecord && !columnsTable1[3].editable}
              />
              <TextField
                margin="dense"
                label="Flag"
                value={editRowData.flag || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, flag: e.target.value })
                }
                fullWidth
                disabled={!columnsTable1[4].editable}
              />
            </>
          ) : (
            <>
              <TextField
                margin="dense"
                label="Product"
                value={editRowData.product || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, product: e.target.value })
                }
                fullWidth
                disabled={!isNewRecord && !columnsTable2[1].editable}
              />
              <TextField
                margin="dense"
                label="Price"
                value={editRowData.price || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, price: e.target.value })
                }
                fullWidth
                disabled={!isNewRecord && !columnsTable2[2].editable}
              />
              <TextField
                margin="dense"
                label="Quantity"
                value={editRowData.quantity || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, quantity: e.target.value })
                }
                fullWidth
                disabled={!isNewRecord && !columnsTable2[3].editable}
              />
              <TextField
                margin="dense"
                label="Discount (%)"
                value={editRowData.discount || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, discount: e.target.value })
                }
                fullWidth
                disabled={!columnsTable2[4].editable}
              />
              <TextField
                margin="dense"
                label="Taxable"
                value={editRowData.taxable || ''}
                onChange={(e) =>
                  setEditRowData({ ...editRowData, taxable: e.target.value })
                }
                fullWidth
                disabled={!columnsTable2[5].editable}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Configurations;
