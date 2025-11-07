import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack
} from '@mui/material';

export default function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar>
        {/* Left side - Logo / App Name */}
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{
            textDecoration: 'none',
            color: 'white',
            flexGrow: 1,
            fontWeight: 'bold',
          }}
        >
          Task Manager
        </Typography>

        {/* Right side - Navigation Buttons */}
        <Stack direction="row" spacing={2}>
          {token ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/task/new"
              >
                New Task
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
