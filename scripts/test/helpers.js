const assertLog = (expected, actual, descIfFalse) => {
  const predicate = expected === actual;
  if (predicate === true) {
  } else if (predicate === false) {
    console.warn(
      descIfFalse(expected, actual) +
        `    Expected ${expected} Actual ${actual}`
    );
  } else {
    console.warn(`[assertLog] assertion not specified.`);
  }
};

const runTest = (desc, testFunction) => {
  console.group(`${desc}`);

  testFunction();
  console.groupEnd();
};
