let deck;
let playerPoints = 1000;
let bettedPoints = document.getElementById("points-betted");
let playerHand = [];
let canDraw = true;

const playerCardsDiv = document.getElementById("playerCardsDiv");
const gameInfoDiv = document.getElementById("game-info-div");
const gameInfoText = document.getElementById("gameInfo");
const scoreData = document.getElementById("scoreBox");
const bettingData = document.getElementById("bettingBox");

const dealButton = document.getElementById("dealButton");
dealButton.addEventListener("click", () => {
  gameInfoDiv.classList.remove("show");
  playerPoints -= 10;
  // console.log(`deal button has been clicked`);
  if (playerHand.length != 5) {
    drawCardIntoHand(5);
  } else if (canDraw == true) {
    removeMarkedCards(playerHand);
    replaceRemovedCards(playerHand);
  }
  refreshDisplay();
});

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", () => {
  // console.log(`draw button has been clicked`);
  if (playerHand.length != 0) {
    const winner = parseResults(playerHand);
    gameInfoDiv.classList.add("show");
    calcHandScore(winner);
    refreshDisplay();
    // something to disable the Deal and Play buttons
    dealButton.disabled = true;
    playButton.disabled = true;
  }
});

const continueButton = document.getElementById("continueButton");
continueButton.addEventListener("click", () => {
  // some function to remove every card from the hand or replace every element with ""
  for (i = 0; i < 5; i += 1) {
    playerHand[i] = "";
  }
  // redraw all cards
  replaceRemovedCards(playerHand);
  // refreshdisplay
  refreshDisplay();
  // hide game div
  gameInfoDiv.classList.remove("show");
  // re-enable game buttons
  dealButton.disabled = false;
  playButton.disabled = false;
});

/** @type {object} */
const cardScoreValueMap = {
  1: 1, // can be 1 or 11, defaults to 11 before user input
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 10,
  12: 10,
  13: 10,
};

/** @type {object} */
const cardNameMap = {
  1: "ace",
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: "jack",
  12: "queen",
  13: "king",
};

/** @type {object} */
const winTextMap = {
  null: "no winning combinations",
  royalFlush: "a Royal Flush",
  straightFlush: "a Straight Flush",
  flush: "a Flush",
  straight: "a Straight",
  fullHouse: "a Full House",
  fourOfAKind: "a Four of a Kind",
  threeOfAKind: "a Three of a Kind",
  twoPairs: "Two Pairs",
};

/**
 * generates a standard deck of 52 playing cards
 * @return {array} - 52 sequential card objects
 */
const makeDeck = function () {
  const cardDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  let suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];
    let rankCounter = 1;
    while (rankCounter <= 13) {
      const cardName = cardNameMap[rankCounter];
      const cardScoreValue = cardScoreValueMap[rankCounter];
      const image = `cardImages/fronts/${currentSuit}_${cardName}.svg`;

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        scoreValue: cardScoreValue,
        imagePath: image,
        toRemove: false,
      };
      cardDeck.push(card);
      rankCounter += 1;
    }
    suitIndex += 1;
  }
  return cardDeck;
};

/**
 * randomly reorder all elements in an array, based on Durstenfeld shuffle
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * @param {array} array - array
 * @return {array} - reordered array
 */
const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

/**
 * removes a number of cards from the deck and moves them into the player's hand
 * @param {number} numOfCards - number of cards to be drawn
 */
const drawCardIntoHand = function (numOfCards) {
  while (numOfCards > 0) {
    const drawnCard = deck.pop();
    playerHand.push(drawnCard);
    numOfCards -= 1;
  }
};

/**
 * marks the card, is called by the eventListener in createCardDiv.
 * @param {number} handArrIndex - index of the card to be removed from playerHand
 */
