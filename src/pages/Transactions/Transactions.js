import { Container, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import Page from '../../Components/Page';
import dummyTableData from '../../_mocks_/dataTable_mock';
import DataTable from '../../Components/DataTable/DataTable';

export default function Transactions() {
  const navigate = useNavigate();

  return (
    <Page title='Transactions'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' sx={{ mb: 5 }}>
            Transactions
          </Typography>
          <Button
            onClick={navigate('/dashboard/newTransaction/')}
            variant='contained'
            component={RouterLink}
            to='#'
            startIcon={<Icon icon={plusFill} />}>
            New Transaction
          </Button>
        </Stack>
        <DataTable name='Client List' data={dummyTableData} />
      </Container>
    </Page>
  );
}
