import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import DataTable from '../components/DataTable/DataTable';
import dummyTableData from '../_mocks_/dataTable_mock';

export default function Clients() {
  return (
    <Page title="Clients">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Clients
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Client
          </Button>
        </Stack>
        <DataTable name="Client List" data={dummyTableData} />
      </Container>
    </Page>
  );
}
