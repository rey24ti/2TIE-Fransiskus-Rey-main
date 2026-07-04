import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Avatar,
  alpha,
  useTheme,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';

export default function ReturBarangGuest() {
  const theme = useTheme();
  const [form, setForm] = useState({ produk: '', jumlah: 1, alasan: '', buktiFile: null, buktiPreview: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setSnackbar({ open: true, message: 'Hanya file gambar yang diperbolehkan', severity: 'error' });
        e.target.value = '';
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setSnackbar({ open: true, message: 'Ukuran maksimal 2MB', severity: 'error' });
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, buktiFile: file, buktiPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBukti = () => {
    setForm({ ...form, buktiFile: null, buktiPreview: null });
    const fileInput = document.getElementById('bukti-upload');
    if (fileInput) fileInput.value = '';
  };

  const handleAdd = () => {
    if (!form.produk.trim() || !form.alasan.trim() || !form.buktiFile) {
      setSnackbar({ open: true, message: 'Mohon isi semua field dan upload bukti struk', severity: 'error' });
      return;
    }
    // Simulasi pengiriman data (tanpa menyimpan riwayat)
    setForm({ produk: '', jumlah: 1, alasan: '', buktiFile: null, buktiPreview: null });
    const fileInput = document.getElementById('bukti-upload');
    if (fileInput) fileInput.value = '';
    setSnackbar({ open: true, message: 'Pengajuan retur berhasil dikirim', severity: 'success' });
  };

  const handlePreviewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setPreviewOpen(true);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(145deg, ${alpha('#f8fafc', 0.97)} 0%, ${alpha('#f1f5f9', 0.95)} 100%)`, py: 4, position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: -100, right: -50, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${alpha('#2563eb', 0.08)} 0%, transparent 70%)` }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${alpha('#dc2626', 0.05)} 0%, transparent 70%)` }} />
      </Box>

      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Fade in timeout={600}>
            <Stack spacing={1} alignItems="center" textAlign="center">
              <Avatar sx={{ bgcolor: alpha('#2563eb', 0.1), color: '#2563eb', width: 64, height: 64 }}>
                <AssignmentReturnIcon sx={{ fontSize: 36 }} />
              </Avatar>
              <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -0.02, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                Retur Barang
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Ajukan retur untuk barang yang tidak sesuai, rusak, atau cacat. Sertakan bukti struk pembelian.
              </Typography>
            </Stack>
          </Fade>

          {/* Formulir pengajuan retur */}
          <Zoom in timeout={900}>
            <Card elevation={0} sx={{ borderRadius: 5, bgcolor: 'white', border: `1px solid ${alpha('#e2e8f0', 0.6)}`, overflow: 'hidden' }}>
              <Box sx={{ height: 6, background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2.5 }}>
                  <AddIcon sx={{ color: '#2563eb' }} />
                  <Typography variant="h6" sx={{ fontWeight: 800 }}>Form Pengajuan Retur</Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField fullWidth label="Nama Produk *" value={form.produk} onChange={(e) => setForm({ ...form, produk: e.target.value })} placeholder="Contoh: Semen 50kg" />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <TextField fullWidth type="number" label="Jumlah *" value={form.jumlah} onChange={(e) => setForm({ ...form, jumlah: parseInt(e.target.value) || 1 })} inputProps={{ min: 1 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Alasan Retur *" value={form.alasan} onChange={(e) => setForm({ ...form, alasan: e.target.value })} placeholder="Contoh: Barang rusak / tidak sesuai" />
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600 }}>
                      Upload Bukti Struk/Foto Pembelian *
                      <input id="bukti-upload" type="file" hidden accept="image/*" onChange={handleFileChange} />
                    </Button>
                    {form.buktiPreview && (
                      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <img src={form.buktiPreview} alt="preview" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, cursor: 'pointer' }} onClick={() => handlePreviewImage(form.buktiPreview)} />
                        <Typography variant="caption" sx={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => handlePreviewImage(form.buktiPreview)}>Klik preview</Typography>
                        <IconButton size="small" onClick={handleRemoveBukti} sx={{ color: 'error.main' }}><ClearIcon fontSize="small" /></IconButton>
                      </Box>
                    )}
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button variant="contained" fullWidth startIcon={<AddIcon />} onClick={handleAdd} sx={{ borderRadius: 999, fontWeight: 800, textTransform: 'none', background: 'linear-gradient(105deg, #2563eb, #1d4ed8)', boxShadow: '0 4px 12px rgba(37,99,235,0.3)', '&:hover': { transform: 'scale(1.02)' } }}>
                      Kirim Pengajuan
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Zoom>
        </Stack>
      </Container>

      {/* Dialog preview bukti */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md">
        <DialogTitle>Bukti Pembelian</DialogTitle>
        <DialogContent>
          <img src={selectedImage} alt="Bukti" style={{ width: '100%', borderRadius: 8 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Tutup</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 3 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}