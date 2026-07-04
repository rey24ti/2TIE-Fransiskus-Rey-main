import { createBrowserRouter, Navigate } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import PagesRoutes from './PagesRoutes';
import GuestRoutes from './GuestRoutes';
import KaryawanRoutes from './KaryawanRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([
  MainRoutes,
  PagesRoutes,
  GuestRoutes,
  KaryawanRoutes,

  {
    path: '/',
    element: <Navigate to="/guest" replace />,
  },
], {
  basename: ''
});

export default router;

