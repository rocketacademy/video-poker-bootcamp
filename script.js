// video poker is a single player poker
// user starts with 100 points
// "deal" gives 5 cards
// user can choose any number of cards to "swap"
// after "swap", game assigns points based on resulting hand

// ********** Hand Rankings ********** //
// 1. five of a kind
// 2. straight flush
// 3. four of a kind
// 4. full house
// 5. flush
// 6. straight
// 7. three of a kind
// 8. two pair
// 9. one pair
// 10. high card
// *********************************** //

// ========== GLOBAL VARIABLES ========== //
// ----- General ----- //
const playerPoints = 100;
const pointsBet = 0;

const gameDeck = '';

// ----- html ----- //
const messageInterface = document.createElement('div');
messageInterface.classList.add('message-interface');
const outputMessage = document.createElement('p');
outputMessage.classList.add('message');
messageInterface.appendChild(outputMessage);

const gameInterface = document.createElement('div');
gameInterface.classList.add('game-interface');
const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');
const gameInfo = document.createElement('div');
gameInfo.classList.add('game-info');
const playerPanel = document.createElement('div');
playerPanel.classList.add('player-panel');
gameInterface.appendChild(gameBoard);
gameInterface.appendChild(gameInfo);
gameInterface.appendChild(playerPanel);

const betButton = document.createElement('button');
betButton.innerText = 'bet';
playerPanel.appendChild(betButton);
const dealButton = document.createElement('button');
dealButton.innerText = 'deal';
playerPanel.appendChild(dealButton);
const swapButton = document.createElement('button');
swapButton.innerText = 'swap';
playerPanel.appendChild(swapButton);

// ========== HELPER FUNCTIONS ========== //
const createDeck = () => {
  // newDeck array to contain cards
  const newDeck = [];

  // outer loop. four suits; suit symbols; suit colors
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
  const suitSymbols = ['♦️', '♣️', '♥️', '♠️'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];

    let suitColor = '';
    if (currentSuit === 'diamonds' || currentSuit === 'hearts') {
      suitColor = 'red';
    } else if (currentSuit === 'clubs' || currentSuit === 'spades') {
      suitColor = 'black';
    }
    // inner loop. 1 to 13 ranks;
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Define card names
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;
      // Define exceptions for card name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // Define exceptions for display name
      if (shortName === '1') {
        shortName = 'A';
      } else if (shortName === '11') {
        shortName = 'J';
      } else if (shortName === '12') {
        shortName = 'Q';
      } else if (shortName === '13') {
        shortName = 'K';
      }

      // Create Card
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        symbol: currentSymbol,
        color: suitColor,
        displayName: shortName,
      };

      // add card to deck through push function.
      newDeck.push(card);
    }
  }

  return newDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);
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

// ========== INITIALISATION ========== //
const initGame = () => {
  document.body.appendChild(messageInterface);
  document.body.appendChild(gameInterface);
};

initGame();
