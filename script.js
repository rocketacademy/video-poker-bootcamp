/**
 * Global variables
 */
let savedCardsArray = [];
let userHand = [];
let gameMode = 'bet';

let betAmount = 0;

const combosMet = {
  royalFlush: 0,
  straightFlush: 0,
  quads: 0,
  fullHouse: 0,
  straights: 0,
  flush: 0,
  thriples: 0,
  doublePairs: 0,
  pairs: 0,
};

const bestComboAchieved = () => {
  for (let [combo, j] of Object.entries(combosMet)) {
    if (j === 1) {
      console.log(combo);
      break;
    }
  }
};

let credits = 100;
let deck = [];

// An object that contains the points system of the game
const comboPoints = {
  royalFlush: [250, 500, 750, 1000, 4000],
  straightFlush: [50, 100, 150, 200, 250],
  fourOfAKind: [25, 50, 75, 100, 125],
  fullHouse: [9, 18, 27, 36, 45],
  flush: [6, 12, 18, 24, 30],
  straight: [4, 8, 12, 16, 20],
  threeOfAKind: [3, 6, 9, 12, 15],
  twoPair: [2, 4, 6, 8, 10],
};

// TODO
// clicks a button to deal cards DONE
// user selects which card to keep DONE
// --> cards get saved to savedCardsArray when clicked. Need to create a function that replaces the unclicked cards DONE
// game calculates the hand score upon dealt of first hand DONE
// function that adds card in a loop and adds a click element to change cards. DONE
// create status box to track: credits DONE
// add royal flush DONE
// come up with point system
// game calculates the handscore, and update total points.
// add output container instructions, output final combo.

///////////////////////////////////
// Calculate handscore functions //
///////////////////////////////////

/**
 * function that sums returns the sum of the playing hand
 * @param {array} cardHand the user's current playing hand
 */

const calcHandScore = (cardHand) => {
  // 1 pair DONE
  // 2 pair DONE
  // 3 of a kind DONE
  // straight DONE
  // flush DONE
  // full house DONE
  // 4 of a kind DONE
  // straight flush DONE
  // royal flush DONE
  // 5 of a kind

  checkForStraight(cardHand);
  checkForFlush(cardHand);
  checkForRoyalFlush(cardHand);
  quadsThriplesPairsFullHouse(cardHand);
  checkForStraightFlush(cardHand);

  checkIfHitCombo(); // logs the combo hit in console
};

const checkForRoyalFlush = (cardHand) => {
  // check if suits are the same
  let rank = cardHand.rank;

  let ace = 0;
  let king = 0;
  let queen = 0;
  let jack = 0;
  let numTen = 0;

  if (combosMet.flush === 1) {
    // check if A, K, J, 10, 9 are in the hand (bruteforce)
    for (let [i, { rank }] of Object.entries(cardHand)) {
      if (rank === 1) {
        ace = 1;
      }
      if (rank === 13) {
        king = 1;
      }
      if (rank === 12) {
        queen = 1;
      }
      if (rank === 11) {
        jack = 1;
      }
      if (rank === 10) {
        numTen = 1;
      }
    }
    if (ace === 1 && king === 1 && queen === 1 && jack === 1 && numTen === 1) {
      combosMet.royalFlush = 1;
    }
  }
};

const checkForStraightFlush = (cardHand) => {
  // check if straight and flush are true;

  if (combosMet.straights === 1 && combosMet.flush === 1) {
    combosMet.straightFlush = 1;
  }
};

const checkForFlush = (cardHand) => {
  // check if all the suits are the same
  let suitTally = {};
  for (const [i, { suit }] of Object.entries(cardHand)) {
    // check if all the suits are the same
    if (suit in suitTally) {
      suitTally[suit] += 1;
    } else {
      suitTally[suit] = 1;
    }
  }
  if (Object.keys(suitTally).length === 1) {
    combosMet.flush = 1;
    return true;
  }
};

const checkForStraight = (cardHand) => {
  // check if the cards are in running order

  // sort the cards to be in descending order
  const sortedHand = [...cardHand].sort((a, b) => b.rank - a.rank);
  // console.log(sortedHand);

  // loop through the sortedHand to check if the difference between
  // each card is 1
  let counter = 0;
  for (let i = 0; i < sortedHand.length - 1; i += 1) {
    if (sortedHand[i].rank - sortedHand[i + 1].rank === 1) {
      counter += 1;
      if (counter === 4) {
        combosMet.straights = 1;
      }
    }
  }
};

const quadsThriplesPairsFullHouse = (cardHand) => {
  let cardTally = {};
  for (const [i, { rank, suit }] of Object.entries(cardHand)) {
    if (rank in cardTally) {
      cardTally[rank] += 1;
    } else {
      cardTally[rank] = 1;
    }
  }
  // console.log(cardTally);

  let card4x = false;
  let card3x = false;
  let card2x = false;
  let card3x2x = false;

  // for (const i of Object.keys(cardTally)) {
  let counterForPairs = 0;
  for (const j of Object.values(cardTally)) {
    if (j === 4) {
      card4x = true;
    }
    if (j === 2) {
      card2x = true;
      counterForPairs += 1;
      if (counterForPairs === 2) {
        combosMet.doublePairs = 1;
      }
    }
    if (j === 3) {
      card3x = true;
    }
    if (card3x === true && card2x === true) {
      card3x2x = true;
    }
  }
  // }
  if (card4x === true) {
    combosMet.quads = 1;
  } else if (card3x2x === true) {
    combosMet.fullHouse = 1;
  } else if (card3x === true) {
    combosMet.thriples = 1;
  } else if (card2x === true) {
    combosMet.pairs = 1;
  }
  // console.log(
  //   `card4x: ${card4x}, card3x: ${card3x}, card2x: ${card2x}, card3x2x: ${card3x2x}`
  // );
};

//////////////////////
// helper functions //
//////////////////////

// points system DOING
// based on the bet amount, iterate on nth value in the object "comboPoints" and add that value to the credits.

const calcPointsToAdd = () => {
  // check betAmount
  // check which is the highest combo attained
};

/*
let fiveOfAKind = 0;
let royalFlush = 0;
let straightFlush = 0;
let quads = 0;
let fullHouse = 0;
let straights = 0;
let flush = 0;
let thriples = 0;
let doublePairs = 0;
let pairs = 0;
*/

/**
 * function to update credits in HTML
 */
const updateCredits = () => {
  const creditsContainer = document.querySelector('.status-container');
  creditsContainer.innerText = `Total Credits: ${credits}`;
};

const checkIfHitCombo = () => {
  // console.log(
  //   `FIVEOFAKIND: ${fiveOfAKind}, ROYALFLUSH: ${royalFlush}, STRAIGHTFLUSH: ${straightFlush}, QUADS: ${quads}, FULLHOUSE: ${fullHouse}, STRAIGHTS: ${straights}, FLUSH: ${flush}, THRIPLES: ${thriples}, 2xPAIRS: ${doublePairs}, 1xPAIRS: ${pairs}`
  // );
  console.log(combosMet);
};

/**
 * creates deck and shuffles deck
 */
deck = shuffleDeck(makeDeck());
