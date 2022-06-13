import { useEffect, useState } from 'react';
import { Stack, TextField, Card, Button, CardContent, Typography, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import SingleSelectionDropDown from '../../Components/DropDowns/SingleSelectionDropDown';
import { getAllCompanies, getAllJobDefinitions } from '../../ApiCalls/ApiCalls';
import { createNewJob } from '../../ApiCalls/PostApiCalls';
import dayjs from 'dayjs';
import AlertBanner from '../../Components/AlertBanner/AlertBanner';

export default function NewJob({ passedCompany }) {
  const [selectedCompany, setSelectedCompany] = useState(passedCompany ? passedCompany : null);
  const [allCompanies, setAllCompanies] = useState(null);
  const [selectedJobDescription, setJobDescription] = useState(null);
  const [allJobDescriptions, setAllJobDescriptions] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format());
  const [subDescription, setSubDescription] = useState('');
  const [checked, setChecked] = useState(false);
  const [postStatus, setPostStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allCompanies = await getAllCompanies();
      setAllCompanies(allCompanies.rawData);

      const allJobDescriptions = await getAllJobDefinitions();
      setAllJobDescriptions(allJobDescriptions.rawData);
    };
    fetchData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const dataToPost = objectToPost();
    const postedItem = await createNewJob(dataToPost);
    setPostStatus(postedItem.status);
    setTimeout(() => setPostStatus(null), 2000);
    resetForm();
  };

  const objectToPost = () => {
    return {
      jobDefinition: selectedJobDescription.oid,
      company: selectedCompany.oid,
      targetPrice: selectedJobDescription.defaultTargetPrice,
      startDate: selectedDate,
      contact: `${selectedCompany.firstName}, ${selectedCompany.lastName}`,
      contactPhone: selectedCompany.phoneNumber1,
      description: selectedJobDescription.description,
      defaultDescription: subDescription,
      isComplete: false
    };
  };

  const resetForm = () => {
    setSelectedCompany(null);
    setJobDescription(null);
    setSelectedDate(dayjs().format());
    setSubDescription('');
    setChecked(false);
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
                  setSelection={setJobDescription}
                  options={allJobDescriptions}
                  dropValue={selectedJobDescription}
                  labelPropertyOne='description'
                  dropPlaceholder='Select Job Description'
                />
                <DesktopDatePicker
                  label='Select Transaction Date'
                  inputFormat='MM/DD/YYYY'
                  value={selectedDate}
                  onChange={newValue => setSelectedDate(newValue.$d)}
                  renderInput={params => <TextField {...params} />}
                />
              </Stack>
              {selectedJobDescription && (
                <Stack>
                  <Typography>Target Job Price ${selectedJobDescription.defaultTargetPrice}</Typography>
                </Stack>
              )}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 1 }}>
                <TextField
                  fullWidth
                  required
                  type='text'
                  max='100'
                  label='Sub Description'
                  value={subDescription}
                  onChange={e => {
                    setSubDescription(e.target.value);
                  }}
                  helperText='Enter Sub Description of Job. This will show on bill.'
                />
              </Stack>
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />} label='Not Billable' />
              </FormGroup>
              <Button type='submit' name='submit'>
                Submit
              </Button>
              <AlertBanner postStatus={postStatus} type='Job' />
            </Stack>
          </form>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}
