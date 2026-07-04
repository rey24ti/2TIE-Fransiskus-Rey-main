import React, { useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
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
  Avatar,
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
  Badge,
  Divider,
  Fade,
  Grow,
  Skeleton,
  useMediaQuery,
  useTheme,
  alpha,
  Zoom
} from '@mui/material';

// Import Ikon
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import PersonIcon from '@mui/icons-material/Person';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BusinessIcon from '@mui/icons-material/Business';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

// ==================== CONSTANTS ====================
const TIPE_PELANGGAN = [
  { value: 'Kontraktor', label: 'Kontraktor', icon: <BusinessIcon />, color: '#2563eb' },
  { value: 'Umum', label: 'Pelanggan Umum', icon: <PersonIcon />, color: '#16a34a' },
  { value: 'Grosir / Toko', label: 'Grosir / Toko', icon: <StorefrontIcon />, color: '#ea580c' },
  { value: 'Supplier', label: 'Supplier', icon: <ApartmentOutlinedIcon />, color: '#0d9488' },
];

const STATUS_OPTIONS = [
  { value: 'Aktif', label: 'Aktif', color: '#16a34a', bgColor: '#dcfce7' },
  { value: 'Tidak Aktif', label: 'Tidak Aktif', color: '#dc2626', bgColor: '#fee2e2' },
  { value: 'Mitra Utama', label: 'Mitra Utama', color: '#1e40af', bgColor: '#dbeafe' },
  { value: 'Bon Aktif', label: 'Bon Aktif', color: '#ea580c', bgColor: '#ffedd5' },
  { value: 'Blacklist', label: 'Blacklist', color: '#991b1b', bgColor: '#fef2f2' },
];

