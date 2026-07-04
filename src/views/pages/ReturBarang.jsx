import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  Avatar,
  alpha,
  useTheme,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Tabs,
  Tab,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RestoreIcon from '@mui/icons-material/Restore';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import PendingIcon from '@mui/icons-material/Pending';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Data retur dengan tambahan field bukti (simulasi)
const initialRetur = [
  {
    id: 1,
    kode: 'RT-001',
    tanggal: '2025-01-15',
    namaPelanggan: 'Budi Santoso',
    produk: 'Semen 50kg',
    jumlah: 2,
    total: 130000,
    alasan: 'Barang tidak sesuai pesanan',
    status: 'Menunggu',
    bukti: 'https://picsum.photos/id/20/400/300', // contoh bukti struk
  },
  {
    id: 2,
    kode: 'RT-002',
    tanggal: '2025-01-14',
    namaPelanggan: 'Siti Aminah',
    produk: 'Cat Dulux 5kg',
    jumlah: 1,
    total: 85000,
    alasan: 'Warna tidak cocok',
    status: 'Disetujui',
    bukti: 'https://picsum.photos/id/26/400/300',
  },
  {
    id: 3,
    kode: 'RT-003',
    tanggal: '2025-01-13',
    namaPelanggan: 'Ahmad Wijaya',
    produk: 'Pipa PVC 3inch',
    jumlah: 5,
    total: 250000,
    alasan: 'Barang rusak saat pengiriman',
    status: 'Ditolak',
    bukti: 'https://picsum.photos/id/28/400/300',
  },
];

