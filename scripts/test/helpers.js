/**
 * @callback descIfFalseCallback
 * @param {Object} e Expected value
 * @param {Object} a Actual value
 * @returns {string} Description if assertion is false.
 */

/**
 *
 * @param {*} expected
 * @param {*} actual
 * @param {descIfFalseCallback} descIfFalse
 */
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

/**
 * Runs a test.
 * @param {string} desc Test description
 * @param {function} testFunction Test function
 */
const runTest = (desc, testFunction) => {
  console.group(`${desc}`);
  testFunction();
  console.groupEnd();
};
