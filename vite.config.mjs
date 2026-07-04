import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Kita abaikan APP_BASE_URL dari .env agar URL jadi bersih
  const PORT = 3000;

  return {
    server: {
      // Membuka browser otomatis saat dijalankan
      open: true,
      // Mengatur port ke 3000
      port: PORT,
      host: true
    },
    preview: {
      open: true,
      host: true
    },
    define: {
      global: 'window'
    },
    // MODIFIKASI DISINI: Kita paksa pakai '/' agar tidak panjang lagi
    base: '/', 
    plugins: [react(), jsconfigPaths()]
  };
});