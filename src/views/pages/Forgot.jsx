import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography
} from '@mui/material';

import { Link } from 'react-router-dom';

export default function Forgot() {
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
          width: 420,
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
            Forgot Password 🔒
          </Typography>

          <Typography
            color="text.secondary"
            mb={4}
          >
            Enter your email to reset password
          </Typography>

          <TextField
            fullWidth
            label="Email Address"
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
            Send Reset Link
          </Button>

          <Typography
            textAlign="center"
            mt={3}
          >
            Back to{' '}
            <Link to="/login">
              Login
            </Link>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}