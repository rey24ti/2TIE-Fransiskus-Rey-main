import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Grid,
  Typography,
  Box,
  Stack,
  Card,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Button,
  IconButton,
  Paper,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Tooltip,
  Fade,
  Grow,
  Zoom,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar as MuiAvatar,
  Skeleton,
  Menu,
  MenuItem,
  Popover,
  Divider,
  Collapse,
  ListItemIcon,
} from '@mui/material';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

// Icons
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import InventoryTwoToneIcon from '@mui/icons-material/InventoryTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import GetAppIcon from '@mui/icons-material/GetApp';
import PrintIcon from '@mui/icons-material/Print';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

import ErrorBoundary from '../components/ErrorBoundary.jsx';
import ProfileMenu from '../components/ProfileMenu.jsx';
import Login from '../views/pages/Login.jsx';

// ====== ADMIN PAGES (REAL COMPONENTS) ======
import InventarisToko from '../views/pages/InventarisToko.jsx';
import ReturBarangAdmin from '../views/pages/ReturBarang.jsx';
import Transaksi from '../views/pages/Transaksi.jsx';
import RiwayatTransaksi from '../views/pages/RiwayatTransaksi.jsx';
import Pelanggan from '../views/pages/Pelanggan.jsx';
import ManajemenUser from '../views/pages/ManajemenUser.jsx';
import BonPiutangAdmin from '../views/pages/BonPiutangAdmin.jsx';
import LaporanKeuntungan from '../views/pages/LaporanKeuntungan.jsx';
import LaporanLabaRugi from '../views/pages/LaporanLabaRugi.jsx';
import LaporanPenjualan from '../views/pages/LaporanPenjualan.jsx';
import LaporanInventaris from '../views/pages/LaporanInventaris.jsx';
import PengaturanSistem from '../views/pages/PengaturanSistem.jsx';


// ====== HELPER ======
const rgba = (color, opacity) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// ====== KOMPONEN HALAMAN PLACEHOLDER ======
const PagePlaceholder = ({ title }) => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h4" gutterBottom>{title}</Typography>
    <Typography variant="body1" color="text.secondary">
      Halaman ini sedang dalam pengembangan.
    </Typography>
    <Typography variant="body2" color="text.disabled" sx={{ mt: 2 }}>
      (Placeholder untuk {title})
    </Typography>
  </Box>
);


