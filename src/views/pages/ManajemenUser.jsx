import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton,
  TextField, MenuItem, Chip, InputAdornment, Avatar, Button, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const usersTokoInit = [
  { id: "USR-001", nama: "Jhonny", role: "Owner / Pemilik", email: "jhonny@gmail.com", status: "Aktif" },
  { id: "USR-002", nama: "Suyanti", role: "Owner / Pemilik", email: "suyanti@gmail.com", status: "Aktif" },
  { id: "USR-003", nama: "Shinta", role: "Kasir Utama", email: "shinta@gmail.com", status: "Aktif" },
  { id: "USR-004", nama: "Sri Wahyuni", role: "Kasir Utama", email: "sriwahyuni@gmail.com", status: "Aktif" },
  { id: "USR-005", nama: "Caca", role: "Admin Gudang", email: "caca@gmail.com", status: "Aktif" },
  
  // 🚚 3 Supir Armada Toko Bangunan
  { id: "USR-006", nama: "Bang Wahyu", role: "Supir / Driver", email: "wahyu@gmail.com", status: "Aktif" },
  { id: "USR-007", nama: "Bang Riki", role: "Supir / Driver", email: "riki@gmail.com", status: "Aktif" },
  { id: "USR-008", nama: "Bang Alik", role: "Supir / Driver", email: "alik@gmail.com", status: "Aktif" },
  
  // 👨 2 Karyawan Laki-laki (Operasional / Helper)
  { id: "USR-009", nama: "Bang Andree", role: "Karyawan / Helper", email: "andree@gmail.com", status: "Aktif" },
  { id: "USR-010", nama: "Rian Hidayat", role: "Karyawan / Helper", email: "rianhidayat@gmail.com", status: "Aktif" }
];

