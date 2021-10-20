
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
  }
};

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

displayBet = () => {
  chosenBetDisplay.innerText = `${chosenBet}`;
};

/** Get the first key of an object that corresponds to a given value */
const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === parseInt(value));
};

/** Check that arrays are equal */
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

/** Show red highlight on winning combo row */
const toggleRedHighlight = (i) => {
  console.log("show red highlight");
  document.getElementsByClassName("highlight-red")[i].style.visibility =
    "visible";
};

/** Play audio where i=name of audio */
const play = (i) => {
  document.getElementById(i).play();
};
