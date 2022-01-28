import plusFill from '@iconify/icons-eva/plus-fill';
import { useNavigate } from 'react-router-dom';
import { Stack, Container } from '@mui/material';
import Page from '../../Components/Page';
import dummyTableData from '../../_mocks_/companies_mock';
import DataTable from '../../Components/DataTable/DataTable';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';

export default function Jobs() {
  const navigate = useNavigate();
  return (
    <Page title='Jobs'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <HeaderMenu handleOnClick={data => navigate(`/dashboard/${data}/`)} page={'Jobs'} listOfButtons={button} />
        </Stack>
        <DataTable name='Client List' data={dummyTableData} />
      </Container>
    </Page>
  );
}

const button = [{ name: 'newJob', variant: 'contained', icon: plusFill, htmlName: 'Create New Job' }];
