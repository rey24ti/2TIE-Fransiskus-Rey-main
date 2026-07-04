import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
  MenuItem,
  Chip,
  InputAdornment,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Stack,
  Avatar,
  Divider,
  Fade,
  Grow,
  Zoom,
  Skeleton,
  useMediaQuery,
  useTheme,
  alpha,
  ImageList,
  ImageListItem
} from '@mui/material';

// Ikon
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InventoryIcon from '@mui/icons-material/Inventory';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';

// ==================== KONSTANTA & DATA DUMMY ====================
const KATEGORI_PRODUK = [
  { value: 'Semen', label: 'Semen', color: '#64748b' },
  { value: 'Cat', label: 'Cat', color: '#2563eb' },
  { value: 'Besi & Baja', label: 'Besi & Baja', color: '#dc2626' },
  { value: 'Pipa & Sambungan', label: 'Pipa & Sambungan', color: '#059669' },
  { value: 'Bata & Batako', label: 'Bata & Batako', color: '#d97706' },
  { value: 'Paku & Alat', label: 'Paku & Alat', color: '#7c3aed' },
  { value: 'Lainnya', label: 'Lainnya', color: '#6b7280' }
];

const SATUAN_OPTIONS = [
  { value: 'pcs', label: 'Pcs' },
  { value: 'kg', label: 'Kg' },
  { value: 'sak', label: 'Sak' },
  { value: 'liter', label: 'Liter' },
  { value: 'meter', label: 'Meter' },
  { value: 'lembar', label: 'Lembar' }
];

// Gambar produk yang lebih realistis (placeholder dengan nama produk)
const getGambarProduk = (namaProduk) => {
  const colorMap = {
    'Semen': 'e2e8f0/334155',
    'Cat': 'dbeafe/1e40af',
    'Besi': 'fef9c3/713f12',
    'Pipa': 'dcfce7/14532d',
    'Bata': 'fee2e2/7f1d1d',
    'Paku': 'f1f5f9/475569'
  };
  let warna = 'f1f5f9/475569';
  for (const [key, val] of Object.entries(colorMap)) {
    if (namaProduk.includes(key)) { warna = val; break; }
  }
  return `https://placehold.co/600x400/${warna}?text=${encodeURIComponent(namaProduk)}`;
};

