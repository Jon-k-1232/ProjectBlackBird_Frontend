import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider, FormikConsumer } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Card, Button, Typography, Container } from '@mui/material';
import Page from '../../Components/Page';
import FormControlLabel from '@mui/material/FormControlLabel';
import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { getCompanies, getCompanyJobs, postTransaction } from '../../ApiCalls/ApiCalls';
import dayjs from 'dayjs';

export default function NewTransactions({ allClients, passedCompany }) {
  const navigate = useNavigate();

  // ToDo get dummy data for Jobs and Employees. Mimic Api Data
  // ToDo Form final post object

  const getAvailableJobsForCompany = companyOid => {
    const jobs = getCompanyJobs(companyOid);
    return jobs;
  };

  const [showDiscount, setShowDiscount] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [company, setCompany] = useState(null);

  const checkValuesForPost = valuesToPost => {
    if (valuesToPost.transactionType === 'Payment') {
      valuesToPost.unitTransaction = valuesToPost.totalTransaction;
      valuesToPost.totalTransaction = -Math.abs(valuesToPost.totalTransaction);
    }

    if (valuesToPost.transactionType === 'Charge') {
      valuesToPost.totalTransaction = valuesToPost.unitTransaction * valuesToPost.quantity;
    }
    // ToDo Handle for discounts

    return valuesToPost;
  };

  const formik = useFormik({
    initialValues: {
      company: passedCompany ? passedCompany.value : null,
      job: null,
      employee: null,
      transactionType: null,
      transactionDate: dayjs().format(),
      quantity: 1,
      unitOfMeasure: 'Each',
      unitTransaction: null,
      totalTransaction: 0.0,
      startTime: null,
      endTime: null,
      reference: null,
      noteOrDescription: null,
      discount: null,
      invoice: null,
      userTag: null,
      paymentApplied: null,
      ignoreInAgeing: null,
    },
    // validationSchema: RegisterSchema,
    onSubmit: () => {
      const updatedValues = checkValuesForPost(formik.values);
      console.log(updatedValues);
      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } = formik;
  const { discount, quantity, unitTransaction, totalTransaction } = formik.values;

  // Calculations for sub totals, totals and discounts
  const subTotal = parseFloat(quantity * unitTransaction).toFixed(2);
  const amountToDiscount = parseFloat(subTotal - (subTotal * (100 - discount)) / 100).toFixed(2);
  const totalCharges = discount ? parseFloat((subTotal * (100 - discount)) / 100).toFixed(2) : subTotal;
  const totalPayment = parseFloat(totalTransaction).toFixed(2);

  return (
    <Page style={{ marginTop: '25px' }} title='NewTransactions'>
      <Card style={{ padding: '20px' }}>
        <FormikProvider value={formik}>
          <Form id='transactionForm' onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  required
                  id='combo-box-demo'
                  options={allClients.rawData}
                  value={company}
                  onChange={(e, v) => {
                    values.company = v.value;
                    getAvailableJobsForCompany(v.value);
                    setCompany(v.label);
                  }}
                  label='Select Company'
                  sx={{ width: 300 }}
                  renderInput={params => <TextField {...params} label='Company' />}
                />

                <Autocomplete
                  disablePortal
                  disableClearable
                  // required
                  id='combo-box-demo'
                  options={''}
                  onChange={(e, v) => (values.job = v.value)}
                  label='Select Job'
                  sx={{ width: 300 }}
                  renderInput={params => <TextField {...params} label='Job' />}
                />

                <Autocomplete
                  disablePortal
                  disableClearable
                  // required
                  id='combo-box-demo'
                  options={''}
                  label='Select Employee'
                  sx={{ width: 300 }}
                  onChange={(e, v) => (values.employee = v.value)}
                  renderInput={params => <TextField {...params} label='Employee' />}
                />
              </Stack>

              <Autocomplete
                disablePortal
                disableClearable
                // required
                id='combo-box-demo'
                options={transactionTypes}
                sx={{ width: 300 }}
                value={transactionType}
                label={transactionType}
                onChange={(e, v) => {
                  values.transactionType = v.value;
                  setTransactionType(e.target.innerText);
                }}
                renderInput={params => <TextField {...params} label='Transaction Type' />}
              />

              {/* Will conditionally render the quantity, unit of Measure and amount per unit with transaction type is set to 'Charge' */}
              {transactionType === 'Charge' && (
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                  <TextField id='outlined-required' type='number' {...getFieldProps('quantity')} label='Quantity' />

                  <Autocomplete
                    disablePortal
                    disableClearable
                    // required
                    id='unitOfMeasurement'
                    options={type}
                    label='Unit of Measure'
                    sx={{ width: 300 }}
                    onChange={(e, v) => (values.unitOfMeasure = v.value)}
                    renderInput={params => <TextField {...params} label='Unit of Measure' />}
                  />

                  <TextField type='number' id='amountPerUnit' label='Amount Per Unit' {...getFieldProps('unitTransaction')} />
                </Stack>
              )}

              {/* Handles the total payment box hiding */}
              {transactionType !== null && transactionType !== 'Charge' && (
                <TextField
                  id='outlined-required'
                  sx={{ width: 300 }}
                  type='number'
                  {...getFieldProps('totalTransaction')}
                  label={`Enter ${transactionType} Amount`}
                  helperText={
                    transactionType === 'Adjustment' &&
                    '* When making a subtraction adjustment you will need to manually insert the subtraction sign ( - )'
                  }
                />
              )}

              {transactionType === 'Charge' && (
                <Container>
                  <Typography style={{ marginBottom: '20px', color: '#92999f' }} variant='h5'>
                    Sub Total $ {subTotal}
                  </Typography>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                      label='Discount'
                      control={
                        <Checkbox
                          checked={showDiscount}
                          onChange={e => {
                            setShowDiscount(e.target.checked);
                            if (!e.target.checked) formik.values.discount = null;
                          }}
                        />
                      }
                    />

                    {showDiscount && (
                      <TextField id='outlined-required' type='number' {...getFieldProps('discount')} label='Discount Percentage' />
                    )}
                    {showDiscount && <Typography>Amount to Discount ${amountToDiscount}</Typography>}
                  </Stack>
                </Container>
              )}

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                style={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography variant='h3'>Total {transactionType === 'Charge' ? totalCharges : totalPayment}</Typography>

                {discount && (
                  <Typography variant='caption' style={{ color: 'red' }}>
                    * Discount of {discount}% applied
                  </Typography>
                )}
              </Stack>

              <TextField id='outlined-required' label='Add Note' {...getFieldProps('noteOrDescription')} />

              <Button type='Submit' name='Submit' style={{ height: '30px', marginLeft: '10px' }}>
                Submit
              </Button>
            </Stack>
          </Form>
        </FormikProvider>
      </Card>
    </Page>
  );
}

const transactionTypes = [
  {
    value: 'Charge',
    label: 'Charge',
  },
  {
    value: 'Payment',
    label: 'Payment',
  },
  {
    value: 'Adjustment',
    label: 'Adjustment',
  },
];

const type = [
  {
    value: 'Hour',
    label: 'Hour',
  },
  {
    value: 'Each',
    label: 'Each',
  },
];
