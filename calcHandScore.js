/* eslint-disable prefer-spread */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
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
    if (sortedHand[i].rank === sortedHand[i - 1].rank + 1) {
      consecutiveCount += 1; }
    else { consecutiveCount = 1; }
    if (consecutiveCount === 5)
    { return true; }
  }
  return false;
};

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
  let pointsWon;
  let hand;

  if ((isRoyalStraight(cardRankTally)) && (isSuitAllSpade(cardSuitTally))) {
    payoutRate = 800;
    hand = 'Royal Flush';
    console.log('Royal flush');
  } else if ((isStraight(playerArr)) && (isFlush(cardSuitTally))) {
    payoutRate = 50;
    hand = 'Straight Flush';
    console.log('straight flush');
  } else if (isFourOfAKind(cardRankTally)) {
    payoutRate = 25;
    hand = '4 of a Kind';
    console.log('4ofAkind');
  } else if (isFullHouse(cardRankTally)) {
    payoutRate = 9;
    hand = 'Full House';
    console.log('fullhse');
  } else if (isFlush(cardSuitTally)) {
    payoutRate = 6;
    hand = 'Flush';
    console.log('flush');
  } else if (isStraight(playerArr)) {
    payoutRate = 4;
    hand = 'Straight';
    console.log('straight');
  } else if (isRoyalStraight(cardRankTally)) {
    payoutRate = 4;
    hand = 'Royal Straight';
    console.log('royal straight');
  } else if (isThreeOfAKind(cardRankTally)) {
    payoutRate = 3;
    hand = '3 of a Kind';
    console.log('3ofAkind');
  } else if (isTwoPair(cardRankTally)) {
    payoutRate = 2;
    hand = 'Two Pairs';
    console.log('2pair');
  } else if (isJacksOrBetter(cardRankTally)) {
    hand = 'Jacks or Better';
    payoutRate = 1;
    console.log('Js');
  } else {
    hand = 'No Winning Hand! Better luck next time!!';
    payoutRate = -1;
  }
  return output(hand, payoutRate);
};
