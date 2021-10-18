/* eslint-disable prefer-const */

/** Globals for card helper functions */
const shuffledDeck = shuffleCards(makeDeck());
const hand = [];
let canClick = [true, true, true, true, true];
let isTimerOn = false;
let isLastRound = false;

/** HTML display related innerText */
let score = 100;
let timerStartSeconds = 90;
let winningScore = 200;

/** HTML elements */
// non-static elements
// message output changes everytime resultsButtonElement is clicked
const messageBoxElement = document.querySelector('#message-text');
messageBoxElement.innerHTML = `It's 1793 Paris, as the soon-to-be-last Queen of France awaits her execution, Marie-Antoinette plays some video poker. <br>Help her get to ${winningScore} points before time runs out and the guillotine drops!`;

// score gets updated everytime resultsButtonElement is clicked
const scoreBoardElement = document.querySelector('#score-board');
scoreBoardElement.innerHTML = score;

// timer counts down once dealButtonElement is clicked
const countDownElement = document.querySelector('#countdown');
countDownElement.innerHTML = timerStartSeconds;

// portrait of Marie-Antoinette changes when game is over, and when game is won
const portraitElement = document.querySelector('#portrait-image');

// buttons
const dealButtonElement = document.querySelector('#deal-button');
const resultsButtonElement = document.querySelector('#results-button');
// restartButtonElement refreshes page to refresh game
const restartButtonElement = document.querySelector('#restart-button');
restartButtonElement.addEventListener('click', () => { window.location.reload(); });

/** Globals for win condition */
let highCard = false;
let twoOfAKind = false;
let twoPairs = false;
let threeOfAKind = false;
let fullHouse = false;
let fourOfAKind = false;
let flush = true;
let straights = true;
let broadway = false;
