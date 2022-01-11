import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from '../../Components/Page';
import dummyTableData from '../../_mocks_/dataTable_mock';
import DataTable from '../../Components/DataTable/DataTable';

export default function Jobs() {
  const navigate = useNavigate();
  return (
    <Page title='Jobs'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            Jobs
          </Typography>
          <Button
            onClick={navigate('/dashboard/newJob/')}
            variant='contained'
            component={RouterLink}
            to='#'
            startIcon={<Icon icon={plusFill} />}>
            Create New Job
          </Button>
        </Stack>
        <DataTable name='Client List' data={dummyTableData} />
      </Container>
    </Page>
  );
}
