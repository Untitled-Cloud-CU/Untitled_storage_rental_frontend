import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Untitled
          </Typography>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button color="secondary" variant="outlined">Sign In</Button>
						<Button color="secondary" variant="contained">Sign Up</Button>
					</Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar