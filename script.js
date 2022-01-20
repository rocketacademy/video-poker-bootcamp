/// ///////HELPER FUNCTIONS//////////
// Create shuffled card deck
const getRandomIndex = (max) => Math.floor(Math.random() * max);
const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

// Initialise an empty deck array
const makeDeck = () => {
  const newDeck = [];
  const suits = ['♥', '♦', '♣', '♠'];
  for (let i = 0; i < suits.length; i += 1) {
    const currentSuit = suits[i];
    for (let rankCounter = 2; rankCounter <= 14; rankCounter += 1) {
      let cardName = `${rankCounter}`;

      // Set cardName For J,Q,K,A
      if (cardName === '14') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }
      // Create a new card with the current name, suit, rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(card);
    }
  }
  // Return the completed card deck
  return newDeck;
};
// update create card display
const createCard = (cardInfo) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const suit = document.createElement('div');
  suit.innerText = cardInfo.suit;

  const name = document.createElement('div');
  name.innerText = cardInfo.name;

  // append card name and suit to the card div
  card.appendChild(name);
  card.appendChild(suit);
  return card;
};

/// ///////GLOBAL VARIABLES//////////
const deck = shuffleCards(makeDeck());
const numberOfCards = 5;
const player1Button = document.createElement('button');
const gameInfo = document.createElement('div');
let canClick = true;
let cardContainerP1;
const p1Hand = [];
let logForExport;

/// ////////////CALLBACK FUNCTIONS/////////

const cardLog = (hand) => {
  const log = [];
  for (i in hand) {
    log.push(hand[i].name, hand[i].suit);
  }
  return log.join(' ');
};

const player1Click = () => {
  if (canClick === true) {
    canClick = false;
  }
  for (let i = 0; i < numberOfCards; i += 1) {
    p1Hand[i] = deck.pop();
  }
  p1Hand.sort((a, b) => a.rank - b.rank);

  // loop to create cards into card container
  // setTimeout method to show cards one by one
  let x = 0;
  for (let i = 0; i < numberOfCards; i += 1) {
    x += 500;
    setTimeout(() => {
      const cardElement = createCard(p1Hand[i]);
      cardContainerP1.appendChild(cardElement);
    }, x);
  }
  logForExport = cardlog(p1Hand);
  console.log(cardLog(p1Hand));

  canClick = true;
};

export { logForExport };

/// ////////////INITISATION///////////////
const initGame = () => {
  // player 1 draw button
  player1Button.innerText = 'Draw Cards';
  document.body.appendChild(player1Button);
  player1Button.addEventListener('click', player1Click);

  // fill game info div with starting instructions
  gameInfo.innerText = 'Click to draw a card!';
  document.body.appendChild(gameInfo);

  // initialise a div 'cardContainer'
  cardContainerP1 = document.createElement('div');
  cardContainerP1.classList.add('cardContainer');
  document.body.appendChild(cardContainerP1);
};
initGame();
