import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';

import LaporanLayout from './components/LaporanLayout.jsx';

export default function PengaturanSistem() {
  const [settings, setSettings] = useState({
    tokoName: 'Materially Toko Material',
    periodeDefault: 'Minggu Ini',
    marginKeuntunganDefault: 25,
    requireLoginForAdmin: true,
    enableAutoReminderPiutang: true,
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const isValid = useMemo(() => {
    const margin = Number(settings.marginKeuntunganDefault);
    return settings.tokoName.trim().length > 0 && Number.isFinite(margin) && margin >= 0;
  }, [settings]);

  const handleChange = (key) => (e) => {
    const value = e?.target?.value;
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggle = (key) => (e) => {
    setSettings((prev) => ({ ...prev, [key]: e.target.checked }));
  };

  const handleSave = () => {
    if (!isValid) {
      setSnackbar({ open: true, message: 'Periksa input pengaturan.', severity: 'error' });
      return;
    }

    // Persist sederhana (opsional). Kalau nanti backend sudah ada, ganti ke API.
    try {
      localStorage.setItem('pengaturan_sistem', JSON.stringify(settings));
    } catch (_) {}

    setSnackbar({ open: true, message: 'Pengaturan Sistem berhasil disimpan (localStorage).', severity: 'success' });
  };

  return (
    <LaporanLayout
      title="Pengaturan Sistem"
      subtitle="Konfigurasi default aplikasi admin (dummy / local-only)"
    >
      <Box sx={{ pb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card variant="outlined" sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  Konfigurasi Utama
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  <TextField
                    label="Nama Toko"
                    size="small"
                    value={settings.tokoName}
                    onChange={handleChange('tokoName')}
                    fullWidth
                  />

                  <TextField
                    label="Periode Default"
                    size="small"
                    value={settings.periodeDefault}
                    onChange={handleChange('periodeDefault')}
                    fullWidth
                  />

                  <TextField
                    label="Margin Keuntungan Default (%)"
                    size="small"
                    type="number"
                    value={settings.marginKeuntunganDefault}
                    onChange={handleChange('marginKeuntunganDefault')}
                    fullWidth
                    inputProps={{ min: 0 }}
                  />

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Preview estimasi tersedia di halaman laporan.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  Fitur & Validasi
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <FormControlLabel
                    control={<Switch checked={settings.requireLoginForAdmin} onChange={handleToggle('requireLoginForAdmin')} />}
                    label="Wajib login untuk akses admin"
                  />
                  <FormControlLabel
                    control={<Switch checked={settings.enableAutoReminderPiutang} onChange={handleToggle('enableAutoReminderPiutang')} />}
                    label="Aktifkan reminder otomatis piutang"
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Button
                  variant="contained"
                  sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 800 }}
                  onClick={handleSave}
                >
                  Simpan Pengaturan
                </Button>

                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                  Data tersimpan lokal di browser.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3500}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={snackbar.severity} sx={{ borderRadius: 2 }} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LaporanLayout>
  );
}

