import { useEffect, useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Stack, TextField, Card, Button, Typography, Container } from '@mui/material';
import Page from '../../Components/Page';
import { FormControlLabel, Autocomplete, Checkbox } from '@mui/material';
import { getAllCompanies, getAllJobCodes } from '../../ApiCalls/ApiCalls';
import dayjs from 'dayjs';

export default function NewJob({ passedCompany }) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [allCompanies, setAllCompanies] = useState(null);
  const [allJobCodes, setAllJobCodes] = useState(null);

  useEffect(() => {
    const getAllCompanies = getAllCompanies();
    setAllCompanies(getAllCompanies.allCompanies.rawData);

    const getJobCodes = getAllJobCodes();
    setAllJobCodes(getJobCodes.allJobCodes.rawData);
  }, []);

  // Form value handler
  const formik = useFormik({
    initialValues: {
      oid: '',
      jobDefinition: '',
      company: '',
      targetPrice: '',
      defaultTargetPrice: '',
      scheduledDate: dayjs().format(),
      startDate: dayjs().format(),
      actualDate: dayjs().format(),
      contact: '',
      contactPhone: '',
      contactEmail: '',
      description: '',
      defaultDescription: '',
      percentComplete: '',
      discount: '',
      hoursToComplete: '',
      isComplete: ''
    },
    onSubmit: (values, { resetForm }) => {
      //ToDo create Post for new company job
      //ToDo anything need to be done with completed or other fields?
      console.log(values);
      resetForm({ values: '' });
    }
  });

  // Formik constants
  const { handleSubmit, getFieldProps, values } = formik;
  const passedCompanyArray = [passedCompany];

  return (
    <Page style={{ marginTop: '25px' }} title='NewTransactions'>
      <Typography variant='h3' style={{ marginBottom: '20px' }}>
        Create New Job for a Company
      </Typography>

      <Card style={{ padding: '20px' }}>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                <Autocomplete
                  required
                  disableClearable
                  options={!passedCompany ? allCompanies : passedCompanyArray}
                  label='Select Company'
                  sx={{ width: 300 }}
                  onChange={(e, v) => {
                    values.company = v.value;
                    values.contact = `${v.firstName} ${v.lastName}`;
                    values.contactPhone = v.phoneNumber1;
                    values.contactEmail = v.email;
                  }}
                  renderInput={params => <TextField required {...params} label='Company' />}
                />

                <Autocomplete
                  required
                  disableClearable
                  options={allJobCodes || []}
                  label='Select Job'
                  sx={{ width: 300 }}
                  onChange={(e, v) => {
                    values.job = v.value;
                    values.defaultDescription = v.description;
                  }}
                  renderInput={params => <TextField required {...params} label='Job' />}
                />
              </Stack>

              <TextField
                label='Add a sub description of job'
                max='300'
                {...getFieldProps('description')}
                helperText='Will display on clients bill'
              />

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
                style={{ display: 'flex', alignItems: 'start', marginTop: '30px' }}>
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
                  <Container>
                    <TextField
                      required
                      onInput={event => (event.target.value < 0 ? (event.target.value = 0) : event.target.value)}
                      type='number'
                      max='2'
                      {...getFieldProps('discount')}
                      label='Discount Percentage'
                    />
                    <Typography style={{ color: 'red' }}>
                      ** ALERT ** <br />
                      You are adding a discount the the job in its entirety. <br /> If you are wanting to add a one time discount log a new
                      charge in transactions.
                    </Typography>
                  </Container>
                )}
              </Stack>

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
