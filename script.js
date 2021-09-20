/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% GLOBAL VARIABLES %%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

let points = 100;
let deck = [];
let hand = [];
let canClickCard = true;
let canBet = true;
let currentBet = 1;
let result = 'BUMMER';
let aceHigh = false;

const multipliers = ['800', '50', '25', '9', '6', '4', '3', '2', '1'];

const tableDiv = document.createElement('div');
const resultsDiv = document.createElement('div');
const handDiv = document.createElement('div');
const buttonDiv = document.createElement('div');
const betInput = document.createElement('div');
const dealBtn = document.createElement('div');
const scoreDiv = document.createElement('div');

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
  const suitImgs = ['heart.png', 'diamond.png', 'club.png', 'spade.png'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentImg = suitImgs[suitIndex];

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
        img: currentImg,
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
 * Function that resets deck (shuffled) and clears handDiv
 */
const resetGame = () => {
  deck = makeDeck();
  shuffleCards(deck);
  handDiv.innerHTML = '';
  result = 'BUMMER';
};

/**
 * Function that updates 'WIN' column in table
 */
const updateWinInTable = () => {
  const rows = document.querySelector('#table-body').querySelectorAll('tr');
  for (let i = 0; i < 9; i += 1) {
    const winCell = rows[i].querySelectorAll('td')[2];
    winCell.childNodes[0].data = currentBet * multipliers[i];
  }
};

/* ############################################################
################### PLAYER ACTION LOGIC ########################
########################################################### */

/**
 * Function that toggles element's class between 'unclicked-card' and 'clicked-card'
 * @param {element} of which to toggle class
 */
const onCardClick = (cardEl) => {
  if (canClickCard === true) {
    if (cardEl.classList.contains('unclicked-card')) {
      cardEl.classList.remove('unclicked-card');
      cardEl.classList.add('clicked-card');
      cardEl.querySelector('.hold-text').classList.add('show-hold-text');
    } else {
      cardEl.classList.remove('clicked-card');
      cardEl.classList.add('unclicked-card');
      cardEl.querySelector('.show-hold-text').classList.remove('show-hold-text');
    }
  }
};

/**
 * Function that switches function of deal/draw button
 */
const onButtonClick = () => {
  dealBtn.classList.add('press-button');
  // eslint-disable-next-line
  const buttonPress = setTimeout(() => {
    dealBtn.classList.remove('press-button');
  }, 100);
  if (resultsDiv.classList.contains('animate__animated')) {
    resultsDiv.classList.remove('animate__animated');
    resultsDiv.classList.remove('animate__flash');
    resultsDiv.classList.remove('animate__infinite');
  }
  if (canClickCard && !canBet) {
    // eslint-disable-next-line
    drawCards();
  } else {
    // eslint-disable-next-line
    dealCards();
  }
};

/**
 * Function that swaps out unselected cards for new cards, then calculate and updates points
 * Changes draw button to new game button
 */
const drawCards = () => {
  canClickCard = false;
  canBet = true;

  // change UNselected cards
  const cardsToChange = handDiv.querySelectorAll('.unclicked-card');
  for (let i = 0; i < cardsToChange.length; i += 1) {
    cardsToChange[i].classList.remove('animate__flipInY');
    cardsToChange[i].classList.add('animate__flipOutY');

    const indexInHand = Number(cardsToChange[i].id[4]);
    hand[indexInHand] = deck.pop();

    // eslint-disable-next-line
    const delayChangeCards = setTimeout(() => {
      cardsToChange[i].querySelector('.card-name').innerText = `${hand[indexInHand].name}`;
      cardsToChange[i].querySelector('.suit-img').src = `vp-img/${hand[indexInHand].img}`;
      if (hand[i].img === 'heart.png' || hand[i].img === 'diamond.png') {
        cardsToChange[i].querySelector('.suit-img').classList.add('red');
      }
      cardsToChange[i].classList.remove('animate__flipOutY');
      cardsToChange[i].classList.add('animate__flipInY');
    }, 500);
  }

  // remove selection on cards
  const cardsClicked = handDiv.querySelectorAll('.clicked-card');
  for (let j = 0; j < cardsClicked.length; j += 1) {
    cardsClicked[j].classList.remove('clicked-card');
    cardsClicked[j].classList.add('unclicked-card');
    cardsClicked[j].querySelector('.show-hold-text').classList.remove('show-hold-text');
  }

  // tally
  const cardRankTally = {};
  const cardSuitTally = {};

  for (let k = 0; k < hand.length; k += 1) {
    const currentRank = hand[k].rank;
    const currentSuit = hand[k].suit;

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

  // eslint-disable-next-line
  const delayResults = setTimeout(() => {
    scoreDiv.innerText = `CREDITS ${points}`;
    resultsDiv.innerHTML = `${result} <br> BET AND PRESS 'DEAL' TO PLAY AGAIN`;
  }, 500);

  dealBtn.innerText = 'DEAL';
};

/**
 * Function to deal 5 cards from deck to hand, create span for each card with event listener
 * Changes deal button to draw button
 */
const dealCards = () => {
  resetGame();

  canClickCard = true;
  canBet = false;

  resultsDiv.innerText = 'CLICK ON CARDS YOU WISH TO HOLD';

  hand = deck.splice(0, 5);
  /* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  !!!!!!!!!!!!!!!!!!!!!!!! HARD CODE HAND !!!!!!!!!!!!!!!!!!!!!!!
  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
  // ♠️ ♣️ ❤️ ♦️
  // hand = [{
  //   name: '9', suit: '❤️', rank: 9, img: 'heart.png',
  // }, {
  //   name: 'J', suit: '♦️', rank: 11, img: 'heart.png',
  // }, {
  //   name: '7', suit: '♣️', rank: 7, img: 'heart.png',
  // }, {
  //   name: '8', suit: '♦️', rank: 8, img: 'heart.png',
  // }, {
  //   name: '10', suit: '❤️', rank: 10, img: 'heart.png',
  // }];

  // create div for each card
  for (let i = 0; i < 5; i += 1) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('unclicked-card');
    cardDiv.classList.add('animate__animated');
    cardDiv.classList.add('animate__flipInY');
    cardDiv.setAttribute('id', `card${i}`);
    cardDiv.addEventListener('click', (event) => { onCardClick(event.currentTarget); });
    handDiv.appendChild(cardDiv);

    const cardName = document.createElement('p');
    cardName.classList.add('card-name');
    cardName.innerText = `${hand[i].name}`;
    cardDiv.appendChild(cardName);

    const cardSuitImg = document.createElement('img');
    cardSuitImg.src = `vp-img/${hand[i].img}`;
    cardSuitImg.classList.add('suit-img');
    cardDiv.appendChild(cardSuitImg);
    if (hand[i].img === 'heart.png' || hand[i].img === 'diamond.png') {
      cardSuitImg.classList.add('red');
    }

    const holdDiv = document.createElement('div');
    holdDiv.classList.add('hold-text');
    holdDiv.innerText = 'HOLD';
    cardDiv.appendChild(holdDiv);
  }

  // store bet
  points -= currentBet;
  scoreDiv.innerText = `CREDITS ${points}`;

  // remove deal button and creates draw button
  dealBtn.innerText = 'DRAW';
};

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
      result = 'JACKS OR BETTER';
      return 1;
    }
  }
  return 0;
};

// check two pair
const checkTwoPair = (rankTally, rankKeys) => {
  if (checkPairs(rankTally, rankKeys) === 2) {
    result = 'TWO PAIRS';
    return 2;
  }
  return 0;
};

// check three of a kind
const checkThreeOfAKind = (rankTally, rankKeys) => {
  for (let i = 0; i < rankKeys.length; i += 1) {
    if (rankTally[rankKeys[i]] === 3) {
      result = 'THREE OF A KIND';
      return 3;
    }
  }
  return 0;
};

// check straight
const checkStraight = (rankTally, rankKeys) => {
  let straightCounter = 0;
  aceHigh = false;
  for (let i = 1; i < rankKeys.length; i += 1) {
    const currentRank = Number(rankKeys[i]);
    const previousRank = Number(rankKeys[i - 1]);
    if (currentRank === (previousRank + 1)) {
      straightCounter += 1;
    }
  }

  if (straightCounter === 4) {
    result = 'STRAIGHT';
    return 4;
  }

  // for ace-high straight
  if (straightCounter === 3 && rankKeys[0] === 1 && rankKeys[1] === 10) {
    result = 'STRAIGHT (ACE-HIGH)';
    aceHigh = true;
    return 4;
  }

  return 0;
};

// check flush
const checkFlush = (suitTally, suitKeys) => {
  for (let i = 0; i < suitKeys.length; i += 1) {
    if (suitTally[suitKeys[i]] === 5) {
      result = 'FLUSH';
      return 6;
    }
  }
  return 0;
};

// check full house
const checkFullHouse = (rankTally, rankKeys) => {
  if (checkThreeOfAKind(rankTally, rankKeys) !== 0
  && checkPairs(rankTally, rankKeys) === 1) {
    result = 'FULL HOUSE';
    return 9;
  }
  return 0;
};

// check four of a kind
const checkFourOfAKind = (rankTally, rankKeys) => {
  for (let i = 0; i < rankKeys.length; i += 1) {
    if (rankTally[rankKeys[i]] === 4) {
      result = 'FOUR OF A KIND';
      return 25;
    }
  }
  return 0;
};

// check straight flush
const checkStraightFlush = (rankTally, rankKeys, suitTally, suitKeys) => {
  if (checkStraight(rankTally, rankKeys) !== 0 && checkFlush(suitTally, suitKeys) !== 0) {
    if (aceHigh === true) {
      result = 'ROYAL FLUSH';
      return 800;
    }
    result = 'STRAIGHT FLUSH';
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

/**
 * Function that INCREASES currentBet by 1 and updates betInput
 */
const increaseBet = () => {
  if (canBet) {
    currentBet += 1;
    betInput.innerText = currentBet;
    updateWinInTable();
  }
};

/**
 * Function that DECREASES currentBet by 1 and updates betInput
 */
const decreaseBet = () => {
  if (currentBet > 1 && canBet) {
    currentBet -= 1;
    betInput.innerText = currentBet;
    updateWinInTable();
  }
};

/* ############################################################
###################### INITIALISATION ########################
########################################################### */

// create table
const createTable = () => {
  tableDiv.classList.add('table-div');
  tableDiv.classList.add('animate__animated');
  tableDiv.classList.add('animate__fadeIn');
  document.body.appendChild(tableDiv);
  const tableEl = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');
  tableBody.setAttribute('id', 'table-body');
  tableEl.appendChild(tableHead);
  tableEl.appendChild(tableBody);
  tableDiv.appendChild(tableEl);

  const tableHeaders = ['HAND', 'X', 'WIN', 'CHANCE'];

  const headRow = document.createElement('tr');
  tableHead.appendChild(headRow);
  for (let k = 0; k < 4; k += 1) {
    const headCell = document.createElement('th');
    const headCellText = document.createTextNode(tableHeaders[k]);
    headCell.appendChild(headCellText);
    headRow.appendChild(headCell);
  }

  const winningHands = ['ROYAL FLUSH', 'STRAIGHT FLUSH', '4 OF A KIND', 'FULL HOUSE', 'FLUSH', 'STRAIGHT', '3 OF A KIND', '2 PAIRS', 'JACKS OR BETTER'];

  for (let i = 0; i < 9; i += 1) {
    const row = document.createElement('tr');

    for (let j = 0; j < 4; j += 1) {
      const cell = document.createElement('td');
      if (j === 0) {
        const currentHand = winningHands[i];
        const cellText = document.createTextNode(currentHand);
        cell.appendChild(cellText);
      } else if (j === 1) {
        const currentMultiplier = multipliers[i];
        const cellText = document.createTextNode(currentMultiplier);
        cell.appendChild(cellText);
      } else {
        const cellText = document.createTextNode('');
        cell.appendChild(cellText);
      }
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }
};

/**
 * Function to initialise game
 */
const initialiseGame = () => {
  createTable();
  updateWinInTable();

  buttonDiv.classList.add('button-div');

  const betDiv = document.createElement('div');
  buttonDiv.appendChild(betDiv);
  betDiv.classList.add('bet-div');

  const betMinus = document.createElement('div');
  const betPlus = document.createElement('div');
  betMinus.innerText = '-';
  betPlus.innerText = '+';
  betMinus.classList.add('bet-buttons');
  betPlus.classList.add('bet-buttons');
  betMinus.addEventListener('click', decreaseBet);
  betPlus.addEventListener('click', increaseBet);

  betInput.setAttribute('id', 'bet');
  betInput.innerText = currentBet;
  betDiv.appendChild(betMinus);
  betDiv.appendChild(betInput);
  betDiv.appendChild(betPlus);

  dealBtn.classList.add('deal-button');
  dealBtn.innerText = 'DEAL';
  dealBtn.addEventListener('click', onButtonClick);
  buttonDiv.appendChild(dealBtn);

  resultsDiv.classList.add('results');
  resultsDiv.classList.add('animate__animated');
  resultsDiv.classList.add('animate__fadeIn');
  // eslint-disable-next-line
  const delayResultsAnimation = setTimeout(() => {
    resultsDiv.classList.remove('animate__fadeIn');
    resultsDiv.classList.add('animate__flash');
    resultsDiv.classList.add('animate__infinite');
  }, 1500);
  resultsDiv.innerText = "INPUT YOUR BET AND PRESS 'DEAL' TO BEGIN";

  scoreDiv.innerText = `CREDITS ${points}`;

  document.body.appendChild(resultsDiv);
  handDiv.classList.add('hand');
  document.body.appendChild(handDiv);
  document.body.appendChild(buttonDiv);
  document.body.appendChild(scoreDiv);
  scoreDiv.classList.add('score');
  resetGame();
};

initialiseGame();
