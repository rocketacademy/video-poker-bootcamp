/* eslint-disable prefer-spread */
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
const numOfCards = 5;
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
// https://www.geeksforgeeks.org/check-if-array-elements-are-consecutive/

const isStraight = () => {
  let sortedHand = playerArr.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));

  let consecutiveCount = 1;
  for (let i = 1; i < sortedHand.length; i += 1) {
    if (sortedHand[i].rank == sortedHand[i - 1].rank + 1) {
      consecutiveCount += 1; }
    else { consecutiveCount = 1; }
    if (consecutiveCount === 5)
    { return true; }
  }
  return false;
};

// let max = Math.max.apply(Math, playerArr.map((o) => o.rank));
// let min = Math.min.apply(Math, playerArr.map((o) => o.rank));

// if (max - min + 1 === 5) {
//     for (let i = 0; i < playerArr.length; i += 1)
//     {
//       for (let j = 0; j < playerArr.length; j += 1)
//       {
//         if (i !== j)
//         {
//           if (playerArr[i] === playerArr[j])
//           {
//             return false; // means there are duplicate values
//           }
//         }
//       }
//     }
//     return true; // means there are no duplicate values.
//   }
// };
//     if (playerArr.length === new Set(playerArr).size) {
//       return true;
//     } return false;
//   }
//   return false; // if ranks are repeated
// };

const isRoyalStraight = (cardRankTally) => {
  if ((cardRankTally[10] === 1
    && cardRankTally[11] === 1
    && cardRankTally[12] === 1
    && cardRankTally[13] === 1
    && cardRankTally[1] === 1
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
let calcHandScore = () => {
  let payoutRate;
  let pointsWon;

  if ((isRoyalStraight(cardRankTally)) && (isSuitAllSpade(cardSuitTally))) {
    payoutRate = 800;
    pointsWon = bet * payoutRate;
    console.log('Royal flush');
  } else if ((isStraight(playerArr, numOfCards)) && (isFlush(cardSuitTally))) {
    payoutRate = 50;
    pointsWon = bet * payoutRate;
    console.log('straight flush');
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
  } else if (isStraight(playerArr, numOfCards)) {
    payoutRate = 4;
    pointsWon = bet * payoutRate;
    console.log('straight');
  } else if (isRoyalStraight(cardRankTally)) {
    payoutRate = 4;
    pointsWon = bet * payoutRate;
    console.log('royal straight');
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
