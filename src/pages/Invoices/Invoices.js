import { Container, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import Page from '../../Components/Page';
import dummyTableData from '../../_mocks_/dataTable_mock';
import DataTable from '../../Components/DataTable/DataTable';

export default function Invoices() {
  const navigate = useNavigate();

  return (
    <Page title='Invoices'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <div>
            <Typography variant='h4' gutterBottom>
              Invoices
            </Typography>
          </div>
          <div style={{ width: '371px' }}>
            <Button
              onClick={navigate('/dashboard/newInvoice/')}
              style={{ marginRight: '10px' }}
              variant='contained'
              component={RouterLink}
              to='#'
              startIcon={<Icon icon={plusFill} />}>
              Create Monthly Invoices
            </Button>
            <Button style={{ marginRight: '10px' }} variant='contained' component={RouterLink} to='#' startIcon={<Icon icon={plusFill} />}>
              New Invoice
            </Button>
          </div>
        </Stack>
        <DataTable data={dummyTableData} />
      </Container>
    </Page>
  );
}
