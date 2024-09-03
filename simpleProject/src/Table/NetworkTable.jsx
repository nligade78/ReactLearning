import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const NetworkTable = ({ transactionType, rows }) => {
  // Dynamically generate columns based on the transaction type
  const columns = useMemo(() => {
    const baseColumns = [
      { field: 'state', headerName: 'State', width: 150 },
      { field: 'con_state', headerName: 'Con State', width: 150 },
    ];

    if (transactionType === 'Update Linkage') {
      // Add additional columns for 'Update Linkage'
      return [
        ...baseColumns,
        { field: 'sourceCode', headerName: 'Source Code', width: 150 },
        { field: 'sourceCodeText', headerName: 'Source Code Text', width: 150 },
      ];
    }

    return baseColumns;
  }, [transactionType]); // Recalculate columns only when the transaction type changes

  return (
    <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default NetworkTable;