export default function ReturBarangAdmin() {
  const theme = useTheme();
  const [returList, setReturList] = useState(initialRetur);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleUpdateStatus = (id, newStatus) => {
    setReturList(returList.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ));
    setSnackbar({ open: true, message: `Status retur diubah menjadi ${newStatus}`, severity: 'success' });
  };

  const handlePreviewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setPreviewOpen(true);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Disetujui': return { color: '#16a34a', bg: alpha('#16a34a', 0.1), icon: <CheckCircleIcon fontSize="small" />, label: 'Disetujui' };
      case 'Menunggu': return { color: '#d97706', bg: alpha('#d97706', 0.1), icon: <PendingIcon fontSize="small" />, label: 'Menunggu' };
      case 'Ditolak': return { color: '#dc2626', bg: alpha('#dc2626', 0.1), icon: <CancelIcon fontSize="small" />, label: 'Ditolak' };
      default: return { color: '#6b7280', bg: alpha('#6b7280', 0.1), icon: null, label: status };
    }
  };

  const filteredList = returList.filter(item => {
    const matchStatus = filterStatus === 'Semua' || item.status === filterStatus;
    const matchSearch = item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.namaPelanggan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.produk.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalPengajuan = returList.length;
  const totalMenunggu = returList.filter(r => r.status === 'Menunggu').length;
  const totalDisetujui = returList.filter(r => r.status === 'Disetujui').length;
  const totalDitolak = returList.filter(r => r.status === 'Ditolak').length;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) setFilterStatus('Semua');
    if (newValue === 1) setFilterStatus('Menunggu');
    if (newValue === 2) setFilterStatus('Disetujui');
    if (newValue === 3) setFilterStatus('Ditolak');
  };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: `linear-gradient(145deg, ${alpha('#f8fafc', 0.97)} 0%, ${alpha('#f1f5f9', 0.95)} 100%)`, py: 4, position: 'relative' }}>
      {/* Background dekorasi */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: -100, right: -50, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${alpha('#2563eb', 0.08)} 0%, transparent 70%)` }} />
        <Box sx={{ position: 'absolute', bottom: -80, left: -80, width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${alpha('#dc2626', 0.05)} 0%, transparent 70%)` }} />
      </Box>

      <Container maxWidth="xl">
        <Stack spacing={4}>
          {/* Header */}
          <Fade in timeout={600}>
            <Stack spacing={1} alignItems="center" textAlign="center">
              <Avatar sx={{ bgcolor: alpha('#2563eb', 0.1), color: '#2563eb', width: 64, height: 64 }}><AssignmentReturnIcon sx={{ fontSize: 36 }} /></Avatar>
              <Typography variant="h3" sx={{ fontWeight: 900, letterSpacing: -0.02, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent' }}>Kelola Retur Barang</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>Kelola dan approve permintaan retur dari pelanggan. Lihat bukti pembelian dan ubah status.</Typography>
            </Stack>
          </Fade>

          {/* Statistik */}
          <Zoom in timeout={800}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3}><Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: 'white', border: `1px solid ${alpha('#e2e8f0', 0.6)}` }}><Stack direction="row" alignItems="center" justifyContent="space-between"><Stack><Typography variant="body2" color="text.secondary">Total Pengajuan</Typography><Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a' }}>{totalPengajuan}</Typography></Stack><Avatar sx={{ bgcolor: alpha('#2563eb', 0.1), color: '#2563eb', width: 48, height: 48 }}><AssignmentReturnIcon /></Avatar></Stack></Paper></Grid>
              <Grid item xs={12} sm={3}><Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: 'white', border: `1px solid ${alpha('#e2e8f0', 0.6)}` }}><Stack direction="row" alignItems="center" justifyContent="space-between"><Stack><Typography variant="body2" color="text.secondary">Menunggu</Typography><Typography variant="h3" sx={{ fontWeight: 900, color: '#d97706' }}>{totalMenunggu}</Typography></Stack><Avatar sx={{ bgcolor: alpha('#d97706', 0.1), color: '#d97706', width: 48, height: 48 }}><PendingIcon /></Avatar></Stack></Paper></Grid>
              <Grid item xs={12} sm={3}><Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: 'white', border: `1px solid ${alpha('#e2e8f0', 0.6)}` }}><Stack direction="row" alignItems="center" justifyContent="space-between"><Stack><Typography variant="body2" color="text.secondary">Disetujui</Typography><Typography variant="h3" sx={{ fontWeight: 900, color: '#16a34a' }}>{totalDisetujui}</Typography></Stack><Avatar sx={{ bgcolor: alpha('#16a34a', 0.1), color: '#16a34a', width: 48, height: 48 }}><CheckCircleIcon /></Avatar></Stack></Paper></Grid>
              <Grid item xs={12} sm={3}><Paper elevation={0} sx={{ p: 2.5, borderRadius: 4, bgcolor: 'white', border: `1px solid ${alpha('#e2e8f0', 0.6)}` }}><Stack direction="row" alignItems="center" justifyContent="space-between"><Stack><Typography variant="body2" color="text.secondary">Ditolak</Typography><Typography variant="h3" sx={{ fontWeight: 900, color: '#dc2626' }}>{totalDitolak}</Typography></Stack><Avatar sx={{ bgcolor: alpha('#dc2626', 0.1), color: '#dc2626', width: 48, height: 48 }}><CancelIcon /></Avatar></Stack></Paper></Grid>
            </Grid>
          </Zoom>

          {/* Tabel dengan filter, search, tab */}
          <Fade in timeout={1000}>
            <Card elevation={0} sx={{ borderRadius: 5, bgcolor: 'white', border: `1px solid ${alpha('#e2e8f0', 0.6)}`, overflow: 'hidden' }}>
              <Box sx={{ height: 6, background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }} />
              <CardContent sx={{ p: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2} sx={{ mb: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={1}><RestoreIcon sx={{ color: '#2563eb' }} /><Typography variant="h6" sx={{ fontWeight: 800 }}>Daftar Permintaan Retur</Typography></Stack>
                  <TextField size="small" placeholder="Cari kode/pelanggan/produk..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: 250 }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>, endAdornment: searchTerm && <InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm('')}><ClearIcon fontSize="small" /></IconButton></InputAdornment> }} />
                </Stack>

                <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Tab label="Semua" /><Tab label="Menunggu" /><Tab label="Disetujui" /><Tab label="Ditolak" />
                </Tabs>

                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: `1px solid ${alpha('#e2e8f0', 0.6)}`, overflowX: 'auto' }}>
                  <Table>
                    <TableHead sx={{ bgcolor: alpha('#f1f5f9', 0.6) }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 800 }}>Kode</TableCell><TableCell sx={{ fontWeight: 800 }}>Tanggal</TableCell><TableCell sx={{ fontWeight: 800 }}>Pelanggan</TableCell><TableCell sx={{ fontWeight: 800 }}>Produk</TableCell><TableCell sx={{ fontWeight: 800 }}>Jml</TableCell><TableCell sx={{ fontWeight: 800 }}>Total</TableCell><TableCell sx={{ fontWeight: 800 }}>Alasan</TableCell><TableCell sx={{ fontWeight: 800 }}>Bukti</TableCell><TableCell sx={{ fontWeight: 800 }}>Status</TableCell><TableCell sx={{ fontWeight: 800 }}>Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredList.length === 0 ? (
                        <TableRow><TableCell colSpan={10} align="center" sx={{ py: 6 }}><Stack alignItems="center" spacing={1}><WarningAmberIcon sx={{ fontSize: 48, color: '#cbd5e1' }} /><Typography color="text.secondary">Tidak ada data retur</Typography></Stack></TableCell></TableRow>
                      ) : (
                        filteredList.map((item) => {
                          const statusConfig = getStatusConfig(item.status);
                          return (
                            <TableRow key={item.id} hover>
                              <TableCell sx={{ fontWeight: 700 }}>{item.kode}</TableCell>
                              <TableCell>{item.tanggal}</TableCell>
                              <TableCell>{item.namaPelanggan}</TableCell>
                              <TableCell>{item.produk}</TableCell>
                              <TableCell>{item.jumlah}</TableCell>
                              <TableCell>{formatRupiah(item.total)}</TableCell>
                              <TableCell sx={{ maxWidth: 200 }}>{item.alasan}</TableCell>
                              <TableCell>
                                {item.bukti ? <IconButton size="small" onClick={() => handlePreviewImage(item.bukti)} sx={{ color: '#2563eb' }}><VisibilityIcon fontSize="small" /></IconButton> : <Chip label="Tidak ada" size="small" variant="outlined" />}
                              </TableCell>
                              <TableCell><Chip icon={statusConfig.icon} label={statusConfig.label} size="small" sx={{ bgcolor: statusConfig.bg, color: statusConfig.color, fontWeight: 700, borderRadius: 2 }} /></TableCell>
                              <TableCell>
                                {item.status === 'Menunggu' && (
                                  <Stack direction="row" spacing={0.5}>
                                    <IconButton size="small" onClick={() => handleUpdateStatus(item.id, 'Disetujui')} sx={{ color: '#16a34a' }}><CheckCircleIcon /></IconButton>
                                    <IconButton size="small" onClick={() => handleUpdateStatus(item.id, 'Ditolak')} sx={{ color: '#dc2626' }}><CancelIcon /></IconButton>
                                  </Stack>
                                )}
                                {item.status !== 'Menunggu' && <Typography variant="caption" color="text.secondary">-</Typography>}
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                {filteredList.length > 0 && <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'right' }}>Menampilkan {filteredList.length} dari {returList.length} retur</Typography>}
              </CardContent>
            </Card>
          </Fade>
        </Stack>
      </Container>

      {/* Dialog preview bukti */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md">
        <DialogTitle>Bukti Pembelian</DialogTitle>
        <DialogContent><img src={selectedImage} alt="Bukti" style={{ width: '100%', borderRadius: 8 }} /></DialogContent>
        <DialogActions><Button onClick={() => setPreviewOpen(false)}>Tutup</Button></DialogActions>
      </Dialog>

      {/* Snackbar notifikasi */}
      <Box sx={{ position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 1400 }}>
        {snackbar.open && (
          <Paper sx={{ p: 1.5, bgcolor: alpha('#0f172a', 0.9), color: 'white', borderRadius: 4, textAlign: 'center' }}>
            <Typography variant="body2">{snackbar.message}</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}