// Checking values of form, edge cases
const checkValuesOne = formikValues => {
  const subTotal = Math.abs(parseFloat(formikValues.quantity * formikValues.unitTransaction).toFixed(2));
  const totalCharges = formikValues.discount
    ? Math.abs(parseFloat((subTotal * (100 - formikValues.discount)) / 100).toFixed(2))
    : Math.abs(subTotal);

  if (formikValues.discount < 0) formikValues.discount = Math.abs(formikValues.discount);

  if (formikValues.transactionType === 'Charge' && totalCharges >= 0 && !formikValues.discount) {
    formikValues.totalTransaction = parseInt(totalCharges, 10);
  } else if (formikValues.discount) {
    formikValues.totalTransaction = parseInt(totalCharges, 10);
  }

  // Handles edge cases for negative vs positive numbers being entered for transaction types
  if ((formikValues.transactionType === 'Charge' || formikValues.transactionType === 'Adjustment') && formikValues.unitTransaction <= 0) {
    formikValues.unitTransaction = Math.abs(formikValues.unitTransaction);
    formikValues.totalTransaction = Math.abs(formikValues.totalTransaction);
  } else if (formikValues.transactionType === 'Payment') {
    // Handles sharing the unit transaction to transaction type 'payment'
    formikValues.unitTransaction = Math.abs(formikValues.totalTransaction);
    formikValues.totalTransaction = -Math.abs(formikValues.totalTransaction);
  } else if (formikValues.transactionType !== 'Charge' && formikValues.totalTransaction <= 0) {
    //handles if adjustment or charge that is a negative
    formikValues.unitTransaction = Math.abs(formikValues.totalTransaction);
    formikValues.totalTransaction = -Math.abs(formikValues.totalTransaction);
  }
  return formikValues;
};

export default checkValuesOne;
