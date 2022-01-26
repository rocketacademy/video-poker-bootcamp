/**
 * This function creates a deck of playing cards
 * @returns {array} An array of 52 card objects
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const symbols = ['❤️', '♦️', '♣️', '♠️'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentSymbol = symbols[suitIndex];
    let currentColor = 'black';
    if (suitIndex === 0 || suitIndex === 1) {
      currentColor = 'red';
    }
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let cardDisplay = `${rankCounter}`;
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplay = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplay = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplay = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplay = 'K';
      }
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        display: cardDisplay,
        symbol: currentSymbol,
        color: currentColor,
      };
      newDeck.push(card);
    }
  }

  return newDeck;
};

/**
 * This function returns a random index from 0 to a maximum parameter
 * @param {number} max The upper limit of the random index generated
 * @returns {number} The random index generated
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * This function shuffles a deck of cards
 * @param {array} cardDeck The card deck to be shuffled
 * @returns {array} The inputted card deck shuffled
 */
const shuffleCards = (cardDeck) => {
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    const randomIndex = getRandomIndex(cardDeck.length);
    const randomCard = cardDeck[randomIndex];
    const currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

let deck = shuffleCards(makeDeck()); // Generate a shuffled deck
const cardsAllowable = 5; // Number of cards played is 5
let playerBet = 0; // Global variable for player bet (1 to 5)
let playerHand = []; // Global variable to hold player's current hand
let holdArray = []; // Global variable to hold player's choice of cards held
let userPoints = 100; // Global variable to track player score
let gameState = 'Waiting for player bet'; // Initial game state
const stakes = {
  'Jacks or Better': 1,
  'Two Pairs': 2,
  'Three of a Kind': 3,
  Straight: 4,
  Flush: 6,
  'Full House': 9,
  'Four of a Kind': 25,
  'Straight Flush': 50,
  'Royal Flush': 250,
}; // Global variable for win condition multipliers

// Element addresses to be used between different functions
let instructionBox;
let cardContainer;
let currentPoints;
let outputBox;
let deal;
let reset;
let increaseBet;
let decreaseBet;
let betMax;
let currentBet;

// Audio sounds
const dealSound = new Audio('audio/button-20.wav');
const resetSound = new Audio('audio/button-46.wav');
const betSound = new Audio('audio/button-49.wav');
const cardSound = new Audio('audio/button-30.wav');

/**
 * This function evaluates the player's current hand to return the hand's score
 * @param {array} handArray The array of card objects in the player's hand
 * @param {number} bet The bet for the current round
 * @returns {number} The final tabulated winning score
 */
const calcHandScore = (handArray, bet) => {
  let winMultiplier = 0;
  // Creation of tallies - card names
  const cardNameTally = {};
  for (let i = 0; i < handArray.length; i += 1) {
    const cardName = handArray[i].name;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    } else {
      cardNameTally[cardName] = 1;
    }
  }
  const cardNameTallyKeys = Object.keys(cardNameTally);
  const cardNameTallyValues = Object.values(cardNameTally);
  // Creation of tallies - card ranks
  const cardRankTally = {};
  for (let i = 0; i < handArray.length; i += 1) {
    const cardRank = handArray[i].rank;
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    } else {
      cardRankTally[cardRank] = 1;
    }
  }
  const cardRankKeys = Object.keys(cardRankTally);
  const cardRankKeysNumbers = cardRankKeys.map((i) => Number(i));

  // Creation of tallies - card suits
  const cardSuitTally = {};
  for (let i = 0; i < handArray.length; i += 1) {
    const cardSuit = handArray[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    } else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  const cardSuitTallyValues = Object.values(cardSuitTally);

  // Jacks or Better (a pair of J / Q / K / A) - x1
  if (cardNameTally.king === 2 || cardNameTally.queen === 2
    || cardNameTally.jack === 2 || cardNameTally.ace === 2)
  { winMultiplier = 1; }

  // Two Pairs - x2
  let pairs = 0;
  for (let i = 0; i < cardNameTallyKeys.length; i += 1) {
    if (cardNameTally[cardNameTallyKeys[i]] === 2) {
      pairs += 1;
    }
  }
  if (pairs === 2) {
    winMultiplier = 2;
  }

  // Three of a Kind - x3
  if (cardNameTallyValues.includes(3)) {
    winMultiplier = 3;
  }

  // Straight - x4
  let straight = false;
  let aceHighStraight = false;
  if (cardRankKeysNumbers.length === cardsAllowable) {
    const defaultStraightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 1];
    let cardRanksInAscendingOrder = cardRankKeysNumbers.sort((a, b) => a - b);

    if (cardRanksInAscendingOrder.toString() === [1, 10, 11, 12, 13].toString()) {
      cardRanksInAscendingOrder = [10, 11, 12, 13, 1];
      aceHighStraight = true;
    }

    for (let i = 0; i < (defaultStraightSequence.length - cardsAllowable + 1); i += 1) {
      const comparisonStraight = [];
      for (let j = 0; j < cardsAllowable; j += 1) {
        comparisonStraight.push(defaultStraightSequence[i + j]);
      }
      if (cardRanksInAscendingOrder.toString() === comparisonStraight.toString()) {
        console.log('player', cardRanksInAscendingOrder);
        console.log('comp', comparisonStraight);
        straight = true;
      }
    }
    if (straight === true) {
      winMultiplier = 4;
    }
  }

  // Flush - x6
  if (cardSuitTallyValues.includes(5)) {
    winMultiplier = 6;
  }

  // Full House - x9
  if (cardNameTallyValues.includes(2) && cardNameTallyValues.includes(3)) {
    winMultiplier = 9;
  }

  // Four of a Kind - x25
  if (cardNameTallyValues.includes(4)) {
    winMultiplier = 25;
  }

  // Straight Flush - x50
  if (straight === true && cardSuitTallyValues.includes(5)) {
    winMultiplier = 50;
  }

  // Royal Flush - x250
  if (aceHighStraight === true && cardSuitTallyValues.includes(5)) {
    if (playerBet === 5) {
      winMultiplier = 800;
    } else {
      winMultiplier = 250;
    }
  }

  return winMultiplier * bet;
};

