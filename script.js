/// ///////GLOBAL VARIABLES//////////
let deck = [];
const numberOfCards = 5;
const gameScoreContainer = document.createElement('div');
const gameScore = 100;
const gameScoreStep = 20;
const hand = [];
let canClick = true;
let fiveCardContainer;
let cardContainer;
let discardHand;
let swapHand;

// message container
const messageContainer = document.createElement('div');
messageContainer.classList.add('message');
document.body.appendChild(messageContainer);

// message output
const messageOutput = document.createElement('span');
messageContainer.append(messageOutput);
messageOutput.innerText = '';

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

const buildFiveCardContainer = () => {
  fiveCardContainer = document.getElementById('fiveCardContainer');
  fiveCardContainer.innerHTML = '';

  for (let i = 0; i < numberOfCards; i += 1) {
    cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');
    cardContainer.setAttribute('id', `card${i}`);
    fiveCardContainer.appendChild(cardContainer);
  }
};

const enterSwapHand = () => {
  discardHand = 
  for (let i = 0; i < discardHand.length; i += 1) {
    swapHand[i] = deck.pop();
  }
  console.log(discardHand);
  console.log(swapHand);
};

const openHand = () => {
  for (let i = 0; i < numberOfCards; i += 1) {
    hand[i] = deck.pop();
    cardContainer = document.getElementById(`card${i}`);
    cardContainer.innerHTML = `${hand[i].name} <br> ${hand[i].suit}`;
    cardContainer.classList.add('cardContainer');
    cardContainer.addEventListener('click', enterSwapHand);
  }
};

/// ////////////CALLBACK FUNCTIONS/////////

const analyseHand = () => {
  const handSuit = hand.map(({ suit }) => suit);
  const handRank = hand.map(({ rank }) => rank);

  const ELE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const ele = handRank;
  const eleSuit = handSuit;

  // testing ele, eleSuit
  // const ele = [2, 2, 4, 5, 6];
  // const eleSuit = ['♥', '♥', '♥', '♥', '♥'];

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
  return 'You din catch anything';
};

const calScore = () => {
  const result = analyseHand();

  if (result === 'straight-flush') return Math.round(gameScoreStep / 0.0012);
  if (result === 'four-of-a-kind') return Math.round(gameScoreStep / 0.0239);
  if (result === 'full-house') return Math.round(gameScoreStep / 0.144);
  if (result === 'flush') return Math.round(gameScoreStep / 0.19);
  if (result === 'straight') return Math.round(gameScoreStep / 0.35);
  if (result === 'three-of-a-kind') return Math.round(gameScoreStep / 0.5211);
  if (result === 'two-pair') return Math.round(gameScoreStep / 0.747);
  if (result === 'one-pair') return Math.round(gameScoreStep / 0.942);
  if (result === 'You din catch anything') return '0';
};

const drawClick = () => {
  if (canClick === true) {
    canClick = false;
  }
  messageOutput.innerText = '';
  cardContainer.innerHTML = '';
  deck = shuffleCards(makeDeck());

  canClick = true;
  openHand();
  setTimeout(() => {
    messageOutput.innerText = `${analyseHand()}; Pick any card to swap!`;
    gameScoreContainer.innerText = `${gameScore + calScore()}`;
    console.log(`${calScore()}`);
  }, 2500);
};

const swapClick = () => {
  enterSwapHand();
  swapHand.sort((a, b) => a - b);
  for (let i = 0; i < swapHand.length; i += 1) {
    cardContainer = document.getElementById(`card${swapHand[i]}`);
    cardContainer.innerHTML = `${swapHand[i].name}${swapHand[i].suit}`;
    cardContainer.classList.add('cardContainer');
  }
};

const resetClick = () => {
  initGame();
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

  // prepare 3 buttons for draw, swap, reset
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

  // build card container to hold five cards
  buildFiveCardContainer();
};
initGame();
