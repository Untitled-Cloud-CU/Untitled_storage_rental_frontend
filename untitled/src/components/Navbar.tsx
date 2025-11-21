import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: '#fba777' }} elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Title */}
          <Link href="/" underline="none">
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: '#fcf8f9',
                "&:hover": {
                  textDecoration: "underline",
                  textDecorationColor: "#fcf8f9",
                },
              }}
            >
              Untitled
            </Typography>
          </Link>

          {/* Search + Locate button (only on home page) */}
          {isHome && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexGrow: 1,
                justifyContent: 'center'
              }}
            >
              <Box
                id="mapbox-search-container"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '35rem',
                }}
              />

              <Box
                id="mapbox-locate-container"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              />
            </Box>
          )}

          {/* Sign in + Sign up Buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#fcf8f9',
                color: '#ff7528',
                ":hover": { backgroundColor: '#fcf2eb' },
                textTransform: 'none',
                fontWeight: 600
              }}
              onClick={() => navigate("/signin")}
              disableElevation
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#ff7528',
                ":hover": { backgroundColor: '#fc6612' },
                textTransform: 'none',
                fontWeight: 600
              }}
              onClick={() => navigate("/signup")}
              disableElevation
            >
              Sign Up
            </Button>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;