import dummyTableData from '../_mocks_/companies_mock';
import jobs from '../_mocks_/jobData_mock';
import jobsAdapter from './Adapters/JobsAdapter';
import employees from '../_mocks_/employees_mock';
import employeesAdapter from './Adapters/EmployeeAdapter';
import allTransactions from '../_mocks_/allTransactions_mock';
import transactionsAdapter from './Adapters/TransactionsAdapter';
import { tableAndLabelCreation } from './Adapters/AdapterHelperFunctions';

export const getCompanies = () => {
  const cache = dummyTableData;
  return cache;
};

export const getAllTransactions = () => {
  // mock data
  const rawTransactions = transactionsAdapter(allTransactions);
  // Formatting for tables and drops
  const transactions = tableAndLabelCreation(rawTransactions, 'oid', 'company');
  return { transactions };
};

export const getCompanyJobs = companyOid => {
  // toDo company oid will be passed to api to get all jobs for that company
  // mock data
  const rawAllJobs = jobsAdapter(jobs);
  // Formatting for tables and drops
  const allCompanyJobs = tableAndLabelCreation(rawAllJobs, 'jobDefinition', 'description');
  return { allCompanyJobs };
};

export const getEmployees = () => {
  // mock data
  const rawAllEmployees = employeesAdapter(employees);
  // Formatting for tables and drops
  const allEmployees = tableAndLabelCreation(rawAllEmployees, 'oid', 'firstName', 'lastName', 'employees');
  return { allEmployees };
};