/**
 * This function runs when a card element is clicked
 * @param {address} address The HTML address of a card element
 * @param {object} card The object in which the card element represents
 */
const cardClick = (address, card) => {
  if (gameState === 'Hold') {
    cardSound.currentTime = 0;
    cardSound.play();
    if (!holdArray.includes(card)) {
      const holdDisplay = document.createElement('div');
      holdDisplay.innerText = 'HOLD';
      holdDisplay.className = 'hold';
      address.appendChild(holdDisplay);
      holdArray.push(card);
    } else {
      const holdElement = address.querySelector('.hold');
      holdElement.remove();
      const cardIndex = holdArray.indexOf(card);
      holdArray.splice(cardIndex, 1);
    }
  }
};

/**
 * This function runs when player wants to add or decrease their bet
 * @param {string} addOrRemove The string that determines which if statement to run
 */
const betFunction = (addOrRemove) => {
  betSound.currentTime = 0;
  betSound.play();
  if (addOrRemove === 'increase' && playerBet < 5 && playerBet < userPoints) {
    playerBet += 1;
    deal.disabled = false;
  } else if (addOrRemove === 'decrease' && playerBet > 1) {
    playerBet -= 1;
  } else if (addOrRemove === 'bet max') {
    playerBet = 5;
    if (userPoints <= 5) {
      playerBet = userPoints;
    }
    deal.disabled = false;
  }
  currentBet.innerText = `Current Bet: ${playerBet}`;
};

/**
 * This function is run when SEE STAKES HERE button is clicked to generate table
 * of winning stakes per bet bracket
 */
const launchStake = () => {
  instructionBox = document.createElement('div');
  instructionBox.className = 'instructionBox';
  document.body.appendChild(instructionBox);

  const closeButton = document.createElement('button');
  closeButton.innerText = 'X';
  closeButton.className = 'closeButton';
  closeButton.addEventListener('click', () => instructionBox.remove());

  const stakeContainer = document.createElement('div');
  stakeContainer.className = 'stakeContainer';

  const topHeader = document.createElement('div');
  topHeader.className = 'topHeader';
  topHeader.innerText = 'Stake Table';

  const stakeTable = document.createElement('table');
  const stakeThead = document.createElement('thead');
  const stakeTbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  const header0 = document.createElement('th');
  header0.innerText = 'Bets';
  const header1 = document.createElement('th');
  header1.innerText = '1';
  const header2 = document.createElement('th');
  header2.innerText = '2';
  const header3 = document.createElement('th');
  header3.innerText = '3';
  const header4 = document.createElement('th');
  header4.innerText = '4';
  const header5 = document.createElement('th');
  header5.innerText = '5';

  headerRow.appendChild(header0);
  headerRow.appendChild(header1);
  headerRow.appendChild(header2);
  headerRow.appendChild(header3);
  headerRow.appendChild(header4);
  headerRow.appendChild(header5);
  stakeThead.appendChild(headerRow);

  for (let i = 0; i < Object.keys(stakes).length; i += 1) {
    console.log('a');
    const row = document.createElement('tr');
    const rowData0 = document.createElement('td');
    rowData0.innerText = `${Object.keys(stakes)[i]}`;

    const multiplier = Object.values(stakes)[i];
    const rowData1 = document.createElement('td');
    rowData1.className = 'row';
    rowData1.innerText = `${1 * multiplier}`;
    const rowData2 = document.createElement('td');
    rowData2.className = 'row';
    rowData2.innerText = `${2 * multiplier}`;
    const rowData3 = document.createElement('td');
    rowData3.className = 'row';
    rowData3.innerText = `${3 * multiplier}`;
    const rowData4 = document.createElement('td');
    rowData4.className = 'row';
    rowData4.innerText = `${4 * multiplier}`;
    const rowData5 = document.createElement('td');
    rowData5.className = 'row';
    if (rowData0.innerText === 'Royal Flush') {
      rowData5.innerText = '4000';
    } else {
      rowData5.innerText = `${5 * multiplier}`; }

    row.appendChild(rowData0);
    row.appendChild(rowData1);
    row.appendChild(rowData2);
    row.appendChild(rowData3);
    row.appendChild(rowData4);
    row.appendChild(rowData5);
    stakeTbody.appendChild(row);
  }

  stakeTable.appendChild(stakeThead);
  stakeTable.appendChild(stakeTbody);
  stakeContainer.appendChild(topHeader);
  stakeContainer.appendChild(stakeTable);
  instructionBox.appendChild(closeButton);
  instructionBox.appendChild(stakeContainer);
};

