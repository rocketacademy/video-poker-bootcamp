/*
 * A function that returns a fixed number of points
 * @param cardInHand = [] to store all cards drawn
 * @param push cards drawn into cardInHand
 * @return number of points that the user scored for the cards in hand
 */

let cardInHand = [];
let userPoints = 0;
let moneyInHand = 500;
let bettingMoney = 0;
let balanceAmount = 0;
let container;
let playerCardHand = [];
let playerHandRank = [];
let readyButton = document.createElement("button");

function removeElement(elementId) {
  // Removes an element from the document.
  let element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
}

// buttons creation
// Need deal, hold, submit buttons
let dealButton = document.createElement("button");
dealButton.id = "deal-button";
dealButton.innerHTML = "DEAL";

let holdButton = document.createElement("button");
holdButton.id = "hold-button";
holdButton.innerHTML = "HOLD";

// Inputting username and then amount to wager
const startOfGame = () => {
  // DOM Elements
  // game instruction tells user what the game wants you to do
  let gameMessage = document.createElement("div");
  gameMessage.id = "game-message";
  gameMessage.innerHTML = " Y O U &nbsp R E A D Y ?";
  document.body.appendChild(gameMessage);

  readyButton.id = "ready-button";
  readyButton.innerHTML = "R E A D Y";
  document.body.appendChild(readyButton);
  readyButton.addEventListener("click", initGame);
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
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.cardColor);
  suit.innerText = cardInfo.suit;
  const name = document.createElement("div");
  name.classList.add("name");
  name.innerText = cardInfo.name;
  const card = document.createElement("div");
  card.classList.add("card");
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};

// create container to store all card elements inside
const containerCreation = () => {
  container = document.createElement("div");
  container.classList.add("container");
  document.body.appendChild(container);
};

// calling 5 cards out onto container
const playerClick = () => {
  for (i = 0; i < 5; i++) {
    playerCard = deck.pop();
    playerCardHand.push(playerCard); // for displaying sorted full display cards
    playerHandRank.push(playerCard.rank); // for comparing sorted cards rank
    let cardElement = createCard(playerCard);
    container.appendChild(cardElement);
  }
};

const initGame = () => {
  removeElement("ready-button");
  containerCreation();
  playerClick();
};

startOfGame();
/*  // form to take in input and submit button
  let form = document.createElement("div");
  form.id = "form";

  let input = document.createElement("input");
  input.id = "input";

  let submitButton = document.createElement("button");
  submitButton.id = "submit-button";
  submitButton.innerHTML = "SUBMIT";

  // append input and submit button into form
  form.appendChild(input);
  form.appendChild(submitButton);
  document.body.appendChild(form);
  submitButton.addEventListener("click", () => {
    if (input.value === "") {
      alert("Field cannot be empty.");
    }
    if (
      input.value !== "" &&
      mode === "default" &&
      isNaN(input.value) === true
    ) {
      gameMessage.innerHTML = `Hey ${input.value}! <br><br> Welcome to Video Poker. <br><br> Input amount you want to gamble on. <br><br> Your balance now is $${moneyInHand}. `;
      input.value = "";
      mode = "started";
    } else if (mode === "started") {
      bettingMoney = input.value;
      balanceAmount = moneyInHand - bettingMoney;
      gameMessage.innerHTML = `You have chosen to gamble with $${bettingMoney} of your money.<br><br> Your balance is now $${balanceAmount}.<br><br> You may begin.`;
      form.innerHTML = "";
    } else if (mode === "default" && isNaN(input.value) === false) {
      alert("Please enter a valid name.");
      input.value == "";
    }
  }); */
