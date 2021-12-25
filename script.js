// GLOBAL VARIABLES //
//---FOR WINNING COMBOS---//
let twoPairs = false;
let threeKinds = false;
let straight = false;
let flush = false;
let fullHouse = false;
let fourKinds = false;
let straightFlush = false;
let royalFlush = false;
let jackOrBetter = false;
//---FOR BETTING---//
let moneyInHand = 200;
let bettingMoney = 0;
let balanceAmount = 0;
//---FOR CARDS---//
let container;
let playerCardHand = [];
let playerHandRank = [];
let cardName;
let cardSuit;
let cardRank;
let card;
let hold;
let holdArray = [];
let allCards = [];
//---FOR CARD TALLY---//
let cardNameTally = {};
let cardSuitTally = {};
let cardRankInHand = [];
//---FOR MODES---//
let mode = "firstRound";

//---DOCUMENT OBJECT MODEL---//
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
finalDealButton.innerHTML = "LOCK IT IN";
// CONTAINER FOR ALL BUTTONS //
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-cont");
buttonContainer.appendChild(betOneButton);
buttonContainer.appendChild(betAllButton);
buttonContainer.appendChild(dealButton);

//---SHUFFLING AND MAKING OF DECK---//
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
      };

      // add the card to the deck
      newDeck.push(card);
    }
  }
  return newDeck;
};

// SHUFFLE ALL 52 CARDS //
const deck = shuffleCards(makeDeck());

// FUNCTIONS FOR SOME OF THE BUTTONS CREATED //
const buttonFunctions = () => {
  // OUTPUT MESSAGE IS TO UPDATE THE AMOUNT THAT IS GAMBLE AND BALANCE IN HAND
  document.body.appendChild(outputMessage);
  betAllButton.addEventListener("click", () => {
    // DISABLING/ENABLING SOME OF THE OTHER BUTTONS WHEN BET ALL IS CLICKED. MAX TO BET IS $5 AT ONE GO
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
    // DISABLING/ENABLING SOME OF THE OTHER BUTTONS WHEN BET ALL IS CLICKED. MAX TO BET IS $5 AT ONE GO
    if (bettingMoney === 5) {
      dealButton.disabled = false;
      betAllButton.disabled = true;
      betOneButton.disabled = true;
    }
    outputMessage.innerHTML = `Money in hand: $${balanceAmount} <br><br> Betting: $${bettingMoney}`;
  });

  dealButton.addEventListener("click", () => {
    // ONCE DEAL IS CLICKED, FINAL DEAL BUTTON WILL COME ON TO DOUBLE CONFIRM THEIR HAND
    buttonContainer.appendChild(finalDealButton);
    // REMOVE ALL THE OTHER BUTTONS THAT ARE NOT NEEDED
    removeElement("deal-button");
    removeElement("bet-one");
    removeElement("bet-all");
    if (mode === "firstRound") {
      // FLIP TO SHOW FRONT OF CARD
      flipCard();
    } else {
      removeElement("container");
      allCards = [];
      playerClick();
      holdArray = [];
      flipCard();
      cardNameTally = {};
      cardSuitTally = {};
      cardRankInHand = [];
      console.log(deck);
    }
  });

  finalDealButton.addEventListener("click", () => {
    if (mode === "firstRound") {
      buttonContainer.appendChild(betOneButton);
      buttonContainer.appendChild(betAllButton);
      buttonContainer.appendChild(dealButton);
      dealButton.disabled = true;
      betAllButton.disabled = false;
      betOneButton.disabled = false;
      mode = "notFirstRound";
      // REMOVE FINAL DEAL BUTTON BECAUSE IT ISNT NEEDED
      removeElement("finaldeal-button");
      // CALL OUT THE FUNCTION FOR THE FINAL CARDS IN HAND TO BE ASSESSED
      secondFlipCard();
    } else {
      // REMOVE FINAL DEAL BUTTON BECAUSE IT ISNT NEEDED
      removeElement("finaldeal-button");
      twoPairs = false;
      threeKinds = false;
      straight = false;
      flush = false;
      fullHouse = false;
      fourKinds = false;
      straightFlush = false;
      royalFlush = false;
      jackOrBetter = false;
      buttonContainer.appendChild(betOneButton);
      buttonContainer.appendChild(betAllButton);
      buttonContainer.appendChild(dealButton);
      dealButton.disabled = true;
      betAllButton.disabled = false;
      betOneButton.disabled = false;
      secondFlipCard();
    }
  });
};

