/*####################
## GLOBAL VARIABLES ##
####################*/
let buttonWrapper;
let dealButton;
let drawButton;
let deckInfo;
let square;
let gameInfo;
let moneyField;
let betField;
let overlay;
let replayButton;
let multiplier; // points to multiply bet
let winningHand; // name of the winning hand, if any
let money = 100;
let betAmount = 0;

/*####################
## HELPER FUNCTIONS ##
####################*/

//auto generate 52 cards deck
const makeDeck = () => {
  let cardDeck = [
    {
      suitSymbol: "joker",
      suit: "joker",
      name: "joker",
      display: "joker",
      colour: "joker",
      rank: 0,
      cardFront: `../public/fronts/joker_red.svg`,
    },
  ];

  // Initialise an array of the 4 suit in our deck. We will loop over this array.
  const suit = [
    { suitsShape: "hearts", suitsSymbol: "♥️", suitsColour: "red" },
    { suitsShape: "diamonds", suitsSymbol: "♦️", suitsColour: "red" },
    { suitsShape: "clubs", suitsSymbol: "♣️", suitsColour: "black" },
    { suitsShape: "spades", suitsSymbol: "♠️", suitsColour: "black" },
  ];

  // Loop over the suit array
  for (let value of suit) {
    // Store the current suit in a variable
    let currentSuit = value.suitsShape;
    let currentSymbol = value.suitsSymbol;
    let currentColour = value.suitsColour;

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter++) {
      // By default, the card name is the same as rankCounter
      let cardName = rankCounter;
      let displayName = `card${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name, set cardValue to 10 (for jack, queen, king) or 11 (for ace)
      if (rankCounter == 1) {
        cardName = "ace";
        displayName = "A";
      } else if (rankCounter == 11) {
        cardName = "jack";
        displayName = "J";
      } else if (rankCounter == 12) {
        cardName = "queen";
        displayName = "Q";
      } else if (rankCounter == 13) {
        cardName = "king";
        displayName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        display: displayName,
        colour: currentColour,
        rank: rankCounter,
        cardFront: `../public/fronts/${currentSuit}_${cardName}.svg`,
      };

      // Add the new card to the deck
      cardDeck.push(card);
    }
  }

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => {
  return Math.floor(Math.random() * max);
};

const shuffleCards = (anArray) => {
  // Loop over the card deck array once
  let currentIndex = 0;
  while (currentIndex < anArray.length) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(anArray.length);
    // Select the card that corresponds to randomIndex
    let randomCard = anArray[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = anArray[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    anArray[currentIndex] = randomCard;
    anArray[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return anArray;
};

/*##############
## HAND & DECK ##
##############*/
// Create shuffled deck
let deck = shuffleCards(makeDeck());

// Create hand array of 5 cards
let hand = [];

const buildOtherElements = () => {
  gameInfo = document.createElement("div");
  // fill game info div with starting instructions
  gameInfo.classList.add("game-info");
  gameInfo.innerText = `Let's play ! \n\ Please enter bet amount`;
  document.body.appendChild(gameInfo);

  //bet wrapper
  let betWrapper = document.createElement("div");
  document.body.appendChild(betWrapper);

  moneyField = document.createElement("div");
  moneyField.classList.add("input", "visible");
  moneyField.innerText = `🪴 Xmas pot 🪴 \n\ ${money}`;
  betWrapper.appendChild(moneyField);

  betField = document.createElement("input");
  betField.classList.add("input", "visible");
  betField.setAttribute("type", "number");
  betField.setAttribute("placeholder", "Enter bet amount");
  betWrapper.appendChild(betField);

  //button wrapper
  buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("button-wrapper");
  document.body.appendChild(buttonWrapper);

  //button to deal cards
  dealButton = document.createElement("button");
  dealButton.classList.add("button");
  dealButton.innerText = "Deal";
  buttonWrapper.appendChild(dealButton);

  //button to draw cards
  drawButton = document.createElement("button");
  drawButton.classList.add("button");
  drawButton.innerText = "Draw";
  drawButton.disabled = true;
  buttonWrapper.appendChild(drawButton);

  //remaining deck info
  deckInfo = document.createElement("div");
  deckInfo.classList.add("deck-info");
  deckInfo.innerText = `Deck: ${deck.length}`;
  drawButton.appendChild(deckInfo);

  //create overlay for game over state
  overlay = document.createElement("div");
  overlay.classList.add("overlay-text");
  document.body.appendChild(overlay);

  replayButton = document.createElement("button");
  replayButton.classList.add("button");
  replayButton.innerText = "Replay";
};

let gameMode = "deal";

// build 5 cards on hand on the screen
const buildBoardElements = () => {
  // create the element that everything will go inside of
  let boardElement = document.createElement("div");
  // give it a class for CSS purposes
  boardElement.classList.add("board");
  boardElement.innerHTML = "";

  // make all the squares for this row
  for (let i = 0; i < 5; i++) {
    // create the square element
    square = document.createElement("div");
    // set a class for CSS purposes
    square.classList.add("square");
    square.innerHTML = `<img src ="../public/snowman.png"/>`;
    boardElement.appendChild(square);
  }
  document.body.insertBefore(boardElement, gameInfo);
};

buildOtherElements();
buildBoardElements();
