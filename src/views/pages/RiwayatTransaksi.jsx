import React, { useState } from 'react';
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
  Tooltip   
} from '@mui/material';

// Import Ikon Pendukung Eksklusif
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const dataTransaksiDummy = [
  { id: "TRX-00123", tanggal: "2026-06-10", pelanggan: "Pak Budi (Kontraktor)", total: 4500000, metode: "Transfer", status: "Selesai" },
  { id: "TRX-00122", tanggal: "2026-06-10", pelanggan: "Umum", total: 185000, metode: "Tunai", status: "Selesai" },
  { id: "TRX-00121", tanggal: "2026-06-09", pelanggan: "Toko Jaya Abadi", total: 12000000, metode: "Bon/Kredit", status: "Pending" },
  { id: "TRX-00120", tanggal: "2026-06-09", pelanggan: "Mas Agus", total: 750000, metode: "Tunai", status: "Selesai" },
];

export default function RiwayatTransaksi() {
  const [search, setSearch] = useState("");
  const [metode, setMetode] = useState("");

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Header Halaman */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.5px', mb: 0.5 }}>
          Riwayat Transaksi
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', fontSize: '0.95rem' }}>
          Pantau, filter, dan kelola semua cetakan rekaman penjualan toko bangunan secara real-time.
        </Typography>
      </Box>

      {/* Ringkasan Singkat (Cards Widget Premium Layout) */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: "Total Transaksi Hari Ini", value: "12 Transaksi", info: "Peningkatan 4% dari kemarin", color: "linear-gradient(135deg, #e0e7ff 0%, #eef2ff 100%)", textColor: "#4338ca" },
          { title: "Omset Hari Ini", value: "Rp 17.435.000", info: "Target harian 85% tercapai", color: "linear-gradient(135deg, #dcfce7 0%, #f0fdf4 100%)", textColor: "#15803d" },
          { title: "Menunggu Pembayaran (Bon)", value: "Rp 12.000.000", info: "3 Nota belum jatuh tempo", color: "linear-gradient(135deg, #fef3c7 0%, #fff9db 100%)", textColor: "#b45309" }
        ].map((card, idx) => (
          <Grid item xs={12} sm={4} key={idx}>
            <Card sx={{ 
              background: card.color, 
              borderRadius: '20px', 
              p: 3, 
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.02)',
              border: '1px solid rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px', fontSize: '0.75rem' }}>
                {card.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mt: 1.5, mb: 1, color: card.textColor, letterSpacing: '-1px' }}>
                {card.value}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748b', display: 'block', fontSize: '0.8rem' }}>
                {card.info}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filter & Pencarian Panel */}
      <Card sx={{ p: 2.5, mb: 4, borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)', border: '1px solid #f1f5f9' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              size="small"
              placeholder="Cari nomor ID nota atau nama pelanggan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#f8fafc' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              size="small"
              type="date"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayOutlinedIcon sx={{ color: '#94a3b8', fontSize: '1.2rem' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#f8fafc' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              select
              size="small"
              value={metode}
              onChange={(e) => setMetode(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon sx={{ color: '#94a3b8' }} />
                  </InputAdornment>
                ),
              }}
              displayEmpty
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#f8fafc' } }}
            >
              <MenuItem value="">Semua Metode Pembayaran</MenuItem>
              <MenuItem value="Tunai">💰 Tunai</MenuItem>
              <MenuItem value="Transfer">💳 Transfer Bank</MenuItem>
              <MenuItem value="Bon">📝 Bon / Kredit</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Card>

      {/* Tabel Riwayat Transaksi Ringan & Modern */}
      <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#475569', py: 2 }}>ID Transaksi</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', py: 2 }}>Tanggal</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', py: 2 }}>Pelanggan</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', py: 2 }}>Metode</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', py: 2 }}>Total Belanja</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', py: 2 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#475569', py: 2, textAlign: 'center' }}>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataTransaksiDummy.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#fdfdfd' } }} hover>
                
                {/* ID Transaksi */}
                <TableCell sx={{ py: 2.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#3b82f6', bgcolor: '#eff6ff', px: 1.5, py: 0.5, borderRadius: '6px', display: 'inline-block' }}>
                    {row.id}
                  </Typography>
                </TableCell>
                
                {/* Tanggal */}
                <TableCell sx={{ color: '#64748b', fontWeight: 500 }}>{row.tanggal}</TableCell>
                
                {/* Nama Pelanggan */}
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountCircleOutlinedIcon sx={{ color: '#cbd5e1' }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                      {row.pelanggan}
                    </Typography>
                  </Box>
                </TableCell>
                
                {/* Metode */}
                <TableCell>
                  <Chip 
                    label={row.metode} 
                    size="small" 
                    sx={{ 
                      fontWeight: 600, 
                      bgcolor: row.metode === 'Tunai' ? '#f0fdf4' : row.metode === 'Transfer' ? '#eff6ff' : '#fff7ed',
                      color: row.metode === 'Tunai' ? '#16a34a' : row.metode === 'Transfer' ? '#2563eb' : '#ea580c',
                      border: 'none'
                    }} 
                  />
                </TableCell>
                
                {/* Total Belanja */}
                <TableCell sx={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>
                  Rp {row.total.toLocaleString('id-ID')}
                </TableCell>
                
                {/* Status */}
                <TableCell>
                  <Chip 
                    label={row.status} 
                    size="small" 
                    sx={{ 
                      fontWeight: 700, 
                      borderRadius: '8px',
                      bgcolor: row.status === 'Selesai' ? '#dcfce7' : '#fef3c7', 
                      color: row.status === 'Selesai' ? '#15803d' : '#d97706',
                      px: 1
                    }}
                  />
                </TableCell>
                
                {/* Tombol Aksi Minimalis */}
                <TableCell sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    <Tooltip title="Lihat Detail">
                      <IconButton size="small" sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9', color: '#1e293b' } }}>
                        <VisibilityOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cetak Nota">
                      <IconButton size="small" sx={{ color: '#64748b', '&:hover': { bgcolor: '#f1f5f9', color: '#1e293b' } }}>
                        <LocalPrintshopOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}