const dataAwalDummy = [
  { id: 1, nama: 'Semen Tiga Roda', kategori: 'Semen', stok: 50, stokMinimal: 10, satuan: 'sak', hargaBeli: 62000, hargaJual: 65000, deskripsi: 'Semen PCC berkualitas tinggi untuk plesteran dan pasangan bata.', supplier: 'PT Semen Padang', lokasiRak: 'A-01', gambar: getGambarProduk('Semen Tiga Roda') },
  { id: 2, nama: 'Cat Tembok Dulux 5kg', kategori: 'Cat', stok: 12, stokMinimal: 5, satuan: 'kg', hargaBeli: 165000, hargaJual: 180000, deskripsi: 'Cat interior premium dengan daya sebar luas dan tahan lama.', supplier: 'PT Dulux Indonesia', lokasiRak: 'B-03', gambar: getGambarProduk('Cat Tembok Dulux') },
  { id: 3, nama: 'Paku Beton 5cm', kategori: 'Paku & Alat', stok: 100, stokMinimal: 20, satuan: 'kg', hargaBeli: 450, hargaJual: 500, deskripsi: 'Paku baja kuat khusus untuk permukaan beton keras.', supplier: 'CV Makmur Jaya', lokasiRak: 'C-01', gambar: getGambarProduk('Paku Beton') },
  { id: 4, nama: 'Besi Beton 8mm', kategori: 'Besi & Baja', stok: 85, stokMinimal: 15, satuan: 'batang', hargaBeli: 42000, hargaJual: 45000, deskripsi: 'Besi tulangan struktur bangunan standar SNI.', supplier: 'PT Krakatau Steel', lokasiRak: 'D-02', gambar: getGambarProduk('Besi Beton 8mm') },
  { id: 5, nama: 'Besi Beton 10mm', kategori: 'Besi & Baja', stok: 60, stokMinimal: 15, satuan: 'batang', hargaBeli: 64000, hargaJual: 68000, deskripsi: 'Besi tulangan struktur cor ukuran medium.', supplier: 'PT Krakatau Steel', lokasiRak: 'D-02', gambar: getGambarProduk('Besi Beton 10mm') },
  { id: 6, nama: 'Besi Beton 12mm', kategori: 'Besi & Baja', stok: 40, stokMinimal: 10, satuan: 'batang', hargaBeli: 90000, hargaJual: 95000, deskripsi: 'Besi beton ulir super kuat untuk fondasi utama.', supplier: 'PT Krakatau Steel', lokasiRak: 'D-03', gambar: getGambarProduk('Besi Beton 12mm') },
  { id: 7, nama: 'Pipa PVC Wavin 3 Inch', kategori: 'Pipa & Sambungan', stok: 35, stokMinimal: 8, satuan: 'batang', hargaBeli: 50000, hargaJual: 55000, deskripsi: 'Pipa saluran air bersih bertekanan tinggi.', supplier: 'PT Wavin Indonesia', lokasiRak: 'E-01', gambar: getGambarProduk('Pipa PVC 3 Inch') },
  { id: 8, nama: 'Pipa PVC Wavin 4 Inch', kategori: 'Pipa & Sambungan', stok: 25, stokMinimal: 5, satuan: 'batang', hargaBeli: 72000, hargaJual: 78000, deskripsi: 'Pipa pembuangan air kotor ukuran besar.', supplier: 'PT Wavin Indonesia', lokasiRak: 'E-01', gambar: getGambarProduk('Pipa PVC 4 Inch') },
  { id: 9, nama: 'Bata Merah Press', kategori: 'Bata & Batako', stok: 2500, stokMinimal: 500, satuan: 'pcs', hargaBeli: 750, hargaJual: 850, deskripsi: 'Bata merah matang hasil press mesin, kokoh dan presisi.', supplier: 'UD Bata Jaya', lokasiRak: 'F-01', gambar: getGambarProduk('Bata Merah Press') },
  { id: 10, nama: 'Batako Semen', kategori: 'Bata & Batako', stok: 800, stokMinimal: 200, satuan: 'pcs', hargaBeli: 3200, hargaJual: 3500, deskripsi: 'Batako cetak semen kuat untuk dinding pagar dan rumah.', supplier: 'CV Beton Mandiri', lokasiRak: 'F-02', gambar: getGambarProduk('Batako Semen') }
];

