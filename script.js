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

// ------------------------------------------ //
// ----------- HELPER FUNCTIOONS ------------ //
// ------------------------------------------ //

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }

      let symbol = "";
      if (currentSuit === "hearts") {
        symbol = "♥️";
      } else if (currentSuit === "diamonds") {
        symbol = "♦️";
      } else if (currentSuit === "clubs") {
        symbol = "♣";
      } else if (currentSuit === "spades") {
        symbol = "♠";
      }

      let cardColor = "";
      if (currentSuit === "clubs" || currentSuit === "spades") {
        cardColor = "black";
      } else {
        cardColor = "red";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suit: currentSuit,
        rank: rankCounter,
        displayName: cardName,
        suitSymbol: symbol,
        colour: cardColor,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

// Output to abstract complexity of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

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

const winCombo = [
  "ROYAL FLUSH",
  "STRAIGHT FLUSH",
  "4 OF A KIND",
  "FULL HOUSE",
  "FLUSH",
  "STRAIGHT",
  "3 OF A KIND",
  "2 PAIRS",
  "PAIR OF JACKS+",
];

const buildBoard = (board) => {
  // create hidden blue highlight containers
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

  // create hidden blue highlight containers
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
    cell.innerHTML = j + 1;
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

// ------------------------------------------ //
// ------- PLAYER ACTION CALLBACKS ---------- //
// ------------------------------------------ //

/** create a card with css styling */
const createCard = (cardInfo) => {
  const name = document.createElement("div");
  name.classList.add("name");
  name.innerText = cardInfo.displayName;

  const suit = document.createElement("div");
  suit.classList.add("suit");
  suit.innerText = cardInfo.suitSymbol;

  const card = document.createElement("div");
  card.classList.add("card-front");

  card.appendChild(name);
  card.appendChild(suit);
  card.style.color = cardInfo.colour;

  return card;
};

const createCardBack = () => {
  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  return cardBack;
};

/** deal 5 cards from deck into player's array */

const createHand = (deck) => {
  for (i = 0; i < 5; i += 1) {
    playerArray.push(deck.pop());
  }
};

/** display player's array on the screen */
const displayHand = (playerArray) => {
  cardContainer.innerHTML = "";
  for (i = 0; i < playerArray.length; i += 1) {
    // create drawn cards
    const cardElement = createCard(playerArray[i]);
    cardElement.addEventListener("click", holdCard); // display "hold"
    // create card back
    const cardBackElement = createCardBack();
    // create wrapper to hold "hold" and card
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    cardContainer.append(wrapper);
    // create "hold"
    const holdDiv = document.createElement("div");
    holdDiv.classList.add("hold");
    // append "hold", card back and card inside the wrapper
    wrapper.append(holdDiv);
    const wrapperInner = document.createElement("div");
    wrapperInner.classList.add("wrapper-inner");
    wrapperInner.append(cardBackElement);
    wrapperInner.append(cardElement);
    wrapper.appendChild(wrapperInner);
    /* setTimeout(() => {
      wrapper.append(wrapperInner);
    }, 100*i); */
  }
};

let holdArray = [];
/** hold card and add index of card in playerArray to holdArray */
const holdCard = (event) => {
  const parentDiv = event.currentTarget.parentNode.parentNode;
  for (i = 0; i < playerArray.length; i += 1) {
    let cardName = playerArray[i].displayName;
    let cardSuit = playerArray[i].suitSymbol;
    if (
      event.currentTarget.children[0].innerHTML == cardName &&
      event.currentTarget.children[1].innerHTML == cardSuit
    ) {
      if (holdArray.includes(i) === false) {
        holdArray.push(i);
        parentDiv.children[0].innerText = "HOLD";
        parentDiv.children[0].classList.add("hold-wrapper")
      } else {
        holdArray = holdArray.filter((e) => e != i);
        parentDiv.children[0].innerText = "";
        parentDiv.children[0].classList.remove("hold-wrapper")
      }
    }
  }
};

/** create JS object as a tally - to check how many duplicates there are of names/suits in each deck */
const createTally = () => {
  for (let i = 0; i < playerArray.length; i += 1) {
    var cardRank = playerArray[i].rank;
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    } else {
      cardRankTally[cardRank] = 1;
    }
    var cardSuit = playerArray[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    } else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  rankArray = Object.keys(cardRankTally);
  suitArray = Object.keys(cardSuitTally);
};

/** Check for straight */
const checkStraight = (array) => {
  if (array.length !== 5) {
    return false;
  }
  for (let i = 1; i < array.length; i += 1) {
    if (array[i] - array[i - 1] !== 1) {
      return false;
    }
  }
  return true;
};

const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === parseInt(value));
};

