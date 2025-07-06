import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

function SupplierTable({ refresh }) {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8000/api/suppliers')
      .then(res => res.json())
      .then(data => {
        setSuppliers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refresh]);

  if (loading) return <div>Loading...</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Compliance Score</TableCell>
            <TableCell>Contract Duration</TableCell>
            <TableCell>Renewal</TableCell>
            <TableCell>Last Audit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((supplier) => (
            <TableRow key={supplier.supplier_id}>
              <TableCell>
                <Link to={`/suppliers/${supplier.supplier_id}`}>{supplier.supplier_id}</Link>
              </TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.country}</TableCell>
              <TableCell>{supplier.compliance_score}</TableCell>
              <TableCell>{supplier.contract_terms?.duration}</TableCell>
              <TableCell>{supplier.contract_terms?.renewal ? 'Yes' : 'No'}</TableCell>
              <TableCell>{supplier.last_audit}</TableCell>
              <TableCell>
                <button
                  style={{
                    background: '#e53935',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 12px',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (window.confirm(`Delete supplier ${supplier.name}?`)) {
                      fetch(`http://localhost:8000/api/suppliers/${supplier.supplier_id}`, {
                        method: 'DELETE',
                      }).then(() => {
                        window.location.reload();
                      });
                    }
                  }}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SupplierTable;