const markCardForRemoval = function (handArrIndex) {
  const clickedCardDiv = document.querySelector(`.card${handArrIndex}`);
  const clickedCardImage = document.querySelector(`.card${handArrIndex} img`);

  if (!clickedCardDiv.classList.contains("selected-card")) {
    // console.log(`Card ${handArrIndex} marked for removal.`);
    // console.log(clickedCardDiv);
    playerHand[handArrIndex].toRemove = true;
    clickedCardImage.src = `cardImages/backs/red2.svg`;
  } else {
    // console.log(`Card ${handArrIndex} is already selected. Deselecting...`);
    const currentSuit = playerHand[handArrIndex].suit;
    const cardName = playerHand[handArrIndex].name;
    playerHand[handArrIndex].toRemove = false;
    clickedCardImage.src = `cardImages/fronts/${currentSuit}_${cardName}.svg`;
  }

  clickedCardDiv.classList.toggle("selected-card");
};

/**
 * creates a div for for a card image to be displayed in.
 * contains a click eventListener.
 * @param {number} handArrIndex - index of the card to be inserted into the div
 * @return {*} - cardPositionContainer that is a div for a single card within the larger playerCardsDiv
 */
const createCardDiv = function (handArrIndex) {
  const cardPositionContainer = document.createElement("div");
  cardPositionContainer.id = `card${handArrIndex}`;
  cardPositionContainer.classList.add("card");
  cardPositionContainer.classList.add(`card${handArrIndex}`);

  cardPositionContainer.addEventListener("click", () => {
    // console.log(`card has been clicked: ${handArrIndex}`);
    markCardForRemoval(handArrIndex);
  });
  playerCardsDiv.appendChild(cardPositionContainer);
  return cardPositionContainer;
};

/**
 * adds an image according to the cardObj and the position the cardObj is in.
 * @param {object} cardObj - card from the playerHand array
 * @param {number} handPosition - position-specific container div as generated by the createCardDiv helper function
 */
const displayCard = function (cardObj, handPosition) {
  const cardImage = document.createElement("img");
  // cardImage.classList.add("card");
  cardImage.src = `${cardObj.imagePath}`;
  handPosition.appendChild(cardImage);
};

/**
 * takes a hand of cards and returns the number of points that the user scored for this handArray
 * by matching the type of combination to a score multiplier and changing the playerPoints and bettedPoints
 * global variables
 * @param {string} handType - the type of winning combination scored by the playerHand array, or null if no combination is found
 */
const calcHandScore = function (handType) {
  let bet = document.getElementById("points-betted");
  // console.log(bet);
  // console.log(bet.value);
  const earnings = betMultiplierMap[handType] * bet.value;
  playerPoints += earnings;
  gameInfoText.innerText = `Your hand contains ${winTextMap[handType]}.\nYou placed a bet of ${bet.value} points, and you have won ${earnings} points this round.\nYour total is currently ${playerPoints} points.\nYour deck has ${deck.length} cards remaining.`;
  bet.value = 10;
};

/**
 * takes a playerHand array, scans each card for the .toremove attribute
 * and replaces the element in the array if the card is marked for removal
 * @param {array} cardObjArr
 */
const removeMarkedCards = function (cardObjArr) {
  // console.log("removing cards...");
  for (let i = 0; i < cardObjArr.length; i += 1) {
    let card = cardObjArr[i];
    if (card.toRemove == true) {
      cardObjArr[i] = "";
      // console.log(`card ${i} removed`);
    }
  }
  // console.log("all cards removed.");
};

/**
 * scans the array for elements matching ""
 * and replaces the element with a new card drawn from the deck
 * @param {*} cardObjArr
 */
const replaceRemovedCards = function (cardObjArr) {
  for (let i = 0; i < cardObjArr.length; i += 1) {
    if (cardObjArr[i] == "") {
      cardObjArr[i] = deck.pop();
    }
  }
  dealButton.disabled = true;
};

/**
 * removes contents of the playerCardsDiv and replaces them with new cards
 * updates scoreData amd bettingData
 */
const refreshDisplay = function () {
  // need to remove original card divs
  playerCardsDiv.innerHTML = "";

  for (i = 0; i < playerHand.length; i += 1) {
    displayCard(playerHand[i], createCardDiv(i));
  }
  scoreData.innerText = playerPoints;
};

deck = shuffleArray(makeDeck());