// ====== DASHBOARD UTAMA (PREMIUM) ======
export function DashboardPremium() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Stok Semen Menipis', message: 'Stok Semen Tiga Roda tersisa 10 sak', time: '5 menit lalu', read: false, type: 'warning' },
    { id: 2, title: 'Pengiriman Berhasil', message: 'Truk Engkel sampai di tujuan', time: '1 jam lalu', read: false, type: 'success' },
    { id: 3, title: 'Tagihan Jatuh Tempo', message: 'Toko Jaya Abadi Rp 12jt', time: '3 jam lalu', read: true, type: 'info' },
  ]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('week');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [salesData, setSalesData] = useState(() => {
    return [
      { name: 'Sen', penjualan: 3200000, target: 4000000, transaksi: 8 },
      { name: 'Sel', penjualan: 4100000, target: 4000000, transaksi: 12 },
      { name: 'Rab', penjualan: 3800000, target: 4000000, transaksi: 10 },
      { name: 'Kam', penjualan: 5200000, target: 5000000, transaksi: 15 },
      { name: 'Jum', penjualan: 6100000, target: 5000000, transaksi: 18 },
      { name: 'Sab', penjualan: 7800000, target: 6000000, transaksi: 22 },
      { name: 'Min', penjualan: 4300000, target: 4000000, transaksi: 11 },
    ];
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSalesData(prev => prev.map(item => ({
        ...item,
        penjualan: item.penjualan + Math.floor(Math.random() * 200000 - 100000),
      })));
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const reportTokoData = [
    { title: 'Pendapatan', primary: 'Rp 34,2 Jt', secondary: '+Rp 4,2 Jt minggu ini', trend: '+14,2%', trendValue: 14.2, icon: StorefrontTwoToneIcon, color: '#3b82f6' },
    { title: 'Total Stok', primary: '1.876', secondary: '+120 unit bulan ini', trend: '+6,8%', trendValue: 6.8, icon: InventoryTwoToneIcon, color: '#10b981' },
    { title: 'Penjualan', primary: '156 Nota', secondary: '+12% dari minggu lalu', trend: '+12%', trendValue: 12, icon: ShoppingCartTwoToneIcon, color: '#f59e0b' },
    { title: 'Stok Kritis', primary: '3 Item', secondary: 'Semen, Paku, Cat', trend: '-2 item', trendValue: -2, icon: WarningAmberTwoToneIcon, color: '#ef4444' },
  ];

  const topProducts = [
    { nama: 'Semen Padang 50 kg', terjual: '520 sak', progress: 85, status: 'Stok Aman', color: '#10b981' },
    { nama: 'Besi Beton 10 mm', terjual: '240 batang', progress: 60, status: 'Stok Menipis', color: '#f59e0b' },
    { nama: 'Baja Ringan C75', terjual: '180 batang', progress: 45, status: 'Stok Aman', color: '#10b981' },
    { nama: 'Cat Avian 5 kg', terjual: '120 kaleng', progress: 30, status: 'Stok Aman', color: '#10b981' },
    { nama: 'Paku Beton 5cm', terjual: '85 kg', progress: 20, status: 'Kritis', color: '#ef4444' },
  ];

  const armadaStatus = [
    { id: 'Truk Engkel', supir: 'Bang Wahyu', tujuan: 'Proyek Perumahan Asri', status: 'Mengirim', eta: '30 menit' },
    { id: 'Pick-up L300', supir: 'Bang Riki', tujuan: 'Jl. Sudirman No. 45', status: 'Mengirim', eta: '15 menit' },
    { id: 'Truk Colt', supir: 'Bang Alik', tujuan: 'Gudang (Muat Pasir)', status: 'Standby', eta: '-' },
  ];

  const dataBonPiutang = [
    { nama: 'Toko Jaya Abadi', sisa: 'Rp 12 Jt', tempo: 'Besok', statusColor: '#ef4444' },
    { nama: 'Kontraktor Budi', sisa: 'Rp 4,5 Jt', tempo: '14 Jun 2026', statusColor: '#f59e0b' },
    { nama: 'CV Karya Mandiri', sisa: 'Rp 7,2 Jt', tempo: '20 Jun 2026', statusColor: '#f59e0b' },
  ];

  const salesActivity = [
    { item: 'Semen Padang', qty: '10 sak', ket: 'Pak Budi (Kontraktor)', waktu: 'Barusan', via: 'Transfer', viaColor: '#3b82f6' },
    { item: 'Cat Avian 5 kg', qty: '2 kaleng', ket: 'Umum / Eceran', waktu: '10 mnt lalu', via: 'Tunai', viaColor: '#10b981' },
    { item: 'Besi 8 mm', qty: '20 batang', ket: 'Toko Jaya Abadi', waktu: '09:00 WIB', via: 'Bon/Kredit', viaColor: '#f59e0b' },
    { item: 'Paku Beton', qty: '5 kg', ket: 'Toko Bangunan Berkah', waktu: '08:30 WIB', via: 'Transfer', viaColor: '#3b82f6' },
  ];

  const operationalNotes = [
    'Pengiriman pasir Merapi tiba jam 14:00.',
    'Cek kembali nota supplier Semen Gresik.',
    'Servis berkala armada pick-up hari Sabtu.',
    'Pengecekan stok keramik putih (20 dus).',
    'Meeting dengan supplier besi jam 10:00.',
  ];

  const filteredSalesData = useMemo(() => {
    if (dateFilter === 'week') return salesData;
    if (dateFilter === 'month') {
      return [
        { name: 'Minggu 1', penjualan: 25000000, target: 30000000, transaksi: 45 },
        { name: 'Minggu 2', penjualan: 32000000, target: 30000000, transaksi: 58 },
        { name: 'Minggu 3', penjualan: 28000000, target: 30000000, transaksi: 52 },
        { name: 'Minggu 4', penjualan: 35000000, target: 35000000, transaksi: 65 },
      ];
    }
    return salesData;
  }, [dateFilter, salesData]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({ open: true, message: 'Dashboard berhasil diperbarui', severity: 'success' });
    }, 800);
  };

  const handleExport = () => {
    setSnackbar({ open: true, message: 'Export CSV berhasil! File siap diunduh.', severity: 'success' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setSnackbar({ open: true, message: 'Semua notifikasi ditandai dibaca', severity: 'info' });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // StatCard sederhana
  const StatCard = ({ title, primary, secondary, trend, trendValue, icon: Icon, color, loading }) => {
    const isTrendPositive = trendValue >= 0;
    if (loading) {
      return (
        <Card sx={{ p: 2.5, borderRadius: '16px' }}>
          <Skeleton variant="rectangular" width="100%" height={100} />
        </Card>
      );
    }
    return (
      <Zoom in timeout={300}>
        <Card sx={{ p: 2.5, borderRadius: '20px', border: `1px solid ${rgba(color, 0.15)}`, background: `linear-gradient(135deg, ${rgba(color, 0.06)} 0%, ${rgba(color, 0.03)} 100%)`, transition: 'all 0.3s', cursor: 'pointer', '&:hover': { transform: 'translateY(-6px)', boxShadow: `0 12px 28px ${rgba(color, 0.2)}` }, position: 'relative', overflow: 'hidden', '&::after': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${color} 0%, ${rgba(color, 0.5)} 100%)` } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem' }}>{title}</Typography>
              <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, mt: 0.5 }}>{primary}</Typography>
            </Box>
            <Avatar sx={{ width: 48, height: 48, background: `linear-gradient(135deg, ${color} 0%, ${rgba(color, 0.8)} 100%)`, boxShadow: `0 6px 14px ${rgba(color, 0.3)}` }}>
              <Icon sx={{ fontSize: '1.5rem', color: '#fff' }} />
            </Avatar>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>{secondary}</Typography>
            <Chip icon={isTrendPositive ? <ArrowUpwardIcon sx={{ fontSize: '0.7rem !important' }} /> : <ArrowDownwardIcon sx={{ fontSize: '0.7rem !important' }} />} label={trend} size="small" sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700, bgcolor: isTrendPositive ? rgba('#10b981', 0.12) : rgba('#ef4444', 0.12), color: isTrendPositive ? '#10b981' : '#ef4444', border: 'none' }} />
          </Stack>
        </Card>
      </Zoom>
    );
  };

  // SimpleBarChart sederhana
  const SimpleBarChart = ({ data, title, valueKey, labelKey, color }) => {
    const maxValue = Math.max(...data.map(d => d[valueKey]));
    return (
      <Box>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>{title}</Typography>
        <Stack spacing={1.5}>
          {data.map((item, idx) => (
            <Box key={idx}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>{item[labelKey]}</Typography>
                <Typography variant="caption" sx={{ fontWeight: 600, color }}>Rp {(item[valueKey] / 1000000).toFixed(1)}Jt</Typography>
              </Stack>
              <Box sx={{ height: 8, bgcolor: rgba(color, 0.1), borderRadius: 4, overflow: 'hidden' }}>
                <Box sx={{ width: `${(item[valueKey] / maxValue) * 100}%`, height: '100%', bgcolor: color, borderRadius: 4, transition: 'width 0.5s ease' }} />
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    );
  };

  const OrderProgress = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    return (
      <Box>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>Progres Pesanan</Typography>
        <Stack spacing={1.5}>
          {data.map((item, idx) => {
            const percentage = total > 0 ? (item.count / total) * 100 : 0;
            return (
              <Box key={idx}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    {item.icon}
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>{item.status}</Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: item.color }}>{item.count} ({percentage.toFixed(1)}%)</Typography>
                </Stack>
                <Box sx={{ height: 8, bgcolor: rgba(item.color, 0.1), borderRadius: 4, overflow: 'hidden' }}>
                  <Box sx={{ width: `${percentage}%`, height: '100%', bgcolor: item.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
                </Box>
              </Box>
            );
          })}
        </Stack>
        <Box sx={{ mt: 2, p: 1.5, bgcolor: rgba('#3b82f6', 0.04), borderRadius: 3, border: `1px solid ${rgba('#3b82f6', 0.1)}` }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="caption" fontWeight={600}>Total Pesanan</Typography>
            <Typography variant="caption" fontWeight={700}>{total} order</Typography>
          </Stack>
        </Box>
      </Box>
    );
  };

  const orderStatusData = [
    { status: 'Pending', count: 12, color: '#f59e0b', icon: <PendingIcon fontSize="small" /> },
    { status: 'Diproses', count: 24, color: '#3b82f6', icon: <HourglassTopIcon fontSize="small" /> },
    { status: 'Dikirim', count: 18, color: '#8b5cf6', icon: <LocalShippingIcon fontSize="small" /> },
    { status: 'Selesai', count: 46, color: '#10b981', icon: <DoneAllIcon fontSize="small" /> },
  ];

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', pb: 4, bgcolor: '#f8fafc', pt: 3, px: { xs: 2, sm: 3, md: 4 } }}>
      <Fade in timeout={500}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 4, gap: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
              Dashboard Toko Material
              <Chip label="Premium" size="small" color="primary" sx={{ fontWeight: 700, height: 24 }} />
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem' }}>
              Ringkasan operasional harian • {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap">
            <Button variant="outlined" size="small" startIcon={<DateRangeIcon />} onClick={(e) => setFilterAnchor(e.currentTarget)} sx={{ borderRadius: '12px', textTransform: 'none' }}>
              {dateFilter === 'week' ? 'Minggu Ini' : 'Bulan Ini'}
            </Button>
            <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={() => setFilterAnchor(null)}>
              <MenuItem onClick={() => { setDateFilter('week'); setFilterAnchor(null); }}>Minggu Ini</MenuItem>
              <MenuItem onClick={() => { setDateFilter('month'); setFilterAnchor(null); }}>Bulan Ini</MenuItem>
            </Menu>
            <IconButton onClick={handleRefresh} sx={{ bgcolor: rgba('#3b82f6', 0.1) }}><RefreshIcon /></IconButton>
            <IconButton onClick={handleExport} sx={{ bgcolor: rgba('#10b981', 0.1) }}><GetAppIcon /></IconButton>
            <IconButton onClick={handlePrint} sx={{ bgcolor: rgba('#f59e0b', 0.1) }}><PrintIcon /></IconButton>
            <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} sx={{ bgcolor: rgba('#ef4444', 0.1) }}>
              <Badge badgeContent={unreadCount} color="error"><NotificationsIcon /></Badge>
            </IconButton>
            <Chip icon={<FiberManualRecordIcon sx={{ fontSize: '0.55rem', animation: 'pulse 1.5s infinite', color: '#10b981 !important' }} />} label="Live" size="small" sx={{ bgcolor: rgba('#10b981', 0.12), color: '#10b981', fontWeight: 700 }} />
          </Stack>
        </Stack>
      </Fade>

      <Grid container spacing={3.5} sx={{ mb: 4 }}>
        {reportTokoData.map((data, index) => (
          <Grid key={index} item xs={12} sm={6} md={3}>
            <StatCard {...data} loading={loading} />
          </Grid>
        ))}
      </Grid>

      <Grow in timeout={600}>
        <Card sx={{ mb: 4, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
          <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} variant={isMobile ? "scrollable" : "standard"} scrollButtons="auto" sx={{ borderBottom: `1px solid #e2e8f0`, px: 2, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minHeight: 48 } }}>
            <Tab label="📊 Dashboard" icon={<DashboardIcon />} iconPosition="start" />
            <Tab label="Analisis Penjualan" icon={<TrendingUpIcon />} iconPosition="start" />
            <Tab label="Manajemen Stok" icon={<InventoryTwoToneIcon />} iconPosition="start" />
            <Tab label="Pelanggan & Piutang" icon={<PeopleIcon />} iconPosition="start" />
          </Tabs>
          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {activeTab === 0 && (
              <Stack spacing={3}>
                <Paper sx={{ p: 2.5, borderRadius: '20px', border: `1px solid ${rgba('#3b82f6', 0.15)}` }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={700}>📈 Grafik Performa Penjualan Real-Time</Typography>
                    <Typography variant="caption" color="text.secondary">Update otomatis setiap 3 detik</Typography>
                  </Stack>
                  <SimpleBarChart data={salesData} title="Penjualan Harian (Rp)" valueKey="penjualan" labelKey="name" color="#3b82f6" />
                </Paper>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 2.5, borderRadius: '20px', height: '100%' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6" fontWeight={700}>🏆 Statistik Produk Paling Laris</Typography>
                        <Button size="small" variant="outlined" endIcon={<VisibilityIcon />} sx={{ textTransform: 'none' }}>Lihat Semua</Button>
                      </Stack>
                      <TableContainer>
                        <Table size="small">
                          <TableBody>
                            {topProducts.map((prod, i) => (
                              <TableRow key={i} hover sx={{ cursor: 'pointer' }} onClick={() => handleProductClick(prod)}>
                                <TableCell sx={{ fontWeight: 600, py: 1.5 }}>{prod.nama}</TableCell>
                                <TableCell align="right" sx={{ py: 1.5 }}>{prod.terjual}</TableCell>
                                <TableCell sx={{ width: '30%', py: 1.5 }}>
                                  <LinearProgress variant="determinate" value={prod.progress} sx={{ height: 6, borderRadius: 3, bgcolor: rgba(prod.color, 0.1), '& .MuiLinearProgress-bar': { bgcolor: prod.color, borderRadius: 3 } }} />
                                </TableCell>
                                <TableCell align="right" sx={{ py: 1.5 }}>
                                  <Chip label={prod.status} size="small" sx={{ bgcolor: rgba(prod.color, 0.12), color: prod.color, fontWeight: 600 }} />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Paper sx={{ p: 2.5, borderRadius: '20px', height: '100%' }}>
                      <OrderProgress data={orderStatusData} />
                    </Paper>
                  </Grid>
                </Grid>
              </Stack>
            )}
            {activeTab === 1 && (
              <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px' }}>
                <Table>
                  <TableHead sx={{ bgcolor: rgba('#3b82f6', 0.05) }}>
                    <TableRow>
                      <TableCell>Hari</TableCell>
                      <TableCell align="right">Penjualan (Rp)</TableCell>
                      <TableCell align="right">Target (Rp)</TableCell>
                      <TableCell align="right">Selisih</TableCell>
                      <TableCell align="right">Transaksi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredSalesData.map(row => (
                      <TableRow key={row.name} hover>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="right">Rp {row.penjualan.toLocaleString('id-ID')}</TableCell>
                        <TableCell align="right">Rp {row.target.toLocaleString('id-ID')}</TableCell>
                        <TableCell align="right" sx={{ color: row.penjualan >= row.target ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                          {row.penjualan >= row.target ? '+' : '-'}Rp {Math.abs(row.penjualan - row.target).toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell align="right">{row.transaksi}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {activeTab === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>Level Stok vs Minimal</Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px' }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: rgba('#3b82f6', 0.05) }}>
                        <TableRow>
                          <TableCell>Kategori</TableCell>
                          <TableCell align="right">Stok</TableCell>
                          <TableCell align="right">Minimal</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[
                          { name: 'Semen', stok: 450, minimal: 100 },
                          { name: 'Besi', stok: 320, minimal: 80 },
                          { name: 'Cat', stok: 180, minimal: 60 },
                          { name: 'Pipa', stok: 150, minimal: 50 },
                          { name: 'Paku', stok: 600, minimal: 100 },
                        ].map(row => (
                          <TableRow key={row.name} hover>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.stok}</TableCell>
                            <TableCell align="right">{row.minimal}</TableCell>
                            <TableCell>
                              <Chip label={row.stok >= row.minimal ? 'Aman' : 'Kritis'} size="small" color={row.stok >= row.minimal ? 'success' : 'error'} variant="outlined" />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2.5, borderRadius: '16px', bgcolor: rgba('#f59e0b', 0.05), border: `1px solid ${rgba('#f59e0b', 0.2)}` }}>
                    <Typography fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <WarningAmberRoundedIcon sx={{ color: '#f59e0b' }} /> Rekomendasi Pemesanan Ulang
                    </Typography>
                    <List dense disablePadding>
                      <ListItem sx={{ px: 0 }}><ListItemText primary="Semen Tiga Roda" secondary="Stok: 10 sak (Minimal 15)" /></ListItem>
                      <ListItem sx={{ px: 0 }}><ListItemText primary="Paku Beton" secondary="Stok: 25 kg (Minimal 30)" /></ListItem>
                      <ListItem sx={{ px: 0 }}><ListItemText primary="Cat Avian 5kg" secondary="Stok: 8 kg (Minimal 10)" /></ListItem>
                    </List>
                    <Button variant="contained" size="small" sx={{ mt: 2, textTransform: 'none' }}>Buat PO ke Supplier</Button>
                  </Paper>
                </Grid>
              </Grid>
            )}
            {activeTab === 3 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>Top 5 Pelanggan</Typography>
                  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '16px' }}>
                    <Table size="small">
                      <TableHead sx={{ bgcolor: rgba('#3b82f6', 0.05) }}>
                        <TableRow>
                          <TableCell>Nama</TableCell>
                          <TableCell align="right">Total Belanja</TableCell>
                          <TableCell align="right">Transaksi</TableCell>
                          <TableCell>Last Order</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[
                          { name: 'PT Bangun Jaya', total: 28700000, transactions: 24, lastOrder: '2026-06-09' },
                          { name: 'Toko Jaya Abadi', total: 18500000, transactions: 18, lastOrder: '2026-06-08' },
                          { name: 'CV Karya Mandiri', total: 14200000, transactions: 15, lastOrder: '2026-06-07' },
                          { name: 'UD Bina Usaha', total: 9800000, transactions: 12, lastOrder: '2026-06-05' },
                          { name: 'Kontraktor Budi', total: 7600000, transactions: 9, lastOrder: '2026-06-10' },
                        ].map(cust => (
                          <TableRow key={cust.name} hover>
                            <TableCell>{cust.name}</TableCell>
                            <TableCell align="right">Rp {cust.total.toLocaleString('id-ID')}</TableCell>
                            <TableCell align="right">{cust.transactions}x</TableCell>
                            <TableCell>{cust.lastOrder}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>Piutang Jatuh Tempo</Typography>
                  <Stack spacing={1.5}>
                    {[
                      { nama: 'Toko Jaya Abadi', sisa: 'Rp 12 Jt', tempo: 'Besok', statusColor: '#ef4444' },
                      { nama: 'Kontraktor Budi', sisa: 'Rp 4,5 Jt', tempo: '14 Jun 2026', statusColor: '#f59e0b' },
                      { nama: 'CV Karya Mandiri', sisa: 'Rp 7,2 Jt', tempo: '20 Jun 2026', statusColor: '#f59e0b' },
                    ].map((bon, idx) => (
                      <Paper key={idx} sx={{ p: 2, borderRadius: '16px', borderLeft: `4px solid ${bon.statusColor}`, bgcolor: rgba(bon.statusColor, 0.03) }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography fontWeight={700}>{bon.nama}</Typography>
                          <Typography fontWeight={700} color={bon.statusColor}>{bon.sisa}</Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">Jatuh tempo: {bon.tempo}</Typography>
                        <Button size="small" variant="text" sx={{ mt: 1, p: 0, textTransform: 'none', color: bon.statusColor }}>Kirim Pengingat</Button>
                      </Paper>
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            )}
          </Box>
        </Card>
      </Grow>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Stack spacing={3}>
            <Zoom in timeout={800}>
              <Card sx={{ p: 2.5, borderRadius: '24px' }}>
                <Typography variant="h6" fontWeight={700} mb={2}>Aktivitas Kasir & Penjualan</Typography>
                <Stack spacing={1.5}>
                  {[
                    { item: 'Semen Padang', qty: '10 sak', ket: 'Pak Budi (Kontraktor)', waktu: 'Barusan', via: 'Transfer', viaColor: '#3b82f6' },
                    { item: 'Cat Avian 5 kg', qty: '2 kaleng', ket: 'Umum / Eceran', waktu: '10 mnt lalu', via: 'Tunai', viaColor: '#10b981' },
                    { item: 'Besi 8 mm', qty: '20 batang', ket: 'Toko Jaya Abadi', waktu: '09:00 WIB', via: 'Bon/Kredit', viaColor: '#f59e0b' },
                    { item: 'Paku Beton', qty: '5 kg', ket: 'Toko Bangunan Berkah', waktu: '08:30 WIB', via: 'Transfer', viaColor: '#3b82f6' },
                  ].map((act, idx) => (
                    <Grow in timeout={idx * 100} key={idx}>
                      <Paper sx={{ p: 1.5, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, '&:hover': { bgcolor: rgba(act.viaColor, 0.04) } }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <MuiAvatar sx={{ width: 36, height: 36, bgcolor: rgba(act.viaColor, 0.1) }}>
                            <CheckCircleIcon sx={{ color: act.viaColor, fontSize: '1.1rem' }} />
                          </MuiAvatar>
                          <Box>
                            <Typography fontWeight={600} fontSize="0.85rem">{act.item} ({act.qty})</Typography>
                            <Typography variant="caption" color="text.secondary">{act.ket}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip label={act.via} size="small" sx={{ bgcolor: rgba(act.viaColor, 0.1), color: act.viaColor, fontWeight: 600 }} />
                          <Typography variant="caption" color="text.secondary">{act.waktu}</Typography>
                        </Stack>
                      </Paper>
                    </Grow>
                  ))}
                </Stack>
                <Paper sx={{ mt: 2, p: 1.5, borderRadius: '16px', bgcolor: rgba('#ef4444', 0.08), display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <WarningAmberRoundedIcon sx={{ color: '#ef4444' }} />
                  <Typography variant="body2" fontWeight={600} color="#991b1b">Peringatan: Stok Paku Beton hampir habis! Segera order ulang.</Typography>
                </Paper>
              </Card>
            </Zoom>
          </Stack>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Stack spacing={3}>
            <Zoom in timeout={900}>
              <Card sx={{ p: 2.5, borderRadius: '24px' }}>
                <Typography variant="h6" fontWeight={700} mb={2}>🚚 Logistik Pengiriman</Typography>
                <Stack spacing={1.5}>
                  {[
                    { id: 'Truk Engkel', supir: 'Bang Wahyu', tujuan: 'Proyek Perumahan Asri', status: 'Mengirim', eta: '30 menit' },
                    { id: 'Pick-up L300', supir: 'Bang Riki', tujuan: 'Jl. Sudirman No. 45', status: 'Mengirim', eta: '15 menit' },
                    { id: 'Truk Colt', supir: 'Bang Alik', tujuan: 'Gudang (Muat Pasir)', status: 'Standby', eta: '-' },
                  ].map((arm, idx) => (
                    <Paper key={idx} sx={{ p: 1.5, borderRadius: '16px', borderLeft: `3px solid ${arm.status === 'Mengirim' ? '#3b82f6' : '#10b981'}`, '&:hover': { transform: 'translateX(4px)' } }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight={700}>{arm.id}</Typography>
                        <Chip label={arm.status} size="small" color={arm.status === 'Mengirim' ? 'primary' : 'success'} />
                      </Stack>
                      <Typography variant="caption" display="block" color="text.secondary">Supir: {arm.supir}</Typography>
                      <Typography variant="caption" display="block" color="text.secondary">Tujuan: {arm.tujuan}</Typography>
                      {arm.eta !== '-' && <Typography variant="caption" color="info.main">ETA: {arm.eta}</Typography>}
                    </Paper>
                  ))}
                </Stack>
              </Card>
            </Zoom>
            <Zoom in timeout={1000}>
              <Card sx={{ p: 2.5, borderRadius: '24px' }}>
                <Typography variant="h6" fontWeight={700} mb={2}>💰 Tagihan Piutang</Typography>
                <Stack spacing={1.5}>
                  {[
                    { nama: 'Toko Jaya Abadi', sisa: 'Rp 12 Jt', tempo: 'Besok', statusColor: '#ef4444' },
                    { nama: 'Kontraktor Budi', sisa: 'Rp 4,5 Jt', tempo: '14 Jun 2026', statusColor: '#f59e0b' },
                    { nama: 'CV Karya Mandiri', sisa: 'Rp 7,2 Jt', tempo: '20 Jun 2026', statusColor: '#f59e0b' },
                  ].map((bon, idx) => (
                    <Paper key={idx} sx={{ p: 1.5, borderRadius: '16px', bgcolor: rgba(bon.statusColor, 0.04), border: `1px solid ${rgba(bon.statusColor, 0.1)}` }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight={700}>{bon.nama}</Typography>
                        <Typography fontWeight={700} color={bon.statusColor}>{bon.sisa}</Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">Jatuh tempo: {bon.tempo}</Typography>
                      <Button size="small" variant="text" sx={{ mt: 1, p: 0, textTransform: 'none', color: bon.statusColor }}>Kirim Pengingat</Button>
                    </Paper>
                  ))}
                </Stack>
              </Card>
            </Zoom>
            <Zoom in timeout={1100}>
              <Card sx={{ p: 2.5, borderRadius: '24px', bgcolor: rgba('#3b82f6', 0.02), border: `1px solid ${rgba('#3b82f6', 0.1)}` }}>
                <Typography variant="h6" fontWeight={700} mb={1.5}>📋 Catatan Operasional</Typography>
                <List dense disablePadding>
                  {[
                    'Pengiriman pasir Merapi tiba jam 14:00.',
                    'Cek kembali nota supplier Semen Gresik.',
                    'Servis berkala armada pick-up hari Sabtu.',
                    'Pengecekan stok keramik putih (20 dus).',
                    'Meeting dengan supplier besi jam 10:00.',
                  ].map((note, idx) => (
                    <ListItem key={idx} disableGutters sx={{ py: 0.75, alignItems: 'flex-start' }}>
                      <Box sx={{ width: 6, height: 6, bgcolor: '#3b82f6', borderRadius: '50%', mt: 0.8, mr: 1.5, flexShrink: 0 }} />
                      <ListItemText primary={note} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                    </ListItem>
                  ))}
                </List>
              </Card>
            </Zoom>
          </Stack>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
}

// ====== SIDEBAR DENGAN STRUKTUR MENU ======
const Sidebar = () => {
  const navigate = useNavigate();

  // Definisi menu sesuai dengan yang Anda berikan
  const menuItems = [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: DashboardIcon,
    },
    {
      id: 'sub-master',
      title: 'MASTER DATA',
      type: 'collapse',
      icon: Inventory2Icon,
      children: [
        { id: 'inv', title: 'Stok Barang', type: 'item', url: '/admin/inventaris' },
        { id: 'retur', title: 'Retur Barang', type: 'item', url: '/admin/retur-barang' },
      ],
    },
    {
      id: 'sub-transaksi',
      title: 'TRANSAKSI',
      type: 'collapse',
      icon: ShoppingCartTwoToneIcon,
      children: [
        { id: 'trx', title: 'Catat Transaksi', type: 'item', url: '/admin/transaksi' },
        { id: 'riwayat-transaksi', title: 'Riwayat Transaksi', type: 'item', url: '/admin/riwayat-transaksi' },
        { id: 'bon-piutang', title: 'Bon / Piutang (Admin)', type: 'item', url: '/admin/bon-piutang' },
      ],
    },
    {
      id: 'sub-laporan',
      title: 'LAPORAN',
      type: 'collapse',
      icon: TrendingUpIcon,
      children: [
        { id: 'laporan-keuntungan', title: 'Laporan Keuntungan / Grafik', type: 'item', url: '/admin/laporan-keuntungan' },
        { id: 'laporan-laba-rugi', title: 'Laporan Laba-Rugi', type: 'item', url: '/admin/laporan-laba-rugi' },
        { id: 'laporan-penjualan', title: 'Laporan Penjualan', type: 'item', url: '/admin/laporan-penjualan' },
        { id: 'laporan-inventaris', title: 'Laporan Inventaris', type: 'item', url: '/admin/laporan-inventaris' },
      ],
    },
    {
      id: 'sub-manajemen-pengguna',
      title: 'MANAJEMEN PENGGUNA',
      type: 'collapse',
      icon: PeopleIcon,
      children: [
        { id: 'data-karyawan', title: 'Data Karyawan', type: 'item', url: '/admin/data-karyawan' },
        { id: 'pelanggan', title: 'Data Pelanggan', type: 'item', url: '/admin/pelanggan' },
      ],
    },
    {
      id: 'sub-pengaturan',
      title: 'PENGATURAN',
      type: 'collapse',
      icon: SettingsIcon,
      children: [
        { id: 'pengaturan-sistem', title: 'Pengaturan Sistem', type: 'item', url: '/admin/pengaturan-sistem' },
      ],
    },
    {
      id: 'sub-pages',
      title: 'PAGES',
      type: 'collapse',
      icon: FolderIcon,
      children: [
        { id: 'rebuild-pages', title: 'Rebuild-Pages', type: 'item', url: '/admin/rebuild-pages' },
      ],
    },
  ];

  const [openCollapses, setOpenCollapses] = useState({});

  const toggleCollapse = (id) => {
    setOpenCollapses((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderMenu = (items) => {
    return items.map((item) => {
      if (item.type === 'collapse') {
        const isOpen = openCollapses[item.id] || false;
        return (
          <React.Fragment key={item.id}>
            <ListItem button onClick={() => toggleCollapse(item.id)}>
              <ListItemIcon>
                {item.icon ? <item.icon sx={{ color: '#94a3b8' }} /> : null}
              </ListItemIcon>
              <ListItemText primary={item.title} sx={{ color: '#94a3b8' }} />
              {isOpen ? <ExpandLessIcon sx={{ color: '#94a3b8' }} /> : <ExpandMoreIcon sx={{ color: '#94a3b8' }} />}
            </ListItem>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child) => (
                  <ListItem
                    button
                    key={child.id}
                    sx={{ pl: 4 }}
                    onClick={() => navigate(child.url)}
                  >
                    <ListItemText primary={child.title} sx={{ color: '#94a3b8' }} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        );
      } else if (item.type === 'item') {
        const isActive = window.location.pathname === item.url;
        return (
          <ListItem
            button
            key={item.id}
            onClick={() => navigate(item.url)}
            sx={{ bgcolor: isActive ? '#3b82f6' : 'transparent' }}
          >
            <ListItemIcon>
              {item.icon ? <item.icon sx={{ color: isActive ? 'white' : '#94a3b8' }} /> : null}
            </ListItemIcon>
            <ListItemText primary={item.title} sx={{ color: isActive ? 'white' : '#94a3b8' }} />
          </ListItem>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <Box
      sx={{
        width: 280,
        height: '100vh',
        bgcolor: '#1e293b',
        color: 'white',
        p: 2,
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <span role="img" aria-label="logo">📦</span> Materially
      </Typography>

      <List component="nav" sx={{ '& .MuiListItem-root': { borderRadius: 2, mb: 0.5 } }}>
        {renderMenu(menuItems)}
      </List>
    </Box>
  );
};

// ====== ADMIN LAYOUT ======
const AdminLayout = () => {
  return (
    <ErrorBoundary fallback={<div style={{ padding: 16 }}>Error load halaman</div>}>
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Header Admin */}
        <Box
          component="header"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1200,
            bgcolor: '#0f172a',
            color: '#fff',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.2 }}>
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: 2,
                  bgcolor: 'rgba(59,130,246,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(59,130,246,0.35)',
                }}
              >
                <Typography sx={{ fontWeight: 900, color: '#60a5fa' }}>A</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 900, fontSize: 14 }}>Admin Dashboard</Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>Materially • Control Panel</Typography>
              </Box>
            </Stack>

            {/* Profile dropdown */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ProfileMenu />
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box sx={{ flex: 1, overflow: 'auto', p: 3, pt: 3 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ErrorBoundary>
  );
};

// ====== ROUTES ======
const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPremium /> },
      { path: 'inventaris', element: <InventarisToko /> },
      { path: 'retur-barang', element: <ReturBarangAdmin /> },
      { path: 'transaksi', element: <Transaksi /> },
      { path: 'riwayat-transaksi', element: <RiwayatTransaksi /> },
      { path: 'bon-piutang', element: <BonPiutangAdmin /> },

      { path: 'laporan-keuntungan', element: <LaporanKeuntungan /> },
      { path: 'laporan-laba-rugi', element: <LaporanLabaRugi /> },
      { path: 'laporan-penjualan', element: <LaporanPenjualan /> },
      { path: 'laporan-inventaris', element: <LaporanInventaris /> },
      { path: 'data-karyawan', element: <ManajemenUser /> },
      { path: 'pelanggan', element: <Pelanggan /> },
{ path: 'pengaturan-sistem', element: <PengaturanSistem /> },

      { path: 'rebuild-pages', element: <PagePlaceholder title="Rebuild Pages" /> },
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
    ],
  },
];

export default routes;