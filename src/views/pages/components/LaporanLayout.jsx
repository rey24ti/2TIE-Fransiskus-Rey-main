import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';

export default function LaporanLayout({ title, subtitle, children }) {
  return (
    <Box sx={{ p: 0 }}>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 4,
          px: { xs: 1.5, md: 3 },
          py: { xs: 1.25, md: 2 },
          mb: 3,
          mx: { xs: 0, md: 0 },
          backgroundColor: 'background.paper',
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a' }}>
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="body1" sx={{ color: '#64748b' }}>
              {subtitle}
            </Typography>
          ) : null}
        </Stack>
      </Paper>

      {children}
    </Box>
  );
}

