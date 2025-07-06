import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import ComplianceInsights from '../components/ComplianceInsights'; // correct import path

function Dashboard() {
  const [supplierCount, setSupplierCount] = useState(0);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    // Fetch supplier count
    fetch('http://localhost:8000/api/suppliers')
      .then(res => res.json())
      .then(data => setSupplierCount(data.length))
      .catch(() => setSupplierCount(0));

    // Fetch compliance insights
    fetch('http://localhost:8000/api/suppliers/insights')
      .then(res => res.json())
      .then(data => setInsights(data))
      .catch(() => setInsights(null));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: '#111', p: 3 }}>
      {/* Glassmorphism Heading */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 4,
          background: 'rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
          backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.18)',
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" sx={{ color: '#90caf9', fontWeight: 700, letterSpacing: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography sx={{ color: '#fff', mt: 1 }}>
          Welcome to your <span style={{ color: '#ffd700', fontWeight: 600 }}>compliance dashboard</span>!
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{
            background: 'rgba(30, 30, 30, 0.7)',
            color: '#fff',
            border: '1px solid #444',
            boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(4px)'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#ffd700' }}>Total Suppliers</Typography>
              <Typography variant="h2" sx={{ color: '#90caf9', fontWeight: 700 }}>{supplierCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <ComplianceInsights insights={insights} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
