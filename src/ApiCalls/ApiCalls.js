import companies from '../_mocks_/companies_mock';
import jobs from '../_mocks_/jobs_mock';
import jobDefinitions from '../_mocks_/jobDefinitions_mock';
import employees from '../_mocks_/employees_mock';
import allTransactions from '../_mocks_/allTransactions_mock';
import { tableAndLabelCreation } from './Adapters/AdapterHelperFunctions';

export const getAllCompanies = () => {
  const allCompanies = tableAndLabelCreation(companies, 'oid', 'company');
  return { allCompanies };
};

export const getAllTransactions = () => {
  // Formatting for tables and drops
  const transactions = tableAndLabelCreation(allTransactions, 'oid', 'company');
  return { transactions };
};

export const getAllJobs = () => {
  // mock data
  const rawAllJobs = jobs;
  // Formatting for tables and drops
  const allJobs = tableAndLabelCreation(rawAllJobs, 'jobDefinition', 'description');
  return { allJobs };
};

export const getCompanyJobs = companyOid => {
  // toDo company oid will be passed to api to get all jobs for that company
  // mock data
  const rawAllJobs = jobs;
  // Formatting for tables and drops
  const allCompanyJobs = tableAndLabelCreation(rawAllJobs, 'jobDefinition', 'description');
  return { allCompanyJobs };
};

export const getAllJobCodes = () => {
  const allJobCodes = tableAndLabelCreation(jobDefinitions, 'oid', 'description');
  return { allJobCodes };
};

export const getAllEmployees = () => {
  // Formatting for tables and drops
  const allEmployees = tableAndLabelCreation(employees, 'oid', 'firstName', 'lastName', 'employees');
  return { allEmployees };
};