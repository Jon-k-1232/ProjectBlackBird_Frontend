import { useState } from 'react';
import { Stack, Container, TextField, Button, Typography, Alert, Collapse, IconButton } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';

export default function TimeOptions({
  selectedAmount,
  setSelectedAmount,
  setTotalTransaction,
  selectedQuantity,
  setSelectedQuantity,
  selectedEmployee,
  setDisableSubmit
}) {
  const [calculationAlert, setCalculationAlert] = useState(false);
  const [startTime, setStartTime] = useState(dayjs().format());
  const [endTime, setEndTime] = useState(dayjs().format());
  const [open, setOpen] = useState(true);

  const handleTimeCalculation = () => {
    if (selectedEmployee && (selectedEmployee !== null || selectedEmployee !== undefined)) {
      const loggedTime = timeCalculation(startTime, endTime);
      setSelectedQuantity(loggedTime);
      const employeeRate = selectedEmployee.hourlyCost;
      setSelectedAmount(employeeRate);
      const total = (Number(employeeRate) * Number(loggedTime)).toFixed(2);
      setTotalTransaction(total);
      setCalculationAlert(false);
      setDisableSubmit(false);
    } else {
      setCalculationAlert(true);
    }
  };
  return (
    <Container>
      <Stack spacing={3}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
            <TimePicker label='Start Time' value={startTime} onChange={setStartTime} renderInput={params => <TextField {...params} />} />
            <TimePicker label='End Time' value={endTime} onChange={setEndTime} renderInput={params => <TextField {...params} />} />
            <Button onClick={handleTimeCalculation} style={{ height: '30px', margin: '10px' }}>
              Calculate Time
            </Button>
          </Stack>

          {calculationAlert && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label='close'
                      color='inherit'
                      size='small'
                      onClick={() => {
                        setOpen(false);
                      }}>
                      <CloseIcon fontSize='inherit' />
                    </IconButton>
                  }
                  severity='error'
                  sx={{ mb: 2 }}>
                  There is an Error. Please check that employee is selected and that start and end times are in order.
                </Alert>
              </Collapse>
            </Stack>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
            <Typography style={{ color: '#92999f', alignSelf: 'center' }} variant='subtitle1'>
              Time:{selectedQuantity}
            </Typography>
            <Typography style={{ color: '#92999f', alignSelf: 'center' }} variant='subtitle1'>
              Rate: {selectedAmount}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
const timeCalculation = (startTime, endTime) => {
  const mins = endTime.diff(startTime, 'minutes', true);
  const totalHours = parseInt(mins / 60);
  const totalMins = dayjs().minute(mins).$m + 1;
  let total = 0;

  switch (true) {
    case totalMins >= 0 && totalMins <= 6:
      total = `${totalHours}.1`;
      break;
    case totalMins >= 7 && totalMins <= 12:
      total = `${totalHours}.2`;
      break;
    case totalMins >= 13 && totalMins <= 18:
      total = `${totalHours}.3`;
      break;
    case totalMins >= 19 && totalMins <= 24:
      total = `${totalHours}.4`;
      break;
    case totalMins >= 25 && totalMins <= 30:
      total = `${totalHours}.5`;
      break;
    case totalMins >= 31 && totalMins <= 36:
      total = `${totalHours}.6`;
      break;
    case totalMins >= 37 && totalMins <= 42:
      total = `${totalHours}.7`;
      break;
    case totalMins >= 43 && totalMins <= 48:
      total = `${totalHours}.8`;
      break;
    case totalMins >= 49 && totalMins <= 54:
      total = `${totalHours}.9`;
      break;
    case totalMins >= 55 && totalMins <= 60:
      total = `${totalHours + 1}.0`;
      break;
    default:
      console.log('error caught at handleTimeCalculation()');
  }

  return total;
};
