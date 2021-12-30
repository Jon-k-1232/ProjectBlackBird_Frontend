import { Box, Container, Typography } from '@mui/material';
import ContactCard from '../components/ContactCard/ContactCard';
import Page from '../components/Page';
import dummyContact from '../_mocks_/contactCard_mock';

export default function DashboardApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          {/* <Typography variant="h4">Hi, Welcome back</Typography> */}
          <ContactCard data={dummyContact} />
        </Box>
      </Container>
    </Page>
  );
}
