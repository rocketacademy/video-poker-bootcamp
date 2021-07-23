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

const isStraight = () => {
  let min = Math.min.apply(Math, playerArr.map((o) => o.rank));

  let max = Math.max.apply(Math, playerArr.map((o) => o.rank));

  // check if elements is unique if max - min + 1 = arrLength
  if (max - min + 1 === 5) {
    /* Create a temp array to hold visited flag of all elements.
    all values are initialized as false */
    let visited = new Array(5);
    for (let i = 0; i < 5; i += 1)
    {
      visited[i] = false;
    }

    for (let i = 0; i < 5; i += 1)
    {
      // If we see an element again, then return false
      if (visited[playerArr[i] - min] !== false)
      {
        return false;
      }
      // If visited first time, then mark the element as visited
      visited[playerArr[i] - min] = true;
    }
    // If all elements occur once, then return true
    return true;
  }
  return false; // if (max - min  + 1 != 5)
};

const isRoyalStraight = (cardRankTally) => {
  if ((cardRankTally[10] === 1
    || cardRankTally[11] === 1
    || cardRankTally[12] === 1
    || cardRankTally[13] === 1
    || cardRankTally[1] === 1
  )) {
    return true;
  }
  return false;
};

const isSuitAllSpade = (cardSuitTally) => {
  for (suit in cardSuitTally) {
    if (cardSuitTally.spades === 5) {
      return true;
    }
  }
  return false;
};

let calcHandScore = (cardRankTally, cardSuitTally) => {
  let payoutRate;
  let pointsWon;

  if ((isRoyalStraight) && (isSuitAllSpade)) {
    payoutRate = 800;
    pointsWon = bet * payoutRate;
    console.log('Royal flush');
  } else if ((isStraight) && (isFlush)) {
    payoutRate = 50;
    pointsWon = bet * payoutRate;
    console.log('straight flush');
  } else if (isStraight) {
    payoutRate = 4;
    pointsWon = bet * payoutRate;
    console.log('straight');
  } else if (isFourOfAKind(cardRankTally)) {
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
