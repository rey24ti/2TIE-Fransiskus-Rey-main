import MainDrawer from 'layouts/MainLayout/Drawer';

// Wrapper drawer khusus karyawan.
// Saat ini memakai drawer yang sama dengan admin (hanya render-kan di layout ini).
// Nanti bisa diganti ke menuItems khusus karyawan bila dibutuhkan.
export default function DrawerKaryawan() {
  return <MainDrawer />;
}

