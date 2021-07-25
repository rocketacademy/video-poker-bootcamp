/* eslint-disable prefer-const */
// create game layout
// create instructions/gameplay board
const card1holder = document.createElement('div');
card1holder.classList.add('cardholder');
const card2holder = document.createElement('div');
card2holder.classList.add('cardholder');
const card3holder = document.createElement('div');
card3holder.classList.add('cardholder');
const card4holder = document.createElement('div');
card4holder.classList.add('cardholder');
const card5holder = document.createElement('div');
card5holder.classList.add('cardholder');

// create 5 cards and card container
let card1 = document.createElement('img');
card1.classList.add('card');
card1.src = 'images/pokerBack.jpeg';
let card2 = document.createElement('img');
card2.classList.add('card');
card2.src = 'images/pokerBack.jpeg';
let card3 = document.createElement('img');
card3.classList.add('card');
card3.src = 'images/pokerBack.jpeg';
let card4 = document.createElement('img');
card4.classList.add('card');
card4.src = 'images/pokerBack.jpeg';
let card5 = document.createElement('img');
card5.classList.add('card');
card5.src = 'images/pokerBack.jpeg';

// create message board
const gameMessage = document.createElement('div');
gameMessage.classList.add('gameMessage');
gameMessage.innerHTML = 'Hello, please place a bet!';

const cardContainer = document.createElement('div');
cardContainer.classList.add('cardContainer');

cardContainer.appendChild(card1);
cardContainer.appendChild(card2);
cardContainer.appendChild(card3);
cardContainer.appendChild(card4);
cardContainer.appendChild(card5);
// create  card panel to apphend 5 cards and game message
const cardPanel = document.createElement('div');
cardPanel.classList.add('cardPanel');
cardPanel.appendChild(cardContainer);
cardPanel.appendChild(gameMessage);

// create bet button
const betText = document.createElement('div');
betText.classList.add('button');
betText.innerText = 'Bet: ';

// create bet dropdown
const betAmount = document.createElement('input');
betAmount.setAttribute('id', 'betAmount');
betAmount.setAttribute('type', 'number');
betAmount.setAttribute('min', '1');
betAmount.setAttribute('max', '10');
betAmount.setAttribute('value', '1');

const betDisplay = document.createElement('div');
betDisplay.classList.add('betDisplay');

betDisplay.appendChild(betText);
betDisplay.appendChild(betAmount);
document.body.appendChild(betDisplay);

// create deal button
const dealButton = document.createElement('button');
dealButton.classList.add('button');
dealButton.innerText = 'Deal';

// create swap button
const swapButton = document.createElement('button');
swapButton.classList.add('button');
swapButton.innerText = 'Swap / End Round';

const controlPanel = document.createElement('div');
controlPanel.classList.add('controlPanel');

controlPanel.appendChild(betDisplay);
controlPanel.appendChild(dealButton);
controlPanel.appendChild(swapButton);

const scoreText = document.createElement('div');
scoreText.className = 'points';
scoreText.innerText = 'Points: ';

const scoreBoard = document.createElement('div');
scoreBoard.className = 'points';
scoreBoard.innerHTML = `${points}`;

const scoreDiv = document.createElement('div');
scoreDiv.className = 'scoreDiv';

scoreDiv.appendChild(scoreText);
scoreDiv.appendChild(scoreBoard);

// document.body.appendChild(infoPanel);
document.body.appendChild(cardPanel);
document.body.appendChild(controlPanel);
document.body.appendChild(scoreDiv);
