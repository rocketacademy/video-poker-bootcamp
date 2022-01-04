const checkFourOfAKindHand = (input) => {
  const nameCount = Object.values(input.name);

  if (nameCount.indexOf(4) !== -1) {
    return true;
  }

  return false;
};

const checkFullHouseHand = (input) => {
  const nameCount = Object.values(input.name);

  if (nameCount.indexOf(3) !== -1 && nameCount.indexOf(2) !== -1) {
    return true;
  }

  return false;
};

const checkFlushHand = (input) => {
  const suitCount = Object.values(input.suit);

  if (suitCount.indexOf(5) !== -1) {
    return true;
  }

  return false;
};

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

const checkThreeOfAKindHand = (input) => {
  const nameCount = Object.values(input.name);

  if (nameCount.indexOf(3) !== -1) {
    return true;
  }

  return false;
};

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

const checkStraightFlushHand = (input) => {
  if (checkStraightHand(input) && checkFlushHand(input)) {
    return true;
  }

  return false;
};

const checkRoyalFlushHand = (input) => {
  if (checkFlushHand(input) && input.name.ace === 1 && input.name.king === 1 && input.name.queen === 1 && input.name.jack === 1 && input.name['10'] === 1) {
    return true;
  }

  return false;
};

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

const isHeldCardsWithinStraight = (statsHand) => {
  const result = {
    straightHand: {},
    diff: 0,
    result: false,
  };

  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (result.straightHand[statsHand[i].rank] === undefined) {
        result.straightHand[statsHand[i].rank] = 1;
      } else {
        return result;
      }
    }
  }

  // check if within 5
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
