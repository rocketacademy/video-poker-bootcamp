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
const assertLogTrue = (expected, actual, descIfFalse) => {
  const predicate = expected === actual;
  if (predicate === true) {
  } else if (predicate === false) {
    console.error(
      descIfFalse(expected, actual) +
        `    Expected ${expected} Actual ${actual}`
    );
  } else {
    console.error(`[assertLogTrue] assertion not specified.`);
  }
};

/**
 *
 * @param {*} unexpected The value that should not be actual
 * @param {*} actual
 * @param {descIfFalseCallback} descIfTrue
 */
const assertLogNotTrue = (unexpected, actual, descIfTrue) => {
  const predicate = unexpected === actual;
  if (predicate === true) {
    console.error(
      descIfTrue(unexpected, actual) +
        `    Expected Unequal Values But Values are Equal. Value: ${actual}`
    );
  } else if (predicate === false) {
  } else {
    console.error(`[assertLogNotTrue] assertion not specified.`);
  }
};

const assertToDo = (desc = `??`) => console.info(`Yet to implement: ${desc}`);

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

/**
 * Ignores a test operation.
 * @param {string} desc Test description
 * @param {function} testFunction Test function
 */
const ignoreTest = (desc, testFunction) => {
  console.group(`${desc} - Test Ignored`);
  console.groupEnd();
};
