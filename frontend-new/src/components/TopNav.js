import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TopNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathToIndex = { '/': 0, '/suppliers': 1 };
  const [value, setValue] = useState(pathToIndex[location.pathname] || 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/');
    else if (newValue === 1) navigate('/suppliers');
  };

  return (
    <AppBar position="static" sx={{ background: '#181818' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Dashboard" sx={{ color: '#2196f3', fontWeight: 700 }} />
        <Tab label="Suppliers" sx={{ color: '#2196f3', fontWeight: 700 }} />
      </Tabs>
    </AppBar>
  );
}

export default TopNav;
