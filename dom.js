/* eslint-disable prefer-const */
// create game layout
// create instructions/gameplay board

// for DOM display

// create 5 starting cards and card container
const cardContainer = document.createElement('div');
cardContainer.classList.add('cardContainer');

// create message board
const gameMessage = document.createElement('div');
gameMessage.classList.add('gameMessage');
gameMessage.innerHTML = 'Hello, please place a bet!';

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
