/*####################
## OBJECT AS TALLY ##
####################*/
let cardNameTally = {};
let cardSuitTally = {};

// Loop over hand
const nameTally = (playerHand) => {
  cardNameTally = {};
  for (let i in playerHand) {
    let cardName = playerHand[i].display;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }

  for (let cardName in cardNameTally) {
    console.log(`There are ${cardNameTally[cardName]} ${cardName} in the hand`);
  }
};

// Loop over hand
const suitTally = (playerHand) => {
  cardSuitTally = {};
  for (let i in playerHand) {
    let cardSuit = playerHand[i].suit;
    // If we have seen the card name before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }

  for (let cardSuit in cardSuitTally) {
    console.log(`There are ${cardSuitTally[cardSuit]} ${cardSuit} in the hand`);
  }
};
