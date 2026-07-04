import { Box, Container, Grid, Paper, Stack, Typography, useTheme, alpha } from '@mui/material';
import { 
  Campaign, 
  Receipt, 
  VerifiedUser,
  Storefront,
  Speed,
  TrendingUp
} from '@mui/icons-material';

export default function TentangGuest() {
  const theme = useTheme();

  const features = [
    {
      icon: <Campaign sx={{ fontSize: 40 }} />,
      title: 'Tujuan Aplikasi',
      description: 'Menyediakan solusi pencatatan transaksi kasir yang efisien dan akurat untuk toko material bangunan, guna mengoptimalkan waktu operasional dan meminimalisir kesalahan pencatatan.',
    },
    {
      icon: <Receipt sx={{ fontSize: 40 }} />,
      title: 'Layanan Utama',
      description: 'Fitur kasir terintegrasi dengan sistem riwayat transaksi yang memungkinkan pengguna mengakses data pembelian kapan saja, mendukung pengambilan keputusan bisnis yang lebih baik.',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 40 }} />,
      title: 'Keunggulan Platform',
      description: 'Antarmuka yang responsif, navigasi intuitif pada mode guest, serta penyimpanan data transaksi secara otomatis tanpa perlu login, memberikan kemudahan akses di berbagai perangkat.',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '70vh',
        py: { xs: 4, md: 6 },
        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.04)} 0%, ${alpha(
          theme.palette.background.default,
          0.96
        )} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={5}>
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              Profil Perusahaan
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                letterSpacing: -0.8,
                mt: 1,
                background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              toko bagunan
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mt: 2, maxWidth: 780, mx: 'auto', fontSize: '1.05rem', lineHeight: 1.6 }}
            >
              Sistem Pencatatan Transaksi Toko Bangunan adalah platform berbasis web yang dirancang khusus untuk mendigitalisasi, menyederhanakan, dan mempercepat seluruh proses operasional bisnis material dan alat bangunan.
            </Typography>
          </Box>

          {/* Features Grid */}
          <Grid container spacing={4} justifyContent="center">
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: 4,
                    background: alpha(theme.palette.background.paper, 0.7),
                    backdropFilter: 'blur(8px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 20px 30px -12px ${alpha(theme.palette.common.black, 0.15)}`,
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'inline-flex',
                      p: 1.5,
                      borderRadius: '16px',
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Trust indicators (tetap) */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
            sx={{ pt: 2, pb: 1 }}
          >
            {['Transaksi Aman', 'Data Tersimpan Otomatis', 'Akses Tanpa Login'].map((text) => (
              <Stack key={text} direction="row" spacing={1} alignItems="center" justifyContent="center">
                <VerifiedUser sx={{ fontSize: 18, color: theme.palette.success.main }} />
                <Typography variant="body2" fontWeight={500}>
                  {text}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}