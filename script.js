// global variables
let playerCard;
const rankTally = {};
const suitTally = {};
const swapTally = {};
const playerHand = [
  {
    rank: 2, suit: 'hearts', name: '2', symbol: '♥',
  },
  {
    rank: 2, suit: 'diamonds', name: '2', symbol: '♦',
  },
  {
    rank: 5, suit: 'spades', name: '5', symbol: '♠',
  },
  {
    rank: 7, suit: 'spades', name: '7', symbol: '♠',
  },
  {
    rank: 9, suit: 'hearts', name: '9', symbol: '♥',
  },
];

const gameInfo = document.createElement('div');
gameInfo.classList.add('gameInfoContainer');
document.body.appendChild(gameInfo);

const playerdiv = document.createElement('div');
playerdiv.classList.add('player1container');
document.body.appendChild(playerdiv);

// initialize button functionality
const dealBtn = document.createElement('BUTTON');
dealBtn.innerHTML = 'Deal';

const buttonsContainer = document.createElement('div');
buttonsContainer.classList.add('btnContainer');
buttonsContainer.appendChild(dealBtn);

// helper functions
// display message using output
const output = (message) => {
  gameInfo.innerText = message;
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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitShapes = ['♥', '♦', '♣', '♠'];
  let cardColor = '';
  let symbol;
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      if (currentSuit === 'diamonds') {
        symbol = '♦';
        cardColor = 'red';
      } else if (currentSuit === 'clubs') {
        symbol = '♣';
        cardColor = 'black';
      } else if (currentSuit === 'hearts') {
        symbol = '♥';
        cardColor = 'red';
      } else if (currentSuit === 'spades') {
        symbol = '♠';
        cardColor = 'black';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: cardColor,
        symbol,
      };
      console.log(card);

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};
// function to store the metainfo of the drawn card
const createCard = (cardInfo) => {
  console.log('card info:', cardInfo);
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.symbol;

  const name = document.createElement('div');
  name.classList.add('name');
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  if (cardInfo.color === 'red') {
    card.classList.add('red');
  }

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// work on the function that count the number of cards in each rank
// create an object to store the info of the cards in deck
const tallyHand = () => {
  for (let i = 0; i < playerHand.length; i += 1)
  {
    const card = playerHand[i];
    if (card.rank in rankTally) {
      rankTally[`${card.rank}`] += 1;
    }
    else {
      rankTally[`${card.rank}`] = 1;
    }

    if (card.suit in suitTally) {
      suitTally[`${card.suit}`] += 1;
    }
    else {
      suitTally[`${card.suit}`] = 1;
    }
  }
  return [rankTally, suitTally];
};
// helper function to clear the tally
const clearTally = (object) => {
  Object.keys(object).forEach((key) => delete object[key]);
};

// helper function to check for flush

const checkFlush = () => {
  for (suit in suitTally) {
    if (suitTally[suit] === 5) {
      return true;
    }
  }
  return false;
};

const checkFourOfAKind = () => {
  for (rank in rankTally) {
    if (rankTally[rank] === 4) {
      return true;
    }
  }
  return false;
};

const checkThreeOfKind = () => {
  for (rank in rankTally) {
    if (rankTally[rank] === 3) {
      return true;
    }
  }
  return false;
};

const checkPair = () => {
  for (rank in rankTally) {
    if (rankTally[rank] === 2) {
      return true;
    }
  }
  return false;
};

const checkFullHouse = () => {
  for (rank in rankTally) {
    if (checkThreeOfKind === true && checkPair === true) {
      return true;
    }
  }
  return false;
};

const checkTwoPair = () => {
  let pairCount = 0;
  for (rank in rankTally) {
    if (rankTally[rank] === 2) {
      pairCount += 1;
    }
    if (pairCount === 2) {
      return true;
    }
  }
  return false;
};

const checkStraight = () => {
  // rank 1-9, run loop 9 times
  let count = 0;
  for (let i = 1; i <= 9; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      if (rankTally[i + j] >= 1) {
        count += 1;
      }
      else break;
    }
  }
  if (count === 5) {
    return true;
  }
  return false;
};

const checkJacksOrBetter = () => {
  if (rankTally['11'] === 2 || rankTally['12'] === 2 || rankTally['13'] === 2 || rankTally['1'] === 2) {
    return true;
  }
  return false;
};
const playerClick = () => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardElement = createCard(playerHand[i]);
    playerdiv.appendChild(cardElement);
  }
  tallyHand(playerHand);
};

dealBtn.addEventListener('click', playerClick);

const initGame = () => {
  document.body.appendChild(buttonsContainer);
  output('lets play');
};

initGame();
