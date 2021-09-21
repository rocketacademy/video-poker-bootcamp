/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */

/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%% GLOBAL VARIABLES %%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */

let points = 100;
let deck = [];
let hand = [];
let canClickCard = false;
let canClickButton = true; // used to prevent multiple clicks on deal/draw button
let currentBet = 1;

const multipliers = ['250', '50', '25', '9', '6', '4', '3', '2', '1'];
let probabilities = ['...', '...', '...', '...', '...', '...', '...', '...', '...'];

/* ############################################################
################### HELPER FUNCTIONS ########################
########################################################### */
/**
 * Function that creates card div with event listener, name, suit and hidden hold div
*/
const createCardEl = () => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('unclicked-card');
  animateCSS(cardDiv, 'flipInY');
  cardDiv.setAttribute('id', `card${i}`);
  document.querySelector('.hand').appendChild(cardDiv);

  cardDiv.addEventListener('click', (event) => { onCardClick(event.currentTarget); });
  cardDiv.addEventListener('mouseenter', (event) => { onCardEnter(event.currentTarget); });
  cardDiv.addEventListener('mouseleave', (event) => { onCardLeave(event.currentTarget); });

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
};

/**
 * Function that counts number of occurences of each element in array
 * @param {array} array array of cards to tally
 * @param {string} prop property of card to access
 * @return {object} tally from elements in array
 */
const makeTally = (array, prop) => {
  const tally = {};
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][prop] in tally) {
      tally[array[i][prop]] += 1;
    } else {
      tally[array[i][prop]] = 1;
    }
  }
  return tally;
};

/**
 * Function that updates column in table
 * @param {number} column index of column to update
 * @param {array} array to replace data from
 *
 */
const updateTable = (column, array) => {
  const rows = document.querySelector('#table-body').querySelectorAll('tr');
  for (let i = 0; i < 9; i += 1) {
    const winCell = rows[i].querySelectorAll('td')[column];
    if (column === 2) {
      winCell.childNodes[0].data = currentBet * Number(array[i]);
      if (currentBet >= 5 && Number(array[i]) === 250) {
        winCell.childNodes[0].data = currentBet * 800;
      }
    } else {
      winCell.childNodes[0].data = array[i];
    }

    winCell.classList.add('yellow-text');
    const removeYellow = setTimeout(() => {
      winCell.classList.remove('yellow-text');
    }, 500);
  }
};

/**
 * Function that resets and shuffles deck, clears handDiv, and defaults result and probability array
 */
const resetGame = () => {
  deck = makeDeck();
  shuffleCards(deck);
  document.querySelector('.hand').innerHTML = ''; // empty hand array
  result = 'BUMMER :('; // result is lose by default
  probabilities = ['...', '...', '...', '...', '...', '...', '...', '...', '...'];
  updateTable(3, probabilities);
};

/* ############################################################
################### PLAYER ACTION LOGIC ########################
########################################################### */

/**
 * Function that holds/unholds cards, and calculates probabilty of hands
 * @param {element} cardEl element of which to toggle class
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
 * Function that triggers dealing or drawing of cards accordingly
 */
const onButtonClick = () => {
  // remove flashing animation on results div (starting page)
  if (document.querySelector('.results').classList.contains('animate__animated')) {
    document.querySelector('.results').classList.remove('animate__animated');
    document.querySelector('.results').classList.remove('animate__flash');
    document.querySelector('.results').classList.remove('animate__infinite');
  }

  if (canClickButton) {
    canClickButton = false; // prevent multiple clicks

    // animate button press
    document.querySelector('.game-button').classList.add('press-button');
    const buttonPress = setTimeout(() => {
      document.querySelector('.game-button').classList.remove('press-button');
    }, 100);

    // trigger drawCards or dealCards function accordingly
    if (canClickCard) {
      drawCards();
    } else {
      dealCards();
    }

    const preventMultipleClicks = setTimeout(() => {
      canClickButton = true;
    }, 1000);
  }
};

/**
 * Function that swaps out unselected cards for new cards, then calculate and updates points
 */
