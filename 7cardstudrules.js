/* A function that draws 3 cards when deal button is pressed for the first time. This is only for the 7 Card Stud Game.
 * @param container is where all cards will be append to
 * @param allCards is an empty array and all cards that are drawn will be pushed into said array
 * return 2 face down cards and 1 face up card
 */
const playerClick7 = () => {
  document.body.appendChild(table);
  container = document.createElement("div");
  container.setAttribute("id", "container");
  container.classList.add("container");
  document.body.appendChild(container);
  // setting for loop with 1 so that it will give the ID of #1 onwards for each card instead of #0
  for (i = 1; i < 4; i++) {
    playerCard = deck.pop();
    allCards.push(playerCard);
    // Displaying sorted full display cards
    playerCardHand.push(playerCard);
    // For comparing sorted cards rank later on
    playerHandRank.push(playerCard.rank);
    let cardElement = createCard(playerCard);
    cardElement.setAttribute("id", `card${i}`);
    container.appendChild(cardElement);
    if (cardElement.getAttribute("id") === "card3") {
      flipCard7();
    }
  }

  document.body.appendChild(buttonContainer);
  document.body.appendChild(outputMessage);
};

/* A function that flips the 3rd cards onwards
 * @param flipTheCard that does not contain the front-card class in it, will be toggled to front-card
 * @return the flipped card of the front side with the card elements on it
 */
const flipCard7 = () => {
  const flipTheCard = document.getElementsByClassName("inner-card");

  for (let i = 2; i < flipTheCard.length; i += 1) {
    if (flipTheCard.item(i).classList.contains("front-card") === false) {
      flipTheCard.item(i).classList.toggle("front-card");
    }
  }
};
/*
 * A function that flips all the cards at the end of the round when user locks in their final hand
 *  @return all cards to the front side
 */
const finalFlip = () => {
  const flipTheCard = document.getElementsByClassName("inner-card");

  for (let i = 0; i < flipTheCard.length; i++) {
    if (flipTheCard.item(i).classList.contains("front-card") === false) {
      flipTheCard.item(i).classList.toggle("front-card");
    }
  }
};

/* A function that will ensure the 4th cards onwards will show the front side of the cards when deal button is pressed
 * @param container[0] is the element selected to append the new cards that area created
 * @return 4th,5th and 6th card face up
 */
const playerDeal7 = () => {
  container = document.getElementsByClassName("container");
  // setting for loop with 1 so that it will give the ID of #1 onwards for each card instead of #0
  for (i = dealCount; i < dealCount + 1; i++) {
    playerCard = deck.pop();
    allCards.push(playerCard);
    // Displaying sorted full display cards
    playerCardHand.push(playerCard);
    // For comparing sorted cards rank later on
    playerHandRank.push(playerCard.rank);
    let cardElement = createCard(playerCard);
    cardElement.setAttribute("id", `card${i}`);
    container[0].appendChild(cardElement);
    if (
      cardElement.getAttribute("id") === `card4` ||
      cardElement.getAttribute("id") === `card5` ||
      cardElement.getAttribute("id") === `card6`
    ) {
      flipCard7();
    }
  }
};

