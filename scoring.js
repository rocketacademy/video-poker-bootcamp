// TLDR general scoring approach
//  create a copy of the hand and sort it
//  compare the copy to winning hands (flushes etc)
//  winning hand themselves are generalized
//  after sorting the hand and generating a tally, retrieve tally values and sort those
//  and compare the array of sorted keys to model arrays
//  e.g. [1, 1, 1, 1, 1] might be a straight flush or just a straight
//  e.g. [1, 4] is four of a kind
//  e.g. [2, 3] is a full house

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

// because JS refuses to compare 2 arrays
const arrayEquals = function (a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
};

const sortHand = function (handArr) {
  let sortedPlayerHand = handArr.slice();
  sortedPlayerHand = sortedPlayerHand.sort((a, b) => {
    // sort in descending order of rank
    return b.rank - a.rank;
  });
  return sortedPlayerHand;
};

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

const isFullHouse = function (valuesArr) {
  const comparatorArray = [3, 2];
  return arrayEquals(comparatorArray, valuesArr);
};

const isFourOfAKind = function (valuesArr) {
  if (valuesArr.includes(4)) {
    return true;
  } else {
    return false;
  }
};

const isThreeOfAKind = function (valuesArr) {
  if (valuesArr.includes(3)) {
    return true;
  } else {
    return false;
  }
};

const isTwoPairs = function (valuesArr) {
  valuesArr = valuesArr.sort(function (a, b) {
    // sort descending
    return b - a;
  });
  const comparatorArray = [2, 2, 1];
  // console.log((comparatorArray, valuesArr));
  return arrayEquals(comparatorArray, valuesArr);
};

const isOnePair = function (valuesArr) {
  const comparatorArray = [2, 1, 1, 1];
  return arrayEquals(comparatorArray, valuesArr);
};

const isFlush = function (handArr) {
  for (i = 0; i < handArr.length; i += 1) {
    if (handArr[i].suit !== handArr[0].suit) {
      return false;
    }
  }
  return true;
};

const isRoyalFlush = function (tallyObj) {
  // console.log(tallyObj);
  const royalFlushRanks = ["1", "10", "11", "12", "13"]; // per descending card rank
  const handCardRanks = Object.keys(tallyObj);
  return arrayEquals(royalFlushRanks, handCardRanks);
};

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
