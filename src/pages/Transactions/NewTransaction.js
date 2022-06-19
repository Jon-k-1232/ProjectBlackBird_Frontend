import { useEffect, useState } from 'react';
import { Stack, Alert, TextField, Card, Button, Typography, CardContent } from '@mui/material';
import { DesktopDatePicker, TimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { getCompanyJobs, getAllEmployees, getAllCompanies } from '../../ApiCalls/ApiCalls';
import dayjs from 'dayjs';
import SingleSelectionDropDown from '../../Components/DropDowns/SingleSelectionDropDown';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { postTransactions } from '../../ApiCalls/PostApiCalls';
import AlertBanner from 'src/Components/AlertBanner/AlertBanner';

export default function NewTransactions({
  passedCompany,
  setCompanyToGetOutstandingInvoice,
  outstandingInvoices,
  setTransaction,
  setContactCard
}) {
  const [selectedCompany, setSelectedCompany] = useState(passedCompany ? passedCompany : null);
  const [allCompanies, setAllCompanies] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [companyJobList, setCompanyJobList] = useState(null);
  const [allEmployees, setAllEmployees] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format());
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState({
    displayValue: 'Each',
    value: 'each'
  });
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [invoice, setInvoice] = useState(null);
  const [confirmInvoice, setConfirmInvoice] = useState(null);
  const [postStatus, setPostStatus] = useState(null);
  const [invoiceAlert, setInvoiceAlert] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [invoiceFound, setInvoiceFound] = useState(null);
  const [calculationAlert, setCalculationAlert] = useState(false);
  const [startTime, setStartTime] = useState(dayjs().format());
  const [endTime, setEndTime] = useState(dayjs().format());

  useEffect(() => {
    const fetchData = async passedCompany => {
      const allCompanies = passedCompany ? passedCompany : await getAllCompanies();
      setAllCompanies(passedCompany ? passedCompany : allCompanies.rawData);

      const allEmployees = await getAllEmployees();
      setAllEmployees(allEmployees.rawData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async passedCompany => {
      if (selectedCompany) {
        const allJobs = passedCompany ? await getCompanyJobs(passedCompany.oid, null) : await getCompanyJobs(selectedCompany.oid, null);
        setCompanyJobList(allJobs.rawData);
        setCompanyToGetOutstandingInvoice(selectedCompany);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [selectedCompany]);

  useEffect(() => {
    resetQuantityAmountAndTotal();
    if (selectedTransaction) {
      setTransaction(selectedTransaction.value);
    }

    if (selectedTransaction !== 'payment' || selectedTransaction !== 'writeOff') {
      setInvoiceAlert(false);
      setInvoiceFound(null);
    }
    // eslint-disable-next-line
  }, [selectedTransaction]);

  // Resets amount fields when type of transaction is switched. This solves amount carrying over from charge to write of and others.
  const resetQuantityAmountAndTotal = () => {
    setSelectedQuantity(1);
    setSelectedAmount(null);
    setTotalTransaction(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const dataToPost = formObjectForPost();
    const postedItem = await postTransactions(dataToPost);
    setPostStatus(postedItem.status);
    passedCompany && setContactCard(postedItem.updatedAccountInfo[0]);
    setTimeout(() => setPostStatus(null), 4000);
    setTimeout(() => setInvoiceFound(null), 4000);
    setTimeout(() => setCalculationAlert(null), 4000);
    resetState();
  };

  const formObjectForPost = () => {
    const postObj = {
      company: selectedCompany.oid,
      job: selectedJob.oid,
      employee: selectedEmployee.oid,
      transactionType: selectedTransaction.displayValue,
      transactionDate: dayjs(selectedDate).format(),
      quantity: selectedQuantity,
      unitOfMeasure: selectedType.displayValue,
      unitTransaction: selectedAmount,
      totalTransaction: totalTransaction,
      discount: 0,
      invoice: confirmInvoice,
      paymentApplied: false,
      ignoreInAgeing: false
    };
    return postObj;
  };

  const resetState = () => {
    setSelectedCompany(passedCompany ? passedCompany : null);
    setAllCompanies(null);
    setSelectedJob(null);
    setCompanyJobList(null);
    setAllEmployees(null);
    setSelectedEmployee(null);
    setSelectedTransaction(null);
    setSelectedDate(dayjs().format());
    setSelectedQuantity(1);
    setSelectedType(null);
    setSelectedAmount(null);
    setTotalTransaction(0);
    setInvoice(null);
    setConfirmInvoice(null);
  };

  const confirmIfInvoiceFound = (invoiceNum, field) => {
    const matchInvoices = outstandingInvoices.rawData.find(invoice => Number(invoice.invoiceNumber) === Number(invoiceNum));
    if (matchInvoices && invoiceNum === invoice && field === 'confirmField') {
      setInvoiceFound(true);
      setInvoiceAlert(false);
      setDisableSubmit(false);
    } else if (matchInvoices && invoiceNum === confirmInvoice && field === 'firstInvoiceField') {
      setInvoiceFound(true);
      setInvoiceAlert(false);
      setDisableSubmit(false);
    } else {
      setInvoiceFound(false);
      setDisableSubmit(true);
      setInvoiceAlert(true);
    }
  };

  const handleTimeCalculation = () => {
    const loggedTime = timeCalculation(startTime, endTime);
    setSelectedQuantity(loggedTime);
    setSelectedType({
      displayValue: 'Hour',
      value: 'hour'
    });
    if (selectedEmployee) {
      const employeeRate = selectedEmployee.hourlyCost;
      setSelectedAmount(employeeRate);
      const total = (Number(employeeRate) * Number(loggedTime)).toFixed(2);
      setTotalTransaction(total);
      setCalculationAlert(false);
    } else {
      setCalculationAlert(true);
    }
  };

  return (
    <Card style={{ marginTop: '25px' }}>
      <CardContent style={{ padding: '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                <SingleSelectionDropDown
                  setSelection={setSelectedCompany}
                  options={allCompanies}
                  dropValue={selectedCompany}
                  labelPropertyOne='companyName'
                  valueProperty='oid'
                  dropPlaceholder='Select Company'
                />

                <SingleSelectionDropDown
                  setSelection={setSelectedJob}
                  options={companyJobList}
                  dropValue={selectedJob}
                  labelPropertyOne='description'
                  valueProperty='jobDefinition'
                  dropPlaceholder='Select Job'
                />

                <SingleSelectionDropDown
                  setSelection={setSelectedEmployee}
                  options={allEmployees}
                  dropValue={selectedEmployee}
                  labelPropertyOne='firstName'
                  labelPropertyTwo='lastName'
                  valueProperty='oid'
                  dropPlaceholder='Select Employee'
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                <SingleSelectionDropDown
                  setSelection={setSelectedTransaction}
                  options={transactionTypes}
                  dropValue={selectedTransaction}
                  labelPropertyOne='displayValue'
                  valueProperty='value'
                  dropPlaceholder='Select Transaction Type'
                />

                <DesktopDatePicker
                  label='Select Transaction Date'
                  inputFormat='MM/DD/YYYY'
                  value={selectedDate}
                  onChange={newValue => setSelectedDate(newValue.$d)}
                  renderInput={params => <TextField {...params} />}
                />
              </Stack>

              {/* TODO add 'writeOff' */}
              {selectedTransaction && selectedTransaction.value === 'payment' && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                  <TextField
                    required
                    type='number'
                    value={invoice}
                    onChange={e => {
                      setInvoice(e.target.value);
                      confirmIfInvoiceFound(e.target.value, 'firstInvoiceField');
                    }}
                    label='Invoice Number'
                    helperText='This field is required in order to match the payment to the invoice. INVOICE NUMBER IS REQUIRED.'
                  />

                  <TextField
                    required
                    type='number'
                    value={confirmInvoice}
                    onChange={e => {
                      setConfirmInvoice(e.target.value);
                      confirmIfInvoiceFound(e.target.value, 'confirmField');
                    }}
                    label='Invoice Confirmation'
                    helperText='This field is required in order to match the payment to the invoice. INVOICE NUMBER IS REQUIRED.'
                  />
                </Stack>
              )}
              {invoiceAlert && <Alert severity='error'>Invoice does not match</Alert>}
              {!invoiceFound && invoiceFound !== null && <Alert severity='error'>No Invoice Record Found</Alert>}
              {invoiceFound && !invoiceAlert && <Alert severity='success'>Invoice Record Found</Alert>}

              {selectedTransaction && selectedTransaction.value === 'charge' && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                  <TextField
                    required
                    type='number'
                    value={selectedQuantity}
                    onChange={e => {
                      setSelectedQuantity(e.target.value);
                      setTotalTransaction(Math.abs(e.target.value * selectedAmount).toFixed(2));
                    }}
                    label='Quantity'
                  />

                  <SingleSelectionDropDown
                    setSelection={setSelectedType}
                    options={type}
                    dropValue={selectedType}
                    labelPropertyOne='displayValue'
                    valueProperty='value'
                    dropPlaceholder='Select Unit Type'
                  />

                  <TextField
                    required
                    type='number'
                    max='10'
                    label='Amount Per Unit'
                    value={selectedAmount}
                    onChange={e => {
                      e.target.value >= 0 && setSelectedAmount(e.target.value);
                      setTotalTransaction(Math.abs(e.target.value * selectedQuantity).toFixed(2));
                    }}
                  />
                </Stack>
              )}
              {selectedTransaction && selectedTransaction.value === 'payment' && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                  <TextField
                    required
                    type='number'
                    max='10'
                    label='Payment Amount'
                    value={selectedAmount}
                    onChange={e => {
                      setSelectedAmount(e.target.value);
                      Math.abs(selectedAmount).toFixed(2);
                      setTotalTransaction(-Math.abs(e.target.value * selectedQuantity).toFixed(2));
                    }}
                    helperText='* Minus ( - ) already applied. Minus indicates payment/ credit'
                  />
                </Stack>
              )}
              {selectedTransaction && selectedTransaction.value === 'time' && (
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
                      <AlertBanner
                        message='There is an Error. Please check that employee is selected and that start and end times are in order.'
                        severity='error'
                      />
                    </Stack>
                  )}

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                    <Typography style={{ color: '#92999f' }} variant='subtitle2'>
                      Time:{selectedQuantity}
                    </Typography>
                    <Typography style={{ color: '#92999f' }} variant='subtitle2'>
                      Rate: {selectedAmount}
                    </Typography>
                  </Stack>
                </Stack>
              )}

              {selectedTransaction && selectedTransaction.value === 'adjustment' && (
                <Stack spacing={3}>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                    <TextField
                      required
                      type='number'
                      max='10'
                      label='Adjustment Amount'
                      value={selectedAmount}
                      onChange={e => {
                        setSelectedAmount(e.target.value);
                        setTotalTransaction((e.target.value * selectedQuantity).toFixed(2));
                      }}
                      helperText='* To make a credit to the job use the minus ( - ) in front of the amount.'
                    />
                  </Stack>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                    <Typography style={{ color: '#92999f' }} variant='subtitle2'>
                      *Please note that NEGATIVE adjustments can only be made to an account that has current transactions that have not yet been
                      invoiced. You can only adjust to the point that the current transactions hit "0". DO NOT OVER ADJUST THE CURRENT CYCLE
                      TRANSACTIONS TO A NEGATIVE BALANCE, STOP AT "0". If you wish to adjust an amount that appeared on a prior invoice, please
                      use 'Write Off' and reference the invoice.
                    </Typography>
                  </Stack>
                </Stack>
              )}
              {selectedTransaction && selectedTransaction.value === 'writeOff' && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                  <TextField
                    required
                    type='number'
                    max='10'
                    label='Write Off Amount'
                    value={selectedAmount}
                    onChange={e => {
                      e.target.value >= 0 && setSelectedAmount(e.target.value);
                      setTotalTransaction(-Math.abs(e.target.value * selectedQuantity).toFixed(2));
                    }}
                    helperText='* Amount will reflect as negative in total amount. This credits the account/job.'
                  />
                </Stack>
              )}
              <Typography style={{ color: '#92999f' }} variant='h5'>
                Total ${totalTransaction}
              </Typography>
              <Button disabled={disableSubmit} type='submit' name='submit'>
                Submit
              </Button>
              <AlertBanner postStatus={postStatus} type='Transaction' />
            </Stack>
          </form>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}

const transactionTypes = [
  {
    displayValue: 'Charge',
    value: 'charge'
  },
  {
    displayValue: 'Time',
    value: 'time'
  },
  {
    displayValue: 'Payment',
    value: 'payment'
  },
  {
    displayValue: 'Adjustment',
    value: 'adjustment'
  },
  {
    displayValue: 'Write Off',
    value: 'writeOff'
  }
];

const type = [
  {
    displayValue: 'Hour',
    value: 'hour'
  },
  {
    displayValue: 'Each',
    value: 'each'
  }
];

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
