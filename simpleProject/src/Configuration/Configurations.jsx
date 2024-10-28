import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from './DataTable'; // Table component with DataGrid
import TableSelector from './TableSelector'; // Table selector component
import FormCreator from './FormCreator'; // Modal form component
import ResponsiveCard from '../Components/ResponsiveCard';

const Configurations = () => {
  const [selectedTable, setSelectedTable] = useState('Table 1');
  const [rowsTable1, setRowsTable1] = useState([]);
  const [rowsTable2, setRowsTable2] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [page, setPage] = useState(0); // Pagination for Table 1
  const [hasMore, setHasMore] = useState(true); // Check for more data
  const loader = useRef(null); // Reference for the observer

  // Fetch data for Table 1 using POST request
  const fetchTable1Data = async (page) => {
    try {
      const response = await fetch('https://randomuser.me/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          configFlag: 'Contiguous',
          page: page + 1, // For pagination
          results: 100,   // Fetch 100 results at a time
        }),
      });

      const data = await response.json();

      setRowsTable1((prev) => [
        ...prev,
        ...data.results.map((user) => ({
          id: user.login.uuid, // Unique identifier
          name: `${user.name.first} ${user.name.last}`, // Full name
          username: user.login.username,
          email: user.email,
        })),
      ]);

      // Check if there's more data to load
      if (data.results.length < 100) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching Table 1 data:', error);
    }
  };

  // Fetch data for Table 2 (Placeholder example with a different URL)
  const fetchTable2Data = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setRowsTable2(
        data.map((user) => ({
          id: user.id,
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
        }))
      );
    } catch (error) {
      console.error('Error fetching Table 2 data:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data for Table 1
    if (selectedTable === 'Table 1' && rowsTable1.length === 0) {
      fetchTable1Data(page);
    }
  }, [selectedTable, page]);

  useEffect(() => {
    // Fetch data for Table 2 if the selected table is Table 2
    if (selectedTable === 'Table 2' && rowsTable2.length === 0) {
      fetchTable2Data();
    }
  }, [selectedTable]);

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

  // Infinite scroll using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1); // Increment page to fetch next set of data
      }
    }, {
      root: null,  // Default to viewport
      rootMargin: '20px',
      threshold: 1.0,
    });

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [hasMore]);

  return (
    <Container>
      <ResponsiveCard>
        <Typography variant="h6">Configurations</Typography>
        <TableSelector onChange={handleTableChange} />
        <Button variant="contained" color="primary" onClick={handleAddNewRecord}>
          Add New Record
        </Button>
        <DataTable
          rows={selectedTable === 'Table 1' ? rowsTable1 : rowsTable2}
          columns={selectedTable === 'Table 1' ? columnsTable1 : columnsTable2}
        />
        {hasMore && <div ref={loader} style={{ height: '20px', backgroundColor: 'lightgrey' }}>Loading more data...</div>}
      </ResponsiveCard>

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
