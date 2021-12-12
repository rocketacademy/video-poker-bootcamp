/*
 * A function that returns a fixed number of i
 * @param cardInHand = [] to store all cards drawn
 * @param push cards drawn into cardInHand
 * @return number of i that the user scored for the cards in hand
 */
let pair = false;
let cardNameTally = {};
let cardInHand = [];
let userPoints = 0;
let moneyInHand = 200;
let bettingMoney = 0;
let balanceAmount = 0;
let container;
let playerCardHand = [];
let playerHandRank = [];
let cardHeld = false;
let readyButton = document.createElement("button");
let gameMessage = document.createElement("div");
let outputMessage = document.createElement("div");
outputMessage.id = "output-message";
let table = document.getElementById("table");

let betOneButton = document.createElement("button");
betOneButton.innerHTML = "BET ONE";
betOneButton.setAttribute("id", "bet-one");

let betAllButton = document.createElement("button");
betAllButton.innerHTML = " ALL IN";
betAllButton.setAttribute("id", "bet-all");

// deal button will be at the start of the game
let dealButton = document.createElement("button");
dealButton.setAttribute("id", "deal-button");
dealButton.innerHTML = "DEAL";
dealButton.disabled = true;

// creating container for all buttons to be in

const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-cont");
buttonContainer.appendChild(betOneButton);
buttonContainer.appendChild(betAllButton);
buttonContainer.appendChild(dealButton);

const buttonFunctions = () => {
  document.body.appendChild(outputMessage);
  betAllButton.addEventListener("click", () => {
    dealButton.disabled = false;
    betAllButton.disabled = true;
    betOneButton.disabled = true;
    bettingMoney = 5;
    balanceAmount = moneyInHand - bettingMoney;
    if (balanceAmount === 0) {
      dealButton.disabled = false;
      betAllButton.disabled = true;
      betOneButton.disabled = true;
    }
    outputMessage.innerHTML = `Money in hand: $${balanceAmount}<br><br> Betting: $${bettingMoney}`;
  });
  betOneButton.addEventListener("click", () => {
    dealButton.disabled = false;
    bettingMoney++;
    balanceAmount = moneyInHand - bettingMoney;
    if (balanceAmount === 0) {
      dealButton.disabled = false;
      betAllButton.disabled = true;
      betOneButton.disabled = true;
    }
    outputMessage.innerHTML = `Money in hand: $${balanceAmount} <br><br> Betting: $${bettingMoney}`;
  });

  dealButton.addEventListener("click", () => {
    dealButton.disabled = false;
    betAllButton.disabled = true;
    betOneButton.disabled = true;
    flipCard();
  });
};

const flipCard = () => {
  const flipTheCard = document.getElementsByClassName("inner-card");
  for (let i = 0; i < flipTheCard.length; i += 1) {
    flipTheCard.item(i).classList.toggle("front-card");
  }
  calcHandScore(playerCardHand);
  console.log(cardNameTally);
  return outputMessage;
  /* 
  outputMessage.innerHTML = `Click on the card to hold.<br>Click on deal when done holding.`; */
};

// Removes an element from the document.
const removeElement = (elementId) => {
  let element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
};

// hold button will be on every card
// hold button will be put on every card
// when user clicks card, message will show on top of the card to show that it is being held
// if clicked, cardHeld = true
// if cardHeld = false, clicking DEAL will replace those unheld cards.
const holdButton = document.createElement("div");
holdButton.id = "hold-button";
/* holdButton.innerHTML = "HOLD"; */

// Inputting username and then amount to wager
const startOfGame = () => {
  gameMessage.id = "game-message";
  gameMessage.innerHTML = " Y O U &nbsp R E A D Y ?";
  document.body.appendChild(gameMessage);

  // indicate ready to begin
  readyButton.id = "ready-button";
  readyButton.innerHTML = "R E A D Y";
  document.body.appendChild(readyButton);
  readyButton.addEventListener("click", initGame);
  removeElement("table");
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

const makeDeck = (cardAmount) => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ["❤", "♦", "♣", "♠"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    /* console.log(`current suit: ${currentSuit}`); */

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }
      if (currentSuit === "❤" || currentSuit === "♦") {
        var color = "red";
      } else if (currentSuit === "♣" || currentSuit === "♠") {
        var color = "black";
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardColor: color,
      };

      // add the card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

const deck = shuffleCards(makeDeck());

const createCard = (cardInfo) => {
  const innerCard = document.createElement("div");
  innerCard.classList.add("inner-card");
  const suit = document.createElement("div");
  suit.classList.add("front-card", "suit", cardInfo.cardColor);
  suit.innerText = cardInfo.suit;
  const name = document.createElement("div");
  name.classList.add("front-card", "name");
  name.innerText = cardInfo.name;
  const backCard = document.createElement("div");
  backCard.classList.add("back-card");
  const card = document.createElement("div");
  card.id = "card";
  card.classList.add("card");
  innerCard.appendChild(name);
  innerCard.appendChild(suit);
  innerCard.appendChild(backCard);
  card.appendChild(innerCard);

  return card;
};

// calling 5 cards out onto container
const playerClick = () => {
  document.body.appendChild(table);
  container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);
  for (i = 0; i < 5; i++) {
    playerCard = deck.pop();
    playerCardHand.push(playerCard); // for displaying sorted full display cards
    playerHandRank.push(playerCard.rank); // for comparing sorted cards rank
    let cardElement = createCard(playerCard);
    container.appendChild(cardElement);
  }

  document.body.appendChild(buttonContainer);
};

const initGame = () => {
  gameMessage.innerHTML = "";
  removeElement("ready-button");
  playerClick();
  buttonFunctions();
};

startOfGame();

const calcHandScore = (hand) => {
  for (let i = 0; i < hand.length; i++) {
    var cardName = hand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  for (let [key, value] of Object.entries(cardNameTally)) {
    console.log(key === "J" && value >= 1);
    if (value === 2) {
      outputMessage.innerHTML = "You have Two Pairs.";
    } else if (key === "J" && value >= 1) {
      outputMessage.innerHTML = "You have Jacks.";
    } else {
      outputMessage.innerHTML = "You have no special combinations.";
    }
    return outputMessage;
  }
};

/* const generateTable = () => {
  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  // creating all cells
  for (var i = 0; i < 10; i++) {
    // creates a table row
    var row = document.createElement("tr");

    for (var j = 0; j < 6; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      var cell = document.createElement("td");
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  document.body.appendChild(tbl);
  tbl.setAttribute("border", 2);
}; */