// FUNCTIONS FOR THE BUTTONS CREATED AND THIS IS SPECIALLY FOR 7 CARD STUD GAME
const buttonFunctions7 = () => {
  let tableCont = document.getElementById("table");
  let allRows = tableCont.querySelectorAll("tr");
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
    // If user has no money left, they have to restart the game
    if (balanceAmount <= 0) {
      removeElement("deal-button");
      removeElement("bet-one");
      removeElement("bet-all");
      removeElement("container");
      buttonContainer.appendChild(restartButton);
      outputMessage.innerHTML = `You've run out of money. <br><br> Please proceed to the nearest ATM to withdraw money and restart the game.`;
      // If user has left than $5 but wants to max bet, it will deduct whatever they have left
    } else if (balanceAmount < 5 && balanceAmount > 0) {
      clickCount = balanceAmount;
      bettingMoney = balanceAmount;
      tableHighlights(clickCount);
      outputMessage.innerHTML = `Money in hand: $${balanceAmount}<br><br> Betting: $${bettingMoney}`;
      // If user has more than $5, it will take a maximum of only $5
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
    // If user has no money left, they have to restart the game
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
    betAllButton.disabled = true;
    betOneButton.disabled = true;
    dealAudio.play();
    // firstRound is the mode for the game status when it first starts.
    if (mode === "firstRound") {
      // Clicking the deal button will draw its 4th card and so on.
      playerDeal7();
      // dealCount is introduced to ensure that it stops at 6th card(for face up cards)
      dealCount++;
      // dealCount more than 7 will disable the deal button to avoic players from drawing more cards
      if (dealCount > 7) {
        dealButton.disabled = true;
      }
      // User will be given a choice to lock in their cards in hand when they have 5 cards or more. They dont necessarily have to draw all 7 cards.
      if (dealCount >= 6) {
        // ONCE DEAL IS CLICKED, FINAL DEAL BUTTON WILL COME ON TO DOUBLE CONFIRM THEIR HAND
        buttonContainer.appendChild(finalDealButton);
      }
    }

    // for second round onwards, user needs to get a fresh deck of card starting with 2 face down cards and 1 face up card
    if (mode === "notFirstRound") {
      // dealCount above 7 will disable dealButton, this ensures on a new round, dealButton is enabled again
      dealButton.disabled = false;
      removeElement("container");
      // dealCount starts at 4 so that when playerDeal7() is eventually executed, it will setattribute correctly the card number starting with 4 onwards.
      dealCount = 4;
      // allCards need to be reset or else it will bring forward the cards from previous rounds.
      allCards = [];
      // To deal 3 cards to start the new round
      playerClick7();
      // reset all tallies to ensure fresh combinations
      cardNameTally = {};
      cardSuitTally = {};
      cardRankInHand = [];
      // new mode to run after the first 3 cards are drawn.
      mode = "timeToDeal";
    } else if (mode === "timeToDeal") {
      playerDeal7();
      dealCount++;
      if (dealCount > 7) {
        dealButton.disabled = true;
      }
      // User will be given a choice to lock in their cards in hand when they have 5 cards or more. They dont necessarily have to draw all 7 cards.
      if (dealCount >= 6) {
        // ONCE DEAL IS CLICKED, FINAL DEAL BUTTON WILL COME ON TO DOUBLE CONFIRM THEIR HAND
        buttonContainer.appendChild(finalDealButton);
      }
    }
  });

  finalDealButton.addEventListener("click", () => {
    // set timeout here to remove all highlights when final cards in hand are locked in
    setTimeout(() => {
      // selecting all rows in the table
      for (i = 0; i < allRows.length; i++) {
        // selecting all cells in the table
        let allColumns = allRows[i].querySelectorAll("td");
        // going through all the cells to change each one back to its original color
        for (j = 0; j < allColumns.length; j++) {
          allColumns[j].style.backgroundColor = "";
        }
      }
    }, 1500);

    buttonContainer.appendChild(betOneButton);
    buttonContainer.appendChild(betAllButton);
    buttonContainer.appendChild(dealButton);
    dealButton.disabled = true;
    betAllButton.disabled = false;
    betOneButton.disabled = false;
    // REMOVE FINAL DEAL BUTTON BECAUSE IT ISNT NEEDED
    removeElement("finaldeal-button");

    // CALL OUT THE FUNCTION FOR THE FINAL CARDS IN HAND TO BE ASSESSED
    finalFlip();
    clickCount = 0;
    cardTally(allCards);
    winningCombos();
    mode = "notFirstRound";
    dealCount = 4;
  });
  restartButton.addEventListener("click", () => {
    location.reload();
  });
};
