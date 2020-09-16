export function classSelector(className) {
  return `.${className}`;
}

export function getDatasetMax(dataSet) {
  return {
    max: Math.max(
      ...dataSet.map(set => {
        const { values } = set;
        return Math.max(...values);
      }),
    ),
    min: Math.min(
      ...dataSet.map(set => {
        const { values } = set;
        return Math.min(...values);
      }),
    ),
  };
}
