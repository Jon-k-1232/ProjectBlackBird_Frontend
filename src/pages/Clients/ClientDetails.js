import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Card, CardContent } from '@mui/material';
import Page from '../../Components/Page';
import ContactCard from '../../Components/ContactCard/ContactCard';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';
import DataTable from '../../Components/DataTable/DataTable';
import ComingSoon from 'src/Components/ComingSoon';
import clipboardNotes from '@iconify/icons-foundation/clipboard-notes';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import baselineWork from '@iconify/icons-ic/baseline-work';
import clockFill from '@iconify/icons-eva/clock-fill';
import statisticsIcon from '@iconify/icons-whh/statistics';
import plusFill from '@iconify/icons-eva/plus-fill';
import NewTransactions from '../Transactions/NewTransactions';

export default function ClientDetails({ allClients }) {
  const [dataToShow, setDataToShow] = useState('notes');

  const location = useLocation();

  // Data is being stored in props of routing.
  const clientId = parseInt(location.state.rowData[0]);
  // While data cane be passed
  const contactDetails = allClients.rawData.find((item) => item.oid === clientId);

  return (
    <Page title='Client Details'>
      <Container style={{ maxWidth: '1280px' }}>
        <HeaderMenu handleOnClick={(data) => setDataToShow(data)} page={'Client Details'} listOfButtons={button} />
        <ContactCard data={contactDetails} />
        {dataToShow === 'notes' && <DataTable data={''} />}
        {dataToShow === 'transactions' && <DataTable data={''} />}
        {dataToShow === 'newTransactions' && <NewTransactions />}
        {dataToShow === 'jobs' && <DataTable data={''} />}
        {dataToShow === 'invoices' && <DataTable data={''} />}
        {dataToShow === 'statistics' && <ComingSoon />}
      </Container>
    </Page>
  );
}

const button = [
  { name: 'notes', onClick: 1, variant: 'contained', icon: clipboardNotes, htmlName: 'Notes' },
  { name: 'transactions', onClick: 1, variant: 'contained', icon: clockFill, htmlName: 'Transactions' },
  { name: 'newTransactions', onClick: 1, variant: 'contained', icon: plusFill, htmlName: 'New Transaction' },
  { name: 'jobs', onClick: 1, variant: 'contained', icon: baselineWork, htmlName: 'Jobs' },
  { name: 'newJob', onClick: 1, variant: 'contained', icon: plusFill, htmlName: 'New Job' },
  { name: 'invoices', onClick: 1, variant: 'contained', icon: fileTextFill, htmlName: 'Invoices' },
  { name: 'statistics', onClick: 1, variant: 'contained', icon: statisticsIcon, htmlName: 'Statistics' },
];

const styles = () => ({
  padding: '0px',
});