const arraysEqual = (a, b) => {
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

const toggleRedHighlight = (i) => {
  console.log("show red highlight");
  document.getElementsByClassName("highlight-red")[i].style.visibility =
    "visible";
};

const translatePictureToNo = (name, object) => {
  for (x = 0; x < Object.keys(object).length; x += 1) {
    if (name === Object.keys(object)[x]) {
      return Object.values(object)[x];
    }
  }
};
const jackQueenKingAce = { J: 11, Q: 12, K: 13, A: 1 };

const addHighlightToWinCards = (no) => {
  console.log(playerArray.length);
  for (i = 0; i < playerArray.length; i += 1) {
    const card = document.getElementsByClassName("card-front")[i];
    if (card.children[0].innerHTML == getKeyByValue(cardRankTally, no)) {
      card.classList.add("highlight-card");
      card.classList.remove("darken-card");
      console.log(i);
      console.log(card.children[0].innerHTML)
      console.log(i, getKeyByValue(cardRankTally, no));
    } else if (
      translatePictureToNo(card.children[0].innerHTML, jackQueenKingAce) ==
      getKeyByValue(cardRankTally, no)
    ) {
      card.classList.add("highlight-card");
      card.classList.remove("darken-card");
    }
    console.log(i, card.classList.contains("highlight-card"));
    if (card.classList.contains("highlight-card") === false) {
      card.style.color = "#131D4D";
      card.classList.add("darken-card");
    }
  }
};

const addHighlightToPairJacksPlus = (no) => {
  for (i = 0; i < playerArray.length; i += 1) {
    const card = document.getElementsByClassName("card-front")[i];
    console.log(typeof card.children[0].innerHTML);
    console.log(
      translatePictureToNo(card.children[0].innerHTML, jackQueenKingAce)
    );
    console.log(getKeyByValue(cardRankTally, no));
    if (
      translatePictureToNo(card.children[0].innerHTML, jackQueenKingAce) ==
      getKeyByValue(cardRankTally, no)
    ) {
      card.classList.add("highlight-card");
    }
    if (card.classList.contains("highlight-card") === false) {
      card.style.color = "#131D4D";
      card.classList.add("darken-card");
    }
  }
};

/** Calculate handscore from straight flush (9) to high card (1) */
const calcHandScore = () => {
  // for code testing purpose
  /* suitArray.length = 1;
  rankArray = [1, 12, 13];
  console.log(rankArray);
  chosenBet = 5; */
  if (suitArray.length === 1 && arraysEqual(rankArray, [1, 10, 11, 12, 13])) {
    if (chosenBet === 5) {
      points = 2000;
    } else {
      points = 250 * chosenBet; // royal flush
    }
    combo = "ROYAL FLUSH";
    toggleRedHighlight(0);
    for (i = 0; i < playerArray.length; i += 1) {
      document
        .getElementsByClassName("card-front")
        [i].classList.add("highlight-card");
    }
    return;
  }
  if (suitArray.length === 1 && checkStraight(rankArray) === true) {
    points = 50 * chosenBet; // straight flush
    combo = "STRAIGHT FLUSH";
    toggleRedHighlight(1);
    for (i = 0; i < playerArray.length; i += 1) {
      document
        .getElementsByClassName("card-front")
        [i].classList.add("highlight-card");
    }
    return;
  } else if (
    rankArray.length === 2 &&
    Object.values(cardRankTally).some((value) => value === 4)
  ) {
    points = 25 * chosenBet; // four of a kind
    combo = "FOUR OF A KIND";
    toggleRedHighlight(2);
    addHighlightToWinCards(4);
    return;
  } else if (
    rankArray.length === 2 &&
    Object.values(cardRankTally).some((value) => value === 3)
  ) {
    points = 9 * chosenBet; // full house
    combo = "FULL HOUSE";
    toggleRedHighlight(3);
    for (i = 0; i < playerArray.length; i += 1) {
      document
        .getElementsByClassName("card-front")
        [i].classList.add("highlight-card");
    }
    return;
  } else if (suitArray.length === 1) {
    points = 6 * chosenBet; // flush
    combo = "FLUSH";
    toggleRedHighlight(4);
    for (i = 0; i < playerArray.length; i += 1) {
      document
        .getElementsByClassName("card-front")
        [i].classList.add("highlight-card");
    }
    return;
  } else if (checkStraight(rankArray) === true) {
    points = 4 * chosenBet; // straight
    combo = "STRAIGHT";
    toggleRedHighlight(5);
    for (i = 0; i < playerArray.length; i += 1) {
      document
        .getElementsByClassName("card-front")
        [i].classList.add("highlight-card");
    }
    return;
  } else if (Object.values(cardRankTally).some((value) => value === 3)) {
    points = 3 * chosenBet; // three of a kind
    combo = "THREE OF A KIND";
    toggleRedHighlight(6);
    addHighlightToWinCards(3);
    return;
  } else if (
    Object.values(cardRankTally).some((value) => value === 2) &&
    rankArray.length === 3
  ) {
    points = 2 * chosenBet; // two pairs
    combo = "TWO PAIRS";
    toggleRedHighlight(7);
    addHighlightToWinCards(2);
    delete cardRankTally[getKeyByValue(cardRankTally, 2)];
    addHighlightToWinCards(2);
    return;
  } else if (
    Object.values(cardRankTally).some((value) => value === 2) &&
    (getKeyByValue(cardRankTally, 2) > 10 ||
      getKeyByValue(cardRankTally, 2) == 1)
  ) {
    points = 1 * chosenBet; // pair of Jacks+
    combo = "PAIR OF JACKS+";
    toggleRedHighlight(8);
    addHighlightToPairJacksPlus(2);
    return;
  } else {
    points = 0 * chosenBet;
    combo = "NO COMBO";
    return;
  }
};

const addPointsAnimation = document.getElementById("add-points");
/** Add points to pointsInWallet - INCOMPLETE*/
const addPoints = () => {
  pointsInWallet += points;
};

/** Reset game */
const resetGame = () => {
  playerArray.splice(0, playerArray.length);
  cardRankTally = {};
  cardSuitTally = {};
  rankArray = [];
  suitArray = [];
  holdArray = [];
  points = 0;
  chosenBet = 0;
  pointsDeductedAlr = 0;
  deck = shuffleCards(makeDeck());
  setTimeout(() => {
    output("Place your bet");
  }, 8000);
  displayWallet();
  displayBet();
  dealButton.innerHTML = "DEAL";
  for (i = 0; i < 5; i += 1) {
    document.getElementsByClassName("highlight-blue")[i].style.visibility =
      "hidden";
  }
};

const flipCards = () => {
  for (i = 0; i < 5; i += 1) {
    document
      .getElementsByClassName("wrapper-inner")
      [i].classList.toggle("flip-card");
  }
};

const showCards = () => {
  for (i = 0; i < 5; i += 1) {
    document.getElementsByClassName("card-back")[i].style.zIndex = "-1";
  }
};

const displayWallet = () => {
  walletDiv.innerHTML = `CREDIT(S) : ${pointsInWallet}`;
};

const displayName = () => {
  nameDiv.innerHTML = playerName;
};

const play = (i) => {
  document.getElementById(i).play();
};

const betOne = () => {
  play("bgm");
  if (chosenBet < 5) {
    chosenBet += 1;
  }
  for (i = 0; i < 5; i += 1) {
    if (chosenBet === i + 1) {
      console.log(chosenBet);
      document.getElementsByClassName("highlight-blue")[i].style.visibility =
        "visible";
      if (chosenBet > 1) {
        document.getElementsByClassName("highlight-blue")[
          i - 1
        ].style.visibility = "hidden";
      }
    }
  }
  play("bet-audio");
  for (i = 0; i < 9; i += 1) {
    document.getElementsByClassName("highlight-red")[i].style.visibility =
      "hidden";
  }
  dealButton.disabled = false;
  displayBet();
};

const maxBet = () => {
  chosenBet = 5;
  displayBet();
  for (i = 0; i < 4; i += 1) {
    document.getElementsByClassName("highlight-blue")[i].style.visibility =
      "hidden";
  }
  document.getElementsByClassName("highlight-blue")[4].style.visibility =
    "visible";
  for (i = 0; i < 9; i += 1) {
    document.getElementsByClassName("highlight-red")[i].style.visibility =
      "hidden";
  }
  play("bet-audio");
  dealButton.disabled = false;
};

displayBet = () => {
  chosenBetDisplay.innerText = `${chosenBet}`;
};

let pointsDeductedAlr = 0;

const deal = () => {
  if (chosenBet == 0) {
    return;
  }
  play("deal-cards-audio");
  if (gameMode === "deal") {
    createHand(deck);
    displayHand(playerArray);
    gameMode = "bet";
    pointsInWallet -= chosenBet;
    displayWallet();
    pointsDeductedAlr = 1;
  }
  if (gameMode === "bet") {
    setTimeout(() => {
      console.log("bet gamemode");
      if (pointsDeductedAlr === 0) {
        pointsInWallet -= chosenBet;
        pointsDeductedAlr = 1;
        displayWallet();
      }
      // flip cards
      flipCards();
      //showCards();
      // show that wallet depletes by bet amount
      // display instructions
      output("Click on the cards that you wish to hold");
      // change gameMode and deal button function
      gameMode = "draw";
      dealButton.innerHTML = "DRAW";
      // disable bet buttons
      betOneButton.disabled = true;
      maxBetButton.disabled = true;
    }, 50);
  } else if (gameMode == "draw") {
    // swap unheld cards with new cards from deck
    for (i = 0; i < playerArray.length; i += 1) {
      console.log(holdArray, holdArray.includes(i));
      if (holdArray.includes(i) === false) {
        let newCard = deck.pop();
        playerArray.splice(i, 1, newCard);
      }
    }
    // display new hand
    displayHand(playerArray);
    // flip cards to show cards + remove function to "hold"
    flipCards();
    for (i = 0; i < 5; i += 1) {
      document
        .getElementsByClassName("wrapper-inner")
        [i].removeEventListener("click", holdCard);
    }
    // tabulate points won
    createTally();
    calcHandScore();
    // add points to wallet
    addPoints();
    // To add: show animation of points added to wallet
    // display combo won
    output(`${combo}`);
    // reset all values for next round
    resetGame();
    gameMode = "deal";
    betOneButton.disabled = false;
    maxBetButton.disabled = false;
  }
};

betOneButton.addEventListener("click", betOne);
maxBetButton.addEventListener("click", maxBet);
dealButton.addEventListener("click", deal);

/** Run game set-up functions */
const startGame = () => {
  pointsInWallet = 100;
  createHand(deck);
  playerArray = [
    {
      suit: "hearts",
      rank: 9,
      displayName: "9",
      suitSymbol: "♥️",
      colour: "red",
    },
    {
      suit: "hearts",
      rank: 9,
      displayName: "9",
      suitSymbol: "♥️",
      colour: "red",
    },
    {
      suit: "diamonds",
      rank: 7,
      displayName: "7",
      suitSymbol: "♦️",
      colour: "red",
    },
    {
      suit: "spades",
      rank: 7,
      displayName: "7",
      suitSymbol: "♠",
      colour: "black",
    },
    {
      suit: "clubs",
      rank: 13,
      displayName: "K",
      suitSymbol: "♣",
      colour: "black",
    },
  ];
  displayHand(playerArray);
  displayWallet();
  displayName();
  gameInfo.innerHTML = "Place your bet";
};

// ------------------------------------------ //
// -------------- GAME PLAY ----------------- //
// ------------------------------------------ //
let gameMode = "bet";
startGame();
