import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from 'assets/images/logo.svg';

// Navigasi
const navItems = [
  { label: 'Kategori Produk', path: '/guest/kategori-produk' },
  { label: 'Keterangan', path: '/guest/tentang' },
  { label: 'Retur Barang', path: '/guest/retur' },
];

// Warna biru kuat
const strongBlue = {
  main: '#0B3D91',
  dark: '#072C6B',
  light: '#2B5FB6',
  gradient: 'linear-gradient(105deg, #0A2E6E 0%, #0B3D91 50%, #1E4FA9 100%)',
  shadow: '0 6px 18px rgba(11, 61, 145, 0.45)',
};

export default function NavbarGuest() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: scrolled
            ? alpha(strongBlue.dark, 0.92)
            : alpha(strongBlue.main, 0.88),
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease-in-out',
          borderBottom: scrolled
            ? `1px solid ${alpha(strongBlue.light, 0.5)}`
            : `1px solid ${alpha(strongBlue.light, 0.2)}`,
          boxShadow: scrolled ? strongBlue.shadow : `0 2px 10px ${alpha(strongBlue.main, 0.3)}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1.5, minHeight: 70 }}>
            {/* Logo dan Brand */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ flexGrow: 1 }}>
              <Box
                component={RouterLink}
                to="/guest"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' },
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="toko"
                  sx={{ height: 38, width: 'auto' }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    letterSpacing: -0.5,
                    background: `linear-gradient(135deg, #FFFFFF 0%, #B0D4FF 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                  toko bangunan
                </Typography>
              </Box>
            </Stack>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack direction="row" spacing={1.5} sx={{ mx: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      color: isActive(item.path)
                        ? '#FFD966'
                        : '#FFFFFF',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      textTransform: 'none',
                      px: 2.5,
                      py: 0.8,
                      borderRadius: 40,
                      position: 'relative',
                      transition: 'all 0.2s',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '50%',
                        transform: 'translateX(-50%) scaleX(0)',
                        width: '70%',
                        height: 3,
                        bgcolor: '#FFD966',
                        borderRadius: 2,
                        transition: 'transform 0.25s ease',
                      },
                      '&:hover': {
                        bgcolor: alpha('#FFFFFF', 0.15),
                        '&::after': {
                          transform: 'translateX(-50%) scaleX(1)',
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            )}

            {/* Hanya tombol Sign In (tanpa Sign Up) */}
            <Stack direction="row" spacing={1.5} alignItems="center">
              {!isMobile ? (
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={{
                    borderRadius: 40,
                    fontWeight: 700,
                    textTransform: 'none',
                    px: 3,
                    py: 0.7,
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                    color: '#FFFFFF',
                    '&:hover': {
                      borderWidth: 2,
                      transform: 'translateY(-2px)',
                      backgroundColor: alpha('#FFFFFF', 0.1),
                      borderColor: '#FFD966',
                      color: '#FFD966',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Sign In
                </Button>
              ) : (
                <IconButton onClick={handleDrawerToggle} sx={{ p: 1, color: '#FFFFFF' }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer - hanya tombol Sign In */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: strongBlue.dark,
            backdropFilter: 'blur(20px)',
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
            p: 2,
            color: '#FFFFFF',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#FFFFFF' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: 4,
                  mb: 0.5,
                  color: '#FFFFFF',
                  '&.Mui-selected': {
                    bgcolor: alpha('#FFD966', 0.2),
                    '& .MuiListItemText-primary': {
                      fontWeight: 800,
                      color: '#FFD966',
                    },
                  },
                  '&:hover': {
                    bgcolor: alpha('#FFFFFF', 0.1),
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {/* Hanya tombol Sign In di drawer (tanpa Sign Up) */}
          <Box sx={{ mt: 3, px: 1 }}>
            <Button
              fullWidth
              component={RouterLink}
              to="/login"
              variant="outlined"
              sx={{ borderRadius: 40, fontWeight: 700, borderColor: '#FFFFFF', color: '#FFFFFF', borderWidth: 1.5 }}
              onClick={handleDrawerToggle}
            >
              Sign In
            </Button>
          </Box>
        </List>
      </Drawer>
    </>
  );
}