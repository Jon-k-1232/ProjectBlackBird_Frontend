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

export const getCompanyInformation = companyId => {
  //For mock purpose
  const mockCompany = companies[companyId];

  const selectedCompanyInfo = mockCompany;
  return { selectedCompanyInfo };
};

export const getCompanyTransactions = companyId => {
  const allCompanyTransactions = tableAndLabelCreation(allTransactions, 'oid', 'company');
  return { allCompanyTransactions };
};

export const getAllTransactions = () => {
  // Formatting for tables and drops
  const transactions = tableAndLabelCreation(allTransactions, 'oid', 'company');
  return { transactions };
};

export const getJobTransactions = jobId => {
  // Formatting for tables and drops
  const jobTransactions = tableAndLabelCreation(allTransactions, 'oid', 'company');
  return { jobTransactions };
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

export const getAllJobDefinitions = () => {
  const allJobDefinitions = tableAndLabelCreation(jobDefinitions, 'oid', 'description');
  return { allJobDefinitions };
};

export const getAllEmployees = () => {
  // Formatting for tables and drops
  const allEmployees = tableAndLabelCreation(employees, 'oid', 'firstName', 'lastName', 'employees');
  return { allEmployees };
};
