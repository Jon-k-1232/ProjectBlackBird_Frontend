import { Box, Container } from '@mui/material';
import { getCompanies } from 'src/ApiCalls/ApiCalls';
// import DataTable from '../Components/DataTable/DataTable';
// import ContactCard from '../Components/ContactCard/ContactCard';
import Page from '../Components/Page';
// import dummyContact from '../_mocks_/contactCard_mock';
// import dummyTableData from '../_mocks_/dataTable_mock';

export default function DashboardApp() {
  return (
    <Page title='Dashboard'>
      <Container maxWidth='xl'>
        <Box sx={{ pb: 5 }}>{/* <ContactCard data={dummyContact} /> */}</Box>
      </Container>
    </Page>
  );
}
