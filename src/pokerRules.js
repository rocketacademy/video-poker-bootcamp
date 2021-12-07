/*####################
## HELPER FUNCTION ###
####################*/

/**
 * A function that check name tally occurence given a number
 * @param  objectTally {object} object keys to iterate
 * @param  number {number} card name to match with numbers
 * @param  occurence {number} number of occurence to increase counter
 * @return {boolean} true false
 */
const ofAKind = (objectTally, number, occurence) => {
  let counter = 0;
  for (let key of Object.keys(objectTally)) {
    if (objectTally[key] === number) {
      counter += 1;
    }
    if (counter === occurence) {
      return true;
    }
  }
  counter = 0;
};

/**
 * A function that check whether a player's hand has the given card name
 * @param  playerHand {array} array of player hand cards
 * @param  named {string} card name
 * @return {boolean} true false
 */
const haveNamedCard = (playerHand, named) => {
  const namedCard = playerHand.filter((v) => v.name === named).length;
  return namedCard > 0;
};

// sort array
const sortCards = (playerHand) => {
  playerHand.sort(function (a, b) {
    return a.rank - b.rank;
  });
};

/*####################
#### POKER RULES ####
####################*/

//use name
const onePair = (nameObject) => {
  return ofAKind(nameObject, 2, 1) === true;
};

//use name
const twoPairs = (nameObject) => {
  return ofAKind(nameObject, 2, 2) === true;
};

//use name
const threeOfAKind = (nameObject) => {
  return ofAKind(nameObject, 3, 1) === true;
};

//use name
const fourOfAKind = (nameObject) => {
  return ofAKind(nameObject, 4, 1) === true;
};

//use name
const fiveOfAKind = (nameObject) => {
  return ofAKind(nameObject, 4, 1) && nameObject["joker"] === 1;
};

//use name
const fullHouse = (nameObject) => {
  return ofAKind(nameObject, 3, 1) && ofAKind(nameObject, 2, 1);
};

//use suit
const flush = (suitObject) => {
  return ofAKind(suitObject, 5, 1) === true;
};

//use hand
const straight = (playerHand) => {
  if (haveNamedCard(playerHand, "joker")) return false;

  sortCards(playerHand);

  if (
    playerHand[1].rank == playerHand[0].rank + 1 &&
    playerHand[2].rank == playerHand[1].rank + 1 &&
    playerHand[3].rank == playerHand[2].rank + 1 &&
    playerHand[4].rank == playerHand[3].rank + 1
  ) {
    return true;
  }
  // if have ace and ace becomes rank 1
  if (
    playerHand[4].name == "ace" &&
    playerHand[0].name == 2 &&
    playerHand[1].name == 3 &&
    playerHand[2].name == 4 &&
    playerHand[3].name == 5
  ) {
    return true;
  }

  return false;
};

//use suit and hand
const straightFlush = (suitObject, playerHand) => {
  return straight(playerHand) && flush(suitObject);
};
//use suit and hand
const royalFlush = (suitObject, playerHand) => {
  return straightFlush(suitObject, playerHand) && playerHand[0].rank == 10;
};

// index of cases and the multiplier bet amount
const FIVE = 0;
const ROYAL = 1;
const STRFL = 2;
const FOUR = 3;
const FULL = 4;
const FLUSH = 5;
const STR = 6;
const THREE = 7;
const TWOPAIR = 8;
const PAIR = 9;
const NOTHING = 10;

const multiplierTable = [
  1000 /* fiveOfAKind */, 800 /* royalFlush */, 50 /* straightFlush */,
  25 /* fourOfAKind */, 9 /* fullHouse */, 6 /* flush */, 4 /* straight */,
  3 /* threeOfAKind */, 2 /* twoPairs */, 1 /* onePair */, 0 /* nothing */,
];

const nameTable = [
  "Five of A Kind",
  "Royal Flush",
  "Straight Flush",
  "Four of A Kind",
  "Full House",
  "Flush",
  "Straight",
  "Three of A Kind",
  "Two Pairs",
  "A Pair",
  "Nothing",
];

const getWinningHand = (nameObject, suitObject, playerHand) => {
  if (fiveOfAKind(nameObject)) return FIVE;
  if (royalFlush(suitObject, playerHand)) return ROYAL;
  if (straightFlush(suitObject, playerHand)) return STRFL;
  if (fourOfAKind(nameObject)) return FOUR;
  if (fullHouse(nameObject)) return FULL;
  if (flush(suitObject)) return FLUSH;
  if (straight(playerHand)) return STR;
  if (threeOfAKind(nameObject)) return THREE;
  if (twoPairs(nameObject)) return TWOPAIR;
  if (onePair(nameObject)) return PAIR;
  else return NOTHING;
};

const getMultiplier = (nameObject, suitObject, playerHand) => {
  let index = getWinningHand(nameObject, suitObject, playerHand);
  multiplier = multiplierTable[index];
  winningHand = nameTable[index];

  console.log(multiplier);
  console.log(typeof multiplier);
  return { multiplier, winningHand };
};
