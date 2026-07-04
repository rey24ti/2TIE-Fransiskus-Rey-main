import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Paper,
    Stack,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    InputAdornment,
    IconButton,
    Avatar,
    Tooltip,
    MenuItem,
    Select,
    FormControl,
    Pagination,
    Grid,
    Card,
    CardContent,
    Divider,
    Menu,
    ListItemIcon,
    ListItemText,
    Fade,
    useTheme,
    alpha,
    LinearProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    DialogContentText,
} from '@mui/material';
import {
    LocalShipping as LocalShippingIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    MoreVert as MoreVertIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
    DeleteOutlined as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    Pending as PendingIcon,
    Timer as TimerIcon,
    Cancel as CancelIcon,
    Person as PersonIcon,
    LocationOn as LocationOnIcon,
    AccessTime as AccessTimeIcon,
    TrendingUp as TrendingUpIcon,
    Refresh as RefreshIcon,
    DirectionsCar as DirectionsCarIcon,
    Check as CheckIcon,
    Close as CloseIcon,
} from '@mui/icons-material';


// ─── Helpers ───────────────────────────────────────────────
const formatStatus = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('proses') || s.includes('progress') || s.includes('in_transit') || s.includes('dalam perjalanan')) {
        return { label: 'Dalam Perjalanan', color: '#3b82f6', bg: alpha('#3b82f6', 0.12), icon: <TimerIcon sx={{ fontSize: 16 }} /> };
    }
    if (s.includes('selesai') || s.includes('done') || s.includes('delivered')) {
        return { label: 'Selesai', color: '#10b981', bg: alpha('#10b981', 0.12), icon: <CheckCircleIcon sx={{ fontSize: 16 }} /> };
    }
    if (s.includes('batal') || s.includes('cancel')) {
        return { label: 'Batal', color: '#ef4444', bg: alpha('#ef4444', 0.12), icon: <CancelIcon sx={{ fontSize: 16 }} /> };
    }
    if (s.includes('loading')) {
        return { label: 'Loading...', color: '#f59e0b', bg: alpha('#f59e0b', 0.14), icon: <PendingIcon sx={{ fontSize: 16 }} /> };
    }
    if (s.includes('standby') || s.includes('tersedia')) {
        return { label: 'Standby', color: '#10b981', bg: alpha('#10b981', 0.12), icon: <CheckIcon sx={{ fontSize: 16 }} /> };
    }
    return { label: 'Menunggu', color: '#f59e0b', bg: alpha('#f59e0b', 0.14), icon: <PendingIcon sx={{ fontSize: 16 }} /> };
};

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
};

const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'waiting', label: 'Menunggu' },
    { value: 'in_transit', label: 'Dalam Perjalanan' },
    { value: 'delivered', label: 'Selesai' },
    { value: 'cancelled', label: 'Batal' },
];

// Mapping status dari halaman ke format di localStorage (Kasir)
const statusToKasir = {
    waiting: 'Menunggu',
    in_transit: 'Dalam Perjalanan',
    delivered: 'Selesai',
    cancelled: 'Batal',
};

// Mapping dari localStorage ke halaman
const statusFromKasir = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('batal')) return 'cancelled';
    if (s.includes('selesai') || s.includes('done')) return 'delivered';
    if (s.includes('perjalanan') || s.includes('in_transit')) return 'in_transit';
    return 'waiting';
};

const armadaStatusOptions = [
    { value: 'dalam perjalanan', label: 'Dalam Perjalanan' },
    { value: 'standby', label: 'Standby' },
];

