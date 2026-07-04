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
} from '@mui/material';
import { alpha } from '@mui/material/styles';

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
import AssessmentIcon from '@mui/icons-material/Assessment';
import PeopleIcon from '@mui/icons-material/People';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

// ==================== DATA DUMMY ====================
const generateSalesData = () => [
  { name: 'Sen', penjualan: 3200000 + Math.floor(Math.random() * 200000 - 100000), target: 4000000, transaksi: 8 + Math.floor(Math.random() * 4 - 2) },
  { name: 'Sel', penjualan: 4100000 + Math.floor(Math.random() * 200000 - 100000), target: 4000000, transaksi: 12 + Math.floor(Math.random() * 4 - 2) },
  { name: 'Rab', penjualan: 3800000 + Math.floor(Math.random() * 200000 - 100000), target: 4000000, transaksi: 10 + Math.floor(Math.random() * 4 - 2) },
  { name: 'Kam', penjualan: 5200000 + Math.floor(Math.random() * 200000 - 100000), target: 5000000, transaksi: 15 + Math.floor(Math.random() * 4 - 2) },
  { name: 'Jum', penjualan: 6100000 + Math.floor(Math.random() * 200000 - 100000), target: 5000000, transaksi: 18 + Math.floor(Math.random() * 4 - 2) },
  { name: 'Sab', penjualan: 7800000 + Math.floor(Math.random() * 200000 - 100000), target: 6000000, transaksi: 22 + Math.floor(Math.random() * 4 - 2) },
  { name: 'Min', penjualan: 4300000 + Math.floor(Math.random() * 200000 - 100000), target: 4000000, transaksi: 11 + Math.floor(Math.random() * 4 - 2) },
];

const stockCategoryData = [
  { name: 'Semen', value: 450, color: '#3b82f6' },
  { name: 'Besi & Baja', value: 320, color: '#ef4444' },
  { name: 'Cat', value: 180, color: '#f59e0b' },
  { name: 'Pipa', value: 150, color: '#10b981' },
  { name: 'Lainnya', value: 140, color: '#8b5cf6' },
];

const stockLevelData = [
  { name: 'Semen', stok: 450, minimal: 100 },
  { name: 'Besi', stok: 320, minimal: 80 },
  { name: 'Cat', stok: 180, minimal: 60 },
  { name: 'Pipa', stok: 150, minimal: 50 },
  { name: 'Paku', stok: 600, minimal: 100 },
];

const topCustomers = [
  { name: 'PT Bangun Jaya', total: 28700000, transactions: 24, lastOrder: '2026-06-09' },
  { name: 'Toko Jaya Abadi', total: 18500000, transactions: 18, lastOrder: '2026-06-08' },
  { name: 'CV Karya Mandiri', total: 14200000, transactions: 15, lastOrder: '2026-06-07' },
  { name: 'UD Bina Usaha', total: 9800000, transactions: 12, lastOrder: '2026-06-05' },
  { name: 'Kontraktor Budi', total: 7600000, transactions: 9, lastOrder: '2026-06-10' },
];

const notificationsData = [
  { id: 1, title: 'Stok Semen Menipis', message: 'Stok Semen Tiga Roda tersisa 10 sak', time: '5 menit lalu', read: false, type: 'warning' },
  { id: 2, title: 'Pengiriman Berhasil', message: 'Truk Engkel sampai di tujuan', time: '1 jam lalu', read: false, type: 'success' },
  { id: 3, title: 'Tagihan Jatuh Tempo', message: 'Toko Jaya Abadi Rp 12jt', time: '3 jam lalu', read: true, type: 'info' },
];

const orderStatusData = [
  { status: 'Pending', count: 12, color: '#f59e0b', icon: <PendingIcon fontSize="small" /> },
  { status: 'Diproses', count: 24, color: '#3b82f6', icon: <HourglassTopIcon fontSize="small" /> },
  { status: 'Dikirim', count: 18, color: '#8b5cf6', icon: <LocalShippingIcon fontSize="small" /> },
  { status: 'Selesai', count: 46, color: '#10b981', icon: <DoneAllIcon fontSize="small" /> },
];

