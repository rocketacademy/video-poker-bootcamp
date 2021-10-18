/*
GLOBAL VARIABLES
*/

// User starts with 100 points
let userPoints = 100;

// User chooses how much they want to bet, 1 by default;
let userBet = 1;

let canDeal = true;
let canSwap = true;

let cardContainer;

// User is dealt 5 cards
let userHand = [];

// Current deck
let cardDeck = [];

let cardClick = [true, true, true, true, true];

// User chosen cards to swap
let cardsToSwap = [];

// User's winning condition on hand
let userWin = "";

const gameContainer = document.createElement('div');
gameContainer.classList.add('game-container');
document.body.appendChild(gameContainer);

pointsContainer = document.createElement('div');
pointsContainer.classList.add('points');
pointsContainer.innerText = `You have: ${userPoints} points`;
gameContainer.appendChild(pointsContainer);

cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
gameContainer.appendChild(cardContainer);

// Message 
const gameInfo = document.createElement('div');
gameInfo.classList.add('message');
gameContainer.appendChild(gameInfo);

const buttons = document.createElement('div');
buttons.classList.add('buttons');
gameContainer.appendChild(buttons);

// Deal button
const dealButton = document.createElement('button');
dealButton.innerText = 'DEAL';
buttons.appendChild(dealButton);

// Swap button
const swapButton = document.createElement('button');
swapButton.innerText = "SWAP";
buttons.appendChild(swapButton);

// New button
const resetButton = document.createElement('button');
resetButton.innerText = "RESET";
buttons.appendChild(resetButton);

const cardBack = document.createElement('div');
cardBack.classList.add('card-back');
cardBack.innerHTML = "Be a quitter :" + "<br/>" + "1800-6-668-668";
// document.body.appendChild(cardBack);
