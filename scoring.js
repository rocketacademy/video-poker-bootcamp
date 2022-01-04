// TLDR general scoring approach
//  create a copy of the hand and sort it
//  compare the copy to winning hands (flushes etc)
//  winning hand themselves are generalized
//  after sorting the hand and generating a tally, retrieve tally values and sort those
//  and compare the array of sorted keys to model arrays
//  e.g. [1, 1, 1, 1, 1] might be a straight flush or just a straight
//  e.g. [1, 4] is four of a kind
//  e.g. [2, 3] is a full house

/** @type {object} */
const betMultiplierMap = {
  royalFlush: 250,
  straightFlush: 50,
  flush: 6,
  straight: 4,
  fullHouse: 9,
  fourOfAKind: 25,
  threeOfAKind: 3,
  twoPairs: 2,
  null: 0,
};

/**
 * because JS refuses to compare 2 arrays
 * compares the value of each element in two arrays of equal length to determine if they are identical
 * @param {array} a
 * @param {array} b
 * @return {boolean} - true or false based on whether the arrays are identical in length and values
 */
const arrayEquals = function (a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

/**
 * sorts a hand array in descending order of rank
 * @param {array} handArr - array of card objects
 * @return {array} - of identical values to the input param, but in a sorted order
 */
const sortHand = function (handArr) {
  let sortedPlayerHand = handArr.slice();
  sortedPlayerHand = sortedPlayerHand.sort((a, b) => {
    return b.rank - a.rank;
  });
  return sortedPlayerHand;
};

/**
 * creates an object to count the number of times a card of a particular rank appears in the array
 * @param {array} handArr - array of card objects
 * @return {object} - keys are the unique card ranks appeaing in the input array, values are the number of times they appear
 */
const generateRankTally = function (handArr) {
  // ranktally's keys will be in ascending order of rank
  let rankTally = {};
  for (let i = 0; i < handArr.length; i += 1) {
    let currentRank = handArr[i].rank;
    if (currentRank in rankTally) {
      rankTally[currentRank] += 1;
    } else {
      rankTally[currentRank] = 1;
    }
  }
  return rankTally;
};

/**
 * checks if a tally object fulfils the criteria of being a Full House
 * @param {array} valuesArr - the values from the talley object
 * @return {boolean}
 */
const isFullHouse = function (valuesArr) {
  const comparatorArray = [3, 2];
  return arrayEquals(comparatorArray, valuesArr);
};

/**
 * checks if a tally object fulfils the criteria of being Four of a Kind
 * @param {array} valuesArr - the values from the talley object
 * @return {boolean}
 */
const isFourOfAKind = function (valuesArr) {
  if (valuesArr.includes(4)) {
    return true;
  } else {
    return false;
  }
};

/**
 * checks if a tally object fulfils the criteria of being Three of a Kind
 * @param {array} valuesArr - the values from the talley object
 * @return {boolean}
 */
const isThreeOfAKind = function (valuesArr) {
  if (valuesArr.includes(3)) {
    return true;
  } else {
    return false;
  }
};

/**
 * checks if a tally object fulfils the criteria of being Two Pairs
 * @param {array} valuesArr - the values from the talley object
 * @return {boolean}
 */
const isTwoPairs = function (valuesArr) {
  valuesArr = valuesArr.sort(function (a, b) {
    // sort descending
    return b - a;
  });
  const comparatorArray = [2, 2, 1];
  // console.log((comparatorArray, valuesArr));
  return arrayEquals(comparatorArray, valuesArr);
};

/**
 * checks if a tally object fulfils the criteria of being One Pair
 * @param {array} valuesArr - the values from the talley object
 * @return {boolean}
 */
const isOnePair = function (valuesArr) {
  const comparatorArray = [2, 1, 1, 1];
  return arrayEquals(comparatorArray, valuesArr);
};

/**
 * checks if a hand fulfils the criteria of being a Flush (same suit for all cards)
 * @param {array} handArr - array of 5 card objects
 * @return {boolean}
 */
const isFlush = function (handArr) {
  for (i = 0; i < handArr.length; i += 1) {
    if (handArr[i].suit !== handArr[0].suit) {
      return false;
    }
  }
  return true;
};

/**
 * checks if a hand fulfils the criteria of being a Royal Flush
 * @param {object} tallyObj - keys are the unique ranks appearing within a hand, values are the number of times the rank appears
 * @return {boolean}
 */
const isRoyalFlush = function (tallyObj) {
  // console.log(tallyObj);
  const royalFlushRanks = ["1", "10", "11", "12", "13"]; // per descending card rank
  const handCardRanks = Object.keys(tallyObj);
  return arrayEquals(royalFlushRanks, handCardRanks);
};

/**
 * checks if a hand fulfils the criteria of being a Straight
 * @param {array} handArr - array of 5 card objects
 * @return {boolean}
 */
const isStraight = function (handArr) {
  let trueCounter = 1;
  for (let i = 0; i < handArr.length - 1; i += 1) {
    if (handArr[i + 1].rank - handArr[i].rank === -1) {
      trueCounter += 1;
    }
  }
  // console.log(`trueCounter: ${trueCounter} (for isStraight)`);
  // console.log(trueCounter === handArr.length);
  return trueCounter === handArr.length;
};

/**
 * checks if a hand fulfils any of the special winning combinations involving repeated cards
 * @param {object} rankTallyObj
 * @return {*} - the type of winning combination as a string, or null if no winning combination is found
 */
const checkRepeatedCards = function (rankTallyObj) {
  const tallyValues = Object.values(rankTallyObj);
  if (isFullHouse(tallyValues)) {
    return "fullHouse";
  } else if (isFourOfAKind(tallyValues)) {
    return "fourOfAKind";
  } else if (isThreeOfAKind(tallyValues)) {
    return "threeOfAKind";
  } else if (isTwoPairs(tallyValues)) {
    return "twoPairs";
  } else {
    return null;
  }
};

/**
 * takes a playerHand, sorts it, generates a rankTally, and then checks for winning combinations
 * @param {array} rawPlayerHand - array of 5 card objects
 * @return {*} - the type of winning combination as a string, or null if no winning combination is found
 */
const parseResults = function (rawPlayerHand) {
  const sortedHand = sortHand(rawPlayerHand);
  const rankTally = generateRankTally(sortedHand);
  // console.log("rankTally:");
  // console.log(rankTally);

  // check flushes
  if (isFlush(sortedHand) == true) {
    // check royal flush
    if (isRoyalFlush(rankTally) == true) {
      return "royalFlush";
    }
    // check straight flush
    else if (isStraight(sortedHand) == true) {
      return "straightFlush";
    }
    // else regular flush
    else {
      return "flush";
    }
  } else if (isStraight(sortedHand) == true) {
    return "straight";
  } else {
    return checkRepeatedCards(rankTally);
  }
};
