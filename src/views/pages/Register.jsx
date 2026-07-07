import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Card,
  Alert
} from '@mui/material';

export default function Register() {
  const navigate = useNavigate();

  // ====== 1. STATE UNTUK MENAMPUNG INPUT FORM ======
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State untuk status info
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ====== 2. FUNGSI UNTUK MENGIRIM DATA KE SUPABASE ======
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasi kecocokan password & konfirmasi
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok!');
      return;
    }

    try {
      // ⚠️ GANTI URL DAN ANON KEY SESUAI PROJECT SUPABASE-MU!
      const response = await fetch('https://nfzmmhujfqtyrktvtjbd.supabase.co/rest/v1/karyawan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mem1taHVqZnF0eXJrdHZ0amJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MDMzMzksImV4cCI6MjA5ODk3OTMzOX0.sSFIf0GqsPrsCsXnhxc8G81c3qyXRDYVpwLxl0HBd1c',
          // 🚀 SEKARANG SUDAH DIGABUNGKAN DENGAN TOKEN ASLI KAMU:
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mem1taHVqZnF0eXJrdHZ0amJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MDMzMzksImV4cCI6MjA5ODk3OTMzOX0.sSFIf0GqsPrsCsXnhxc8G81c3qyXRDYVpwLxl0HBd1c',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          nama: fullName,
          email: email,
          password: password
        })
      });
    if (!response.ok) {
      throw new Error('Gagal mendaftarkan akun. Silakan periksa jaringan atau coba lagi.');
    }

    setSuccess('Akun berhasil didaftarkan! Mengalihkan ke halaman login...');

    // Tunggu 2 detik, lalu tendang user ke /login agar dicoba masuk ulang
    setTimeout(() => {
      navigate('/login');
    }, 2000);

  } catch (err) {
    setError(err.message);
  }
};

return (
  <Box
    sx={{
      backgroundColor: '#5e35b1', // Meniru background ungu bawaan template
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Container maxWidth="sm">
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: '0px 8px 24px rgba(0,0,0,0.15)' }}>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight={700} color="textPrimary" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            🚀 Register Owner / Karyawan
          </Typography>
        </Box>

        {/* Alert Status Sukses atau Gagal */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {/* ====== FORM INPUT UTAMA ====== */}
        <form onSubmit={handleSubmit}>

          {/* INPUT 1: FULL NAME (Disalurkan ke state fullName) */}
          <TextField
            fullWidth
            label="Full Name *"
            margin="normal"
            variant="outlined"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          {/* INPUT 2: EMAIL ADDRESS */}
          <TextField
            fullWidth
            label="Email Address *"
            type="email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* INPUT 3: PASSWORD */}
          <TextField
            fullWidth
            label="Password *"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* INPUT 4: CONFIRM PASSWORD */}
          <TextField
            fullWidth
            label="Confirm Password *"
            type="password"
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* TOMBOL DAFTAR */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="primary"
            sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold', textTransform: 'none' }}
          >
            REGISTER
          </Button>
        </form>

        {/* LINK KEMBALI KE LOGIN */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link to="/login" style={{ textDecoration: 'none', color: '#1e88e5', fontWeight: 'bold' }}>
              Login
            </Link>
          </Typography>
        </Box>

      </Card>
    </Container>
  </Box>
);
}