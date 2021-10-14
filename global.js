/* eslint-disable prefer-const */
// eslint-disable-next-line prefer-const

// for global variables and helper functions
let points = 10;
let score;
let playerCard;
let bet;
let cardElement;
let playerArr = [];
// Create card details as tally
let cardRankTally = {};
let cardSuitTally = {};

let createBlankCards = () => {
  for (let i = 0; i < 5; i += 1) {
    let card = document.createElement('img');
    card.classList.add('card');
    card.src = 'images/pokerBack.jpeg';
    cardContainer.appendChild(card);
  }
};

// eslint-disable-next-line prefer-const
// create highlight function to indicate card to be swap
const selectSwapCard1 = () => {
  document.querySelector('#card1').classList.toggle('selected');
  document.querySelector('#card1').classList.toggle('highlight');
};
const selectSwapCard2 = () => {
  document.querySelector('#card2').classList.toggle('selected');
  document.querySelector('#card2').classList.toggle('highlight');
};
const selectSwapCard3 = () => {
  document.querySelector('#card3').classList.toggle('selected');
  document.querySelector('#card3').classList.toggle('highlight');
};
const selectSwapCard4 = () => {
  document.querySelector('#card4').classList.toggle('selected');
  document.querySelector('#card4').classList.toggle('highlight');
};
const selectSwapCard5 = () => {
  document.querySelector('#card5').classList.toggle('selected');
  document.querySelector('#card5').classList.toggle('highlight');
};

let createRankTally = () => {
// Loop over playerArr
  for (let i = 0; i < playerArr.length; i += 1) {
  // eslint-disable-next-line prefer-destructuring
    const rank = playerArr[i].rank;
    // If we have seen the card rank before, increment its count
    if (rank in cardRankTally) {
      cardRankTally[rank] += 1;
    }
    // Else, initialise count of this card rank to 1
    else {
      cardRankTally[rank] = 1;
    }
  }
};

let createSuitTally = () => {
// Loop over playerArr
  for (let i = 0; i < playerArr.length; i += 1) {
  // eslint-disable-next-line prefer-destructuring
    const suit = playerArr[i].suit;
    // If we have seen the card suit before, increment its count
    if (suit in cardSuitTally) {
      cardSuitTally[suit] += 1;
    }
    // Else, initialise count of this card suit to 1
    else {
      cardSuitTally[suit] = 1;
    }
  }
};

const newRoundSetUp = () => {
  cardContainer.innerHTML = '';
  playerArr = [];
  cardRankTally = {};
  cardSuitTally = {};
  dealButton.disabled = true;
  bet = Number(betAmount.value);
  document.getElementById('betAmount').disabled = true;
  swapButton.disabled = false;
  gameMessage.innerText = 'Please choose the cards to swap!';
  for (let i = 1; i < 6; i += 1) {
    // Pop player's card metadata from the deck
    playerCard = deck.pop();
    playerArr.push(playerCard);
    // Create card element from card metadata
    cardElement = createCard(playerCard);
    cardElement.id = `card${i}`;
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
  }
};

const swapCardSetup = () => {
  swapButton.disabled = true;
  dealButton.disabled = false;
  document.getElementById('betAmount').disabled = false;
};

const processResults = () => {
  createRankTally();
  createSuitTally();
  console.log(cardRankTally);
  console.log(cardSuitTally);

  const pointsForHand = calcHandScore();
  points += pointsForHand;
  gameMessage.innerHTML = `Your points for this round is ${pointsForHand}!`;
  scoreBoard.innerHTML = `${points}`;
};

const output = (hand, payoutRate) => {
  const handMessage = document.createElement('div');
  handMessage.classList.add('handMessage', 'blink');
  handMessage.innerHTML = `${hand} <br> Payout Rate: ${payoutRate}`;
  cardContainer.appendChild(handMessage);
  pointsWon = bet * payoutRate;
  return pointsWon;
};

const zeroPointAlert = () => {
  if (points <= 0) {
    alert('You have no more points left! Refresh to reset your points!');
    dealButton.disabled = true; }
};

const swapCard = () => {
  // get cards selected to be swapped and swap it with new cards in player array
  const cardToBeSwapped = document.getElementsByClassName('selected');
  for (let i = 0; i < cardToBeSwapped.length; i += 1) {
    const cardDisplayName = cardToBeSwapped[i].firstChild.innerText;
    const cardSuitSymbol = cardToBeSwapped[i].lastChild.innerText;

    const cardIndex = playerArr.findIndex(
      (ele) => (ele.displayName === cardDisplayName) && (ele.suitSymbol === cardSuitSymbol),
    );
    playerCard = deck.pop();
    cardElement = createCard(playerCard);
    cardContainer.appendChild(cardElement);
    playerArr.splice(cardIndex, 1, playerCard);
  }

  // get cards selected to be swapped and display it with new cards in card panel
  // remove card to be swapped from card container
  while (cardToBeSwapped[0]) {
    cardToBeSwapped[0].parentNode.removeChild(cardToBeSwapped[0]);
  }
  cardContainer.innerHTML = '';

  for (let i = 0; i < playerArr.length; i += 1) {
    const name = document.createElement('div');
    name.classList.add('name', playerArr[i].color);
    name.innerHTML = playerArr[i].displayName;

    const suit = document.createElement('div');
    suit.classList.add('suit');
    suit.innerHTML = playerArr[i].suitSymbol;

    const card = document.createElement('div');
    card.classList.add('card', 'highlight');

    card.appendChild(name);
    card.appendChild(suit);
    cardContainer.appendChild(card);
  }
};
