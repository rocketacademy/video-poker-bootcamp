/**
 *
 * @param {Object} stats object containing the current hand with number of suits and number of ranks
 * @returns {Boolean} true if current hand is four of a kind
 */
const checkFourOfAKindHand = (input) => {
  const nameCount = Object.values(input.name);

  if (nameCount.indexOf(4) !== -1) {
    return true;
  }

  return false;
};

/**
 *
 * @param {Object} stats object containing the current hand with number of suits and number of ranks
 * @returns {Boolean} true if current hand is full house
 */
const checkFullHouseHand = (input) => {
  const nameCount = Object.values(input.name);

  if (nameCount.indexOf(3) !== -1 && nameCount.indexOf(2) !== -1) {
    return true;
  }

  return false;
};

/**
 *
 * @param {Object} stats object containing the current hand with number of suits and number of ranks
 * @returns {Boolean} true if current hand is flush
 */
const checkFlushHand = (input) => {
  const suitCount = Object.values(input.suit);

  if (suitCount.indexOf(5) !== -1) {
    return true;
  }

  return false;
};

/**
 *
 * @param {Object} stats object containing the current hand with number of suits and number of ranks
 * @returns {Boolean} true if current hand is straight
 */
const checkStraightHand = (input) => {
  const nameCount = Object.values(input.name);

  // check whether there is any names repeated twice or more
  for (let i = 0; i < nameCount.length; i += 1) {
    if (nameCount[i] >= 2) {
      return null;
    }
  }

  // put all ranks into a table
  // if there is an ace, put both rank 1 and 14
  const rankTable = [];
  let rankTable2 = null;

  if (input.name.ace === 1) {
    rankTable2 = [];
  }

  for (let i = 0; i < input.hand.length; i += 1) {
    rankTable.push(input.hand[i].rank);
    if (rankTable2 !== null) {
      if (input.hand[i].name === 'ace') {
        rankTable2.push(14);
      } else {
        rankTable2.push(input.hand[i].rank);
      }
    }
  }

  // check rankTable to see whether sequential
  rankTable.sort((a, b) => a - b);
  let sequential = true;
  for (let i = 1; i < rankTable.length; i += 1) {
    if (rankTable[i] - 1 === rankTable[i - 1]) {
      sequential = true;
    } else {
      sequential = false;
      break;
    }
  }

  if (rankTable2 !== null && sequential === false) {
    rankTable2.sort((a, b) => a - b);

    for (let i = 1; i < rankTable2.length; i += 1) {
      if (rankTable2[i] - 1 === rankTable2[i - 1]) {
        sequential = true;
      } else {
        sequential = false;
        break;
      }
    }
  }

  return sequential;
};

/**
 *
 * @param {Object} stats object containing the current hand with number of suits and number of ranks
 * @returns {Boolean} true if current hand is three of a kind
 */
const checkThreeOfAKindHand = (input) => {
  const nameCount = Object.values(input.name);

  if (nameCount.indexOf(3) !== -1) {
    return true;
  }

  return false;
};

/**
 *
 * @param {Object} stats object containing the current hand with number of suits and number of ranks
 * @returns {Boolean} true if current hand is two pair
 */
const checkTwoPairHand = (input) => {
  let noOfPairs = 0;

  const nameCount = Object.values(input.name);

  for (let i = 0; i < nameCount.length; i += 1) {
    if (nameCount[i] >= 2) {
      noOfPairs += 1;
    }
  }

  if (noOfPairs === 2) {
    return true;
  }

  return false;
};

/**
 *
 * @param {Object} stats object containing the current hand with number of suits and number of ranks
 * @returns {Boolean} true if current hand is straight flush
 */
const checkStraightFlushHand = (input) => {
  if (checkStraightHand(input) && checkFlushHand(input)) {
    return true;
  }

  return false;
};

/**
 *
 * @param {Object} stats object containing the current hand with number of suits and number of ranks
 * @returns {Boolean} true if current hand is royal flush
 */
const checkRoyalFlushHand = (input) => {
  if (checkFlushHand(input) && input.name.ace === 1 && input.name.king === 1 && input.name.queen === 1 && input.name.jack === 1 && input.name['10'] === 1) {
    return true;
  }

  return false;
};

/**
 *
 * @param {Object} stats.hand object containing the current hand
 * @returns {Boolean} true if current hand contains cards of the same suit
 */
const isHeldCardsSameSuit = (statsHand) => {
  const result = {
    suit: '',
    result: false,
  };

  let suitPlaceholder = '';
  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (suitPlaceholder === '') {
        suitPlaceholder = statsHand[i].suit;
      } else if (statsHand[i].suit !== suitPlaceholder) {
        return result;
      }
    }
  }

  result.suit = suitPlaceholder;
  result.result = true;

  return result;
};

/**
 *
 * @param {Object} stats.hand object containing the current hand
 * @returns {Boolean} true if current hand contains cards of the same rank
 */
const isHeldCardsSameName = (statsHand) => {
  let cardsAreSameName = true;
  let namePlaceholder = '';
  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (namePlaceholder === '') {
        namePlaceholder = statsHand[i].name;
      } else if (statsHand[i].name !== namePlaceholder) {
        cardsAreSameName = false;
        return cardsAreSameName;
      }
    }
  }

  return cardsAreSameName;
};

/**
 *
 * @param {Object} stats.hand object containing the current hand
 * @returns {Boolean} true if current hand contains cards from the royal flush group
 */
const isHeldCardsRoyal = (statsHand) => {
  const result = {
    royalHand: {},
    result: false,
  };

  const royalHand = {
    ace: 0,
    king: 0,
    queen: 0,
    jack: 0,
    10: 0,
  };

  // if held cards do not contain royal cards, return false
  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (royalHand[statsHand[i].name] === undefined) {
        result.result = false;
        return result;
      }
      royalHand[statsHand[i].name] += 1;
    }
  }

  if (royalHand.ace > 1
    || royalHand.king > 1
    || royalHand.queen > 1
    || royalHand.jack > 1
    || royalHand[10] > 1) {
    result.result = false;

    return result;
  }

  result.royalHand = royalHand;
  result.result = true;
  return result;
};

/**
 *
 * @param {Object} stats.hand object containing the current hand
 * @returns {Boolean} true if lowest rank and highest rank of cards being held are within 5 of each other
 */
const isHeldCardsWithinStraight = (statsHand) => {
  const result = {
    straightHand: {},
    diff: 0,
    result: false,
  };

  // if there is more than 2 cards of the same rank, it is not within straight result
  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (result.straightHand[statsHand[i].rank] === undefined) {
        result.straightHand[statsHand[i].rank] = 1;
      } else {
        return result;
      }
    }
  }

  // if there is not more than 1 card per rank, check if the lowest rank and highest rank are within 5 of each other
  const rankArray = Object.keys(result.straightHand);
  const diff = parseInt(rankArray[rankArray.length - 1], 10) - parseInt(rankArray[0], 10);
  if (diff <= 4) {
    result.result = true;
    result.diff = diff;
    return result;
  }

  result.straightHand = {};
  return result;
};
