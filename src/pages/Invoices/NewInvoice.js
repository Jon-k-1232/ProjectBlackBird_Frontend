import { useState, useEffect } from 'react';
import { Container, Stack } from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../../Components/Page';
import DataTable from '../../Components/DataTable/DataTable';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';
import { getAllReadyToBillInvoices } from '../../ApiCalls/ApiCalls';
import { createInvoices } from '../../ApiCalls/PostApiCalls';
import AlertBanner from '../../Components/AlertBanner/AlertBanner';

export default function NewInvoice() {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [invoices, setInvoices] = useState(null);
  const [postStatus, setPostStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allInvoicesToDate = await getAllReadyToBillInvoices();
      setInvoices(allInvoicesToDate);
      // ToDo maybe add a button to get all, or just get the ready ones
    };
    fetchData();
  }, []);

  const handleSubmit = async e => {
    const arrayOfInvoicesToCreate = selectedRowData.map(company => company.oid);
    const postedItem = await createInvoices(arrayOfInvoicesToCreate);
    setPostStatus(postedItem.status);
    setTimeout(() => setPostStatus(null), 4000);
    // ToDo Get Zip to download.
  };

  return (
    <Page title='Invoices'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <HeaderMenu handleOnClick={e => handleSubmit(e)} page={'Create Invoices'} listOfButtons={button} />
        </Stack>
        <AlertBanner postStatus={postStatus} type='Invoices' />
        <DataTable {...invoices} selectOnRowClick={true} useCheckboxes={true} selectedList={items => setSelectedRowData(items)} />
      </Container>
    </Page>
  );
}

const button = [{ name: 'newInvoice', variant: 'contained', icon: plusFill, htmlName: 'Create invoices' }];
