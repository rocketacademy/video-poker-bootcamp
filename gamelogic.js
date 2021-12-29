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
    for (let rankCounter = 1; rankCounter <= 13; rankCounter++) {
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
let deck = shuffleCards(makeDeck());

/* A function that highlights the table according to the amount of bet put in
 * @param clickCount is the amount of bet put in
 * @param tableCont is a dom for the table
 * returns grey background color
 */
const tableHighlights = (clickCount) => {
  for (i = 0; i < tableCont.rows.length; i++) {
    tableCont.rows[i].cells[clickCount].style.backgroundColor = "grey";

    if (
      tableCont.rows[i].cells[clickCount - 1].style.backgroundColor === "grey"
    ) {
      tableCont.rows[i].cells[clickCount - 1].style.backgroundColor = "";
    }
  }
};
const removeHighlights = () => {
  let highlighed = tableCont.querySelectorAll("td");
  console.log(highlighted);
};

// FUNCTIONS FOR SOME OF THE BUTTONS CREATED //
const buttonFunctions = () => {
  let tableCont = document.getElementById("table");
  let allRows = tableCont.querySelectorAll("tr");

  console.log(allRows);
  let coinsPouringAudio = new Audio();
  coinsPouringAudio.src = "coins-pouring.mp3";
  let coinAudio = new Audio();
  coinAudio.src = "coin.ogg";
  let dealAudio = new Audio();
  dealAudio.src = "shuffle.wav";
  // OUTPUT MESSAGE IS TO UPDATE THE AMOUNT THAT IS GAMBLE AND BALANCE IN HAND
  document.body.appendChild(outputMessage);
  betAllButton.addEventListener("click", () => {
    coinsPouringAudio.play();
    if (balanceAmount <= 0) {
      removeElement("deal-button");
      removeElement("bet-one");
      removeElement("bet-all");
      removeElement("container");
      buttonContainer.appendChild(restartButton);
      outputMessage.innerHTML = `You've run out of money. <br><br> Please proceed to the nearest ATM to withdraw money and restart the game.`;
    } else if (balanceAmount < 5 && balanceAmount > 0) {
      clickCount = balanceAmount;
      bettingMoney = balanceAmount;
      tableHighlights(clickCount);
      outputMessage.innerHTML = `Money in hand: $${balanceAmount}<br><br> Betting: $${bettingMoney}`;
    } else if (balanceAmount >= 5) {
      clickCount = 5;
      bettingMoney = 5;
      tableHighlights(clickCount);
      outputMessage.innerHTML = `Money in hand: $${balanceAmount}<br><br> Betting: $${bettingMoney}`;
    }
    // DISABLING/ENABLING SOME OF THE OTHER BUTTONS WHEN BET ALL IS CLICKED. MAX TO BET IS $5 AT ONE GO
    balanceAmount -= bettingMoney;
    dealButton.disabled = false;
    betAllButton.disabled = true;
    betOneButton.disabled = true;
  });
  betOneButton.addEventListener("click", () => {
    clickCount++;
    coinAudio.play();
    dealButton.disabled = false;
    bettingMoney++;
    balanceAmount -= 1;
    tableHighlights(clickCount);

    if (balanceAmount < 0) {
      removeElement("deal-button");
      removeElement("bet-one");
      removeElement("bet-all");
      removeElement("container");
      buttonContainer.appendChild(restartButton);
      outputMessage.innerHTML = `You've run out of money. <br><br> Please proceed to the nearest ATM to withdraw money and restart the game.`;
    }
    // DISABLING/ENABLING SOME OF THE OTHER BUTTONS WHEN BET ALL IS CLICKED. MAX TO BET IS $5 AT ONE GO
    else if (bettingMoney === 5) {
      dealButton.disabled = false;
      betAllButton.disabled = true;
      betOneButton.disabled = true;
      outputMessage.innerHTML = `Money in hand: $${balanceAmount} <br><br> Betting: $${bettingMoney}`;
    } else {
      outputMessage.innerHTML = `Money in hand: $${balanceAmount} <br><br> Betting: $${bettingMoney}`;
    }
  });

  dealButton.addEventListener("click", () => {
    dealAudio.play();
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
    }
  });

  finalDealButton.addEventListener("click", () => {
    // set timeout here to remove all highlights when final cards in hand are locked in
    setTimeout(() => {
      // selecting all rows in the table
      for (i = 0; i < allRows.length; i++) {
        // selecting all cells in the table
        let allColumns = allRows[i].querySelectorAll("td");
        console.log(allColumns);
        // going through all the cells to change each one back to its original color
        for (j = 0; j < allColumns.length; j++) {
          allColumns[j].style.backgroundColor = "";
        }
      }
    }, 3000);

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
      buttonContainer.appendChild(betOneButton);
      buttonContainer.appendChild(betAllButton);
      buttonContainer.appendChild(dealButton);
      dealButton.disabled = true;
      betAllButton.disabled = false;
      betOneButton.disabled = false;
      secondFlipCard();
    }
    clickCount = 0;
  });
  restartButton.addEventListener("click", () => {
    location.reload();
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
  let introAudio = new Audio();
  introAudio.src = "intro.wav";
  introAudio.play();
  gameMessage.innerHTML = "";
  // This will prompt user how much they want to start the game with
  balanceAmount = Number(
    window.prompt(
      "How much money do you want to start with?",
      "Enter amount here"
    )
  );
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
  document.body.appendChild(outputMessage);
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
      holdButton.setAttribute("id", `hold${i + 1}`);
      holdButton.innerHTML = "Hold";
      let nameChoices = document.querySelectorAll("#front-card-name");
      let suitChoices = document.querySelectorAll("#front-card-suit");
      nameCard = nameChoices[i].getAttribute("data-value");
      suitCard = suitChoices[i].getAttribute("data-value");
      if (
        document.getElementById(`card${i + 1}`).classList.contains("held-card")
      ) {
        document.getElementById(`card${i + 1}`).classList.remove("held-card");
        document.getElementById(`card${i + 1}`).classList.toggle("free-card");
        let hold = document.getElementById(`hold${i + 1}`);
        document.getElementById(`card${i + 1}`).removeChild(hold);

        // This is to remove the index from the hold array when unhold is clicked
        let index = holdArray.indexOf(allCards[i]);
        holdArray.splice(index, 1);
      } else {
        document.getElementById(`card${i + 1}`).classList.remove("free-card");
        document.getElementById(`card${i + 1}`).classList.toggle("held-card");
        document.getElementById(`card${i + 1}`).appendChild(holdButton);
        holdArray.push(allCards[i]);
      }
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

startOfGame();
