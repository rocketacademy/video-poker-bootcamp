// ========== DECK STUFF ============
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// make card deck
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    let symbol = '';
    let color = '';

    if (currentSuit === 'hearts') {
      symbol = '♥️';
      color = 'red';
    } else if (currentSuit === 'diamonds') {
      symbol = '♦️';
      color = 'red';
    } else if (currentSuit === 'clubs') {
      symbol = '♣️';
      color = 'black';
    } else if (currentSuit === 'spades') {
      symbol = '♠️';
      color = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortForm = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        shortForm = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        shortForm = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        shortForm = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        shortForm = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        displayName: shortForm,
        suitSymbol: symbol,
        suitColour: color,
      };

      // Add the new card to the deck
      newDeck.push(card);
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};
// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const deck = shuffleCards(makeDeck());

// ========== HELPER FUNCTIONS ==========
/**
 * A function that returns a fixed number of points
 * @param cardArray array of card objects
 * @return {number} num of points in user's hand
 */
const calcHandScore = (cardArray) => {
  const score = cardArray.length * 1;
  return score;
};

// dom elements
// create div for board to place dealt cards
const board = document.createElement('div');
board.classList.add('board');
document.body.appendChild(board);

// create div for keep/release buttons
const buttonRow = document.createElement('div');
buttonRow.classList.add('buttonRow');
document.body.appendChild(buttonRow);

const buttonRow2 = document.createElement('div');
buttonRow2.classList.add('buttonRow');
document.body.appendChild(buttonRow2);

// create hold/unhold buttons for each card on board
for (let i = 0; i < 5; i += 1) {
  const holdButton = document.createElement('button');
  holdButton.classList.add('Button');
  holdButton.innerText = 'Keep';
  // holdButton.addEventListener('click', holdButtonClickEvent);
  buttonRow.appendChild(holdButton);
}

// create deal button
const dealButton = document.createElement('button');
dealButton.classList.add('button');
dealButton.innerText = 'Deal';
dealButton.addEventListener('click', dealButtonClickEvent);
buttonRow2.appendChild(dealButton);

// functions

const hand = [];
// create deal click event to display dealt cards
const dealButtonClickEvent = () => {
  for (let i = 0; i < 5; i += 1) {
    const card = deck.pop();
    hand.push(card);
  }
};

// click event when Keep button is clicked
const holdButtonClickEvent = () => {

};
// create function to deal released cards , calculate hand score, and update points
