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
let player1Cards = [];

// initialize gameState
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
const coinsInputKeypress = (e) => {
  if (e.keyCode === 13) {
    insertCoinsSubmit();
  }
};

const insertCoinsSubmit = () => {
  const COINS_INPUT = document.querySelector('.coinsInput');
  const COINS = Number(COINS_INPUT.value);
  const IS_COINS_NUMBER = !Number.isNaN(COINS);
  if (COINS_INPUT.value.trim() !== '' && IS_COINS_NUMBER && COINS > 0 && COINS <= 1000) {
    totalCoins += COINS;
    initBet();
  } else {
    const COINS_INPUT_FEEDBACK_PARAGRAPHS = document.querySelectorAll('.coinsInputFeedback');
    if (COINS_INPUT_FEEDBACK_PARAGRAPHS.length > 0 && COINS_INPUT_FEEDBACK_PARAGRAPHS[0].classList.contains('invisible')) {
      COINS_INPUT_FEEDBACK_PARAGRAPHS[0].classList.remove('invisible');
      COINS_INPUT_FEEDBACK_PARAGRAPHS[0].classList.add('visible');
    }
  }
};

const currentBetInputKeypress = (e) => {
  if (e.keyCode === 13) {
    placeBetsSubmit();
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
    if (BET_INPUT_FEEDBACK_PARAGRAPHS.length > 0 && BET_INPUT_FEEDBACK_PARAGRAPHS[0].classList.contains('invisible')) {
      BET_INPUT_FEEDBACK_PARAGRAPHS[0].classList.remove('invisible');
      BET_INPUT_FEEDBACK_PARAGRAPHS[0].classList.add('visible');
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

const newRoundOrGameClick = () => {
  // create new deck and reshuffle
  deck = shuffleCards([...unshuffledDeck]);
  // reset existing player cards
  player1Cards = [];

  if (totalCoins > 0) {
    currentBet = 0;
    initBet();
  } else {
    totalCoins = 0;
    currentBet = 0;
    initCoins();
  }
};

const raiseAndReplaceClick = () => {
  const RAISE_INPUTS = document.querySelectorAll('.raiseInput');
  let raise = 0;
  let isRaiseNumber = false;

  if (RAISE_INPUTS.length > 0) {
    raise = Number(RAISE_INPUTS[0].value);
    isRaiseNumber = !Number.isNaN(raise);
  }

  if (RAISE_INPUTS.length > 0 && RAISE_INPUTS[0].value.trim() !== '' && isRaiseNumber && raise > 0 && raise <= totalCoins) {
    currentBet += raise;
    totalCoins -= raise;
    replaceHand();
    initFinalHand();
  } else if (RAISE_INPUTS.length > 0 && RAISE_INPUTS[0].value.trim() !== '' && isRaiseNumber && raise > 0) {
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
  // Empty cardContainer in case this is not the 1st round of gameplay
  cardContainer.innerHTML = '';

  // For testing: use this hand
  // ♠, ♥, ♣, ♦️
  // const TEST_HAND = [
  //   {
  //     name: 'king',
  //     suit: 'clubs',
  //     rank: 13,
  //     suitSymbol: '♣',
  //     displayName: 'K',
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
  //     name: '3',
  //     suit: 'spades',
  //     rank: 3,
  //     suitSymbol: '♠',
  //     displayName: '3',
  //     colour: 'black',
  //   },
  //   {
  //     name: '9',
  //     suit: 'hearts',
  //     rank: 9,
  //     suitSymbol: '♥',
  //     displayName: '9',
  //     colour: 'red',
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
  gameInfo.classList.add('gameInfo');
  gameInfo.innerText = `Player ${playersTurn}, your current hand has ${recognizeCurrentHand(player1Cards)}`;
  if (totalCoins > 0) {
    gameInfo.innerText += ' You may choose any number of cards to replace, or raise your bet.';
  } else {
    gameInfo.innerText += ' Since you have no coins left, you cannot raise your bet any further. You may still choose any number of cards to replace.';
  }

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
  const WINNINGS = BET_SCORE - currentBet;

  if (WINNINGS > 0 && gameState === 'SHOW_INITIAL_HAND') {
    string += ` You will win ${WINNINGS} coin(s) if you do not replace your cards!`;
  } else if (WINNINGS > 0) {
    totalWinnings += WINNINGS;
    totalCoins += WINNINGS + currentBet;
    string += ` You have won ${WINNINGS} coin(s) this round!`;
  } else if (BET_SCORE - currentBet === 0 && gameState === 'SHOW_INITIAL_HAND') {
    string += ' You will not win or lose any coins if you do not replace your cards.';
  } else if (BET_SCORE - currentBet === 0) {
    totalCoins += currentBet;
    string += ' You have not won or lost any coins this round.';
  } else if (BET_SCORE - currentBet < 0 && gameState === 'SHOW_INITIAL_HAND') {
    string += ` You will lose your bet of ${Math.abs(BET_SCORE)} coins if you do not replace your cards.`;
  } else {
    totalWinnings -= Math.abs(BET_SCORE);
    string += ` You have lost your bet of ${Math.abs(BET_SCORE)} coins this round.`;
  }

  if (totalCoins > 0 && gameState === 'SHOW_FINAL_HAND') {
    string += ' Click the button below to start a new round.';
  } else if (gameState === 'SHOW_FINAL_HAND') {
    string += ' You are out of coins! Click the button below to insert some coins!';
  }

  showOrUpdateCoins();

  return string;
};

/**
 * UI TOGGLES
 *
 */

const showOrUpdateCoinsWrapper = () => {
  const VIEW_COINS_WRAPPERS = document.querySelectorAll('.viewCoinsWrapper');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (VIEW_COINS_WRAPPERS.length > 0 && COINS_WRAPPERS.length <= 0) {
    const COINS_WRAPPER = document.createElement('div');
    COINS_WRAPPER.className = 'coinsWrapper coins-wrapper';
    VIEW_COINS_WRAPPERS[0].appendChild(COINS_WRAPPER);
  }
};

const showOrUpdateTotalCoins = () => {
  const TOTAL_COINS_PARAGRAPHS = document.querySelectorAll('.totalCoins');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (TOTAL_COINS_PARAGRAPHS.length > 0 && COINS_WRAPPERS.length > 0) {
    const TOTAL_COINS_SUB_VALUE = document.querySelector('.totalCoinsSubValue');
    TOTAL_COINS_SUB_VALUE.innerText = `${totalCoins}`;
  } else if (COINS_WRAPPERS.length > 0) {
    const TOTAL_COINS_PARAGRAPH = document.createElement('div');
    TOTAL_COINS_PARAGRAPH.className = 'totalCoins total-coins flex';
    const TOTAL_COINS_SUB_HEADER = document.createElement('div');
    TOTAL_COINS_SUB_HEADER.innerHTML = '<i class="lni lni-coin"></i> Left';
    const TOTAL_COINS_SUB_VALUE = document.createElement('div');
    TOTAL_COINS_SUB_VALUE.classList.add('totalCoinsSubValue');
    TOTAL_COINS_SUB_VALUE.innerText = `${totalCoins}`;
    COINS_WRAPPERS[0].appendChild(TOTAL_COINS_PARAGRAPH);
    TOTAL_COINS_PARAGRAPH.appendChild(TOTAL_COINS_SUB_HEADER);
    TOTAL_COINS_PARAGRAPH.appendChild(TOTAL_COINS_SUB_VALUE);
  }
};

const showOrUpdateCurrentBet = () => {
  const CURRENT_BET_PARAGRAPHS = document.querySelectorAll('.currentBet');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (CURRENT_BET_PARAGRAPHS.length > 0 && COINS_WRAPPERS.length > 0) {
    const CURRENT_BET_SUB_VALUE = document.querySelector('.currentBetSubValue');
    CURRENT_BET_SUB_VALUE.innerText = `${currentBet}`;
  } else if (COINS_WRAPPERS.length > 0) {
    const CURRENT_BET_PARAGRAPH = document.createElement('div');
    CURRENT_BET_PARAGRAPH.className = 'currentBet current-bet flex';
    const CURRENT_BET_SUB_HEADER = document.createElement('div');
    CURRENT_BET_SUB_HEADER.innerHTML = 'Bet <i class="lni lni-coin"></i>';
    const CURRENT_BET_SUB_VALUE = document.createElement('div');
    CURRENT_BET_SUB_VALUE.classList.add('currentBetSubValue');
    CURRENT_BET_SUB_VALUE.innerText = `${currentBet}`;
    COINS_WRAPPERS[0].appendChild(CURRENT_BET_PARAGRAPH);
    CURRENT_BET_PARAGRAPH.appendChild(CURRENT_BET_SUB_HEADER);
    CURRENT_BET_PARAGRAPH.appendChild(CURRENT_BET_SUB_VALUE);
  }
};

const showOrUpdateTotalWinnings = () => {
  const YOUR_WINNINGS_PARAGRAPHS = document.querySelectorAll('.yourWinnings');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (YOUR_WINNINGS_PARAGRAPHS.length > 0) {
    const YOUR_WINNINGS_SUB_VALUE = document.querySelector('.yourWinningsSubValue');
    YOUR_WINNINGS_SUB_VALUE.innerText = `${totalWinnings}`;
    if (totalWinnings > 0) {
      YOUR_WINNINGS_SUB_VALUE.classList.add('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-negative');
    } else if (totalWinnings === 0) {
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-negative');
    } else {
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.add('text-negative');
    }
  } else if (COINS_WRAPPERS.length > 0) {
    const YOUR_WINNINGS_PARAGRAPH = document.createElement('div');
    YOUR_WINNINGS_PARAGRAPH.className = 'yourWinnings your-winnings flex';
    const YOUR_WINNINGS_SUB_HEADER = document.createElement('div');
    YOUR_WINNINGS_SUB_HEADER.innerHTML = 'Winnings <i class="lni lni-coin"></i>';
    const YOUR_WINNINGS_SUB_VALUE = document.createElement('div');
    YOUR_WINNINGS_SUB_VALUE.className = 'yourWinningsSubValue your-winnings-sub-value';
    YOUR_WINNINGS_SUB_VALUE.innerText = `${totalWinnings}`;
    if (totalWinnings > 0) {
      YOUR_WINNINGS_SUB_VALUE.classList.add('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-negative');
    } else if (totalWinnings === 0) {
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-negative');
    } else {
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.add('text-negative');
    }
    COINS_WRAPPERS[0].appendChild(YOUR_WINNINGS_PARAGRAPH);
    YOUR_WINNINGS_PARAGRAPH.appendChild(YOUR_WINNINGS_SUB_HEADER);
    YOUR_WINNINGS_PARAGRAPH.appendChild(YOUR_WINNINGS_SUB_VALUE);
  }
};

const showOrUpdateCoins = () => {
  showOrUpdateCoinsWrapper();
  showOrUpdateTotalCoins();
  showOrUpdateCurrentBet();
  showOrUpdateTotalWinnings();
};

const hideTotalCoins = () => {
  const TOTAL_COINS_PARAGRAPHS = document.querySelectorAll('.totalCoins');
  for (let i = 0; i < TOTAL_COINS_PARAGRAPHS.length; i += 1) {
    TOTAL_COINS_PARAGRAPHS[i].remove();
  }
};

const hideCurrentBet = () => {
  const CURRENT_BET_PARAGRAPHS = document.querySelectorAll('.currentBet');
  for (let i = 0; i < CURRENT_BET_PARAGRAPHS.length; i += 1) {
    CURRENT_BET_PARAGRAPHS[i].remove();
  }
};

const hideYourWinnings = () => {
  const YOUR_WINNINGS_PARAGRAPHS = document.querySelectorAll('.yourWinnings');
  for (let i = 0; i < YOUR_WINNINGS_PARAGRAPHS.length; i += 1) {
    YOUR_WINNINGS_PARAGRAPHS[i].remove();
  }
};

const hideViewCoinsWrapper = () => {
  const VIEW_COINS_WRAPPERS = document.querySelectorAll('.viewCoinsWrapper');
  for (let i = 0; i < VIEW_COINS_WRAPPERS.length; i += 1) {
    VIEW_COINS_WRAPPERS[i].remove();
  }
};

const hideCoins = () => {
  hideTotalCoins();
  hideCurrentBet();
  hideYourWinnings();
  hideViewCoinsWrapper();
};

const toggleInsertCoins = () => {
  if (gameState === INIT_COINS) {
    // hide coins indicators from previous UI states
    hideCoins();

    // create insert coins container
    const INSERT_COINS_CONTAINER = document.createElement('div');
    INSERT_COINS_CONTAINER.className += ' initCoins init-coins-container flex flex-direction-column justify-content-center';
    document.body.appendChild(INSERT_COINS_CONTAINER);

    // add headers
    const WELCOME_TO_HEADER = document.createElement('h2');
    WELCOME_TO_HEADER.classList.add('welcome-to-header');
    WELCOME_TO_HEADER.classList.add('initCoins');
    WELCOME_TO_HEADER.innerText = 'Welcome to';
    INSERT_COINS_CONTAINER.appendChild(WELCOME_TO_HEADER);

    const VIDEO_POKER_HEADER = document.createElement('h1');
    VIDEO_POKER_HEADER.classList.add('video-poker-header');
    VIDEO_POKER_HEADER.classList.add('initCoins');
    const VIDEO_HEADER = document.createElement('span');
    VIDEO_HEADER.classList.add('video-header');
    VIDEO_HEADER.classList.add('initCoins');
    VIDEO_HEADER.innerText = 'Video';
    VIDEO_POKER_HEADER.appendChild(VIDEO_HEADER);
    const POKER_HEADER = document.createElement('span');
    POKER_HEADER.classList.add('poker-header');
    POKER_HEADER.classList.add('initCoins');
    POKER_HEADER.innerText = 'Poker';
    VIDEO_POKER_HEADER.appendChild(POKER_HEADER);
    INSERT_COINS_CONTAINER.appendChild(VIDEO_POKER_HEADER);

    // initialize coins input
    const COINS_INPUT_PARAGRAPH = document.createElement('p');
    COINS_INPUT_PARAGRAPH.className = 'coinsInputParagraph coins-input-paragraph initCoins';
    const INSERT_SPAN = document.createElement('span');
    INSERT_SPAN.style.marginRight = '10px';
    INSERT_SPAN.innerText = 'Insert';
    COINS_INPUT_PARAGRAPH.appendChild(INSERT_SPAN);
    coinsInput = document.createElement('input');
    coinsInput.setAttribute('type', 'number');
    coinsInput.className = 'coinsInput initCoins coins-input';
    coinsInput.addEventListener('keypress', coinsInputKeypress);
    COINS_INPUT_PARAGRAPH.appendChild(coinsInput);
    const COINS_SPAN = document.createElement('span');
    COINS_SPAN.innerHTML = '<i class="lni lni-coin coin"></i>';
    COINS_SPAN.style.marginLeft = '10px';
    COINS_INPUT_PARAGRAPH.appendChild(COINS_SPAN);
    INSERT_COINS_CONTAINER.appendChild(COINS_INPUT_PARAGRAPH);

    // initialize coins input feedback
    const COINS_INPUT_FEEDBACK_PARAGRAPH = document.createElement('p');
    COINS_INPUT_FEEDBACK_PARAGRAPH.className = 'coinsInputFeedback initCoins coins-input-feedback text-danger invisible';
    COINS_INPUT_FEEDBACK_PARAGRAPH.innerHTML = 'Please insert a minimum of 1 <i class="lni lni-coin coin"></i>, and a maximum of 1000 <i class="lni lni-coin coin"></i>.';
    INSERT_COINS_CONTAINER.appendChild(COINS_INPUT_FEEDBACK_PARAGRAPH);

    // initialize coins input button
    coinsInputButton = document.createElement('button');
    coinsInputButton.className = 'initCoins coins-input-button button cta big';
    coinsInputButton.innerText = 'Start';
    coinsInputButton.addEventListener('click', insertCoinsSubmit);
    INSERT_COINS_CONTAINER.appendChild(coinsInputButton);
  } else {
    const INIT_COINS_ELEMENTS = document.querySelectorAll('.initCoins');
    for (let i = 0; i < INIT_COINS_ELEMENTS.length; i += 1) {
      INIT_COINS_ELEMENTS[i].remove();
    }
  }
};

const toggleSetBet = () => {
  if (gameState === SET_BET) {
    // hide coins indicators from previous UI states
    hideCoins();
    // create set bet container
    const SET_BET_WRAPPER = document.createElement('div');
    SET_BET_WRAPPER.className = 'setBet set-bet-wrapper flex flex-direction-column';
    const VIEW_COINS_WRAPPER = document.createElement('div');
    VIEW_COINS_WRAPPER.className = 'viewCoinsWrapper view-coins-wrapper flex-grow-zero flex-shrink-zero flex';
    const SET_BET_CONTAINER = document.createElement('div');
    SET_BET_CONTAINER.className = 'setBet setBetContainer set-bet-container flex flex-direction-column justify-content-center flex-grow-one flex-shrink-one';
    document.body.appendChild(SET_BET_WRAPPER);
    SET_BET_WRAPPER.appendChild(VIEW_COINS_WRAPPER);
    SET_BET_WRAPPER.appendChild(SET_BET_CONTAINER);

    showOrUpdateCoins();

    // initialize bet input
    const CURRENT_BET_INPUT_PARAGRAPH = document.createElement('p');
    CURRENT_BET_INPUT_PARAGRAPH.className = 'currentBetParagraph current-bet-paragraph setBet';
    const INSERT_SPAN = document.createElement('span');
    INSERT_SPAN.style.marginRight = '10px';
    INSERT_SPAN.innerText = 'Bet';
    CURRENT_BET_INPUT_PARAGRAPH.appendChild(INSERT_SPAN);
    currentBetInput = document.createElement('input');
    currentBetInput.setAttribute('type', 'number');
    currentBetInput.className = 'currentBetInput setBet current-bet-input';
    currentBetInput.addEventListener('keypress', currentBetInputKeypress);
    CURRENT_BET_INPUT_PARAGRAPH.appendChild(currentBetInput);
    const COINS_SPAN = document.createElement('span');
    COINS_SPAN.innerHTML = '<i class="lni lni-coin coin"></i> this round';
    COINS_SPAN.style.marginLeft = '10px';
    CURRENT_BET_INPUT_PARAGRAPH.appendChild(COINS_SPAN);
    SET_BET_CONTAINER.appendChild(CURRENT_BET_INPUT_PARAGRAPH);

    // initialize current bet input feedback
    const BET_INPUT_FEEDBACK_PARAGRAPH = document.createElement('p');
    BET_INPUT_FEEDBACK_PARAGRAPH.className = 'betInputFeedback setBet bet-input-feedback text-danger invisible';
    BET_INPUT_FEEDBACK_PARAGRAPH.innerHTML = `You must bet at least 1 <i class="lni lni-coin coin"></i>, and at most ${totalCoins} <i class="lni lni-coin coin"></i>.`;
    SET_BET_CONTAINER.appendChild(BET_INPUT_FEEDBACK_PARAGRAPH);

    // initialize current bet button
    currentBetSubmitButton = document.createElement('button');
    currentBetSubmitButton.innerText = 'Continue';
    currentBetSubmitButton.className = 'setBet current-bet-input-button button cta big';
    currentBetSubmitButton.addEventListener('click', placeBetsSubmit);
    SET_BET_CONTAINER.appendChild(currentBetSubmitButton);
  } else {
    const INIT_BET_ELEMENTS = document.querySelectorAll('.setBet');
    for (let i = 0; i < INIT_BET_ELEMENTS.length; i += 1) {
      INIT_BET_ELEMENTS[i].remove();
    }
  }
};

const toggleShowInitialHand = () => {
  if (gameState === SHOW_INITIAL_HAND) {
    // hide coins indicators from previous UI states
    hideCoins();

    const SHOW_INITIAL_HAND_WRAPPER = document.createElement('div');
    SHOW_INITIAL_HAND_WRAPPER.className = 'showInitialHand show-initial-hand-wrapper flex flex-direction-column';
    const VIEW_COINS_WRAPPER = document.createElement('div');
    VIEW_COINS_WRAPPER.className = 'viewCoinsWrapper view-coins-wrapper flex-grow-zero flex-shrink-zero flex';
    const SHOW_INITIAL_HAND_CONTAINER = document.createElement('div');
    SHOW_INITIAL_HAND_CONTAINER.className = 'showInitialHand showInitialHandContainer show-initial-hand-container flex flex-direction-column justify-content-center flex-grow-one flex-shrink-one';
    document.body.appendChild(SHOW_INITIAL_HAND_WRAPPER);
    SHOW_INITIAL_HAND_WRAPPER.appendChild(VIEW_COINS_WRAPPER);
    SHOW_INITIAL_HAND_WRAPPER.appendChild(SHOW_INITIAL_HAND_CONTAINER);

    showOrUpdateCoins();
    // Initialise cardContainer as a div with CSS class card-container,
    // and add it to the document body. Add this logic to the initGame function.
    cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.classList.add('showInitialHand');
    SHOW_INITIAL_HAND_CONTAINER.appendChild(cardContainer);

    // draw initial hand
    drawInitialHand();

    gameInfo.classList.add('showInitialHand');
    SHOW_INITIAL_HAND_CONTAINER.appendChild(gameInfo);

    if (totalCoins > 0) {
      raiseInput = document.createElement('input');
      raiseInput.classList.add('raiseInput');
      raiseInput.classList.add('showInitialHand');
      SHOW_INITIAL_HAND_CONTAINER.appendChild(raiseInput);
    } else {
      const RAISE_INPUTS = document.querySelectorAll('.raiseInput');
      for (let i = 0; i < RAISE_INPUTS.length; i += 1) {
        RAISE_INPUTS[i].remove();
      }
    }

    // create raise and replace cards button
    raiseAndReplaceButton = document.createElement('button');
    raiseAndReplaceButton.innerText = 'Continue';
    raiseAndReplaceButton.classList.add('showInitialHand');
    raiseAndReplaceButton.addEventListener('click', raiseAndReplaceClick);
    SHOW_INITIAL_HAND_CONTAINER.appendChild(raiseAndReplaceButton);
  } else {
    const SHOW_INITIAL_HAND_ELEMENTS = document.querySelectorAll('.showInitialHand');
    for (let i = 0; i < SHOW_INITIAL_HAND_ELEMENTS.length; i += 1) {
      SHOW_INITIAL_HAND_ELEMENTS[i].remove();
    }
  }
};

const toggleShowFinalHand = () => {
  if (gameState === SHOW_FINAL_HAND) {
    // hide coins indicators from previous UI states
    hideCoins();

    const SHOW_FINAL_HAND_WRAPPER = document.createElement('div');
    SHOW_FINAL_HAND_WRAPPER.className = 'showFinalHand show-final-hand-wrapper flex flex-direction-column';
    const VIEW_COINS_WRAPPER = document.createElement('div');
    VIEW_COINS_WRAPPER.className = 'viewCoinsWrapper view-coins-wrapper flex-grow-zero flex-shrink-zero flex';
    const SHOW_FINAL_HAND_CONTAINER = document.createElement('div');
    SHOW_FINAL_HAND_CONTAINER.className = 'showFinalHand showFinalHandContainer show-final-hand-container flex flex-direction-column justify-content-center flex-grow-one flex-shrink-one';
    document.body.appendChild(SHOW_FINAL_HAND_WRAPPER);
    SHOW_FINAL_HAND_WRAPPER.appendChild(VIEW_COINS_WRAPPER);
    SHOW_FINAL_HAND_WRAPPER.appendChild(SHOW_FINAL_HAND_CONTAINER);

    showOrUpdateCoins();

    // Initialise cardContainer as a div with CSS class card-container,
    // and add it to the document body. Add this logic to the initGame function.
    cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.classList.add('showFinalHand');
    SHOW_FINAL_HAND_CONTAINER.appendChild(cardContainer);

    // Pop player 1's card metadata from the deck
    for (let i = 0; i < player1Cards.length; i += 1) {
      // Create card element from card metadata
      const cardElement = createCard(player1Cards[i]);
      cardElement.classList.add('showFinalHand');
      // Append the card element to the card container
      cardContainer.appendChild(cardElement);
    }
    gameInfo = document.createElement('div');
    gameInfo.classList.add('showFinalHand');
    gameInfo.innerText = `Player ${playersTurn}, your replaced hand has ${recognizeCurrentHand(player1Cards)}`;
    SHOW_FINAL_HAND_CONTAINER.appendChild(gameInfo);
    if (gameState === 'SHOW_FINAL_HAND') {
      const newRoundOrGameButton = document.createElement('button');
      newRoundOrGameButton.classList.add('newRoundOrGameButton');
      newRoundOrGameButton.classList.add('showFinalHand');
      newRoundOrGameButton.addEventListener('click', newRoundOrGameClick);
      if (totalCoins > 0) {
        newRoundOrGameButton.innerText = 'Start New Round';
      } else {
        newRoundOrGameButton.innerText = 'Insert More Coins';
      }
      SHOW_FINAL_HAND_CONTAINER.appendChild(newRoundOrGameButton);
    }
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
  gameState = SET_BET;
  toggleUI();
};

const initGame = () => {
  gameState = SHOW_INITIAL_HAND;
  toggleUI();
};

const initFinalHand = () => {
  gameState = SHOW_FINAL_HAND;
  toggleUI();
};

const initCoins = () => {
  // set game state
  gameState = INIT_COINS;
  // set UI
  toggleUI();
};

initCoins();
// initBet();
// initGame();