// ==================== DATA DUMMY YANG LEBIH LENGKAP ====================
const generateDummyData = () => {
  const data = [
    { id: "CUST-001", nama: "Budi Santoso", perusahaan: "PT Bangun Jaya", tipe: "Kontraktor", kontak: "0812-3456-7890", email: "budi@bangunjaya.com", alamat: "Proyek Perumahan Asri Blok C, Jakarta Selatan", status: "Aktif", joinDate: "2023-01-15", totalTransaksi: 24, totalPembelian: 850000000, piutang: 0 },
    { id: "SUPP-001", nama: "Siti Rahayu", perusahaan: "PT Semen Padang", tipe: "Supplier", kontak: "021-9988-7766", email: "siti@semenspadang.com", alamat: "Kawasan Industri Padang, Sumatera Barat", status: "Mitra Utama", joinDate: "2022-06-10", totalTransaksi: 156, totalPembelian: 2500000000, piutang: 0 },
    { id: "CUST-002", nama: "Agus Wijaya", perusahaan: "-", tipe: "Umum", kontak: "0857-1122-3344", email: "agus.wijaya@gmail.com", alamat: "Jl. Merdeka No. 12, Pekanbaru", status: "Aktif", joinDate: "2023-08-20", totalTransaksi: 8, totalPembelian: 12500000, piutang: 0 },
    { id: "SUPP-002", nama: "Dedi Irawan", perusahaan: "CV Jaya Baja", tipe: "Supplier", kontak: "0761-5544-3322", email: "dedi@jayabaja.com", alamat: "Jl. Soekarno Hatta KM 9, Pekanbaru", status: "Aktif", joinDate: "2023-03-05", totalTransaksi: 89, totalPembelian: 950000000, piutang: 0 },
    { id: "CUST-003", nama: "Maya Sari", perusahaan: "Toko Jaya Abadi", tipe: "Grosir / Toko", kontak: "0813-7788-9900", email: "maya@jayaabadi.com", alamat: "Jl. Sudirman No. 45, Jakarta Pusat", status: "Bon Aktif", joinDate: "2023-05-12", totalTransaksi: 45, totalPembelian: 345000000, piutang: 127500000 },
    { id: "CUST-004", nama: "Rudi Hartono", perusahaan: "CV Karya Mandiri", tipe: "Kontraktor", kontak: "0822-9988-7766", email: "rudi@karyamandiri.com", alamat: "Jl. Gatot Subroto No. 88, Bandung", status: "Aktif", joinDate: "2023-10-01", totalTransaksi: 12, totalPembelian: 230000000, piutang: 0 },
    { id: "SUPP-003", nama: "Linda Permata", perusahaan: "PT Maju Bersama", tipe: "Supplier", kontak: "031-5566-7788", email: "linda@majubersama.com", alamat: "Kawasan Industri Rungkut, Surabaya", status: "Aktif", joinDate: "2022-11-18", totalTransaksi: 67, totalPembelian: 780000000, piutang: 0 },
    { id: "CUST-005", nama: "Andi Saputra", perusahaan: "Toko Bangunan Berkah", tipe: "Grosir / Toko", kontak: "0852-3344-5566", email: "andi@berkahbangunan.com", alamat: "Jl. Ahmad Yani No. 23, Semarang", status: "Aktif", joinDate: "2023-07-25", totalTransaksi: 32, totalPembelian: 187500000, piutang: 0 },
    { id: "CUST-006", nama: "Farah Azizah", perusahaan: "-", tipe: "Umum", kontak: "0877-6655-4433", email: "farah.azizah@gmail.com", alamat: "Jl. Diponegoro No. 7, Yogyakarta", status: "Tidak Aktif", joinDate: "2023-02-14", totalTransaksi: 3, totalPembelian: 4500000, piutang: 0 },
    { id: "SUPP-004", nama: "Hendra Gunawan", perusahaan: "PT Besi Baja Indonesia", tipe: "Supplier", kontak: "021-8877-6655", email: "hendra@besibaja.com", alamat: "Jl. Raya Bekasi KM 25, Jakarta Timur", status: "Mitra Utama", joinDate: "2021-09-30", totalTransaksi: 234, totalPembelian: 4200000000, piutang: 0 },
    { id: "CUST-007", nama: "Sri Mulyani", perusahaan: "Toko Material Subur", tipe: "Grosir / Toko", kontak: "0819-1122-3344", email: "sri@materialsubur.com", alamat: "Jl. Pahlawan No. 15, Malang", status: "Bon Aktif", joinDate: "2023-04-18", totalTransaksi: 28, totalPembelian: 198000000, piutang: 45000000 },
  ];
  
  // Tambah data random untuk testing pagination
  for (let i = 8; i <= 35; i++) {
    const randomType = TIPE_PELANGGAN[Math.floor(Math.random() * TIPE_PELANGGAN.length)];
    const randomStatus = STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)];
    data.push({
      id: `${randomType.value === 'Supplier' ? 'SUPP' : 'CUST'}-${String(i+100).padStart(3, '0')}`,
      nama: `Pelanggan ${i}`,
      perusahaan: randomType.value === 'Supplier' ? `PT Supplier ${i}` : `Toko ${i}`,
      tipe: randomType.value,
      kontak: `0812-${String(i).padStart(4, '0')}-${String(i).padStart(4, '0')}`,
      email: `pelanggan${i}@email.com`,
      alamat: `Jl. Contoh No. ${i}, Kota Contoh`,
      status: randomStatus.value,
      joinDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      totalTransaksi: Math.floor(Math.random() * 100),
      totalPembelian: Math.floor(Math.random() * 500000000),
      piutang: Math.random() > 0.8 ? Math.floor(Math.random() * 100000000) : 0,
    });
  }
  
  return data;
};

// ==================== CUSTOM HOOKS ====================
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

