import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './Layouts/dashboard';
import LogoOnlyLayout from './Layouts/LogoOnlyLayout';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import DashboardApp from './Pages/DashboardApp';
import Transactions from './Pages/Transactions';
import Invoices from './Pages/Invoices';
import Clients from './Pages/Clients/Clients';
import NotFound from './Pages/Page404/Page404';
import PostInvoices from './Pages/PostInvoices';
import Jobs from './Pages/Jobs';
import Profile from './Pages/Profile';
import ClientDetails from './Pages/ClientDetails';

export default function Router(allClients) {
	return useRoutes([
		{
			path: '/dashboard',
			element: <DashboardLayout />,
			children: [
				{ element: <Navigate to='/dashboard/app' replace /> },
				{ path: 'app', element: <DashboardApp /> },
				{ path: 'clients', element: <Clients {...allClients} /> },
				{ path: 'clientDetails', element: <ClientDetails {...allClients} /> },
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
				{ path: '/', element: <Navigate to='/dashboard' /> },
				{ path: '*', element: <Navigate to='/404' /> }
			]
		},
		{ path: '*', element: <Navigate to='/404' replace /> }
	]);
}
