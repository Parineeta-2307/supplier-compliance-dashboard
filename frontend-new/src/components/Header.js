import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1a1a1a',
        boxShadow: 'none',
        borderBottom: '1px solid #333',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: '#90caf9',
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          Proacure Compliance Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
