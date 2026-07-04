import React, { useMemo, useState, useEffect } from 'react';
import {
  Box, Card, Grid, Stack, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Tabs, Tab, TextField, MenuItem, Button, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, Chip, Avatar, Fade, Zoom,
  IconButton, Tooltip, Divider, alpha, useTheme
} from '@mui/material';
import {
  Add, Remove, History, Inventory, TrendingUp, TrendingDown,
  Storefront, CheckCircle, Cancel, Close, Refresh, Delete
} from '@mui/icons-material';

const parseNumber = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const formatRibuan = (angka) => {
  if (angka === undefined || angka === null || isNaN(angka)) return '';
  return new Intl.NumberFormat('id-ID').format(angka);
};

const normalizeRiwayat = (riwayat = []) =>
  (riwayat || []).map((r) => ({
    ...r,
    jenis: r?.jenis || (r?.metode ? (String(r.metode).toLowerCase().includes('masuk') ? 'masuk' : (String(r.metode).toLowerCase().includes('keluar') ? 'keluar' : 'penjualan')) : 'penjualan'),
  }));

const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka || 0);

function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  const setValue = (value) => {
    const toStore = value instanceof Function ? value(stored) : value;
    setStored(toStore);
    localStorage.setItem(key, JSON.stringify(toStore));
  };
  return [stored, setValue];
}

const DEFAULT_BARANG = [
  { id: 1, nama: 'Semen Padang 40kg', stok: 120, harga: 62000, kategori: 'Semen' },
  { id: 2, nama: 'Semen Tiga Roda 40kg', stok: 85, harga: 65000, kategori: 'Semen' },
  { id: 3, nama: 'Semen Holcim 40kg', stok: 95, harga: 64000, kategori: 'Semen' },
  { id: 4, nama: 'Semen Gresik 40kg', stok: 110, harga: 63000, kategori: 'Semen' },
  { id: 5, nama: 'Cat Tembok Dulux 5kg', stok: 30, harga: 145000, kategori: 'Cat' },
  { id: 6, nama: 'Cat Tembok Mowilex 5kg', stok: 25, harga: 155000, kategori: 'Cat' },
  { id: 7, nama: 'Cat Kayu Propan 1kg', stok: 40, harga: 85000, kategori: 'Cat' },
  { id: 8, nama: 'Cat Besi Nippon 1kg', stok: 35, harga: 78000, kategori: 'Cat' },
  { id: 9, nama: 'Besi Beton 10mm', stok: 200, harga: 85000, kategori: 'Besi' },
  { id: 10, nama: 'Besi Beton 12mm', stok: 150, harga: 115000, kategori: 'Besi' },
  { id: 11, nama: 'Besi Siku 3x3', stok: 80, harga: 75000, kategori: 'Besi' },
  { id: 12, nama: 'Baja Ringan C75', stok: 60, harga: 95000, kategori: 'Besi' },
  { id: 13, nama: 'Pipa PVC 1/2"', stok: 250, harga: 22000, kategori: 'Pipa' },
  { id: 14, nama: 'Pipa PVC 3/4"', stok: 220, harga: 28000, kategori: 'Pipa' },
  { id: 15, nama: 'Pipa PVC 1"', stok: 180, harga: 38000, kategori: 'Pipa' },
  { id: 16, nama: 'Lakban PVC', stok: 90, harga: 12000, kategori: 'Pipa' },
  { id: 17, nama: 'Keramik 40x40 Putih', stok: 300, harga: 55000, kategori: 'Keramik' },
  { id: 18, nama: 'Keramik 50x50 Abu', stok: 250, harga: 85000, kategori: 'Keramik' },
  { id: 19, nama: 'Granit 60x60', stok: 120, harga: 175000, kategori: 'Keramik' },
  { id: 20, nama: 'Kabel NYA 1.5mm', stok: 400, harga: 18000, kategori: 'Listrik' },
  { id: 21, nama: 'Stop Kontak Broco', stok: 75, harga: 25000, kategori: 'Listrik' },
  { id: 22, nama: 'Saklar Tunggal', stok: 100, harga: 15000, kategori: 'Listrik' },
  { id: 23, nama: 'MCB 6A', stok: 50, harga: 35000, kategori: 'Listrik' },
  { id: 24, nama: 'Triplek 9mm', stok: 45, harga: 95000, kategori: 'Kayu' },
  { id: 25, nama: 'Kayu Kaso 4x6', stok: 200, harga: 32000, kategori: 'Kayu' },
];

