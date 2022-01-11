import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Page from '../../Components/Page';
import ContactCard from '../../Components/ContactCard/ContactCard';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';
import DataTable from '../../Components/DataTable/DataTable';
import ComingSoon from 'src/Components/ComingSoon';

export default function ClientDetails({ allClients }) {
  const [dataToShow, setDataToShow] = useState('notes');

  const location = useLocation();

  // Data is being stored in props of routing.
  const clientId = parseInt(location.state.rowData[0]);
  // While data cane be passed
  const contactDetails = allClients.rawData.find((item) => item.oid === clientId);

  return (
    <Page title='Client Details'>
      <Container>
        <HeaderMenu handleOnClick={(data) => setDataToShow(data)} page={'Client Details'} />
        <ContactCard data={contactDetails} />
        {dataToShow === 'notes' && <DataTable data={''} />}
        {dataToShow === 'transactions' && <DataTable data={''} />}
        {dataToShow === 'jobs' && <DataTable data={''} />}
        {dataToShow === 'invoices' && <DataTable data={''} />}
        {dataToShow === 'statistics' && <ComingSoon />}
      </Container>
    </Page>
  );
}
