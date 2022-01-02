let shuffledDeck = [];

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

let playerCredits = 100;
let playerBet = 0;
let mode = '';
let outcome = 'Sorry you lost.';
let foundHand = '';
let totalCombinationsAvailable = 0;

/**
 *
 * @returns {Array} newDeck array contains a fresh deck of 52 cards
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const colors = ['red', 'red', 'black', 'black'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const color = colors[suitIndex];

    for (let rankCounter = 2; rankCounter <= 14; rankCounter += 1) {
      let cardName = `${rankCounter}`;

      if (cardName === '14') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        pic: `./images/cards/${cardName}_of_${currentSuit}.png`,
        color,
      };

      newDeck.push(card);
    }
  }

  return newDeck;
};

/**
 *
 * @param {Array} cards containing 52 newly created cards
 * @returns {Array} 52 shuffled cards
 */
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = Math.floor(Math.random() * cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const checkFourOfAKindHand = () => {
  const nameCount = Object.values(stats.name);

  if (nameCount.indexOf(4) !== -1) {
    return true;
  }

  return false;
};

const checkFullHouseHand = () => {
  const nameCount = Object.values(stats.name);

  if (nameCount.indexOf(3) !== -1 && nameCount.indexOf(2) !== -1) {
    return true;
  }

  return false;
};

const checkFlushHand = () => {
  const suitCount = Object.values(stats.suit);

  if (suitCount.indexOf(5) !== -1) {
    return true;
  }

  return false;
};

/**
 * to check that 5 cards are sequential in order
 */
const checkStraightHand = () => {
  const nameCount = Object.values(stats.name);

  // check whether there is any names repeated twice or more
  for (let i = 0; i < nameCount.length; i += 1) {
    if (nameCount[i] >= 2) {
      return null;
    }
  }

  // put all ranks into a table
  // if there is an ace, put both rank 1 and 14
  const rankTable = [];
  let rankTable2 = null;

  if (stats.name.ace === 1) {
    rankTable2 = [];
  }

  for (let i = 0; i < stats.hand.length; i += 1) {
    rankTable.push(stats.hand[i].rank);
    if (rankTable2 !== null) {
      if (stats.hand[i].name === 'ace') {
        rankTable2.push(14);
      } else {
        rankTable2.push(stats.hand[i].rank);
      }
    }
  }

  // check rankTable to see whether sequential
  rankTable.sort((a, b) => a - b);
  let sequential = true;
  for (let i = 1; i < rankTable.length; i += 1) {
    if (rankTable[i] - 1 === rankTable[i - 1]) {
      sequential = true;
    } else {
      sequential = false;
      break;
    }
  }

  if (rankTable2 !== null && sequential === false) {
    rankTable2.sort((a, b) => a - b);

    for (let i = 1; i < rankTable2.length; i += 1) {
      if (rankTable2[i] - 1 === rankTable2[i - 1]) {
        sequential = true;
      } else {
        sequential = false;
        break;
      }
    }
  }

  return sequential;
};

/**
 * to check that there are 3 cards of the same name
 */
const checkThreeOfAKindHand = () => {
  const nameCount = Object.values(stats.name);

  if (nameCount.indexOf(3) !== -1) {
    return true;
  }

  return false;
};

/**
 * to check there are at least two pairs of cards
 */
const checkTwoPairHand = () => {
  let noOfPairs = 0;

  const nameCount = Object.values(stats.name);

  for (let i = 0; i < nameCount.length; i += 1) {
    if (nameCount[i] >= 2) {
      noOfPairs += 1;
    }
  }

  if (noOfPairs === 2) {
    return true;
  }

  return false;
};

/**
 * to check 1 pair of jack
 */
const checkJacksOrBetterHand = () => {
  if (stats.name.jack >= 2) {
    return true;
  }

  return false;
};

const checkStraightFlushHand = () => {
  if (checkStraightHand() && checkFlushHand()) {
    return true;
  }

  return false;
};

const checkRoyalFlushHand = () => {
  if (checkFlushHand() && stats.name.ace === 1 && stats.name.king === 1 && stats.name.queen === 1 && stats.name.jack === 1 && stats.name['10'] === 1) {
    return true;
  }

  return false;
};

const calcHandScore = () => {
  if (checkRoyalFlushHand()) {
    outcome = 'Royal flush found!';
    foundHand = 'royalFlush';
    return;
  }
  if (checkStraightFlushHand()) {
    outcome = 'Straight flush found!';
    foundHand = 'straightFlush';
    return;
  }
  if (checkFourOfAKindHand()) {
    outcome = 'Four of a kind found!';
    foundHand = 'fourOfAKind';
    return;
  }
  if (checkFullHouseHand()) {
    outcome = 'Full house found!';
    foundHand = 'fullHouse';
    return;
  }
  if (checkFlushHand()) {
    outcome = 'Flush found!';
    foundHand = 'flush';
    return;
  }
  if (checkStraightHand()) {
    outcome = 'Straight found!';
    foundHand = 'straight';
    return;
  }
  if (checkThreeOfAKindHand()) {
    outcome = 'Three of a kind found!';
    foundHand = 'threeOfAKind';
    return;
  }
  if (checkTwoPairHand()) {
    outcome = 'Two pairs found!';
    foundHand = 'twoPairs';
    return;
  }
  if (checkJacksOrBetterHand()) {
    outcome = 'Jacks or better found!';
    foundHand = 'jacksOrBetter';
  }
};

const disableButton = (buttonId) => {
  document.getElementById(buttonId).className = 'nes-btn is-disabled';
  document.getElementById(buttonId).disabled = true;
};

const enableButton = (buttonId) => {
  document.getElementById(buttonId).classList.remove('is-disabled');
  document.getElementById(buttonId).disabled = false;

  if (buttonId === 'deal') {
    document.getElementById(buttonId).classList.add('is-primary');
  } else if (buttonId === 'bet-1') {
    document.getElementById(buttonId).classList.add('is-warning');
  } else if (buttonId === 'bet-5') {
    document.getElementById(buttonId).classList.add('is-error');
  } else if (buttonId === 'calculate-probability') {
    document.getElementById(buttonId).classList.add('is-normal');
  }
};

const updateInstructions = (instructions) => {
  document.getElementById('instructions').innerHTML = instructions;
};

const gameOver = () => {
  updateInstructions('Game over.');
};

const tallyPlayerCredits = () => {
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

const updatePlayerBetUI = () => {
  document.getElementById('player-bet').innerHTML = playerBet;
};

const updatePlayerCreditsUI = () => {
  document.getElementById('player-credits').innerHTML = playerCredits;
};

const toggleHold = (cardId) => {
  if (mode === 'firstDeal') {
    if (document.getElementById(`hold-${cardId}`).className === 'unhold') {
      document.getElementById(`hold-${cardId}`).className = 'hold';
      stats.hand[cardId].hold = true;
    } else {
      document.getElementById(`hold-${cardId}`).className = 'unhold';
      stats.hand[cardId].hold = false;
    }
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
  shuffledDeck = shuffleCards(makeDeck());
  outcome = 'Sorry you lost.';
};

const updateCardsUI = () => {
  let counter = 0;

  if (document.getElementById('cards').className === 'display-none') {
    document.getElementById('cards').className = 'flex';
  }

  // clear any outstanding cards
  for (let i = 0; i < 5; i += 1) {
    document.getElementById(`card-${i}`).innerHTML = '';
  }

  const setCards = setInterval(() => {
    const card = document.createElement('IMG');
    card.src = `${stats.hand[counter].pic}`;
    card.id = `${counter}`;

    const cardDiv = document.getElementById(`card-${counter}`);

    card.addEventListener('click', (event) => {
      toggleHold(event.target.id);
    });

    cardDiv.appendChild(card);

    const hold = document.createElement('div');
    hold.classList.add('unhold');
    hold.id = `hold-${counter}`;
    hold.innerText = 'Hold';

    hold.addEventListener('click', (event) => {
      toggleHold(event.target.id.split('-')[1]);
    });

    cardDiv.appendChild(hold);

    if (counter === 4) {
      clearInterval(setCards);
      if (mode === 'firstDeal') {
        enableButton('deal');
      }
    }

    counter += 1;
  }, 100);
};

const highlightRewardColumn = () => {
  const scoreTable = document.getElementById('score-table');

  for (let i = 0; i < scoreTable.rows.length; i += 1) {
    for (let j = 0; j <= 5; j += 1) {
      if (j === playerBet) {
        scoreTable.rows[i].cells[j].style.color = '#209cee';
      } else {
        scoreTable.rows[i].cells[j].style.color = 'white';
      }
    }
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

const updateProbabilityUI = () => {
  document.getElementById('probability-royal-flush').innerHTML = Number.parseFloat(probability.royalFlush).toFixed(5);
  document.getElementById('probability-straight-flush').innerHTML = Number.parseFloat(probability.straightFlush).toFixed(5);
  document.getElementById('probability-four-of-a-kind').innerHTML = Number.parseFloat(probability.fourOfAKind).toFixed(5);
  document.getElementById('probability-full-house').innerHTML = Number.parseFloat(probability.fullHouse).toFixed(5);
  document.getElementById('probability-flush').innerHTML = Number.parseFloat(probability.flush).toFixed(5);
  document.getElementById('probability-straight').innerHTML = Number.parseFloat(probability.straight).toFixed(5);
  document.getElementById('probability-three-of-a-kind').innerHTML = Number.parseFloat(probability.threeOfAKind).toFixed(5);
  document.getElementById('probability-two-pair').innerHTML = Number.parseFloat(probability.twoPairs).toFixed(5);
  document.getElementById('probability-jack-or-better').innerHTML = Number.parseFloat(probability.jacksOrBetter).toFixed(5);
};

const isHeldCardsSameSuit = (statsHand) => {
  const result = {
    suit: '',
    result: false,
  };

  let suitPlaceholder = '';
  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (suitPlaceholder === '') {
        suitPlaceholder = statsHand[i].suit;
      } else if (statsHand[i].suit !== suitPlaceholder) {
        return result;
      }
    }
  }

  result.suit = suitPlaceholder;
  result.result = true;

  return result;
};

const isHeldCardsSameName = (statsHand) => {
  let cardsAreSameName = true;
  let namePlaceholder = '';
  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (namePlaceholder === '') {
        namePlaceholder = statsHand[i].name;
      } else if (statsHand[i].name !== namePlaceholder) {
        cardsAreSameName = false;
        return cardsAreSameName;
      }
    }
  }

  return cardsAreSameName;
};

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const countHeldCards = () => {
  let counter = 0;

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      counter += 1;
    }
  }

  return counter;
};

