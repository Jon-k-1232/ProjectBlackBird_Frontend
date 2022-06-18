import { useEffect, useState } from 'react';
import { Stack, Alert, TextField, Card, Button, Typography, CardContent } from '@mui/material';
import { getCompanyJobs, getAllEmployees, getAllCompanies } from '../../ApiCalls/ApiCalls';
import dayjs from 'dayjs';
import SingleSelectionDropDown from '../../Components/DropDowns/SingleSelectionDropDown';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { postTransactions } from '../../ApiCalls/PostApiCalls';
import AlertBanner from 'src/Components/AlertBanner/AlertBanner';

export default function NewTransactions({ passedCompany, setCompanyToGetOutstandingInvoice, outstandingInvoices, setTransaction }) {
  const [selectedCompany, setSelectedCompany] = useState(passedCompany ? passedCompany : null);
  const [allCompanies, setAllCompanies] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [companyJobList, setCompanyJobList] = useState(null);
  const [allEmployees, setAllEmployees] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format());
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [invoice, setInvoice] = useState(null);
  const [confirmInvoice, setConfirmInvoice] = useState(null);
  const [postStatus, setPostStatus] = useState(null);
  const [invoiceAlert, setInvoiceAlert] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [invoiceFound, setInvoiceFound] = useState(null);

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
    console.log(dataToPost);
    const postedItem = await postTransactions(dataToPost);
    setPostStatus(postedItem.status);
    setTimeout(() => setPostStatus(null), 4000);
    setTimeout(() => setInvoiceFound(null), 4000);
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
      unitOfMeasure: selectedType ? selectedType.displayValue : 'Each',
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
              {selectedTransaction && selectedTransaction.value === 'writeOff' && (
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
              {selectedTransaction && selectedTransaction.value === 'adjustment' && (
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

// getOutstandingInvoiceForCompany;
