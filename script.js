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
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;

      // Set cardName For J,Q,K,A
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }
      // Create a new card with the current name, suit, rank
      const cardInfo = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }
  // Return the completed card deck
  return newDeck;
};

/// ///////GLOBAL VARIABLES//////////

let cardContainer;
const cardTally = [];
let cardSelectIndex = [];
let cardDeck;
const toggleDeal = true;
const swapOnce = false;
let dealCounter = 0;

const numberOfCards = 5;
const gameScoreContainer = document.createElement('div');
const gameScore = 100;
const gameScoreStep = 20;
let fiveCardContainer;
let playerHand = [];
let playerScore;

// message container
const messageContainer = document.createElement('div');
messageContainer.classList.add('message');
document.body.appendChild(messageContainer);

// message output
const messageOutput = document.createElement('span');
messageContainer.append(messageOutput);
messageOutput.innerText = '';

/// ////////////CALLBACK FUNCTIONS/////////

const buildFiveCardContainer = () => {
  fiveCardContainer = document.getElementById('fiveCardContainer');
  fiveCardContainer.innerHTML = '';

  for (let i = 0; i < numberOfCards; i += 1) {
    cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.setAttribute('id', `card${i}`);
    fiveCardContainer.appendChild(cardContainer);
  }
};

const dealCards = (noOfCards) => {
  const listOfCards = [];
  for (let i = 0; i < noOfCards; i += 1) {
    const card = cardDeck.pop();
    listOfCards.push(card);
  }
  console.log(listOfCards);
  return listOfCards;
};

const replaceCard = (newCards, playerHand, cardSelectIndex) => {
  for (index in cardSelectIndex) {
  // The index of the hand of which cards to be replaced
    const cardIndex = cardSelectIndex[index];
    // Obtain the element of the new card
    const newCard = newCards[index];
    console.log(newCard);
    // Replace the old card using index, 1 time, with the new element card
    playerHand.splice(cardIndex, 1, newCard);
  }
  return playerHand;
};

const analyseHand = () => {
  const playerHandSuit = playerHand.map(({ suit }) => suit);
  const playerHandRank = playerHand.map(({ rank }) => rank);

  const ELE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const ele = playerHandRank;
  const eleSuit = playerHandSuit;

  // const ele = [9, 13, 11, 13, 11];
  // const eleSuit = ['♥', '♠', '♠', '♠', '♠'];

  const flush = eleSuit.every((i) => i === eleSuit[0]);
  const group = ELE.map((n, i) => ele.filter((j) => i === j).length).sort((x, y) => y - x);
  console.log(group);

  const distance = Math.max(...ele) - Math.min(...ele);
  const straight = group[0] === 1 && distance < 5;

  if (straight && flush) return 'straight-flush';
  if (group[0] === 4) return 'four-of-a-kind';
  if (group[0] === 3 && group[1] === 2) return 'full-house';
  if (flush) return 'flush';
  if (straight) return 'straight';
  if (group[0] === 3) return 'three-of-a-kind';
  if (group[0] === 2 && group[1] === 2) return 'two-pair';
  if (group[0] === 2) return 'one-pair';
  return 'You din get anything';
};

const getScore = () => {
  const result = analyseHand();

  if (result === 'straight-flush') return Math.round(gameScoreStep / 0.0012);
  if (result === 'four-of-a-kind') return Math.round(gameScoreStep / 0.0239);
  if (result === 'full-house') return Math.round(gameScoreStep / 0.144);
  if (result === 'flush') return Math.round(gameScoreStep / 0.19);
  if (result === 'straight') return Math.round(gameScoreStep / 0.35);
  if (result === 'three-of-a-kind') return Math.round(gameScoreStep / 0.5211);
  if (result === 'two-pair') return Math.round(gameScoreStep / 0.747);
  if (result === 'one-pair') return Math.round(gameScoreStep / 0.942);
  if (result === 'You din get anything') return [];
};

const cardSelect = (cardInfo, index) => {
  // if index is not inside, append. Otherwise remove.
  if (cardSelectIndex.includes(Number(index)) === false) {
    cardSelectIndex.push(Number(index));
    console.log(cardSelectIndex);
  }
  else {
    // Obtain the index of which the number is repeated
    const removeIndex = cardSelectIndex.indexOf(Number(index));
    // Remove the card base on the index, 1 time.
    cardSelectIndex.splice(removeIndex, 1);
  }
  console.log(cardSelectIndex);
  return cardSelectIndex;
};

const createCard = (cardInfo, index) => {
  const suit = document.createElement('div');
  suit.classList.add(cardInfo.suit, cardInfo.color);
  suit.innerText = cardInfo.suit;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  const frontContainer = document.createElement('div');
  frontContainer.classList.add('front-container');

  frontContainer.appendChild(name);
  frontContainer.appendChild(suit);

  card.addEventListener('click', (e) => {
    cardSelect(cardInfo, index);
  });
  card.appendChild(frontContainer);

  return card;
};

const drawClick = () => {
  // This line resets and reshuffle the deck for subsequent plays
  if (dealCounter % 2 === 0) {
    cardContainer.innerHTML = '';
    cardDeck = shuffleCards(makeDeck());

    playerHand = dealCards(numberOfCards);

    for (index in playerHand) {
      const card = createCard(playerHand[index], index);
      cardContainer.appendChild(card);
    }
  }
};

const swapClick = () => {
// Draw new cards base on length;
  const noOfCards = cardSelectIndex.length;
  const newCards = dealCards(noOfCards);

  // Replace cards in player's Hand
  playerHand = replaceCard(newCards, playerHand, cardSelectIndex);

  // Get score for new cards

  // Update DOM with new cards
  cardContainer.innerHTML = ''; // Empty the container
  for (index in playerHand) {
    const card = createCard(playerHand[index], index);
    cardContainer.appendChild(card);
  }
};

const resetClick = () => {
  dealCounter = 0;
  cardSelectIndex = [];
  buildFiveCardContainer();
};

/// ////////////INITISATION///////////////
const initGame = () => {
  // fill game info div with starting instructions
  messageOutput.innerText = 'Click to draw a card!';

  // fill game score div with score
  gameScoreContainer.innerText = gameScore;
  document.body.appendChild(gameScoreContainer);

  // initialise div fivecardContainer'
  const fiveCardContainer = document.createElement('div');
  fiveCardContainer.setAttribute('id', 'fiveCardContainer');
  document.body.appendChild(fiveCardContainer);

  // set up 3 buttons for draw, swap, reset
  const drawButton = document.createElement('button');
  drawButton.innerText = 'DRAW';
  document.body.appendChild(drawButton);
  drawButton.addEventListener('click', drawClick);

  const swapButton = document.createElement('button');
  swapButton.innerText = 'SWAP';
  document.body.appendChild(swapButton);
  swapButton.addEventListener('click', swapClick);

  const resetButton = document.createElement('button');
  resetButton.innerText = 'RESET';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetClick);
};
initGame();

// build card container to hold five cards
buildFiveCardContainer();
