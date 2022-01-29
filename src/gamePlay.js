// enter bet amount and capture the bet values to be deducted against the money available
betField.addEventListener("keydown", (e) => {
  if (
    Number(betField.value) > money ||
    money === 0 ||
    Number(betField.value) <= 0
  )
    return;

  if (e.key === "Enter") {
    betAmount = Number(betField.value);
    betField.value = "";
    money -= betAmount;
    moneyField.innerText = `Xmas pot \n\ ${money}`;
    gameInfo.innerText = `You bet ${betAmount} \n\ Click Deal`;

    // show the draw and deal buttons + hide the bet field as they are not applicable
    buttonWrapper.classList.add("visible");
    betField.classList.remove("visible");
    dealButton.disabled = false;
  } else return null;
});

// handle selections of cards to replace
function handleSelection(event) {
  if (gameMode !== "draw") return;

  if (event.currentTarget.classList[2] === "selected") {
    console.log("this happens");
    event.currentTarget.classList.remove("selected");
  } else event.currentTarget.classList.add("selected");
  console.log(event.currentTarget.classList[1]);
}
// get all the square elements and handle the selections
const squares = document.querySelectorAll(".square");
squares.forEach((item) => {
  item.addEventListener("click", handleSelection);
});

// deal button onclick will draw 5 cards from deck
dealButton.addEventListener("click", function () {
  //flag to check if the game mode is correct
  //flag to check if there are enough cards on deck to deal  
  if (gameMode !== "deal" || deck.length < 5) return;

  hand = [];
  for (let i = 0; i < 5; i++) {
    hand.push(deck.pop());
    squares[i].classList.add(i);
    squares[i].innerHTML = `<img src ="${hand[i].cardFront}"/>`;
    
  }
  gameMode = "draw";
  drawButton.disabled = false;
  dealButton.disabled = true;
  deckInfo.innerText = `Deck: ${deck.length}`;
  gameInfo.innerHTML = `Choose cards to replace \n\ click Draw`;
});

//draw button onclick will exchange the selected cards with cards from the deck
drawButton.addEventListener("click", function () {
  //get all selected cards
  let indexOfSelectedCards = [];
  const selected = document.querySelectorAll(".selected");
  console.log(selected);

  //flag to check if the game mode is correct
  //flag to check if there are enough cards on deck to exchange the selected cards
  if (gameMode !== "draw" || deck.length < selected.length) return;

  for (let j = 0; j < selected.length; j++) {
    let cardIndex = Number(selected[j].classList[1]);
    indexOfSelectedCards.push(cardIndex);
    console.log(indexOfSelectedCards);
    selected[j].classList.remove("selected");
  }

  //replace all selected cards
  for (let value of indexOfSelectedCards) {
    hand[value] = deck.pop();
    squares[value].innerHTML = `<img src ="${hand[value].cardFront}"/>`;
  }
  deckInfo.innerText = `Deck: ${deck.length}`;
  //count tally and multiplier
  suitTally(hand);
  nameTally(hand);
  getMultiplier(cardNameTally, cardSuitTally, hand);

  //add or substract the money based on the winning case
  money += multiplier * betAmount;

  //end the game if user ran out of money or deck
  if (money === 0 || deck.length < 5) {
    gameInfo.innerHTML = `Game over`;
    overlay.classList.add("visible");
    overlay.innerHTML = `Game over\n\
    Your Xmas pot \n\ 🪴${money}🪴\n\
    Remaining cards: ${deck.length}`;
    overlay.appendChild(replayButton);
  } else {
    gameInfo.innerHTML = `${winningHand}\n\
  Your bet multiplier is ${multiplier}`;
  }
  gameMode = "deal";

  //reset states for each round
  setTimeout(function () {
    squares.forEach((item) => {
      item.innerHTML = `<img src ="./public/snowman.png"/>`;
    });
  buttonWrapper.classList.remove("visible");
  betField.classList.add("visible");
  gameInfo.innerHTML = `Let's continue !\n\ Please enter bet amount`
  }, 3000);
  moneyField.innerText = `🪴 Xmas pot 🪴 \n\ ${money}`;
  drawButton.disabled = true;
});

//replay event listener to refresh the browser and this will only be available when the game is over
replayButton.addEventListener("click", function () {
  location.reload();
});
