import { Outlet } from 'react-router-dom';

// material-ui

import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import Header from 'layouts/MainLayout/Header';
import Breadcrumbs from 'components/Breadcrumbs';
import SidebarKaryawan from 'layouts/KaryawanLayout/SidebarKaryawan';


// ==============================|| KARYAWAN LAYOUT (NO DRAWER) ||============================== //

// UI mengikuti MainLayout (header + breadcrumbs + content area), tapi tanpa side bar/drawer.
export default function KaryawanLayout() {
  // layout karyawan tanpa drawer; ukuran layar tidak mempengaruhi render saat ini


  // Karena drawer tidak ditampilkan, konten tetap full-width.
  return (
    <Stack direction="row" width={1}>
      <Header />

      <SidebarKaryawan />

      <Box
        component="main"
        sx={{
          width: 1,
          p: { xs: 2, sm: 3, md: 5 },
          ml: { xs: 0, lg: 'auto' },
        }}
      >
        <Toolbar />
        {/* Breadcrumb tetap dipakai biar konsisten, tapi layout tanpa drawer */}
        <Breadcrumbs />
        <Outlet />
      </Box>
    </Stack>
  );
}

