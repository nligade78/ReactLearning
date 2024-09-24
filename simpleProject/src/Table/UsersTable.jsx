import React, { useEffect, useState } from 'react';
import { DataGrid ,GridToolbar } from '@mui/x-data-grid';
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
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'website', headerName: 'Website', width: 150 },
  ];

  return (
    <Container>
      <div style={{ height: 450, width: '100%' }}>
        <DataGrid className='dataGrid'
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </Container>
  );
};

export default UsersTable;
