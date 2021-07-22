/* eslint-disable prefer-const */
// let playerArr = [
//   { rank: 11, suit: 'hearts', name: 'j' },
//   { rank: 5, suit: 'diamonds', name: '5' },
//   { rank: 5, suit: 'spades', name: '5' },
//   { rank: 7, suit: 'spades', name: '7' },
//   { rank: 9, suit: 'hearts', name: '9' },
// ];

// Create card details as tally
let rankTally = {};
// Loop over playerArr
for (let i = 0; i < playerArr.length; i += 1) {
  // eslint-disable-next-line prefer-destructuring
  let rank = playerArr[i].rank;
  // If we have seen the card name before, increment its count
  if (rank in rankTally) {
    rankTally[rank] += 1;
  }
  // Else, initialise count of this card name to 1
  else {
    rankTally[rank] = 1;
  }
}

let suitTally = {};

// Loop over playerArr
for (let i = 0; i < playerArr.length; i += 1) {
  // eslint-disable-next-line prefer-destructuring
  let suit = playerArr[i].suit;
  // If we have seen the card name before, increment its count
  if (suit in suitTally) {
    suitTally[suit] += 1;
  }
  // Else, initialise count of this card name to 1
  else {
    suitTally[suit] = 1;
  }
}

const isJacksOrBetter = () => {
  if (rankTally['11'] === 2
  || rankTally['12'] === 2
  || rankTally['13'] === 2
  ) {
    return true;
  }
  return false;
};

const calcHandScore = () => {
  let payoutRate;
  let pointsWon;
  console.log('pointsWon');

  if (isJacksOrBetter) {
    payoutRate = 1;
    pointsWon = bet * payoutRate;
    console.log(pointsWon);
  } else {
    pointsWon = -bet;
  }
  return pointsWon;
};

const pointsForHand = calcHandScore();
