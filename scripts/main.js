/* eslint-disable no-undef */
let stats = {
  hand: [],
  suit: {
    clubs: 0,
    spades: 0,
    hearts: 0,
    diamonds: 0,
  },
  name: {
    ace: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    jack: 0,
    queen: 0,
    king: 0,
  },
};
const rewards = {
  royalFlush: 250,
  straightFlush: 50,
  fourOfAKind: 25,
  fullHouse: 9,
  flush: 6,
  straight: 4,
  threeOfAKind: 3,
  twoPairs: 2,
  jacksOrBetter: 1,
};
const probability = {
  royalFlush: 0,
  straightFlush: 0,
  fourOfAKind: 0,
  fullHouse: 0,
  flush: 0,
  straight: 0,
  threeOfAKind: 0,
  twoPairs: 0,
  jacksOrBetter: 0,
};
let cardsLeft = {
  ace: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  2: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  3: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  4: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  5: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  6: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  7: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  8: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  9: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  10: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  jack: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  queen: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  king: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
};
let shuffledDeck = [];
let playerCredits = 100;
let playerBet = 0;
let mode = '';
let outcome = 'Sorry you lost.';
let foundHand = '';
let totalCombinationsAvailable = 0;

const getCardsLeftWithRank = (i) => {
  let rank = i;

  if (typeof (rank) === 'string') {
    if (rank === 'king') {
      rank = Object.values(cardsLeft.king).reduce((a, b) => a + b, 0);
      return rank;
    } if (rank === 'queen') {
      rank = Object.values(cardsLeft.queen).reduce((a, b) => a + b, 0);
      return rank;
    } if (rank === 'jack') {
      rank = Object.values(cardsLeft.jack).reduce((a, b) => a + b, 0);
      return rank;
    } if (rank === 'ace') {
      rank = Object.values(cardsLeft.ace).reduce((a, b) => a + b, 0);
      return rank;
    }
    rank = parseInt(rank, 10);
  }

  if (rank === 1) {
    rank = Object.values(cardsLeft.ace).reduce((a, b) => a + b, 0);
  } else if (rank === 11) {
    rank = Object.values(cardsLeft.jack).reduce((a, b) => a + b, 0);
  } else if (rank === 12) {
    rank = Object.values(cardsLeft.queen).reduce((a, b) => a + b, 0);
  } else if (rank === 13) {
    rank = Object.values(cardsLeft.king).reduce((a, b) => a + b, 0);
  } else if (rank === 14) {
    rank = Object.values(cardsLeft.ace).reduce((a, b) => a + b, 0);
  } else {
    rank = Object.values(cardsLeft[rank]).reduce((a, b) => a + b, 0);
  }

  return rank;
};

const calcHandScore = () => {
  if (checkRoyalFlushHand(stats)) {
    outcome = 'Royal flush found!';
    foundHand = 'royalFlush';
    return;
  }
  if (checkStraightFlushHand(stats)) {
    outcome = 'Straight flush found!';
    foundHand = 'straightFlush';
    return;
  }
  if (checkFourOfAKindHand(stats)) {
    outcome = 'Four of a kind found!';
    foundHand = 'fourOfAKind';
    return;
  }
  if (checkFullHouseHand(stats)) {
    outcome = 'Full house found!';
    foundHand = 'fullHouse';
    return;
  }
  if (checkFlushHand(stats)) {
    outcome = 'Flush found!';
    foundHand = 'flush';
    return;
  }
  if (checkStraightHand(stats)) {
    outcome = 'Straight found!';
    foundHand = 'straight';
    return;
  }
  if (checkThreeOfAKindHand(stats)) {
    outcome = 'Three of a kind found!';
    foundHand = 'threeOfAKind';
    return;
  }
  if (checkTwoPairHand(stats)) {
    outcome = 'Two pairs found!';
    foundHand = 'twoPairs';
  }
};

