import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './Layouts/dashboard';
import LogoOnlyLayout from './Layouts/LogoOnlyLayout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import DashboardApp from './Pages/DashboardApp';
import Transactions from './Pages/Transactions/Transactions';
import NewTransactions from './Pages/Transactions/NewTransactions';
import Invoices from './Pages/Invoices/Invoices';
import NewInvoice from './Pages/Invoices/NewInvoice';
import Clients from './Pages/Clients/Clients';
import NewClient from './Pages/Clients/NewClient';
import NotFound from './Pages/Page404/Page404';
import Employees from './Pages/Employees/Employees';
import NewEmployee from './Pages/Employees/NewEmployee';
import Jobs from './Pages/Jobs/Jobs';
import NewJob from './Pages/Jobs/NewJob';
import Profile from './Pages/Profile/Profile';
import ClientDetails from './Pages/Clients/ClientDetails';

export default function Router(allClients, allEmployees) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to='/dashboard/app' replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'clients', element: <Clients {...allClients} /> },
        { path: 'clientDetails', element: <ClientDetails {...allClients} /> },
        { path: 'newClient', element: <NewClient /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'newTransaction', element: <NewTransactions {...allClients} {...allEmployees} /> },
        { path: 'invoices', element: <Invoices /> },
        { path: 'newInvoice', element: <NewInvoice /> },
        { path: 'employees', element: <Employees /> },
        { path: 'newEmployee', element: <NewEmployee /> },
        { path: 'jobs', element: <Jobs /> },
        { path: 'newJob', element: <NewJob /> },
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
        { path: '/', element: <Navigate to='/dashboard/app' /> },
        { path: '*', element: <Navigate to='/404' /> }
      ]
    },
    { path: '*', element: <Navigate to='/404' replace /> }
  ]);
}
