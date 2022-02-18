import { useEffect, useState } from 'react';
import { Stack, TextField, Card, Button, Typography, CardContent } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import SingleSelectionDropDown from '../../Components/DropDowns/SingleSelectionDropDown';
import { getAllCompanies, getAllJobDefinitions, getCompanyInformation } from '../../ApiCalls/ApiCalls';
import dayjs from 'dayjs';

// TODO CREATE FORM FOR NEW JOB
export default function NewJob({ passedCompany }) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [allCompanies, setAllCompanies] = useState(null);
  const [selectedJobDescription, setJobDescription] = useState(null);
  const [allJobDescriptions, setAllJobDescriptions] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs().format());

  useEffect(() => {
    const companies = getAllCompanies();
    setAllCompanies(companies.allCompanies.rawData);

    if (passedCompany) {
      console.log('UPDATE PASSED COMPANY, EITHER OBJECT OR ID');
      const company = getCompanyInformation(passedCompany);
      setSelectedCompany(company.selectedCompanyInfo.rawData);
    }

    const allJobDescriptions = getAllJobDefinitions();
    setAllJobDescriptions(allJobDescriptions.allJobDefinitions.rawData);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('test');
    // TODO Handle DATA
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
                  passedCompany={passedCompany}
                  labelPropertyOne='companyName'
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
              <Button type='submit' name='submit'>
                Submit
              </Button>
            </Stack>
          </form>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
}
