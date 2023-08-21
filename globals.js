/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/** GLOBAL VARIABLES */
let credits = 100;
let playerCard = '';
let handScore = 0;
let bet = 0;
let currentGameMode = 'input bet';
let playerHand = [];
let redrawIndexes = [];
let deck;
let royalFlush;
let straightFlush;
let fourOfAKind;
let fullHouse;
let flush;
let straight;
let threeOfAKind;
let twoPairs;
let onePair;
let highCard;
let winCondition = '';
let audioOn = false;

const winningInfoArr = [
  ['Royal Flush', '+ bet x30'],
  ['Straight Flush', '+ bet x25'],
  ['Four of a Kind', '+ bet x20'],
  ['Full House', '+ bet x15'],
  ['Flush', '+ bet x10'],
  ['Straight', '+ bet x8'],
  ['Three of a Kind', '+ bet x6'],
  ['Two Pairs', '+ bet x4'],
  ['One Pair', '+ bet x2'],
  ['High Card', '+ bet x1'],
];

/** CREATION OF ELEMENTS */
const audio = new Audio('../video-poker-bootcamp/media/audio.mp3');

const gameHeader = document.createElement('div');
gameHeader.className = 'game-header';
const audioButton = document.createElement('button');
audioButton.innerHTML = '&#x1F508';
const gameTitle = document.createElement('h1');
gameTitle.innerHTML = 'Video Poker Game';
const pokerCardsGif = document.createElement('img');
pokerCardsGif.src = '../video-poker-bootcamp/media/poker-cards-gif.gif';

const gameInfo = document.createElement('p');
gameInfo.className = 'game-info';

const gameBody = document.createElement('div');
gameBody.className = 'game-body';

const winningInfoTable = document.createElement('table');
winningInfoTable.className = 'winning-info-table';

const cardTable = document.createElement('div');
cardTable.className = 'card-table';

const gameFooter = document.createElement('div');
gameFooter.className = 'game-footer';

const gameFooter1 = document.createElement('div');
gameFooter1.className = 'game-footer-1';

const creditsText = document.createElement('p');
creditsText.innerText = 'Credits:';
const creditsInfo = document.createElement('p');
creditsInfo.innerText = credits;

const gameFooter2 = document.createElement('div');
gameFooter2.className = 'game-footer-2';

const betText = document.createElement('p');
betText.innerText = 'Bet Amount:';

const betInputField = document.createElement('input');
betInputField.disabled = false;
betInputField.placeholder = 'Enter Bet Amount';

const submitButton = document.createElement('button');
submitButton.innerText = 'Submit / Deal Cards';
