// Please implement exercise logic here
/**
 * HELPER FUNCTIONS
 * Helper functions for game logic
 */
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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    // CX: Setting of suit symbol as well as card colors
    let suitSymbol = '';
    let colour = '';

    switch (currentSuit) {
      case 'hearts':
        suitSymbol = '♥';
        colour = 'red';
        break;
      case 'diamonds':
        suitSymbol = '♦️';
        colour = 'red';
        break;
      case 'clubs':
        suitSymbol = '♣';
        colour = 'black';
        break;
      case 'spades':
      default:
        suitSymbol = '♠';
        colour = 'black';
        break;
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      // CX: Setting of display name
      let displayName = cardName;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      // CX fix: set aces to 13, as highest rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: (rankCounter === 1) ? 13 : rankCounter,
        suitSymbol,
        displayName,
        colour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Make a card in the DOM
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  // CX: Add color to the suit
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  // CX: Replace 3 with the display name of the card
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

/**
 * GLOBAL SETUP
 * Global variables that store game-wide data or DOM elements
 */

// Initialize unshuffled deck
const unshuffledDeck = makeDeck();
// Shuffled deck as a copy of unshuffled deck
let deck = shuffleCards([...unshuffledDeck]);

// Add the cardContainer DOM element as a global variable.
let cardContainer;

// Player 1 starts first
const playersTurn = 1; // matches with starting instructions
// Player 1 cards
const player1Cards = [];

// create player 1 draw button
const player1Button = document.createElement('button');
// create player 1 replace cards button
const player1ReplaceButton = document.createElement('button');
// Create game info div as global value
const gameInfo = document.createElement('div');

/**
 * PLAYER ACTION CALLBACKS
 * Callbacks that get triggered when player 1 and 2 click on their respective buttons.
 */

// Event handler on player 1's button to draw card and switch
// to player 2's turn
const player1ReplaceCardsClick = () => {
  const SELECTED_CARDS = document.querySelectorAll('.selected');
  /* Replace cards in player1Cards */
  for (let i = 0; i < SELECTED_CARDS.length; i += 1) {
    const CARD_DISPLAY_NAME = SELECTED_CARDS[i].firstChild.innerText;
    const CARD_SUIT_SYMBOL = SELECTED_CARDS[i].lastChild.innerText;

    const CARD_INDEX = player1Cards.findIndex(
      (element) => (element.displayName === CARD_DISPLAY_NAME)
      && (element.suitSymbol === CARD_SUIT_SYMBOL),
    );

    player1Cards.splice(CARD_INDEX, 1, deck.pop());
  }
  /* Replace cards in DOM */
  cardContainer.innerHTML = '';
  for (let i = 0; i < 5; i += 1) {
    player1Cards.push(deck.pop());
    // Create card element from card metadata
    const cardElement = createCard(player1Cards[i]);
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
  }

  /* Remove helper text and button */
  player1ReplaceButton.style.display = 'none';
  gameInfo.style.display = 'none';
};

const player1CardClick = (event) => {
  const CARD = event.currentTarget;
  // if already selected
  if (CARD.className.indexOf('selected') !== -1) {
    CARD.classList.remove('selected');
  } else {
    CARD.classList.add('selected');
  }
};

const player1Click = () => {
  if (playersTurn === 1) {
    player1Button.disabled = true;

    setTimeout(() => {
      // create new deck and reshuffle if no cards left
      if (deck.length === 0) {
        console.log("end of deck reached in player 1's turn! time to reshuffle.");
        deck = shuffleCards([...unshuffledDeck]);
      }

      // Empty cardContainer in case this is not the 1st round of gameplay
      cardContainer.innerHTML = '';

      // For testing: use this hand
      // ♠, ♥, ♣, ♦️
      const TEST_HAND = [
        {
          name: 'ace',
          suit: 'clubs',
          rank: 13,
          suitSymbol: '♣',
          displayName: 'A',
          colour: 'black',
        },
        {
          name: 'king',
          suit: 'clubs',
          rank: 12,
          suitSymbol: '♣',
          displayName: 'K',
          colour: 'black',
        },
        {
          name: '8',
          suit: 'clubs',
          rank: 8,
          suitSymbol: '♣',
          displayName: '8',
          colour: 'black',
        },
        {
          name: 'ace',
          suit: 'clubs',
          rank: 13,
          suitSymbol: '♣',
          displayName: 'A',
          colour: 'black',
        },
        {
          name: '8',
          suit: 'clubs',
          rank: 8,
          suitSymbol: '♣',
          displayName: '8',
          colour: 'black',
        },
      ];

      // Pop player 1's card metadata from the deck
      for (let i = 0; i < 5; i += 1) {
        // For testing: use this hand
        player1Cards.push(TEST_HAND[i]);
        // player1Cards.push(deck.pop());
        // Create card element from card metadata
        const cardElement = createCard(player1Cards[i]);
        // Append the card element to the card container
        cardContainer.appendChild(cardElement);
      }

      /* Disable player draw button and change status */
      gameInfo.innerText = `Player ${playersTurn}, your current hand has a ${recognizeCurrentHand(player1Cards)}. Please choose any number of cards you would like to replace, and hit submit`;
      player1Button.disabled = false;
      player1Button.style.display = 'none';
      player1ReplaceButton.style.display = 'inline-block';
      /* Add event listeners on click to all cards */
      const CARDS = cardContainer.querySelectorAll('.card');
      for (let i = 0; i < CARDS.length; i += 1) {
        CARDS[i].style.cursor = 'pointer';
        CARDS[i].addEventListener('click', player1CardClick);
      }

      // Switch to player 2's turn
      // playersTurn = 2;
    }, 500);
  }
};

/**
 * GAMEPLAY MECHANICS
 *
 */

const sortCurrentHand = (firstCard, secondCard) => firstCard.rank - secondCard.rank;

const recognizeCurrentHand = (hand) => {
  console.log('current hand:', hand);
  // initialize hand string
  let string = '';
  // initialize sorted hand using a shallow copy of current hand
  const SORTED_HAND = [...hand].sort(sortCurrentHand);
  console.log('sorted current hand:', SORTED_HAND);
  // initialize tally
  const tally = {};
  for (let i = 0; i < SORTED_HAND.length; i += 1) {
    const cardName = SORTED_HAND[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in tally) {
      tally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      tally[cardName] = 1;
    }
  }

  // initialize pairs
  const PAIRS = Object.keys(tally).filter((key) => tally[key] === 2);
  const FIRST_PAIR = PAIRS[0];
  // hand recognition logic
  if (PAIRS.length === 2) {
    string += `2 pairs of ${FIRST_PAIR} and ${PAIRS[1]}`;
  } else if (PAIRS.length > 0) {
    const PAIR = PAIRS[0];
    string += `pair of ${FIRST_PAIR}s`;
  }
  else {
    string += `high card of ${SORTED_HAND[SORTED_HAND.length - 1].name}`;
  }

  return string;
};

/**
 * GAME INITIALISATION
 * We can now centralise our game initialisation into a single function called `initGame`.
 */

const initGame = () => {
  // Initialise cardContainer as a div with CSS class card-container,
  // and add it to the document body. Add this logic to the initGame function.
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  // initialize button functionality
  player1Button.innerText = 'Player 1 Draw';
  document.body.appendChild(player1Button);

  player1Button.addEventListener('click', player1Click);

  player1ReplaceButton.innerText = 'Player 1 Replace Cards';
  player1ReplaceButton.style.display = 'none';
  document.body.appendChild(player1ReplaceButton);

  player1ReplaceButton.addEventListener('click', player1ReplaceCardsClick);

  // fill game info div with starting instructions
  gameInfo.innerText = `Its player ${playersTurn} turn. Click to draw 5 cards!`;

  document.body.appendChild(gameInfo);
};

// CX: Run initGame() to start everything!
initGame();
