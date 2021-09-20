/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chooseNElementsfromArray = (array, n) => {
  let head = [];
  let tail = [];
  let combs = [];

  if (n > array.length || n < 1) {
    return [];
  }
  if (n === array.length) {
    return [array];
  }
  if (n === 1) {
    combs = [];
    for (let i = 0; i < array.length; i += 1) {
      combs.push(array[i]);
    }
    return combs;
  }
  for (let j = 0; j < array.length - n + 1; j += 1) {
    head = array.slice(j, j + 1);
    tail = chooseNElementsfromArray(array.slice(j + 1), n - 1);
    for (let k = 0; k < tail.length; k += 1) {
      combs.push(head.concat(tail[k]));
    }
  }
  return combs;
};

const calcProb = () => {
  const mockHand = [];
  const allResults = [];
  const pointTally = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 6: 0, 9: 0, 25: 0, 50: 0, 800: 0,
  };
  let totalCount = 0;

  const cardsToRetain = document.querySelector('.hand').querySelectorAll('.clicked-card');
  const cardsToDraw = 5 - cardsToRetain.length;
  const mockDeck = JSON.parse(JSON.stringify(deck));

  // limit because of lag
  if (cardsToDraw < 4) {
    if (cardsToDraw < 5) {
      for (let i = 0; i < cardsToRetain.length; i += 1) {
        const indexInHand = Number(cardsToRetain[i].id[4]);
        const currentCardCopy = JSON.parse(JSON.stringify(hand[indexInHand]));
        mockHand.push(currentCardCopy);
      }
    }

    const mockAddHandsArray = chooseNElementsfromArray(mockDeck, cardsToDraw);

    for (let j = 0; j < mockAddHandsArray.length; j += 1) {
      const newMockHand = mockHand.concat(mockAddHandsArray[j]);

      const mockRankTally = {};
      const mockSuitTally = {};

      for (let k = 0; k < newMockHand.length; k += 1) {
        const currentRank = newMockHand[k].rank;
        const currentSuit = newMockHand[k].suit;

        if (currentRank in mockRankTally) {
          mockRankTally[currentRank] += 1;
        } else {
          mockRankTally[currentRank] = 1;
        }

        if (currentSuit in mockSuitTally) {
          mockSuitTally[currentSuit] += 1;
        } else {
          mockSuitTally[currentSuit] = 1;
        }
      }

      const keyRanksStr = Object.keys(mockRankTally);
      const keySuits = Object.keys(mockSuitTally);
      const keyRanks = keyRanksStr.map((key) => Number(key));
      keyRanks.sort((a, b) => a - b);

      const multiplierArray = [];
      multiplierArray.push(checkJacksOrBetter(mockRankTally, keyRanks));
      multiplierArray.push(checkTwoPair(mockRankTally, keyRanks));
      multiplierArray.push(checkThreeOfAKind(mockRankTally, keyRanks));
      multiplierArray.push(checkStraight(mockRankTally, keyRanks));
      multiplierArray.push(checkFlush(mockSuitTally, keySuits));
      multiplierArray.push(checkFullHouse(mockRankTally, keyRanks));
      multiplierArray.push(checkFourOfAKind(mockRankTally, keyRanks));
      multiplierArray.push(checkStraightFlush(mockRankTally, keyRanks, mockSuitTally, keySuits));
      multiplierArray.push(checkRoyalFlush(mockRankTally, keyRanks, mockSuitTally, keySuits));

      result = 'BUMMER :(';

      let mockResult = 0;
      for (let m = 0; m < multiplierArray.length; m += 1) {
        if (multiplierArray[m] > mockResult) {
          mockResult = multiplierArray[m];
        }
      }
      allResults.push(mockResult);
    }

    for (let n = 0; n < allResults.length; n += 1) {
      const currentPoint = allResults[n];
      pointTally[currentPoint] += 1;
      totalCount += 1;
    }

    for (let p = 0; p < multipliers.length; p += 1) {
      const probDec = pointTally[multipliers[p]] / totalCount;
      const probPercent = Math.round(probDec * 100000) / 1000;
      probabilities[p] = `${probPercent}%`;
    }
  } else {
    probabilities = ['...', '...', '...', '...', '...', '...', '...', '...', '...'];
  }

  updateChanceInTable();
};
