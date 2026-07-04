import { Box, Button, Card, CardContent, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function PromoGuest() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5, mb: 0.5 }}>
            Promo Foodies
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Penawaran khusus untuk pembelian bahan bangunan. Semua promo ini bersifat demo.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[{
            judul: 'Diskon Pembelian Minimal',
            deskripsi: 'Dapatkan diskon hingga 5% untuk transaksi dengan total tertentu.',
            label: 'Hingga 5%',
            warna: '#2563eb'
          },{
            judul: 'Gratis Ongkir (Area Tertentu)',
            deskripsi: 'Promo ongkir berlaku untuk pengiriman ke wilayah terpilih.',
            label: 'Gratis',
            warna: '#16a34a'
          },{
            judul: 'Buy 2 Get 1 (Produk Terpilih)',
            deskripsi: 'Berlaku untuk produk tertentu—cek daftar di toko.',
            label: 'Cuan!',
            warna: '#ea580c'
          }].map((p, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(15,23,42,0.10)' }}>
                <Box sx={{ height: 10, background: p.warna }} />
                <CardContent sx={{ p: 2.5 }}>
                  <Stack spacing={1}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>
                      {p.judul}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {p.deskripsi}
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        mt: 1,
                        p: 1.2,
                        borderRadius: 3,
                        borderColor: 'rgba(0,0,0,0.08)',
                        background: 'rgba(0,0,0,0.01)'
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 900, color: p.warna }}>
                        {p.label}
                      </Typography>
                    </Paper>
                    <Button
                      component={RouterLink}
                      to="/guest/transaksi"
                      variant="contained"
                      sx={{ mt: 1, textTransform: 'none', borderRadius: 999, fontWeight: 900 }}
                    >
                      Klaim & Transaksi
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box>
          <Typography variant="caption" color="text.secondary">
            Catatan: Promo demo hanya untuk tampilan.
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}

