import { createBrowserRouter } from 'react-router-dom';

import { routes as adminRoutes } from './MainRoutes.jsx';
import KaryawanRoutes from './KaryawanRoutes.jsx';
import GuestRoutes from './GuestRoutes.jsx';

const routes = [
  ...adminRoutes,
  KaryawanRoutes,
  GuestRoutes,
];

const router = createBrowserRouter(routes, { basename: '' });

export default router;





