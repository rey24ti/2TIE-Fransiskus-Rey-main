import { createContext, useState } from 'react';

export const TokoContext = createContext();

export const TokoProvider = ({ children }) => {
  // State Global untuk Data Inventaris
  const [dataBarang, setDataBarang] = useState([
    { id: 1, nama: 'Semen Tiga Roda', stok: 50, harga: 65000, satuan: 'unit' },
    { id: 2, nama: 'Cat Tembok Dulux 5kg', stok: 12, harga: 180000, satuan: 'unit' },
    { id: 3, nama: 'Paku Beton 5cm', stok: 100, harga: 500, satuan: 'pcs' }
  ]);

  // State Global untuk Riwayat Transaksi
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([
    { jam: '09:00 WIB', barang: 'Besi 8mm', qty: 20, totalHarga: 1200000 },
    { jam: '14:20 WIB', barang: 'Cat Tembok Dulux 5kg', qty: 2, totalHarga: 360000 },
    { jam: '14:30 WIB', barang: 'Semen Tiga Roda', qty: 10, totalHarga: 650000 }
  ]);

  // State Global untuk Catatan Operasional
  const [catatanOperasional, setCatatanOperasional] = useState([
    'Pengiriman pasir Merapi tiba jam 14:00.',
    'Cek kembali nota supplier Semen Gresik.',
    'Servis berkala armada pick-up hari Sabtu.'
  ]);

  return (
    <TokoContext.Provider value={{ 
      dataBarang, 
      setDataBarang, 
      riwayatTransaksi, 
      setRiwayatTransaksi,
      catatanOperasional,
      setCatatanOperasional
    }}>
      {children}
    </TokoContext.Provider>
  );
};