const drawCards = () => {
  canClickCard = false;

  // show buttons for betting
  document.querySelectorAll('.bet-buttons')[0].classList.remove('hide-text');
  document.querySelectorAll('.bet-buttons')[1].classList.remove('hide-text');

  // change UNselected cards
  const cardsToChange = document.querySelector('.hand').querySelectorAll('.unclicked-card');
  for (let i = 0; i < cardsToChange.length; i += 1) {
    const indexInHand = Number(cardsToChange[i].id[4]);
    hand[indexInHand] = deck.pop();

    // animate swapping of cards
    animateCSS(cardsToChange[i], 'flipOutY').then(() => {
      cardsToChange[i].querySelector('.card-name').innerText = `${hand[indexInHand].name}`;
      cardsToChange[i].querySelector('.suit-img').src = `vp-img/${hand[indexInHand].img}`;
      if (hand[i].img === 'heart.png' || hand[i].img === 'diamond.png') {
        cardsToChange[i].querySelector('.suit-img').classList.add('red');
      }
      animateCSS(cardsToChange[i], 'flipInY');
    });
  }

  // remove selection on cards
  const cardsClicked = document.querySelector('.hand').querySelectorAll('.clicked-card');
  for (let j = 0; j < cardsClicked.length; j += 1) {
    cardsClicked[j].classList.remove('clicked-card');
    cardsClicked[j].classList.add('unclicked-card');
    cardsClicked[j].querySelector('.hold-text').classList.add('hide');
  }

  // tally ranks and suits
  const cardRankTally = makeTally(hand, 'rank');
  const cardSuitTally = makeTally(hand, 'suit');

  // calculate and update points
  const multiplier = calcHandScore(cardRankTally, cardSuitTally);
  let winnings = currentBet * multiplier;
  // royal flush multiplier = 800 if bet is more than 5
  if (currentBet >= 5 && multiplier === 250) {
    winnings = currentBet * 800;
  }
  if (multiplier > 0) {
    winnings += currentBet;
  }
  points += winnings;

  const delayResults = setTimeout(() => {
    document.querySelector('.score').innerText = `CREDITS ${points}`;
    document.querySelector('.results').innerHTML = `${result} <br> BET AND PRESS 'DEAL' TO PLAY AGAIN`;

    // add card moving animation
    document.querySelector('.hand').classList.add('animate__animated');
    document.querySelector('.hand').classList.add('animate__shakeY');
    document.querySelector('.hand').classList.add('animate__infinite');
  }, 500);

  // change draw to deal button
  document.querySelector('.game-button').innerText = 'DEAL';
};

/**
 * Function to deal 5 cards from deck to hand, create div for each card with event listener
 */
const dealCards = () => {
  resetGame();

  canClickCard = true;

  // remove buttons for betting
  document.querySelectorAll('.bet-buttons')[0].classList.add('hide-text');
  document.querySelectorAll('.bet-buttons')[1].classList.add('hide-text');

  document.querySelector('.results').innerText = 'CLICK ON CARDS YOU WISH TO HOLD';

  hand = deck.splice(0, 5);

  // create div for each card
  for (let i = 0; i < 5; i += 1) {
    createCardEl();
  }

  // store bet
  points -= currentBet;
  document.querySelector('.score').innerText = `CREDITS ${points}`;

  // remove card moving animation
  document.querySelector('.hand').classList.remove('animate__animated');
  document.querySelector('.hand').classList.remove('animate__shakeY');
  document.querySelector('.hand').classList.remove('animate__infinite');

  // change deal to draw button
  document.querySelector('.game-button').innerText = 'DRAW';
};

/**
 * Function that calculates multiplier of a given hand
 * @param {object} tallyRanks tally of card ranks in hand
 * @param {object} tallySuits tally of card suits in hand
 * @return {number} multiplier of hand, 0 if no winning hand
 */
const calcHandScore = (tallyRanks, tallySuits) => {
  const multiplierArray = [];
  multiplierArray.push(checkJacksOrBetter(tallyRanks));
  multiplierArray.push(checkTwoPair(tallyRanks));
  multiplierArray.push(checkThreeOfAKind(tallyRanks));
  multiplierArray.push(checkStraight(tallyRanks));
  multiplierArray.push(checkFlush(tallySuits));
  multiplierArray.push(checkFullHouse(tallyRanks));
  multiplierArray.push(checkFourOfAKind(tallyRanks));
  multiplierArray.push(checkStraightFlush(tallyRanks, tallySuits));
  multiplierArray.push(checkRoyalFlush(tallyRanks, tallySuits));

  // find maximum multiplier
  let multiplier = 0;
  for (let i = 0; i < multiplierArray.length; i += 1) {
    if (multiplierArray[i] > multiplier) {
      multiplier = multiplierArray[i];
    }
  }

  return multiplier;
};

