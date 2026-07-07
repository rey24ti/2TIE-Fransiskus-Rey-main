import { createBrowserRouter } from 'react-router-dom';

// Tidak langsung mengimpor routes di sini
let router = null;

export const createAppRouter = async () => {
  // Impor dinamis untuk memutus siklus
  const { default: routes } = await import('../routes');
  router = createBrowserRouter(routes, { basename: '' });
  return router;
};

// Jika tetap ingin ekspor default langsung, bisa berikan nilai sementara
export default router; // akan diisi nanti