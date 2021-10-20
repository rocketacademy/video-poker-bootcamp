// ------------------------------------------ //
// ----------- GLOBAL VARIABLES ------------- //
// ------------------------------------------ //

const gameInfo = document.getElementById("game-info");
let playerArray = [];
const cardContainer = document.getElementById("card-container");
let currentIndex;
let cardRankTally = {};
let cardSuitTally = {};
let rankArray;
let suitArray;
let points = 0;
let pointsInWallet = 0;
let playerName = "PLAYER 1";
let bet = 0;
let chosenBet = 0;
let combo;
const walletDiv = document.getElementById("wallet");
const nameDiv = document.getElementById("player-name");
const chosenBetDisplay = document.getElementById("chosen-bet-display");
chosenBetDisplay.innerHTML = "0";
const betOneButton = document.getElementById("bet-one");
const maxBetButton = document.getElementById("max-bet");
const dealButton = document.getElementById("deal");
let pointsDeductedAlr = 0;
let holdArray = [];
const jackQueenKingAce = { J: 11, Q: 12, K: 13, A: 1 };
const addPointsAnimation = document.getElementById("add-points");

// ------------------------------------------ //
// ------------- GLOBAL SETUP --------------- //
// ------------------------------------------ //

let deck = shuffleCards(makeDeck());

let board = [];
for (i = 0; i < 9; i += 1) {
  rows = [];
  for (j = 0; j < 5; j += 1) {
    if (i < 4) {
      rows.push((i + 1) * (j + 1));
    } else if (i === 4) {
      rows.push(6 * (j + 1));
    } else if (i === 5) {
      rows.push(9 * (j + 1));
    } else if (i === 6) {
      rows.push(25 * (j + 1));
    } else if (i === 7) {
      rows.push(50 * (j + 1));
    } else if (i === 8) {
      rows.push(250 * (j + 1));
    }
  }
  board.push(rows);
}
board[8][4] = 2000;
board.reverse();

const buildBoard = (board) => {
  // create hidden horizontal red highlight containers
  for (let j = 0; j < board.length; j += 1) {
    const highlightRed = document.createElement("div");
    highlightRed.classList.add("highlight-red");
    highlightRed.innerHTML = " ";
    redHighlightContainer.appendChild(highlightRed);
  }

  // create combo board first
  for (let i = 0; i < board.length; i += 1) {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row", "combo-row");
    if (i % 2 === 1) {
      rowElement.classList.add("darkblue", "combo-row");
    } else {
      rowElement.classList.add("lightblue", "combo-row");
    }
    rowElement.innerHTML = winCombo[i];
    comboBoard.appendChild(rowElement);
  }

  // create hidden vertical blue highlight containers
  for (let j = 0; j < board[0].length; j += 1) {
    const highlightBlue = document.createElement("div");
    highlightBlue.classList.add("highlight-blue");
    highlightBlue.innerHTML = " ";
    highlightContainer.appendChild(highlightBlue);
  }

  // create score header
  for (let j = 0; j < board[0].length; j += 1) {
    const cell = document.createElement("div");
    cell.classList.add("cell-header");
    cell.innerHTML = `${j + 1}x`;
    columnHeader.appendChild(cell);
  }

  // create score board and append beside combo board
  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement("div");
    rowElement.classList.add("row", "points-row");
    if (i % 2 === 1) {
      rowElement.classList.add("darkblue");
    } else {
      rowElement.classList.add("lightblue");
    }
    // set each cell
    // j is the column number

    for (let j = 0; j < row.length; j += 1) {
      // one cell element
      const cell = document.createElement("div");
      cell.classList.add("cell");

      // set the text of the cell according to the array
      cell.innerText = board[i][j];

      rowElement.appendChild(cell);
    }

    // add a single row to the board
    pointsBoard.appendChild(rowElement);
  }
};

/** create container for storing different combo names (row headers) */
const comboBoard = document.getElementById("combo");
const pointsBoard = document.getElementById("points");
const highlightContainer = document.getElementById("highlight-container");
const redHighlightContainer = document.getElementById(
  "red-highlight-container"
);
const columnHeader = document.getElementById("column-header");
buildBoard(board);