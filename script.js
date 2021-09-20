/* eslint-disable no-undef */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% GLOBAL VARIABLES %%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

let points = 100;
let deck = [];
let hand = [];
let canClickCard = false;
let canClickButton = true;
let currentBet = 1;

const multipliers = ['800', '50', '25', '9', '6', '4', '3', '2', '1'];
let probabilities = ['0.003%', '0.011%', '0.236%', '1.151%', '1.102%', '1.123%', '7.445%', '12.928%', '21.459%'];

/* ############################################################
###############EE#### HELPER FUNCTIONS ########################
########################################################### */

/**
 * Function that resets and shuffles deck, clears handDiv, and defaults result
 */
const resetGame = () => {
  deck = makeDeck();
  shuffleCards(deck);
  document.querySelector('.hand').innerHTML = ''; // empty hand array
  result = 'BUMMER :('; // result is lose by default
  probabilities = ['0.003%', '0.011%', '0.236%', '1.151%', '1.102%', '1.123%', '7.445%', '12.928%', '21.459%'];
  updateChanceInTable();
};

/**
 * Function that updates 'WIN' column in table
 */
const updateWinInTable = () => {
  const rows = document.querySelector('#table-body').querySelectorAll('tr');
  for (let i = 0; i < 9; i += 1) {
    const winCell = rows[i].querySelectorAll('td')[2];
    winCell.childNodes[0].data = currentBet * multipliers[i];

    winCell.classList.add('yellow-text');
    // eslint-disable-next-line
    const removeYellow = setTimeout( () => {
      winCell.classList.remove('yellow-text');
    }, 500);
  }
};

const updateChanceInTable = () => {
  const rows = document.querySelector('#table-body').querySelectorAll('tr');
  for (let i = 0; i < 9; i += 1) {
    const winCell = rows[i].querySelectorAll('td')[3];
    winCell.childNodes[0].data = probabilities[i];

    winCell.classList.add('yellow-text');
    // eslint-disable-next-line
    const removeYellow = setTimeout( () => {
      winCell.classList.remove('yellow-text');
    }, 500);
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
      cardEl.querySelector('.hold-text').classList.remove('hide');
    } else {
      cardEl.classList.remove('clicked-card');
      cardEl.classList.add('unclicked-card');
      cardEl.querySelector('.hold-text').classList.add('hide');
    }
    calcProb();
  }
};

/**
 * Function that switches function of deal/draw button
 */
const onButtonClick = () => {
  if (document.querySelector('.results').classList.contains('animate__animated')) {
    document.querySelector('.results').classList.remove('animate__animated');
    document.querySelector('.results').classList.remove('animate__flash');
    document.querySelector('.results').classList.remove('animate__infinite');
  }

  if (canClickButton) {
    canClickButton = false;
    document.querySelector('.game-button').classList.add('press-button');
    // eslint-disable-next-line
    const buttonPress = setTimeout(() => {
      document.querySelector('.game-button').classList.remove('press-button');
    }, 100);

    if (canClickCard) {
    // eslint-disable-next-line
    drawCards();
    } else {
    // eslint-disable-next-line
    dealCards();
    }

    // eslint-disable-next-line
    const resetButton = setTimeout(() => {
      canClickButton = true;
    }, 1000);
  }
};

/**
 * Function that swaps out unselected cards for new cards, then calculate and updates points
 * Changes draw button to new game button
 */
const drawCards = () => {
  canClickCard = false;
  document.querySelectorAll('.bet-buttons')[0].classList.remove('hide-text');
  document.querySelectorAll('.bet-buttons')[1].classList.remove('hide-text');

  // change UNselected cards
  const cardsToChange = document.querySelector('.hand').querySelectorAll('.unclicked-card');
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
  const cardsClicked = document.querySelector('.hand').querySelectorAll('.clicked-card');
  for (let j = 0; j < cardsClicked.length; j += 1) {
    cardsClicked[j].classList.remove('clicked-card');
    cardsClicked[j].classList.add('unclicked-card');
    cardsClicked[j].querySelector('.hold-text').classList.add('hide');
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
    document.querySelector('.score').innerText = `CREDITS ${points}`;
    document.querySelector('.results').innerHTML = `${result} <br> BET AND PRESS 'DEAL' TO PLAY AGAIN`;

    document.querySelector('.hand').classList.add('animate__animated');
    document.querySelector('.hand').classList.add('animate__shakeY');
    document.querySelector('.hand').classList.add('animate__infinite');
  }, 500);

  document.querySelector('.game-button').innerText = 'DEAL';
};

/**
 * Function to deal 5 cards from deck to hand, create span for each card with event listener
 * Changes deal button to draw button
 */