export default function ManajemenKaryawan() {
  const theme = useTheme();
  const [barang, setBarang] = useLocalStorage('data_toko', DEFAULT_BARANG);
  const [riwayat, setRiwayat] = useLocalStorage('riwayat_toko', []);
  const riwayatNorm = useMemo(() => normalizeRiwayat(riwayat), [riwayat]);

  const [tab, setTab] = useState('dataBarang');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [masukBarangId, setMasukBarangId] = useState('');
  const [masukQty, setMasukQty] = useState('');
  const [keluarBarangId, setKeluarBarangId] = useState('');
  const [keluarQty, setKeluarQty] = useState('');
  const [confirm, setConfirm] = useState({ open: false, kind: null, nama: '', qty: 0 });

  const [tambahDialog, setTambahDialog] = useState(false);
  const [newBarang, setNewBarang] = useState({ nama: '', kategori: '', harga: '' });
  const [hargaDisplay, setHargaDisplay] = useState('');
  const [isHargaFocused, setIsHargaFocused] = useState(false);

  const [hapusDialog, setHapusDialog] = useState({ open: false, id: null, nama: '', qty: 0 });

  useEffect(() => {
    if (barang.length < 10) {
      setBarang(DEFAULT_BARANG);
      setSnackbar({ open: true, message: 'Data barang diperbarui ke 25 item default', severity: 'info' });
    }
  }, [barang, setBarang]);

  const handleResetBarang = () => {
    if (window.confirm('Reset semua data barang ke default (25 item)? Data stok dan riwayat tidak akan hilang, hanya daftar barang yang diganti.')) {
      setBarang(DEFAULT_BARANG);
      setSnackbar({ open: true, message: 'Data barang telah direset ke 25 item', severity: 'success' });
    }
  };

  const handleTambahBarang = () => {
    const { nama, kategori, harga } = newBarang;
    if (!nama.trim()) {
      setSnackbar({ open: true, message: 'Nama barang wajib diisi', severity: 'warning' });
      return;
    }
    if (!kategori.trim()) {
      setSnackbar({ open: true, message: 'Kategori wajib diisi', severity: 'warning' });
      return;
    }
    const hargaNum = parseNumber(harga);
    if (hargaNum <= 0) {
      setSnackbar({ open: true, message: 'Harga harus lebih dari 0', severity: 'warning' });
      return;
    }
    if (barang.some(b => b.nama.toLowerCase() === nama.trim().toLowerCase())) {
      setSnackbar({ open: true, message: 'Nama barang sudah ada', severity: 'error' });
      return;
    }

    const maxId = barang.reduce((max, b) => Math.max(max, b.id), 0);
    const newItem = {
      id: maxId + 1,
      nama: nama.trim(),
      kategori: kategori.trim(),
      harga: hargaNum,
      stok: 0,
    };

    setBarang(prev => [...prev, newItem]);
    setTambahDialog(false);
    setNewBarang({ nama: '', kategori: '', harga: '' });
    setHargaDisplay('');
    setSnackbar({ open: true, message: `Barang "${newItem.nama}" berhasil ditambahkan (stok 0)`, severity: 'success' });
  };

  const handleHargaChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');
    const numeric = parseInt(rawValue, 10);
    if (rawValue === '') {
      setNewBarang({ ...newBarang, harga: '' });
      setHargaDisplay('');
    } else if (!isNaN(numeric) && numeric >= 0) {
      setNewBarang({ ...newBarang, harga: numeric });
      setHargaDisplay(isHargaFocused ? String(numeric) : formatRibuan(numeric));
    }
  };

  const handleHargaFocus = () => {
    setIsHargaFocused(true);
    if (newBarang.harga !== '' && !isNaN(newBarang.harga)) {
      setHargaDisplay(String(newBarang.harga));
    } else {
      setHargaDisplay('');
    }
  };

  const handleHargaBlur = () => {
    setIsHargaFocused(false);
    if (newBarang.harga !== '' && !isNaN(newBarang.harga) && newBarang.harga > 0) {
      setHargaDisplay(formatRibuan(newBarang.harga));
    } else if (newBarang.harga === '' || newBarang.harga === 0) {
      setHargaDisplay('');
    }
  };

  const handleHapusRiwayatMasuk = (id) => {
    const item = riwayatNorm.find(r => r.id === id && r.jenis === 'masuk');
    if (!item) return;
    setHapusDialog({ open: true, id, nama: item.nama, qty: item.qty });
  };

  const confirmHapusRiwayat = () => {
    const { id, qty, nama } = hapusDialog;
    const barangItem = barang.find(b => b.nama === nama);
    if (!barangItem) {
      setSnackbar({ open: true, message: 'Barang tidak ditemukan, stok tidak bisa dikembalikan', severity: 'error' });
      setHapusDialog({ open: false, id: null, nama: '', qty: 0 });
      return;
    }

    setBarang(prev => prev.map(b =>
      b.id === barangItem.id ? { ...b, stok: Math.max(0, parseNumber(b.stok) - qty) } : b
    ));

    setRiwayat(prev => prev.filter(r => r.id !== id));

    setSnackbar({ open: true, message: `Riwayat masuk "${nama}" (${qty}) telah dihapus. Stok dikurangi.`, severity: 'info' });
    setHapusDialog({ open: false, id: null, nama: '', qty: 0 });
  };

  const barangById = useMemo(() => new Map((barang || []).map(b => [b.id, b])), [barang]);
  const totalStok = useMemo(() => (barang || []).reduce((s, b) => s + parseNumber(b?.stok), 0), [barang]);

  const riwayatKeluar = useMemo(() => riwayatNorm.filter(r => r.jenis === 'keluar'), [riwayatNorm]);
  const riwayatMasuk = useMemo(() => riwayatNorm.filter(r => r.jenis === 'masuk'), [riwayatNorm]);
  const riwayatPenjualan = useMemo(() => riwayatNorm.filter(r => r.jenis === 'penjualan'), [riwayatNorm]);

  const keluarPerBarang = useMemo(() => {
    const map = new Map();
    riwayatKeluar.forEach(r => {
      const nama = r?.nama;
      const qty = parseNumber(r?.qty);
      if (nama) map.set(nama, (map.get(nama) || 0) + qty);
    });
    return map;
  }, [riwayatKeluar]);

  const masukPerBarang = useMemo(() => {
    const map = new Map();
    riwayatMasuk.forEach(r => {
      const nama = r?.nama;
      const qty = parseNumber(r?.qty);
      if (nama) map.set(nama, (map.get(nama) || 0) + qty);
    });
    return map;
  }, [riwayatMasuk]);

  const onOpenConfirm = (kind) => {
    if (kind === 'masuk') {
      const b = barangById.get(Number(masukBarangId));
      const qty = parseNumber(masukQty);
      if (!b) return setSnackbar({ open: true, message: 'Pilih barang masuk', severity: 'warning' });
      if (qty <= 0) return setSnackbar({ open: true, message: 'Qty masuk harus > 0', severity: 'warning' });
      setConfirm({ open: true, kind, nama: b.nama, qty });
    } else if (kind === 'keluar') {
      const b = barangById.get(Number(keluarBarangId));
      const qty = parseNumber(keluarQty);
      if (!b) return setSnackbar({ open: true, message: 'Pilih barang keluar', severity: 'warning' });
      if (qty <= 0) return setSnackbar({ open: true, message: 'Qty keluar harus > 0', severity: 'warning' });
      if (parseNumber(b.stok) < qty) return setSnackbar({ open: true, message: `Stok ${b.nama} tidak cukup`, severity: 'error' });
      setConfirm({ open: true, kind, nama: b.nama, qty });
    }
  };

  const onConfirm = () => {
    const { kind, nama, qty } = confirm;
    if (!kind) return;

    if (kind === 'masuk') {
      const b = barangById.get(Number(masukBarangId));
      const qtyVal = parseNumber(masukQty);
      const harga = parseNumber(b?.harga);
      const total = harga * qtyVal;

      setBarang(prev => prev.map(p => p.id === b.id ? { ...p, stok: parseNumber(p.stok) + qtyVal } : p));
      setRiwayat(prev => [{
        id: Date.now(),
        nama: b.nama,
        qty: qtyVal,
        hargaSatuan: harga,
        total,
        tgl: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        tanggalLengkap: new Date().toLocaleDateString('id-ID'),
        metode: 'Masuk',
        jenis: 'masuk',
      }, ...(prev || [])]);

      setSnackbar({ open: true, message: `✅ ${b.nama} berhasil ditambahkan! Stok sekarang: ${b.stok + qtyVal}`, severity: 'success' });
      setMasukQty('');
    } else if (kind === 'keluar') {
      const b = barangById.get(Number(keluarBarangId));
      const qtyVal = parseNumber(keluarQty);
      const harga = parseNumber(b?.harga);
      const total = harga * qtyVal;

      setBarang(prev => prev.map(p => p.id === b.id ? { ...p, stok: parseNumber(p.stok) - qtyVal } : p));
      setRiwayat(prev => [{
        id: Date.now(),
        nama: b.nama,
        qty: qtyVal,
        hargaSatuan: harga,
        total,
        tgl: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        tanggalLengkap: new Date().toLocaleDateString('id-ID'),
        metode: 'Keluar',
        jenis: 'keluar',
      }, ...(prev || [])]);

      setSnackbar({ open: true, message: `➖ ${b.nama} berhasil dikeluarkan! Stok tersisa: ${b.stok - qtyVal}`, severity: 'success' });
      setKeluarQty('');
    }

    setConfirm({ open: false, kind: null, nama: '', qty: 0 });
  };

  const riwayatRows = useMemo(() => {
    return [...riwayatNorm].sort((a, b) => String(b.id).localeCompare(String(a.id))).map(r => ({
      ...r,
      jenisLabel: r.jenis === 'masuk' ? 'Masuk' : r.jenis === 'keluar' ? 'Keluar' : 'Penjualan',
    }));
  }, [riwayatNorm]);

  const statistik = {
    totalBarang: barang.length,
    totalStok,
    totalMasuk: riwayatMasuk.reduce((s, r) => s + parseNumber(r.qty), 0),
    totalKeluar: riwayatKeluar.reduce((s, r) => s + parseNumber(r.qty), 0),
    totalPenjualan: riwayatPenjualan.reduce((s, r) => s + parseNumber(r.qty), 0),
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: '#f4f7fc', minHeight: '100vh' }}>
      <Paper
        elevation={0}
        sx={{
          p: 3, mb: 3, borderRadius: 6,
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, ${alpha(theme.palette.primary.main, 0.02)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48 }}>
              <Inventory fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight={900} color="primary.main">Manajemen Stok</Typography>
              <Typography variant="body2" color="text.secondary">
                Kelola stok barang, input masuk/keluar, dan pantau riwayat transaksi
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <Chip icon={<Storefront />} label={`Total Barang: ${statistik.totalBarang}`} variant="outlined" />
            <Chip icon={<Inventory />} label={`Total Stok: ${statistik.totalStok}`} color="primary" />
            <Tooltip title="Reset data barang ke default 25 item">
              <IconButton onClick={handleResetBarang} color="primary" size="small">
                <Refresh />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Paper>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Zoom in><Card sx={{ p: 2, borderRadius: 4, boxShadow: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ bgcolor: alpha('#10b981', 0.15), color: '#10b981' }}><Add /></Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary">Total Masuk</Typography>
                <Typography variant="h6" fontWeight={800}>{statistik.totalMasuk}</Typography>
              </Box>
            </Stack>
          </Card></Zoom>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Zoom in><Card sx={{ p: 2, borderRadius: 4, boxShadow: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ bgcolor: alpha('#ef4444', 0.15), color: '#ef4444' }}><Remove /></Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary">Total Keluar</Typography>
                <Typography variant="h6" fontWeight={800}>{statistik.totalKeluar}</Typography>
              </Box>
            </Stack>
          </Card></Zoom>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Zoom in><Card sx={{ p: 2, borderRadius: 4, boxShadow: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ bgcolor: alpha('#3b82f6', 0.15), color: '#3b82f6' }}><TrendingUp /></Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary">Penjualan</Typography>
                <Typography variant="h6" fontWeight={800}>{statistik.totalPenjualan}</Typography>
              </Box>
            </Stack>
          </Card></Zoom>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Zoom in><Card sx={{ p: 2, borderRadius: 4, boxShadow: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar sx={{ bgcolor: alpha('#8b5cf6', 0.15), color: '#8b5cf6' }}><History /></Avatar>
              <Box>
                <Typography variant="caption" color="text.secondary">Total Transaksi</Typography>
                <Typography variant="h6" fontWeight={800}>{riwayatNorm.length}</Typography>
              </Box>
            </Stack>
          </Card></Zoom>
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 5, boxShadow: 3, overflow: 'hidden' }}>
        <Box sx={{ px: 2.5, pt: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
            <Tab value="dataBarang" label="📦 Data Barang" />
            <Tab value="masuk" label="➕ Barang Masuk" />
            <Tab value="keluar" label="➖ Barang Keluar" />
            <Tab value="riwayat" label="📜 Riwayat Transaksi" />
          </Tabs>
        </Box>
        <Box sx={{ p: 2.5 }}>
          <Fade in>
            <div>
              {tab === 'dataBarang' && (
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                        <Typography variant="h6" fontWeight={800}>Ringkasan Stok per Barang</Typography>
                        <Chip label={`Total Item: ${barang.length}`} size="small" />
                      </Stack>
                      <TableContainer component={Paper} sx={{ borderRadius: 3, maxHeight: 500 }}>
                        <Table size="medium" stickyHeader>
                          <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 800 }}>Barang</TableCell>
                              <TableCell sx={{ fontWeight: 800 }}>Kategori</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 800 }}>Masuk</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 800 }}>Keluar</TableCell>
                              <TableCell align="right" sx={{ fontWeight: 800 }}>Stok Saat Ini</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {barang.map((b) => (
                              <TableRow key={b.id} hover>
                                <TableCell sx={{ fontWeight: 700 }}>{b.nama}</TableCell>
                                <TableCell>{b.kategori}</TableCell>
                                <TableCell align="right">{masukPerBarang.get(b.nama) || 0}</TableCell>
                                <TableCell align="right">{keluarPerBarang.get(b.nama) || 0}</TableCell>
                                <TableCell align="right">
                                  <Chip
                                    label={parseNumber(b.stok)}
                                    color={parseNumber(b.stok) < 5 ? 'warning' : 'default'}
                                    size="small"
                                    variant={parseNumber(b.stok) < 5 ? 'filled' : 'outlined'}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>
              )}
              {tab === 'masuk' && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ p: 2.5, borderRadius: 4, bgcolor: alpha(theme.palette.success.main, 0.02) }}>
                      <Typography variant="h6" fontWeight={800} gutterBottom>Form Barang Masuk</Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <TextField
                            select
                            fullWidth
                            label="Pilih Barang"
                            value={masukBarangId}
                            onChange={(e) => setMasukBarangId(e.target.value)}
                            size="small"
                          >
                            {barang.map(b => (
                              <MenuItem key={b.id} value={b.id}>
                                {b.nama} (Stok: {b.stok})
                              </MenuItem>
                            ))}
                          </TextField>
                          <Tooltip title="Tambah barang baru">
                            <IconButton
                              color="primary"
                              onClick={() => setTambahDialog(true)}
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.08),
                                borderRadius: 2,
                                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.16) },
                              }}
                            >
                              <Add />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                        <TextField
                          fullWidth
                          label="Jumlah Masuk"
                          type="number"
                          value={masukQty}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '' || parseNumber(val) >= 0) {
                              setMasukQty(val);
                            }
                          }}
                          size="small"
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<Add />}
                          fullWidth
                          sx={{ borderRadius: 3, py: 1.2, fontWeight: 800 }}
                          onClick={() => onOpenConfirm('masuk')}
                        >
                          Simpan Masuk
                        </Button>
                        <Button
                          variant="text"
                          startIcon={<Add />}
                          onClick={() => setTambahDialog(true)}
                          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                        >
                          Tambah Barang Baru
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 4 }}>
                      <Typography variant="h6" fontWeight={800} gutterBottom>Riwayat Barang Masuk (Terbaru)</Typography>
                      <TableContainer component={Paper} sx={{ borderRadius: 3, maxHeight: 400 }}>
                        <Table size="small" stickyHeader>
                          <TableHead>
                            <TableRow>
                              <TableCell>Tanggal</TableCell>
                              <TableCell>Jam</TableCell>
                              <TableCell>Barang</TableCell>
                              <TableCell align="right">Qty</TableCell>
                              <TableCell align="right">Total</TableCell>
                              <TableCell align="center">Aksi</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {riwayatMasuk.slice(0, 20).map(r => (
                              <TableRow key={r.id} hover>
                                <TableCell>{r.tanggalLengkap}</TableCell>
                                <TableCell>{r.tgl}</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>{r.nama}</TableCell>
                                <TableCell align="right">{r.qty}</TableCell>
                                <TableCell align="right">{formatRupiah(r.total)}</TableCell>
                                <TableCell align="center">
                                  <Tooltip title="Hapus riwayat masuk ini">
                                    <IconButton
                                      size="small"
                                      color="error"
                                      onClick={() => handleHapusRiwayatMasuk(r.id)}
                                    >
                                      <Delete fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                              </TableRow>
                            ))}
                            {riwayatMasuk.length === 0 && (
                              <TableRow><TableCell colSpan={6} align="center">Belum ada riwayat masuk</TableCell></TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>
              )}
              {tab === 'keluar' && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ p: 2.5, borderRadius: 4, bgcolor: alpha(theme.palette.error.main, 0.02) }}>
                      <Typography variant="h6" fontWeight={800} gutterBottom>Form Barang Keluar</Typography>
                      <Divider sx={{ my: 1.5 }} />
                      <Stack spacing={2}>
                        <TextField
                          select
                          fullWidth
                          label="Pilih Barang"
                          value={keluarBarangId}
                          onChange={(e) => setKeluarBarangId(e.target.value)}
                          size="small"
                        >
                          {barang.map(b => (
                            <MenuItem key={b.id} value={b.id}>
                              {b.nama} (Stok: {b.stok})
                            </MenuItem>
                          ))}
                        </TextField>
                        <TextField
                          fullWidth
                          label="Jumlah Keluar"
                          type="number"
                          value={keluarQty}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val === '' || parseNumber(val) >= 0) {
                              setKeluarQty(val);
                            }
                          }}
                          size="small"
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<Remove />}
                          fullWidth
                          sx={{ borderRadius: 3, py: 1.2, fontWeight: 800 }}
                          onClick={() => onOpenConfirm('keluar')}
                        >
                          Simpan Keluar
                        </Button>
                      </Stack>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Paper variant="outlined" sx={{ p: 2, borderRadius: 4 }}>
                      <Typography variant="h6" fontWeight={800} gutterBottom>Riwayat Barang Keluar (Terbaru)</Typography>
                      <TableContainer component={Paper} sx={{ borderRadius: 3, maxHeight: 400 }}>
                        <Table size="small" stickyHeader>
                          <TableHead><TableRow><TableCell>Tanggal</TableCell><TableCell>Jam</TableCell><TableCell>Barang</TableCell><TableCell align="right">Qty</TableCell><TableCell align="right">Total</TableCell></TableRow></TableHead>
                          <TableBody>
                            {riwayatKeluar.slice(0, 20).map(r => (
                              <TableRow key={r.id} hover><TableCell>{r.tanggalLengkap}</TableCell><TableCell>{r.tgl}</TableCell><TableCell sx={{ fontWeight: 600 }}>{r.nama}</TableCell><TableCell align="right">{r.qty}</TableCell><TableCell align="right">{formatRupiah(r.total)}</TableCell></TableRow>
                            ))}
                            {riwayatKeluar.length === 0 && <TableRow><TableCell colSpan={5} align="center">Belum ada riwayat keluar</TableCell></TableRow>}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>
              )}
              {tab === 'riwayat' && (
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 4 }}>
                  <Typography variant="h6" fontWeight={800} gutterBottom>Semua Riwayat Transaksi</Typography>
                  <TableContainer component={Paper} sx={{ borderRadius: 3, maxHeight: 500 }}>
                    <Table size="small" stickyHeader>
                      <TableHead sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04) }}>
                        <TableRow><TableCell>Tanggal</TableCell><TableCell>Jam</TableCell><TableCell>Jenis</TableCell><TableCell>Barang</TableCell><TableCell align="right">Qty</TableCell><TableCell align="right">Total</TableCell><TableCell>Metode</TableCell></TableRow>
                      </TableHead>
                      <TableBody>
                        {riwayatRows.slice(0, 100).map(r => (
                          <TableRow key={r.id} hover>
                            <TableCell>{r.tanggalLengkap}</TableCell><TableCell>{r.tgl}</TableCell>
                            <TableCell><Chip size="small" label={r.jenisLabel} color={r.jenis === 'masuk' ? 'success' : r.jenis === 'keluar' ? 'error' : 'primary'} variant="outlined" /></TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>{r.nama}</TableCell><TableCell align="right">{r.qty}</TableCell><TableCell align="right">{formatRupiah(r.total)}</TableCell><TableCell>{r.metode || '-'}</TableCell>
                          </TableRow>
                        ))}
                        {riwayatRows.length === 0 && <TableRow><TableCell colSpan={7} align="center">Riwayat kosong</TableCell></TableRow>}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              )}
            </div>
          </Fade>
        </Box>
      </Card>

      {/* Dialog Tambah Barang */}
      <Dialog open={tambahDialog} onClose={() => setTambahDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 5 } }}>
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Tambah Barang Baru</Typography>
            <IconButton onClick={() => setTambahDialog(false)} size="small"><Close /></IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <TextField
              label="Nama Barang *"
              fullWidth
              value={newBarang.nama}
              onChange={(e) => setNewBarang({ ...newBarang, nama: e.target.value })}
              placeholder="Contoh: Baut 10mm"
            />
            <TextField
              label="Kategori *"
              fullWidth
              value={newBarang.kategori}
              onChange={(e) => setNewBarang({ ...newBarang, kategori: e.target.value })}
              placeholder="Contoh: Alat, Material"
            />
            <TextField
              label="Harga (Rp) *"
              fullWidth
              value={hargaDisplay}
              onChange={handleHargaChange}
              onFocus={handleHargaFocus}
              onBlur={handleHargaBlur}
              placeholder="Masukkan harga satuan"
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button variant="outlined" onClick={() => setTambahDialog(false)}>Batal</Button>
          <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleTambahBarang} sx={{ borderRadius: 3, fontWeight: 700 }}>Tambahkan</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Konfirmasi Hapus Riwayat Masuk */}
      <Dialog open={hapusDialog.open} onClose={() => setHapusDialog({ open: false, id: null, nama: '', qty: 0 })} PaperProps={{ sx: { borderRadius: 5 } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Hapus Riwayat Masuk</DialogTitle>
        <DialogContent dividers>
          <Typography>Anda yakin ingin menghapus riwayat masuk ini?</Typography>
          <Typography sx={{ mt: 1 }}>Barang: <b>{hapusDialog.nama}</b></Typography>
          <Typography>Jumlah: <b>{hapusDialog.qty}</b></Typography>
          <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
            Stok barang akan dikurangi sebanyak {hapusDialog.qty}.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setHapusDialog({ open: false, id: null, nama: '', qty: 0 })}>Batal</Button>
          <Button variant="contained" color="error" onClick={confirmHapusRiwayat}>Hapus</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Konfirmasi Masuk/Keluar */}
      <Dialog open={confirm.open} onClose={() => setConfirm({ open: false, kind: null, nama: '', qty: 0 })} PaperProps={{ sx: { borderRadius: 5 } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Konfirmasi {confirm.kind === 'masuk' ? 'Barang Masuk' : 'Barang Keluar'}</DialogTitle>
        <DialogContent dividers>
          <Typography>Barang: <b>{confirm.nama}</b></Typography>
          <Typography>Jumlah: <b>{confirm.qty}</b></Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setConfirm({ open: false, kind: null, nama: '', qty: 0 })}>Batal</Button>
          <Button variant="contained" color={confirm.kind === 'keluar' ? 'error' : 'success'} onClick={onConfirm}>Simpan</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(p => ({ ...p, open: false }))}>
        <Alert severity={snackbar.severity} sx={{ borderRadius: 3 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}