const isHeldCardsRoyal = (statsHand) => {
  const result = {
    royalHand: {},
    result: false,
  };

  const royalHand = {
    ace: 0,
    king: 0,
    queen: 0,
    jack: 0,
    10: 0,
  };

  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (royalHand[statsHand[i].name] === undefined) {
        result.result = false;
        return result;
      }
      royalHand[statsHand[i].name] += 1;
    }
  }

  if (royalHand.ace > 1
    || royalHand.king > 1
    || royalHand.queen > 1
    || royalHand.jack > 1
    || royalHand[10] > 1) {
    result.result = false;

    return result;
  }

  result.royalHand = royalHand;
  result.result = true;
  return result;
};

const checkRoyalFlushCombinations = () => {
  const royalResult = isHeldCardsRoyal(stats.hand);
  const flushResult = isHeldCardsSameSuit(stats.hand);

  // check whether same suit first
  if (flushResult.result && royalResult.result) {
    // check whether user is already holding onto a royal flush hand
    if (countHeldCards() === 5 && checkRoyalFlushHand() === true) {
      return 1;
    }

    // check what are the remaining cards to draw to get a royal flush
    if (royalResult.royalHand.ace !== 1) {
      // check if card is available
      if (cardsLeft.ace[flushResult.suit] !== 1) {
        return 0;
      }
    }

    if (royalResult.royalHand.king !== 1) {
      // check if card is available
      if (cardsLeft.king[flushResult.suit] !== 1) {
        return 0;
      }
    }

    if (royalResult.royalHand.queen !== 1) {
      // check if card is available
      if (cardsLeft.queen[flushResult.suit] !== 1) {
        return 0;
      }
    }

    if (royalResult.royalHand.jack !== 1) {
      // check if card is available
      if (cardsLeft.jack[flushResult.suit] !== 1) {
        return 0;
      }
    }

    if (royalResult.royalHand[10] !== 1) {
      // check if card is available
      if (cardsLeft[10][flushResult.suit] !== 1) {
        return 0;
      }
    }

    return 1;
  }
  return 0;
};

