import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';

const dashboard = {
    id: 'grup-toko-bangunan',
    title: 'NAVIGASI UTAMA',
    type: 'group',
    children: [{
        id: 'default',
        title: 'Dashboard',
        type: 'item',
        url: '/admin/dashboard',
        icon: DashboardOutlinedIcon,
        breadcrumbs: false
    }, {
        id: 'sub-master',
        title: 'MASTER DATA',
        type: 'collapse',
        icon: Inventory2OutlinedIcon,
        children: [{
            id: 'inv',
            title: 'Stok Barang',
            type: 'item',
            url: '/admin/inventariAs'
        }, {
            id: 'retur',
            title: 'Retur Barang',
            type: 'item',
            url: '/admin/retur-barang'
        }]
    }, {
        id: 'sub-transaksi',
        title: 'TRANSAKSI',
        type: 'collapse',
        icon: ReceiptLongOutlinedIcon,
        children: [{
            id: 'trx',
            title: 'Catat Transaksi',
            type: 'item',
            url: '/admin/transaksi'
        }, {
            id: 'riwayat-transaksi',
            title: 'Riwayat Transaksi',
            type: 'item',
            url: '/admin/riwayat-transaksi'
        }, {
            id: 'bon-piutang',
            title: 'Bon / Piutang (Admin)',
            type: 'item',
            url: '/admin/bon-piutang'
        }]
    }, {
        id: 'sub-laporan',
        title: 'LAPORAN',
        type: 'collapse',
        icon: AssessmentOutlinedIcon,
        children: [{
            id: 'laporan-keuntungan',
            title: 'Laporan Keuntungan / Grafik',
            type: 'item',
            url: '/admin/laporan-keuntungan'
        }, {
            id: 'laporan-laba-rugi',
            title: 'Laporan Laba-Rugi',
            type: 'item',
            url: '/admin/laporan-laba-rugi'
        }, {
            id: 'laporan-penjualan',
            title: 'Laporan Penjualan',
            type: 'item',
            url: '/admin/laporan-penjualan'
        }, {
            id: 'laporan-inventaris',
            title: 'Laporan Inventaris',
            type: 'item',
            url: '/admin/laporan-inventaris'
        }]
    }, {
        id: 'sub-manajemen-pengguna',
        title: 'MANAJEMEN PENGGUNA',
        type: 'collapse',
        icon: PeopleAltOutlinedIcon,
        children: [{
            id: 'data-karyawan',
            title: 'Data Karyawan',
            type: 'item',
            url: '/admin/data-karyawan'
        }, {
            id: 'pelanggan',
            title: 'Data Pelanggan',
            type: 'item',
            url: '/admin/pelanggan'
        }]
    }, {
        id: 'sub-pengaturan',
        title: 'PENGATURAN',
        type: 'collapse',
        icon: ManageAccountsOutlinedIcon,
        children: [{
            id: 'pengaturan-sistem',
            title: 'Pengaturan Sistem',
            type: 'item',
            url: '/admin/pengaturan-sistem'
        }]
    }, {
        id: 'sub-pages',
        title: 'PAGES',
        type: 'collapse',
        icon: HistoryOutlinedIcon,
        children: [{
            id: 'rebuild-pages',
            title: 'Rebuild-Pages',
            type: 'item',
            url: '/admin/rebuild-pages'
        }]
    }]
};

export default dashboard;