/**
 * This function deals the initial 5 cards in the playerHand array
 */
const dealInitialCards = () => {
  for (let i = 0; i < cardsAllowable; i += 1) {
    playerHand.push(deck.pop());
  }
};

/**
 * This function builds the card display elements and appends them to the cardContainer
 * @param {array} hand The current playerHand array of 5 cards
 */
const buildCards = (hand) => {
  for (let i = 0; i < cardsAllowable; i += 1) {
    const card = document.createElement('div');
    card.className = 'card';

    const cardDisp1 = document.createElement('div');
    cardDisp1.innerText = `${hand[i].display}`;
    cardDisp1.className = 'cardDisp1';
    cardDisp1.classList.add(hand[i].color);
    card.appendChild(cardDisp1);

    const cardDisp2 = document.createElement('div');
    cardDisp2.className = 'cardDisp2';
    cardDisp2.innerText = `${hand[i].symbol}`;
    card.appendChild(cardDisp2);

    const cardDisp3 = document.createElement('div');
    cardDisp3.innerText = `${hand[i].symbol}`;
    cardDisp3.className = 'cardDisp3';
    card.appendChild(cardDisp3);

    const cardDisp4 = document.createElement('div');
    cardDisp4.className = 'cardDisp4';
    cardDisp4.innerText = `${hand[i].symbol}`;
    card.appendChild(cardDisp4);

    const cardDisp5 = document.createElement('div');
    cardDisp5.innerText = `${hand[i].display}`;
    cardDisp5.className = 'cardDisp5';
    cardDisp5.classList.add(hand[i].color);
    card.appendChild(cardDisp5);

    card.addEventListener('click', () => cardClick(card, hand[i]));
    cardContainer.appendChild(card);
  }
};

/**
 * This function builds the empty card display (back-facing cards) as a default visual
 */
const buildEmptyCards = () => {
  for (let i = 0; i < cardsAllowable; i += 1) {
    const card = document.createElement('img');
    card.className = 'emptyCard';
    card.src = 'images/cardBack.jpeg';
    cardContainer.appendChild(card);
  }
};

/**
 * This function is run when DEAL button is clicked
 */
const dealFunction = () => {
  // Dealing of first hand
  if (gameState === 'Waiting for player bet') {
    dealSound.currentTime = 0;
    dealSound.play();
    increaseBet.disabled = true;
    decreaseBet.disabled = true;
    betMax.disabled = true;
    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
    dealInitialCards();
    buildCards(playerHand);
    gameState = 'Hold';
    outputBox.innerText = 'Select which cards above to "Hold"! Then press "Deal" to deal again!';
    userPoints -= playerBet;
    currentPoints.innerText = `Current Points: ${userPoints}`;
  } // Evaluation of new hand
  else if (gameState === 'Hold') {
    dealSound.currentTime = 0;
    dealSound.play();
    deal.disabled = true;
    for (let i = 0; i < cardsAllowable; i += 1) {
      if (!holdArray.includes(playerHand[i])) {
        playerHand[i] = deck.pop();
      }
    }

    // FOR TESTING ONLY (HARD-CODED PLAYER HAND)
    // playerHand = [
    //   {
    //     rank: 1, suit: 'hearts', name: 'ace', display: 'A', symbol: '❤️', color: 'red',
    //   },
    //   {
    //     rank: 10, suit: 'hearts', name: '10', display: '10', symbol: '❤️', color: 'red',
    //   },
    //   {
    //     rank: 11, suit: 'hearts', name: 'jack', display: 'J', symbol: '❤️', color: 'red',
    //   },
    //   {
    //     rank: 12, suit: 'hearts', name: 'queen', display: 'Q', symbol: '❤️', color: 'red',
    //   },
    //   {
    //     rank: 13, suit: 'hearts', name: 'king', display: 'K', symbol: '❤️', color: 'red',
    //   },
    // ];

    while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
    }
    buildCards(playerHand);

    const pointsForHand = calcHandScore(playerHand, playerBet);
    if (pointsForHand > 0) {
      let winType;
      userPoints += calcHandScore(playerHand, playerBet);
      if (calcHandScore(playerHand, playerBet) === 4000) {
        winType = 'Royal Flush';
      } else {
        winType = Object.keys(stakes)[Object.values(stakes).indexOf(pointsForHand / playerBet)];
      }
      outputBox.innerText = `Awesome! You got a ${winType}! You've won ${pointsForHand}!`;
    } else {
      outputBox.innerText = 'Oops! You didn\'t get anything... Hit "Reset" play again!';
    }
    currentPoints.innerText = `Current Points: ${userPoints}`;
    gameState = 'Game over';

    if (userPoints === 0) {
      outputBox.innerText = 'Looks like it\'s game over. Please "Refresh" the page to start a new game!';
    } else {
      reset.disabled = false;
    }
  }
};

