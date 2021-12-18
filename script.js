// GLOBAL VARIABLES //
let twoPairs = false;
let threeKinds = false;
let straight = false;
let flush = false;
let fullHouse = false;
let fourKinds = false;
let straightFlush = false;
let royalFlush = false;
let jackOrBetter = false;
let userPoints = 0;
let moneyInHand = 200;
let bettingMoney = 0;
let balanceAmount = 0;
let container;
let playerCardHand = [];
let playerHandRank = [];
let cardHeld = false;
let cardName;
let cardSuit;
let cardRank;
let card;

// GLOBAL VARIABLES FOR CARD TALLY //
let cardNameTally = {};
let cardSuitTally = {};
let cardRankInHand = [];

// GET A RANDOM INDEX RANGING FROM 0 (INCLUSIVE) TO MAX (EXCLUSIVE) //
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// CREATE A SHUFFLE AN ARRAY OF CARDS FUNCTION //
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

// GENERATE 52 CARDS //
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
        cardHeld: false,
      };

      // add the card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

// SHUFFLE ALL 52 CARDS //
const deck = shuffleCards(makeDeck());

// DOCUMENT OBJECT MODEL GLOBAL VARIABLES //
let readyButton = document.createElement("button");
let gameMessage = document.createElement("div");
let dealButton = document.createElement("button");
dealButton.setAttribute("id", "deal-button");
dealButton.innerHTML = "DEAL";
dealButton.disabled = true;
let outputMessage = document.createElement("div");
outputMessage.id = "output-message";
let table = document.getElementById("table");

// BET ONCE BUTTON //
let betOneButton = document.createElement("button");
betOneButton.innerHTML = "BET ONE";
betOneButton.setAttribute("id", "bet-one");

// BET ALL BUTTON //
let betAllButton = document.createElement("button");
betAllButton.innerHTML = "MAX BET";
betAllButton.setAttribute("id", "bet-all");

// FINAL DEAL BUTTON AFTER CHOOSING CARDS TO BE HELD //
let finalDealButton = document.createElement("button");
finalDealButton.setAttribute("id", "finaldeal-button");
finalDealButton.style.display = "none";

// CONTAINER FOR ALL BUTTONS //
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-cont");
buttonContainer.appendChild(betOneButton);
buttonContainer.appendChild(betAllButton);
buttonContainer.appendChild(dealButton);
buttonContainer.appendChild(finalDealButton);

const buttonFunctions = () => {
  document.body.appendChild(outputMessage);
  betAllButton.addEventListener("click", () => {
    dealButton.disabled = false;
    betAllButton.disabled = true;
    betOneButton.disabled = true;
    bettingMoney = 5;
    balanceAmount = moneyInHand - bettingMoney;
    dealButton.disabled = false;
    betAllButton.disabled = true;
    betOneButton.disabled = true;
    outputMessage.innerHTML = `Money in hand: $${balanceAmount}<br><br> Betting: $${bettingMoney}`;
  });
  betOneButton.addEventListener("click", () => {
    dealButton.disabled = false;
    bettingMoney++;
    balanceAmount = moneyInHand - bettingMoney;

    if (bettingMoney === 5) {
      dealButton.disabled = false;
      betAllButton.disabled = true;
      betOneButton.disabled = true;
    }
    outputMessage.innerHTML = `Money in hand: $${balanceAmount} <br><br> Betting: $${bettingMoney}`;
  });

  dealButton.addEventListener("click", () => {
    finalDealButton.style.display = "";
    finalDealButton.innerHTML = "LOCK IT IN";
    removeElement("deal-button");
    removeElement("bet-one");
    removeElement("bet-all");
    flipCard();
  });

  finalDealButton.addEventListener("click", () => {
    removeElement("finaldeal-button");
    secondFlipCard();
  });
};

// CREATE CARD USING DOM //
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
  const holdButton = document.createElement("button");
  holdButton.id = "hold-button";
  holdButton.classList.add = "hold-button";
  holdButton.innerHTML = "HOLD";
  card = document.createElement("div");
  card.id = "card";
  card.classList.add("card");
  innerCard.appendChild(holdButton);
  innerCard.appendChild(name);
  innerCard.appendChild(suit);
  innerCard.appendChild(backCard);
  card.appendChild(innerCard);
  return card;
};

// Removes an element from the document.
const removeElement = (elementId) => {
  let element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
};

