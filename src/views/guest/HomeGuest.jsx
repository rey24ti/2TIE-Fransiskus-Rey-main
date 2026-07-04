import { Box, Button, Card, CardContent, Container, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HomeGuest() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5 }}>
            Toko Material • Mode Guest
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Buka layanan kasir & riwayat transaksi tanpa tampilan dashboard admin.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Card sx={{ flex: 1, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Transaksi
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Lakukan transaksi pembelian dan simpan riwayat.
              </Typography>
              <Button
                component={RouterLink}
                to="/guest/transaksi"
                variant="contained"
                sx={{ mt: 2, textTransform: 'none' }}
              >
                Buka Transaksi
              </Button>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Riwayat Transaksi
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Lihat transaksi yang tersimpan sebelumnya.
              </Typography>
              <Button
                component={RouterLink}
                to="/guest/riwayat-transaksi"
                variant="contained"
                sx={{ mt: 2, textTransform: 'none' }}
              >
                Lihat Riwayat
              </Button>
            </CardContent>
          </Card>
        </Stack>

        <Box>
          <Typography variant="caption" color="text.secondary">
            Catatan: data dummy diambil dari localStorage (untuk fitur Transaksi/Riwayat).
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
}



