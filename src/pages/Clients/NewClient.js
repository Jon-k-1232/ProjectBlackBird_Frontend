import { useState } from 'react';
import { Stack, TextField, Card, Button, Checkbox, FormGroup, CardContent, FormControlLabel } from '@mui/material';
// import { getAllEmployees } from '../../ApiCalls/ApiCalls';

export default function NewClient({ passedCompany }) {
  const [companyName, setCompanyName] = useState(passedCompany ? passedCompany.companyName : '');
  const [firstName, setFirstName] = useState(passedCompany ? passedCompany.firstName : '');
  const [lastName, setLastName] = useState(passedCompany ? passedCompany.lastName : '');
  const [middleName, setMiddleName] = useState(passedCompany ? passedCompany.middleI : '');
  const [address, setAddress] = useState(passedCompany ? passedCompany.address1 : '');
  const [city, setCity] = useState(passedCompany ? passedCompany.city : '');
  const [state, setState] = useState(passedCompany ? passedCompany.state : '');
  const [zip, setZip] = useState(passedCompany ? passedCompany.zip : '');
  const [country, setCountry] = useState(passedCompany ? passedCompany.country : '');
  const [phone, setPhone] = useState(passedCompany ? passedCompany.phone : '');
  const [mobilePhone, setMobilePhone] = useState(passedCompany ? passedCompany.mobilePhone : '');
  const [billableChecked, setBillableChecked] = useState(passedCompany ? !passedCompany.notBillable : true);
  const [activeChecked, setActiveChecked] = useState(passedCompany ? !passedCompany.inactive : true);

  console.log(passedCompany);

  // // Resets amount fields when type of transaction is switched. This solves amount carrying over from charge to write of and others.
  const resetQuantityAmountAndTotal = () => {
    setCompanyName('');
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setAddress('');
    setCity('');
    setState('');
    setZip('');
    setCountry('');
    setPhone('');
    setMobilePhone('');
    setBillableChecked(true);
    setActiveChecked(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const objectToPost = formObjectForPost();
    resetQuantityAmountAndTotal();
    console.log(objectToPost);
    // TODO Handle DATA
  };

  const formObjectForPost = () => {
    return {
      newBalance: passedCompany ? passedCompany.newBalance : false,
      balanceChanged: passedCompany ? passedCompany.balanceChanged : false,
      companyName: companyName,
      firstName: firstName,
      lastName: lastName,
      middleI: middleName,
      address1: address,
      address2: passedCompany ? passedCompany.address2 : null,
      city: city,
      state: state,
      zip: zip,
      country: country,
      phoneNumber1: phone,
      mobilePhone: mobilePhone,
      currentBalance: passedCompany ? passedCompany.currentBalance : 0.0,
      beginningBalance: passedCompany ? passedCompany.beginningBalance : 0.0,
      statementBalance: passedCompany ? passedCompany.statementBalance : 0.0,
      inactive: !activeChecked,
      originalCurrentBalance: passedCompany ? passedCompany.originalCurrentBalance : 0.0,
      notBillable: !billableChecked
    };
  };

  return (
    <Card style={{ marginTop: '25px' }}>
      <CardContent style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <TextField required type='text' value={companyName} onChange={e => setCompanyName(e.target.value)} label='Company Name' />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <TextField required type='text' value={firstName} onChange={e => setFirstName(e.target.value)} label='First Name' />
              <TextField required type='text' value={lastName} onChange={e => setLastName(e.target.value)} label='Last Name' />
              <TextField required type='text' value={middleName} onChange={e => setMiddleName(e.target.value)} label='Middle Name' />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <TextField required type='text' value={address} onChange={e => setAddress(e.target.value)} label='Street' />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <TextField required type='text' value={city} onChange={e => setCity(e.target.value)} label='City' />
              <TextField required type='text' value={state} onChange={e => setState(e.target.value)} label='State' />
              <TextField required type='number' value={zip} onChange={e => setZip(e.target.value)} label='Zip' />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <TextField required type='text' value={country} onChange={e => setCountry(e.target.value)} label='Country' />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <TextField required type='tel' value={phone} onChange={e => setPhone(e.target.value)} label='Phone' />
              <TextField required type='tel' value={mobilePhone} onChange={e => setMobilePhone(e.target.value)} label='Mobile Phone' />
            </Stack>

            <FormGroup style={{ display: 'inline' }}>
              <FormControlLabel
                control={<Checkbox checked={billableChecked} onChange={e => setBillableChecked(e.target.billableChecked)} />}
                label='Billable'
              />
              <FormControlLabel
                control={<Checkbox checked={activeChecked} onChange={e => setActiveChecked(e.target.activeChecked)} />}
                label='Active'
              />
            </FormGroup>

            <Button type='submit' name='submit'>
              Submit
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}

/**
 * react-hook-form
 * 
 * <TextField
     type="number"
     {...register("phonenum",{
         required: {
             value: true,
             message: 'Please fill this field',
         },
         pattern: {
             value: /^[1-9]\d*(\d+)?$/i,
             message: 'Please enter an integer',
         },
         min: {
             value: 1,
             message: 'Value should be atleast 1',
         },
   })}
   error={errors?.index ? true : false}
   helperText={errors?.index?.message}
/>
 */
