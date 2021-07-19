// create game layout
// create instructions/gameplay board
const gameInstructions = document.createElement('div');
gameInstructions.classList.add('infoboard');
gameInstructions.innerText = 'Game Play Instructions';

const payoutTable = document.createElement('div');
payoutTable.classList.add('payoutTable', 'infoboard');
payoutTable.innerText = 'Payout Table';

const infoPanel = document.createElement('div');
infoPanel.classList.add('infoPanel');

infoPanel.appendChild(gameInstructions);
infoPanel.appendChild(payoutTable);

// create 5 cards and card container
const card1 = document.createElement('div');
card1.classList.add('card');
card1.id = 'card1';
card1.innerText = 'card 1';
const card2 = document.createElement('div');
card2.classList.add('card');
card2.id = 'card2';
card2.innerText = 'card 2';
const card3 = document.createElement('div');
card3.classList.add('card');
card3.id = 'card3';
card3.innerText = 'card 3';
const card4 = document.createElement('div');
card4.classList.add('card');
card4.id = 'card4';
card4.innerText = 'card 4';
const card5 = document.createElement('div');
card5.classList.add('card');
card5.id = 'card5';
card5.innerText = 'card 5';

// create message board
const gameMessage = document.createElement('div');
gameMessage.classList.add('gameMessage');
gameMessage.innerText = 'Hello, pls place a bet!';

const cardContainer = document.createElement('div');
cardContainer.classList.add('cardContainer');

cardContainer.appendChild(card1);
cardContainer.appendChild(card2);
cardContainer.appendChild(card3);
cardContainer.appendChild(card4);
cardContainer.appendChild(card5);
cardContainer.appendChild(gameMessage);
// create  card panel to apphend 5 cards and game message
const cardPanel = document.createElement('div');
cardPanel.classList.add('cardPanel');
cardPanel.appendChild(cardContainer);

// create bet button
const betButton = document.createElement('button');
betButton.classList.add('button');
betButton.innerText = 'Bet: ';

// create bet dropdown
const betAmount = document.createElement('input');
betAmount.setAttribute('id', 'betAmount');
betAmount.setAttribute('type', 'number');
betAmount.setAttribute('min', '1');
betAmount.setAttribute('max', '5');

const betDisplay = document.createElement('div');
betDisplay.classList.add('betDisplay');

betDisplay.appendChild(betButton);
betDisplay.appendChild(betAmount);
document.body.appendChild(betDisplay);

// create deal button
const dealButton = document.createElement('button');
dealButton.classList.add('button');
dealButton.innerText = 'Deal';

// create swap button
const swapButton = document.createElement('button');
swapButton.classList.add('button');
swapButton.innerText = 'Swap';

const controlPanel = document.createElement('div');
controlPanel.classList.add('controlPanel');

controlPanel.appendChild(betDisplay);
controlPanel.appendChild(dealButton);
controlPanel.appendChild(swapButton);

const scoreText = document.createElement('div');
scoreText.className = 'score';
scoreText.innerText = 'Score: ';

const scoreBoard = document.createElement('div');
scoreBoard.className = 'score';
scoreBoard.innerHTML = `${score}`;

const scoreDiv = document.createElement('div');
scoreDiv.className = 'scoreDiv';

scoreDiv.appendChild(scoreText);
scoreDiv.appendChild(scoreBoard);

document.body.appendChild(infoPanel);
document.body.appendChild(cardPanel);
document.body.appendChild(controlPanel);
document.body.appendChild(scoreDiv);
