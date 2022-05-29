// import { tableAndLabelCreation } from './Adapters/AdapterHelperFunctions';
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
