import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Page from '../Components/Page';
import ContactCard from '../Components/ContactCard/ContactCard';
import HeaderMenu from '.././Components/HeaderMenu/HeaderMenu';
import DataTable from '../Components/DataTable/DataTable';

export default function ClientDetails({ allClients }) {
	const [showNotes, ShowNotes] = useState(false);
	const [showTransactions, setShowTransactions] = useState(false);
	const [showJobs, setShowJobs] = useState(false);
	const [showInvoice, setShowInvoice] = useState(false);
	const [showStatistics, setShowStatistics] = useState(false);

	const location = useLocation();

	// Data is being stored in props of routing.
	const clientId = parseInt(location.state.rowData[0]);
	// While data cane be passed
	const contactDetails = allClients.rawData.find(item => item.oid === clientId);

	// TODO - setup onclicks with header buttons
	return (
		<Page title='Client Details'>
			<Container>
				<HeaderMenu page='Client Details' />
				<ContactCard data={contactDetails} />
				<DataTable data={''} />
			</Container>
		</Page>
	);
}
