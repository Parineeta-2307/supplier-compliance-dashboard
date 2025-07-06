import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers';
import SupplierDetail from './pages/SupplierDetail';
import Box from '@mui/material/Box';
import './App.css';

function App() {
  return (
    <Router>
      <TopNav />
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: '100vh', background: '#111' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/suppliers/:supplierId" element={<SupplierDetail />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
