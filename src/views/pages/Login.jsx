import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Sesi dibersihkan total saat masuk halaman login agar tidak ada token nyangkut
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_role');
    console.log('🛑 Sesi dan data role dibersihkan.');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email dan password wajib diisi');
      setLoading(false);
      return;
    }

    try {
      // 🚀 MENGHUBUNGKAN KE SUPABASE 
      const apiUrl = 'https://nfzmmhujfqtyrktvtjbd.supabase.co/rest/v1';
      const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mem1taHVqZnF0eXJrdHZ0amJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MDMzMzksImV4cCI6MjA5ODk3OTMzOX0.sSFIf0GqsPrsCsXnhxc8G81c3qyXRDYVpwLxl0HBd1c';

      // Request data ke Supabase dengan filter email dan password yang cocok
      const response = await fetch(`${apiUrl}/karyawan?email=eq.${encodeURIComponent(email)}&password=eq.${encodeURIComponent(password)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Gagal terhubung ke server database');
      }

      const data = await response.json();

      // Jika data ditemukan (array tidak kosong), berarti email & password benar
      if (data && data.length > 0) {
        console.log('✅ Login sukses via Supabase, memproses role...');
        
        // 1. Tentukan role secara dinamis berdasarkan data email login
        const loggedInUser = data[0];
        const isOwnerAdmin = loggedInUser.email === 'admin@gmail.com';
        const userRole = isOwnerAdmin ? 'admin' : 'karyawan';

        // 2. Simpan token & role ke localStorage agar rute router tidak looping
        localStorage.setItem('token', 'dummy-token');
        localStorage.setItem('user_role', userRole);
        
        console.log(`✅ Sesi disimpan. Role Anda: ${userRole}. Mengalihkan halaman...`);
        
        // 3. Alihkan rute dashboard dengan tepat sesuai hak akses masing-masing
        if (userRole === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate('/karyawan/dashboard', { replace: true });
        }
      } else {
        setError('Email atau password salah');
      }
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan koneksi database, silakan coba lagi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
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
          boxShadow: 10,
          backgroundColor: '#ffffff',
          color: '#0f172a'
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h3" fontWeight="bold" mb={1}>
            Welcome Back 👋
          </Typography>
          <Typography color="text.secondary" mb={4}>
            Login Owner / Karyawan
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>
          </form>

          <Typography textAlign="center" mt={3}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
          <Typography textAlign="center" mt={1}>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}