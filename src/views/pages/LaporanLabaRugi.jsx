import React from 'react';
import LaporanKeuangan from './LaporanKeuangan.jsx';
import LaporanLayout from './components/LaporanLayout.jsx';

// Menu: Laporan Laba-Rugi
export default function LaporanLabaRugi() {
  return (
    <LaporanLayout
      title="Laporan Laba-Rugi"
      subtitle="Estimasi laba berdasarkan margin keuntungan dan rincian transaksi"
    >
      <LaporanKeuangan />
    </LaporanLayout>
  );
}


