import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import { getAllCompanies, getCompanyJobs, getCompanyTransactions, getCompanyInvoices } from '../../ApiCalls/ApiCalls';
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
import NewTransactions from '../Transactions/NewTransaction';
import NewJob from '../Jobs/NewJob';

export default function ClientDetails() {
  const [dataToShow, setDataToShow] = useState('notes');
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState(null);
  const [jobTransactions, setJobTransactions] = useState(null);
  const [companyInvoices, setCompanyInvoices] = useState(null);

  const location = useLocation();

  useEffect(() => {
    // Data is being stored in props of routing.
    const companyId = parseInt(location.state.rowData[0]);

    // Selected company info
    const allClients = getAllCompanies();
    const contactDetails = allClients.allCompanies.rawData.find(item => item.oid === companyId);
    setCompany(contactDetails);

    // Company transactions
    const companyTransactions = getCompanyTransactions(companyId);
    setJobTransactions(companyTransactions.allCompanyTransactions);

    // Company jobs
    const companyJobs = getCompanyJobs(companyId);
    setCompanyJobs(companyJobs.allCompanyJobs);

    // Company invoices
    const companyInvoices = getCompanyInvoices(companyId);
    setCompanyInvoices(companyInvoices.allCompanyInvoices);
  }, []);

  return (
    <Page title='Client Details'>
      <Container style={{ maxWidth: '1280px' }}>
        <HeaderMenu handleOnClick={data => setDataToShow(data)} page={'Client Details'} listOfButtons={button} />
        <ContactCard {...company} />
        {dataToShow === 'notes' && <ComingSoon />}
        {dataToShow === 'transactions' && <DataTable {...jobTransactions} />}
        {dataToShow === 'newTransactions' && <NewTransactions passedCompany={company} />}
        {dataToShow === 'jobs' && <DataTable {...companyJobs} route='/dashboard/jobDetails/' />}
        {dataToShow === 'newJob' && <NewJob passedCompany={company} />}
        {dataToShow === 'invoices' && <DataTable {...companyInvoices} />}
        {dataToShow === 'statistics' && <ComingSoon />}
      </Container>
    </Page>
  );
}

const button = [
  { name: 'notes', variant: 'contained', icon: clipboardNotes, htmlName: 'Notes' },
  { name: 'transactions', variant: 'contained', icon: clockFill, htmlName: 'Transactions' },
  { name: 'newTransactions', variant: 'contained', icon: plusFill, htmlName: 'New Transaction' },
  { name: 'jobs', variant: 'contained', icon: baselineWork, htmlName: 'Jobs' },
  { name: 'newJob', variant: 'contained', icon: plusFill, htmlName: 'New Job' },
  { name: 'invoices', variant: 'contained', icon: fileTextFill, htmlName: 'Invoices' },
  { name: 'statistics', variant: 'contained', icon: statisticsIcon, htmlName: 'Statistics' }
];
