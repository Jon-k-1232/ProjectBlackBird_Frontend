const formatApiProperties = rawData => {
  return rawData.map(item => {
    item.value = item.jobDefinition;
    item.label = item.description;
    return item;
  });
};

export const jobDataAdapter = rawData => {
  formatApiProperties(rawData);
  return { rawData };
};
