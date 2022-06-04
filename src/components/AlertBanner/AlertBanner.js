import { Alert } from '@mui/material';

export default function AlertBanner({ postStatus }) {
  return (
    <div>
      {postStatus === 200 && <Alert severity='success'>Transaction added successfully</Alert>}
      {postStatus !== 200 && postStatus !== null && <Alert severity='error'>Failed. Transaction was not added. Status Code:{postStatus}</Alert>}
    </div>
  );
}
