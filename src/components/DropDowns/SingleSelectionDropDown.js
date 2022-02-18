import { Autocomplete, TextField } from '@mui/material';

export default function SingleSelectionDropDown({
  setSelection,
  options,
  dropValue,
  passedCompany,
  labelPropertyOne,
  labelPropertyTwo,
  dropPlaceholder
}) {
  const passedCompanyArray = passedCompany && [passedCompany];
  const optionslist = options ? options : [];

  return (
    <Autocomplete
      options={!passedCompany ? optionslist : passedCompanyArray}
      value={dropValue}
      getOptionLabel={
        labelPropertyTwo ? option => `${option[labelPropertyOne]} ${option[labelPropertyTwo]}` : option => option[labelPropertyOne]
      }
      onChange={(e, v) => {
        setSelection(v);
      }}
      sx={{ width: 350 }}
      renderInput={params => <TextField required {...params} label={dropPlaceholder} />}
    />
  );
}
