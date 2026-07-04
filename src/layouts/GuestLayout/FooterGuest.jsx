import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
  Button,
  Grid,
  alpha,
  useTheme,
  Link,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  WhatsApp,
  LocationOn,
  Email,
  Phone,
  AccessTime,
  ArrowUpward,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import logo from 'assets/images/logo.svg';

export default function FooterGuest() {
  const theme = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Perusahaan: ['Tentang Kami', 'Karir', 'Blog', 'Kebijakan Privasi'],
    Bantuan: ['Pusat Bantuan', 'Hubungi Kami', 'FAQ', 'Syarat & Ketentuan'],
    Layanan: ['Guest Mode', 'Riwayat Transaksi', 'Kasir Cepat', 'Integrasi'],
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: '#0a1a2f',
        color: '#eef2ff',
        mt: 8,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
        },
      }}
    >
      {/* Background decorative pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: `radial-gradient(circle at 20% 40%, ${theme.palette.common.white} 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ py: 6, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={5} sx={{ mb: 5 }}>
          {/* Brand column */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  component="img"
                  src={logo}
                  alt="toko bangunan"
                  sx={{
                    width: 44,
                    height: 44,
                    filter: 'brightness(0) invert(1)',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'rotate(5deg) scale(1.05)' },
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: -0.5,
                    background: `linear-gradient(135deg, #fff 0%, ${alpha(
                      theme.palette.primary.light,
                      0.8
                    )} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  toko bangunan
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ opacity: 0.85, lineHeight: 1.6, maxWidth: 320 }}>
                Platform kasir dan riwayat transaksi untuk toko material — lebih cepat, rapi, dan mudah dipantau tanpa ribet.
              </Typography>

              {/* Social icons with cool hover */}
              <Stack direction="row" spacing={1.5}>
                {[
                  { icon: <Facebook />, label: 'Facebook', color: '#1877f2' },
                  { icon: <Instagram />, label: 'Instagram', color: '#e4405f' },
                  { icon: <Twitter />, label: 'Twitter', color: '#1da1f2' },
                  { icon: <WhatsApp />, label: 'WhatsApp', color: '#25d366' },
                ].map((social, idx) => (
                  <IconButton
                    key={idx}
                    size="small"
                    aria-label={social.label}
                    sx={{
                      border: `1px solid ${alpha('#fff', 0.2)}`,
                      color: '#fff',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: social.color,
                        borderColor: social.color,
                        transform: 'translateY(-4px)',
                        boxShadow: `0 6px 12px ${alpha(social.color, 0.3)}`,
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Stack>
          </Grid>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid item xs={12} sm={6} md={2.5} key={title}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 800, mb: 2, letterSpacing: -0.2, position: 'relative' }}
              >
                {title}
              </Typography>
              <Stack spacing={1.2}>
                {links.map((link) => (
                  <Link
                    key={link}
                    component={RouterLink}
                    to="#"
                    underline="none"
                    sx={{
                      color: alpha('#fff', 0.7),
                      fontSize: '0.85rem',
                      transition: '0.2s',
                      display: 'inline-block',
                      '&:hover': {
                        color: theme.palette.primary.light,
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Kontak column (tanpa newsletter) */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2 }}>
              Kontak
            </Typography>
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Email fontSize="small" sx={{ color: theme.palette.primary.light }} />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  cahaya_keramik@gmail.com
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Phone fontSize="small" sx={{ color: theme.palette.primary.light }} />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  +62 812-3456-7890
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <AccessTime fontSize="small" sx={{ color: theme.palette.primary.light }} />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  Senin–Sabtu, 08.00–17.00
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <LocationOn fontSize="small" sx={{ color: theme.palette.primary.light, mt: 0.3 }} />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  Jl. Kwalian No.Kelurahan, Kp. Rempak,
                  Kec. Siak, Kabupaten Siak, Riau 28671
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: alpha('#fff', 0.1), my: 3 }} />

        {/* Bottom bar */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={2}
        >
          <Typography variant="caption" sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} toko bangunan. All rights reserved. | Made with 💙 untuk toko material
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="#" underline="hover" sx={{ color: alpha('#fff', 0.6), fontSize: '0.7rem' }}>
              Kebijakan Privasi
            </Link>
            <Link href="#" underline="hover" sx={{ color: alpha('#fff', 0.6), fontSize: '0.7rem' }}>
              Syarat & Ketentuan
            </Link>
            <IconButton
              onClick={scrollToTop}
              size="small"
              sx={{
                bgcolor: alpha(theme.palette.primary.main, 0.2),
                color: theme.palette.primary.light,
                '&:hover': { bgcolor: theme.palette.primary.main, color: '#fff', transform: 'translateY(-3px)' },
                transition: '0.2s',
              }}
            >
              <ArrowUpward fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}