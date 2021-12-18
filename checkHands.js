/**
 * Calculates the total number of ranks and suits and push it to rankTally and suitTally
 * @returns array containing the objects rankTally & suitTally
 */
const tallyHand = () => {
  for (let i = 0; i < playerHand.length; i += 1)
  {
    const card = playerHand[i];
    if (card.rank in rankTally) {
      rankTally[`${card.rank}`] += 1;
    }
    else {
      rankTally[`${card.rank}`] = 1;
    }

    if (card.suit in suitTally) {
      suitTally[`${card.suit}`] += 1;
    }
    else {
      suitTally[`${card.suit}`] = 1;
    }
  }
  return [rankTally, suitTally];
};
/**
 * Deletes the values for each key in the object
 * @param {object} 
 */
const clearTally = (object) => {
  Object.keys(object).forEach((key) => delete object[key]);
};

/**
 * Checks the hand for flush
 * @param {Object} suitTally 
 * @returns either true or false
 */

const checkFlush = (suitTally) => {
  for (suit in suitTally) {
    if (suitTally[suit] === 5) {
      return true;
    }
  }
  return false;
};

/**
 * Checks the hand for four of a kind
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkFourOfAKind = (rankTally) => {
  for (rank in rankTally) {
    if (rankTally[rank] === 4) {
      return true;
    }
  }
  return false;
};

/**
 * Checks the hand for three of kind
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkThreeOfKind = (rankTally) => {
  for (rank in rankTally) {
    if (rankTally[rank] === 3) {
      return true;
    }
  }
  return false;
};
/**
 * Checks hand for a pair
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkPair = (rankTally) => {
  for (rank in rankTally) {
    if (rankTally[rank] === 2) {
      return true;
    }
  }
  return false;
};
/**
 * Checks hand for full house
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkFullHouse = (rankTally) => {
  if (checkThreeOfKind(rankTally) === true && (checkPair(rankTally) === true)) {
    return true;
  }
  return false;
};
/**
 * Checks hand for two pair
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkTwoPair = (rankTally) => {
  let pairCount = 0;
  for (rank in rankTally) {
    if (rankTally[rank] === 2) {
      pairCount += 1;
    }
    if (pairCount === 2) {
      return true;
    }
  }
  return false;
};
/**
 * Checks hand for straight
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkStraight = () => {
  let count = 0;
  for (let i = 0; i < (playerHand.length - 1); i += 1) {
    if (playerHand[i].rank - playerHand[i + 1].rank === 1) {
      count += 1;
    }
  }
  if (count === 4) {
    return true;
  }
  return false;
};
/**
 * Checks hand for straight flush
 * @param {object} suitTally 
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkStraightFlush = (suitTally, rankTally) => {
  if (checkFlush(suitTally) === true && (checkStraight(rankTally) === true)) {
    return true;
  }
  return false;
};
/**
 * Checks hand for Royal Straight 
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkRoyalStraight = (rankTally) => {
  if (
    rankTally['1'] === 1
    && rankTally['13'] === 1
    && rankTally['12'] === 1
    && rankTally['11'] === 1
    && rankTally['10'] === 1) {
    return true;
  }
  return false;
};

/**
 * Checks hand for Royal Flush
 * @param {object} rankTally 
 * @param {object} suitTally 
 * @returns either true or false
 */
const checkRoyalFlush = (rankTally,suitTally) => {
  if (checkRoyalStraight(rankTally) === true && checkFlush(suitTally) === true) {
    return true;
  }
  return false;
};
/**
 * Checks hand for Jacks or better
 * @param {object} rankTally 
 * @returns either true or false
 */
const checkJacksOrBetter = (rankTally) => {
  if (rankTally['11'] === 2 || rankTally['12'] === 2 || rankTally['13'] === 2 || rankTally['1'] === 2) {
    return true;
  }
  return false;
};

/**
 * Calculates the handscore from the hand
 * @param {object} rankTally - key: rank, value: number of cards with rank
 * @param {object} suitTally - key: suit, value: number of cars with suit
 * @returns handscore as number
 */

const calcHandScore = (rankTally, suitTally) => {
  if (checkRoyalFlush(rankTally, suitTally) === true) {
    handScore = 800;
    return handScore;
  } if (checkStraightFlush(suitTally) === true) {
    handScore = 50;
    return handScore;
  } if (checkFlush(suitTally) === true) {
    handScore = 6;
    return handScore;
  } if (checkFourOfAKind(rankTally) === true) {
    handScore = 25;
    return handScore;
  } if (checkFullHouse(rankTally) === true) {
    handScore = 9;
    return handScore;
  } if (checkThreeOfKind(rankTally) === true) {
    handScore = 3;
    return handScore;
  } if (checkTwoPair(rankTally) === true) {
    handScore = 2;
    return handScore;
  } if (checkRoyalStraight(rankTally) === true) {
    handScore = 4;
    return handScore;
  } if (checkStraight(rankTally) === true) {
    handScore = 4;
    return handScore;
  } if (checkJacksOrBetter(rankTally) === true) {
    handScore = 1;
    return handScore;
  }
  handScore = 0;
  return handScore;
};
