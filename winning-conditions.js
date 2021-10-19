/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const playerHand = [
  { rank: 3, suit: 'hearts', name: '3' },
  { rank: 3, suit: 'hearts', name: '3' },
  { rank: 3, suit: 'hearts', name: '3' },
  { rank: 8, suit: 'hearts', name: '8' },
  { rank: 13, suit: 'hearts', name: 'K' },
];

// // calcHandScore returns the number of points a given hand earns.
// const pointsForHand = calcHandScore(playerHand);
const cardNameTally = {};
for (let i = 0; i < playerHand.length; i += 1) {
  const cardName = playerHand[i].name;
  // If we have seen the card name before, increment its count
  if (cardName in cardNameTally) {
    cardNameTally[cardName] += 1;
  }
  // Else, initialise count of this card name to 1
  else {
    cardNameTally[cardName] = 1;
  }
}

const cardSuitTally = {};
for (let i = 0; i < playerHand.length; i += 1) {
  const cardSuit = playerHand[i].suit;
  if (cardSuit in cardSuitTally) {
    cardSuitTally[cardSuit] += 1;
  }
  // Else, initialise count of this card name to 1
  else {
    cardSuitTally[cardSuit] = 1;
  }
}

const arraySuitsNames = Object.keys(cardSuitTally);
const arrayNumOfEachSuit = Object.values(cardSuitTally);

const arrayCardNames = Object.keys(cardNameTally);
const arrayNumOfEachCard = Object.values(cardNameTally);

const checkForFlush = () => {
  playerHand.sort((a, b) => a.rank - b.rank);

  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    console.log('Code reaching testing  flush');

    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  if (straight === false && arraySuitsNames.length === 1 && arrayNumOfEachCard.includes(4) === false && !(arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === true)) {
    console.log('Code reaching eval  flush');
    return ' flush';
  }
  return 'No win for  flush';
};

const checkForThreeOfKind = () => {
  if (arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === false && arraySuitsNames.length !== 1) {
    return 'Three of a kind';
  }
  return 'no win for 3 of a kind';
};

const checkForFourOfKind = () => {
  if (arrayNumOfEachCard.includes(4) === true) {
    return 'Four of a kind';
  }
  return 'no win for 4 of a kind';
};

const checkForFullHouse = () => {
  if (arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === true) {
    return 'Full house';
  }
  return 'no win for full house';
};

const checkForTwoPair = () => {
  if (arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.includes(3) === false && arraySuitsNames.length !== 1) {
    return 'Two pair';
  }
  return 'no win for 2 pair';
};

const checkForOnePair = () => {
  // eslint-disable-next-line max-len
  if (arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.length === 4 && arrayNumOfEachCard.includes(3) === false && arrayNumOfEachCard.includes(4) === false && arraySuitsNames.length !== 1) {
    return 'One pair';
  }
  return 'no win for 1 pair';
};

const checkForStraight = () => {
  playerHand.sort((a, b) => a.rank - b.rank);

  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    console.log('Code reaching testing');

    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  if (straight === true && arraySuitsNames.length !== 1) {
    console.log('Code reaching eval');
    return 'Straight';
  }
  return 'No win for straight';
};

const checkForStraightFlush = () => {
  playerHand.sort((a, b) => a.rank - b.rank);

  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    console.log('Code reaching testing straight flush');

    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  if (straight === true && arraySuitsNames.length === 1) {
    console.log('Code reaching eval straight flush');
    return 'Straight flush';
  }
  return 'No win for straight flush';
};

const checkForRoyalFlush = () => {
  playerHand.sort((a, b) => a.rank - b.rank);

  let straight = true;
  for (let i = 1; i < playerHand.length - 1; i += 1) {
    console.log('Code reaching testing straight flush');

    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  // eslint-disable-next-line max-len
  if (straight === true && arraySuitsNames.length === 1 && playerHand[0].rank === 1 && playerHand[1].rank === 10) {
    console.log('Code reaching eval royal flush');
    return 'royal flush';
  }
  return 'No win for royal flush';
};

const checkForHighCard = () => {
  // Check for straight
  playerHand.sort((a, b) => a.rank - b.rank);

  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    console.log('Code reaching testing');

    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }

  if (straight === false && arraySuitsNames.length !== 1 && arrayCardNames.length === 5)
  {
    return 'High card';
  }
  return 'something wrong';
};
