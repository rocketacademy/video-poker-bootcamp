// Please implement exercise logic here
/**
 * GLOBAL SETUP
 * Global variables that store game-wide data or DOM elements
 */

// Initialize unshuffled deck
const unshuffledDeck = makeDeck();
// Shuffled deck as a copy of unshuffled deck
// eslint-disable-next-line prefer-const
let deck = shuffleCards([...unshuffledDeck]);

// UI VARIABLES
// Add the cardContainer DOM element as a global variable.
let cardContainer;

// Player 1 cards
// eslint-disable-next-line prefer-const
let player1Cards = [];

// initialize gameState
// eslint-disable-next-line prefer-const
let gameState = INIT_COINS;
// initialize totalCoins
// eslint-disable-next-line prefer-const
let totalCoins = 0;
// eslint-disable-next-line prefer-const
let currentBet = 0;
// eslint-disable-next-line prefer-const
let totalWinnings = 0;
