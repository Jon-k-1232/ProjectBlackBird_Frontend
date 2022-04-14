import { Box, Container } from '@mui/material';
import Page from '../Components/Page';

export default function DashboardApp() {
  return (
    <Page title='Dashboard'>
      <Container maxWidth='xl'>
        <Box sx={{ pb: 5 }}>{/* <ContactCard data={dummyContact} /> */}</Box>
      </Container>
    </Page>
  );
}
