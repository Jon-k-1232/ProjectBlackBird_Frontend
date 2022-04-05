import { tableAndLabelCreation } from './Adapters/AdapterHelperFunctions';
import config from '../config';
import pMemoize from 'p-memoize';

/**
 * Gets all company information
 * @returns [{},{},{}] Array of objects
 */
export const getAllCompanies = pMemoize(
  () => {
    return fetch(`${config.API_ENDPOINT}/contacts/all`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { allContactInfo } = data;
        return tableAndLabelCreation(allContactInfo, 'oid', 'company');
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },
  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 * Gets company information via query
 * @param {*} companyId Integer oid of company
 * @returns {object} Object is company information
 */
export const getCompanyInformation = companyId => {
  return fetch(`${config.API_ENDPOINT}/contacts/company/${companyId}`, {
    method: 'GET'
    // headers: {
    //   'content-type': 'application/json',
    //   Authorization: `Bearer ${config.API_KEY2}`,
    //   Origin: `${config.FRONT_WEB}`
    // }
  })
    .then(resp => {
      if (!resp.ok) {
        throw new Error(resp.status);
      }
      return resp.json();
    })
    .then(data => {
      return data.companyContactInformation[0];
    })
    .catch(error => {
      console.log(error);
      return error;
    });
};

/**
 *
 */
export const getCompanyTransactions = pMemoize(
  (companyId, time) => {
    const allCompanyTransactions = fetch(`${config.API_ENDPOINT}/transactions/companyTransactions/${companyId}/${time}`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { sortedCompanyTransactions } = data;
        return sortedCompanyTransactions.length > 0 ? tableAndLabelCreation(sortedCompanyTransactions, 'oid', 'company') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
    return allCompanyTransactions;
  },
  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 *
 */
export const getCompanyInvoices = pMemoize(
  companyId => {
    return fetch(`${config.API_ENDPOINT}/invoices/all/company/${companyId}`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { invoicesWithNoDetail } = data;
        return invoicesWithNoDetail.length > 0 ? tableAndLabelCreation(invoicesWithNoDetail, 'oid', 'contactName') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },
  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 *
 */
export const getAllTransactions = pMemoize(
  time => {
    return fetch(`${config.API_ENDPOINT}/transactions/all/${time}`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { allTransactions } = data;
        return allTransactions.length > 0 ? tableAndLabelCreation(allTransactions, 'oid', 'company') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },

  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 *
 */
export const getJobTransactions = pMemoize(
  (companyId, jobId) => {
    return fetch(`${config.API_ENDPOINT}/transactions/jobTransactions/${companyId}/${jobId}`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { jobTransactions } = data;
        return jobTransactions.length > 0 ? tableAndLabelCreation(jobTransactions, 'jobDefinition', 'description') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },

  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 *
 */
export const getAllJobs = pMemoize(
  time => {
    return fetch(`${config.API_ENDPOINT}/jobs/allJobs/${time}`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { allJobsWithinTimeframe } = data;
        return allJobsWithinTimeframe.length > 0 ? tableAndLabelCreation(allJobsWithinTimeframe, 'jobDefinition', 'description') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },
  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 *
 */
export const getCompanyJobs = pMemoize(
  (companyId, time) => {
    return fetch(`${config.API_ENDPOINT}/jobs/all/${companyId}/${time}`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { jobs } = data;
        return jobs.length > 0 ? tableAndLabelCreation(jobs, 'jobDefinition', 'description') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },
  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 * Gets all job types/descriptions/definitions
 */
export const getAllJobDefinitions = pMemoize(
  () => {
    return fetch(`${config.API_ENDPOINT}/jobDescription/all`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { allJobDescriptions } = data;
        return allJobDescriptions.length > 0 ? tableAndLabelCreation(allJobDescriptions, 'oid', 'description') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },
  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 * Gets all Employees active and inactive
 * @returns [{},{},{}] Array of objects. Each object is a employee
 */
export const getAllEmployees = pMemoize(
  () => {
    return fetch(`${config.API_ENDPOINT}/employee/all`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { employees } = data;
        return employees.length > 0 ? tableAndLabelCreation(employees, 'oid', 'firstName', 'lastName', 'employees') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },
  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);

/**
 * Gets all invoices
 * @param {*} time Integer in days. How many days in past
 * @returns [{},{},{}] arrays of objects, each object is a invoice
 */
export const getAllInvoices = pMemoize(
  time => {
    return fetch(`${config.API_ENDPOINT}/invoices/all/time/${time}`, {
      method: 'GET'
      // headers: {
      //   'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
      // }
    })
      .then(resp => {
        if (!resp.ok) {
          throw new Error(resp.status);
        }
        return resp.json();
      })
      .then(data => {
        const { invoices } = data;
        return invoices.length > 0 ? tableAndLabelCreation(invoices, 'oid', 'contactName') : [];
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  },
  { cacheKey: arguments_ => JSON.stringify(arguments_) }
);