const countPlayerCredits = () => {
  if (outcome === 'Royal flush found!' && playerBet === 5) {
    playerCredits += 4000;
  } else if (outcome !== 'Sorry you lost.') {
    playerCredits += (playerBet * rewards[foundHand]);
  }

  // if after tallying, player still has zero, game over
  if (playerCredits === 0) {
    gameOver();
  } else {

  }
};

const resetGame = () => {
  playerBet = 0;
  mode = '';

  // clear stats
  stats.hand = [];
  stats.suit = {
    clubs: 0,
    spades: 0,
    hearts: 0,
    diamonds: 0,
  };
  stats.name = {
    ace: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    jack: 0,
    queen: 0,
    king: 0,
  };

  document.getElementById('cards').className = 'display-none';
  document.getElementById('probabilities').className = 'display-none';
  shuffledDeck = shuffleCards(makeDeck());
  outcome = 'Sorry you lost.';
};

const refreshHand = () => {
  let drawnCard;

  for (let i = 4; i >= 0; i -= 1) {
    if (stats.hand[i] !== undefined && stats.hand[i].hold === false) {
      // remove cards i do not want to hold first
      stats.name[stats.hand[i].name] -= 1;
      stats.suit[stats.hand[i].suit] -= 1;

      drawnCard = shuffledDeck.pop();
      drawnCard.hold = false;

      // replace cards i do not want with new cards
      stats.hand.splice(i, 1, drawnCard);

      stats.name[drawnCard.name] += 1;
      stats.suit[drawnCard.suit] += 1;

      cardsLeft[drawnCard.name][drawnCard.suit] -= 1;
    }
  }
};

const buildStats = (cleanedUpCardsLeft) => {
  const statsList = [];

  for (let i = 0; i < cleanedUpCardsLeft.length; i += 1) {
    for (let j = i + 1; j < cleanedUpCardsLeft.length; j += 1) {
      for (let k = j + 1; k < cleanedUpCardsLeft.length; k += 1) {
        for (let l = k + 1; l < cleanedUpCardsLeft.length; l += 1) {
          for (let m = l + 1; m < cleanedUpCardsLeft.length; m += 1) {
            const stats = {};
            stats.hand = [];
            stats.name = {
              2: 0,
              3: 0,
              4: 0,
              5: 0,
              6: 0,
              7: 0,
              8: 0,
              9: 0,
              10: 0,
              ace: 0,
              jack: 0,
              king: 0,
              queen: 0,
            };
            stats.suit = {
              clubs: 0,
              spades: 0,
              hearts: 0,
              diamonds: 0,
            };

            stats.name[cleanedUpCardsLeft[i].name] += 1;
            stats.name[cleanedUpCardsLeft[j].name] += 1;
            stats.name[cleanedUpCardsLeft[k].name] += 1;
            stats.name[cleanedUpCardsLeft[l].name] += 1;
            stats.name[cleanedUpCardsLeft[m].name] += 1;

            stats.suit[cleanedUpCardsLeft[i].suit] += 1;
            stats.suit[cleanedUpCardsLeft[j].suit] += 1;
            stats.suit[cleanedUpCardsLeft[k].suit] += 1;
            stats.suit[cleanedUpCardsLeft[l].suit] += 1;
            stats.suit[cleanedUpCardsLeft[m].suit] += 1;

            stats.hand.push(cleanedUpCardsLeft[i]);
            stats.hand.push(cleanedUpCardsLeft[j]);
            stats.hand.push(cleanedUpCardsLeft[k]);
            stats.hand.push(cleanedUpCardsLeft[l]);
            stats.hand.push(cleanedUpCardsLeft[m]);

            statsList.push(stats);
          }
        }
      }
    }
  }

  return statsList;
};

