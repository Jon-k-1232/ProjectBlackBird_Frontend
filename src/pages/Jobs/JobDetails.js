import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import Page from '../../Components/Page';
import DataTable from '../../Components/DataTable/DataTable';
import { getCompanyJobs, getAllCompanies, getJobTransactions } from '../../ApiCalls/ApiCalls';
import JobCard from './JobCard';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';

export default function JobDetails() {
  const location = useLocation();

  const [company, setCompany] = useState(null);
  const [jobTransactions, setJobTransactions] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Data is being stored in props of routing
    const companyId = parseInt(location.state.rowData[2]);
    const companyJobs = getCompanyJobs(companyId).allCompanyJobs.rawData;

    // Getting contact info for company
    const allClients = getAllCompanies();
    const contactDetails = allClients.allCompanies.rawData.find(item => item.oid === companyId);
    setCompany(contactDetails);

    // Gets all transactions for job.
    const jobNumber = parseInt(location.state.rowData[0]);
    const selectedJob = companyJobs.find(jobItem => jobItem.oid === jobNumber);
    setSelectedJob(selectedJob);
    const transactions = getJobTransactions(jobNumber).jobTransactions.rawData;
    setJobTransactions(transactions);
  }, []);

  return (
    <Page title='Client Details'>
      <Container style={{ maxWidth: '1280px' }}>
        <HeaderMenu page={'Job Details'} />
        {/* <HeaderMenu handleOnClick={data => setDataToShow(data)} page={'Client Details'} listOfButtons={button} /> */}
        <JobCard selectedJob={selectedJob} company={company} />
        <DataTable {...jobTransactions} />
      </Container>
    </Page>
  );
}

// const button = [
//   { name: 'notes', variant: 'contained', icon: clipboardNotes, htmlName: 'Notes' },
//   { name: 'transactions', variant: 'contained', icon: clockFill, htmlName: 'Transactions' },
//   { name: 'newTransactions', variant: 'contained', icon: plusFill, htmlName: 'New Transaction' },
//   { name: 'jobs', variant: 'contained', icon: baselineWork, htmlName: 'Jobs' },
//   { name: 'newJob', variant: 'contained', icon: plusFill, htmlName: 'New Job' },
//   { name: 'invoices', variant: 'contained', icon: fileTextFill, htmlName: 'Invoices' },
//   { name: 'statistics', variant: 'contained', icon: statisticsIcon, htmlName: 'Statistics' }
// ];
