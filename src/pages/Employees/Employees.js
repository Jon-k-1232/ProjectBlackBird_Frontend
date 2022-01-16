import plusFill from '@iconify/icons-eva/plus-fill';
import { useNavigate } from 'react-router-dom';
import { Stack, Container } from '@mui/material';
import Page from '../../Components/Page';
import DataTable from '../../Components/DataTable/DataTable';
import HeaderMenu from '../../Components/HeaderMenu/HeaderMenu';

export default function Employees() {
  const navigate = useNavigate();

  return (
    <Page title='employees'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <HeaderMenu handleOnClick={(data) => navigate(`/dashboard/${data}/`)} page={'Employees'} listOfButtons={button} />
        </Stack>
      </Container>
      <DataTable data={''} />
    </Page>
  );
}

const button = [{ name: 'newEmployee', variant: 'contained', icon: plusFill, htmlName: 'Add Employee' }];
