let playerPoints = 100;
let betAmount = 0;
let dealCardsTurn = true;
let swapTurn = false;
const cardChangePosition = [];

const createCard = (cardInfo) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const name = document.createElement("div");
  name.classList.add("name", cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const cardDetailsTop = document.createElement("div");
  cardDetailsTop.classList.add("card-details-top");
  cardDetailsTop.appendChild(name);
  cardDetailsTop.appendChild(suit);

  const cardDetailsBottom = cardDetailsTop.cloneNode(true);
  cardDetailsBottom.classList.add("card-details-bottom");

  card.appendChild(cardDetailsTop);
  card.appendChild(cardDetailsBottom);

  return card;
};

const buildCardElements = (hand) => {
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = "";
  // cardContainer.classList.add("card-container");

  for (let i = 0; i < hand.length; i++) {
    const card = createCard(hand[i]);
    card.addEventListener("click", (event) => {
      cardClick(hand, event.currentTarget, i);
    });

    cardContainer.appendChild(card);
  }

  // document.body.appendChild(cardContainer);
};

const replaceCardElements = (hand) => {
  const originalCardContainer = document.querySelector(".card-container");
  originalCardContainer.innerHTML = "";

  const newCardContainer = document.createElement("div");
  newCardContainer.classList.add("card-container");

  for (let i = 0; i < hand.length; i++) {
    const card = createCard(hand[i]);
    card.addEventListener("click", (event) => {
      cardClick(hand, event.currentTarget, i);
    });

    newCardContainer.appendChild(card);
  }

  originalCardContainer.innerHTML = newCardContainer.innerHTML;
};

const cardClick = (hand, cardElement, cardPosition) => {
  console.log("PLAYER CLICKED CARD", hand[cardPosition]);

  if (swapTurn) {
    const arrayPosition = cardChangePosition.indexOf(cardPosition);

    if (arrayPosition === -1) {
      cardChangePosition.push(cardPosition);
      cardElement.classList.add("clicked-card");
      console.log(cardChangePosition);
      return;
    } else {
      cardChangePosition.splice(arrayPosition, 1);
      cardElement.classList.remove("clicked-card");
      console.log(cardChangePosition);
      return;
    }
  }
};

const dealButtonClick = () => {
  console.log("DEAL BUTTON CLICKED");

  const currentPoints = document.querySelector(".player-points");
  const feedback = document.querySelector(".feedback-message");
  const input = document.querySelector(".bet-input");

  if (dealCardsTurn) {
    betAmount = Number(input.value);
    input.value = "";
    console.log(betAmount);

    if (betAmount <= 0) {
      feedback.classList.add("opaque");
      feedback.innerText = "Please input a valid bet amount";

      currentPoints.innerHTML = `Player Points: ${playerPoints}<br>Bet Amount: 0`;
      return;
    } else if (betAmount > playerPoints) {
      feedback.classList.add("opaque");
      feedback.innerText = "Insufficient points balance";

      currentPoints.innerHTML = `Player Points: ${playerPoints}<br>Bet Amount: 0`;
      return;
    }
    feedback.classList.remove("opaque");
    playerPoints -= betAmount;
    currentPoints.innerHTML = `Player Points: ${playerPoints}<br>Bet Amount: ${betAmount}`;

    // Create shuffled deck
    deck = shuffleCards(makeDeck());

    // Create hand array of 5 cards
    hand = [];
    for (let i = 0; i < 5; i += 1) {
      hand.push(deck.pop());
    }

    buildCardElements(hand);

    dealCardsTurn = false;
    swapTurn = true;
    input.disabled = true;
    return;
  } else if (swapTurn) {
    for (let i = 0; i < cardChangePosition.length; i++) {
      hand[cardChangePosition[i]] = deck.pop();
    }

    replaceCardElements(hand);

    const handFeedbackArray = calcHandScore(hand, betAmount);
    const handFeedback = handFeedbackArray[0];
    const winnings = handFeedbackArray[1];

    feedback.innerText = `${handFeedback}`;
    feedback.classList.add("opaque");

    if (winnings != 0) {
      playerPoints = playerPoints + winnings + betAmount;
      currentPoints.innerHTML = `Player Points: ${playerPoints}<br>Bet Amount: 0`;
    }

    // Reset array
    cardChangePosition.splice(0, cardChangePosition.length);

    dealCardsTurn = true;
    swapTurn = false;
    input.disabled = false;
    return;
  }
};

const resetButtonClick = () => {
  console.log("RESET BUTTON CLICKED");

  if (dealCardsTurn) {
    console.log("RESET WORKED");
    playerPoints = 100;

    const currentPoints = document.querySelector(".player-points");
    const feedback = document.querySelector(".feedback-message");

    feedback.classList.add("opaque");
    feedback.innerText = "Player points has been reset";

    currentPoints.innerHTML = `Player Points: ${playerPoints}<br>Bet Amount: 0`;
  } else {
    return;
  }
};

const buildPointsTracker = () => {
  const pointsHeader = document.createElement("p");
  pointsHeader.classList.add("player-points");
  pointsHeader.innerHTML = `Player Points: ${playerPoints}<br>Bet Amount: 0`;

  document.body.appendChild(pointsHeader);
};

const buildPlayerInterface = () => {
  const playerResponseGroup = document.createElement("div");
  playerResponseGroup.classList.add("response-container");

  const betInput = document.createElement("input");
  betInput.setAttribute("type", "number");
  betInput.setAttribute("placeholder", "Input your bet here");
  betInput.classList.add("bet-input");
  playerResponseGroup.appendChild(betInput);

  const dealButton = document.createElement("button");
  dealButton.classList.add("deal-button");
  dealButton.innerText = "Deal";
  dealButton.addEventListener("click", dealButtonClick);
  playerResponseGroup.appendChild(dealButton);

  const resetButton = document.createElement("button");
  resetButton.classList.add("reset-button");
  resetButton.innerText = "Reset";
  resetButton.addEventListener("click", resetButtonClick);
  playerResponseGroup.appendChild(resetButton);

  document.body.appendChild(playerResponseGroup);
};

const buildFeedbackMessage = () => {
  const feedbackMessage = document.createElement("p");
  feedbackMessage.classList.add("feedback-message");
  feedbackMessage.innerHTML = `Placeholder`;

  document.body.appendChild(feedbackMessage);
};

initGame = () => {
  buildPointsTracker();
  buildPlayerInterface();
  buildFeedbackMessage();

  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
};

initGame();
