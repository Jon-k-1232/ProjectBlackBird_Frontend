const formatApiProperties = rawData => {
  return rawData.map(item => {
    item.value = item.OID;
    item.label = `${item.firstName} ${item.lastName}`;
    return item;
  });
};

export const employeeDataAdapter = rawData => {
  formatApiProperties(rawData);
  return rawData;
};
