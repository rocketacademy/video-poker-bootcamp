/* eslint-disable no-unused-vars */

let result = 'BUMMER :(';
let aceHigh = false;

// check how many pairs
const checkPairs = (rankTally, rankKeys) => {
  let numPairs = 0;
  for (let i = 0; i < rankKeys.length; i += 1) {
    if (rankTally[rankKeys[i]] === 2) {
      numPairs += 1;
    }
  }
  return numPairs;
};

// check one pair
const checkJacksOrBetter = (rankTally, rankKeys) => {
  if (checkPairs(rankTally, rankKeys) === 1) {
    if (rankTally[1] === 2
      || rankTally[11] === 2
      || rankTally[12] === 2
      || rankTally[13] === 2) {
      result = 'JACKS OR BETTER';
      return 1;
    }
  }
  return 0;
};

// check two pair
const checkTwoPair = (rankTally, rankKeys) => {
  if (checkPairs(rankTally, rankKeys) === 2) {
    result = 'TWO PAIRS';
    return 2;
  }
  return 0;
};

// check three of a kind
const checkThreeOfAKind = (rankTally, rankKeys) => {
  for (let i = 0; i < rankKeys.length; i += 1) {
    if (rankTally[rankKeys[i]] === 3) {
      result = 'THREE OF A KIND';
      return 3;
    }
  }
  return 0;
};

// check straight
const checkStraight = (rankTally, rankKeys) => {
  let straightCounter = 0;
  aceHigh = false;
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

  // for ace-high straight
  if (straightCounter === 3 && rankKeys[0] === 1 && rankKeys[1] === 10) {
    result = 'STRAIGHT (ACE-HIGH)';
    aceHigh = true;
    return 4;
  }

  return 0;
};

// check flush
const checkFlush = (suitTally, suitKeys) => {
  for (let i = 0; i < suitKeys.length; i += 1) {
    if (suitTally[suitKeys[i]] === 5) {
      result = 'FLUSH';
      return 6;
    }
  }
  return 0;
};

// check full house
const checkFullHouse = (rankTally, rankKeys) => {
  if (checkThreeOfAKind(rankTally, rankKeys) !== 0
  && checkPairs(rankTally, rankKeys) === 1) {
    result = 'FULL HOUSE';
    return 9;
  }
  return 0;
};

// check four of a kind
const checkFourOfAKind = (rankTally, rankKeys) => {
  for (let i = 0; i < rankKeys.length; i += 1) {
    if (rankTally[rankKeys[i]] === 4) {
      result = 'FOUR OF A KIND';
      return 25;
    }
  }
  return 0;
};

// check straight flush
const checkStraightFlush = (rankTally, rankKeys, suitTally, suitKeys) => {
  if (checkStraight(rankTally, rankKeys) !== 0 && checkFlush(suitTally, suitKeys) !== 0) {
    result = 'STRAIGHT FLUSH';
    return 50;
  }
  return 0;
};

const checkRoyalFlush = (rankTally, rankKeys, suitTally, suitKeys) => {
  // eslint-disable-next-line
  if (checkStraight(rankTally, rankKeys) !== 0 && checkFlush(suitTally, suitKeys) !== 0 && aceHigh === true) {
    result = 'ROYAL FLUSH';
    return 800;
  }
  return 0;
};
