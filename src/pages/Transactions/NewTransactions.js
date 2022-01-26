import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider, FormikConsumer } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, Card, Button, Typography, Container } from '@mui/material';
import Page from '../../Components/Page';
import { FormControlLabel, Autocomplete, Checkbox } from '@mui/material';
import { getCompanyJobs, postTransaction } from '../../ApiCalls/ApiCalls';
import dayjs from 'dayjs';

export default function NewTransactions({ allClients, allEmployees, passedCompany }) {
  const navigate = useNavigate();

  // ToDo Form final post object
  // ToDo Write form validations to ensure only good data

  const [showDiscount, setShowDiscount] = useState(false);
  const [transactionType, setTransactionType] = useState(null);
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState(null);

  useEffect(() => {
    if (company) {
      const allJobs = getCompanyJobs(company);
      setCompanyJobs(allJobs.rawData);
    }
  }, [company]);

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
      ignoreInAgeing: null
    },
    // validationSchema: RegisterSchema,
    onSubmit: (values, { resetForm }) => {
      const updatedValues = checkValuesOne(values);
      console.log(updatedValues);
      resetForm({ values: '' });
      // navigate('/dashboard', { replace: true });
    }
  });

  // Formik constants
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, values } = formik;
  const { discount, quantity, unitTransaction, totalTransaction } = formik.values;

  // Calculations for sub totals, totals and discounts
  const subTotal = Math.abs(parseFloat(quantity * unitTransaction).toFixed(2));
  const amountToDiscount = Math.abs(parseFloat(subTotal - (subTotal * (100 - discount)) / 100).toFixed(2));
  const totalCharges = discount ? Math.abs(parseFloat((subTotal * (100 - discount)) / 100).toFixed(2)) : Math.abs(subTotal);
  const totalPayment =
    transactionType === 'Charge' ? Math.abs(parseFloat(totalTransaction).toFixed(2)) : parseFloat(totalTransaction).toFixed(2);

  // Checking values of form, edge cases
  const checkValuesOne = formikValues => {
    if (formikValues.discount < 0) formikValues.discount = Math.abs(formikValues.discount);

    if (formikValues.transactionType === 'Charge' && totalCharges >= 0 && !formikValues.discount) {
      formikValues.totalTransaction = parseInt(totalCharges, 10);
    } else if (formikValues.discount) {
      formikValues.totalTransaction = parseInt(totalCharges, 10);
    }

    // Handles edge cases for negative vs postive numbers being entered for transaction types
    if (formikValues.transactionType === 'Charge' && formikValues.unitTransaction <= 0) {
      formikValues.unitTransaction = Math.abs(formikValues.unitTransaction);
      formikValues.totalTransaction = Math.abs(formikValues.totalTransaction);
    } else if (formikValues.transactionType === 'Payment') {
      formikValues.unitTransaction = Math.abs(formikValues.totalTransaction);
      formikValues.totalTransaction = -Math.abs(formikValues.totalTransaction);
    } else if (formikValues.transactionType !== 'Charge' && formikValues.totalTransaction <= 0) {
      formikValues.unitTransaction = Math.abs(formikValues.totalTransaction);
      formikValues.totalTransaction = -Math.abs(formikValues.totalTransaction);
    }
    return formikValues;
  };

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
                  options={allClients.rawData || []}
                  value={company}
                  onChange={(e, v) => {
                    values.company = v.value;
                    console.log(v.value);
                    setCompany(v.value);
                  }}
                  label='Select Company'
                  sx={{ width: 300 }}
                  renderInput={params => <TextField {...params} label='Company' />}
                />

                <Autocomplete
                  disablePortal
                  disableClearable
                  required
                  id='combo-box-demo'
                  options={companyJobs || []}
                  onChange={(e, v) => (values.job = v.value)}
                  label='Select Job'
                  sx={{ width: 300 }}
                  renderInput={params => <TextField {...params} label='Job' />}
                />

                <Autocomplete
                  disablePortal
                  disableClearable
                  required
                  id='combo-box-demo'
                  options={allEmployees || []}
                  label='Select Employee'
                  sx={{ width: 300 }}
                  onChange={(e, v) => (values.employee = v.value)}
                  renderInput={params => <TextField {...params} label='Employee' />}
                />
              </Stack>

              <Autocomplete
                disablePortal
                disableClearable
                required
                id='transactionType'
                options={transactionTypes || []}
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
                <Container>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
                    <TextField id='outlined-required' type='number' {...getFieldProps('quantity')} label='Quantity' />

                    <Autocomplete
                      disablePortal
                      disableClearable
                      id='unitOfMeasurement'
                      options={type || []}
                      label='Unit of Measure'
                      sx={{ width: 300 }}
                      onChange={(e, v) => (values.unitOfMeasure = v.value)}
                      renderInput={params => <TextField {...params} label='Unit of Measure' />}
                    />

                    <TextField type='number' id='amountPerUnit' label='Amount Per Unit' {...getFieldProps('unitTransaction')} />
                  </Stack>

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
                        <TextField
                          id='outlined-required'
                          onInput={event => (event.target.value < 0 ? (event.target.value = 0) : event.target.value)}
                          type='number'
                          {...getFieldProps('discount')}
                          label='Discount Percentage'
                        />
                      )}
                      {showDiscount && <Typography>Amount to Discount ${amountToDiscount}</Typography>}
                    </Stack>
                  </Container>
                </Container>
              )}

              {/* Handles the total payment box hiding */}
              {transactionType !== null && transactionType !== 'Charge' && (
                <TextField
                  id='paymentAndAdjustmentInput'
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

              <TextField id='notes' label='Add Note' {...getFieldProps('noteOrDescription')} />

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
    label: 'Charge'
  },
  {
    value: 'Payment',
    label: 'Payment'
  },
  {
    value: 'Adjustment',
    label: 'Adjustment'
  }
];

const type = [
  {
    value: 'Hour',
    label: 'Hour'
  },
  {
    value: 'Each',
    label: 'Each'
  }
];