/**
 * This function is run when the RESET button is clicked to restart the game
 */
const resetFunction = () => {
  resetSound.currentTime = 0;
  resetSound.play();
  reset.disabled = true;
  increaseBet.disabled = false;
  decreaseBet.disabled = false;
  betMax.disabled = false;
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }
  buildEmptyCards();
  outputBox.innerText = 'Set your bets below, then hit "Deal"!';
  playerBet = 0;
  currentBet.innerText = `Current Bet: ${playerBet}`;
  playerHand = [];
  holdArray = [];
  deck = shuffleCards(makeDeck());
  gameState = 'Waiting for player bet';
};

/**
 * This function is run on page load to create and display the Video Poker UI
 */
const initialize = () => {
  const headerBox = document.createElement('div');
  headerBox.className = 'header';
  const mainHeader = document.createElement('h1');
  mainHeader.innerText = 'Video Poker';
  headerBox.appendChild(mainHeader);

  const instructions = document.createElement('button');
  instructions.className = 'instructions';
  instructions.innerText = 'See stakes here!';
  instructions.addEventListener('click', launchStake);
  headerBox.appendChild(instructions);

  document.body.appendChild(headerBox);

  cardContainer = document.createElement('div');
  cardContainer.className = 'cardContainer';
  document.body.appendChild(cardContainer);

  buildEmptyCards();

  outputBox = document.createElement('div');
  outputBox.className = 'output';
  outputBox.innerText = 'Set your bets below, then hit "Deal"!';
  document.body.appendChild(outputBox);

  const userActionBox = document.createElement('div');
  userActionBox.className = 'action';
  document.body.appendChild(userActionBox);

  const pointsBox = document.createElement('div');
  pointsBox.className = 'pointsBox';

  currentPoints = document.createElement('div');
  currentPoints.innerText = `Current Points: ${userPoints}`;
  currentPoints.className = 'currentPoints';
  pointsBox.appendChild(currentPoints);

  currentBet = document.createElement('div');
  currentBet.innerText = `Current Bet: ${playerBet}`;
  currentBet.className = 'currentBet';
  pointsBox.appendChild(currentBet);

  increaseBet = document.createElement('button');
  increaseBet.className = 'betButton';
  increaseBet.innerText = '+';
  increaseBet.addEventListener('click', () => betFunction('increase'));
  decreaseBet = document.createElement('button');
  decreaseBet.className = 'betButton';
  decreaseBet.innerText = '-';
  decreaseBet.addEventListener('click', () => betFunction('decrease'));
  betMax = document.createElement('button');
  betMax.className = 'betButton';
  betMax.innerText = 'Bet MAX';
  betMax.style = 'width: 90px;';
  betMax.addEventListener('click', () => betFunction('bet max'));

  pointsBox.appendChild(decreaseBet);
  pointsBox.appendChild(increaseBet);
  pointsBox.appendChild(betMax);

  userActionBox.appendChild(pointsBox);

  const dealResetBox = document.createElement('div');
  dealResetBox.className = 'dealResetBox';

  deal = document.createElement('button');
  deal.className = 'userButton';
  deal.innerText = 'Deal';
  deal.disabled = true;
  deal.addEventListener('click', dealFunction);
  reset = document.createElement('button');
  reset.className = 'userButton';
  reset.innerText = 'Reset';
  reset.disabled = true;
  reset.addEventListener('click', resetFunction);

  dealResetBox.appendChild(deal);
  dealResetBox.appendChild(reset);

  userActionBox.appendChild(dealResetBox);
};
initialize();
