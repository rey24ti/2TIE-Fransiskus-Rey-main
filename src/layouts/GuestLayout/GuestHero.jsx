import { Box, Button, Card, CardContent, Chip, Container, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme, alpha } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  ShoppingCart,
  History,
  Build,
  Speed,
  Security,
  Star,
  ArrowForward,
} from '@mui/icons-material';

export default function GuestHero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const floatingIcons = [
    { icon: <Build />, delay: 0, top: '15%', left: '5%' },
    { icon: <Speed />, delay: 0.2, top: '70%', left: '85%' },
    { icon: <Security />, delay: 0.4, top: '80%', left: '10%' },
    { icon: <ShoppingCart />, delay: 0.6, top: '20%', left: '90%' },
  ];

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 'auto', md: '90vh' },
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(145deg, ${alpha(theme.palette.primary.dark, 0.08)} 0%, ${alpha(
          theme.palette.background.default,
          0.95
        )} 100%)`,
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 40%, ${alpha(
            theme.palette.primary.main,
            0.12
          )} 0%, transparent 50%),
          repeating-linear-gradient(45deg, ${alpha(theme.palette.divider, 0.02)} 0px, ${alpha(
            theme.palette.divider,
            0.02
          )} 2px, transparent 2px, transparent 8px)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', py: { xs: 6, md: 12 } }}>
        <Grid container spacing={5} alignItems="center">
          {/* Kiri: Konten Utama */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2.5} sx={{ opacity: 1, transform: 'translateY(0)', transition: 'all 0.6s ease-out' }}>
              <Chip
                label="⭐ Guest Mode"
                color="primary"
                variant="outlined"
                sx={{
                  width: 'fit-content',
                  borderRadius: 40,
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                  bgcolor: alpha(theme.palette.background.paper, 0.6),
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  letterSpacing: -0.02,
                  lineHeight: 1.1,
                  background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Beli Bahan Bangunan <br />
                <Box component="span" sx={{ color: theme.palette.primary.main, background: 'none' }}>
                  Tanpa Ribet
                </Box>
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: 500,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Mode Guest untuk kasir dan riwayat transaksi—cepat, aman, dan tanpa perlu login.
                Tersimpan otomatis di perangkat Anda.
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                <Button
                  component={RouterLink}
                  to="/guest/transaksi"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderRadius: 60,
                    px: 4,
                    py: 1.2,
                    fontWeight: 800,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: `0 14px 28px ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                  }}
                >
                  Mulai Transaksi
                </Button>
                <Button
                  component={RouterLink}
                  to="/guest/riwayat-transaksi"
                  variant="outlined"
                  size="large"
                  startIcon={<History />}
                  sx={{
                    borderRadius: 60,
                    px: 4,
                    py: 1.2,
                    fontWeight: 700,
                    textTransform: 'none',
                    borderWidth: 1.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      borderWidth: 1.5,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  Lihat Riwayat
                </Button>
              </Stack>

              <Stack direction="row" spacing={3} sx={{ mt: 3, pt: 2 }}>
                {['Tanpa Login', 'Tersimpan Otomatis', 'Akses Cepat'].map((text) => (
                  <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Star sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                    <Typography variant="caption" fontWeight={500}>
                      {text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Kanan: Card Premium */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  borderRadius: 6,
                  overflow: 'hidden',
                  backdropFilter: 'blur(12px)',
                  bgcolor: alpha(theme.palette.background.paper, 0.7),
                  boxShadow: `0 25px 45px -12px ${alpha(theme.palette.common.black, 0.25)}`,
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-8px)' },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 200, md: 260 },
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCart sx={{ fontSize: 80, color: 'white', opacity: 0.8 }} />
                </Box>
                <CardContent sx={{ p: 3, position: 'relative', zIndex: 2 }}>
                  <Typography variant="h5" fontWeight={800} gutterBottom>
                    🧱 Transaksi Terakhir
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    2 menit yang lalu • 3 item • Rp 1.240.000
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {['Semen', 'Batu Bata', 'Cat'].map((item) => (
                      <Chip key={item} label={item} size="small" variant="outlined" />
                    ))}
                  </Stack>
                  <Button
                    component={RouterLink}
                    to="/guest/riwayat-transaksi"
                    size="small"
                    sx={{ mt: 2, fontWeight: 600 }}
                  >
                    Lihat Detail →
                  </Button>
                </CardContent>
              </Card>

              {/* Floating icons */}
              {!isMobile &&
                floatingIcons.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      position: 'absolute',
                      top: item.top,
                      left: item.left,
                      transform: 'translate(-50%, -50%)',
                      bgcolor: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: 'blur(8px)',
                      borderRadius: '50%',
                      p: 1,
                      boxShadow: 2,
                      color: theme.palette.primary.main,
                      animation: `float 3s ease-in-out infinite`,
                      animationDelay: `${idx * 0.3}s`,
                      '@keyframes float': {
                        '0%': { transform: 'translate(-50%, -50%) translateY(0px)' },
                        '50%': { transform: 'translate(-50%, -50%) translateY(-10px)' },
                        '100%': { transform: 'translate(-50%, -50%) translateY(0px)' },
                      },
                    }}
                  >
                    <IconButton size="small" sx={{ color: 'inherit' }}>
                      {item.icon}
                    </IconButton>
                  </Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}