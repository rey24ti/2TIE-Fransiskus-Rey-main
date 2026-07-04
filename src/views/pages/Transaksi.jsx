import React, { useState, useEffect, useMemo } from 'react';
import {
    Grid, Card, CardContent, TextField, Button,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Typography, MenuItem, Box, Divider,
    Chip, IconButton, InputAdornment, Snackbar, Alert,
    Avatar, useTheme, alpha, Fade, Grow, Zoom, Tooltip,
    Container, Stack, Pagination, Popover, List, ListItem, ListItemText
} from '@mui/material';
import {
    ShoppingCart, AddShoppingCart,
    TrendingUp, Receipt, AttachMoney,
    Remove, Add, CheckCircle, Storefront, AccessTime,
    Numbers, ClearAll, Search, Print, FilterList,
    Refresh
} from '@mui/icons-material';

// ======================== STYLE COMPONENTS ========================
const GlassCard = ({ children, ...props }) => (
    <Card
        elevation={0}
        sx={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '28px',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
                boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
                transform: 'translateY(-2px)'
            },
            ...props.sx
        }}
        {...props}
    >
        {children}
    </Card>
);

const ModernButton = ({ children, ...props }) => (
    <Button
        variant="contained"
        disableElevation
        sx={{
            borderRadius: '16px',
            textTransform: 'none',
            fontWeight: 700,
            py: 1.4,
            fontSize: '0.95rem',
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            transition: 'all 0.2s ease',
            '&:hover': {
                transform: 'scale(1.02)',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
            },
            ...props.sx
        }}
        {...props}
    >
        {children}
    </Button>
);

const StyledTableCell = ({ children, align = 'left', ...props }) => (
    <TableCell
        align={align}
        sx={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            py: 1.8,
            fontSize: '0.85rem',
            fontWeight: 500,
            ...props.sx
        }}
    >
        {children}
    </TableCell>
);

const StyledTableHeadCell = ({ children, align = 'left' }) => (
    <StyledTableCell
        align={align}
        sx={{
            fontWeight: 700,
            color: '#1e293b',
            background: '#f8fafc',
            fontSize: '0.8rem',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
        }}
    >
        {children}
    </StyledTableCell>
);