// ==================== MAIN COMPONENT ====================
export default function Pelanggan() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // States
  const [data, setData] = useState(generateDummyData());
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tipeFilter, setTipeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add'); // add, edit, delete, view
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sortField, setSortField] = useState('nama');
  const [sortDirection, setSortDirection] = useState('asc');
  
  // Form states
  const [formData, setFormData] = useState({
    nama: '',
    perusahaan: '',
    tipe: 'Umum',
    kontak: '',
    email: '',
    alamat: '',
    status: 'Aktif'
  });
  
  const debouncedSearch = useDebounce(search, 300);
  
  // Filter dan Sorting Data
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Search filter
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(item => 
        item.nama.toLowerCase().includes(searchLower) ||
        item.id.toLowerCase().includes(searchLower) ||
        item.kontak.includes(debouncedSearch) ||
        item.alamat.toLowerCase().includes(searchLower) ||
        (item.perusahaan && item.perusahaan.toLowerCase().includes(searchLower)) ||
        (item.email && item.email.toLowerCase().includes(searchLower))
      );
    }
    
    // Tipe filter
    if (tipeFilter) {
      result = result.filter(item => item.tipe === tipeFilter);
    }
    
    // Status filter
    if (statusFilter) {
      result = result.filter(item => item.status === statusFilter);
    }
    
    // Sorting
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
  }, [data, debouncedSearch, tipeFilter, statusFilter, sortField, sortDirection]);
  
  // Pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);
  
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  
  // Statistik Ringkasan
  const stats = useMemo(() => {
    const totalCustomers = data.filter(d => d.tipe !== 'Supplier').length;
    const totalSuppliers = data.filter(d => d.tipe === 'Supplier').length;
    const totalCredit = data.reduce((sum, d) => sum + (d.piutang || 0), 0);
    const activeCustomers = data.filter(d => d.status === 'Aktif' || d.status === 'Mitra Utama').length;
    
    return { totalCustomers, totalSuppliers, totalCredit, activeCustomers };
  }, [data]);
  
  // Handlers
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
          perusahaan: row.perusahaan || '',
          tipe: row.tipe,
          kontak: row.kontak,
          email: row.email || '',
          alamat: row.alamat,
          status: row.status
        });
      }
    } else {
      setFormData({
        nama: '',
        perusahaan: '',
        tipe: 'Umum',
        kontak: '',
        email: '',
        alamat: '',
        status: 'Aktif'
      });
    }
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };
  
  const handleSaveData = () => {
    setLoading(true);
    setTimeout(() => {
      if (dialogMode === 'add') {
        const newId = `${formData.tipe === 'Supplier' ? 'SUPP' : 'CUST'}-${String(data.length + 1).padStart(3, '0')}`;
        const newData = {
          id: newId,
          ...formData,
          joinDate: new Date().toISOString().split('T')[0],
          totalTransaksi: 0,
          totalPembelian: 0,
          piutang: 0
        };
        setData([newData, ...data]);
        setSnackbar({ open: true, message: 'Data berhasil ditambahkan', severity: 'success' });
      } else if (dialogMode === 'edit' && selectedRow) {
        const updatedData = data.map(item => 
          item.id === selectedRow.id ? { ...item, ...formData } : item
        );
        setData(updatedData);
        setSnackbar({ open: true, message: 'Data berhasil diupdate', severity: 'success' });
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
      setSnackbar({ open: true, message: 'Data berhasil dihapus', severity: 'success' });
      handleCloseDialog();
      setLoading(false);
    }, 500);
  };
  
  const handleExportCSV = () => {
    const headers = ['ID', 'Nama', 'Perusahaan', 'Tipe', 'Kontak', 'Email', 'Alamat', 'Status', 'Tanggal Bergabung', 'Total Transaksi', 'Total Pembelian', 'Piutang'];
    const csvData = filteredData.map(item => [
      item.id,
      item.nama,
      item.perusahaan || '-',
      item.tipe,
      item.kontak,
      item.email || '-',
      item.alamat,
      item.status,
      item.joinDate,
      item.totalTransaksi,
      `Rp ${item.totalPembelian.toLocaleString('id-ID')}`,
      item.piutang > 0 ? `Rp ${item.piutang.toLocaleString('id-ID')}` : '-'
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `data_pelanggan_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSnackbar({ open: true, message: 'Data berhasil diexport', severity: 'success' });
  };
  
  const handleWhatsApp = (kontak) => {
    const cleanNumber = kontak.replace(/\D/g, '');
    const waNumber = cleanNumber.startsWith('0') ? `62${cleanNumber.slice(1)}` : cleanNumber;
    window.open(`https://wa.me/${waNumber}`, '_blank');
  };
  
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };
  
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };
  
  // Loading Skeleton
  if (loading && data.length === 0) {
    return (
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <Skeleton variant="text" width="30%" height={60} />
        <Skeleton variant="rectangular" height={120} sx={{ my: 2, borderRadius: 2 }} />
        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
      </Box>
    );
  }
  
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Header dengan Animasi */}
      <Grow in timeout={500}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              <BusinessIcon sx={{ fontSize: 32, color: '#2563eb' }} />
              Data Pelanggan & Supplier
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
              Kelola data kontak kontraktor, toko grosir, umum, serta distributor penyuplai barang.
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Tooltip title="Export CSV">
              <Button 
                variant="outlined" 
                startIcon={<DownloadIcon />}
                onClick={handleExportCSV}
                sx={{ borderRadius: '12px', textTransform: 'none', borderColor: '#cbd5e1', color: '#475569' }}
              >
                {!isMobile && "Export"}
              </Button>
            </Tooltip>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog('add')}
              sx={{ 
                bgcolor: '#2563eb', 
                borderRadius: '12px', 
                textTransform: 'none', 
                fontWeight: 600,
                px: 3,
                py: 1,
                '&:hover': { bgcolor: '#1d4ed8' },
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
              }}
            >
              {isMobile ? "Tambah" : "Tambah Data"}
            </Button>
          </Stack>
        </Box>
      </Grow>

      {/* Cards Ringkasan dengan Animasi */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { 
            title: "Total Pelanggan", 
            value: stats.totalCustomers, 
            unit: "Orang", 
            info: `${data.filter(d => d.tipe !== 'Supplier' && (d.status === 'Aktif' || d.status === 'Mitra Utama')).length} Aktif`, 
            icon: <PersonIcon />,
            gradient: "linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%)",
            textColor: "#4338ca"
          },
          { 
            title: "Total Supplier", 
            value: stats.totalSuppliers, 
            unit: "Perusahaan", 
            info: "Penyuplai utama", 
            icon: <BusinessIcon />,
            gradient: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
            textColor: "#15803d"
          },
          { 
            title: "Total Piutang", 
            value: formatRupiah(stats.totalCredit), 
            unit: "", 
            info: `${data.filter(d => d.piutang > 0).length} Pelanggan memiliki piutang`, 
            icon: <WarningIcon />,
            gradient: "linear-gradient(135deg, #fef3c7 0%, #fff9db 100%)",
            textColor: "#b45309"
          }
        ].map((card, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Zoom in timeout={300 + idx * 100}>
              <Card sx={{ 
                background: card.gradient, 
                borderRadius: '20px', 
                p: 3, 
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.02)', 
                border: '1px solid rgba(0,0,0,0.03)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-4px)' }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, mb: 1, color: card.textColor }}>
                      {card.value} <Typography component="span" variant="caption" sx={{ fontWeight: 500 }}>{card.unit}</Typography>
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                      {card.info}
                    </Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: alpha(card.textColor, 0.1), color: card.textColor, width: 48, height: 48 }}>
                    {card.icon}
                  </Avatar>
                </Box>
              </Card>
            </Zoom>
          </Grid>
        ))}
      </Grid>

      {/* Filter & Cari */}
      <Fade in timeout={500}>
        <Card sx={{ p: 2.5, mb: 4, borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)', border: '1px solid #f1f5f9' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Cari berdasarkan nama, ID, nomor HP, atau alamat..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => setSearch('')}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#f8fafc' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Kategori</InputLabel>
                <Select
                  value={tipeFilter}
                  onChange={(e) => {
                    setTipeFilter(e.target.value);
                    setPage(1);
                  }}
                  label="Kategori"
                  sx={{ borderRadius: '10px', bgcolor: '#f8fafc' }}
                >
                  <MenuItem value="">Semua Kategori</MenuItem>
                  {TIPE_PELANGGAN.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {option.icon}
                        {option.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  label="Status"
                  sx={{ borderRadius: '10px', bgcolor: '#f8fafc' }}
                >
                  <MenuItem value="">Semua Status</MenuItem>
                  {STATUS_OPTIONS.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      <Chip label={option.label} size="small" sx={{ bgcolor: option.bgColor, color: option.color }} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button 
                fullWidth 
                variant="outlined" 
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearch('');
                  setTipeFilter('');
                  setStatusFilter('');
                  setPage(1);
                }}
                sx={{ borderRadius: '10px', textTransform: 'none', height: 40 }}
              >
                Reset Filter
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Fade>

      {/* Tabel */}
      <TableContainer component={Paper} sx={{ 
        borderRadius: '16px', 
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)', 
        border: '1px solid #e2e8f0', 
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Table stickyHeader>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              {[
                { field: 'id', label: 'ID', width: '100px' },
                { field: 'nama', label: 'Nama / Entitas', width: '200px' },
                { field: 'tipe', label: 'Kategori', width: '140px' },
                { field: 'kontak', label: 'No. Telepon', width: '150px' },
                { field: 'alamat', label: 'Alamat Operasional', width: '250px' },
                { field: 'status', label: 'Status', width: '120px' },
                { field: 'totalPembelian', label: 'Total Pembelian', width: '150px', align: 'right' },
                { field: 'actions', label: 'Aksi', width: '140px', align: 'center' }
              ].map((col) => (
                <TableCell 
                  key={col.field}
                  sx={{ 
                    fontWeight: 700, 
                    color: '#475569',
                    cursor: col.field !== 'actions' ? 'pointer' : 'default',
                    width: col.width,
                    textAlign: col.align || 'left'
                  }}
                  onClick={() => col.field !== 'actions' && handleSort(col.field)}
                >
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                    {col.label}
                    {col.field !== 'actions' && sortField === col.field && (
                      <SortByAlphaIcon sx={{ fontSize: 16, transform: sortDirection === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)' }} />
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="body1" sx={{ color: '#94a3b8' }}>
                    <SearchIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                    <br />
                    Tidak ada data yang ditemukan
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <Grow in timeout={index * 50} key={row.id}>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#fdfdfd' } }} hover>
                    <TableCell>
                      <Chip 
                        label={row.id} 
                        size="small"
                        sx={{ 
                          fontWeight: 700, 
                          bgcolor: row.tipe === 'Supplier' ? '#ccfbf1' : '#eff6ff', 
                          color: row.tipe === 'Supplier' ? '#0d9488' : '#2563eb',
                          borderRadius: '6px',
                          fontSize: '0.7rem',
                          height: '24px'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ bgcolor: stringToColor(row.nama), width: 36, height: 36, fontSize: '0.9rem', fontWeight: 700 }}>
                          {row.nama.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155' }}>
                            {row.nama}
                          </Typography>
                          {row.perusahaan && row.perusahaan !== '-' && (
                            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>
                              {row.perusahaan}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {TIPE_PELANGGAN.find(t => t.value === row.tipe)?.icon}
                        <Typography variant="body2">{row.tipe}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={row.kontak}>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontFamily: 'monospace' }}>
                          {row.kontak}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={row.alamat}>
                        <Typography variant="body2" sx={{ color: '#64748b', maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {row.alamat.length > 40 ? `${row.alamat.substring(0, 40)}...` : row.alamat}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small" 
                        sx={{ 
                          fontWeight: 600, 
                          borderRadius: '8px',
                          bgcolor: STATUS_OPTIONS.find(s => s.value === row.status)?.bgColor || '#e2e8f0',
                          color: STATUS_OPTIONS.find(s => s.value === row.status)?.color || '#475569',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: '#15803d' }}>
                        {formatRupiah(row.totalPembelian)}
                      </Typography>
                      {row.piutang > 0 && (
                        <Typography variant="caption" sx={{ color: '#ea580c', display: 'block' }}>
                          Piutang: {formatRupiah(row.piutang)}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <Tooltip title="Hubungi WhatsApp">
                          <IconButton 
                            size="small" 
                            onClick={() => handleWhatsApp(row.kontak)}
                            sx={{ color: '#25d366', '&:hover': { bgcolor: '#e8faf0' } }}
                          >
                            <WhatsAppIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Lihat Detail">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('view', row)}
                            sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9' } }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Data">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('edit', row)}
                            sx={{ color: '#3b82f6', '&:hover': { bgcolor: '#eff6ff' } }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Hapus">
                          <IconButton 
                            size="small" 
                            onClick={() => handleOpenDialog('delete', row)}
                            sx={{ color: '#ef4444', '&:hover': { bgcolor: '#fef2f2' } }}
                          >
                            <DeleteOutlineOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                </Grow>
              ))
            )}
          </TableBody>
        </Table>
        
        {/* Pagination */}
        {filteredData.length > 0 && (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, borderTop: '1px solid #e2e8f0' }}>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              Menampilkan {(page - 1) * rowsPerPage + 1} - {Math.min(page * rowsPerPage, filteredData.length)} dari {filteredData.length} data
            </Typography>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={(e, value) => setPage(value)}
              color="primary"
              shape="rounded"
              size={isMobile ? "small" : "medium"}
              showFirstButton
              showLastButton
            />
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(e.target.value);
                  setPage(1);
                }}
                sx={{ '& .MuiSelect-select': { py: 0.75 } }}
              >
                <MenuItem value={5}>5 / halaman</MenuItem>
                <MenuItem value={10}>10 / halaman</MenuItem>
                <MenuItem value={25}>25 / halaman</MenuItem>
                <MenuItem value={50}>50 / halaman</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </TableContainer>
      
      {/* Dialog Form */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '20px' } }}
      >
        <DialogTitle sx={{ bgcolor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {dialogMode === 'add' && 'Tambah Data Baru'}
            {dialogMode === 'edit' && 'Edit Data'}
            {dialogMode === 'delete' && 'Konfirmasi Hapus'}
            {dialogMode === 'view' && 'Detail Data'}
          </Typography>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {dialogMode === 'delete' ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <WarningIcon sx={{ fontSize: 64, color: '#ef4444', mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Apakah Anda yakin ingin menghapus data <strong>{selectedRow?.nama}</strong>?
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b' }}>
                Tindakan ini tidak dapat dibatalkan.
              </Typography>
            </Box>
          ) : dialogMode === 'view' && selectedRow ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: stringToColor(selectedRow.nama), width: 64, height: 64, fontSize: 28 }}>
                  {selectedRow.nama.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>{selectedRow.nama}</Typography>
                  <Chip label={selectedRow.tipe} size="small" />
                </Box>
              </Box>
              <Divider />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>ID Pelanggan</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedRow.id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Status</Typography>
                  <Chip label={selectedRow.status} size="small" sx={{ mt: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Perusahaan / Instansi</Typography>
                  <Typography variant="body2">{selectedRow.perusahaan || '-'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>No. Telepon</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{selectedRow.kontak}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Email</Typography>
                  <Typography variant="body2">{selectedRow.email || '-'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Alamat Lengkap</Typography>
                  <Typography variant="body2">{selectedRow.alamat}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Total Transaksi</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>{selectedRow.totalTransaksi} Kali</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Total Pembelian</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#15803d' }}>{formatRupiah(selectedRow.totalPembelian)}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Piutang</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: selectedRow.piutang > 0 ? '#ea580c' : '#64748b' }}>
                    {selectedRow.piutang > 0 ? formatRupiah(selectedRow.piutang) : '-'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>Tanggal Bergabung</Typography>
                  <Typography variant="body2">{selectedRow.joinDate}</Typography>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nama Lengkap"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Perusahaan / Instansi"
                  value={formData.perusahaan}
                  onChange={(e) => setFormData({ ...formData, perusahaan: e.target.value })}
                  size="small"
                  placeholder="Opsional"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Kategori</InputLabel>
                  <Select
                    value={formData.tipe}
                    onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                    label="Kategori"
                  >
                    {TIPE_PELANGGAN.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {option.icon}
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    label="Status"
                  >
                    {STATUS_OPTIONS.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        <Chip label={option.label} size="small" sx={{ bgcolor: option.bgColor, color: option.color }} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="No. Telepon"
                  value={formData.kontak}
                  onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                  required
                  size="small"
                  placeholder="08xx-xxxx-xxxx"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  size="small"
                  placeholder="email@example.com"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Alamat Lengkap"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  required
                  size="small"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 0, borderTop: '1px solid #e2e8f0' }}>
          <Button onClick={handleCloseDialog} sx={{ textTransform: 'none' }}>
            {dialogMode === 'delete' ? 'Batal' : 'Tutup'}
          </Button>
          {dialogMode !== 'view' && (
            <Button 
              onClick={dialogMode === 'delete' ? handleDeleteData : handleSaveData}
              variant="contained"
              disabled={dialogMode !== 'delete' && (!formData.nama || !formData.kontak || !formData.alamat)}
              sx={{ 
                textTransform: 'none',
                bgcolor: dialogMode === 'delete' ? '#ef4444' : '#2563eb',
                '&:hover': { bgcolor: dialogMode === 'delete' ? '#dc2626' : '#1d4ed8' }
              }}
            >
              {dialogMode === 'add' && 'Simpan'}
              {dialogMode === 'edit' && 'Update'}
              {dialogMode === 'delete' && 'Hapus'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
      
      {/* Snackbar Notifikasi */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          icon={snackbar.severity === 'success' ? <CheckCircleIcon /> : <WarningIcon />}
          sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}