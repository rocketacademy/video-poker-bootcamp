/**
 * Global variables
 */
let overallContainer; // contains all assets
let gameContainer;
let cardComboContainer;
let outputContainer;
let inputContainer;
let savedCardsArray = [];

let output;
let input;
let betAmount = 0;
const userHand = [];

const userPoints = 100;
let deck = [];

// TODO
// clicks a button to deal cards
// user selects which card to keep DOING
// game replaces the unselected cards, calculateds the handscore, and update total points.
// function that adds card in a loop and adds a click element to change cards.

/**
 * function that sums returns the sum of the playing hand
 * @param {array} cardHand the user's current playing hand
 * @returns {number} sum of scores from the user's playing hand
 */
const calcHandScore = (cardHand) => {
  return 1;
};

//////////////////////
// helper functions //
//////////////////////

/**
 * function that makes a standard deck of cards
 */
const makeDeck = () => {
  // 4 suits - diamond, clubs, heart, spades
  // 13 cards per suit
  // create a loop that generates 52 cards of 4 suits
  let newDeck = [];
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
  for (let i = 0; i < suits.length; i += 1) {
    const suitSymbol = ['♦', '♣', '♥', '♠'];
    let currentSuitSymbol = suitSymbol[i];

    for (let j = 1; j < 14; j += 1) {
      let cardSuits = suits[i];
      let suitColor;
      let cardName = j;
      let currentDisplayName = j;

      if (j === 1) {
        cardName = 'ace';
        currentDisplayName = 'A';
      } else if (j === 11) {
        cardName = 'jack';
        currentDisplayName = 'J';
      } else if (j === 12) {
        cardName = 'queen';
        currentDisplayName = 'Q';
      } else if (j === 13) {
        cardName = 'king';
        currentDisplayName = 'K';
      }
      if (cardSuits === 'diamonds' || cardSuits === 'hearts') {
        suitColor = 'red';
      } else {
        suitColor = 'black';
      }
      let currentCard = {
        name: cardName,
        suit: cardSuits,
        rank: j,
        color: suitColor,
        suitSymbol: currentSuitSymbol,
        displayName: currentDisplayName,
      };
      newDeck.push(currentCard);
    }
  }
  return newDeck;
};

/**
 * Function that shuffles the deck
 * @param {array} deck array of deck
 */
const shuffleDeck = (cards) => {
  for (let i = 0; i < cards.length; i += 1) {
    let randomIndex = randomNumberGenerator(cards.length);
    let currentCard = cards[i];
    let randomCard = cards[randomIndex];
    cards[i] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

/**
 * function that gives a random number depending on deck size
 * @param {number} deckLength length of deck
 * @returns a random number from 0 - 51
 */
const randomNumberGenerator = (deckLength) => {
  return Math.floor(Math.random() * deckLength);
};

/** DOING
 * function that takes a card object and returns a div to display card
 * adds a function that saves the card to an array when clicked
 * @param {object} cardInfo contains info of the attributes of 1 card
 * @returns a card div containing the attributes of the  card
 */
const makeCard = (cardInfo) => {
  const card = document.createElement('div');
  const cardName = document.createElement('div');
  const cardSuit = document.createElement('div');

  card.classList.add('card');
  cardName.classList.add('name', cardInfo.color);
  cardSuit.classList.add('suit', cardInfo.color);

  cardName.innerHTML = cardInfo.displayName;
  cardSuit.innerHTML = cardInfo.suitSymbol;

  card.addEventListener('click', () => {
    card.classList.toggle('clicked');
    savedCardsArray.push(cardInfo);
  });

  card.appendChild(cardName);
  card.appendChild(cardSuit);

  return card;
};

/** DOING
 * function to create a button to deal shuffled cards
 * also displays cards in gameContainer
 */
const dealCardBtn = () => {
  // button is placed in overall container only FYI
  const btnEl = document.createElement('button');
  btnEl.innerText = 'Deal Cards';
  btnEl.classList.add('btn-deal-cards', 'btn');
  overallContainer.appendChild(btnEl);
  btnEl.addEventListener('click', () => {
    for (let i = 0; i < 5; i += 1) {
      userHand.push(deck.pop());
      console.log(`${userHand[i].name} of ${userHand[i].suit} dealt`);
      const cardEl = makeCard(userHand[i]);
      gameContainer.appendChild(cardEl);
    }
  });
};

/**
 * creates deck and shuffles deck
 */
deck = shuffleDeck(makeDeck());
