import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DashboardApp from './pages/DashboardApp';
import Transactions from './pages/Transactions';
import Invoices from './pages/Invoices';
import Clients from './pages/Clients';
import NotFound from './pages/Page404/Page404';
import PostInvoices from './pages/PostInvoices';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'clients', element: <Clients /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'invoices', element: <Invoices /> },
        { path: 'postInvoices', element: <PostInvoices /> },
        { path: 'jobs', element: <Jobs /> },
        { path: 'profile', element: <Profile /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
