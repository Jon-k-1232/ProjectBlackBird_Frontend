import { Box, Container, Typography } from '@mui/material';
import DataTable from '../components/DataTable/DataTable';
import ContactCard from '../components/ContactCard/ContactCard';
import Page from '../components/Page';
import dummyContact from '../_mocks_/contactCard_mock';
import dummyTableData from '../_mocks_/dataTable_mock';

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          {/* <Typography variant="h4">Hi, Welcome back</Typography> */}
          <ContactCard data={dummyContact} />
          <DataTable name="Client List" data={dummyTableData} />
        </Box>
      </Container>
    </Page>
  );
}
