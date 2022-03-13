import { useState } from 'react';
import { Stack, TextField, Card, Button, CardContent, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

export default function NewJobDescription() {
  const [jobDescription, setJobDescription] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [billable, setBillable] = useState(null);
  const [checked, setChecked] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const dataToPost = objectToPost();
    console.log(dataToPost);
    resetForm();
    // TODO Handle DATA
  };

  const objectToPost = () => {
    return {
      description: jobDescription,
      defaultTargetPrice: targetPrice,
      billable: billable
    };
  };

  const resetForm = () => {
    setJobDescription('');
    setTargetPrice('');
    setBillable(null);
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
                max='100'
                label='General Job Description'
                value={jobDescription}
                onChange={e => {
                  setJobDescription(e.target.value);
                }}
                helperText='General job description. The sub description is added on the job.'
              />
              <TextField
                fullWidth
                required
                type='number'
                max='9'
                label='Target Price'
                value={targetPrice}
                onChange={e => {
                  setTargetPrice(e.target.value);
                }}
                helperText='How much on average does this job cost'
              />
            </Stack>
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={checked} onChange={e => setChecked(e.target.checked)} />} label='Not Billable' />
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
