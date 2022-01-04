/* -------------------------------------------------------------------------- */
/*                              global variables                              */
/* -------------------------------------------------------------------------- */

// containers and buttons
let boardElement;
let cardContainer;
let buttonContainer;
let pointsContainer;
let outputContainer;
let points;
let bet;
let betOne;
let betMax;

//  create player hand array of 5 cards
let playerHand = [];

// array of selected cards
let selectedCards = [];

// player points
let playerPoints = Number(100);
const playerBet = [];

// player card tally
let cardRankTally = {};
let cardSuitTally = {};

// set winning hands to false
let fiveOfAKind = false;
let royalFlush = false;
let straightFlush = false;
let fourOfAKind = false;
let fullHouse = false;
let flush = false;
let straight = false;
let threeOfAKind = false;
let twoPair = false;
let onePair = false;
let highCard = false;

// ace high
let aceHigh = false;

// card scoring multiplier
const multipliers = [50, 30, 20, 10, 6, 5, 4, 3, 2, 1, 0];

// button global vars
let clicked = false;
let holdStatus = false;

// game mode
let bettingMode = true;
let dealMode = false;
let holdMode = false;

// to enable coin waterfall
let win = false;

// background game music
let myMusic;
// button click sounds
const buttonSounds = new Audio('sounds/zipclick.flac');
// select card sounds
const cardSelectSounds = new Audio('sounds/vgmenuselect.wav');