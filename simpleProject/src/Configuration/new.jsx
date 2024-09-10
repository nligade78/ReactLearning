const handleSaveAutomation = async (rowData) => {
    try {
      const url = 'automationnewUrl'; // Automation URL
      const jsonPayload = {
        id: rowData.id,
        name: rowData.name,
        username: rowData.username,
        email: rowData.email,
        user_id: rowData.user_id,
      };
  
      const response = await fetch(url, {
        method: 'POST', // Always use POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonPayload),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedData = await response.json();
  
      if (isNewRecord) {
        setRowsTable1([...rowsTable1, { ...rowData, id: updatedData.id }]);
      } else {
        setRowsTable1(rowsTable1.map((row) => (row.id === rowData.id ? rowData : row)));
      }
  
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Failed to save record:', error);
    }
  };
  
  const handleSaveContiguous = async (rowData) => {
    try {
      const url = 'contiguousnewUrl'; // Contiguous URL
      const jsonPayload = {
        id: rowData.id,
        address: {
          street: rowData.street,
          suite: rowData.suite,
         
  