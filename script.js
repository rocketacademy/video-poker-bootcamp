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
let inLoseMsg = false;
let currentBet = 1;

const multipliers = ['250', '50', '25', '9', '6', '4', '3', '2', '1'];
let probabilities = ['...', '...', '...', '...', '...', '...', '...', '...', '...'];

/* ############################################################
################### HELPER FUNCTIONS ########################
########################################################### */

/**
 * Function that creates a poker deck of 52 cards
 * @return {array} deck of cards
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
 * Function that gives random integer x, where 0 <= x < max
 * @param {number} max upper bound
 * @return {number} random integer between 0 (inclusive) and max
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Function that shuffles an array
 * @param {array} cardDeck to be shuffled
 * @return {array} shuffled array
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
 * Function that swaps out unheld cards and deselects held cards
 */
const swapCards = () => {
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
      } else if (cardsToChange[i].querySelector('.suit-img').classList.contains('red')) {
        cardsToChange[i].querySelector('.suit-img').classList.remove('red');
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
};

/**
 * Function that calculates winnings of hand
 * @return {number} winnings of hand
 */
const calcWinnings = () => {
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
    // highlight row in table if winning hand
    const index = multipliers.indexOf(String(multiplier));
    const winRow = document.querySelector('#table-body').querySelectorAll('tr')[index];
    winRow.classList.add('highlight');
  }

  return winnings;
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
  if (canClickCard) {
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

  if (canClickButton && !inLoseMsg) {
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

  swapCards();
  points += calcWinnings();

  // show buttons for betting
  document.querySelectorAll('.bet-buttons')[0].classList.remove('hide-text');
  document.querySelectorAll('.bet-buttons')[1].classList.remove('hide-text');
  document.querySelector('.bet-foot').classList.remove('hide-text');

  // change draw to deal button
  document.querySelector('.game-button').innerText = 'DEAL';
  document.querySelector('.bet-foot').innerText = '◻︎ ALL IN';

  const delayResults = setTimeout(() => {
    document.querySelector('.score').innerText = `CREDITS ${points}`;
    document.querySelector('.results').innerHTML = `${result} <br> BET AND PRESS 'DEAL' TO PLAY AGAIN`;

    // add card moving animation
    document.querySelector('.hand').classList.add('animate__animated');
    document.querySelector('.hand').classList.add('animate__shakeY');
    document.querySelector('.hand').classList.add('animate__infinite');

    // if left 0 credits, show lose message
    if (points === 0) {
      document.querySelector('.lose-div').classList.remove('hide');
      inLoseMsg = true;
    }
  }, 500);
};

/**
 * Function to deal 5 cards from deck to hand, create div for each card with event listener
 */
const dealCards = () => {
  resetGame();
  canClickCard = true;

  document.querySelector('.results').innerText = 'CLICK ON CARDS YOU WISH TO HOLD';

  // deal cards, create card elements
  hand = deck.splice(0, 5);
  for (let i = 0; i < 5; i += 1) {
    createCardEl(i);
  }

  // store bet
  points -= currentBet;
  document.querySelector('.score').innerText = `CREDITS ${points}`;

  // remove buttons for betting
  document.querySelectorAll('.bet-buttons')[0].classList.add('hide-text');
  document.querySelectorAll('.bet-buttons')[1].classList.add('hide-text');
  document.querySelector('.bet-foot').classList.add('hide-text');

  // remove highlight in table
  const tableRows = document.querySelectorAll('tr');
  tableRows.forEach((row) => {
    if (row.classList.contains('highlight')) { row.classList.remove('highlight');
    }
  });

  // remove card moving animation
  document.querySelector('.hand').classList.remove('animate__animated');
  document.querySelector('.hand').classList.remove('animate__shakeY');
  document.querySelector('.hand').classList.remove('animate__infinite');

  // change deal to draw button
  document.querySelector('.game-button').innerText = 'DRAW';
};

/**
 * Function that INCREASES currentBet by 1 and updates 'WIN' column in table
 */
const increaseBet = () => {
  if (currentBet < points && !canClickCard && !inLoseMsg) {
    currentBet += 1;
    if (currentBet === points) {
      document.querySelector('.bet-foot').innerText = '◼︎ ALL IN';
    }
    document.querySelector('#bet').innerText = currentBet;
    updateTable(2, multipliers);
  }
};

/**
 * Function that DECREASES currentBet by 1 and updates 'WIN' column in table
 */
const decreaseBet = () => {
  if (currentBet > 1 && !canClickCard && !inLoseMsg) {
    currentBet -= 1;
    document.querySelector('.bet-foot').innerText = '◻︎ ALL IN';
    document.querySelector('#bet').innerText = currentBet;
    updateTable(2, multipliers);
  }
};

/**
 * Function that bets ALL IN and updates 'WIN' column in table
 */
const allInBet = () => {
  if (!canClickCard && !inLoseMsg) {
    if (currentBet === points) {
      currentBet = 1;
      document.querySelector('.bet-foot').innerText = '◻︎ ALL IN';
    } else {
      currentBet = points;
      document.querySelector('.bet-foot').innerText = '◼︎ ALL IN';
    }
    document.querySelector('#bet').innerText = currentBet;
    updateTable(2, multipliers);
  }
};

const clickNewGame = () => {
  // hide lose game message
  document.querySelector('.lose-div').classList.add('hide');
  inLoseMsg = false;

  // reset points
  points = 100;
  document.querySelector('.score').innerText = `CREDITS ${points}`;

  // reset game
  resetGame();

  // reset resultsDiv
  document.querySelector('.results').innerText = "INPUT YOUR BET AND PRESS 'DEAL' TO BEGIN";
  document.querySelector('.results').classList.add('animate__animated');
  document.querySelector('.results').classList.add('animate__flash');
  document.querySelector('.results').classList.add('animate__infinite');

  // reset bet
  currentBet = 1;
  document.querySelector('#bet').innerText = currentBet;
  updateTable(2, multipliers);
};

/* ############################################################
###################### INITIALISATION ########################
########################################################### */

/**
 * Function to create all DOM elements necessary, remove title animation and reset game
 */
const initialiseGame = () => {
  createContainer();
  createOverlay();
  createTitle();
  createTable();
  createResults();
  createHand();
  createButtons();
  createScore();
  createInstrBtn();
  createLoseMsg();
  createInstr();

  animateCSS(document.querySelector('.container'), 'fadeIn').then(() => {
    document.querySelector('h1').classList.remove('glitch');
  });

  resetGame();
};

initialiseGame();