const Transaksi = () => {
    const theme = useTheme();
    
    // ======================== STATE MANAGEMENT ========================
    const [barang, setBarang] = useState(() => {
        const saved = localStorage.getItem('data_toko');
        return saved ? JSON.parse(saved) : [
            { id: 1, nama: 'Semen Padang', stok: 100, harga: 65000 },
            { id: 2, nama: 'Cat Dulux', stok: 20, harga: 150000 },
            { id: 3, nama: 'Besi Beton 10mm', stok: 50, harga: 85000 },
            { id: 4, nama: 'Pipa PVC 1/2"', stok: 200, harga: 25000 }
        ];
    });

    const [riwayat, setRiwayat] = useState(() => {
        const savedRiwayat = localStorage.getItem('riwayat_toko');
        return savedRiwayat ? JSON.parse(savedRiwayat) : [];
    });

    const [pilihanBarang, setPilihanBarang] = useState('');
    const [jumlah, setJumlah] = useState(1);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    
    // State untuk fitur tambahan
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDate, setFilterDate] = useState('today'); // 'today', 'week', 'month', 'all'
    const [anchorEl, setAnchorEl] = useState(null);
    
    // ======================== HELPER FUNCTIONS ========================
    const detailBarangTerpilih = barang.find(b => b.nama === pilihanBarang);
    const totalBayarRealtime = detailBarangTerpilih ? detailBarangTerpilih.harga * (parseInt(jumlah) || 0) : 0;
    
    // Filter riwayat berdasarkan search dan date
    const filteredRiwayat = useMemo(() => {
        let filtered = [...riwayat];
        
        if (searchQuery) {
            filtered = filtered.filter(r => r.nama.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (filterDate === 'today') {
            filtered = filtered.filter(r => {
                const tglTransaksi = new Date(r.tanggalLengkap);
                return tglTransaksi >= today;
            });
        } else if (filterDate === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(r => new Date(r.tanggalLengkap) >= weekAgo);
        } else if (filterDate === 'month') {
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            filtered = filtered.filter(r => new Date(r.tanggalLengkap) >= monthAgo);
        }
        
        return filtered;
    }, [riwayat, searchQuery, filterDate]);
    
    const totalPenjualan = filteredRiwayat.reduce((sum, r) => sum + r.total, 0);
    const totalItemTerjual = filteredRiwayat.reduce((sum, r) => sum + r.qty, 0);
    const totalTransaksi = filteredRiwayat.length;
    
    const totalPages = Math.ceil(filteredRiwayat.length / rowsPerPage);
    const paginatedRiwayat = filteredRiwayat.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filterDate]);
    
    // ======================== MAIN FUNCTIONS ========================
    const handleSimpan = () => {
        const qtyBeli = parseInt(jumlah);
        if (!pilihanBarang) {
            setSnackbar({ open: true, message: 'Silakan pilih barang terlebih dahulu!', severity: 'warning' });
            return;
        }
        if (!qtyBeli || qtyBeli <= 0) {
            setSnackbar({ open: true, message: 'Jumlah beli harus minimal 1!', severity: 'warning' });
            return;
        }
        if (detailBarangTerpilih && detailBarangTerpilih.stok >= qtyBeli) {
            const dataBaru = barang.map(b => 
                b.nama === pilihanBarang ? { ...b, stok: b.stok - qtyBeli } : b
            );
            setBarang(dataBaru);
            localStorage.setItem('data_toko', JSON.stringify(dataBaru));
            
            const newTransaction = { 
                id: Date.now(),
                nama: pilihanBarang, 
                qty: qtyBeli, 
                hargaSatuan: detailBarangTerpilih.harga,
                total: totalBayarRealtime, 
                tgl: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                tanggalLengkap: new Date().toLocaleDateString('id-ID')
            };
            const riwayatBaru = [newTransaction, ...riwayat];
            setRiwayat(riwayatBaru);
            localStorage.setItem('riwayat_toko', JSON.stringify(riwayatBaru));
            
            setSnackbar({ open: true, message: 'Transaksi berhasil! ✨', severity: 'success' });
            setPilihanBarang('');
            setJumlah(1);
            setCurrentPage(1);
        } else {
            setSnackbar({ 
                open: true, 
                message: `Stok tidak cukup! Tersisa: ${detailBarangTerpilih?.stok || 0} unit`, 
                severity: 'error' 
            });
        }
    };
    
    const handleClearRiwayat = () => {
        if (window.confirm('⚠️ Yakin ingin menghapus SEMUA riwayat transaksi? Tindakan ini tidak dapat dibatalkan.')) {
            setRiwayat([]);
            localStorage.removeItem('riwayat_toko');
            setSnackbar({ open: true, message: 'Riwayat transaksi berhasil dihapus', severity: 'info' });
        }
    };
    
    const handleJumlahChange = (e) => {
        const value = e.target.value;
        if (value === '' || value === 0) setJumlah(1);
        else if (value > 0) setJumlah(parseInt(value));
    };
    
    const incrementJumlah = () => setJumlah(prev => prev + 1);
    const decrementJumlah = () => setJumlah(prev => (prev > 1 ? prev - 1 : 1));
    
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);
    };
    
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
            <head><title>Struk Transaksi</title></head>
            <body>
                <h2>Struk Pembelian</h2>
                <p>Tanggal: ${new Date().toLocaleString()}</p>
                <table border="1" cellpadding="5">
                    <tr><th>Jam</th><th>Nama Barang</th><th>Qty</th><th>Harga</th><th>Total</th></tr>
                    ${paginatedRiwayat.map(r => `
                        <tr>
                            <td>${r.tgl}</td>
                            <td>${r.nama}</td>
                            <td>${r.qty}</td>
                            <td>${formatRupiah(r.hargaSatuan)}</td>
                            <td>${formatRupiah(r.total)}</td>
                        </tr>
                    `).join('')}
                </table>
                <h3>Total: ${formatRupiah(totalPenjualan)}</h3>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
    
    const handleResetForm = () => {
        setPilihanBarang('');
        setJumlah(1);
    };
    
    const handleFilterClick = (event) => setAnchorEl(event.currentTarget);
    const handleFilterClose = () => setAnchorEl(null);
    
    // ======================== RENDER ========================
    return (
        <Box sx={{ minHeight: '100vh', background: 'linear-gradient(145deg, #f1f5f9 0%, #e2e8f0 100%)', py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
            <Container maxWidth="xl">
                {/* STATISTICS CARDS */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Zoom in timeout={500}>
                            <GlassCard sx={{ p: 2 }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" fontWeight={600}>TOTAL PENJUALAN</Typography>
                                        <Typography variant="h5" fontWeight={800} color="primary.main" sx={{ mt: 0.5 }}>{formatRupiah(totalPenjualan)}</Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main' }}><AttachMoney /></Avatar>
                                </Box>
                            </GlassCard>
                        </Zoom>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Zoom in timeout={550}>
                            <GlassCard sx={{ p: 2 }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" fontWeight={600}>ITEM TERJUAL</Typography>
                                        <Typography variant="h5" fontWeight={800} color="info.main" sx={{ mt: 0.5 }}>{totalItemTerjual}</Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1), color: 'info.main' }}><Numbers /></Avatar>
                                </Box>
                            </GlassCard>
                        </Zoom>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Zoom in timeout={600}>
                            <GlassCard sx={{ p: 2 }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" fontWeight={600}>TRANSAKSI</Typography>
                                        <Typography variant="h5" fontWeight={800} color="success.main" sx={{ mt: 0.5 }}>{totalTransaksi}</Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main' }}><Receipt /></Avatar>
                                </Box>
                            </GlassCard>
                        </Zoom>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Zoom in timeout={650}>
                            <GlassCard sx={{ p: 2 }}>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" fontWeight={600}>RATA-RATA TRANSAKSI</Typography>
                                        <Typography variant="h5" fontWeight={800} color="warning.main" sx={{ mt: 0.5 }}>{totalTransaksi > 0 ? formatRupiah(totalPenjualan / totalTransaksi) : 'Rp 0'}</Typography>
                                    </Box>
                                    <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main' }}><TrendingUp /></Avatar>
                                </Box>
                            </GlassCard>
                        </Zoom>
                    </Grid>
                </Grid>
                
                {/* MAIN CONTENT */}
                <Grid container spacing={4}>
                    {/* FORM KASIR */}
                    <Grid item xs={12} md={5} lg={4}>
                        <Fade in timeout={800}>
                            <GlassCard>
                                <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <ShoppingCart color="primary" />
                                        <Typography variant="h6" fontWeight={700}>Form Penjualan</Typography>
                                    </Box>
                                    <Tooltip title="Reset Form">
                                        <IconButton onClick={handleResetForm} size="small"><Refresh fontSize="small" /></IconButton>
                                    </Tooltip>
                                </Box>
                                <CardContent sx={{ p: 3 }}>
                                    <Stack spacing={3}>
                                        <TextField select fullWidth label="Pilih Barang" value={pilihanBarang} onChange={(e) => setPilihanBarang(e.target.value)} variant="outlined" InputProps={{ sx: { borderRadius: '14px' } }}>
                                            {barang.map((b) => (
                                                <MenuItem key={b.id} value={b.nama} disabled={b.stok === 0}>
                                                    <Box display="flex" justifyContent="space-between" width="100%">
                                                        <Typography>{b.nama}</Typography>
                                                        <Chip label={`Stok: ${b.stok}`} size="small" color={b.stok < 10 ? 'error' : 'primary'} variant="outlined" sx={{ ml: 2 }} />
                                                    </Box>
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        
                                        <Box>
                                            <Typography variant="body2" fontWeight={600} mb={1}>Jumlah Beli</Typography>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <IconButton onClick={decrementJumlah} sx={{ bgcolor: 'action.hover', borderRadius: '12px' }}><Remove /></IconButton>
                                                <TextField type="number" value={jumlah} onChange={handleJumlahChange} InputProps={{ sx: { textAlign: 'center', borderRadius: '14px', width: 100 } }} inputProps={{ min: 1, style: { textAlign: 'center' } }} />
                                                <IconButton onClick={incrementJumlah} sx={{ bgcolor: 'action.hover', borderRadius: '12px' }}><Add /></IconButton>
                                            </Box>
                                        </Box>
                                        
                                        {pilihanBarang && (
                                            <Grow in timeout={300}>
                                                <Box sx={{ bgcolor: alpha(theme.palette.primary.main, 0.04), p: 2.5, borderRadius: '20px', border: '1px solid', borderColor: alpha(theme.palette.primary.main, 0.1) }}>
                                                    <Stack spacing={1.5}>
                                                        <Box display="flex" justifyContent="space-between">
                                                            <Typography variant="body2" color="text.secondary">Harga Satuan</Typography>
                                                            <Typography variant="body2" fontWeight={600}>{formatRupiah(detailBarangTerpilih?.harga)}</Typography>
                                                        </Box>
                                                        <Box display="flex" justifyContent="space-between">
                                                            <Typography variant="body2" color="text.secondary">Jumlah</Typography>
                                                            <Typography variant="body2" fontWeight={600}>{jumlah} unit</Typography>
                                                        </Box>
                                                        <Divider />
                                                        <Box display="flex" justifyContent="space-between">
                                                            <Typography variant="subtitle1" fontWeight={700}>Total Bayar</Typography>
                                                            <Typography variant="h6" fontWeight={800} color="primary.main">{formatRupiah(totalBayarRealtime)}</Typography>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </Grow>
                                        )}
                                        
                                        <ModernButton fullWidth onClick={handleSimpan} startIcon={<AddShoppingCart />}>Proses Transaksi</ModernButton>
                                    </Stack>
                                </CardContent>
                            </GlassCard>
                        </Fade>
                    </Grid>
                    
                    {/* RIWAYAT TRANSAKSI */}
                    <Grid item xs={12} md={7} lg={8}>
                        <Fade in timeout={900}>
                            <GlassCard>
                                <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Receipt color="info" />
                                        <Typography variant="h6" fontWeight={700}>Riwayat Transaksi</Typography>
                                        {filterDate !== 'all' && <Chip label="Filter Aktif" size="small" color="primary" sx={{ ml: 1 }} />}
                                    </Box>
                                    <Box display="flex" gap={1}>
                                        <TextField size="small" placeholder="Cari barang..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>, sx: { borderRadius: '30px', bgcolor: 'background.paper', width: 180 } }} />
                                        <Tooltip title="Filter Tanggal">
                                            <IconButton onClick={handleFilterClick}><FilterList /></IconButton>
                                        </Tooltip>
                                        <Tooltip title="Cetak Struk">
                                            <IconButton onClick={handlePrint} disabled={filteredRiwayat.length === 0}><Print /></IconButton>
                                        </Tooltip>
                                        {riwayat.length > 0 && (
                                            <Tooltip title="Hapus Semua Riwayat">
                                                <IconButton color="error" onClick={handleClearRiwayat}><ClearAll /></IconButton>
                                            </Tooltip>
                                        )}
                                    </Box>
                                </Box>
                                
                                <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleFilterClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                    <List sx={{ p: 1 }}>
                                        <ListItem button onClick={() => { setFilterDate('today'); handleFilterClose(); }}><ListItemText primary="Hari Ini" /></ListItem>
                                        <ListItem button onClick={() => { setFilterDate('week'); handleFilterClose(); }}><ListItemText primary="7 Hari Terakhir" /></ListItem>
                                        <ListItem button onClick={() => { setFilterDate('month'); handleFilterClose(); }}><ListItemText primary="30 Hari Terakhir" /></ListItem>
                                        <ListItem button onClick={() => { setFilterDate('all'); handleFilterClose(); }}><ListItemText primary="Semua" /></ListItem>
                                    </List>
                                </Popover>
                                
                                <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableHeadCell>Jam</StyledTableHeadCell>
                                                <StyledTableHeadCell>Nama Barang</StyledTableHeadCell>
                                                <StyledTableHeadCell align="right">Harga</StyledTableHeadCell>
                                                <StyledTableHeadCell align="center">Qty</StyledTableHeadCell>
                                                <StyledTableHeadCell align="right">Total</StyledTableHeadCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paginatedRiwayat.length === 0 ? (
                                                <TableRow><TableCell colSpan={5} align="center" sx={{ py: 8 }}><Box display="flex" flexDirection="column" alignItems="center" gap={1}><ShoppingCart sx={{ fontSize: 48, color: 'action.disabled', opacity: 0.5 }} /><Typography color="text.secondary" variant="body2">Tidak ada transaksi yang sesuai</Typography></Box></TableCell></TableRow>
                                            ) : (
                                                paginatedRiwayat.map((r, idx) => (
                                                    <TableRow key={r.id || idx} sx={{ transition: 'all 0.2s', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                                                        <TableCell><Box display="flex" alignItems="center" gap={0.5}><AccessTime fontSize="small" sx={{ fontSize: 12, color: 'text.secondary' }} /><Typography variant="body2">{r.tgl}</Typography></Box></TableCell>
                                                        <TableCell><Typography variant="body2" fontWeight={500}>{r.nama}</Typography></TableCell>
                                                        <TableCell align="right">{formatRupiah(r.hargaSatuan)}</TableCell>
                                                        <TableCell align="center"><Chip label={r.qty} size="small" variant="outlined" sx={{ minWidth: 45 }} /></TableCell>
                                                        <TableCell align="right"><Typography variant="body2" fontWeight={700} color="success.main">{formatRupiah(r.total)}</Typography></TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                
                                {totalPages > 1 && (
                                    <Box display="flex" justifyContent="center" py={2}>
                                        <Pagination count={totalPages} page={currentPage} onChange={(e, page) => setCurrentPage(page)} color="primary" shape="rounded" />
                                    </Box>
                                )}
                                
                                {filteredRiwayat.length > 0 && (
                                    <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'flex-end', bgcolor: 'action.hover', borderBottomLeftRadius: 28, borderBottomRightRadius: 28 }}>
                                        <Typography variant="subtitle1" fontWeight={700}>Grand Total: {formatRupiah(totalPenjualan)}</Typography>
                                    </Box>
                                )}
                            </GlassCard>
                        </Fade>
                    </Grid>
                </Grid>
                
                <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={Grow}>
                    <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity} variant="filled" sx={{ borderRadius: '14px', alignItems: 'center' }} iconMapping={{ success: <CheckCircle fontSize="inherit" /> }}>{snackbar.message}</Alert>
                </Snackbar>
            </Container>
        </Box>
    );
};

export default Transaksi;