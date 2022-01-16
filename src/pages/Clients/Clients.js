import plusFill from '@iconify/icons-eva/plus-fill';
import { useNavigate } from 'react-router-dom';
import { Stack, Container } from '@mui/material';
import Page from '../../Components/Page';
import DataTable from '../../Components/DataTable/DataTable';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';

export default function Clients({ allClients }) {
  const navigate = useNavigate();
  return (
    <Page title='Clients'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <HeaderMenu handleOnClick={(data) => navigate(`/dashboard/${data}/`)} page={'Clients'} listOfButtons={button} />
        </Stack>
        <DataTable {...allClients} route='/dashboard/clientDetails/' />
      </Container>
    </Page>
  );
}

const button = [{ name: 'newClient', variant: 'contained', icon: plusFill, htmlName: 'New Client' }];