// ==================== KOMPONEN ====================
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
            <Box sx={{ height: 8, bgcolor: alpha(color, 0.1), borderRadius: 4, overflow: 'hidden' }}>
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
      <Typography variant="subtitle2" fontWeight={600} gutterBottom>Progres Pesanan Keseluruhan</Typography>
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
                <Typography variant="caption" sx={{ fontWeight: 600, color: item.color }}>
                  {item.count} ({percentage.toFixed(1)}%)
                </Typography>
              </Stack>
              <Box sx={{ height: 8, bgcolor: alpha(item.color, 0.1), borderRadius: 4, overflow: 'hidden' }}>
                <Box sx={{ width: `${percentage}%`, height: '100%', bgcolor: item.color, borderRadius: 4, transition: 'width 0.5s ease' }} />
              </Box>
            </Box>
          );
        })}
      </Stack>
      <Box sx={{ mt: 2, p: 1.5, bgcolor: alpha('#3b82f6', 0.04), borderRadius: 3, border: `1px solid ${alpha('#3b82f6', 0.1)}` }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" fontWeight={600}>Total Pesanan</Typography>
          <Typography variant="caption" fontWeight={700}>{total} order</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

const StatCard = ({ title, primary, secondary, trend, trendValue, icon: Icon, color, bgLight, loading }) => {
  const theme = useTheme();
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
      <Card sx={{ 
        p: 2.5, 
        borderRadius: '20px', 
        border: `1px solid ${alpha(color, 0.15)}`, 
        background: `linear-gradient(135deg, ${alpha(color, 0.06)} 0%, ${bgLight} 100%)`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': { 
          transform: 'translateY(-6px)', 
          boxShadow: `0 12px 28px ${alpha(color, 0.2)}`,
          borderColor: alpha(color, 0.3),
        },
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.5)} 100%)`,
        }
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
          <Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.05em' }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: '1.75rem', fontWeight: 800, color: theme.palette.text.primary, mt: 0.5 }}>
              {primary}
            </Typography>
          </Box>
          <Avatar sx={{ width: 48, height: 48, background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`, boxShadow: `0 6px 14px ${alpha(color, 0.3)}` }}>
            <Icon sx={{ fontSize: '1.5rem', color: '#fff' }} />
          </Avatar>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.75rem' }}>
            {secondary}
          </Typography>
          <Chip
            icon={isTrendPositive ? <ArrowUpwardIcon sx={{ fontSize: '0.7rem !important' }} /> : <ArrowDownwardIcon sx={{ fontSize: '0.7rem !important' }} />}
            label={trend}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 700,
              bgcolor: isTrendPositive ? alpha('#10b981', 0.12) : alpha('#ef4444', 0.12),
              color: isTrendPositive ? '#10b981' : '#ef4444',
              border: 'none',
            }}
          />
        </Stack>
      </Card>
    </Zoom>
  );
};

