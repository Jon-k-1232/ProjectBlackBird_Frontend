import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
// import layersFill from "@iconify/icons-eva/layers-fill";
import printerFill from '@iconify/icons-eva/printer-fill';
import baselineWork from '@iconify/icons-ic/baseline-work';

const getIcon = name => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
	{
		title: 'dashboard',
		path: '/dashboard/app',
		icon: getIcon(pieChart2Fill)
	},
	{
		title: 'clients',
		path: '/dashboard/clients',
		icon: getIcon(peopleFill)
	},
	{
		title: 'Transactions',
		path: '/dashboard/transactions',
		icon: getIcon(clockFill)
	},
	{
		title: 'Invoices',
		path: '/dashboard/invoices',
		icon: getIcon(fileTextFill)
	},
	{
		title: 'Post Invoices',
		path: '/dashboard/postInvoices',
		icon: getIcon(printerFill)
	},
	{
		title: 'Login',
		path: '/login',
		icon: getIcon(printerFill)
	},
	{
		title: 'Jobs',
		path: '/dashboard/jobs',
		icon: getIcon(baselineWork)
	},
	{
		title: 'register',
		path: '/register',
		icon: getIcon(personAddFill)
	},
	{
		title: 'Not found',
		path: '/404',
		icon: getIcon(alertTriangleFill)
	}
];

export default sidebarConfig;
