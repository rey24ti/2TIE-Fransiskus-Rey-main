import React, { useState } from 'react';
import { Grid, Card, CardHeader, CardContent, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const UserManagement = () => {
  // --- STATE (Logika Modul) ---
  const [dataNama, setDataNama] = useState(['Andi', 'Budi', 'Siti']);
  const [inputNama, setInputNama] = useState('');
  const [cari, setCari] = useState('');

  const handleTambah = () => {
    if (inputNama.trim()) {
      setDataNama([...dataNama, inputNama]);
      setInputNama('');
    }
  };

  const dataTerfilter = dataNama.filter(n => n.toLowerCase().includes(cari.toLowerCase()));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Tambah Data & Pencarian" />
          <CardContent>
            <Grid container spacing={2}>
              {/* Input Tambah */}
              <Grid item xs={6}>
                <TextField fullWidth label="Nama Baru" value={inputNama} onChange={(e) => setInputNama(e.target.value)} />
                <Button variant="contained" sx={{ mt: 2 }} onClick={handleTambah}>Simpan</Button>
              </Grid>
              {/* Input Cari */}
              <Grid item xs={6}>
                <TextField fullWidth label="Cari Nama..." variant="standard" value={cari} onChange={(e) => setCari(e.target.value)} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#eee' }}>
                <TableCell>No</TableCell>
                <TableCell>Nama Orang</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTerfilter.map((nama, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{nama}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default UserManagement;