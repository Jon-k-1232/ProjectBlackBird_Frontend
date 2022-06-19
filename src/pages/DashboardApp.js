import { Box, Container } from '@mui/material';
import PaymentOptions from 'src/Components/TransactionTypes/PaymentOptions';
import Page from '../Components/Page';

export default function DashboardApp() {
  return (
    <Page title='Dashboard'>
      <Container maxWidth='xl'>
        <Box sx={{ pb: 5 }}>
          <PaymentOptions />
        </Box>
      </Container>
    </Page>
  );
}
