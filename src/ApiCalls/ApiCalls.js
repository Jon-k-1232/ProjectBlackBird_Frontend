import dummyTableData from '../_mocks_/dataTable_mock';

export const getCompanies = () => {
  const cache = dummyTableData;
  return cache;
};

export const fetchCompanyTransactions = () => {
  const allCompanies = 'Transactions Working';
  return allCompanies;
};

export const postTransaction = postTransactionData => {
  const confirm = postTransactionData;
  return confirm;
};

export const getCompanyJobs = companyOid => {
  const jobInfo = [{}, {}];
  return jobInfo;
};
