import React from 'react';
import LaporanKeuangan from './LaporanKeuangan.jsx';
import LaporanLayout from './components/LaporanLayout.jsx';

// Menu: Laporan Penjualan
export default function LaporanPenjualan() {
  return (
    <LaporanLayout
      title="Laporan Penjualan"
      subtitle="Analisis penjualan per periode dan rincian transaksi"
    >
      <LaporanKeuangan />
    </LaporanLayout>
  );
}


