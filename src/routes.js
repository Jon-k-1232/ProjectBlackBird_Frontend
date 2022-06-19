import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './Layouts/dashboard';
import LogoOnlyLayout from './Layouts/LogoOnlyLayout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
// import DashboardApp from './Pages/DashboardApp';
import Transactions from './Pages/Transactions/Transactions';
import Invoices from './Pages/Invoices/Invoices';
import NewInvoice from './Pages/Invoices/NewInvoice';
import InvoiceDetails from './Pages/InvoiceDetails/InvoiceDetails';
import Clients from './Pages/Clients/Clients';
import NewClient from './Pages/Clients/NewClient';
import NotFound from './Pages/Page404/Page404';
import Employees from './Pages/Employees/Employees';
import NewEmployee from './Pages/Employees/NewEmployee';
import Jobs from './Pages/Jobs/Jobs';
import NewJob from './Pages/Jobs/NewJob';
import JobDetails from './Pages/Jobs/JobDetails';
import Profile from './Pages/Profile/Profile';
import ClientDetails from './Pages/Clients/ClientDetails';
import NewJobDefinition from './Pages/JobDefinitions/NewJobDefinition';
import JobDefinitions from './Pages/JobDefinitions/JobDefinitions';
import ChangeInvoice from './Pages/Transactions/ChangeInvoice';
import NewTransactionsPage from './Pages/Transactions/NewTransactionPage';

export default function Router(allEmployees) {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to='/dashboard/app' replace /> },
        // { path: 'app', element: <DashboardApp /> },
        { path: 'clients', element: <Clients /> },
        { path: 'clientDetails', element: <ClientDetails /> },
        { path: 'newClient', element: <NewClient /> },
        { path: 'transactions', element: <Transactions /> },
        { path: 'newTransaction', element: <NewTransactionsPage /> },
        { path: 'invoices', element: <Invoices /> },
        { path: 'newInvoice', element: <NewInvoice /> },
        { path: 'invoiceDetails', element: <InvoiceDetails /> },
        { path: 'employees', element: <Employees {...allEmployees} /> },
        { path: 'newEmployee', element: <NewEmployee /> },
        { path: 'jobs', element: <Jobs /> },
        { path: 'newJob', element: <NewJob /> },
        { path: 'jobDetails', element: <JobDetails /> },
        { path: 'jobDefinitions', element: <JobDefinitions /> },
        { path: 'createNewJobDefinition', element: <NewJobDefinition /> },
        { path: 'profile', element: <Profile /> },
        { path: 'changeInvoice', element: <ChangeInvoice /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to='/dashboard/clients' /> },
        { path: '*', element: <Navigate to='/404' /> }
      ]
    },
    { path: '*', element: <Navigate to='/404' replace /> }
  ]);
}
