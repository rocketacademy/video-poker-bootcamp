/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
// let playerArr = [
//   { rank: 11, suit: 'hearts', name: 'j' },
//   { rank: 5, suit: 'diamonds', name: '5' },
//   { rank: 5, suit: 'spades', name: '5' },
//   { rank: 7, suit: 'spades', name: '7' },
//   { rank: 9, suit: 'hearts', name: '9' },
// ];
// https://www.codeproject.com/Articles/1187548/Video-Poker
const isJacksOrBetter = (cardRankTally) => {
  if (cardRankTally[11] === 2
    || cardRankTally[12] === 2
    || cardRankTally[13] === 2
    || cardRankTally[1] === 2
  ) {
    return true;
  }
  return false;
};

const isPair = (cardRankTally) => {
  for (rank in cardRankTally) {
    if (cardRankTally[rank] === 2) {
      return true;
    }
  }
  return false;
};

const isTwoPair = (cardRankTally) => {
  let numOfPairs = 0;
  for (rank in cardRankTally) {
    if (cardRankTally[rank] === 2) {
      numOfPairs += 1;
    }
    if (numOfPairs === 2)
    {
      return true;
    }
  }
  return false;
};

const isThreeOfAKind = (cardRankTally) => {
  for (rank in cardRankTally) {
    if (cardRankTally[rank] === 3) {
      return true;
    }
  }
  return false;
};

const isFourOfAKind = (cardRankTally) => {
  for (rank in cardRankTally) {
    if (cardRankTally[rank] === 4) {
      return true;
    }
  }
  return false;
};

const isFullHouse = (cardRankTally) => {
  if (isThreeOfAKind(cardRankTally) && isPair(cardRankTally)) {
    return true;
  }
  return false;
};

const isFlush = (cardSuitTally) => {
  for (suit in cardSuitTally) {
    if (cardSuitTally[suit] === 5) {
      return true;
    }
  }
  return false;
};
let calcHandScore = (cardRankTally, cardSuitTally) => {
  let payoutRate;
  let pointsWon;

  if (isFourOfAKind(cardRankTally)) {
    payoutRate = 25;
    pointsWon = bet * payoutRate;
    console.log('4ofAkind');
  } else if (isFullHouse(cardRankTally)) {
    payoutRate = 9;
    pointsWon = bet * payoutRate;
    console.log('fullhse');
  } else if (isFlush(cardSuitTally)) {
    payoutRate = 6;
    pointsWon = bet * payoutRate;
    console.log('flush');
  } else if (isThreeOfAKind(cardRankTally)) {
    payoutRate = 3;
    pointsWon = bet * payoutRate;
    console.log('3ofAkind');
  } else if (isTwoPair(cardRankTally)) {
    payoutRate = 2;
    pointsWon = bet * payoutRate;
    console.log('2pair');
  } else if (isJacksOrBetter(cardRankTally)) {
    payoutRate = 1;
    pointsWon = bet * payoutRate;
    console.log('Js');
  } else {
    pointsWon = -bet;
  }
  return pointsWon;
};
