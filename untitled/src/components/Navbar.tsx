import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{backgroundColor: '#fba777'}}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: '#fcf8f9' }}>
            Untitled
          </Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Button variant="contained" sx={{backgroundColor: '#fcf8f9', color: '#ff7528'}} disableElevation>Sign In</Button>
						<Button variant="contained" sx={{backgroundColor: '#ff7528'}} disableElevation>Sign Up</Button>
					</Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar