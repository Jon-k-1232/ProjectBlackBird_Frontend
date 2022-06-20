import { useState } from 'react';
import { Container, Stack, TextField } from '@mui/material';
import InvoiceConfirmation from './InvoiceConfirmation';

export default function WriteOffOptions({
  selectedAmount,
  setSelectedAmount,
  setTotalTransaction,
  selectedQuantity,
  outstandingInvoices,
  setDisableSubmit,
  setInvoice
}) {
  const [disable, setDisable] = useState(true);
  return (
    <Container>
      <Stack spacing={3}>
        <InvoiceConfirmation
          outstandingInvoices={outstandingInvoices}
          setDisableSubmit={boolValue => setDisable(boolValue)}
          setInvoice={invoiceNumber => setInvoice(invoiceNumber)}
        />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
          <TextField
            required
            type='number'
            max='10'
            label='Write Off Amount'
            value={selectedAmount}
            onChange={e => {
              e.target.value >= 0 && setSelectedAmount(e.target.value);
              !disable && setDisableSubmit(false);
              setTotalTransaction(-Math.abs(e.target.value * selectedQuantity).toFixed(2));
            }}
            helperText='* Amount will reflect as negative in total amount. This credits the account/job.'
          />
        </Stack>
      </Stack>
    </Container>
  );
}
