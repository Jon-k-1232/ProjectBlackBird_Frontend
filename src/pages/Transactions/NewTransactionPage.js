import { useState } from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import Page from '../../Components/Page';
import DataTable from '../../Components/DataTable/DataTable';
import { getOutstandingInvoiceForCompany } from '../../ApiCalls/ApiCalls';
import NewTransactions from './NewTransaction';

export default function NewTransactionsPage({ passedCompany, updateContactCard }) {
  const [outstandingInvoices, setOutstandingInvoices] = useState(null);
  const [transactionType, setTransactionType] = useState(null);

  const handleChange = async company => {
    const invoices = await getOutstandingInvoiceForCompany(company);
    setOutstandingInvoices(invoices);
  };

  return (
    <Page title='Transactions'>
      <Container style={{ maxWidth: '1280px' }}>
        <NewTransactions
          passedCompany={passedCompany}
          setCompanyToGetOutstandingInvoice={company => handleChange(company)}
          outstandingInvoices={outstandingInvoices}
          setTransaction={transactionType => setTransactionType(transactionType)}
          setContactCard={companyUpdates => updateContactCard(companyUpdates)}
        />
        {/* Displays Graph for outstanding Invoices.*/}
        {outstandingInvoices !== null && transactionType !== null && transactionType !== 'charge' && <DataTable {...outstandingInvoices} />}
        {/* If no outstanding invoices than give user feedback, no outstanding invoices  */}
        {transactionType !== null && transactionType !== 'charge' && (
          <Card style={{ marginTop: '25px' }}>
            <CardContent style={{ padding: '20px' }}>
              <Typography style={{ textAlign: 'center' }} variant='h4'>
                No Outstanding Invoices
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Page>
  );
}
