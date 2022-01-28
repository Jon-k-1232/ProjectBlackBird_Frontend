import { Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import Page from '../../Components/Page';
import dummyTableData from '../../_mocks_/companies_mock';
import DataTable from '../../Components/DataTable/DataTable';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';

export default function Transactions() {
  const navigate = useNavigate();

  return (
    <Page title='Transactions'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <HeaderMenu handleOnClick={data => navigate(`/dashboard/${data}/`)} page={'Transactions'} listOfButtons={button} />
        </Stack>
        <DataTable name='Client List' data={dummyTableData} />
      </Container>
    </Page>
  );
}

const button = [{ name: 'newTransaction', variant: 'contained', icon: plusFill, htmlName: 'New Transaction' }];
