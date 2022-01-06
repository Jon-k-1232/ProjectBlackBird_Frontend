import { Container, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import Page from '../Components/Page';
import dummyTableData from '../_mocks_/dataTable_mock';
import DataTable from '../Components/DataTable/DataTable';

export default function Transactions() {
	return (
		<Page title='Transactions'>
			<Container>
				<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
					<Typography variant='h4' sx={{ mb: 5 }}>
						Transactions
					</Typography>
					<Button variant='contained' component={RouterLink} to='#' startIcon={<Icon icon={plusFill} />}>
						New Transaction
					</Button>
				</Stack>
				<DataTable name='Client List' data={dummyTableData} />
			</Container>
		</Page>
	);
}
