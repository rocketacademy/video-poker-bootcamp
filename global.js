/* eslint-disable prefer-const */

/** Globals for card helper functions */
const shuffledDeck = shuffleCards(makeDeck());
const hand = [];
let canClick = [true, true, true, true, true];
let isTimerOn = false;

/** HTML display related innerText */
let score = 100;
let timerStartSeconds = 5;

/** HTML elements */
// non-static elements
const messageBox = document.querySelector('#message-text');
messageBox.innerHTML = 'It\'s 1800 Paris, as the French Revolution rages through the city, Marie-Antoinette plays some poker, help her get to 200 points before the time runs out and the revolutionaries come!';
const scoreBoard = document.querySelector('#score-board');
scoreBoard.innerHTML = score;
const countDownElement = document.querySelector('#countdown');
countDownElement.innerHTML = timerStartSeconds;
const portraitElement = document.querySelector('#portrait-image');
// buttons
const dealButton = document.querySelector('#deal-button');
const resultsButton = document.querySelector('#results-button');

/** Globals for win condition */
let highCard = false;
let twoOfAKind = false;
let twoPairs = false;
let threeOfAKind = false;
let fullHouse = false;
let fourOfAKind = false;
let flush = true;
let straights = true;
