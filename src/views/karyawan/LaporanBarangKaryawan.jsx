import React, { useMemo, useState } from 'react';
import { Box, Card, CardContent, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Dummy data laporan barang karyawan
const dummyBarang = [
  { nama: 'Semen Tiga Roda', stok: 50, minimal: 15 },
  { nama: 'Cat Tembok Dulux 5kg', stok: 12, minimal: 10 },
  { nama: 'Paku Beton 5cm', stok: 100, minimal: 30 },
];

export default function LaporanBarangKaryawan() {
  const [filter, setFilter] = useState('');

  const data = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return dummyBarang;
    return dummyBarang.filter((x) => x.nama.toLowerCase().includes(q));
  }, [filter]);

  return (
    <Box sx={{ py: 3 }}>
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Typography variant="h5" fontWeight={800}>
            Laporan Barang
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="caption" color="text.secondary" fontWeight={700}>
                    Total Item
                  </Typography>
                  <Typography variant="h4" fontWeight={900}>
                    {dummyBarang.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Demo sederhana. Nanti bisa dihubungkan ke data stok asli.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Nama Barang</TableCell>
                  <TableCell align="right">Stok</TableCell>
                  <TableCell align="right">Minimal</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => {
                  const status = row.stok >= row.minimal ? 'Aman' : 'Kritis';
                  return (
                    <TableRow key={row.nama} hover>
                      <TableCell sx={{ fontWeight: 600 }}>{row.nama}</TableCell>
                      <TableCell align="right">{row.stok}</TableCell>
                      <TableCell align="right">{row.minimal}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: row.stok >= row.minimal ? '#10b981' : '#ef4444' }}>
                        {status}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Box>
  );
}

