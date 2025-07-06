import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import SupplierTable from '../components/SupplierTable';
import AddSupplierForm from '../components/AddSupplierForm';

function Suppliers() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Supplier List
      </Typography>
      <AddSupplierForm onSupplierAdded={() => setRefresh(r => r + 1)} />
      <SupplierTable refresh={refresh} />
    </div>
  );
}

export default Suppliers;
