import { useEffect, useState } from 'react';
import { Stack, TextField, Card, Button, Typography, CardContent } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { getCompanyJobs, getAllEmployees, getAllCompanies } from '../../ApiCalls/ApiCalls';
import dayjs from 'dayjs';
import SingleSelectionDropDown from '../../Components/DropDowns/SingleSelectionDropDown';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { postTransactions } from '../../ApiCalls/PostApiCalls';
import AlertBanner from 'src/Components/AlertBanner/AlertBanner';
import PaymentOptions from 'src/Components/TransactionTypes/PaymentOptions';
import ChargeOptions from 'src/Components/TransactionTypes/ChargeOptions';
import WriteOffOptions from 'src/Components/TransactionTypes/WriteOffOptions';
import TimeOptions from 'src/Components/TransactionTypes/TimeOptions';
import AdjustmentOptions from 'src/Components/TransactionTypes/AdjustmentOptions';

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
  const [selectedType, setSelectedType] = useState('Each');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [postStatus, setPostStatus] = useState(null);
  const [invoice, setInvoice] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

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

  const handleSubmit = async e => {
    e.preventDefault();
    const dataToPost = formObjectForPost();
    const postedItem = await postTransactions(dataToPost);
    setPostStatus(postedItem.status);
    passedCompany && setContactCard(postedItem.updatedAccountInfo[0]);
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
      unitOfMeasure: selectedTransaction.displayValue === 'Time' ? 'Hour' : 'Each',
      unitTransaction: selectedAmount,
      totalTransaction: totalTransaction,
      discount: 0,
      invoice: invoice,
      paymentApplied: false,
      ignoreInAgeing: false
    };
    return postObj;
  };

  const resetState = () => {
    setSelectedCompany(passedCompany ? passedCompany : null);
    setSelectedJob(null);
    setCompanyJobList([]);
    setAllEmployees([]);
    setSelectedEmployee(null);
    setSelectedTransaction(null);
    setSelectedDate(dayjs().format());
    setSelectedQuantity(1);
    setSelectedType('Each');
    setSelectedAmount(null);
    setTotalTransaction(0);
    setInvoice('');
    setPostStatus(null);
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
                  setTransaction={type => setTransaction(type.value)}
                />

                <DesktopDatePicker
                  label='Select Transaction Date'
                  inputFormat='MM/DD/YYYY'
                  value={selectedDate}
                  onChange={newValue => setSelectedDate(newValue.$d)}
                  renderInput={params => <TextField {...params} />}
                />
              </Stack>

              {selectedTransaction && selectedTransaction.value === 'charge' && (
                <ChargeOptions
                  selectedQuantity={selectedQuantity}
                  setSelectedQuantity={quantity => setSelectedQuantity(quantity)}
                  setTotalTransaction={total => setTotalTransaction(total)}
                  selectedAmount={selectedAmount}
                  setSelectedAmount={amt => setSelectedAmount(amt)}
                  selectedType={selectedType}
                />
              )}
              {selectedTransaction && selectedTransaction.value === 'payment' && (
                <PaymentOptions
                  selectedAmount={selectedAmount}
                  setSelectedAmount={amt => setSelectedAmount(amt)}
                  setTotalTransaction={total => setTotalTransaction(total)}
                  selectedQuantity={selectedQuantity}
                  outstandingInvoices={outstandingInvoices}
                  setDisableSubmit={boolValue => setDisableSubmit(boolValue)}
                  setInvoice={invoiceNumber => setInvoice(invoiceNumber)}
                />
              )}
              {selectedTransaction && selectedTransaction.value === 'writeOff' && (
                <WriteOffOptions
                  selectedAmount={selectedAmount}
                  setSelectedAmount={amt => setSelectedAmount(amt)}
                  setTotalTransaction={total => setTotalTransaction(total)}
                  selectedQuantity={selectedQuantity}
                  outstandingInvoices={outstandingInvoices}
                  setDisableSubmit={boolValue => setDisableSubmit(boolValue)}
                  setInvoice={invoiceNumber => setInvoice(invoiceNumber)}
                />
              )}
              {selectedTransaction && selectedTransaction.value === 'time' && (
                <TimeOptions
                  selectedAmount={selectedAmount}
                  setSelectedAmount={amt => setSelectedAmount(amt)}
                  setTotalTransaction={total => setTotalTransaction(total)}
                  selectedQuantity={selectedQuantity}
                  setSelectedQuantity={quantity => setSelectedQuantity(quantity)}
                  selectedEmployee={selectedEmployee}
                  setDisableSubmit={setDisableSubmit}
                />
              )}

              {selectedTransaction && selectedTransaction.value === 'adjustment' && (
                <AdjustmentOptions
                  selectedQuantity={selectedQuantity}
                  setTotalTransaction={total => setTotalTransaction(total)}
                  selectedAmount={selectedAmount}
                  setSelectedAmount={amt => setSelectedAmount(amt)}
                />
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
