import { createBrowserRouter } from 'react-router-dom';

import { routes as adminRoutes } from './MainRoutes.jsx';
import KaryawanRoutes from './KaryawanRoutes.jsx';
import GuestRoutes from './GuestRoutes.jsx';

import Login from '../views/pages/Login.jsx';
import RegisterPage from '../views/pages/Register.jsx';

const routes = [
  ...adminRoutes,
  // auth routes
  { path: '/register', element: <RegisterPage /> },


  KaryawanRoutes,
  GuestRoutes,

  {
    path: '*',
    element: null,
  },
];

const router = createBrowserRouter(routes, { basename: '' });

export default router;







