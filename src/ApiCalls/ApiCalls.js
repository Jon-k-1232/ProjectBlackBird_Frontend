import dummyTableData from '../_mocks_/dataTable_mock';
import jobs from '../_mocks_/jobData_mock';
import { jobDataAdapter } from './JobDataAdapter';
import employees from '../_mocks_/employeeData_mock';

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
  // toDo company oid will be passed to api to get all jobs for that company
  const allJobs = jobDataAdapter(jobs);
  return allJobs;
};

export const getEmployees = () => {
  const allEmployees = employees;
  return allEmployees;
};
