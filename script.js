/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% GLOBAL VARIABLES %%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

let points = 100;
let deck = [];
// eslint-disable-next-line
let hand = [];
let canClick = false;
let result = '';
let currentBet = 0;

const handDiv = document.createElement('div');
const buttonDiv = document.createElement('div');
const resultsDiv = document.createElement('results');

/* ############################################################
###############EE#### HELPER FUNCTIONS ########################
########################################################### */

/**
 * Function that creates 52 distinct cards, i.e. a poker deck
 * @return newDeck {array}
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ['❤️', '♦️', '♣️', '♠️'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;

      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      newDeck.push(card);
    }
  }
  return newDeck;
};

/**
 * Function that gives random number x, where 0 <= x < max
 * @param max {number} for the upper bound
 * @return {number} between 0 (inclusive) and max
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Function that shuffles cards
 * @param cardDeck {array} to be shuffled
 * @return cardDeck {array} that has been shuffled
 */
const shuffleCards = (cardDeck) => {
  for (let currentIndex = 0; currentIndex < cardDeck.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cardDeck.length);
    const randomCard = cardDeck[randomIndex];
    const currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

/**
 * Function that resets deck (shuffled), handDiv, buttonDiv (with deal button)
 */
const resetGame = () => {
  deck = makeDeck();
  shuffleCards(deck);

  handDiv.innerHTML = '';
  buttonDiv.innerHTML = '';
  result = '';
  resultsDiv.innerHTML = '';

  const betInput = document.createElement('input');
  betInput.setAttribute('id', 'bet');
  buttonDiv.appendChild(betInput);

  const dealBtn = document.createElement('button');
  dealBtn.innerText = 'Deal';
  // eslint-disable-next-line
  dealBtn.addEventListener('click', dealCards);
  buttonDiv.appendChild(dealBtn);
};

/* ############################################################
################### PLAYER ACTION LOGIC ########################
########################################################### */

/**
 * Function that toggles element's class between 'unclicked-card' and 'clicked-card'
 * @param {element} of which to toggle class
 */
const onCardClick = (cardEl) => {
  if (canClick === true) {
    if (cardEl.classList[0] === 'unclicked-card') {
      cardEl.classList.remove('unclicked-card');
      cardEl.classList.add('clicked-card');
    } else {
      cardEl.classList.remove('clicked-card');
      cardEl.classList.add('unclicked-card');
    }
  }
};

/**
 * Function that swaps out unselected cards for new cards, then calculate and updates points
 * Changes draw button to new game button
 */
const drawCards = () => {
  canClick = false;

  // change UNselected cards
  const cardsToChange = handDiv.querySelectorAll('.unclicked-card');
  for (let i = 0; i < cardsToChange.length; i += 1) {
    const indexInHand = Number(cardsToChange[i].id[4]);
    hand[indexInHand] = deck.pop();
    cardsToChange[i].innerText = `${hand[indexInHand].name}${hand[indexInHand].suit}`;
  }

  // remove selection on cards
  const cardsClicked = handDiv.querySelectorAll('.clicked-card');
  for (let j = 0; j < cardsClicked.length; j += 1) {
    cardsClicked[j].classList.remove('clicked-card');
    cardsClicked[j].classList.add('unclicked-card');
  }

  // tally
  const cardRankTally = {};
  const cardSuitTally = {};
  for (let i = 0; i < hand.length; i += 1) {
    const currentRank = hand[i].rank;
    const currentSuit = hand[i].suit;

    if (currentRank in cardRankTally) {
      cardRankTally[currentRank] += 1;
    } else {
      cardRankTally[currentRank] = 1;
    }

    if (currentSuit in cardSuitTally) {
      cardSuitTally[currentSuit] += 1;
    } else {
      cardSuitTally[currentSuit] = 1;
    }
  }

  // calculate and update points
  // eslint-disable-next-line
  points += calcHandScore(cardRankTally, cardSuitTally);
  buttonDiv.innerHTML = `Score: ${points}`;

  // print results
  resultsDiv.innerText = result;
  document.body.appendChild(resultsDiv);

  // new game button
  const newGameBtn = document.createElement('button');
  newGameBtn.innerText = 'New Game';
  newGameBtn.addEventListener('click', resetGame);
  buttonDiv.appendChild(newGameBtn);
};

/**
 * Function to deal 5 cards from deck to hand, create span for each card with event listener
 * Changes deal button to draw button
 */
const dealCards = () => {
  canClick = true;
  // hand = deck.splice(0, 5);
  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  !!!!!!!!!!!!!!!!!!!!!!!! HARD CODE HAND !!!!!!!!!!!!!!!!!!!!!!!
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  // ♠️ ♣️ ❤️ ♦️
  hand = [{
    name: 'A',
    rank: 1,
    suit: '♣️',
  }, {
    name: '10',
    rank: 10,
    suit: '♣️',
  }, {
    name: 'J',
    rank: 11,
    suit: '♣️',
  }, {
    name: 'Q',
    rank: 12,
    suit: '♣️',
  }, {
    name: 'K',
    rank: 13,
    suit: '♣️',
  }];

  // create span for each card
  for (let i = 0; i < 5; i += 1) {
    const newSpan = document.createElement('span');
    newSpan.classList.add('unclicked-card');
    newSpan.setAttribute('id', `card${i}`);
    newSpan.innerText = `${hand[i].name}${hand[i].suit}`;
    newSpan.addEventListener('click', (event) => { onCardClick(event.currentTarget); });
    handDiv.appendChild(newSpan);
  }

  // store bet
  currentBet = Number(document.querySelector('#bet').value);
  points -= currentBet;

  // remove deal button and creates draw button
  buttonDiv.innerHTML = '';
  const drawBtn = document.createElement('button');
  drawBtn.innerText = 'Draw';
  drawBtn.addEventListener('click', drawCards);
  buttonDiv.appendChild(drawBtn);
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$ CALCULATE HAND SCORE $$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

// check how many pairs
const checkPairs = (rankTally, rankKeys) => {
  let numPairs = 0;
  for (let i = 0; i < rankKeys.length; i += 1) {
    if (rankTally[rankKeys[i]] === 2) {
      numPairs += 1;
    }
  }
  return numPairs;
};

// check one pair
const checkJacksOrBetter = (rankTally, rankKeys) => {
  if (checkPairs(rankTally, rankKeys) === 1) {
    if (rankTally[1] === 2
      || rankTally[11] === 2
      || rankTally[12] === 2
      || rankTally[13] === 2) {
      result = 'Jacks or Better';
      return 1;
    }
  }
  return 0;
};

// check two pair
const checkTwoPair = (rankTally, rankKeys) => {
  if (checkPairs(rankTally, rankKeys) === 2) {
    result = 'Two Pairs';
    return 2;
  }
  return 0;
};

// check three of a kind
const checkThreeOfAKind = (rankTally, rankKeys) => {
  for (let i = 0; i < rankKeys.length; i += 1) {
    if (rankTally[rankKeys[i]] === 3) {
      result = 'Three Of A Kind';
      return 3;
    }
  }
  return 0;
};

// check straight
const checkStraight = (rankTally, rankKeys) => {
  let straightCounter = 0;
  for (let i = 1; i < rankKeys.length; i += 1) {
    const currentRank = Number(rankKeys[i]);
    const previousRank = Number(rankKeys[i - 1]);
    if (currentRank === (previousRank + 1)) {
      straightCounter += 1;
    }
  }

  if (straightCounter === 4) {
    result = 'Straight';
    return 4;
  }

  // for ace-high straight
  if (straightCounter === 3 && rankKeys[0] === 1 && rankKeys[1] === 10) {
    result = 'Straight (Ace-High)';
    return 4;
  }

  return 0;
};

// check flush
const checkFlush = (suitTally, suitKeys) => {
  for (let i = 0; i < suitKeys.length; i += 1) {
    if (suitTally[suitKeys[i]] === 5) {
      result = 'Flush';
      return 6;
    }
  }
  return 0;
};

// check full house
const checkFullHouse = (rankTally, rankKeys) => {
  if (checkThreeOfAKind(rankTally, rankKeys) !== 0
  && checkPairs(rankTally, rankKeys) === 1) {
    result = 'Full House';
    return 9;
  }
  return 0;
};

// check four of a kind
const checkFourOfAKind = (rankTally, rankKeys) => {
  for (let i = 0; i < rankKeys.length; i += 1) {
    if (rankTally[rankKeys[i]] === 4) {
      result = 'Four Of A Kind';
      return 25;
    }
  }
  return 0;
};

// check straight flush
const checkStraightFlush = (rankTally, rankKeys, suitTally, suitKeys) => {
  if (checkStraight(rankTally, rankKeys) !== 0 && checkFlush(suitTally, suitKeys) !== 0) {
    result = 'Straight Flush';
    return 50;
  }
  return 0;
};

/**
 * Function that calculates score of a given hand
 * @param  an {array} hand containing cards to calculate score with
 * @return {number} score of hand (fixed as 1 temporariliy)
 */
// eslint-disable-next-line
const calcHandScore = (tallyRanks, tallySuits) => {
  const keyRanksStr = Object.keys(tallyRanks);
  const keySuits = Object.keys(tallySuits);
  const keyRanks = keyRanksStr.map((key) => Number(key));
  keyRanks.sort((a, b) => a - b);

  const multiplierArray = [];
  multiplierArray.push(checkJacksOrBetter(tallyRanks, keyRanks));
  multiplierArray.push(checkTwoPair(tallyRanks, keyRanks));
  multiplierArray.push(checkThreeOfAKind(tallyRanks, keyRanks));
  multiplierArray.push(checkStraight(tallyRanks, keyRanks));
  multiplierArray.push(checkFlush(tallySuits, keySuits));
  multiplierArray.push(checkFullHouse(tallyRanks, keyRanks));
  multiplierArray.push(checkFourOfAKind(tallyRanks, keyRanks));
  multiplierArray.push(checkStraightFlush(tallyRanks, keyRanks, tallySuits, keySuits));
  console.log(multiplierArray);

  let multiplier = 0;
  for (let i = 0; i < multiplierArray.length; i += 1) {
    if (multiplierArray[i] > multiplier) {
      multiplier = multiplierArray[i];
    }
  }

  let winnings = currentBet * multiplier;
  if (multiplier > 0) {
    winnings += currentBet;
  }

  return winnings;
};

/* ############################################################
###################### INITIALISATION ########################
########################################################### */

/**
 * Function to initialise game
 */
const initialiseGame = () => {
  document.body.appendChild(handDiv);
  document.body.appendChild(buttonDiv);
  resetGame();
};

initialiseGame();
