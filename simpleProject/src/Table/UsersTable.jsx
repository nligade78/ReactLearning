import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Container } from '@mui/material';

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'website', headerName: 'Website', width: 150 },
  ];

  // Inline CSS to hide scrollbar using the .css-1b9e9gy class
  const styles = `
    .css-1b9e9gy, .css-1rtad1 {
      overflow: hidden !important; /* Hide scrollbar */
    }
  `;

  return (
    <Container>
      <style>{styles}</style> {/* Add the styles block here */}
      <div style={{ height: '450px', width: '100%' }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          density="compact"
          components={{
            Toolbar: GridToolbar,
          }}
          
        />
      </div>
    </Container>
  );
};

export default UsersTable;