// Inputting amount to wager
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
const initGame = () => {
  gameMessage.innerHTML = "";
  removeElement("ready-button");
  playerClick();
  buttonFunctions();
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

/*
 * A function that flips the cards when deal button is pressed for the first time
 * @param cardNameTally set to empty to give a fresh start
 * @param cardSuitTally set to empty to give a fresh start
 * @param cardRankInHand set to empty to give a fresh start
 * @return the flipped card of the front side with the card elements on it
 */

const flipCard = () => {
  /*   // tally variables set to empty
  cardNameTally = {};
  cardSuitTally = {};
  cardRankInHand = []; */
  const flipTheCard = document.getElementsByClassName("inner-card");
  for (let i = 0; i < flipTheCard.length; i += 1) {
    flipTheCard.item(i).classList.toggle("front-card");
  }
};

/*
 * A function that flips the cards when deal button is pressed for the second time
 * after the player has chosen which card wants to be held or changed
 * @param cardNameTally set to empty to give a fresh start
 * @param cardSuitTally set to empty to give a fresh start
 * @param cardRankInHand set to empty to give a fresh start
 * @return the flipped card of the front side with the card elements on it
 */
const secondFlipCard = () => {
  // tally variables set to empty
  cardNameTally = {};
  cardSuitTally = {};
  cardRankInHand = [];
  const flipTheCard = document.getElementsByClassName("inner-card");
  for (let i = 0; i < flipTheCard.length; i += 1) {
    flipTheCard.item(i).classList.toggle("front-card");
  }
  cardTally(playerCardHand);
  winningCombos();
  return outputMessage;
};

const cardTally = (card) => {
  // for loop to get tally for nameTally and suitTally
  for (let i = 0; i < card.length; i++) {
    cardName = card[i].name;
    cardSuit = card[i].suit;
    cardRank = card[i].rank;

    // Tally for card suit
    // If we have seen the card suit before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card suit to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
    // Tally for card name
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
    cardRankInHand.push(cardRank);
  }
};
/*
 * A function that goes through cardRankInHand and sorts them
 * @return true/false if hand has two pairs in it
 */
const twoPairsCombo = () => {
  let pairs = [];
  let sortedDeck = cardRankInHand.sort();
  for (i = 0; i < 5; i++) {
    if (sortedDeck[i] === sortedDeck[i + 1]) {
      pairs.push(sortedDeck[i]);
    }
  }
  if (pairs.length === 2) {
    twoPairs = true;
  }
};
/*
 * A function that goes through cardNameTally to see if there are any three of the same card name and full house combos
 * @return true/false if hand has threes or full houses
 */
const threeKindsAndFullHouseCombo = () => {
  let duplicates = [];
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 3) {
      duplicates.push(cardName);
    }
    if (cardNameTally[cardName] === 2) {
      duplicates.push(cardName);
    }
    if (
      (duplicates[0] === 3 && duplicates[1] !== 2) ||
      (duplicates[1] === 3 && duplicates[0] !== 2)
    ) {
      threeKinds = true;
    }
    if (
      (duplicates[0] === 3 && duplicates[1] === 2) ||
      (duplicates[1] === 3 && duplicates[0] === 2)
    ) {
      fullHouse = true;
    }
  }
};
/*
 * A function that goes through cardNameTally to see if there are four of the same card name
 * @return true/false if hand has four of a kind in it
 */
const fourKindsCombo = () => {
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 4) {
      fourKinds = true;
    }
  }
};
/*
 * A function that goes through cardSuitTally and cardRankInHand
 *  and sorts them. This is to see if there are card ranks that
 * are in proper numerical order of difference 1 OR if they have
 *  the same suit OR both.
 * @return true/false if hand has said combos or not.
 */
const straightStraightFlushAndRoyalFlushCombo = () => {
  let count = 0;
  let sortedDeck = cardRankInHand.sort();
  console.log(sortedDeck);
  for (j = 0; j < 5; j++) {
    if (sortedDeck[j] + 1 === sortedDeck[j + 1]) {
      count += 1;
      if (count === 5) {
        straight = true;
      }
    }
  }
  for (cardSuit in cardSuitTally) {
    if (cardSuitTally[cardSuit] === 5) {
      flush = true;
    }
    if (count === 5 && flush === true) {
      straightFlush = true;
    }
  }
  for (cardName in cardNameTally) {
    if (
      cardName == "A" &&
      cardName == "10" &&
      cardName == "J" &&
      cardName == "Q" &&
      cardName == "K" &&
      flush == true
    ) {
      royalFlush = true;
    }
  }
};
/*
 * A function that goes through all different combo functions to
 * see if hand has at least Jack or better in it
 * @return true/false if hand has Jack or better in it
 */
const jackOrBetterCombo = () => {
  for (cardName in cardNameTally) {
    if (
      cardName === "J" &&
      cardName === "Q" &&
      cardName === "K" &&
      cardName === "A" &&
      cardNameTally[cardName] >= 1
    ) {
      jackOrBetter = true;
      outputMessage.innerHTML = "You have Jacks or Better.";
    }
  }
};

/*
 * A function that goes through all different combo functions to
 * see if hand has any of it
 * @return an output message of what combination you have in hand
 */
const winningCombos = () => {
  twoPairsCombo();
  threeKindsAndFullHouseCombo();
  fourKindsCombo();
  straightStraightFlushAndRoyalFlushCombo();
  jackOrBetterCombo();
  if (twoPairs === true) {
    outputMessage.innerHTML = "You have a Two Pairs.";
  } else if (threeKinds === true) {
    outputMessage.innerHTML = "You have Three of a kind.";
  } else if (fullHouse === true) {
    outputMessage.innerHTML = "You have a Full House.";
  } else if (fourKinds === true) {
    outputMessage.innerHTML = "You have Four of a kind.";
  } else if (straight === true) {
    outputMessage.innerHTML = "You have a Straight.";
  } else if (flush === true) {
    outputMessage.innerHTML = "You have a Flush.";
  } else if (straightFlush === true) {
    outputMessage.innerHTML = "You have a Straight Flush.";
  } else if (royalFlush === true) {
    outputMessage.innerHTML = "You have a Royal Flush.";
  } else {
    outputMessage.innerHTML = "You have no special combinations.";
  }
};

startOfGame();

/* 
const cardClick = () => {
  let selectAllCards = document.getElementsByClassName("card");
  for (i = 0; i < selectAllCards.length; i++) {
    selectAllCards[i].appendChild(holdButton.cloneNode(true));
  }

  let allHoldButton = document.querySelectorAll("#hold-button");
  for (const btn of allHoldButton) {
    btn.addEventListener("click", () => {
      btn.style.backgroundColor = "white";
    });
  }
  for (j = 0; j < selectAllCards.length; j++) {
    for (const btnStyle of allHoldButton) {
      if (btnStyle.style.backgroundColor === "white") {
        return (cardHeld = true);
      }
    }
  }
}; */
