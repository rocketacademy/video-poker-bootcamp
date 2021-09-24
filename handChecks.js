/* eslint-disable no-unused-vars */

let result = 'BUMMER :('; // result is lose by default
let aceHigh = false; // to differentiate ROYAL FLUSH from STRAIGHT FLUSH

/**
 * Function that checks how many pairs are present
 * @param {object} rankTally tally of card ranks
 * @return {number} number of pairs
 */
const checkPairs = (rankTally) => {
  let numPairs = 0;
  Object.values(rankTally).forEach((value) => { if (value === 2) {
    numPairs += 1;
  } });
  return numPairs;
};

/**
 * Function that checks for single pair of Jacks, Queens, Kings, or Aces
 * (also amends 'result' variable accordingly)
 * @param {object} rankTally tally of card ranks
 * @return {number} 1 if true, else 0 if false
 */
const checkJacksOrBetter = (rankTally) => {
  if (checkPairs(rankTally) === 1) {
    if (rankTally[1] === 2) {
      result = 'PAIR OF ACES';
      return 1;
    } if (rankTally[11] === 2) {
      result = 'PAIR OF JACKS';
      return 1;
    } if (rankTally[12] === 2) {
      result = 'PAIR OF QUEENS';
      return 1;
    } if (rankTally[13] === 2) {
      result = 'PAIR OF KINGS';
      return 1;
    }
  }
  return 0;
};

/**
 * Function that checks for two pairs
 * (also amends 'result' variable accordingly)
 * @param {object} rankTally tally of card ranks
 * @return {number} 2 if true, else 0 if false
 */
const checkTwoPair = (rankTally) => {
  if (checkPairs(rankTally) === 2) {
    result = 'TWO PAIRS';
    return 2;
  }
  return 0;
};

/**
 * Function that checks for three of a kind
 * (also amends 'result' variable accordingly)
 * @param {object} rankTally tally of card ranks
 * @return {number} 3 if true, else 0 if false
 */
const checkThreeOfAKind = (rankTally) => {
  if (Object.values(rankTally).includes(3)) {
    result = 'THREE OF A KIND';
    return 3;
  }
  return 0;
};

/**
 * Function that checks for straight, sets aceHigh to true if applicable
 * (also amends 'result' variable accordingly)
 * @param {object} rankTally tally of card ranks
 * @return {number} 4 if true, else 0 if false
 */
const checkStraight = (rankTally) => {
  let straightCounter = 0;
  aceHigh = false;

  // create sorted array of ranks in rankTally
  const rankKeys = Object.keys(rankTally).map((key) => Number(key));
  rankKeys.sort((a, b) => a - b);

  // check if adjacent ranks have difference of 1
  for (let i = 1; i < rankKeys.length; i += 1) {
    const currentRank = Number(rankKeys[i]);
    const previousRank = Number(rankKeys[i - 1]);
    if (currentRank === (previousRank + 1)) {
      straightCounter += 1;
    }
  }

  if (straightCounter === 4) {
    result = 'STRAIGHT';
    return 4;
  }

  // check ace-high straight
  if (straightCounter === 3 && rankKeys[0] === 1 && rankKeys[1] === 10) {
    result = 'STRAIGHT (ACE-HIGH)';
    aceHigh = true;
    return 4;
  }

  return 0;
};

/**
 * Function that checks for flush
 * (also amends 'result' variable accordingly)
 * @param {object} suitTally tally of card suits
 * @return {number} 6 if true, else 0 if false
 */
const checkFlush = (suitTally) => {
  if (Object.values(suitTally).includes(5)) {
    result = 'FLUSH';
    return 6;
  }
  return 0;
};

/**
 * Function that checks for ful house
 * (also amends 'result' variable accordingly)
 * @param {object} rankTally tally of card ranks
 * @return {number} 9 if true, else 0 if false
 */
const checkFullHouse = (rankTally) => {
  if (checkThreeOfAKind(rankTally) !== 0
  && checkPairs(rankTally) === 1) {
    result = 'FULL HOUSE';
    return 9;
  }
  return 0;
};

/**
 * Function that checks for four of a kind
 * (also amends 'result' variable accordingly)
 * @param {object} rankTally tally of card ranks
 * @return {number} 25 if true, else 0 if false
 */
const checkFourOfAKind = (rankTally) => {
  if (Object.values(rankTally).includes(4)) {
    result = 'FOUR OF A KIND';
    return 25;
  }
  return 0;
};

/**
 * Function that checks for straight flush
 * (also amends 'result' variable accordingly)
 * @param {object} rankTally tally of card ranks
 * @param {object} suitTally tally of card suits
 * @return {number} 50 if true, else 0 if false
 */
const checkStraightFlush = (rankTally, suitTally) => {
  if (checkStraight(rankTally) !== 0 && checkFlush(suitTally) !== 0) {
    result = 'STRAIGHT FLUSH';
    return 50;
  }
  return 0;
};

/**
 * Function that checks for royal flush
 * (also amends 'result' variable accordingly)
 * @param {object} rankTally tally of card ranks
 * @param {object} suitTally tally of card suits
 * @return {number} 250 if true, else 0 if false
 */
const checkRoyalFlush = (rankTally, suitTally) => {
  // eslint-disable-next-line
  if (checkStraightFlush(rankTally, suitTally) !== 0 && aceHigh === true) {
    result = 'ROYAL FLUSH';
    return 250;
  }
  return 0;
};
