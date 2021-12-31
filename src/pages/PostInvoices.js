import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import DataTable from '../components/DataTable/DataTable';
import dummyTableData from '../_mocks_/dataTable_mock';

export default function PostInvoices() {
  return (
    <Page title="Post Invoices">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Post Monthly Invoices
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            Post Monthly Invoices
          </Button>
        </Stack>
      </Container>
    </Page>
  );
}