const dealCards = () => {
  resetGame();

  canClickCard = true;
  document.querySelectorAll('.bet-buttons')[0].classList.add('hide-text');
  document.querySelectorAll('.bet-buttons')[1].classList.add('hide-text');

  document.querySelector('.results').innerText = 'CLICK ON CARDS YOU WISH TO HOLD';

  hand = deck.splice(0, 5);

  // create div for each card
  for (let i = 0; i < 5; i += 1) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('unclicked-card');
    cardDiv.classList.add('animate__animated');
    cardDiv.classList.add('animate__flipInY');
    cardDiv.setAttribute('id', `card${i}`);
    cardDiv.addEventListener('click', (event) => { onCardClick(event.currentTarget); });
    cardDiv.addEventListener('mouseenter', (event) => { onCardEnter(event.currentTarget); });
    cardDiv.addEventListener('mouseleave', (event) => { onCardLeave(event.currentTarget); });
    document.querySelector('.hand').appendChild(cardDiv);

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
    holdDiv.classList.add('hide');
    holdDiv.innerText = 'HOLD';
    cardDiv.appendChild(holdDiv);
  }

  // store bet
  points -= currentBet;
  document.querySelector('.score').innerText = `CREDITS ${points}`;

  // remove deal button and creates draw button
  document.querySelector('.game-button').innerText = 'DRAW';

  document.querySelector('.hand').classList.remove('animate__animated');
  document.querySelector('.hand').classList.remove('animate__shakeY');
  document.querySelector('.hand').classList.remove('animate__infinite');
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

  console.log(tallyRanks);
  console.log(tallySuits);

  const multiplierArray = [];
  multiplierArray.push(checkJacksOrBetter(tallyRanks, keyRanks));
  multiplierArray.push(checkTwoPair(tallyRanks, keyRanks));
  multiplierArray.push(checkThreeOfAKind(tallyRanks, keyRanks));
  multiplierArray.push(checkStraight(tallyRanks, keyRanks));
  multiplierArray.push(checkFlush(tallySuits, keySuits));
  multiplierArray.push(checkFullHouse(tallyRanks, keyRanks));
  multiplierArray.push(checkFourOfAKind(tallyRanks, keyRanks));
  multiplierArray.push(checkStraightFlush(tallyRanks, keyRanks, tallySuits, keySuits));
  multiplierArray.push(checkRoyalFlush(tallyRanks, keyRanks, tallySuits, keySuits));

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
  if (!canClickCard) {
    currentBet += 1;
    document.querySelector('#bet').innerText = currentBet;
    updateWinInTable();
  }
};

/**
 * Function that DECREASES currentBet by 1 and updates betInput
 */
const decreaseBet = () => {
  if (currentBet > 1 && !canClickCard) {
    currentBet -= 1;
    document.querySelector('#bet').innerText = currentBet;
    updateWinInTable();
  }
};

/* ############################################################
###################### INITIALISATION ########################
########################################################### */

// create header
const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('animate__animated');
  header.classList.add('animate__fadeIn');

  const mainTitle = document.createElement('h1');
  mainTitle.addEventListener('mouseenter', () => { onTitleEnter(mainTitle); });
  mainTitle.addEventListener('mouseleave', () => { onTitleLeave(mainTitle); });
  mainTitle.innerText = 'VIDEO POKER';
  header.appendChild(mainTitle);

  document.body.appendChild(header);
};

// create table
const createTable = () => {
  const tableDiv = document.createElement('div');
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
      } else if (j < 3) {
        const currentMultiplier = multipliers[i];
        const cellText = document.createTextNode(currentMultiplier);
        cell.appendChild(cellText);
      } else {
        const currentProb = probabilities[i];
        const cellText = document.createTextNode(currentProb);
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
  createHeader();
  createTable();
  updateWinInTable();

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-div');

  const betDiv = document.createElement('div');
  buttonDiv.appendChild(betDiv);

  const betDivHead = document.createElement('div');
  betDivHead.innerText = 'BET';
  betDivHead.classList.add('bet-head');
  betDiv.appendChild(betDivHead);
  const betDivBody = document.createElement('div');
  betDivBody.classList.add('bet-div');
  betDiv.appendChild(betDivBody);

  const betMinus = document.createElement('div');
  const betPlus = document.createElement('div');
  betMinus.innerText = '-';
  betPlus.innerText = '+';
  betMinus.classList.add('bet-buttons');
  betPlus.classList.add('bet-buttons');
  betMinus.addEventListener('click', decreaseBet);
  betMinus.addEventListener('mouseenter', () => { onButtonEnter(betMinus); });
  betMinus.addEventListener('mouseleave', () => { onButtonLeave(betMinus); });
  betPlus.addEventListener('click', increaseBet);
  betPlus.addEventListener('mouseenter', () => { onButtonEnter(betPlus); });
  betPlus.addEventListener('mouseleave', () => { onButtonLeave(betPlus); });

  const betInput = document.createElement('div');
  betInput.setAttribute('id', 'bet');
  betInput.innerText = currentBet;
  betDivBody.appendChild(betMinus);
  betDivBody.appendChild(betInput);
  betDivBody.appendChild(betPlus);

  const gameBtn = document.createElement('div');
  gameBtn.classList.add('game-button');
  gameBtn.innerText = 'DEAL';
  gameBtn.addEventListener('click', onButtonClick);
  gameBtn.addEventListener('mouseenter', () => { onButtonEnter(gameBtn); });
  gameBtn.addEventListener('mouseleave', () => { onButtonLeave(gameBtn); });
  buttonDiv.appendChild(gameBtn);

  const resultsDiv = document.createElement('div');
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

  const scoreDiv = document.createElement('div');
  scoreDiv.innerText = `CREDITS ${points}`;

  document.body.appendChild(resultsDiv);
  const handDiv = document.createElement('div');
  handDiv.classList.add('hand');
  document.body.appendChild(handDiv);
  document.body.appendChild(buttonDiv);
  document.body.appendChild(scoreDiv);
  scoreDiv.classList.add('score');
  resetGame();
};

initialiseGame();
