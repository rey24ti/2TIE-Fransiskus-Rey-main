import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../views/pages/Login.jsx';
import Register from '../views/pages/Register.jsx'; 

// ====== ROUTE IMPORTS ======
import MainRoutes from './MainRoutes.jsx';
import GuestRoutes from './GuestRoutes.jsx';
import PagesRoutes from './PagesRoutes.jsx';
import KaryawanRoutes from './KaryawanRoutes.jsx';

const TOKEN_KEY = 'token';

// ====== AUTH HELPERS ======
const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log('🔐 isAuthenticated check:', { tokenExists: !!token, TOKEN_KEY });
  return !!token;
};

// ====== PRIVATE ROUTE ======
const PrivateRoute = ({ children }) => {
  return children;
};

// ====== PUBLIC ROUTE ======
const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    const role = localStorage.getItem('user_role');
    console.log('🔓 User sudah login, mengalihkan dari rute publik. Role:', role);
    
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/karyawan/dashboard" replace />;
    }
  }
  return children;
};

// ====== ROOT COMPONENT ======
const RootRedirect = () => {
  if (isAuthenticated()) {
    const role = localStorage.getItem('user_role');
    return role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/karyawan/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
};

// ====== GABUNGAN ROUTES ======
const finalRoutes = [];

// 1. Login & Register (Independen & Publik)
finalRoutes.push({
  path: '/login',
  element: <PublicRoute><Login /></PublicRoute>,
});

finalRoutes.push({
  path: '/register',
  element: <PublicRoute><Register /></PublicRoute>,
});

// 2. Root Redirect
finalRoutes.push({
  path: '/',
  element: <RootRedirect />,
});

// 3. Admin routes (Dibiarkan murni sesuai file aslinya agar 1000 baris tidak rusak)
if (MainRoutes) {
  if (Array.isArray(MainRoutes)) {
    MainRoutes.forEach(route => finalRoutes.push({ ...route, element: <PrivateRoute>{route.element}</PrivateRoute> }));
  } else {
    finalRoutes.push({ ...MainRoutes, element: <PrivateRoute>{MainRoutes.element}</PrivateRoute> });
  }
}

// 4. Karyawan routes (Dipisahkan secara eksplisit agar jalurnya tidak bertabrakan dengan admin)
if (KaryawanRoutes) {
  if (Array.isArray(KaryawanRoutes)) {
    KaryawanRoutes.forEach(route => {
      finalRoutes.push({
        ...route,
        path: '/karyawan', // Mengunci alamat bapaknya
        element: <PrivateRoute>{route.element}</PrivateRoute>
      });
    });
  } else {
    finalRoutes.push({
      ...KaryawanRoutes,
      path: '/karyawan', // Mengunci alamat bapaknya
      element: <PrivateRoute>{KaryawanRoutes.element}</PrivateRoute>
    });
  }
}

// 5. PagesRoutes
const pagesArray = Array.isArray(PagesRoutes) ? PagesRoutes : [PagesRoutes];
pagesArray.forEach(route => {
  if (route?.path && route.path !== '/login' && route.path !== '/register') {
    finalRoutes.push(route);
  }
});

// 6. GuestRoutes
if (GuestRoutes) {
  if (Array.isArray(GuestRoutes)) {
    finalRoutes.push(...GuestRoutes);
  } else {
    finalRoutes.push(GuestRoutes);
  }
}

// 7. Catch-all Global Dinamis (Mengecek role secara real-time sebelum melempar rute salah)
const CatchAllRedirect = () => {
  if (isAuthenticated()) {
    const role = localStorage.getItem('user_role');
    return role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/karyawan/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
};

finalRoutes.push({
  path: '*',
  element: <CatchAllRedirect />,
});

// Buat router
const router = createBrowserRouter(finalRoutes, {
  basename: '',
});

export default router;