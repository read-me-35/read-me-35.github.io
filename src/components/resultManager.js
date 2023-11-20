let resultsStorage = {};
let currentTestType = "";

export const setResults = (results) => {
  console.log(results);
  resultsStorage = results;
};

export const getResults = () => {
  return resultsStorage;
};

export const setCurrentTestType = (testType) => {
  currentTestType = testType;
};

export const getCurrentTestType = () => {
  return currentTestType;
};
