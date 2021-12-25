// ========================================================
// - Helper functions
// ========================================================
/**
 * Function to check if common elements exist in both arrays
 * @function
 * @param {array} arr1 first array
 * @param {array} arr2 second array
 * @returns {boolean} true if common element exist, else false
 */
const checkCommonElement = (arr1, arr2) => {
  arr1.sort();
  arr2.sort();
  // TODO: bad double for loop
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Function to convert userHand to simplied hand obj (keep track of name as key, count as value, eg { '2': 1, '8': 1, queen: 2, ace: 1 })
 * @function
 * @param {array} Array of card obj
 * @returns {array} Array of names in hand
 */
export const convertToHandSimp = (arr) => {
  let handSimp = {};
  for (let i = 0; i < arr.length; i += 1) {
    const key = arr[i].name;
    if (key in handSimp) {
      handSimp[key] += 1;
    } else {
      handSimp[key] = 1;
    }
  }
  return handSimp;
};

/**
 * Function to get card names in hand
 * @function
 * @param {array} Array of card obj
 * @returns {array} Array of names in hand
 */
const getHandNames = (arr) => {
  let handNames = [];
  for (let i = 0; i < arr.length; i += 1) {
    handNames.push(arr[i].name);
  }
  return handNames;
};

/**
 * Function to check if hand contains all the same suit
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true if suit is all the same
 */
const checkSameSuit = (arr) => {
  let suit = arr[0].suit;
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i].suit != suit) {
      return false;
    }
  }
  return true;
};

/**
 * Function to check if element exists in the arr
 * @function
 * @param {array} Array of int
 * @returns {boolean} true if element already exists
 */
export const checkElementExists = (element, arr) => {
  arr.sort();
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] == element) {
      return true;
    }
  }
  return false;
};

// ========================================================
// - Helper functions to check winnning conditions
// ========================================================

/**
 * Function to check if hand is a royal flush
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkRoyalFlush = (arr) => {
  const sameSuit = checkSameSuit(arr);
  let pictureCards = ["ace", "jack", "queen", "king", "10"];
  pictureCards.sort();
  let handNames = getHandNames(arr);
  handNames.sort();
  const sameName = JSON.stringify(pictureCards) === JSON.stringify(handNames);
  return sameSuit && sameName;
};

/**
 * Function to check if hand is a straight flush
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkStraightFlush = (arr) => {
  const sameSuit = checkSameSuit(arr);
  let straightHand = ["9", "10", "jack", "queen", "king"];
  straightHand.sort();
  let handNames = getHandNames(arr);
  handNames.sort();
  const sameName = JSON.stringify(straightHand) === JSON.stringify(handNames);
  return sameSuit && sameName;
};

/**
 * Function to check if hand is a flush
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkFlush = (arr) => {
  return checkSameSuit(arr);
};

/**
 * Function to check if hand is a straight
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkStraight = (arr) => {
  const hand = convertToHandSimp(arr);
  const keysArr = Object.keys(hand);
  keysArr.sort();
  const pictureCards = ["king", "queen", "jack"];

  if (checkCommonElement(pictureCards, keysArr)) {
    // check for picture cards, if exist, return false (not a straight)
    return false;
  }

  // loop to convert to int and ace to 1
  for (let i = 0; i < keysArr.length; i += 1) {
    keysArr[i] = keysArr[i] === "ace" ? 1 : Number(keysArr[i]);
  }

  // loop to check if numbers are running
  for (let i = 0; i < keysArr.length - 1; i += 1) {
    const curr = keysArr[i];
    const next = keysArr[i + 1];
    if (next - curr !== 1) {
      return false;
    }
  }

  return true;
};

/**
 * Function to check if hand is fullhouse
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkFullHouse = (arr) => {
  const fullHouseCriteria = [2, 3];
  const hand = convertToHandSimp(arr);
  const valuesArr = Object.values(hand);
  valuesArr.sort();
  return JSON.stringify(fullHouseCriteria) === JSON.stringify(valuesArr);
};

/**
 * Function to check if hand is a two of a kind
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkTwoKind = (arr) => {
  const twoPairCriteria = [1, 2, 2];
  const hand = convertToHandSimp(arr);
  const valuesArr = Object.values(hand);
  valuesArr.sort();
  return JSON.stringify(twoPairCriteria) === JSON.stringify(valuesArr);
};

/**
 * Function to check if hand is a three of a kind
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkThreeKind = (arr) => {
  const threeCriteria = [3];
  const hand = convertToHandSimp(arr);
  const valuesArr = Object.values(hand);
  return checkCommonElement(valuesArr, threeCriteria);
};

/**
 * Function to check if hand is a four of a kind
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkFourKind = (arr) => {
  const fourCriteria = [1, 4];
  const hand = convertToHandSimp(arr);
  const valuesArr = Object.values(hand);
  valuesArr.sort();
  return JSON.stringify(fourCriteria) === JSON.stringify(valuesArr);
};

/**
 * Function to check if hand contains a high card
 * @function
 * @param {array} Array of card obj
 * @returns {boolean} true
 */
export const checkHighCard = (arr) => {
  const highCards = ["ace", "jack", "queen", "king"];
  const hand = convertToHandSimp(arr);
  const keysArr = Object.keys(hand);
  return checkCommonElement(highCards, keysArr);
};