// ─── Dummy Data ─────────────────────────────────────────────
const generateDummyData = () => {
    const customers = [
        { name: 'Bpk. Rahmat', phone: '08123456789', barang: 'Semen', qty: 2, address: 'Vila Molati Blok C-12', driver: 'Agus Setiawan' },
        { name: 'Ibu Susi', phone: '08234567890', barang: 'Cat', qty: 5, address: 'Perum Indah Permai No. 45', driver: 'Bambang Priyono' },
        { name: 'CV Bangun Sejahtera', phone: '08345678901', barang: 'Besi Beton', qty: 10, address: 'Jl. Merdeka Raya No. 88', driver: 'Dewi Sartika' },
        { name: 'Toko Jaya Sentosa', phone: '08456789012', barang: 'Pipa PVC', qty: 3, address: 'Jl. Sudirman Kav. 22', driver: 'Eko Prabowo' },
        { name: 'PT Maju Mundur', phone: '08567890123', barang: 'Keramik', qty: 6, address: 'Jl. Gatot Subroto No. 10', driver: 'Fitriani' },
        { name: 'Bpk. Hendra', phone: '08678901234', barang: 'Semen', qty: 4, address: 'Perum Bumi Indah Blok A-7', driver: 'Gunawan' },
        { name: 'Ibu Rina', phone: '08789012345', barang: 'Cat', qty: 2, address: 'Jl. Pahlawan No. 33', driver: 'Hendra Wijaya' },
        { name: 'CV Sumber Rejeki', phone: '08890123456', barang: 'Besi', qty: 8, address: 'Jl. Ahmad Yani No. 56', driver: 'Indah Permata' },
    ];

    const statuses = ['waiting', 'waiting', 'in_transit', 'in_transit', 'delivered', 'delivered', 'cancelled', 'waiting'];
    const now = new Date();

    return customers.map((c, i) => {
        const status = statuses[i % statuses.length];
        const date = new Date(now);
        date.setHours(date.getHours() - (i * 3 + 1));
        const orderId = `#${['TRX', 'TPK', 'INV', 'ORD'][i % 4]}-${String(1000 + i * 7).padStart(4, '0')}`;
        return {
            id: orderId,
            customerName: c.name,
            customerPhone: c.phone,
            barang: c.barang,
            qty: c.qty,
            address: c.address,
            status,
            driver: c.driver,
            date: date.toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            total: Math.floor(Math.random() * 500000) + 50000,
        };
    });
};