// CREATE CARD USING DOM //
const createCard = (cardInfo) => {
  const innerCard = document.createElement("div");
  innerCard.classList.add("inner-card");
  const suit = document.createElement("div");
  suit.setAttribute("id", "front-card-suit");
  suit.setAttribute("data-value", cardInfo.suit);
  suit.classList.add("front-card", "suit", cardInfo.cardColor);
  suit.innerText = cardInfo.suit;
  const name = document.createElement("div");
  name.classList.add("front-card", "name");
  name.setAttribute("id", "front-card-name");
  name.setAttribute("data-value", cardInfo.name);
  name.innerText = cardInfo.name;
  const backCard = document.createElement("div");
  backCard.classList.add("back-card");
  card = document.createElement("div");
  card.classList.add("free-card");
  /*  innerCard.appendChild(cardmode); */
  innerCard.appendChild(name);
  innerCard.appendChild(suit);
  innerCard.appendChild(backCard);
  card.appendChild(innerCard);
  return card;
};

// REMOVE ELEMENTS IN HTML USING ELEMENT IDS //
const removeElement = (elementId) => {
  let element = document.getElementById(elementId);
  element.parentNode.removeChild(element);
};

// REMOVE ELEMENTS IN HTML USING ELEMENT CLASS //
const removeElementByClass = (className) => {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
};

/* A function that tallies the cards by name,suit and rank.
 * @param cardSuitTally tallies cards by suit
 * @param cardNameTally tallies cards by name
 * @param cardRankInHand push card ranks into array
 * returns objects and arrays
 */
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

// SHOWN AT THE START OF THE GAME PAGE //
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

// AFTER READY BUTTON IS CLICKED, GAME INITILIAZED //
const initGame = () => {
  gameMessage.innerHTML = "";
  removeElement("ready-button");
  playerClick();
  buttonFunctions();
};

// CALLING OUT 5 CARDS INTO CONTAINER TO BE DISPLAYED FOR THE FIRST FLIP CARD //
const playerClick = () => {
  document.body.appendChild(table);
  container = document.createElement("div");
  container.setAttribute("id", "container");
  container.classList.add("container");
  document.body.appendChild(container);
  // setting for loop with 1 so that it will give the ID of #1 onwards for each card instead of #0
  for (i = 1; i < 6; i++) {
    playerCard = deck.pop();
    allCards.push(playerCard);
    // Displaying sorted full display cards
    playerCardHand.push(playerCard);
    // For comparing sorted cards rank later on
    playerHandRank.push(playerCard.rank);
    let cardElement = createCard(playerCard);
    cardElement.setAttribute("id", `card${i}`);
    container.appendChild(cardElement);
  }

  document.body.appendChild(buttonContainer);
};

/* A function that flips the cards when deal button is pressed for the first time
 * @param cardNameTally set to empty to give a fresh start
 * @param cardSuitTally set to empty to give a fresh start
 * @param cardRankInHand set to empty to give a fresh start
 * @return the flipped card of the front side with the card elements on it
 */
