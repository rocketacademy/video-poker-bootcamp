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
const cardSelectIndex = [];
const cardSelectArray = [];
let cardDeck;
let gameScoreContainer;
let gameScore = 100;
const gameScoreStep = 20;
const numberOfCards = 5;
let messageContainer;
let messageOutput;
let playerHand = [];
let scoreTemp = 0;
let wrapper;

/// ////////////CALLBACK FUNCTIONS/////////

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
  // Index of the hand for cards to be replaced
    const cardIndex = cardSelectIndex[index];
    // Obtain the element of the new card
    const newCard = newCards[index];
    console.log(newCard);
    // Replace the old card using index with new card
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
  if (result === 'You din get anything') return '0';
};

const cardSelect = (cardInfo, index) => {
  // if index is not inside, append. Otherwise remove.
  if (cardSelectIndex.includes(Number(index)) === false) {
    cardSelectIndex.push(Number(index));
    const cardSelected = document.getElementById(`card${index}`);
    console.log(cardSelected);
    cardSelected.classList.add('selected');
  }
  else {
    // Obtain the index of which the number is repeated
    const removeIndex = cardSelectIndex.indexOf(Number(index));
    // Remove the card from selected card array
    cardSelectIndex.splice(removeIndex, 1);
    const cardSelected = document.getElementById(`card${index}`);
    console.log(cardSelected);
    cardSelected.classList.remove('selected');
    cardSelected.classList.add('card');
  }
  return cardSelectIndex;
};

const createCard = (cardInfo, index) => {
  const suit = document.createElement('div');
  suit.setAttribute('id', 'suit');
  suit.innerText = cardInfo.suit;

  const name = document.createElement('div');
  name.setAttribute('id', 'name');
  name.innerText = cardInfo.name;

  cardContainer = document.createElement('div');
  cardContainer.setAttribute('id', `card${index}`);
  cardContainer.appendChild(name);
  cardContainer.appendChild(suit);

  cardContainer.addEventListener('click', (e) => {
    cardSelect(cardInfo, index);
  });

  return cardContainer;
};

const drawClick = () => {
  gameScore -= 10;
  gameScoreContainer.innerText = gameScore;

  scoreTemp = 0;

  // Shuffle deck and draw number of cards
  cardDeck = shuffleCards(makeDeck());
  playerHand = dealCards(numberOfCards);

  scoreTemp = Number(getScore(playerHand));
  document.getElementById('lock-btn').disabled = false;

  // display cards drawn one by one
  let count = 0;
  wrapper = document.getElementById('wrapper');
  for (index in playerHand) {
    const card = createCard(playerHand[index], index);
    console.log(card);
    count += 500;
    setTimeout(() => {
      wrapper.appendChild(card);
    }, count);
  }

  setTimeout(() => {
    messageOutput.innerText = `${analyseHand(playerHand)};   +${getScore(playerHand)} if you lock it in!`;
  }, 2500);

  // Disable button after click
  document.getElementById('draw-btn').disabled = true;
};

const swapClick = () => {
  scoreTemp = 0;
  // Draw new cards base on length;
  const noOfCards = cardSelectIndex.length;
  const newCards = dealCards(noOfCards);

  // Replace cards in player's Hand
  playerHand = replaceCard(newCards, playerHand, cardSelectIndex);

  // Empty card container and replace cards
  wrapper.innerHTML = '';
  for (index in playerHand) {
    const card = createCard(playerHand[index], index);
    wrapper.appendChild(card);
  }
  scoreTemp = Number(getScore(playerHand));
  messageOutput.innerText = `${analyseHand(playerHand)};   +${getScore(playerHand)} if you lock it in!`;

  // Disable button after click
  document.getElementById('swap-btn').disabled = true;
};

const lockClick = () => {
  // calculate and update game score
  gameScore = Number(gameScore) + Number(scoreTemp);
  gameScoreContainer.innerText = gameScore;

  // Disable button after click
  document.getElementById('lock-btn').disabled = true;

  document.getElementById('draw-btn').disabled = false;
  document.getElementById('swap-btn').disabled = false;
  messageOutput.innerText = 'Click to draw a card!';
  // Empty card container and replace cards
  wrapper.innerHTML = '';
};

/// ////////////INITISATION///////////////
const initGame = () => {
  // message container
  messageContainer = document.createElement('div');
  messageContainer.classList.add('message');
  document.body.appendChild(messageContainer);

  // message output
  messageOutput = document.createElement('span');
  messageContainer.append(messageOutput);
  messageOutput.innerText = 'Click to draw a card!';

  // fill game score div with score
  gameScoreContainer = document.createElement('div');
  gameScoreContainer.classList.add('h2');
  gameScoreContainer.innerText = gameScore;
  gameScoreContainer.setAttribute('class', 'h2');
  document.body.appendChild(gameScoreContainer);

  // initialise div wrapper to contain card elements'
  wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'wrapper');
  document.body.appendChild(wrapper);

  // set up 3 buttons for draw, swap, reset
  const drawButton = document.createElement('button');
  drawButton.innerText = 'DRAW';
  drawButton.setAttribute('id', 'draw-btn');
  document.body.appendChild(drawButton);
  drawButton.addEventListener('click', drawClick);

  const swapButton = document.createElement('button');
  swapButton.innerText = 'SWAP';
  swapButton.setAttribute('id', 'swap-btn');
  document.body.appendChild(swapButton);
  swapButton.addEventListener('click', swapClick);

  const lockButton = document.createElement('button');
  lockButton.innerText = 'LOCK IT';
  lockButton.setAttribute('id', 'lock-btn');
  document.body.appendChild(lockButton);
  lockButton.addEventListener('click', lockClick);
};
initGame();
