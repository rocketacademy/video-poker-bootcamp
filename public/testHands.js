/**
 * Look through the cards in your hand and check for straights.
 * @param {Array.<Object>} hand - array of card objects
 * @returns {boolean} straight - returns true when there is a straight.
 */
const checkForStraights = (hand) => {
  let tempHand = hand.slice();
  tempHand.sort((a, b) => a.rank - b.rank);
  let straight = false;
  for (i = 1; i < tempHand.length; i += 1) {
    if (tempHand[i].rank - tempHand[i - 1].rank === 1) {
      straight = true;
    } else {
      straight = false;
      break;
    }
  }
  return straight;
};

/**
 * Check the the cards in your hand and check for Royal straights card.
 * @param {Object} tally - tally of the hand, where the property is the card name and the value is the number of the cards in the hand.
 * @returns {boolean} returns true when there is a royal cards
 */
const checkForRoyal = (tally) => {
  let royal = false;
  if (
    tally["ace"] === 1 &&
    tally["king"] === 1 &&
    tally["queen"] === 1 &&
    tally["jack"] === 1 &&
    tally["10"] === 1
  ) {
    royal = true;
  }
  return royal;
};

/**
 * Check the the cards in your hand and check for Flush
 * @param {Array.<Object>} hand - array of card objects
 * @returns {boolean} flush - returns true when there is a flush
 */
const checkForFlush = (hand) => {
  let flush;
  for (i = 1; i < hand.length; i += 1) {
    console.log(hand[i].suit);
    console.log(hand[i - 1].suit);
    if (hand[i - 1].suit === hand[i].suit) {
      flush = true;
    } else {
      flush = false;
      break;
    }
  }
  return flush;
};

/**
 * If the total points of the hand is more than 30 (i.e. more than 3 high cards), they will translate the rank of the aces to 14.
 * @param {Array.<Object>} hand - array of card objects
 */
const checkForAces = (hand) => {
  for (i = 0; i < hand.length; i += 1) {
    if (totalPoints > 30 && hand[i].name === "ace") {
      hand[i].rank = 14;
    }
  }
};

/**
 * Makes a card tally in your hand.
 * @param {Array.<Object>} hand - array of card objects
 * @returns {Object} tally - tally of the hand, where the property is the card name and the value is the number of the cards in the hand.
 */
const makeTally = (hand) => {
  let tally = {};
  for (let v = 0; v < hand.length; v += 1) {
    var cardName = hand[v].name;
    if (cardName in tally) {
      tally[cardName] += 1;
    } else {
      tally[cardName] = 1;
    }
  }
  return tally;
};

/**
 * Calculates the points of the hand.
 * @param {Array. <Object>} hand - array of card objects
 */
const pointSelection = (hand) => {
  let cardTally = makeTally(hand);
  let tallyLength = Object.keys(cardTally).length;

  if (tallyLength === 2) {
    for (cardName in cardTally) {
      //check for four of a kind
      if (cardTally[cardName] === 4) {
        handScore = 25;
        handName = "Four of a Kind";
        break;
        //check for house
      } else if (cardTally[cardName] === 3) {
        handScore = 9;
        handName = "House";
      }
    }
  } else if (tallyLength === 3) {
    for (cardName in cardTally) {
      //check for three of a kind
      if (cardTally[cardName] === 3) {
        handScore = 3;
        handName = "Three of a Kind";
        break;
        //check for 2 pairs
      } else {
        handScore = 2;
        handName = "Two Pairs";
      }
    }
  } else if (tallyLength === 4) {
    //check for jacks and better
    if (
      cardTally["queen"] === 2 ||
      cardTally["king"] === 2 ||
      cardTally["ace"] === 2 ||
      cardTally["jack"] === 2
    ) {
      handScore = 1;
      handName = "Jacks and Better";
      //check for pairs lesser than jacks
    } else {
      handScore = -1;
      handName = "Small pair";
    }
  } else if (tallyLength === 5) {
    //check for royal flush
    if (
      checkForStraights(hand) === true &&
      checkForFlush(hand) === true &&
      checkForRoyal(cardTally) === true
    ) {
      handScore = 250;
      handName = "Royal Flush";
      //check for straight flush
    } else if (
      checkForStraights(hand) === true &&
      checkForFlush(hand) === true &&
      checkForRoyal(cardTally) === false
    ) {
      handScore = 50;
      handName = "Straight Flush";
      //check for straights
    } else if (checkForStraights(hand) === true) {
      handScore = 4;
      handName = "Straights";
      //check for flush
    } else if (checkForFlush(hand) === true) {
      handScore = 6;
      handName = "Flush";
      //gameover
    } else {
      handScore = -1;
      handName = "High Card";
    }
  }
};
