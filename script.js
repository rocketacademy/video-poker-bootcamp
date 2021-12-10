/**
 * Global variables
 */
let overallContainer; // contains all assets
let gameContainer;
let output;
let input;

const userPoints = 100;
let deck = [];

// TODO
// clicks a button to deal cards DOING
// user selects which card to keep
// game replaces the unselected cards, calculateds the handscore, and update total points.
// function that adds card in a loop and adds a click element to change cards.

const dealCardBtn = () => {
  // button is placed in overall container FYI
  const btnEl = document.createElement('button');
  btnEl.innerText = 'Deal Cards';
  btnEl.classList.add('btn-deal-cards', 'btn');
  overallContainer.appendChild(btnEl);
};

const initGame = () => {
  // create overall container
  overallContainer = document.createElement('div');
  overallContainer.classList.add('overall-container');
  document.body.appendChild(overallContainer);

  // create card combination container
  const cardComboContainer = document.createElement('div');
  cardComboContainer.classList.add('card-combintaion-container', 'section');
  overallContainer.appendChild(cardComboContainer);

  // create card display container
  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container', 'section');
  overallContainer.appendChild(gameContainer);

  // create output container
  const outputContainer = document.createElement('div');
  outputContainer.classList.add('output-container', 'section');
  overallContainer.appendChild(outputContainer);

  // create input container, bet input and submit //
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  overallContainer.appendChild(inputContainer);
  // bet input slider
  input = document.createElement('input');
  input.type = 'range';
  input.name = 'quantity';
  input.classList.add('input-bet');
  input.min = 0;
  input.max = 100;
  inputContainer.appendChild(input);

  // output
  output = document.createElement('output');
  output.classList.add('output');
  output.setAttribute('for', 'quantity');
  overallContainer.appendChild(output);

  // create deal cards button
  dealCardBtn();
};
initGame();
/**
 * Function that sums returns the sum of the playing hand
 * @param {array} cardHand the user's current playing hand
 * @returns {number} sum of scores from the user's playing hand
 */
const calcHandScore = (cardHand) => {
  return score;
};

//////////////////
// Slider Input //
//////////////////
const rangeInput = document.querySelector('.input-bet');
const rangeOutput = document.querySelector('.output');

const outputDefaultState = () => {
  rangeOutput.value = rangeInput.value;
};
rangeInput.addEventListener('input', function () {
  rangeOutput.value = this.value;
});
document.addEventListener('DOMContentLoaded', function () {
  outputDefaultState();
});

//////////////////////
// helper functions //
//////////////////////
/**
 * Function that makes a standard deck of cards
 */
const makeDeck = () => {
  // 4 suits - diamond, clubs, heart, spades
  // 13 cards per suit
  // create a loop that generates 52 cards of 4 suits
  let newDeck = [];
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
  for (let i = 0; i < suits.length; i += 1) {
    for (let j = 1; j < 14; j += 1) {
      let cardSuits = suits[i];
      let suitColor;
      let cardName = j;

      if (j === 1) {
        cardName = 'ace';
      } else if (j === 11) {
        cardName = 'jack';
      } else if (j === 12) {
        cardName = 'queen';
      } else if (j === 13) {
        cardName = 'king';
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
 * Function that gives a random number depending on deck size
 * @param {number} deckLength length of deck
 * @returns a random number from 0 - 51
 */
const randomNumberGenerator = (deckLength) => {
  return Math.floor(Math.random() * deckLength);
};

//
deck = shuffleDeck(makeDeck());