const isHeldCardsWithinStraight = (statsHand) => {
  const result = {
    straightHand: {},
    diff: 0,
    result: false,
  };

  for (let i = 0; i < statsHand.length; i += 1) {
    if (statsHand[i].hold === true) {
      if (result.straightHand[statsHand[i].rank] === undefined) {
        result.straightHand[statsHand[i].rank] = 1;
      } else {
        return result;
      }
    }
  }

  // check if within 5
  const rankArray = Object.keys(result.straightHand);
  const diff = parseInt(rankArray[rankArray.length - 1], 10) - parseInt(rankArray[0], 10);
  if (diff <= 4) {
    result.result = true;
    result.diff = diff;
    return result;
  }

  result.straightHand = {};
  return result;
};

const checkStraightFlushCombinations = () => {
  const flushResult = isHeldCardsSameSuit(stats.hand);
  const withinStraightResult = isHeldCardsWithinStraight(stats.hand);

  let combinations = 0;

  if (flushResult.result && withinStraightResult.result) {
    const { straightHand } = withinStraightResult;
    const { diff } = withinStraightResult;
    const { suit } = flushResult;

    // check all the different cards i need to draw
    // if i have rank 1 and 5, 1 and 5 are the limits (diff = 4)
    // and i can only find 3, 4 ane 5
    // if i have rank 2 and 5, 1 and 6 are the limits (diff = 3)
    // e.g. 1,2,3,4,5 or 2,3,4,5,6
    // if i have rank 5 and 7, 3 and 9 are the limits (diff = 2)
    // e.g. 3,4,5,6,7 or 5,6,7,8,9
    // if i have rank 5 and 6, 2 and 9 are the limits (diff = 1)
    // e.g. 2,3,4,5,6,7 or 5,6,7,8,9

    const rankArray = Object.keys(straightHand);

    if (diff === 4) {
      let straightPossible = true;

      const firstRank = parseInt(rankArray[0], 10);

      for (let i = 1; i < 5; i += 1) {
        if (rankArray.indexOf((firstRank + i).toString()) === -1) {
          // current rank is not in held cards
          // find in cardsLeft
          if (cardsLeft[(firstRank + i).toString()][suit] === 0) {
            straightPossible = false;
          }
        }
      }

      if (straightPossible) {
        combinations += 1;
      }
    } else if (diff === 3) {
      let straightPossible = true;

      const firstRank1 = parseInt(rankArray[0], 10);
      const lastRank1 = firstRank1 + 4;

      for (let i = firstRank1; i <= lastRank1; i += 1) {
        if (straightHand[i] === undefined) {
          if (i === 1) {
            if (cardsLeft.ace[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 11) {
            if (cardsLeft.jack[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 12) {
            if (cardsLeft.queen[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 13) {
            if (cardsLeft.king[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i > 13) {
            straightPossible = false;
            break;
          } else if (cardsLeft[i][suit] === 0) {
            straightPossible = false;
            break;
          }
        }
      }

      if (straightPossible) {
        combinations += 1;
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 1 > 0) {
        const firstRank2 = parseInt(rankArray[0], 10) - 1;
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }
    } else if (diff === 2) {
      let straightPossible = true;

      const firstRank1 = parseInt(rankArray[0], 10) - 1;
      const lastRank1 = firstRank1 + 4;

      for (let i = firstRank1; i <= lastRank1; i += 1) {
        if (straightHand[i] === undefined) {
          if (i === 1) {
            if (cardsLeft.ace[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 11) {
            if (cardsLeft.jack[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 12) {
            if (cardsLeft.queen[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 13) {
            if (cardsLeft.king[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i > 13) {
            straightPossible = false;
            break;
          } else if (cardsLeft[i][suit] === 0) {
            straightPossible = false;
            break;
          }
        }
      }

      if (straightPossible) {
        combinations += 1;
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 1 > 0) {
        const firstRank2 = parseInt(rankArray[0], 10) - 1;
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 2 > 0) {
        const firstRank3 = parseInt(rankArray[0], 10) - 2;
        const lastRank3 = firstRank3 + 4;

        for (let i = firstRank3; i <= lastRank3; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }
    } else if (diff === 1) {
      let straightPossible = true;

      const firstRank1 = parseInt(rankArray[0], 10) - 1;
      const lastRank1 = firstRank1 + 4;

      for (let i = firstRank1; i <= lastRank1; i += 1) {
        if (straightHand[i] === undefined) {
          if (i === 1) {
            if (cardsLeft.ace[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 11) {
            if (cardsLeft.jack[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 12) {
            if (cardsLeft.queen[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i === 13) {
            if (cardsLeft.king[suit] === 0) {
              straightPossible = false;
              break;
            }
          } else if (i > 13) {
            straightPossible = false;
            break;
          } else if (cardsLeft[i][suit] === 0) {
            straightPossible = false;
            break;
          }
        }
      }

      if (straightPossible) {
        combinations += 1;
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 1 > 0) {
        const firstRank2 = parseInt(rankArray[0], 10) - 1;
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 2 > 0) {
        const firstRank3 = parseInt(rankArray[0], 10) - 2;
        const lastRank3 = firstRank3 + 4;

        for (let i = firstRank3; i <= lastRank3; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      if (parseInt(rankArray[0], 10) - 3 > 0) {
        const firstRank4 = parseInt(rankArray[0], 10) - 3;
        const lastRank4 = firstRank4 + 4;

        for (let i = firstRank4; i <= lastRank4; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }
    } else if (diff === 0) {
      let straightPossible = true;

      if (parseInt(rankArray[0], 10) !== 0) {
        const firstRank1 = parseInt(rankArray[0], 10);
        const lastRank1 = firstRank1 + 4;

        for (let i = firstRank1; i <= lastRank1; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 1 > 0) {
        const firstRank2 = parseInt(rankArray[0], 10) - 1;
        const lastRank2 = firstRank2 + 4;

        for (let i = firstRank2; i <= lastRank2; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 2 > 0) {
        const firstRank3 = parseInt(rankArray[0], 10) - 2;
        const lastRank3 = firstRank3 + 4;

        for (let i = firstRank3; i <= lastRank3; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 3 > 0) {
        const firstRank4 = parseInt(rankArray[0], 10) - 3;
        const lastRank4 = firstRank4 + 4;

        for (let i = firstRank4; i <= lastRank4; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }

      straightPossible = true;

      if (parseInt(rankArray[0], 10) - 4 > 0) {
        const firstRank5 = parseInt(rankArray[0], 10) - 4;
        const lastRank5 = firstRank5 + 4;

        for (let i = firstRank5; i <= lastRank5; i += 1) {
          if (straightHand[i] === undefined) {
            if (i === 1) {
              if (cardsLeft.ace[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 11) {
              if (cardsLeft.jack[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 12) {
              if (cardsLeft.queen[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i === 13) {
              if (cardsLeft.king[suit] === 0) {
                straightPossible = false;
                break;
              }
            } else if (i > 13) {
              straightPossible = false;
              break;
            } else if (cardsLeft[i][suit] === 0) {
              straightPossible = false;
              break;
            }
          }
        }

        if (straightPossible) {
          combinations += 1;
        }
      }
    }

    return combinations;
  }

  return 0;
};

const checkFourOfAKindCombinations = () => {
  const result = {
    combinations: 0,
    alreadyWin: false,
  };
  let combinations = 0;

  // get the cards being held first
  const fourOfAKindHand = {};

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      if (fourOfAKindHand[stats.hand[i].rank] === undefined) {
        fourOfAKindHand[stats.hand[i].rank] = 1;
      } else {
        fourOfAKindHand[stats.hand[i].rank] += 1;
      }
    }
  }

  const rankArray = Object.keys(fourOfAKindHand);

  if (Object.values(fourOfAKindHand).length >= 3) {
    // if there are 3 different card ranks are being held, return 0
    combinations = 0;
  } else if (Object.values(fourOfAKindHand).indexOf(4) !== -1) {
    // if there are already 4 cards with the same rank being held, return 1
    combinations = 1;
    result.alreadyWin = true;
  } else {
    for (let i = 0; i < rankArray.length; i += 1) {
      const rank = rankArray[i];
      const noOfCardsHeld = fourOfAKindHand[rank];
      const noOfCardsLeft = Object.values(cardsLeft[rank]).reduce((a, b) => a + b, 0);

      if (noOfCardsHeld + noOfCardsLeft === 4) {
        combinations += 1;
      }
    }
  }
  result.combinations = combinations;

  return result;
};

const factorialize = (num) => {
  if (num < 0) return -1;
  if (num === 0) return 1;
  return (num * factorialize(num - 1));
};

const totalCombinations = (numberOfCardsLeft, cardsToDraw) => {
  const numerator = factorialize(numberOfCardsLeft);
  const denominator = (factorialize(numberOfCardsLeft - cardsToDraw) * factorialize(cardsToDraw));

  return numerator / denominator;
};

const checkFullHouseCombinations = () => {
  const result = {
    combinations: 0,
    alreadyWin: false,
  };
  let combinations = 0;

  // get the cards being held first
  const fullHouseHand = {};

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      if (fullHouseHand[stats.hand[i].rank] === undefined) {
        fullHouseHand[stats.hand[i].rank] = 1;
      } else {
        fullHouseHand[stats.hand[i].rank] += 1;
      }
    }
  }

  const rankArray = Object.keys(fullHouseHand);

  if (rankArray.length >= 3) {
    combinations = 0;
  } else if (rankArray.length === 2) {
    // given the two different ranks A and B, i need to find out
    // different combinations of 3 As 2 Bs and 2 As 3 Bs.

    const rank1 = rankArray[0];
    const noOfRank1CardsHeld = fullHouseHand[rank1];
    const noOfRank1CardsLeft = Object.values(cardsLeft[rank1]).reduce((a, b) => a + b, 0);
    const totalRank1Cards = noOfRank1CardsHeld + noOfRank1CardsLeft;

    const rank2 = rankArray[0];
    const noOfRank2CardsHeld = fullHouseHand[rank2];
    const noOfRank2CardsLeft = Object.values(cardsLeft[rank2]).reduce((a, b) => a + b, 0);
    const totalRank2Cards = noOfRank2CardsHeld + noOfRank2CardsLeft;

    if (totalRank1Cards >= 3 && totalRank2Cards >= 2) {
      combinations += (totalCombinations(noOfRank1CardsLeft, 3 - noOfRank1CardsHeld)
      * totalCombinations(noOfRank2CardsLeft, 2 - noOfRank2CardsHeld));
    }

    if (totalRank2Cards >= 3 && totalRank1Cards >= 2) {
      combinations += (totalCombinations(noOfRank2CardsLeft, 3 - noOfRank2CardsHeld)
      * totalCombinations(noOfRank1CardsLeft, 2 - noOfRank1CardsHeld));
    }
  } else if (rankArray.length === 1) {
    // if there is only 1 rank A, i need to find out
    // different combinations of 3 As 2 Of Everything Else and
    // 2 As 3 Of Everything Else

    const rank1 = rankArray[0];
    const noOfRank1CardsHeld = fullHouseHand[rank1];
    const noOfRank1CardsLeft = Object.values(cardsLeft[rank1]).reduce((a, b) => a + b, 0);
    const totalRank1Cards = noOfRank1CardsHeld + noOfRank1CardsLeft;

    const cardsLeftKeys = Object.keys(cardsLeft);
    const cardsLeftValues = Object.keys(cardsLeft);

    if (totalRank1Cards >= 2) {
      const set1TotalCombinations = totalCombinations(noOfRank1CardsLeft, 2 - noOfRank1CardsHeld);

      for (let i = 0; i < cardsLeftKeys.length; i += 1) {
        if (cardsLeftValues[i] >= 3) {
          combinations += (set1TotalCombinations * totalCombinations(cardsLeftValues[i], 3));
        }
      }
    }

    if (totalRank1Cards >= 3) {
      const set1TotalCombinations = totalCombinations(noOfRank1CardsLeft, 3 - noOfRank1CardsHeld);

      for (let i = 0; i < cardsLeftKeys.length; i += 1) {
        if (cardsLeftValues[i] >= 2) {
          combinations += (set1TotalCombinations * totalCombinations(cardsLeftValues[i], 2));
        }
      }
    }
  }

  result.combinations = combinations;

  console.log('inside checkFullHouseCombinations');
  console.log(result);

  return result;
};

const calculateCardsToBeReplaced = () => {
  let replaceCounter = 0;
  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === false) {
      replaceCounter += 1;
    }
  }

  return replaceCounter;
};

const updateTotalCombinationsAvailableUI = (totalCombinations) => {
  document.getElementById('total-combinations').innerHTML = numberWithCommas(totalCombinations.toFixed(0));
};

const updateRoyalFlushProbabilityUI = (input) => {
  document.getElementById('probability-royal-flush').innerHTML = input;
};

const updateStraightFlushProbabilityUI = (input) => {
  document.getElementById('probability-straight-flush').innerHTML = input;
};

const updateFourOfAKindProbabilityUI = (input) => {
  document.getElementById('probability-four-of-a-kind').innerHTML = input;
};

const calculateProbability = () => {
  // take into account the hand and the amount
  // of cards being held or to be replaced

  const cardsToBeReplaced = calculateCardsToBeReplaced();
  totalCombinationsAvailable = totalCombinations(shuffledDeck.length, cardsToBeReplaced);
  updateTotalCombinationsAvailableUI(totalCombinationsAvailable);

  if (cardsToBeReplaced === 5) {
  } else if (cardsToBeReplaced === 0) {
    // if (checkRoyalFlushHand()) {
    //   probability.royalFlush = 100;
    // }
    // if (checkStraightFlushHand()) {
    //   probability.straightFlush = 100;
    // }
    // if (checkFourOfAKindHand()) {
    //   probability.fourOfAKind = 100;
    // }
    // if (checkFullHouseHand()) {
    //   probability.fullHouse = 100;
    // }
    // if (checkFlushHand()) {
    //   probability.flush = 100;
    // }
    // if (checkStraightHand()) {
    //   probability.straight = 100;
    // }
    // if (checkThreeOfAKindHand()) {
    //   probability.threeOfAKind = 100;
    // }
    // if (checkTwoPairHand()) {
    //   probability.twoPairs = 100;
    // }
    // if (checkJacksOrBetterHand()) {
    //   probability.jacksOrBetter = 100;
    // }
    // updateProbabilityUI();
  } else {
    const royalFlushCombinations = checkRoyalFlushCombinations();
    const royalFlushProbability = (royalFlushCombinations / totalCombinationsAvailable) * 100;
    updateRoyalFlushProbabilityUI(royalFlushProbability);

    const straightFlushCombinations = checkStraightFlushCombinations();
    const straightFlushProbability = (straightFlushCombinations / totalCombinationsAvailable) * 100;
    updateStraightFlushProbabilityUI(straightFlushProbability);

    const fourOfAKindCombinations = checkFourOfAKindCombinations();
    if (fourOfAKindCombinations.alreadyWin) {
      updateFourOfAKindProbabilityUI(100);
    } else {
      const fourOfAKindProbability = (fourOfAKindCombinations.combinations
        / totalCombinationsAvailable) * 100;
      updateFourOfAKindProbabilityUI(fourOfAKindProbability);
    }

    const fullHouseCombinations = checkFullHouseCombinations();
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

    stats = testFourOfAKindHand;
    cardsLeft = testFourOfAKindCardsLeft;
    updateCardsUI();
    updateInstructions(
      "Click on any card to hold and press <span class='nes-text is-primary'>Deal</span> again.",
    );
    // calculateProbability();
    // updateProbabilityUI();
  } else if (mode === 'finalDeal') {
    refreshHand();
    updateCardsUI();
    calcHandScore();

    updateInstructions(`${outcome} Restart by pressing <span class='nes-text is-warning'>Bet 1</span> or <span class='nes-text is-error'>Bet 5</span> and pressing <span class='nes-text is-primary'>Deal</span> after.`);

    tallyPlayerCredits();
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

initGame();
