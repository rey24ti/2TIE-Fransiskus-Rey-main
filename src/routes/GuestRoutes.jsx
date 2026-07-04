import React from 'react';
import { Navigate } from 'react-router-dom';

import GuestLayout from '../layouts/GuestLayout/index.jsx';

import HomeGuest from '../views/guest/HomeGuest.jsx';
import KategoriProdukGuest from '../views/guest/KategoriProdukGuest.jsx';
import KontakGuest from '../views/guest/KontakGuest.jsx';
import PromoGuest from '../views/guest/PromoGuest.jsx';
import ReturBarangGuest from '../views/guest/ReturBarangGuest.jsx';
import TentangGuest from '../views/guest/TentangGuest.jsx';

// TODO: Anda belum punya file guest Transaksi/Riwayat khusus.
// Saat ini kita arahkan ke placeholder (Login) agar routing tidak error.
import PlaceholderGuestTransaksi from '../views/pages/Login.jsx';



const GuestRoutes = {
  path: '/guest',
  element: <GuestLayout />,
  children: [
    { index: true, element: <HomeGuest /> },
    { path: 'kategori-produk', element: <KategoriProdukGuest /> },
    { path: 'kontak', element: <KontakGuest /> },
    { path: 'promo', element: <PromoGuest /> },
    { path: 'retur-barang', element: <ReturBarangGuest /> },
    { path: 'tentang', element: <TentangGuest /> },

    // halaman dipanggil dari HomeGuest
    { path: 'transaksi', element: <PlaceholderGuestTransaksi /> },
    { path: 'riwayat-transaksi', element: <PlaceholderGuestTransaksi /> },

    { path: '*', element: <Navigate to="/guest" replace /> },
  ],
};

export default GuestRoutes;

