import { Box, Container, Paper, Stack, Typography } from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export default function KontakGuest() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5, mb: 0.5 }}>
            Kontak
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hubungi kami untuk informasi layanan dan dukungan.
          </Typography>
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Paper variant="outlined" sx={{ p: 3, flex: 1, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
              Email
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon color="primary" />
              <Typography fontWeight={700}>support@foodies.id</Typography>
            </Stack>
          </Paper>

          <Paper variant="outlined" sx={{ p: 3, flex: 1, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
              Telepon / WhatsApp
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon color="primary" />
              <Typography fontWeight={700}>+62 812-3456-7890</Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <WhatsAppIcon color="success" />
              <Typography variant="body2" color="text.secondary">
                Respon cepat via WA.
              </Typography>
            </Stack>
          </Paper>
        </Stack>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.06) 0%, rgba(16,185,129,0.04) 100%)'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
            Jam Layanan
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
            Senin–Sabtu, 08.00–17.00. Untuk kebutuhan bantuan teknis, sertakan detail order/nomor transaksi.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
}

