import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography } from '@mui/material';
import Page from '../../Components/Page';
import DataTable from '../../Components/DataTable/DataTable';

export default function Employees() {
  const navigate = useNavigate();

  return (
    <Page title='employees'>
      <Container style={{ maxWidth: '1280px' }}>
        <Stack direction='row' alignItems='center' justifyContent='space-between' mb={5}>
          <Typography variant='h4' gutterBottom>
            Employees
          </Typography>
          <Button
            onClick={navigate('/dashboard/newEmployee/')}
            variant='contained'
            component={RouterLink}
            to='#'
            startIcon={<Icon icon={plusFill} />}>
            Add Employee
          </Button>
        </Stack>
      </Container>
      <DataTable data={''} />
    </Page>
  );
}
