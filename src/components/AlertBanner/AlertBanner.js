import { Alert } from '@mui/material';

export default function AlertBanner({ postStatus, type }) {
  return (
    <div>
      {postStatus === 200 && <Alert severity='success'>{type} added successfully</Alert>}
      {postStatus !== 200 && postStatus !== null && (
        <Alert severity='error'>
          Failed. {type} was not added. Status Code:{postStatus}
        </Alert>
      )}
    </div>
  );
}
