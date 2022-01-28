// Gets headers, capitolizes the first letters, and inserts spaces between numbers and caps.
export const getTableHeaders = rawData => {
  const columns = Object.keys(rawData[0]);

  return columns.map(
    item =>
      item.charAt(0).toUpperCase() +
      item
        .slice(1)
        .match(/[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g)
        .join()
        .replace(/,/g, ' ')
  );
};

// Makes table data
export const getDataTable = rawData => {
  // Gets the values of the passed data. Converts from object to array
  const tableValues = rawData.map(Object.values);

  // Stringifys each individual Value
  return tableValues.map(item =>
    item.map(value => {
      let stringedItem = value;
      if (typeof value !== 'string') {
        stringedItem = JSON.stringify(value);
      }
      return stringedItem;
    })
  );
};

export const getFormValues = rawData => {
  return rawData.map(item => {
    item.value = item.oid;
    item.label = item.companyName;
    return item;
  });
};

// Adapter for Clients table
export const companyDataAdapter = rawData => {
  const tableHeaders = getTableHeaders(rawData);
  const tableData = getDataTable(rawData);
  getFormValues(rawData);
  return { tableHeaders, tableData, rawData };
};
