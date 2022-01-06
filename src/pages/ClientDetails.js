import { useLocation } from 'react-router-dom';
import { Stack, Container, Typography } from '@mui/material';
import Page from '../Components/Page';
import ContactCard from '../Components/ContactCard/ContactCard';
// import DataTable from '../components/DataTable/DataTable';

export default function ClientDetails({ allClients }) {
	const location = useLocation();

	// Data is being stored in props of routing.
	const clientId = parseInt(location.state.id);
	// While data cane be passed
	const contactDetails = allClients.rawData.find(item => item.oid === clientId);

	return (
		<Page title='Client Details'>
			<Container>
				<Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
					<Typography variant='h4' gutterBottom>
						Client Details
					</Typography>
				</Stack>
				<ContactCard data={contactDetails} />
			</Container>
		</Page>
	);
}
