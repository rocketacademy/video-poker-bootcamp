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
  console.log(hand);
  console.log(tempHand);
  return straight;
};

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
};

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

const checkForAces = (hand) => {
  for (i = 0; i < hand.length; i += 1) {
    if (totalPoints > 30 && hand[i].name === "ace") {
      hand[i].rank = 14;
    }
  }
};

const pointSelection = (hand) => {
  let cardTally = {};
  for (let v = 0; v < hand.length; v += 1) {
    var cardName = hand[v].name;
    if (cardName in cardTally) {
      cardTally[cardName] += 1;
    } else {
      cardTally[cardName] = 1;
    }
  }

  let tallyLength = Object.keys(cardTally).length;

  if (tallyLength === 2) {
    for (cardName in cardTally) {
      //check for four of a kind
      if (cardTally[cardName] === 4) {
        handScore = 25;
        break;
        //check for house
      } else if (cardTally[cardName] === 3) {
        handScore = 9;
      }
    }
  } else if (tallyLength === 3) {
    for (cardName in cardTally) {
      //check for three of a kind
      if (cardTally[cardName] === 3) {
        handScore = 3;
        break;
        //check for 2 pairs
      } else {
        handScore = 2;
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
      //check for pairs lesser than jacks
    } else {
      handScore = -1;
    }
  } else if (tallyLength === 5) {
    //check for royal flush
    if (
      checkForStraights(hand) === true &&
      checkForFlush(hand) === true &&
      checkForRoyal(cardTally) === true
    ) {
      handScore = 250;
      //check for straight flush
    } else if (
      checkForStraights(hand) === true &&
      checkForFlush(hand) === true &&
      checkForRoyal(cardTally) === false
    ) {
      handScore = 50;
      //check for straights
    } else if (checkForStraights(hand) === true) {
      handScore = 4;
      //check for flush
    } else if (checkForFlush(hand) === true) {
      handScore = 6;
      //gameover
    } else {
      handScore = -1;
    }
  }
};
