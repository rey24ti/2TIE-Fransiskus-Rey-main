import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    // If the app has auth state, clear it here.
    // Kept minimal to avoid breaking existing logic.
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
    } catch (e) {
      // ignore
    }
    window.location.href = '/login';
  };

  return (
    <Box>
      <Button
        onClick={handleOpen}
        sx={{
          textTransform: 'none',
          color: '#fff',
          borderRadius: 999,
          px: 1.2,
          py: 0.7,
          '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'rgba(59,130,246,0.25)',
              border: '1px solid rgba(59,130,246,0.35)',
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 18, color: '#60a5fa' }} />
          </Avatar>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography sx={{ fontWeight: 900, fontSize: 13, lineHeight: 1.1 }}>
              Admin
            </Typography>
            <Typography sx={{ opacity: 0.75, fontSize: 12, lineHeight: 1.1 }}>
              Materially
            </Typography>
          </Box>
        </Stack>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { borderRadius: 3, minWidth: 220, mt: 1.25 },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography sx={{ fontWeight: 900, fontSize: 14 }}>Admin</Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
            Materially • Control Panel
          </Typography>
        </Box>
        <Divider />

        <MenuItem
          onClick={() => {
            handleClose();
            window.location.href = '/admin/dashboard';
          }}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            window.location.href = '/admin/pengaturan-sistem';
          }}
        >
          Pengaturan
        </MenuItem>

        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
          sx={{ color: 'error.main' }}
        >
          <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

