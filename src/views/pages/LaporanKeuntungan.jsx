import React from 'react';
import LaporanKeuangan from './LaporanKeuangan.jsx';
import LaporanLayout from './components/LaporanLayout.jsx';

// Menu: Laporan Keuntungan / Grafik
export default function LaporanKeuntungan() {
  return (
    <LaporanLayout
      title="Laporan Keuntungan / Grafik"
      subtitle="Ringkasan pendapatan dan estimasi keuntungan per periode"
    >
      <LaporanKeuangan />
    </LaporanLayout>
  );
}


