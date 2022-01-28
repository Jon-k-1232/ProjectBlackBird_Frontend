import { Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../../Components/Page';
import dummyTableData from '../../_mocks_/companies_mock';
import DataTable from '../../Components/DataTable/DataTable';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';

export default function Invoices() {
  const navigate = useNavigate();

  return (
    <Page title='Invoices'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <HeaderMenu handleOnClick={data => navigate(`/dashboard/${data}/`)} page={'Invoices'} listOfButtons={button} />
        </Stack>
        <DataTable data={dummyTableData} />
      </Container>
    </Page>
  );
}

const button = [
  { name: 'newInvoice', variant: 'contained', icon: plusFill, htmlName: 'Create Monthly Invoices' },
  { name: 'newInvoice', variant: 'contained', icon: plusFill, htmlName: 'New Invoice' }
];