// ─── LocalStorage helper ──────────────────────────────────────
const readRiwayatToko = () => {
    try {
        const raw = localStorage.getItem('riwayat_toko');
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const toPengirimanRows = (riwayat) => {
    const deliveryOrders = (riwayat || []).filter((r) => r?.deliveryOption === 'delivery');
    return deliveryOrders.map((r, idx) => {
        const id = r?.id != null ? String(r.id) : `#TRX-${Date.now()}-${idx}`;
        const customerName = r?.customerName || r?.customer || '-';
        const customerPhone = r?.customerPhone || '-';
        const barang = r?.nama || '-';
        const qty = r?.qty || 0;
        const address = r?.deliveryAddress || r?.alamat || '-';
        const status = statusFromKasir(r?.deliveryStatus || r?.status || 'Menunggu');
        const driver = r?.driver || '-';
        const date = r?.tanggalLengkap ? `${r.tanggalLengkap}${r?.tgl ? ' • ' + r.tgl : ''}` : new Date().toLocaleString('id-ID');
        const total = r?.total != null ? Number(r.total) : 0;
        return {
            id,
            customerName,
            customerPhone,
            barang,
            qty,
            address,
            status,
            driver,
            date,
            total,
        };
    });
};

// ─── Data Armada ────────────────────────────────────────────
const generateArmadaData = () => {
    return [
        {
            id: 'TRK',
            vehicle: 'Truk Hino',
            plate: 'B 9102',
            driver: 'Bambang Wijaya',
            status: 'dalam perjalanan',
            loadCurrent: 8.5,
            loadMax: 10,
            loadUnit: 'Ton',
            cargo: 'Semen & Besi',
        },
        {
            id: 'SFX',
            vehicle: 'L300 Pickup',
            plate: 'B 4421',
            driver: 'Agus Santoso',
            status: 'standby',
            loadCurrent: 0.8,
            loadMax: 2,
            loadUnit: 'Ton',
            cargo: 'Keramik',
        },
        {
            id: 'KLG',
            vehicle: 'Truk Fuso',
            plate: 'B 8829',
            driver: '-',
            status: 'standby',
            loadCurrent: 0,
            loadMax: 0,
            loadUnit: 'Ton',
            cargo: '-',
        },
    ];
};

// ─── Main Component ────────────────────────────────────────
export default function PengirimanKaryawan() {
    const theme = useTheme();

    const riwayatToko = useMemo(() => readRiwayatToko(), []);
    const rowsFromKasir = useMemo(() => toPengirimanRows(riwayatToko), [riwayatToko]);

    const [data, setData] = useState(() => (rowsFromKasir.length ? rowsFromKasir : generateDummyData()));
    const [armada, setArmada] = useState(generateArmadaData);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const rowsPerPage = 6;

    // ── State untuk Edit Armada ──
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingArmada, setEditingArmada] = useState(null);
    const [editDriver, setEditDriver] = useState('');
    const [editStatus, setEditStatus] = useState('');

    // ── State untuk Aksi Dropdown ──
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);

    const [editStatusDialogOpen, setEditStatusDialogOpen] = useState(false);
    const [selectedEditStatus, setSelectedEditStatus] = useState(null);
    const [newStatus, setNewStatus] = useState('waiting');

    const [assignDriverDialogOpen, setAssignDriverDialogOpen] = useState(false);
    const [selectedAssignDriver, setSelectedAssignDriver] = useState(null);
    const [newDriver, setNewDriver] = useState('');

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedDelete, setSelectedDelete] = useState(null);

    // ── Filters ──
    const filteredData = useMemo(() => {
        return data.filter((item) => {
            const matchSearch =
                item.id.toLowerCase().includes(search.toLowerCase()) ||
                item.customerName.toLowerCase().includes(search.toLowerCase()) ||
                item.barang.toLowerCase().includes(search.toLowerCase()) ||
                item.address.toLowerCase().includes(search.toLowerCase());
            const matchStatus = statusFilter === 'all' || item.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [data, search, statusFilter]);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, page]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    // ── Stats ──
    const stats = useMemo(() => {
        const total = data.length;
        const waiting = data.filter(d => d.status === 'waiting').length;
        const inTransit = data.filter(d => d.status === 'in_transit').length;
        const delivered = data.filter(d => d.status === 'delivered').length;
        const cancelled = data.filter(d => d.status === 'cancelled').length;
        return { total, waiting, inTransit, delivered, cancelled };
    }, [data]);

    const armadaStats = useMemo(() => {
        const total = armada.length;
        const aktif = armada.filter(a => a.status === 'dalam perjalanan').length;
        const tersedia = armada.filter(a => a.status === 'standby').length;
        return { total, aktif, tersedia };
    }, [armada]);

    // ── Handler Refresh ──
    const handleRefresh = () => {
        const riwayat = readRiwayatToko();
        const rows = toPengirimanRows(riwayat);
        setData(rows.length ? rows : generateDummyData());
        setArmada(generateArmadaData);
        setPage(1);
    };

    // ── Handler untuk menu dropdown ──
    const handleMenuOpen = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    // ── Lihat Detail ──
    const handleViewDetail = (row) => {
        setSelectedDetail(row);
        setDetailDialogOpen(true);
        handleMenuClose();
    };

    // ── Edit Status ──
    const handleEditStatus = (row) => {
        setSelectedEditStatus(row);
        setNewStatus(row.status);
        setEditStatusDialogOpen(true);
        handleMenuClose();
    };

    const handleSaveEditStatus = () => {
        if (selectedEditStatus) {
            const kasirStatus = statusToKasir[newStatus] || 'Menunggu';
            updateRiwayatItem(selectedEditStatus.id, { deliveryStatus: kasirStatus });
            setEditStatusDialogOpen(false);
            setSelectedEditStatus(null);
        }
    };

    // ── Assign Driver ──
    const handleAssignDriver = (row) => {
        setSelectedAssignDriver(row);
        setNewDriver(row.driver);
        setAssignDriverDialogOpen(true);
        handleMenuClose();
    };

    const handleSaveAssignDriver = () => {
        if (selectedAssignDriver) {
            updateRiwayatItem(selectedAssignDriver.id, { driver: newDriver });
            setAssignDriverDialogOpen(false);
            setSelectedAssignDriver(null);
        }
    };

    // ── Hapus ──
    const handleDelete = (row) => {
        setSelectedDelete(row);
        setDeleteConfirmOpen(true);
        handleMenuClose();
    };

    const confirmDelete = () => {
        if (selectedDelete) {
            deleteRiwayatItem(selectedDelete.id);
            setDeleteConfirmOpen(false);
            setSelectedDelete(null);
        }
    };

    // ── Fungsi update dan hapus di localStorage ──
    const updateRiwayatItem = (id, updates) => {
        let riwayat = readRiwayatToko();
        const index = riwayat.findIndex(r => String(r.id) === String(id));
        if (index === -1) return;
        riwayat[index] = { ...riwayat[index], ...updates };
        localStorage.setItem('riwayat_toko', JSON.stringify(riwayat));
        handleRefresh();
    };

    const deleteRiwayatItem = (id) => {
        let riwayat = readRiwayatToko();
        riwayat = riwayat.filter(r => String(r.id) !== String(id));
        localStorage.setItem('riwayat_toko', JSON.stringify(riwayat));
        handleRefresh();
    };

    // ── Buka Maps ──
    const handleOpenMap = (address) => {
        const raw = String(address || '').trim();
        if (!raw) return;
        const encoded = encodeURIComponent(raw);
        window.open(`https://www.google.com/maps/search/?api=1&query=${encoded}`, '_blank', 'noopener,noreferrer');
    };

    // ── Edit Armada ──
    const handleOpenEditDialog = (item) => {
        setEditingArmada(item);
        setEditDriver(item.driver);
        setEditStatus(item.status);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditDialogOpen(false);
        setEditingArmada(null);
        setEditDriver('');
        setEditStatus('');
    };

    const handleSaveEdit = () => {
        if (editingArmada) {
            setArmada(prev =>
                prev.map(item =>
                    item.id === editingArmada.id
                        ? { ...item, driver: editDriver, status: editStatus }
                        : item
                )
            );
            handleCloseEditDialog();
        }
    };

    // ── Stat Card ──
    const StatCard = ({ icon, label, value, color, subtext, trend }) => (
        <Card
            elevation={0}
            sx={{
                borderRadius: '16px',
                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                bgcolor: 'background.paper',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: theme.shadows[4],
                },
            }}
        >
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Stack spacing={0.5}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.5}>
                            {label}
                        </Typography>
                        <Typography variant="h4" fontWeight={800} lineHeight={1.1}>
                            {value}
                        </Typography>
                        {subtext && (
                            <Typography variant="caption" color="text.secondary">
                                {subtext}
                            </Typography>
                        )}
                    </Stack>
                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: alpha(color, 0.12),
                            color: color,
                            borderRadius: '14px',
                        }}
                    >
                        {icon}
                    </Avatar>
                </Stack>
                {trend && (
                    <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 1.5 }}>
                        <TrendingUpIcon sx={{ fontSize: 14, color: '#10b981' }} />
                        <Typography variant="caption" fontWeight={600} color="#10b981">
                            {trend}
                        </Typography>
                    </Stack>
                )}
            </CardContent>
        </Card>
    );

    // ─── Render ───
    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                py: 3,
                px: { xs: 1.5, sm: 3 },
            }}
        >
            <Container maxWidth="xl" disableGutters>
                <Fade in timeout={400}>
                    <Stack spacing={3}>
                        {/* ─── Header ─── */}
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            alignItems={{ xs: 'stretch', sm: 'center' }}
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: '16px',
                                        bgcolor: alpha('#2563eb', 0.12),
                                        color: '#2563eb',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <LocalShippingIcon sx={{ fontSize: 30 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight={800} letterSpacing={-0.5}>
                                        Manajemen Pengiriman & Armada
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Pantau pengiriman dan status armada secara real-time
                                    </Typography>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Tooltip title="Refresh data">
                                    <IconButton
                                        onClick={handleRefresh}
                                        sx={{
                                            borderRadius: '12px',
                                            bgcolor: alpha(theme.palette.primary.main, 0.06),
                                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.12) },
                                        }}
                                    >
                                        <RefreshIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </Stack>

                        {/* ─── Stats Pengiriman ─── */}
                        <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }}>
                            Statistik Pengiriman
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6} md={2.4}>
                                <StatCard
                                    icon={<LocalShippingIcon fontSize="small" />}
                                    label="Total"
                                    value={stats.total}
                                    color="#2563eb"
                                    subtext={`${stats.total} pengiriman`}
                                    trend="+12% minggu ini"
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={2.4}>
                                <StatCard
                                    icon={<PendingIcon fontSize="small" />}
                                    label="Menunggu"
                                    value={stats.waiting}
                                    color="#f59e0b"
                                    subtext={`${stats.waiting} perlu driver`}
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={2.4}>
                                <StatCard
                                    icon={<TimerIcon fontSize="small" />}
                                    label="Dalam Perjalanan"
                                    value={stats.inTransit}
                                    color="#3b82f6"
                                    subtext={`${stats.inTransit} aktif`}
                                    trend="+5% dari kemarin"
                                />
                            </Grid>
                            <Grid item xs={6} sm={6} md={2.4}>
                                <StatCard
                                    icon={<CheckCircleIcon fontSize="small" />}
                                    label="Selesai"
                                    value={stats.delivered}
                                    color="#10b981"
                                    subtext={`${stats.delivered} berhasil`}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2.4}>
                                <StatCard
                                    icon={<CancelIcon fontSize="small" />}
                                    label="Batal"
                                    value={stats.cancelled}
                                    color="#ef4444"
                                    subtext={`${stats.cancelled} dibatalkan`}
                                />
                            </Grid>
                        </Grid>

                        {/* ─── Table Pengiriman ─── */}
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '20px',
                                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                overflow: 'hidden',
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                alignItems={{ xs: 'stretch', sm: 'center' }}
                                justifyContent="space-between"
                                sx={{ p: 2.5, pb: 2 }}
                            >
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    alignItems={{ xs: 'stretch', sm: 'center' }}
                                    sx={{ flex: 1 }}
                                >
                                    <TextField
                                        size="small"
                                        placeholder="Cari ID, pelanggan, atau alamat..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPage(1);
                                        }}
                                        sx={{
                                            minWidth: { xs: '100%', sm: 240 },
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '12px',
                                                bgcolor: alpha(theme.palette.background.default, 0.6),
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <FormControl size="small" sx={{ minWidth: 150 }}>
                                        <Select
                                            value={statusFilter}
                                            onChange={(e) => {
                                                setStatusFilter(e.target.value);
                                                setPage(1);
                                            }}
                                            displayEmpty
                                            sx={{
                                                borderRadius: '12px',
                                                bgcolor: alpha(theme.palette.background.default, 0.6),
                                                '& .MuiSelect-select': { py: 0.8 },
                                            }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <FilterIcon fontSize="small" color="action" />
                                                </InputAdornment>
                                            }
                                        >
                                            {statusOptions.map((opt) => (
                                                <MenuItem key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Stack>

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Chip
                                        label={`${filteredData.length} pengiriman`}
                                        size="small"
                                        sx={{
                                            fontWeight: 600,
                                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                                            color: theme.palette.primary.main,
                                            borderRadius: '8px',
                                        }}
                                    />
                                    {filteredData.length !== data.length && (
                                        <Chip
                                            label="Filter aktif"
                                            size="small"
                                            onDelete={() => {
                                                setSearch('');
                                                setStatusFilter('all');
                                                setPage(1);
                                            }}
                                            sx={{ borderRadius: '8px' }}
                                        />
                                    )}
                                </Stack>
                            </Stack>

                            <Divider />

                            <TableContainer sx={{ overflowX: 'auto' }}>
                                <Table size="medium" stickyHeader>
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                '& th': {
                                                    bgcolor: alpha(theme.palette.background.default, 0.5),
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: 0.5,
                                                    color: theme.palette.text.secondary,
                                                    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.06)}`,
                                                    py: 1.8,
                                                },
                                            }}
                                        >
                                            <TableCell>Nama</TableCell>
                                            <TableCell>No Tlp</TableCell>
                                            <TableCell>Barang</TableCell>
                                            <TableCell>Alamat</TableCell>
                                            <TableCell>Tanggal</TableCell>
                                            <TableCell align="right">Aksi</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedData.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 6 }}>
                                                    <Stack alignItems="center" spacing={1}>
                                                        <LocalShippingIcon sx={{ fontSize: 48, color: 'text.disabled', opacity: 0.3 }} />
                                                        <Typography color="text.secondary" fontWeight={500}>
                                                            Tidak ada data pengiriman
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Coba ubah filter atau refresh halaman
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            paginatedData.map((row) => {
                                                return (
                                                    <TableRow
                                                        key={row.id}
                                                        hover
                                                        sx={{
                                                            '&:hover td': { bgcolor: alpha(theme.palette.primary.main, 0.02) },
                                                            transition: 'background 0.15s',
                                                            '& td': { borderBottom: `1px solid ${alpha(theme.palette.divider, 0.04)}`, py: 1.6 },
                                                        }}
                                                    >
                                                        <TableCell>
                                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                                <Avatar
                                                                    sx={{
                                                                        width: 24,
                                                                        height: 24,
                                                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                                        color: theme.palette.primary.main,
                                                                        fontSize: '0.65rem',
                                                                        fontWeight: 700,
                                                                    }}
                                                                >
                                                                    {getInitials(row.customerName)}
                                                                </Avatar>
                                                                <Typography variant="body2" fontWeight={600}>
                                                                    {row.customerName}
                                                                </Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">{row.customerPhone}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2">
                                                                {row.barang} x{row.qty}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                                <Tooltip title="Buka di Google Maps">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => handleOpenMap(row.address)}
                                                                        sx={{
                                                                            color: 'primary.main',
                                                                            p: 0.5,
                                                                            '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
                                                                        }}
                                                                    >
                                                                        <LocationOnIcon sx={{ fontSize: 18 }} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        whiteSpace: 'normal',
                                                                        wordBreak: 'break-word',
                                                                        '&:hover': { color: 'primary.main', textDecoration: 'underline' },
                                                                    }}
                                                                    onClick={() => handleOpenMap(row.address)}
                                                                >
                                                                    {row.address}
                                                                </Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                                <Typography variant="body2" color="text.secondary" fontSize="0.75rem">
                                                                    {row.date}
                                                                </Typography>
                                                            </Stack>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => handleMenuOpen(e, row)}
                                                                sx={{
                                                                    borderRadius: '10px',
                                                                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.08) },
                                                                }}
                                                            >
                                                                <MoreVertIcon fontSize="small" />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            {filteredData.length > 0 && (
                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    alignItems={{ xs: 'center', sm: 'center' }}
                                    justifyContent="space-between"
                                    sx={{ p: 2.5, pt: 2 }}
                                >
                                    <Typography variant="caption" color="text.secondary">
                                        Menampilkan{' '}
                                        <Typography component="span" fontWeight={700} color="text.primary">
                                            {Math.min((page - 1) * rowsPerPage + 1, filteredData.length)}
                                        </Typography>{' '}
                                        -{' '}
                                        <Typography component="span" fontWeight={700} color="text.primary">
                                            {Math.min(page * rowsPerPage, filteredData.length)}
                                        </Typography>{' '}
                                        dari{' '}
                                        <Typography component="span" fontWeight={700} color="text.primary">
                                            {filteredData.length}
                                        </Typography>{' '}
                                        pengiriman
                                    </Typography>
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={(_, v) => setPage(v)}
                                        shape="rounded"
                                        color="primary"
                                        size="small"
                                        sx={{
                                            '& .MuiPaginationItem-root': { borderRadius: '10px', fontWeight: 600 },
                                        }}
                                    />
                                </Stack>
                            )}
                        </Paper>

                        {/* ─── STATUS ARMADA ─── */}
                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: '20px',
                                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                overflow: 'hidden',
                                bgcolor: 'background.paper',
                                p: 3,
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 3 }}
                            >
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <DirectionsCarIcon sx={{ color: '#2563eb', fontSize: 28 }} />
                                    <Typography variant="h6" fontWeight={700}>
                                        Status Armada
                                    </Typography>
                                </Stack>
                                <Chip
                                    label={`Aktif ${armadaStats.aktif}/${armadaStats.total}`}
                                    sx={{
                                        fontWeight: 700,
                                        bgcolor: alpha('#2563eb', 0.1),
                                        color: '#2563eb',
                                        borderRadius: '20px',
                                        px: 1,
                                    }}
                                />
                            </Stack>

                            <Grid container spacing={2.5}>
                                {armada.map((item) => {
                                    const status = formatStatus(item.status);
                                    const isStandby = item.status === 'standby';
                                    const loadPercent = item.loadMax > 0 ? (item.loadCurrent / item.loadMax) * 100 : 0;

                                    return (
                                        <Grid item xs={12} md={4} key={item.id}>
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    borderRadius: '16px',
                                                    border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                                                    bgcolor: 'background.paper',
                                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: theme.shadows[6],
                                                    },
                                                    height: '100%',
                                                    position: 'relative',
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleOpenEditDialog(item)}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 8,
                                                        right: 8,
                                                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                                                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.16) },
                                                        borderRadius: '10px',
                                                        p: 0.8,
                                                    }}
                                                >
                                                    <EditIcon sx={{ fontSize: 18, color: theme.palette.primary.main }} />
                                                </IconButton>

                                                <CardContent sx={{ p: 2.5, pr: 5 }}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                                        <Box>
                                                            <Typography variant="subtitle1" fontWeight={700}>
                                                                {item.vehicle}
                                                            </Typography>
                                                            <Typography variant="caption" color="text.secondary">
                                                                {item.plate}
                                                            </Typography>
                                                        </Box>
                                                        <Chip
                                                            label={item.id}
                                                            size="small"
                                                            sx={{
                                                                fontWeight: 700,
                                                                bgcolor: alpha(theme.palette.grey[500], 0.1),
                                                                color: 'text.secondary',
                                                                borderRadius: '6px',
                                                                fontSize: '0.7rem',
                                                                height: 24,
                                                            }}
                                                        />
                                                    </Stack>

                                                    <Divider sx={{ my: 1.5 }} />

                                                    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                                                        <Chip
                                                            icon={status.icon}
                                                            label={status.label}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: status.bg,
                                                                color: status.color,
                                                                fontWeight: 700,
                                                                borderRadius: '8px',
                                                                '& .MuiChip-icon': { color: status.color },
                                                            }}
                                                        />
                                                        <Stack direction="row" alignItems="center" spacing={0.5}>
                                                            <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                            <Typography variant="body2" fontWeight={500}>
                                                                {item.driver === '-' ? '-' : item.driver}
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>

                                                    {!isStandby ? (
                                                        <Box sx={{ mt: 1 }}>
                                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                                    Load
                                                                </Typography>
                                                                <Typography variant="caption" fontWeight={600}>
                                                                    {item.loadCurrent}/{item.loadMax} {item.loadUnit}
                                                                </Typography>
                                                            </Stack>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={loadPercent}
                                                                sx={{
                                                                    height: 6,
                                                                    borderRadius: 4,
                                                                    mt: 0.5,
                                                                    bgcolor: alpha(theme.palette.grey[300], 0.5),
                                                                    '& .MuiLinearProgress-bar': {
                                                                        borderRadius: 4,
                                                                        bgcolor: loadPercent > 80 ? '#ef4444' : loadPercent > 50 ? '#f59e0b' : '#10b981',
                                                                    },
                                                                }}
                                                            />
                                                            {item.cargo && item.cargo !== '-' && (
                                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                                                    {item.cargo}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    ) : (
                                                        <Box sx={{ mt: 1, py: 0.5 }}>
                                                            <Typography variant="caption" color="text.secondary" fontStyle="italic">
                                                                Tersedia untuk Assign
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Paper>
                    </Stack>
                </Fade>

                {/* ─── MENU DROPDOWN ─── */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    PaperProps={{
                        elevation: 4,
                        sx: { borderRadius: '14px', minWidth: 180, py: 0.5, mt: 0.5 },
                    }}
                >
                    <MenuItem
                        onClick={() => selectedRow && handleViewDetail(selectedRow)}
                        sx={{ borderRadius: '10px', mx: 0.5, my: 0.2 }}
                    >
                        <ListItemIcon>
                            <VisibilityIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText>Lihat Detail</ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={() => selectedRow && handleEditStatus(selectedRow)}
                        sx={{ borderRadius: '10px', mx: 0.5, my: 0.2 }}
                    >
                        <ListItemIcon>
                            <EditIcon fontSize="small" color="info" />
                        </ListItemIcon>
                        <ListItemText>Edit Status</ListItemText>
                    </MenuItem>
                    <MenuItem
                        onClick={() => selectedRow && handleAssignDriver(selectedRow)}
                        sx={{ borderRadius: '10px', mx: 0.5, my: 0.2 }}
                    >
                        <ListItemIcon>
                            <PersonIcon fontSize="small" color="warning" />
                        </ListItemIcon>
                        <ListItemText>Assign Driver</ListItemText>
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                        onClick={() => selectedRow && handleDelete(selectedRow)}
                        sx={{ borderRadius: '10px', mx: 0.5, my: 0.2, color: 'error.main' }}
                    >
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText>Hapus</ListItemText>
                    </MenuItem>
                </Menu>

                {/* ─── DIALOG DETAIL ─── */}
                <Dialog
                    open={detailDialogOpen}
                    onClose={() => setDetailDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: '20px' } }}
                >
                    <DialogTitle sx={{ pb: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight={700}>Detail Pengiriman</Typography>
                            <IconButton onClick={() => setDetailDialogOpen(false)} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ pt: 3 }}>
                        {selectedDetail && (
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">ID Transaksi</Typography>
                                    <Typography fontWeight={700}>{selectedDetail.id}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">Nama Pelanggan</Typography>
                                    <Typography fontWeight={600}>{selectedDetail.customerName}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">No Telepon</Typography>
                                    <Typography>{selectedDetail.customerPhone}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">Barang</Typography>
                                    <Typography>{selectedDetail.barang} x{selectedDetail.qty}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">Alamat</Typography>
                                    <Typography sx={{ maxWidth: 200, textAlign: 'right' }}>{selectedDetail.address}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">Status</Typography>
                                    <Chip
                                        label={formatStatus(selectedDetail.status).label}
                                        size="small"
                                        sx={{
                                            bgcolor: formatStatus(selectedDetail.status).bg,
                                            color: formatStatus(selectedDetail.status).color,
                                            fontWeight: 700,
                                        }}
                                    />
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">Driver</Typography>
                                    <Typography>{selectedDetail.driver}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">Tanggal</Typography>
                                    <Typography>{selectedDetail.date}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="caption" color="text.secondary">Total</Typography>
                                    <Typography fontWeight={800} color="primary.main">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedDetail.total || 0)}
                                    </Typography>
                                </Stack>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3 }}>
                        <Button onClick={() => setDetailDialogOpen(false)} variant="outlined" sx={{ borderRadius: '12px', fontWeight: 600 }}>
                            Tutup
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ─── DIALOG EDIT STATUS ─── */}
                <Dialog
                    open={editStatusDialogOpen}
                    onClose={() => setEditStatusDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: '20px' } }}
                >
                    <DialogTitle sx={{ pb: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight={700}>Edit Status Pengiriman</Typography>
                            <IconButton onClick={() => setEditStatusDialogOpen(false)} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ pt: 3 }}>
                        <FormControl fullWidth>
                            <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 1 }}>
                                Pilih Status
                            </Typography>
                            <Select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                sx={{ borderRadius: '12px' }}
                            >
                                {statusOptions.filter(opt => opt.value !== 'all').map(opt => (
                                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                        <Button onClick={() => setEditStatusDialogOpen(false)} sx={{ borderRadius: '12px', color: 'text.secondary', fontWeight: 600 }}>
                            Batal
                        </Button>
                        <Button onClick={handleSaveEditStatus} variant="contained" sx={{ borderRadius: '12px', fontWeight: 700, textTransform: 'none' }}>
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ─── DIALOG ASSIGN DRIVER ─── */}
                <Dialog
                    open={assignDriverDialogOpen}
                    onClose={() => setAssignDriverDialogOpen(false)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: '20px' } }}
                >
                    <DialogTitle sx={{ pb: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight={700}>Assign Driver</Typography>
                            <IconButton onClick={() => setAssignDriverDialogOpen(false)} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ pt: 3 }}>
                        <TextField
                            label="Nama Driver"
                            value={newDriver}
                            onChange={(e) => setNewDriver(e.target.value)}
                            fullWidth
                            placeholder="Masukkan nama driver"
                            InputProps={{
                                startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment>,
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                        <Button onClick={() => setAssignDriverDialogOpen(false)} sx={{ borderRadius: '12px', color: 'text.secondary', fontWeight: 600 }}>
                            Batal
                        </Button>
                        <Button onClick={handleSaveAssignDriver} variant="contained" sx={{ borderRadius: '12px', fontWeight: 700, textTransform: 'none' }}>
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ─── DIALOG KONFIRMASI HAPUS ─── */}
                <Dialog
                    open={deleteConfirmOpen}
                    onClose={() => setDeleteConfirmOpen(false)}
                    PaperProps={{ sx: { borderRadius: '20px' } }}
                >
                    <DialogTitle sx={{ pb: 1 }}>
                        <Typography variant="h6" fontWeight={700}>Hapus Pengiriman</Typography>
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        <DialogContentText>
                            Apakah Anda yakin ingin menghapus data pengiriman ini?<br />
                            <strong>ID: {selectedDelete?.id}</strong><br />
                            Pelanggan: {selectedDelete?.customerName}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                        <Button onClick={() => setDeleteConfirmOpen(false)} sx={{ borderRadius: '12px', color: 'text.secondary', fontWeight: 600 }}>
                            Batal
                        </Button>
                        <Button onClick={confirmDelete} variant="contained" color="error" sx={{ borderRadius: '12px', fontWeight: 700, textTransform: 'none' }}>
                            Hapus
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* ─── DIALOG EDIT ARMADA ─── */}
                <Dialog
                    open={editDialogOpen}
                    onClose={handleCloseEditDialog}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{ sx: { borderRadius: '20px' } }}
                >
                    <DialogTitle sx={{ pb: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" fontWeight={700}>Edit Armada</Typography>
                            <IconButton onClick={handleCloseEditDialog} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                            {editingArmada?.vehicle} - {editingArmada?.plate}
                        </Typography>
                    </DialogTitle>
                    <Divider />
                    <DialogContent sx={{ pt: 3 }}>
                        <Stack spacing={3}>
                            <TextField
                                label="Nama Sopir"
                                value={editDriver}
                                onChange={(e) => setEditDriver(e.target.value)}
                                fullWidth
                                placeholder="Masukkan nama sopir"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start"><PersonIcon color="action" /></InputAdornment>,
                                }}
                            />
                            <FormControl fullWidth>
                                <Typography variant="caption" fontWeight={600} color="text.secondary" sx={{ mb: 0.5 }}>
                                    Status Armada
                                </Typography>
                                <Select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                    displayEmpty
                                    sx={{ borderRadius: '12px' }}
                                >
                                    {armadaStatusOptions.map((opt) => (
                                        <MenuItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
                        <Button onClick={handleCloseEditDialog} sx={{ borderRadius: '12px', color: 'text.secondary', fontWeight: 600 }}>
                            Batal
                        </Button>
                        <Button onClick={handleSaveEdit} variant="contained" sx={{ borderRadius: '12px', fontWeight: 700, textTransform: 'none', px: 4 }}>
                            Simpan
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Box>
    );
}