const runStatsAgainstOutcomes = (statsList) => {
  const statOutcome = {
    royalFlushCombinations: 0,
    straightFlushCombinations: 0,
    fourOfAKindCombinations: 0,
    fullHouseCombinations: 0,
    flushCombinations: 0,
    straightCombinations: 0,
    threeOfAKindCombinations: 0,
    twoPairCombinations: 0,
  };

  for (let i = 0; i < statsList.length; i += 1) {
    if (checkRoyalFlushHand(statsList[i])) {
      statOutcome.royalFlushCombinations += 1;
    }
    if (checkStraightFlushHand(statsList[i])) {
      statOutcome.straightFlushCombinations += 1;
    }
    if (checkFourOfAKindHand(statsList[i])) {
      statOutcome.fourOfAKindCombinations += 1;
    }
    if (checkFullHouseHand(statsList[i])) {
      statOutcome.fullHouseCombinations += 1;
    }
    if (checkFlushHand(statsList[i])) {
      statOutcome.flushCombinations += 1;
    }
    if (checkStraightHand(statsList[i])) {
      statOutcome.straightCombinations += 1;
    }
    if (checkThreeOfAKindHand(statsList[i])) {
      statOutcome.threeOfAKindCombinations += 1;
    }
    if (checkTwoPairHand(statsList[i])) {
      statOutcome.twoPairCombinations += 1;
    }
  }

  return statOutcome;
};

const calculateProbability = () => {
  // take into account the hand and the amount
  // of cards being held or to be replaced

  const cardsToBeReplaced = countReplacedCards();
  totalCombinationsAvailable = countTotalCombinations(shuffledDeck.length, cardsToBeReplaced);
  updateTotalCombinationsAvailableUI(totalCombinationsAvailable);

  if (cardsToBeReplaced === 5) {
    // find all combinations
    const cleanedUpCardsLeft = convertCardsLeftToStats(cardsLeft);
    const statsList = buildStats(cleanedUpCardsLeft);
    const statOutcome = runStatsAgainstOutcomes(statsList);

    probability.royalFlush = (statOutcome.royalFlushCombinations
      / totalCombinationsAvailable) * 100;
    probability.straightFlush = (statOutcome.straightFlushCombinations
      / totalCombinationsAvailable) * 100;
    probability.fourOfAKind = (statOutcome.fourOfAKindCombinations
        / totalCombinationsAvailable) * 100;
    probability.fullHouse = (statOutcome.fullHouseCombinations
        / totalCombinationsAvailable) * 100;
    probability.flush = (statOutcome.flushCombinations
        / totalCombinationsAvailable) * 100;
    probability.straight = (statOutcome.straightCombinations
        / totalCombinationsAvailable) * 100;
    probability.threeOfAKind = (statOutcome.threeOfAKindCombinations
        / totalCombinationsAvailable) * 100;
    probability.twoPairs = (statOutcome.twoPairCombinations
        / totalCombinationsAvailable) * 100;

    updateProbabilityUI();
  } else if (cardsToBeReplaced === 0) {
    probability.royalFlush = checkRoyalFlushHand(stats) ? 100 : 0;
    probability.straightFlush = checkStraightFlushHand(stats) ? 100 : 0;
    probability.fourOfAKind = checkFourOfAKindHand(stats) ? 100 : 0;
    probability.fullHouse = checkFullHouseHand(stats) ? 100 : 0;
    probability.flush = checkFlushHand(stats) ? 100 : 0;
    probability.straight = checkStraightHand(stats) ? 100 : 0;
    probability.threeOfAKind = checkThreeOfAKindHand(stats) ? 100 : 0;
    probability.twoPairs = checkTwoPairHand(stats) ? 100 : 0;
    updateProbabilityUI();
  } else {
    const royalFlushCombinations = checkRoyalFlushCombinations();
    probability.royalFlush = (royalFlushCombinations / totalCombinationsAvailable) * 100;

    const straightFlushCombinations = checkStraightFlushCombinations();
    probability.straightFlush = (straightFlushCombinations / totalCombinationsAvailable) * 100;

    const fourOfAKindCombinations = checkFourOfAKindCombinations();
    probability.fourOfAKind = fourOfAKindCombinations.alreadyWin ? 100
      : (fourOfAKindCombinations.combinations / totalCombinationsAvailable) * 100;

    const fullHouseCombinations = checkFullHouseCombinations();
    probability.fullHouse = fullHouseCombinations.alreadyWin ? 100
      : (fullHouseCombinations.combinations / totalCombinationsAvailable) * 100;

    const flushCombinations = checkFlushCombinations();
    probability.flush = (flushCombinations / totalCombinationsAvailable) * 100;

    const straightCombinations = checkStraightCombinations();
    probability.straight = (straightCombinations / totalCombinationsAvailable) * 100;

    const threeOfAKindCombinations = checkThreeOfAKindCombinations();
    probability.threeOfAKind = threeOfAKindCombinations.alreadyWin ? 100
      : (threeOfAKindCombinations.combinations / totalCombinationsAvailable) * 100;

    const twoPairCombinations = checkTwoPairCombinations();
    probability.twoPairs = twoPairCombinations.alreadyWin ? 100
      : (twoPairCombinations.combinations / totalCombinationsAvailable) * 100;

    updateProbabilityUI();
  }
};

