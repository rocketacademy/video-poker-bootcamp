/* eslint-disable no-unused-vars */

let result = 'BUMMER :(';
let aceHigh = false;

// check how many pairs
const checkPairs = (rankTally) => {
  let numPairs = 0;
  Object.values(rankTally).forEach((value) => { if (value === 2) {
    numPairs += 1;
  } });
  return numPairs;
};

// check one pair
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

// check two pair
const checkTwoPair = (rankTally) => {
  if (checkPairs(rankTally) === 2) {
    result = 'TWO PAIRS';
    return 2;
  }
  return 0;
};

// check three of a kind
const checkThreeOfAKind = (rankTally) => {
  if (Object.values(rankTally).includes(3)) {
    result = 'THREE OF A KIND';
    return 3;
  }
  return 0;
};

// check straight
const checkStraight = (rankTally) => {
  let straightCounter = 0;
  aceHigh = false;

  const rankKeys = Object.keys(rankTally).map((key) => Number(key));
  rankKeys.sort((a, b) => a - b);

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
const checkFlush = (suitTally) => {
  if (Object.values(suitTally).includes(5)) {
    result = 'FLUSH';
    return 6;
  }
  return 0;
};

// check full house
const checkFullHouse = (rankTally) => {
  if (checkThreeOfAKind(rankTally) !== 0
  && checkPairs(rankTally) === 1) {
    result = 'FULL HOUSE';
    return 9;
  }
  return 0;
};

// check four of a kind
const checkFourOfAKind = (rankTally) => {
  if (Object.values(rankTally).includes(4)) {
    result = 'FOUR OF A KIND';
    return 25;
  }
  return 0;
};

// check straight flush
const checkStraightFlush = (rankTally, suitTally) => {
  if (checkStraight(rankTally) !== 0 && checkFlush(suitTally) !== 0) {
    result = 'STRAIGHT FLUSH';
    return 50;
  }
  return 0;
};

const checkRoyalFlush = (rankTally, suitTally) => {
  // eslint-disable-next-line
  if (checkStraight(rankTally) !== 0 && checkFlush(suitTally) !== 0 && aceHigh === true) {
    result = 'ROYAL FLUSH';
    return 800;
  }
  return 0;
};
