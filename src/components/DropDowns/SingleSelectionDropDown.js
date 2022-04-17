import { Autocomplete, TextField } from '@mui/material';

export default function SingleSelectionDropDown({ setSelection, options, dropValue, labelPropertyOne, labelPropertyTwo, dropPlaceholder }) {
  const optionslist = options ? options : [];

  return (
    <Autocomplete
      options={optionslist}
      value={dropValue}
      getOptionLabel={
        labelPropertyTwo ? option => `${option[labelPropertyOne]} ${option[labelPropertyTwo]}` : option => option[labelPropertyOne]
      }
      onChange={(e, v) => {
        if (v != null) {
          setSelection(v);
        }
      }}
      sx={{ width: 350 }}
      renderInput={params => <TextField required {...params} label={dropPlaceholder} />}
    />
  );
}