const bet1 = () => {
  if (mode === 'finalDeal') {
    resetGame();
  }

  if (playerBet < 5 && playerCredits !== 0) {
    playerBet += 1;
    playerCredits -= 1;

    if (playerBet === 5) {
      disableButton('bet-1');
    }

    disableButton('bet-5');
    enableButton('deal');

    updatePlayerBetUI();
    updatePlayerCreditsUI();

    highlightRewardColumn();
  }
};

const bet5 = () => {
  if (mode === 'finalDeal') {
    resetGame();
  }

  if (playerCredits >= 5) {
    playerBet = 5;
    playerCredits -= 5;
  } else {
    playerBet = playerCredits;
    playerCredits = 0;
  }

  disableButton('bet-5');
  disableButton('bet-1');
  enableButton('deal');

  updatePlayerBetUI();
  updatePlayerCreditsUI();

  highlightRewardColumn();
};

const deal = () => {
  disableButton('bet-1');
  disableButton('bet-5');
  disableButton('deal');

  if (mode === '') {
    mode = 'firstDeal';
  } else if (mode === 'firstDeal') {
    mode = 'finalDeal';
  }

  if (mode === 'firstDeal') {
    let drawnCard;

    enableButton('calculate-probability');

    for (let i = 0; i < 5; i += 1) {
      drawnCard = shuffledDeck.pop();
      drawnCard.hold = false;

      // stats.hand.push(drawnCard);
      // stats.name[drawnCard.name] += 1;
      // stats.suit[drawnCard.suit] += 1;

      // cardsLeft[drawnCard.name][drawnCard.suit] -= 1;
    }

    stats = threeOfAKindHand;
    cardsLeft = threeOfAKindCardsLeft;

    updateCardsUI();
    updateInstructions(
      "Click on any card to hold and press <span class='nes-text is-primary'>Deal</span> again.",
    );
  } else if (mode === 'finalDeal') {
    refreshHand();
    updateCardsUI();
    calcHandScore();

    updateInstructions(`${outcome} Restart by pressing <span class='nes-text is-warning'>Bet 1</span> or <span class='nes-text is-error'>Bet 5</span> and pressing <span class='nes-text is-primary'>Deal</span> after.`);

    countPlayerCredits();
    updatePlayerCreditsUI();

    playerBet = 0;

    updatePlayerBetUI();
    if (playerCredits !== 0) {
      enableButton('bet-1');
      enableButton('bet-5');
    }
  }
};

const initGame = () => {
  shuffledDeck = shuffleCards(makeDeck());

  document.getElementById('bet-1').addEventListener('click', () => bet1());
  document.getElementById('bet-5').addEventListener('click', () => bet5());
  document.getElementById('deal').addEventListener('click', () => deal());
  document.getElementById('calculate-probability').addEventListener('click', () => calculateProbability());
};

const gameOver = () => {
  updateInstructions('Game over.');
};

initGame();
