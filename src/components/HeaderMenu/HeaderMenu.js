import { Container, Stack, Button, Typography } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
import clipboardNotes from '@iconify/icons-foundation/clipboard-notes';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import baselineWork from '@iconify/icons-ic/baseline-work';
import clockFill from '@iconify/icons-eva/clock-fill';
import statisticsIcon from '@iconify/icons-whh/statistics';
// import moneyBillAlt from '@iconify/icons-fa-solid/money-bill-alt';
import { Icon } from '@iconify/react';

export default function HeaderMenu({ page, handleOnClick }) {
  return (
    <Container style={{ padding: '0' }}>
      <Stack direction='row' alignItems='left' justifyContent='space-between' mb={5}>
        <Typography variant='h4' gutterBottom>
          {page}
        </Typography>
        <Button
          onClick={(e) => handleOnClick(e.target.name)}
          name={'notes'}
          style={{ height: '30px' }}
          variant='contained'
          startIcon={<Icon icon={clipboardNotes} />}>
          Notes
        </Button>

        <Button
          onClick={(e) => handleOnClick(e.target.name)}
          name={'transactions'}
          style={{ height: '30px' }}
          variant='contained'
          startIcon={<Icon icon={clockFill} />}>
          Transactions
        </Button>

        <Button
          onClick={(e) => handleOnClick(e.target.name)}
          name={'jobs'}
          style={{ height: '30px' }}
          variant='contained'
          startIcon={<Icon icon={baselineWork} />}>
          Jobs
        </Button>

        <Button
          onClick={(e) => handleOnClick(e.target.name)}
          name={'invoices'}
          style={{ height: '30px' }}
          variant='contained'
          startIcon={<Icon icon={fileTextFill} />}>
          Invoices
        </Button>

        <Button
          onClick={(e) => handleOnClick(e.target.name)}
          name={'statistics'}
          style={{ height: '30px' }}
          variant='contained'
          startIcon={<Icon icon={statisticsIcon} />}>
          Statistics
        </Button>
      </Stack>
    </Container>
  );
}