const flipCard = () => {
  const flipTheCard = document.getElementsByClassName("inner-card");
  for (let i = 0; i < flipTheCard.length; i += 1) {
    flipTheCard.item(i).classList.toggle("front-card");
  }
  cardClick();
};
const cardClick = () => {
  let cardChoice = document.querySelectorAll(".free-card");

  let nameCard;
  let suitCard;
  for (let i = 0; i < cardChoice.length; i++) {
    document.querySelector(`#card${i + 1}`).addEventListener("click", () => {
      let holdButton = document.createElement("div");
      holdButton.setAttribute("id", "hold");
      document.getElementById(`card${i + 1}`).appendChild(holdButton);
      let nameChoices = document.querySelectorAll("#front-card-name");
      let suitChoices = document.querySelectorAll("#front-card-suit");
      nameCard = nameChoices[i].getAttribute("data-value");
      suitCard = suitChoices[i].getAttribute("data-value");
      if (
        document.getElementById(`card${i + 1}`).classList.contains("held-card")
      ) {
        document.getElementById(`card${i + 1}`).classList.remove("held-card");
        document.getElementById(`card${i + 1}`).classList.toggle("free-card");
        let hold = document.getElementById("hold");
        if (hold.parentNode) {
          hold.parentNode.removeChild(hold);
        }
        // This is to remove the index from the hold array when unhold is clicked
        let index = holdArray.indexOf(allCards[i]);
        holdArray.splice(index, 1);
      } else {
        document.getElementById(`card${i + 1}`).classList.remove("free-card");
        document.getElementById(`card${i + 1}`).classList.toggle("held-card");
        holdButton.innerHTML = "HOLD";
        holdArray.push(allCards[i]);
      }
      console.log(holdArray);
    });
  }

  return holdArray;
};

/* A function that flips the cards when deal button is pressed for the second time
 * after the player has chosen which card wants to be held or changed
 * @param cardNameTally set to empty to give a fresh start
 * @param cardSuitTally set to empty to give a fresh start
 * @param cardRankInHand set to empty to give a fresh start
 * @return the flipped card of the front side with the card elements on it
 */
const secondFlipCard = () => {
  // compare original array to the one that is held
  // if original array and held array is the same, go straight to tally cards
  // remove the ones that are not held
  // insert new cards into those that are removed
  // show on the front of card
  // update on player hand and tally it
  const flipFreeCard = document.getElementsByClassName("free-card");

  for (let i = 0; i < allCards.length; i += 1) {
    if (holdArray.includes(allCards[i]) === false) {
      playerCard = deck.pop();
      allCards.splice(i, 1, playerCard);
    }
  }
  let newContainer = document.getElementsByClassName("container");
  newContainer[0].innerHTML = "";
  for (j = 0; j < allCards.length; j++) {
    let newCard = createCard(allCards[j]);
    newContainer[0].appendChild(newCard);
    let showCard = document.getElementsByClassName("inner-card");
    showCard.item(j).classList.add("front-card");
  }

  cardTally(allCards);

  winningCombos();
  return outputMessage;
};

/* A function that goes through cardRankInHand and sorts them
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
  if (pairs.length === 2 && pairs[0] !== pairs[1]) {
    return (twoPairs = true);
  }
};

/* A function that goes through cardNameTally to see if there are any three of the same card name and full house combos
 * @return true/false if hand has threes or full houses
 */
const threeKindsAndFullHouseCombo = () => {
  let duplicates = [];
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 3) {
      duplicates.push(cardNameTally[cardName]);
    }
    if (cardNameTally[cardName] === 2) {
      duplicates.push(cardNameTally[cardName]);
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

/* A function that goes through cardNameTally to see if there are four of the same card name
 * @return true/false if hand has four of a kind in it
 */
const fourKindsCombo = () => {
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 4) {
      fourKinds = true;
    }
  }
};

/* A function that goes through cardSuitTally and cardRankInHand
 *  and sorts them. This is to see if there are card ranks that
 * are in proper numerical order of difference 1 OR if they have
 *  the same suit OR both.
 * @return true/false if hand has said combos or not.
 */
const straightStraightFlushAndRoyalFlushCombo = () => {
  let count = 0;
  let sortedDeck = cardRankInHand.sort();

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

/* A function that goes through all different combo functions to
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

/* A function that goes through all different combo functions to
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
  bettingMoney = 0;
};

startOfGame();
