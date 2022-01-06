import { Container, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import Page from '../Components/Page';
import dummyTableData from '../_mocks_/dataTable_mock';
import DataTable from '../Components/DataTable/DataTable';

export default function Invoices() {
	return (
		<Page title='Invoices'>
			<Container>
				<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
					<Typography variant='h4' gutterBottom>
						Invoices
					</Typography>
					<Button variant='contained' component={RouterLink} to='#' startIcon={<Icon icon={plusFill} />}>
						New Invoice
					</Button>
				</Stack>
				<DataTable data={dummyTableData} />
			</Container>
		</Page>
	);
}
