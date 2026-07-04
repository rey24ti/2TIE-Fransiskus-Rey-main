import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@mui/material';

import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #3b5bfd, #6f86ff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Card
        sx={{
          width: 450,
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
            Create Account 🚀
          </Typography>

          <Typography
            color="text.secondary"
            mb={4}
          >
            Register Owner / Karyawan
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            margin="normal"
          />

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

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2
            }}
          >
            Register
          </Button>

          <Typography
            textAlign="center"
            mt={3}
          >
            Already have an account?{' '}
            <Link to="/login">
              Login
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}