import { Stack, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import DataTable from '../components/DataTable/DataTable';
import dummyTableData from '../_mocks_/dataTable_mock';
import ContactCard from '../components/ContactCard/ContactCard';
import dummyContact from '../_mocks_/contactCard_mock';

export default function Clients() {
  return (
    <Page title="Client Details">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Client Detail
          </Typography>
        </Stack>
        <ContactCard data={dummyContact} />
        <DataTable name="Client List" data={dummyTableData} />
      </Container>
    </Page>
  );
}
