import React, { useState, useMemo } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// Icons
import {
    TrendingUp, AttachMoney, Inventory, Receipt, Download, Refresh
} from '@mui/icons-material';

// ApexCharts
import Chart from 'react-apexcharts';

const formatRupiah = (angka) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
    }).format(angka);
};

const filterTransactionsByDate = (transactions, filterType) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (filterType) {
        case 'today':
            return transactions.filter(t => new Date(t.tanggalLengkap) >= today);
        case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return transactions.filter(t => new Date(t.tanggalLengkap) >= weekAgo);
        case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return transactions.filter(t => new Date(t.tanggalLengkap) >= monthAgo);
        default:
            return transactions;
    }
};

export default function LaporanKeuangan() {
    const theme = useTheme();

    const [riwayat] = useState(() => {
        const savedRiwayat = localStorage.getItem('riwayat_toko');
        if (!savedRiwayat) return [];
        try {
            const parsed = JSON.parse(savedRiwayat);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error('Failed to parse localStorage riwayat_toko:', e);
            return [];
        }
    });

    const [filterType, setFilterType] = useState('week');
    const [profitMarginPercent, setProfitMarginPercent] = useState(25);

    const filteredData = useMemo(() => {
        return filterTransactionsByDate(riwayat, filterType);
    }, [riwayat, filterType]);

    const stats = useMemo(() => {
        let totalPendapatan = 0;
        let totalProdukTerjual = 0;
        const productSales = {};

        filteredData.forEach(item => {
            totalPendapatan += item.total || 0;
            totalProdukTerjual += item.qty || 0;
            productSales[item.nama] = (productSales[item.nama] || 0) + item.total;
        });

        const totalKeuntungan = totalPendapatan * (profitMarginPercent / 100);
        const rataTransaksi = filteredData.length > 0 ? totalPendapatan / filteredData.length : 0;

        const topProducts = Object.entries(productSales)
            .map(([nama, omset]) => ({ nama, omset }))
            .sort((a, b) => b.omset - a.omset)
            .slice(0, 5);

        return {
            totalPendapatan,
            totalProdukTerjual,
            totalKeuntungan,
            rataTransaksi,
            jumlahTransaksi: filteredData.length,
            topProducts,
            productSales
        };
    }, [filteredData, profitMarginPercent]);

    // Bar chart
    const barChartConfig = useMemo(() => {
        const dailyMap = new Map();
        filteredData.forEach(item => {
            const date = item.tanggalLengkap;
            dailyMap.set(date, (dailyMap.get(date) || 0) + item.total);
        });
        const sortedDates = Array.from(dailyMap.keys()).sort((a, b) => new Date(a) - new Date(b));
        const salesData = sortedDates.map(d => dailyMap.get(d));
        return {
            series: [{ name: 'Pendapatan', data: salesData }],
            options: {
                chart: { type: 'bar', height: 350, toolbar: { show: false }, background: 'transparent' },
                plotOptions: { bar: { borderRadius: 8, columnWidth: '55%' } },
                dataLabels: { enabled: false },
                colors: [theme.palette.primary.main],
                xaxis: { categories: sortedDates, labels: { style: { colors: theme.palette.text.secondary } } },
                yaxis: { labels: { formatter: (val) => formatRupiah(val) } },
                tooltip: { y: { formatter: (val) => formatRupiah(val) } }
            }
        };
    }, [filteredData, theme]);

    // Line chart
    const lineChartConfig = useMemo(() => {
        const dailyProfit = new Map();
        filteredData.forEach(item => {
            const date = item.tanggalLengkap;
            const profit = item.total * (profitMarginPercent / 100);
            dailyProfit.set(date, (dailyProfit.get(date) || 0) + profit);
        });
        const sortedDates = Array.from(dailyProfit.keys()).sort((a, b) => new Date(a) - new Date(b));
        const profitData = sortedDates.map(d => dailyProfit.get(d));
        return {
            series: [{ name: 'Keuntungan', data: profitData }],
            options: {
                chart: { type: 'line', height: 350, toolbar: { show: false }, background: 'transparent' },
                stroke: { curve: 'smooth', width: 3 },
                colors: [theme.palette.success.main],
                xaxis: { categories: sortedDates },
                yaxis: { labels: { formatter: (val) => formatRupiah(val) } },
                tooltip: { y: { formatter: (val) => formatRupiah(val) } }
            }
        };
    }, [filteredData, profitMarginPercent, theme]);

    // Pie chart
    const pieChartConfig = useMemo(() => {
        const labels = Object.keys(stats.productSales);
        const series = Object.values(stats.productSales);
        return {
            series: series,
            options: {
                chart: { type: 'donut', height: 350, toolbar: { show: false } },
                labels: labels,
                legend: { position: 'bottom' },
                dataLabels: { enabled: true, formatter: (val) => `${val.toFixed(1)}%` },
                colors: [theme.palette.primary.light, theme.palette.secondary.light, theme.palette.success.light, theme.palette.warning.light],
                tooltip: { y: { formatter: (val) => formatRupiah(val) } }
            }
        };
    }, [stats, theme]);

    const handleFilterChange = (event, newFilter) => {
        if (newFilter !== null) setFilterType(newFilter);
    };

    const handleExport = () => {
        const headers = ['Tanggal', 'Waktu', 'Nama Barang', 'Jumlah', 'Harga Satuan', 'Total'];
        const rows = filteredData.map(item => [
            item.tanggalLengkap, item.tgl, item.nama, item.qty, formatRupiah(item.hargaSatuan), formatRupiah(item.total)
        ]);
        const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `laporan_keuangan_${new Date().toISOString().slice(0, 19)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleRefresh = () => window.location.reload();

    return (
        <Box sx={{ p: { xs: 1, md: 3 }, bgcolor: 'background.default', minHeight: '100vh' }}>
            {/* Header hanya tombol di kanan */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Export CSV"><IconButton onClick={handleExport}><Download /></IconButton></Tooltip>
                    <Tooltip title="Refresh Data"><IconButton onClick={handleRefresh}><Refresh /></IconButton></Tooltip>
                </Stack>
            </Box>

            {/* Filter Bar dengan tombol rapat */}
            <Card sx={{ mb: 3, borderRadius: 4, p: 2 }} elevation={0} variant="outlined">
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
                    <ToggleButtonGroup
                        value={filterType}
                        exclusive
                        onChange={handleFilterChange}
                        size="small"
                        sx={{
                            '& .MuiToggleButton-root': {
                                px: 1.5,
                                py: 0.75,
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                minWidth: 'auto',
                                mx: 0,
                                borderColor: 'divider',
                                '&:first-of-type': {
                                    borderTopLeftRadius: 20,
                                    borderBottomLeftRadius: 20,
                                },
                                '&:last-of-type': {
                                    borderTopRightRadius: 20,
                                    borderBottomRightRadius: 20,
                                },
                            },
                            gap: 0,
                        }}
                    >
                        <ToggleButton value="today">Hari Ini</ToggleButton>
                        <ToggleButton value="week">Minggu Ini</ToggleButton>
                        <ToggleButton value="month">Bulan Ini</ToggleButton>
                        <ToggleButton value="all">Semua</ToggleButton>
                    </ToggleButtonGroup>

                    <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">Margin Keuntungan:</Typography>
                        <TextField
                            size="small"
                            type="number"
                            value={profitMarginPercent}
                            onChange={(e) => setProfitMarginPercent(Number(e.target.value))}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                sx: { width: 80 }
                            }}
                        />
                    </Box>
                </Box>
            </Card>

            {/* Kartu Statistik */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 4, bgcolor: alpha(theme.palette.primary.main, 0.05), borderLeft: `4px solid ${theme.palette.primary.main}` }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>TOTAL PENDAPATAN</Typography>
                                    <Typography variant="h5" fontWeight={800} color="primary.main">{formatRupiah(stats.totalPendapatan)}</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}><AttachMoney /></Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 4, bgcolor: alpha(theme.palette.success.main, 0.05), borderLeft: `4px solid ${theme.palette.success.main}` }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>ESTIMASI KEUNTUNGAN</Typography>
                                    <Typography variant="h5" fontWeight={800} color="success.main">{formatRupiah(stats.totalKeuntungan)}</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1) }}><TrendingUp /></Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 4, bgcolor: alpha(theme.palette.info.main, 0.05), borderLeft: `4px solid ${theme.palette.info.main}` }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>PRODUK TERJUAL</Typography>
                                    <Typography variant="h5" fontWeight={800}>{stats.totalProdukTerjual} <Typography component="span" variant="body2" color="text.secondary">pcs</Typography></Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.1) }}><Inventory /></Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ borderRadius: 4, bgcolor: alpha(theme.palette.warning.main, 0.05), borderLeft: `4px solid ${theme.palette.warning.main}` }}>
                        <CardContent>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <Typography variant="caption" color="text.secondary" fontWeight={600}>RATA-RATA TRANSAKSI</Typography>
                                    <Typography variant="h5" fontWeight={800} color="warning.main">{formatRupiah(stats.rataTransaksi)}</Typography>
                                </Box>
                                <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.1) }}><Receipt /></Avatar>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Grafik */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} mb={2}>📊 Pendapatan per Hari</Typography>
                            <Chart options={barChartConfig.options} series={barChartConfig.series} type="bar" height={320} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} mb={2}>📈 Tren Keuntungan</Typography>
                            <Chart options={lineChartConfig.options} series={lineChartConfig.series} type="line" height={320} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={5}>
                    <Card variant="outlined" sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} mb={2}>🥧 Distribusi Penjualan</Typography>
                            <Chart options={pieChartConfig.options} series={pieChartConfig.series} type="donut" height={350} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Card variant="outlined" sx={{ borderRadius: 4 }}>
                        <CardContent>
                            <Typography variant="h6" fontWeight={700} mb={2}>🏆 Produk Terlaris</Typography>
                            <Stack spacing={1}>
                                {stats.topProducts.length === 0 ? (
                                    <Typography align="center" color="text.secondary">Belum ada data penjualan</Typography>
                                ) : (
                                    stats.topProducts.map((p, i) => (
                                        <Box key={i} display="flex" justifyContent="space-between" alignItems="center" p={1.5} bgcolor="action.hover" borderRadius={2}>
                                            <Typography fontWeight={500}>#{i + 1} {p.nama}</Typography>
                                            <Typography fontWeight={700} color="primary.main">{formatRupiah(p.omset)}</Typography>
                                        </Box>
                                    ))
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Tabel Rincian Transaksi */}
            <Card sx={{ mt: 4, borderRadius: 4 }} variant="outlined">
                <Box p={3} borderBottom={1} borderColor="divider">
                    <Typography variant="h6" fontWeight={700}>Rincian Transaksi</Typography>
                </Box>
                <TableContainer component={Paper} elevation={0}>
                    <Table>
                        <TableHead sx={{ bgcolor: 'grey.50' }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Tanggal</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Waktu</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Produk</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 700 }}>Qty</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Harga Satuan</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 700 }}>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                        <Typography color="text.secondary">Tidak ada transaksi dalam periode ini</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((item, idx) => (
                                    <TableRow key={idx} hover>
                                        <TableCell>{item.tanggalLengkap}</TableCell>
                                        <TableCell>{item.tgl}</TableCell>
                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell align="center">{item.qty}</TableCell>
                                        <TableCell align="right">{formatRupiah(item.hargaSatuan)}</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 600, color: 'success.main' }}>{formatRupiah(item.total)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Box>
    );
}