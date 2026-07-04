import { Outlet, useLocation } from 'react-router-dom';

import { Box } from '@mui/material';

import NavbarGuest from './NavbarGuest';
import GuestHero from './GuestHero';
import FooterGuest from './FooterGuest';

// guest layout: tanpa drawer/menu admin, hanya navbar + hero + outlet + footer
export default function GuestLayout() {
  const location = useLocation();
  const showHero = location.pathname === '/guest';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <NavbarGuest />
      {showHero && <GuestHero />}
      <Box component="main" sx={{ py: showHero ? 4 : 6 }}>
        <Outlet />
      </Box>
      <FooterGuest />
    </Box>
  );
}