const NotificationPopover = ({ open, anchorEl, onClose, notifications, onMarkAsRead, onMarkAllRead }) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  const theme = useTheme();
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{ sx: { width: 360, maxWidth: '90vw', borderRadius: '20px', mt: 1, overflow: 'hidden' } }}
    >
      <Box sx={{ p: 2, bgcolor: theme.palette.primary.main, color: '#fff' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={700}>Notifikasi</Typography>
          {unreadCount > 0 && (
            <Button size="small" onClick={onMarkAllRead} sx={{ color: '#fff', textTransform: 'none' }}>
              Tandai semua dibaca
            </Button>
          )}
        </Stack>
      </Box>
      <List sx={{ p: 0, maxHeight: 400, overflow: 'auto' }}>
        {notifications.length === 0 ? (
          <ListItem sx={{ justifyContent: 'center', py: 4 }}>
            <Typography color="text.secondary">Tidak ada notifikasi</Typography>
          </ListItem>
        ) : (
          notifications.map(notif => (
            <ListItem
              key={notif.id}
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                bgcolor: notif.read ? 'transparent' : alpha(theme.palette.primary.main, 0.05),
                cursor: 'pointer',
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
              }}
              onClick={() => onMarkAsRead(notif.id)}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: notif.type === 'warning' ? '#f59e0b' : notif.type === 'success' ? '#10b981' : '#3b82f6' }}>
                  {notif.type === 'warning' ? <WarningAmberRoundedIcon /> : <CheckCircleIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Typography fontWeight={notif.read ? 500 : 700}>{notif.title}</Typography>}
                secondary={
                  <>
                    <Typography variant="caption" display="block" color="text.secondary">{notif.message}</Typography>
                    <Typography variant="caption" color="text.disabled">{notif.time}</Typography>
                  </>
                }
              />
            </ListItem>
          ))
        )}
      </List>
    </Popover>
  );
};