export default function ManajemenUser() {
  const [users, setUsers] = useState(usersTokoInit);
  const [search, setSearch] = useState("");
  
  // State untuk Form Tambah Data
  const [newNama, setNewNama] = useState("");
  const [newRole, setNewRole] = useState("Kasir Utama");

  // =========================================================================
  // 🆕 BARU: STATE UNTUK POP-UP EDIT DATA
  // =========================================================================
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 1. Fungsi Tambah Akun Baru
  const handleTambah = (e) => {
    e.preventDefault();
    if (!newNama.trim()) return;
    
    const nextIdNumber = users.length > 0 ? Math.max(...users.map(u => parseInt(u.id.split('-')[1]))) + 1 : 1;
    const formattedId = `USR-${String(nextIdNumber).padStart(3, '0')}`;

    const barisBaru = {
      id: formattedId,
      nama: newNama,
      role: newRole,
      email: `${newNama.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      status: "Aktif"
    };
    setUsers([...users, barisBaru]);
    setNewNama("");
  };

  // =========================================================================
  // 🆕 BARU: LOGIKA FUNGSI HAPUS DAN EDIT DATA
  // =========================================================================
  
  // Fungsi untuk Menghapus Data Karyawan dari Tabel
  const handleHapus = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  // Fungsi untuk Membuka Pop-up & Mengambil Data Karyawan yang Dipilih
  const handleOpenEdit = (user) => {
    setCurrentUser({ ...user });
    setOpenEditDialog(true);
  };

  // Fungsi untuk Menyimpan Perubahan Nama/Jabatan ke dalam Tabel
  const handleSimpanEdit = () => {
    if (!currentUser.nama.trim()) return;

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        return {
          ...currentUser,
          email: `${currentUser.nama.toLowerCase().replace(/\s+/g, '')}@gmail.com` // Otomatis sync email baru
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setOpenEditDialog(false);
    setCurrentUser(null);
  };

  // =========================================================================

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 0.5 }}>
          Manajemen Karyawan & Hak Akses
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Atur batasan pendaftaran akun kasir, admin gudang, supir, dan hak operasional toko bangunan.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Form Tambah */}
        <Grid item xs={12} md={4}>
          <Card component="form" onSubmit={handleTambah} sx={{ p: 3, borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.01)' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonOutlineOutlinedIcon sx={{ color: '#2563eb' }} /> Tambah User
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                fullWidth
                label="Nama Karyawan"
                size="small"
                value={newNama}
                onChange={(e) => setNewNama(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              />
              <TextField
                fullWidth
                select
                label="Jabatan"
                size="small"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
              >
                <MenuItem value="Owner / Pemilik">👑 Owner / Pemilik</MenuItem>
                <MenuItem value="Kasir Utama">💵 Kasir Utama</MenuItem>
                <MenuItem value="Admin Gudang">📦 Admin Gudang</MenuItem>
                <MenuItem value="Supir / Driver">🚚 Supir / Driver</MenuItem>
                <MenuItem value="Karyawan / Helper">👨 Karyawan / Helper</MenuItem>
              </TextField>
              <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ borderRadius: '10px', textTransform: 'none', py: 1, fontWeight: 600, bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' } }}>
                Simpan Akun
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Tabel Data */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2, mb: 3, borderRadius: '14px', border: '1px solid #f1f5f9' }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Cari user berdasarkan nama atau jabatan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment> }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: '#f8fafc' } }}
            />
          </Card>

          <TableContainer component={Paper} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.01)' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, color: '#475569' }}>User</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#475569', textAlign: 'center' }}>Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter(u => u.nama.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()))
                  .map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell sx={{ py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ bgcolor: '#2563eb', width: 34, height: 34, fontSize: '0.9rem', fontWeight: 700 }}>
                            {row.nama.charAt(0).toUpperCase()}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155' }}>{row.nama}</Typography>
                            <Typography variant="caption" sx={{ color: '#94a3b8' }}>{row.id}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#475569' }}>
                          <ShieldOutlinedIcon sx={{ fontSize: 16, color: '#64748b' }} />
                          <Typography variant="body2">{row.role}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#64748b', fontSize: '0.85rem' }}>{row.email}</TableCell>
                      <TableCell>
                        <Chip label={row.status} size="small" color="success" sx={{ borderRadius: '6px', fontWeight: 600, fontSize: '0.75rem' }} />
                      </TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                          
                          {/* 🆕 BARU: ONCLICK TOMBOL EDIT */}
                          <Tooltip title="Ubah Data Karyawan">
                            <IconButton size="small" onClick={() => handleOpenEdit(row)} sx={{ color: '#64748b' }}>
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          
                          {/* 🆕 BARU: ONCLICK TOMBOL HAPUS */}
                          <Tooltip title="Hapus Akun">
                            <IconButton size="small" onClick={() => handleHapus(row.id)} color="error">
                              <DeleteOutlineOutlinedIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>

                        </Box>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* =========================================================================
      // 🆕 BARU: UI PANEL DIALOG POP-UP UNTUK EDIT DATA KARYAWAN
      // ========================================================================= */}
      <Dialog 
        open={openEditDialog} 
        onClose={() => setOpenEditDialog(false)}
        PaperProps={{ sx: { borderRadius: '14px', width: '100%', maxWidth: '400px', p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Ubah Data Karyawan</DialogTitle>
        <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, py: 2 }}>
          {currentUser && (
            <>
              <TextField
                fullWidth
                label="Nama Karyawan"
                size="small"
                value={currentUser.nama}
                onChange={(e) => setCurrentUser({ ...currentUser, nama: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' }, mt: 1 }}
              />
              <TextField
                fullWidth
                select
                label="Jabatan / Role"
                size="small"
                value={currentUser.role}
                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
              >
                <MenuItem value="Owner / Pemilik">👑 Owner / Pemilik</MenuItem>
                <MenuItem value="Kasir Utama">💵 Kasir Utama</MenuItem>
                <MenuItem value="Admin Gudang">📦 Admin Gudang</MenuItem>
                <MenuItem value="Supir / Driver">🚚 Supir / Driver</MenuItem>
                <MenuItem value="Karyawan / Helper">👨 Karyawan / Helper</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 1.5 }}>
          <Button onClick={() => setOpenEditDialog(false)} sx={{ textTransform: 'none', color: '#64748b', fontWeight: 600 }}>
            Batal
          </Button>
          <Button onClick={handleSimpanEdit} variant="contained" sx={{ textTransform: 'none', borderRadius: '8px', fontWeight: 600, bgcolor: '#2563eb' }}>
            Simpan Perubahan
          </Button>
        </DialogActions>
      </Dialog>
      {/* ========================================================================= */}

    </Box>
  );
}