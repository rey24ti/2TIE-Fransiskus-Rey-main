import { Link, useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@mui/material';

export default function Login() {

  const navigate = useNavigate();

  const handleLogin = () => {
    // nanti bisa ditambah axios login
    navigate('/admin/dashboard');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3b5bfd, #6f86ff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 4,
          boxShadow: 10
        }}
      >
        <CardContent sx={{ p: 5 }}>

          <Typography
            variant="h3"
            fontWeight="bold"
            mb={1}
          >
            Welcome Back 👋
          </Typography>

          <Typography
            color="text.secondary"
            mb={4}
          >
            Login Owner / Karyawan
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleLogin}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Login
          </Button>

          <Typography
            textAlign="center"
            mt={3}
          >
            Don't have an account?{' '}
            <Link to="/register">
              Register
            </Link>
          </Typography>

          <Typography
            textAlign="center"
            mt={1}
          >
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}