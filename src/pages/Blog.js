import { Container, Stack, Typography } from '@mui/material';

import Page from '../components/Page';

export default function Blog() {
  return (
    <Page title="Dashboard">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Blog
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
