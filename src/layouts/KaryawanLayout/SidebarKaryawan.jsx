import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DRAWER_WIDTH } from 'config';

import menuKaryawan from 'menu-items/karyawan';

// reuse styling/components from admin drawer navigation
import NavGroup from 'layouts/MainLayout/Drawer/DrawerContent/Navigation/NavGroup';

// ==============================|| SIDEBAR KARYAWAN (TAMPILAN SAMA DENGAN ADMIN) ||============================== //
export default function SidebarKaryawan() {
  return (
    <Box
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        bgcolor: 'background.paper',
        borderRight: 'none',
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      {/* header kecil seperti drawer admin (caption grup) */}
      <Box sx={{ px: 2, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'primary.main' }}>
          {menuKaryawan.title}
        </Typography>
      </Box>

      {/* render nav groups/items seperti admin */}
      <NavGroup item={menuKaryawan} />
    </Box>
  );
}

