let resultsStorage = {};

export const setResults = (results) => {
  console.log(results);
  resultsStorage = results;
};

export const getResults = () => {
  return resultsStorage;
};
