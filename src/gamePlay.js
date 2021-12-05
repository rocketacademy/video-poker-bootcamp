// enter bet amount
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
    moneyField.innerText = `You have \n\ ${money}`;
    gameInfo.innerText = `You bet ${betAmount} \n\ Click Deal`;
    buttonWrapper.classList.add("visible");
    betField.classList.remove("visible");
  } else return null;
});

// handle selections
function handleSelection(event) {
  if (gameMode !== "draw") return;

  if (event.currentTarget.classList[2] === "selected") {
    console.log("this happens");
    event.currentTarget.classList.remove("selected");
  } else event.currentTarget.classList.add("selected");
  console.log(event.currentTarget.classList[1]);
}

const squares = document.querySelectorAll(".square");
squares.forEach((item) => {
  item.addEventListener("click", handleSelection);
});

dealButton.addEventListener("click", function () {
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
  gameInfo.innerHTML = `Choose cards to replace \n\ click Draw`;
});

drawButton.addEventListener("click", function () {
  //get all selected cards
  let indexOfSelectedCards = [];
  const selected = document.querySelectorAll(".selected");
  console.log(selected);

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

  //count tally and score
  suitTally(hand);
  nameTally(hand);
  getMultiplier(cardNameTally, cardSuitTally, hand);

  money += multiplier * betAmount;

  if (money === 0 || deck.length < 5) {
    gameInfo.innerHTML = `Game over`;
    overlay.classList.add("visible");
    overlay.innerHTML = `Game over\n\
    You have ${money}\n\
    Remaining cards: ${deck.length}`;
    overlay.appendChild(replayButton);
  } else {
    gameInfo.innerHTML = `${winningHand}\n\
  Your bet multiplier is ${multiplier}`;
  }
  gameMode = "deal";

  //reset state for each round
  setTimeout(function () {
    squares.forEach((item) => {
      item.innerHTML = `<img src ="../assets/abstract_clouds.svg"/>`;
    });
  }, 3000);
  moneyField.innerText = `You have \n\ ${money}`;
  buttonWrapper.classList.remove("visible");
  betField.classList.add("visible");
  drawButton.disabled = true;
  dealButton.disabled = false;
});

//replay event listener to refresh the browser
replayButton.addEventListener("click", function () {
  location.reload();
});
