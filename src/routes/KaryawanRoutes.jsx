import React from 'react';
import { Navigate } from 'react-router-dom';

import KaryawanLayout from '../layouts/KaryawanLayout/index.jsx';

// karyawan views
import DashboardKaryawan from '../views/karyawan/DashboardKaryawan.jsx';
import KasirKaryawan from '../views/karyawan/KasirKaryawan.jsx';
import PengirimanKaryawan from '../views/karyawan/PengirimanKaryawan.jsx';
import LaporanBarangKaryawan from '../views/karyawan/LaporanBarangKaryawan.jsx';
import LaporanKeuanganKaryawan from '../views/karyawan/LaporanKeuanganKaryawan.jsx';
import ManajemenKaryawan from '../views/karyawan/ManajemenKaryawan.jsx';

const KaryawanRoutes = {
  path: '/karyawan',
  element: <KaryawanLayout />,
  children: [
    { index: true, element: <Navigate to="/karyawan/kasir" replace /> },
    { path: 'dashboard', element: <DashboardKaryawan /> },
    { path: 'kasir', element: <KasirKaryawan /> },
    { path: 'pengiriman', element: <PengirimanKaryawan /> },
    { path: 'laporan-barang', element: <LaporanBarangKaryawan /> },
    { path: 'laporan-keuangan', element: <LaporanKeuanganKaryawan /> },
    { path: 'manajemen', element: <ManajemenKaryawan /> },
    { path: '*', element: <Navigate to="/karyawan" replace /> },
  ],
};

export default KaryawanRoutes;

