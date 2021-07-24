// Please implement exercise logic here
/**
 * HELPER FUNCTIONS
 * Helper functions for game logic
 */
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    // CX: Setting of suit symbol as well as card colors
    let suitSymbol = '';
    let colour = '';

    switch (currentSuit) {
      case 'hearts':
        suitSymbol = '♥';
        colour = 'red';
        break;
      case 'diamonds':
        suitSymbol = '♦️';
        colour = 'red';
        break;
      case 'clubs':
        suitSymbol = '♣';
        colour = 'black';
        break;
      case 'spades':
      default:
        suitSymbol = '♠';
        colour = 'black';
        break;
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      // CX: Setting of display name
      let displayName = cardName;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      // CX fix: set aces to 14, as highest rank (above king)
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: (rankCounter === 1) ? 14 : rankCounter,
        suitSymbol,
        displayName,
        colour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Make a card in the DOM
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  // CX: Add color to the suit
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  // CX: Replace 3 with the display name of the card
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

/**
 * GLOBAL SETUP
 * Global variables that store game-wide data or DOM elements
 */

// GAME STATE STRING CONSTANTS
const INIT_COINS = 'INIT_COINS';
const SET_BET = 'SET_BET';
const SHOW_INITIAL_HAND = 'SHOW_INITIAL_HAND';
const SHOW_FINAL_HAND = 'SHOW_FINAL_HAND';

// Initialize unshuffled deck
const unshuffledDeck = makeDeck();
// Shuffled deck as a copy of unshuffled deck
let deck = shuffleCards([...unshuffledDeck]);

// UI VARIABLES
// Add the cardContainer DOM element as a global variable.
let cardContainer;
let coinsInput;
let coinsInputButton;
let currentBetInput;
let currentBetSubmitButton;
let raiseInput;
let raiseAndReplaceButton;
let gameInfo;

// Player 1 starts first
const playersTurn = 1; // matches with starting instructions
// Player 1 cards
const player1Cards = [];

// initialize gameState
let prevGameState = '';
let gameState = INIT_COINS;
// initialize totalCoins
let totalCoins = 0;
let currentBet = 0;
let totalWinnings = 0;

/**
 * PLAYER ACTION CALLBACKS
 * Callbacks that get triggered when player 1 and 2 click on their respective buttons.
 */

// Event handler on player 1's button to draw card and switch
// to player 2's turn
const insertCoinsSubmit = () => {
  const COINS_INPUT = document.querySelector('.coinsInput');
  const COINS = Number(COINS_INPUT.value);
  const IS_COINS_NUMBER = !Number.isNaN(COINS);
  if (COINS_INPUT.value.trim() !== '' && IS_COINS_NUMBER && COINS > 0 && COINS <= 1000) {
    totalCoins += COINS;
    initBet();
  } else {
    const COINS_INPUT_FEEDBACK_PARAGRAPHS = document.querySelectorAll('.coinsInputFeedback');
    if (COINS_INPUT_FEEDBACK_PARAGRAPHS.length === 0) {
      const COINS_INPUT_FEEDBACK_PARAGRAPH = document.createElement('p');
      COINS_INPUT_FEEDBACK_PARAGRAPH.classList.add('coinsInputFeedback');
      COINS_INPUT_FEEDBACK_PARAGRAPH.classList.add('initCoins');
      COINS_INPUT_FEEDBACK_PARAGRAPH.innerText = 'Please insert a minimum of 1 coin, and a maximum of 1000 coins.';
      document.body.appendChild(COINS_INPUT_FEEDBACK_PARAGRAPH);
    }
  }
};

const placeBetsSubmit = () => {
  const BET_INPUT = document.querySelector('.currentBetInput');
  const BET = Number(BET_INPUT.value);
  const IS_BET_NUMBER = !Number.isNaN(BET);
  if (BET_INPUT.value.trim() !== '' && IS_BET_NUMBER && BET > 0 && BET <= totalCoins) {
    totalCoins -= BET;
    currentBet += BET;
    initGame();
  } else {
    const BET_INPUT_FEEDBACK_PARAGRAPHS = document.querySelectorAll('.betInputFeedback');
    if (BET_INPUT_FEEDBACK_PARAGRAPHS.length === 0) {
      const BET_INPUT_FEEDBACK_PARAGRAPH = document.createElement('p');
      BET_INPUT_FEEDBACK_PARAGRAPH.classList.add('betInputFeedback');
      BET_INPUT_FEEDBACK_PARAGRAPH.classList.add('setBet');
      BET_INPUT_FEEDBACK_PARAGRAPH.innerText = `You must bet at least 1 coin, and at most ${totalCoins} coin(s).`;
      document.body.appendChild(BET_INPUT_FEEDBACK_PARAGRAPH);
    }
  }
};

const showFinalHand = () => {
  const SELECTED_CARDS = document.querySelectorAll('.selected');
  /* Replace cards in player1Cards */
  for (let i = 0; i < SELECTED_CARDS.length; i += 1) {
    const CARD_DISPLAY_NAME = SELECTED_CARDS[i].firstChild.innerText;
    const CARD_SUIT_SYMBOL = SELECTED_CARDS[i].lastChild.innerText;

    const CARD_INDEX = player1Cards.findIndex(
      (element) => (element.displayName === CARD_DISPLAY_NAME)
      && (element.suitSymbol === CARD_SUIT_SYMBOL),
    );

    player1Cards.splice(CARD_INDEX, 1, deck.pop());
  }
  /* Replace cards in DOM */
  cardContainer.innerHTML = '';
  for (let i = 0; i < 5; i += 1) {
    // Create card element from card metadata
    const cardElement = createCard(player1Cards[i]);
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
  }

  /* Remove helper text and button */
  gameInfo.innerText = `Player ${playersTurn}, your replaced hand has ${recognizeCurrentHand(player1Cards)}.`;
};

const replaceHand = () => {
  const SELECTED_CARDS = document.querySelectorAll('.selected');
  /* Replace cards in player1Cards */
  for (let i = 0; i < SELECTED_CARDS.length; i += 1) {
    const CARD_DISPLAY_NAME = SELECTED_CARDS[i].firstChild.innerText;
    const CARD_SUIT_SYMBOL = SELECTED_CARDS[i].lastChild.innerText;

    const CARD_INDEX = player1Cards.findIndex(
      (element) => (element.displayName === CARD_DISPLAY_NAME)
      && (element.suitSymbol === CARD_SUIT_SYMBOL),
    );

    player1Cards.splice(CARD_INDEX, 1, deck.pop());
  }
};

const raiseAndReplaceClick = () => {
  const RAISE_INPUT = document.querySelector('.raiseInput');
  const RAISE = Number(RAISE_INPUT.value);
  const IS_RAISE_NUMBER = !Number.isNaN(RAISE);
  if (RAISE_INPUT.value.trim() !== '' && IS_RAISE_NUMBER && RAISE > 0 && RAISE <= totalCoins) {
    currentBet += RAISE;
    totalCoins -= RAISE;
    replaceHand();
    initFinalHand();
  } else if (RAISE_INPUT.value.trim() !== '' && IS_RAISE_NUMBER && RAISE > 0) {
    const RAISE_INPUT_FEEDBACK_PARAGRAPHS = document.querySelectorAll('.raiseInputFeedback');
    if (RAISE_INPUT_FEEDBACK_PARAGRAPHS.length === 0) {
      const RAISE_INPUT_FEEDBACK_PARAGRAPH = document.createElement('p');
      RAISE_INPUT_FEEDBACK_PARAGRAPH.classList.add('raiseInputFeedback');
      RAISE_INPUT_FEEDBACK_PARAGRAPH.classList.add('showInitialHand');
      RAISE_INPUT_FEEDBACK_PARAGRAPH.innerText = `You can only raise a maximum of ${totalCoins} coins!`;
      document.body.appendChild(RAISE_INPUT_FEEDBACK_PARAGRAPH);
    }
  } else {
    replaceHand();
    initFinalHand();
  }
};

const player1CardClick = (event) => {
  const CARD = event.currentTarget;
  // if already selected
  if (CARD.className.indexOf('selected') !== -1) {
    CARD.classList.remove('selected');
  } else {
    CARD.classList.add('selected');
  }
};

const drawInitialHand = () => {
  // create new deck and reshuffle if no cards left
  if (deck.length === 0) {
    console.log("end of deck reached in player 1's turn! time to reshuffle.");
    deck = shuffleCards([...unshuffledDeck]);
  }

  // Empty cardContainer in case this is not the 1st round of gameplay
  cardContainer.innerHTML = '';

  // For testing: use this hand
  // ♠, ♥, ♣, ♦️
  // const TEST_HAND = [
  //   {
  //     name: 'queen',
  //     suit: 'clubs',
  //     rank: 12,
  //     suitSymbol: '♣',
  //     displayName: 'Q',
  //     colour: 'black',
  //   },
  //   {
  //     name: 'ace',
  //     suit: 'clubs',
  //     rank: 14,
  //     suitSymbol: '♣',
  //     displayName: 'A',
  //     colour: 'black',
  //   },
  //   {
  //     name: 'jack',
  //     suit: 'clubs',
  //     rank: 11,
  //     suitSymbol: '♣',
  //     displayName: 'J',
  //     colour: 'black',
  //   },
  //   {
  //     name: '10',
  //     suit: 'clubs',
  //     rank: 10,
  //     suitSymbol: '♣',
  //     displayName: '10',
  //     colour: 'black',
  //   },
  //   {
  //     name: 'queen',
  //     suit: 'spades',
  //     rank: 12,
  //     suitSymbol: '♠',
  //     displayName: 'Q',
  //     colour: 'black',
  //   },
  // ];

  // Pop player 1's card metadata from the deck
  for (let i = 0; i < 5; i += 1) {
    // For testing: use this hand
    // player1Cards.push(TEST_HAND[i]);
    player1Cards.push(deck.pop());
    // Create card element from card metadata
    const cardElement = createCard(player1Cards[i]);
    cardElement.classList.add('showInitialHand');
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
  }

  gameInfo = document.createElement('div');
  gameInfo.innerText = `Player ${playersTurn}, your current hand has ${recognizeCurrentHand(player1Cards)}`;
  gameInfo.innerText += ' You may choose any number of cards to replace, or raise your bet.';
  /* Add event listeners on click to all cards */
  const CARDS = cardContainer.querySelectorAll('.card');
  for (let i = 0; i < CARDS.length; i += 1) {
    CARDS[i].style.cursor = 'pointer';
    CARDS[i].addEventListener('click', player1CardClick);
  }
};

/**
 * GAMEPLAY MECHANICS
 *
 */

const sortCurrentHand = (firstCard, secondCard) => firstCard.rank - secondCard.rank;

const getStraights = (hand) => {
  const IS_STRAIGHT = true;
  // comparing current card with next, so we want to stop at 2nd last card
  for (let i = 0; i < hand.length - 1; i += 1) {
    if (hand[i + 1].rank - hand[i].rank !== 1) {
      return false;
    }
  }
  return IS_STRAIGHT;
};

const getFlush = (hand) => {
  const IS_FLUSH = true;
  for (let i = 0; i < hand.length - 1; i += 1) {
    if (hand[i + 1].suit !== hand[i].suit) {
      return false;
    }
  }

  return IS_FLUSH;
};

const calcHandScore = (hand) => {
  // initialize sorted hand using a shallow copy of current hand
  const SORTED_HAND = [...hand].sort(sortCurrentHand);
  console.log('sorted current hand:', SORTED_HAND);
  // initialize tally
  const tally = {};
  for (let i = 0; i < SORTED_HAND.length; i += 1) {
    const cardName = SORTED_HAND[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in tally) {
      tally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      tally[cardName] = 1;
    }
  }

  // initialize fours
  const FOURS = Object.keys(tally).filter((key) => tally[key] === 4);
  // initialize isFlush
  const IS_FLUSH = getFlush(SORTED_HAND);
  // initialize isStraight
  const IS_STRAIGHT = getStraights(SORTED_HAND);
  // initialize three of a kind
  const THREES = Object.keys(tally).filter((key) => tally[key] === 3);
  // initialize pairs
  const PAIRS = Object.keys(tally).filter((key) => tally[key] === 2);
  const FIRST_PAIR = PAIRS[0];
  let firstPairRank = -1;
  if (PAIRS.length > 0) {
    firstPairRank = SORTED_HAND.filter((item) => item.name === FIRST_PAIR)[0].rank;
  }
  // hand recognition logic
  // ROYAL FLUSH
  if (
    IS_FLUSH && IS_STRAIGHT
    && SORTED_HAND[0].rank === 10 && SORTED_HAND[SORTED_HAND.length - 1].rank === 14
  ) {
    return 250;
  }
  // STRAIGHT FLUSH
  if (IS_FLUSH && IS_STRAIGHT) {
    return 50;
  }
  // FOUR OF A KIND
  if (FOURS.length > 0) {
    return 25;
  }
  // FULL HOUSE
  if (THREES.length > 0 && PAIRS.length > 0) {
    return 9;
  }
  // FLUSH
  if (IS_FLUSH) {
    return 6;
  }
  // STRAIGHTS
  if (IS_STRAIGHT) {
    return 4;
  }
  // THREE OF A KIND
  if (THREES.length === 1) {
    return 3;
  }
  // 2 PAIRS
  if (PAIRS.length === 2) {
    return 2;
  }
  // A HIGH PAIR (JACK AND ABOVE)
  if (PAIRS.length > 0 && firstPairRank >= 11) {
    return 1;
  }
  // A LOW PAIR (10s AND BELOW), OR HIGH CARD

  return -1;
};

const recognizeCurrentHand = (hand) => {
  console.log('current hand:', hand);
  // initialize hand string
  let string = '';
  // initialize sorted hand using a shallow copy of current hand
  const SORTED_HAND = [...hand].sort(sortCurrentHand);
  console.log('sorted current hand:', SORTED_HAND);
  // initialize tally
  const tally = {};
  for (let i = 0; i < SORTED_HAND.length; i += 1) {
    const cardName = SORTED_HAND[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in tally) {
      tally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      tally[cardName] = 1;
    }
  }

  // initialize fours
  const FOURS = Object.keys(tally).filter((key) => tally[key] === 4);
  // initialize isFlush
  const IS_FLUSH = getFlush(SORTED_HAND);
  // initialize isStraight
  const IS_STRAIGHT = getStraights(SORTED_HAND);
  // initialize three of a kind
  const THREES = Object.keys(tally).filter((key) => tally[key] === 3);
  // initialize pairs
  const PAIRS = Object.keys(tally).filter((key) => tally[key] === 2);
  const FIRST_PAIR = PAIRS[0];
  let firstPairRank = -1;
  if (PAIRS.length > 0) {
    firstPairRank = SORTED_HAND.filter((item) => item.name === FIRST_PAIR)[0].rank;
  }
  // hand recognition logic
  // ROYAL FLUSH
  if (
    IS_FLUSH && IS_STRAIGHT
    && SORTED_HAND[0].rank === 10 && SORTED_HAND[SORTED_HAND.length - 1].rank === 14
  ) {
    string += `a royal flush of ${SORTED_HAND[0].suit}.`;
  }
  // STRAIGHT FLUSH
  else if (IS_FLUSH && IS_STRAIGHT) {
    string += `a straight flush starting from a ${SORTED_HAND[0].name} of ${SORTED_HAND[0].suit}, and ending with a ${SORTED_HAND[SORTED_HAND.length - 1].name} of ${SORTED_HAND[SORTED_HAND.length - 1].suit}.`;
  }
  // FOUR OF A KIND
  else if (FOURS.length > 0) {
    string += `a four of a kind with ${FOURS[0]}s.`;
  }
  // FULL HOUSE
  else if (THREES.length > 0 && PAIRS.length > 0) {
    string += `a full house: a three of a kind with ${THREES[0]}s, and a pair of ${FIRST_PAIR}s.`;
  }
  // FLUSH
  else if (IS_FLUSH) {
    string += `a flush of ${SORTED_HAND[0].suit}.`;
  }
  // STRAIGHTS
  else if (IS_STRAIGHT) {
    string += `a straight starting from a ${SORTED_HAND[0].name} of ${SORTED_HAND[0].suit}, and ending with a ${SORTED_HAND[SORTED_HAND.length - 1].name} of ${SORTED_HAND[SORTED_HAND.length - 1].suit}.`;
  }
  // THREE OF A KIND
  else if (THREES.length === 1) {
    string += `a three of a kind with ${THREES[0]}s.`;
  }
  // 2 PAIRS
  else if (PAIRS.length === 2) {
    string += `2 pairs of ${FIRST_PAIR}s and ${PAIRS[1]}s.`;
  }
  // A HIGH PAIR (JACK AND ABOVE)
  else if (PAIRS.length > 0 && firstPairRank >= 11) {
    string += `a pair of ${FIRST_PAIR}s.`;
  }
  // A LOW PAIR (10s AND BELOW)
  else if (PAIRS.length > 0) {
    string += `a pair of ${FIRST_PAIR}s.`;
  }
  // HIGH CARD
  else {
    string += `a high card of ${SORTED_HAND[SORTED_HAND.length - 1].name}.`;
  }

  const HAND_SCORE = calcHandScore(hand);
  const BET_SCORE = HAND_SCORE * currentBet;

  if (BET_SCORE - currentBet > 0 && gameState === 'SHOW_INITIAL_HAND') {
    string += ` You will win ${BET_SCORE - currentBet} coin(s) if you do not replace your cards!`;
  } else if (BET_SCORE - currentBet > 0) {
    totalWinnings += BET_SCORE - currentBet;
    totalCoins += BET_SCORE - currentBet;
    currentBet = 0;
    string += ` You have won ${BET_SCORE - currentBet} coin(s) this round!`;
  } else if (BET_SCORE - currentBet === 0 && gameState === 'SHOW_INITIAL_HAND') {
    string += ' You will not win or lose any coins if you do not replace your cards.';
  } else if (BET_SCORE - currentBet === 0) {
    totalCoins += BET_SCORE;
    currentBet = 0;
    string += ' You have not won or lost any coins this round.';
  } else if (BET_SCORE < 0 && gameState === 'SHOW_INITIAL_HAND') {
    string += ` You will lose ${Math.abs(BET_SCORE)} coins if you do not replace your cards.`;
  } else {
    totalWinnings -= Math.abs(BET_SCORE);
    currentBet = 0;
    string += ` You have lost ${Math.abs(BET_SCORE)} coins this round.`;
  }

  showOrUpdateTotalCoins();
  showOrUpdateCurrentBet();
  showOrUpdateTotalWinnings();

  return string;
};

/**
 * UI TOGGLES
 *
 */

const showOrUpdateTotalCoins = () => {
  const TOTAL_COINS_PARAGRAPHS = document.querySelectorAll('.totalCoins');
  if (TOTAL_COINS_PARAGRAPHS.length > 0) {
    TOTAL_COINS_PARAGRAPHS[0].innerText = `Coins left: ${totalCoins}`;
  } else {
    const TOTAL_COINS_PARAGRAPH = document.createElement('p');
    TOTAL_COINS_PARAGRAPH.classList.add('totalCoins');
    TOTAL_COINS_PARAGRAPH.innerText = `Coins left: ${totalCoins}`;
    document.body.appendChild(TOTAL_COINS_PARAGRAPH);
  }
};

const showOrUpdateCurrentBet = () => {
  const CURRENT_BET_PARAGRAPHS = document.querySelectorAll('.currentBet');
  if (CURRENT_BET_PARAGRAPHS.length > 0) {
    CURRENT_BET_PARAGRAPHS[0].innerText = `Current bet: ${currentBet}`;
  } else {
    const CURRENT_BET_PARAGRAPH = document.createElement('p');
    CURRENT_BET_PARAGRAPH.classList.add('currentBet');
    CURRENT_BET_PARAGRAPH.innerText = `Current bet: ${currentBet}`;
    document.body.appendChild(CURRENT_BET_PARAGRAPH);
  }
};

const showOrUpdateTotalWinnings = () => {
  const YOUR_WINNINGS_PARAGRAPHS = document.querySelectorAll('.yourWinnings');
  if (YOUR_WINNINGS_PARAGRAPHS.length > 0) {
    YOUR_WINNINGS_PARAGRAPHS[0].innerText = `Your winnings: ${totalWinnings}`;
  } else {
    const YOUR_WINNINGS_PARAGRAPH = document.createElement('p');
    YOUR_WINNINGS_PARAGRAPH.classList.add('yourWinnings');
    YOUR_WINNINGS_PARAGRAPH.innerText = `Your winnings: ${totalWinnings}`;
    document.body.appendChild(YOUR_WINNINGS_PARAGRAPH);
  }
};

const toggleInsertCoins = () => {
  if (gameState === INIT_COINS) {
    // initialize coins input
    coinsInput = document.createElement('input');
    coinsInput.setAttribute('type', 'number');
    coinsInput.classList.add('coinsInput');
    coinsInput.classList.add('initCoins');
    document.body.appendChild(coinsInput);

    // initialize coins input button
    coinsInputButton = document.createElement('button');
    coinsInputButton.classList.add('initCoins');
    coinsInputButton.innerText = 'insert coins';
    coinsInputButton.addEventListener('click', insertCoinsSubmit);
    document.body.appendChild(coinsInputButton);
  } else {
    const INIT_COINS_ELEMENTS = document.querySelectorAll('.initCoins');
    for (let i = 0; i < INIT_COINS_ELEMENTS.length; i += 1) {
      INIT_COINS_ELEMENTS[i].remove();
    }
  }
};

const toggleSetBet = () => {
  if (gameState === SET_BET) {
    showOrUpdateTotalCoins();
    showOrUpdateCurrentBet();
    showOrUpdateTotalWinnings();

    currentBetInput = document.createElement('input');
    currentBetInput.setAttribute('type', 'number');
    currentBetInput.classList.add('currentBetInput');
    currentBetInput.classList.add('setBet');
    document.body.appendChild(currentBetInput);

    currentBetSubmitButton = document.createElement('button');
    currentBetSubmitButton.innerText = 'Bet!';
    currentBetSubmitButton.classList.add('setBet');
    currentBetSubmitButton.addEventListener('click', placeBetsSubmit);
    document.body.appendChild(currentBetSubmitButton);
  } else {
    const INIT_BET_ELEMENTS = document.querySelectorAll('.setBet');
    for (let i = 0; i < INIT_BET_ELEMENTS.length; i += 1) {
      INIT_BET_ELEMENTS[i].remove();
    }
  }
};

const toggleShowInitialHand = () => {
  if (gameState === SHOW_INITIAL_HAND) {
    showOrUpdateTotalCoins();
    showOrUpdateCurrentBet();
    showOrUpdateTotalWinnings();
    // Initialise cardContainer as a div with CSS class card-container,
    // and add it to the document body. Add this logic to the initGame function.
    cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.classList.add('showInitialHand');
    document.body.appendChild(cardContainer);

    // draw initial hand
    drawInitialHand();

    gameInfo.classList.add('showInitialHand');
    document.body.appendChild(gameInfo);

    raiseInput = document.createElement('input');
    raiseInput.classList.add('raiseInput');
    raiseInput.classList.add('showInitialHand');
    document.body.appendChild(raiseInput);

    // create raise and replace cards button
    raiseAndReplaceButton = document.createElement('button');
    raiseAndReplaceButton.innerText = 'Continue';
    raiseAndReplaceButton.classList.add('showInitialHand');
    raiseAndReplaceButton.addEventListener('click', raiseAndReplaceClick);
    document.body.appendChild(raiseAndReplaceButton);
  } else {
    const SHOW_INITIAL_HAND_ELEMENTS = document.querySelectorAll('.showInitialHand');
    for (let i = 0; i < SHOW_INITIAL_HAND_ELEMENTS.length; i += 1) {
      SHOW_INITIAL_HAND_ELEMENTS[i].remove();
    }
  }
};

const toggleShowFinalHand = () => {
  if (gameState === SHOW_FINAL_HAND) {
    showOrUpdateTotalCoins();
    showOrUpdateCurrentBet();
    showOrUpdateTotalWinnings();

    // Initialise cardContainer as a div with CSS class card-container,
    // and add it to the document body. Add this logic to the initGame function.
    cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.classList.add('showFinalHand');
    document.body.appendChild(cardContainer);

    // Pop player 1's card metadata from the deck
    for (let i = 0; i < player1Cards.length; i += 1) {
      // Create card element from card metadata
      const cardElement = createCard(player1Cards[i]);
      cardElement.classList.add('showFinalHand');
      // Append the card element to the card container
      cardContainer.appendChild(cardElement);
    }
    gameInfo = document.createElement('div');
    gameInfo.innerText = `Player ${playersTurn}, your replaced hand has ${recognizeCurrentHand(player1Cards)}`;
    document.body.appendChild(gameInfo);
  } else {
    const SHOW_FINAL_HAND_ELEMENTS = document.querySelectorAll('.showFinalHand');
    for (let i = 0; i < SHOW_FINAL_HAND_ELEMENTS.length; i += 1) {
      SHOW_FINAL_HAND_ELEMENTS[i].remove();
    }
  }
};

const toggleUI = () => {
  toggleInsertCoins();
  toggleSetBet();
  toggleShowInitialHand();
  toggleShowFinalHand();
};

/**
 * GAME INITIALISATION
 * We can now centralise our game initialisation into a single function called `initGame`.
 */

const initBet = () => {
  prevGameState = gameState;
  gameState = SET_BET;
  toggleUI();
};

const initGame = () => {
  prevGameState = gameState;
  gameState = SHOW_INITIAL_HAND;
  toggleUI();
};

const initFinalHand = () => {
  prevGameState = gameState;
  gameState = SHOW_FINAL_HAND;
  toggleUI();
};

const initCoins = () => {
  // set game state
  gameState = INIT_COINS;
  // set UI
  toggleUI();
};

// CX: Run initGame() to start everything!
// initGame();

initCoins();