// Generate lebih banyak data untuk pagination
for (let i = 11; i <= 45; i++) {
  const randomKategori = KATEGORI_PRODUK[Math.floor(Math.random() * KATEGORI_PRODUK.length)];
  const randomSatuan = SATUAN_OPTIONS[Math.floor(Math.random() * SATUAN_OPTIONS.length)];
  dataAwalDummy.push({
    id: i,
    nama: `Produk ${randomKategori.label} ${i}`,
    kategori: randomKategori.value,
    stok: Math.floor(Math.random() * 500) + 10,
    stokMinimal: Math.floor(Math.random() * 50) + 5,
    satuan: randomSatuan.value,
    hargaBeli: Math.floor(Math.random() * 100000) + 5000,
    hargaJual: Math.floor(Math.random() * 150000) + 10000,
    deskripsi: `Deskripsi otomatis untuk produk ${randomKategori.label} nomor ${i}. Kualitas terjamin.`,
    supplier: `Supplier ${Math.floor(Math.random() * 10) + 1}`,
    lokasiRak: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}`,
    gambar: getGambarProduk(`Produk ${randomKategori.label}`)
  });
}

// ==================== CUSTOM HOOKS ====================
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// ==================== KOMPONEN UTAMA ====================
export default function InventarisToko() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // State
  const [data, setData] = useState(dataAwalDummy);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('');
  const [stokFilter, setStokFilter] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortField, setSortField] = useState('nama');
  const [sortDirection, setSortDirection] = useState('asc');
  const [viewDetailId, setViewDetailId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Semen',
    stok: '',
    stokMinimal: '',
    satuan: 'pcs',
    hargaBeli: '',
    hargaJual: '',
    deskripsi: '',
    supplier: '',
    lokasiRak: ''
  });

  const debouncedSearch = useDebounce(search, 300);

  // Filter, Sort, Search
  const filteredData = useMemo(() => {
    let result = [...data];

    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(item =>
        item.nama.toLowerCase().includes(searchLower) ||
        item.id.toString().includes(debouncedSearch) ||
        item.supplier.toLowerCase().includes(searchLower) ||
        item.lokasiRak.toLowerCase().includes(searchLower)
      );
    }

    if (kategoriFilter) {
      result = result.filter(item => item.kategori === kategoriFilter);
    }

    if (stokFilter === 'low') {
      result = result.filter(item => item.stok <= item.stokMinimal && item.stok > 0);
    } else if (stokFilter === 'out') {
      result = result.filter(item => item.stok === 0);
    }

    result.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, debouncedSearch, kategoriFilter, stokFilter, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const stats = useMemo(() => {
    const totalProducts = data.length;
    const totalStock = data.reduce((sum, item) => sum + item.stok, 0);
    const totalValue = data.reduce((sum, item) => sum + (item.stok * item.hargaJual), 0);
    const lowStockCount = data.filter(item => item.stok <= item.stokMinimal && item.stok > 0).length;
    const outOfStockCount = data.filter(item => item.stok === 0).length;
    return { totalProducts, totalStock, totalValue, lowStockCount, outOfStockCount };
  }, [data]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleOpenDialog = (mode, row = null) => {
    setDialogMode(mode);
    if (row) {
      setSelectedRow(row);
      if (mode === 'edit') {
        setFormData({
          nama: row.nama,
          kategori: row.kategori,
          stok: row.stok.toString(),
          stokMinimal: row.stokMinimal.toString(),
          satuan: row.satuan,
          hargaBeli: row.hargaBeli.toString(),
          hargaJual: row.hargaJual.toString(),
          deskripsi: row.deskripsi,
          supplier: row.supplier,
          lokasiRak: row.lokasiRak
        });
      } else if (mode === 'view') {
        setViewDetailId(row.id);
        return;
      }
    } else {
      setFormData({
        nama: '',
        kategori: 'Semen',
        stok: '',
        stokMinimal: '',
        satuan: 'pcs',
        hargaBeli: '',
        hargaJual: '',
        deskripsi: '',
        supplier: '',
        lokasiRak: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleSaveData = () => {
    if (!formData.nama.trim()) {
      setSnackbar({ open: true, message: 'Nama produk harus diisi', severity: 'error' });
      return;
    }
    if (!formData.hargaJual || parseFloat(formData.hargaJual) <= 0) {
      setSnackbar({ open: true, message: 'Harga jual harus lebih dari 0', severity: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (dialogMode === 'add') {
        const newId = Math.max(...data.map(d => d.id), 0) + 1;
        const newData = {
          id: newId,
          nama: formData.nama,
          kategori: formData.kategori,
          stok: parseInt(formData.stok) || 0,
          stokMinimal: parseInt(formData.stokMinimal) || 0,
          satuan: formData.satuan,
          hargaBeli: parseFloat(formData.hargaBeli) || 0,
          hargaJual: parseFloat(formData.hargaJual),
          deskripsi: formData.deskripsi || 'Tidak ada deskripsi',
          supplier: formData.supplier || '-',
          lokasiRak: formData.lokasiRak || '-',
          gambar: getGambarProduk(formData.nama)
        };
        setData([newData, ...data]);
        setSnackbar({ open: true, message: 'Produk berhasil ditambahkan', severity: 'success' });
      } else if (dialogMode === 'edit' && selectedRow) {
        const updatedData = data.map(item =>
          item.id === selectedRow.id ? { ...item, ...formData, stok: parseInt(formData.stok), stokMinimal: parseInt(formData.stokMinimal), hargaBeli: parseFloat(formData.hargaBeli), hargaJual: parseFloat(formData.hargaJual), gambar: getGambarProduk(formData.nama) } : item
        );
        setData(updatedData);
        setSnackbar({ open: true, message: 'Produk berhasil diupdate', severity: 'success' });
      }
      handleCloseDialog();
      setLoading(false);
    }, 500);
  };

  const handleDeleteData = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedData = data.filter(item => item.id !== selectedRow.id);
      setData(updatedData);
      setSnackbar({ open: true, message: 'Produk berhasil dihapus', severity: 'success' });
      handleCloseDialog();
      setLoading(false);
    }, 500);
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Nama Produk', 'Kategori', 'Stok', 'Stok Minimal', 'Satuan', 'Harga Beli', 'Harga Jual', 'Supplier', 'Lokasi Rak', 'Deskripsi'];
    const csvData = filteredData.map(item => [
      item.id,
      item.nama,
      item.kategori,
      item.stok,
      item.stokMinimal,
      item.satuan,
      formatRupiah(item.hargaBeli),
      formatRupiah(item.hargaJual),
      item.supplier,
      item.lokasiRak,
      item.deskripsi
    ]);
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inventaris_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
    URL.revokeObjectURL(url);
    setSnackbar({ open: true, message: 'Data berhasil diexport', severity: 'success' });
  };

  // Tampilan Detail Produk
  if (viewDetailId !== null) {
    const product = data.find(item => item.id === viewDetailId);
    if (!product) {
      setViewDetailId(null);
      return null;
    }
    return (
      <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => setViewDetailId(null)} sx={{ mb: 3, textTransform: 'none' }}>
          Kembali ke Daftar Produk
        </Button>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Card sx={{ borderRadius: '20px', overflow: 'hidden', position: 'sticky', top: 20 }}>
              <Box sx={{ height: 300, bgcolor: '#f1f5f9' }}>
                <img src={product.gambar} alt={product.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card sx={{ borderRadius: '20px', p: 3 }}>
              <Typography variant="caption" sx={{ color: '#2563eb', fontWeight: 700 }}>ID: #{product.id}</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, mb: 2 }}>{product.nama}</Typography>
              <Chip label={product.kategori} size="small" sx={{ mb: 2, bgcolor: alpha(KATEGORI_PRODUK.find(k => k.value === product.kategori)?.color || '#64748b', 0.1), color: KATEGORI_PRODUK.find(k => k.value === product.kategori)?.color }} />
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Stok Saat Ini</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: product.stok <= product.stokMinimal ? '#dc2626' : '#15803d' }}>{product.stok} {product.satuan}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Stok Minimal</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{product.stokMinimal} {product.satuan}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Harga Jual</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#2563eb' }}>{formatRupiah(product.hargaJual)} / {product.satuan}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Harga Beli</Typography>
                  <Typography variant="body2">{formatRupiah(product.hargaBeli)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Supplier</Typography>
                  <Typography variant="body2">{product.supplier}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Lokasi Rak</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{product.lokasiRak}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Deskripsi</Typography>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>{product.deskripsi}</Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="contained" startIcon={<EditIcon />} onClick={() => { setViewDetailId(null); handleOpenDialog('edit', product); }}>Edit Produk</Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }

  // Dashboard Utama
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Grow in timeout={500}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
              <InventoryIcon sx={{ fontSize: 32, color: '#2563eb' }} />
              Inventaris Toko Material
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b' }}>Kelola stok barang, harga, dan informasi produk bangunan</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Export CSV">
              <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExportCSV} sx={{ borderRadius: '12px', textTransform: 'none' }}>Export</Button>
            </Tooltip>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog('add')} sx={{ bgcolor: '#2563eb', borderRadius: '12px', textTransform: 'none', fontWeight: 600, boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }}>Tambah Produk</Button>
          </Stack>
        </Box>
      </Grow>

      {/* Statistik Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Produk', value: stats.totalProducts, icon: <StoreIcon />, color: '#2563eb', bg: 'linear-gradient(135deg, #e0e7ff, #eef2ff)' },
          { title: 'Total Stok', value: stats.totalStock, unit: 'unit', icon: <InventoryIcon />, color: '#059669', bg: 'linear-gradient(135deg, #dcfce7, #f0fdf4)' },
          { title: 'Nilai Inventaris', value: formatRupiah(stats.totalValue), icon: <AttachMoneyIcon />, color: '#d97706', bg: 'linear-gradient(135deg, #fef3c7, #fffbeb)' },
          { title: 'Stok Menipis', value: stats.lowStockCount, icon: <WarningIcon />, color: '#dc2626', bg: 'linear-gradient(135deg, #fee2e2, #fef2f2)' }
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Zoom in timeout={300 + idx * 100}>
              <Card sx={{ background: card.bg, borderRadius: '20px', p: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700 }}>{card.title}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: card.color, mt: 1 }}>{card.value} <Typography component="span" variant="caption">{card.unit || ''}</Typography></Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: alpha(card.color, 0.1), color: card.color, width: 48, height: 48 }}>{card.icon}</Avatar>
                </Box>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Filter & Search */}
      <Fade in timeout={500}>
        <Card sx={{ p: 2.5, mb: 4, borderRadius: '16px' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField fullWidth size="small" placeholder="Cari produk, supplier, atau lokasi rak..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>, endAdornment: search && <IconButton size="small" onClick={() => setSearch('')}><CloseIcon fontSize="small" /></IconButton> }} sx={{ bgcolor: '#f8fafc', borderRadius: '10px' }} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Kategori</InputLabel>
                <Select value={kategoriFilter} onChange={(e) => { setKategoriFilter(e.target.value); setPage(1); }} label="Kategori">
                  <MenuItem value="">Semua Kategori</MenuItem>
                  {KATEGORI_PRODUK.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Filter Stok</InputLabel>
                <Select value={stokFilter} onChange={(e) => { setStokFilter(e.target.value); setPage(1); }} label="Filter Stok">
                  <MenuItem value="">Semua</MenuItem>
                  <MenuItem value="low">Stok Menipis (≤ Minimal)</MenuItem>
                  <MenuItem value="out">Stok Habis</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button fullWidth variant="outlined" startIcon={<RefreshIcon />} onClick={() => { setSearch(''); setKategoriFilter(''); setStokFilter(''); setPage(1); }} sx={{ borderRadius: '10px', textTransform: 'none', height: 40 }}>Reset</Button>
            </Grid>
          </Grid>
        </Card>
      </Fade>

      {/* Tabel Produk - BADGE BIRU TELAH DIHAPUS */}
      <TableContainer component={Paper} sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              {[
                { field: 'id', label: 'ID', width: 80 },
                { field: 'nama', label: 'Nama Produk', width: 200 },
                { field: 'kategori', label: 'Kategori', width: 130 },
                { field: 'stok', label: 'Stok', width: 100, align: 'center' },
                { field: 'hargaJual', label: 'Harga Jual', width: 130, align: 'right' },
                { field: 'supplier', label: 'Supplier', width: 150 },
                { field: 'lokasiRak', label: 'Lokasi Rak', width: 100 },
                { field: 'actions', label: 'Aksi', width: 120, align: 'center' }
              ].map(col => (
                <TableCell key={col.field} sx={{ fontWeight: 700, color: '#475569', cursor: col.field !== 'actions' ? 'pointer' : 'default', width: col.width, textAlign: col.align || 'left' }} onClick={() => col.field !== 'actions' && handleSort(col.field)}>
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>{col.label}{sortField === col.field && <SortByAlphaIcon fontSize="small" sx={{ transform: sortDirection === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)' }} />}</Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow><TableCell colSpan={8} align="center" sx={{ py: 8 }}>Tidak ada produk ditemukan</TableCell></TableRow>
            ) : (
              paginatedData.map((row, idx) => {
                const isLowStock = row.stok <= row.stokMinimal && row.stok > 0;
                const isOutStock = row.stok === 0;
                // Tentukan warna teks stok
                let stokColor = '#1e293b'; // default hitam
                if (isLowStock) stokColor = '#d97706'; // orange
                if (isOutStock) stokColor = '#dc2626'; // merah
                return (
                  <Grow in timeout={idx * 50} key={row.id}>
                    <TableRow hover>
                      <TableCell>#{row.id}</TableCell>
                      <TableCell><Typography sx={{ fontWeight: 600 }}>{row.nama}</Typography></TableCell>
                      <TableCell><Chip label={row.kategori} size="small" sx={{ bgcolor: alpha(KATEGORI_PRODUK.find(k => k.value === row.kategori)?.color || '#64748b', 0.1), color: KATEGORI_PRODUK.find(k => k.value === row.kategori)?.color, fontWeight: 600 }} /></TableCell>
                      {/* PERBAIKAN: Badge dihapus, hanya teks stok dengan warna sesuai kondisi */}
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: 700, color: stokColor }}>
                          {row.stok} {row.satuan}
                        </Typography>
                      </TableCell>
                      <TableCell align="right"><Typography sx={{ fontWeight: 700, color: '#2563eb' }}>{formatRupiah(row.hargaJual)}</Typography></TableCell>
                      <TableCell>{row.supplier}</TableCell>
                      <TableCell><Chip label={row.lokasiRak} size="small" variant="outlined" sx={{ fontFamily: 'monospace' }} /></TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Tooltip title="Lihat Detail"><IconButton size="small" onClick={() => handleOpenDialog('view', row)}><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
                          <Tooltip title="Edit"><IconButton size="small" onClick={() => handleOpenDialog('edit', row)} sx={{ color: '#3b82f6' }}><EditIcon fontSize="small" /></IconButton></Tooltip>
                          <Tooltip title="Hapus"><IconButton size="small" onClick={() => handleOpenDialog('delete', row)} sx={{ color: '#ef4444' }}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </Grow>
                );
              })
            )}
          </TableBody>
        </Table>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', borderTop: '1px solid #e2e8f0' }}>
          <Typography variant="caption" sx={{ color: '#64748b' }}>Menampilkan {(page-1)*rowsPerPage+1} - {Math.min(page*rowsPerPage, filteredData.length)} dari {filteredData.length} produk</Typography>
          <Pagination count={totalPages} page={page} onChange={(e, v) => setPage(v)} color="primary" shape="rounded" size={isMobile ? 'small' : 'medium'} showFirstButton showLastButton />
          <FormControl size="small" sx={{ minWidth: 100 }}><Select value={rowsPerPage} onChange={(e) => { setRowsPerPage(e.target.value); setPage(1); }}><MenuItem value={5}>5 / halaman</MenuItem><MenuItem value={10}>10 / halaman</MenuItem><MenuItem value={25}>25 / halaman</MenuItem><MenuItem value={50}>50 / halaman</MenuItem></Select></FormControl>
        </Box>
      </TableContainer>

      {/* Dialog Form / Delete */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '20px' } }}>
        <DialogTitle sx={{ bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{dialogMode === 'add' ? 'Tambah Produk Baru' : dialogMode === 'edit' ? 'Edit Produk' : 'Konfirmasi Hapus'}</Typography>
          <IconButton onClick={handleCloseDialog}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {dialogMode === 'delete' ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <WarningIcon sx={{ fontSize: 64, color: '#ef4444', mb: 2 }} />
              <Typography>Yakin hapus <strong>{selectedRow?.nama}</strong>? Tindakan tidak dapat dibatalkan.</Typography>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}><TextField fullWidth label="Nama Produk" value={formData.nama} onChange={(e) => setFormData({...formData, nama: e.target.value})} required /></Grid>
              <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Kategori</InputLabel><Select value={formData.kategori} onChange={(e) => setFormData({...formData, kategori: e.target.value})} label="Kategori">{KATEGORI_PRODUK.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}</Select></FormControl></Grid>
              <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Satuan</InputLabel><Select value={formData.satuan} onChange={(e) => setFormData({...formData, satuan: e.target.value})} label="Satuan">{SATUAN_OPTIONS.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}</Select></FormControl></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Stok" type="number" value={formData.stok} onChange={(e) => setFormData({...formData, stok: e.target.value})} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Stok Minimal" type="number" value={formData.stokMinimal} onChange={(e) => setFormData({...formData, stokMinimal: e.target.value})} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Harga Beli" type="number" value={formData.hargaBeli} onChange={(e) => setFormData({...formData, hargaBeli: e.target.value})} InputProps={{ startAdornment: <InputAdornment position="start">Rp</InputAdornment> }} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Harga Jual" type="number" value={formData.hargaJual} onChange={(e) => setFormData({...formData, hargaJual: e.target.value})} required InputProps={{ startAdornment: <InputAdornment position="start">Rp</InputAdornment> }} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Supplier" value={formData.supplier} onChange={(e) => setFormData({...formData, supplier: e.target.value})} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Lokasi Rak" value={formData.lokasiRak} onChange={(e) => setFormData({...formData, lokasiRak: e.target.value})} placeholder="Contoh: A-01" /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Deskripsi" multiline rows={2} value={formData.deskripsi} onChange={(e) => setFormData({...formData, deskripsi: e.target.value})} /></Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleCloseDialog}>Batal</Button>
          {dialogMode !== 'view' && <Button variant="contained" onClick={dialogMode === 'delete' ? handleDeleteData : handleSaveData} sx={{ bgcolor: dialogMode === 'delete' ? '#ef4444' : '#2563eb' }}>{dialogMode === 'add' ? 'Simpan' : dialogMode === 'edit' ? 'Update' : 'Hapus'}</Button>}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({...snackbar, open: false})} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} icon={snackbar.severity === 'success' ? <CheckCircleIcon /> : <WarningIcon />} sx={{ borderRadius: '12px' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}