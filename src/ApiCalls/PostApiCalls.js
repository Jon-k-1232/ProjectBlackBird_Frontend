import config from '../config';

export const postTransactions = async transaction => {
  return fetch(`${config.API_ENDPOINT}/transactions/new/addNewTransaction`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(transaction)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const updateContact = async (contact, companyId) => {
  return fetch(`${config.API_ENDPOINT}/contacts/update/contact/${companyId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(contact)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const createNewContact = async contact => {
  return fetch(`${config.API_ENDPOINT}/contacts/new/contact`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(contact)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const updateEmployee = async (employee, employeeId) => {
  return fetch(`${config.API_ENDPOINT}/employee/update/employee/${employeeId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(employee)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const createEmployee = async employee => {
  return fetch(`${config.API_ENDPOINT}/employee/new/employee`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(employee)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const createNewJob = async job => {
  return fetch(`${config.API_ENDPOINT}/jobs/addJob`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(job)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const updateJobDefinition = async (jobDefinition, definitionId) => {
  return fetch(`${config.API_ENDPOINT}/jobDescription/update/jobDescription/${definitionId}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(jobDefinition)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const createJobDefinition = async jobDefinition => {
  return fetch(`${config.API_ENDPOINT}/jobDescription/new/addNewDescription`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(jobDefinition)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const createInvoices = async (invoiceIds, roughDraft, createPdf) => {
  return fetch(`${config.API_ENDPOINT}/create/createInvoices/readyToBill/${invoiceIds}/${roughDraft}/${createPdf}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(invoiceIds)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const postInvoiceUpdate = async invoice => {
  return fetch(`${config.API_ENDPOINT}/invoices/updateInvoice`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
      //   Authorization: `Bearer ${config.API_KEY2}`,
      //   Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify(invoice)
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const zeroAndDeactivateUserAccount = async companyIds => {
  return fetch(`${config.API_ENDPOINT}/contacts/zeroAndDeactivate`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify({ companyIds: [companyIds] })
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};

export const zeroCompanyAccount = async companyIds => {
  return fetch(`${config.API_ENDPOINT}/contacts/zeroOutCompany`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      //   Authorization: `Bearer ${config.API_KEY2}`,
      Origin: `${config.FRONT_WEB}`
    },
    body: JSON.stringify({ companyIds: [companyIds] })
  })
    .then(res => res.json())
    .then(res => res)
    .catch(error => error);
};
