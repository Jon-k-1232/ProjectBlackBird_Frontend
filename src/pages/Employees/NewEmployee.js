import { useState } from 'react';
import { Stack, TextField, Card, Button, CardContent, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

export default function NewEmployee() {
  const [checked, setChecked] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [hourlyCost, setHourlyCost] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const dataToPost = objectToPost();
    console.log(dataToPost);
    resetForm();
    // TODO Handle DATA
  };

  const objectToPost = () => {
    return {
      firstName: firstName,
      lastName: lastName,
      middleI: middleName,
      hourlyCost: hourlyCost,
      inactive: checked
    };
  };

  const resetForm = () => {
    setChecked(true);
    setFirstName('');
    setLastName('');
    setMiddleName('');
    setHourlyCost('');
  };

  return (
    <Card style={{ marginTop: '25px' }}>
      <CardContent style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <TextField
                fullWidth
                required
                type='text'
                max='26'
                label='First name'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <TextField fullWidth required type='26' max='100' label='Last name' value={lastName} onChange={e => setLastName(e.target.value)} />
              <TextField
                fullWidth
                required
                type='text'
                max='15'
                label='Middle name'
                value={middleName}
                onChange={e => setMiddleName(e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 8 }}>
              <TextField required type='text' max='6' label='Hourly Cost' value={hourlyCost} onChange={e => setHourlyCost(e.target.value)} />
            </Stack>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />} label='Active' />
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
