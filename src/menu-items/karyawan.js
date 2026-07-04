import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const karyawan = {
  id: 'grup-karyawan',
  title: 'NAVIGASI KARYAWAN',
  type: 'group',
  children: [
    {
      id: 'karyawan-dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/karyawan',
      icon: DashboardOutlinedIcon,
      breadcrumbs: false
    },

    {
      id: 'karyawan-penjualan',
      title: 'Kasir / Penjualan',
      type: 'item',
      url: '/karyawan/transaksi',
      icon: ReceiptLongOutlinedIcon
    },
    {
      id: 'karyawan-pengiriman',
      title: 'Pengiriman',
      type: 'item',
      url: '/karyawan/pengiriman',
      icon: LocalShippingOutlinedIcon
    },
    {
      id: 'karyawan-master-stok',
      title: 'Manajemen Stok',
      type: 'item',
      url: '/karyawan/manajemen-karyawan',
      icon: Inventory2OutlinedIcon
    },
    {
      id: 'karyawan-laporan-keuangan',
      title: 'Laporan Barang',
      type: 'item',
      url: '/karyawan/laporan-keuangan',
      icon: ReceiptLongOutlinedIcon
    }
  ]
};

export default karyawan;