const ProductDetailModal = ({ open, onClose, product }) => {
  const theme = useTheme();
  if (!product) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '24px' } }}>
      <DialogTitle sx={{ borderBottom: `1px solid ${theme.palette.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight={700}>Detail Produk</Typography>
        <IconButton onClick={onClose}><CloseIcon /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ width: 56, height: 56, bgcolor: alpha(product.color, 0.1) }}>
              <InventoryTwoToneIcon sx={{ color: product.color }} />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>{product.nama}</Typography>
              <Chip label={product.status} size="small" sx={{ bgcolor: alpha(product.color, 0.1), color: product.color }} />
            </Box>
          </Box>
          <Divider />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Terjual</Typography>
              <Typography fontWeight={700}>{product.terjual}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="text.secondary">Progress</Typography>
              <Typography fontWeight={700}>{product.progress}%</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">Stok Saat Ini</Typography>
              <LinearProgress variant="determinate" value={product.progress} sx={{ height: 8, borderRadius: 4, mt: 0.5, bgcolor: alpha(product.color, 0.1), '& .MuiLinearProgress-bar': { bgcolor: product.color } }} />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button variant="contained" onClick={onClose} fullWidth>Tutup</Button>
      </DialogActions>
    </Dialog>
  );
};

// ==================== DASHBOARD UTAMA ====================
export default function DashboardPremium() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('week');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [salesData, setSalesData] = useState(generateSalesData);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSalesData(generateSalesData);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const reportTokoData = [
    { title: 'Pendapatan', primary: 'Rp 34,2 Jt', secondary: '+Rp 4,2 Jt minggu ini', trend: '+14,2%', trendValue: 14.2, icon: StorefrontTwoToneIcon, color: '#3b82f6', bgLight: alpha('#3b82f6', 0.03) },
    { title: 'Total Stok', primary: '1.876', secondary: '+120 unit bulan ini', trend: '+6,8%', trendValue: 6.8, icon: InventoryTwoToneIcon, color: '#10b981', bgLight: alpha('#10b981', 0.03) },
    { title: 'Penjualan', primary: '156 Nota', secondary: '+12% dari minggu lalu', trend: '+12%', trendValue: 12, icon: ShoppingCartTwoToneIcon, color: '#f59e0b', bgLight: alpha('#f59e0b', 0.03) },
    { title: 'Stok Kritis', primary: '3 Item', secondary: 'Semen, Paku, Cat', trend: '-2 item', trendValue: -2, icon: WarningAmberTwoToneIcon, color: '#ef4444', bgLight: alpha('#ef4444', 0.03) },
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
            <Tooltip title="Filter periode">
              <Button variant="outlined" size="small" startIcon={<DateRangeIcon />} onClick={(e) => setFilterAnchor(e.currentTarget)} sx={{ borderRadius: '12px', textTransform: 'none' }}>
                {dateFilter === 'week' ? 'Minggu Ini' : dateFilter === 'month' ? 'Bulan Ini' : 'Kustom'}
              </Button>
            </Tooltip>
            <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={() => setFilterAnchor(null)}>
              <MenuItem onClick={() => { setDateFilter('week'); setFilterAnchor(null); }}>Minggu Ini</MenuItem>
              <MenuItem onClick={() => { setDateFilter('month'); setFilterAnchor(null); }}>Bulan Ini</MenuItem>
            </Menu>
            <Tooltip title="Refresh Data">
              <IconButton onClick={handleRefresh} sx={{ bgcolor: alpha('#3b82f6', 0.1) }}>
                <RefreshIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export CSV">
              <IconButton onClick={handleExport} sx={{ bgcolor: alpha('#10b981', 0.1) }}>
                <GetAppIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Print Dashboard">
              <IconButton onClick={handlePrint} sx={{ bgcolor: alpha('#f59e0b', 0.1) }}>
                <PrintIcon sx={{ fontSize: '1.2rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifikasi">
              <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)} sx={{ bgcolor: alpha('#ef4444', 0.1) }}>
                <Badge badgeContent={unreadCount} color="error">
                  <NotificationsIcon sx={{ fontSize: '1.2rem' }} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Chip icon={<FiberManualRecordIcon sx={{ fontSize: '0.55rem', animation: 'pulse 1.5s infinite', color: '#10b981 !important' }} />} label="Live" size="small" sx={{ bgcolor: alpha('#10b981', 0.12), color: '#10b981', fontWeight: 700 }} />
          </Stack>
        </Stack>
      </Fade>

      <NotificationPopover open={Boolean(notifAnchor)} anchorEl={notifAnchor} onClose={() => setNotifAnchor(null)} notifications={notifications} onMarkAsRead={handleMarkAsRead} onMarkAllRead={handleMarkAllRead} />

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
                <Paper sx={{ p: 2.5, borderRadius: '20px', border: `1px solid ${alpha('#3b82f6', 0.15)}` }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={700}>
                      📈 Grafik Performa Penjualan Real-Time
                      <Chip label="Live" size="small" icon={<FiberManualRecordIcon sx={{ fontSize: '0.6rem', color: '#10b981 !important' }} />} sx={{ ml: 1, bgcolor: alpha('#10b981', 0.1), color: '#10b981', fontWeight: 600 }} />
                    </Typography>
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
                                  <LinearProgress variant="determinate" value={prod.progress} sx={{ height: 6, borderRadius: 3, bgcolor: alpha(prod.color, 0.1), '& .MuiLinearProgress-bar': { bgcolor: prod.color, borderRadius: 3 } }} />
                                </TableCell>
                                <TableCell align="right" sx={{ py: 1.5 }}>
                                  <Chip label={prod.status} size="small" sx={{ bgcolor: alpha(prod.color, 0.12), color: prod.color, fontWeight: 600 }} />
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
                  <TableHead sx={{ bgcolor: alpha('#3b82f6', 0.05) }}>
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
                      <TableHead sx={{ bgcolor: alpha('#3b82f6', 0.05) }}>
                        <TableRow>
                          <TableCell>Kategori</TableCell>
                          <TableCell align="right">Stok</TableCell>
                          <TableCell align="right">Minimal</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stockLevelData.map(row => (
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
                  <Paper sx={{ p: 2.5, borderRadius: '16px', bgcolor: alpha('#f59e0b', 0.05), border: `1px solid ${alpha('#f59e0b', 0.2)}` }}>
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
                      <TableHead sx={{ bgcolor: alpha('#3b82f6', 0.05) }}>
                        <TableRow>
                          <TableCell>Nama</TableCell>
                          <TableCell align="right">Total Belanja</TableCell>
                          <TableCell align="right">Transaksi</TableCell>
                          <TableCell>Last Order</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {topCustomers.map(cust => (
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
                    {dataBonPiutang.map((bon, idx) => (
                      <Paper key={idx} sx={{ p: 2, borderRadius: '16px', borderLeft: `4px solid ${bon.statusColor}`, bgcolor: alpha(bon.statusColor, 0.03) }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography fontWeight={700}>{bon.nama}</Typography>
                          <Typography fontWeight={700} color={bon.statusColor}>{bon.sisa}</Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">Jatuh tempo: {bon.tempo}</Typography>
                        <Button size="small" variant="text" sx={{ mt: 1, p: 0, textTransform: 'none', color: bon.statusColor }}>
                          Kirim Pengingat
                        </Button>
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
                  {salesActivity.map((act, idx) => (
                    <Grow in timeout={idx * 100} key={idx}>
                      <Paper sx={{ p: 1.5, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, transition: 'all 0.2s', '&:hover': { bgcolor: alpha(act.viaColor, 0.04) } }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <MuiAvatar sx={{ width: 36, height: 36, bgcolor: alpha(act.viaColor, 0.1) }}>
                            <CheckCircleIcon sx={{ color: act.viaColor, fontSize: '1.1rem' }} />
                          </MuiAvatar>
                          <Box>
                            <Typography fontWeight={600} fontSize="0.85rem">{act.item} ({act.qty})</Typography>
                            <Typography variant="caption" color="text.secondary">{act.ket}</Typography>
                          </Box>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Chip label={act.via} size="small" sx={{ bgcolor: alpha(act.viaColor, 0.1), color: act.viaColor, fontWeight: 600 }} />
                          <Typography variant="caption" color="text.secondary">{act.waktu}</Typography>
                        </Stack>
                      </Paper>
                    </Grow>
                  ))}
                </Stack>
                <Paper sx={{ mt: 2, p: 1.5, borderRadius: '16px', bgcolor: alpha('#ef4444', 0.08), display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                  {armadaStatus.map((arm, idx) => (
                    <Paper key={idx} sx={{ p: 1.5, borderRadius: '16px', borderLeft: `3px solid ${arm.status === 'Mengirim' ? '#3b82f6' : '#10b981'}`, transition: 'all 0.2s', '&:hover': { transform: 'translateX(4px)' } }}>
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
                  {dataBonPiutang.map((bon, idx) => (
                    <Paper key={idx} sx={{ p: 1.5, borderRadius: '16px', bgcolor: alpha(bon.statusColor, 0.04), border: `1px solid ${alpha(bon.statusColor, 0.1)}` }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight={700}>{bon.nama}</Typography>
                        <Typography fontWeight={700} color={bon.statusColor}>{bon.sisa}</Typography>
                      </Stack>
                      <Typography variant="caption" color="text.secondary">Jatuh tempo: {bon.tempo}</Typography>
                      <Button size="small" variant="text" sx={{ mt: 1, p: 0, textTransform: 'none', color: bon.statusColor }}>
                        Kirim Pengingat
                      </Button>
                    </Paper>
                  ))}
                </Stack>
              </Card>
            </Zoom>
            <Zoom in timeout={1100}>
              <Card sx={{ p: 2.5, borderRadius: '24px', bgcolor: alpha('#3b82f6', 0.02), border: `1px solid ${alpha('#3b82f6', 0.1)}` }}>
                <Typography variant="h6" fontWeight={700} mb={1.5}>📋 Catatan Operasional</Typography>
                <List dense disablePadding>
                  {operationalNotes.map((note, idx) => (
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

      <ProductDetailModal open={detailModalOpen} onClose={() => setDetailModalOpen(false)} product={selectedProduct} />
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snackbar.severity} sx={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @media print { .MuiIconButton-root, .MuiChip-root, .MuiButton-root, .MuiTabs-root { display: none !important; } }
      `}</style>
    </Box>
  );
}