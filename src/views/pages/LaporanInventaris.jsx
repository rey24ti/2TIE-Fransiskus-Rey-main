import React from 'react';
import InventarisToko from './InventarisToko.jsx';
import LaporanLayout from './components/LaporanLayout.jsx';

// Menu: Laporan Inventaris
export default function LaporanInventaris() {
  return (
    <LaporanLayout
      title="Laporan Inventaris"
      subtitle="Rekap stok barang dengan filter kategori dan kondisi persediaan"
    >
      <InventarisToko />
    </LaporanLayout>
  );
}


