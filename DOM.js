let playerPoints = 100;
let betAmount = 0;
let checkSwapTurn = false;

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

const cardClick = (hand, cardElement, cardPosition) => {
  console.log(cardElement);
  console.log("PLAYER CLICKED CARD", hand[cardPosition]);
};

const buildCardElements = (hand) => {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add("card-container");

  for (let i = 0; i < hand.length; i++) {
    const card = createCard(hand[i]);
    card.addEventListener("click", (event) => {
      cardClick(hand, event.currentTarget, i);
    });

    cardContainer.appendChild(card);
  }

  document.body.appendChild(cardContainer);
};

initGame = () => {
  const pointsHeader = document.createElement("p");
  pointsHeader.classList.add("player-points");
  pointsHeader.innerHTML = `Player Points: ${playerPoints}`;
  document.body.appendChild(pointsHeader);

  buildCardElements(hand);
};

initGame();
