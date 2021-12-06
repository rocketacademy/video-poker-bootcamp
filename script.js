// global variables
let playerCard;

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
document.body.appendChild(gameInfo);

const playerdiv = document.createElement('div');
playerdiv.classList.add('player1container');
document.body.appendChild(playerdiv);

// initialize button functionality
const dealBtn = document.createElement('BUTTON');
dealBtn.innerHTML = 'Deal';

const buttonsContainer = document.createElement('div');
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

const playerClick = () => {
  // Pop player 1's card metadata from the deck
  // playerCard = deck.pop();
  // Append the card element to the card container
  // clear the player's div
  // playerdiv.innerHTML = '';
  // sort the player1 hand
  // player1hand.sort((a, b) => a.rank - b.rank);
  // player1temphighcard = player1hand.pop();
  // player1hand.unshift(player1temphighcard);
  // do a for loop to append it to player1div
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardElement = createCard(playerHand[i]);
    playerdiv.appendChild(cardElement);
  }
};

dealBtn.addEventListener('click', playerClick);

const initGame = () => {
  document.body.appendChild(buttonsContainer);
  output('lets play');
};

initGame();