/**
 * Function that INCREASES currentBet by 1 and updates 'WIN' column in table
 */
const increaseBet = () => {
  if (!canClickCard) {
    currentBet += 1;
    document.querySelector('#bet').innerText = currentBet;
    updateTable(2, multipliers);
  }
};

/**
 * Function that DECREASES currentBet by 1 and updates 'WIN' column in table
 */
const decreaseBet = () => {
  if (currentBet > 1 && !canClickCard) {
    currentBet -= 1;
    document.querySelector('#bet').innerText = currentBet;
    updateTable(2, multipliers);
  }
};

/* ############################################################
###################### INITIALISATION ########################
########################################################### */

/**
 * Function that creates HEADER element
 */
const createHeader = () => {
  const header = document.createElement('header');
  document.querySelector('.container').appendChild(header);

  const mainTitle = document.createElement('h1');
  mainTitle.innerText = 'VIDEO POKER';
  header.appendChild(mainTitle);

  mainTitle.addEventListener('mouseenter', () => { onTitleEnter(mainTitle); });
  mainTitle.addEventListener('mouseleave', () => { onTitleLeave(mainTitle); });
};

/**
 * Function that creates TABLE element
 */
const createTable = () => {
  const tableDiv = document.createElement('div');
  tableDiv.classList.add('table-div');
  document.querySelector('.container').appendChild(tableDiv);

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
 * Function that creates BUTTON element
 */
const createButtons = () => {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-div');
  document.querySelector('.container').appendChild(buttonDiv);

  const betDiv = document.createElement('div');
  buttonDiv.appendChild(betDiv);

  const betDivHead = document.createElement('div');
  const betDivBody = document.createElement('div');
  betDivHead.classList.add('bet-head');
  betDivBody.classList.add('bet-div');
  betDivHead.innerText = 'BET';
  betDiv.appendChild(betDivHead);
  betDiv.appendChild(betDivBody);

  const betMinus = document.createElement('div');
  const betPlus = document.createElement('div');
  const betInput = document.createElement('div');
  betMinus.innerText = '-';
  betPlus.innerText = '+';
  betInput.innerText = currentBet;
  betMinus.classList.add('bet-buttons');
  betPlus.classList.add('bet-buttons');
  betInput.setAttribute('id', 'bet');
  betDivBody.appendChild(betMinus);
  betDivBody.appendChild(betInput);
  betDivBody.appendChild(betPlus);

  betMinus.addEventListener('click', decreaseBet);
  betMinus.addEventListener('mouseenter', () => { onButtonEnter(betMinus); });
  betMinus.addEventListener('mouseleave', () => { onButtonLeave(betMinus); });
  betPlus.addEventListener('click', increaseBet);
  betPlus.addEventListener('mouseenter', () => { onButtonEnter(betPlus); });
  betPlus.addEventListener('mouseleave', () => { onButtonLeave(betPlus); });

  const gameBtn = document.createElement('div');
  gameBtn.classList.add('game-button');
  gameBtn.innerText = 'DEAL';
  buttonDiv.appendChild(gameBtn);

  gameBtn.addEventListener('click', onButtonClick);
  gameBtn.addEventListener('mouseenter', () => { onButtonEnter(gameBtn); });
  gameBtn.addEventListener('mouseleave', () => { onButtonLeave(gameBtn); });
};

/**
 * Function to initialise game, creates all DOM elements necessary
 */
const initialiseGame = () => {
  // main container
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('container');
  document.body.appendChild(mainDiv);

  createHeader();
  createTable();

  const resultsDiv = document.createElement('div');
  resultsDiv.classList.add('results');
  resultsDiv.innerText = "INPUT YOUR BET AND PRESS 'DEAL' TO BEGIN";
  mainDiv.appendChild(resultsDiv);

  const handDiv = document.createElement('div');
  handDiv.classList.add('hand');
  mainDiv.appendChild(handDiv);

  createButtons();

  const scoreDiv = document.createElement('div');
  scoreDiv.classList.add('score');
  scoreDiv.innerText = `CREDITS ${points}`;
  mainDiv.appendChild(scoreDiv);

  animateCSS(mainDiv, 'fadeIn').then(() => {
    resultsDiv.classList.add('animate__animated');
    resultsDiv.classList.add('animate__flash');
    resultsDiv.classList.add('animate__infinite');
  });

  resetGame();
};

initialiseGame();
