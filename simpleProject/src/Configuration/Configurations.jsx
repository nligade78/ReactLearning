import React from 'react';
import { Card, CardContent, Container, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGrid } from '@mui/x-data-grid';

function Configurations() {
  // Example columns and rows for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 110 }
  ];

  const rows = [
    { id: 1, name: 'John Doe', age: 35 },
    { id: 2, name: 'Jane Smith', age: 29 },
    { id: 3, name: 'Sam Green', age: 42 }
  ];

  return (
    <Container maxWidth="lg" sx={{ margin: '20px auto', padding: '0' }}>
      {/* Collapsible section for the first DataGrid table */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Show/Hide Table 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Card sx={{ width: '100%', boxShadow: 2 }}>
            <CardContent>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </CardContent>
          </Card>
        </AccordionDetails>
      </Accordion>

      {/* Second DataGrid table outside collapsible section */}
      <Card sx={{ width: '100%', boxShadow: 2, marginTop: 2 }}>
        <CardContent>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Configurations;
