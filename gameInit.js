// global variables
let gameScore = 100;
const folderPath = 'images/cards';
let rankTally = {};
let suitTally = {};
let canDeal = false;
let canSwap = false;
let gameMode = 'place_bets';
const maxPlayerHand = 5;
let currentBet = 0;
let cardsToSwap = [];
let handScore = 0;
let pointsWon;
let playerHand = [];

const gameInfo = document.createElement('div');
gameInfo.classList.add('gameInfoContainer');
document.body.appendChild(gameInfo);

const betInfo = document.createElement('div');
betInfo.classList.add('gameInfoContainer');
document.body.appendChild(betInfo);

const mainContainer = document.createElement('div');
mainContainer.classList.add('mainContainer');
document.body.appendChild(mainContainer);

const scoreContainer = document.createElement('div');
scoreContainer.classList.add('score-Container');
scoreContainer.innerText = `${gameScore}`;
document.body.appendChild(scoreContainer);

const playerdiv = document.createElement('div');
playerdiv.classList.add('player1container');
mainContainer.appendChild(playerdiv);

// create the buttons
const dealBtn = document.createElement('BUTTON');
dealBtn.classList.add('start-btn');
dealBtn.innerHTML = 'Deal';

const swapBtn = document.createElement('BUTTON');
swapBtn.classList.add('start-btn');
swapBtn.innerHTML = 'Swap';

const bet1Btn = document.createElement('BUTTON');
bet1Btn.innerHTML = '1 Coin';
bet1Btn.classList.add('video-game-button');

const bet5Btn = document.createElement('BUTTON');
bet5Btn.innerHTML = '5 Coins';
bet5Btn.classList.add('video-game-button');

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('btnContainer');
buttonsContainer.appendChild(bet1Btn);
buttonsContainer.appendChild(bet5Btn);
buttonsContainer.appendChild(dealBtn);
buttonsContainer.appendChild(swapBtn);
document.body.appendChild(buttonsContainer);

// display message using output
const output = (message) => {
  gameInfo.innerText = message;
};

const betOutput = (message) => {
  betInfo.innerText = message;
};

const initGame = () => {
  if (gameMode === 'place_bets') {
    output('Place Your Bets');
    betOutput(`You have ${gameScore} Coins! Your Bet is ${currentBet}`);
    console.log(`${gameMode}`);
  }
};

initGame();
