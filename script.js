// boardSize has to be an even number
const boardSize = 4;
const board = [];
let firstCard = null;
let firstCardElement;
let deck;

// game state variables
let isMatching = false;
let isGameInProgress = false;
let score = 0;

const NUMBER_OF_CARDS = 5;

/**
 * Display game state message.
 * @param {*} message Message
 * @param {*} color Color of message text
 */
const displayMessage = (message, color = 'black') => {
  const gameState = document.getElementById('game-state');
  gameState.innerText = message;
  gameState.style.color = color;
};

/**
 * Reveal card to player
 * @param {*} cardElement Card
 * @param {*} cardInfo Card information
 * @returns Card
 */
const revealCard = (cardElement, cardInfo) => {
  cardElement.innerText = '';

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  cardElement.appendChild(name);
  cardElement.appendChild(suit);

  return cardElement;
};

/**
 * Add score after a match game win.
 */
const updateScore = (diff = 1) => {
  score += diff;

  const scores = document.getElementById('scores');
  scores.innerText = `Score: ${score}`;
};

const holdCard = (cardElement, index) => {
  if (cardElement.classList.contains('held')) {
    cardElement.classList.remove('held');
  } else {
    cardElement.classList.add('held');
  }
};

/**
 * Handle card click
 * @param {*} cardElement Card
 * @param {*} index Index of card
 */
const cardClick = (cardElement, index) => {
  const clickedCard = board[index];
  holdCard(cardElement, index);
};

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 * @param {*} max Max index limit
 * @returns Random index in range
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Shuffle an array of cards.
 * @param {*} cards Deck of cards
 * @returns Shuffled cards
 */
const shuffleCards = (cards) => {
  const shuffledCards = cards;

  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    shuffledCards[currentIndex] = randomCard;
    shuffledCards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return shuffledCards;
};

/**
 * Set cards to be clickable or not clickable.
 * @param {*} isCardClickable True, if clickable. False, otherwise.
 */
const setCardClickable = (isCardClickable) => {
  const cards = document.querySelectorAll('.card');
  for (let i = 0; i < cards.length; i += 1) {
    if (isCardClickable) {
      cards[i].style.setProperty('pointer-events', 'auto');
    } else {
      cards[i].style.setProperty('pointer-events', 'none');
    }
  }
};

const dealCards = () => {
  deck = shuffleCards(makeDeck());

  // deal the cards out to the board data structure
  for (let j = 0; j < NUMBER_OF_CARDS; j += 1) {
    board.push(deck.pop());
  }
  console.log(board);

  // reveal the cards
  const cards = document.querySelectorAll('.card');
  for (let k = 0; k < cards.length; k += 1) {
    revealCard(cards[k], board[k]);    
  }
};

const drawCards = () => {
  const cards = document.querySelectorAll('.card');
  for (let k = 0; k < cards.length; k += 1) {
    if (!cards[k].classList.contains('held')) {
      board[k] = deck.pop();      
      revealCard(cards[k], board[k]);
    } else {
      cards[k].classList.remove('held');
    }
  }

  console.log(`score: ${calcHandScore(board)}`);
  // update points
};

/**
 * Create all the board elements that will go on the screen.
 * @returns The built board
 */
const buildBoardElements = () => {
  // create the element that everything will go inside of
  const boardElement = document.createElement('div');

  // give it a class for CSS purposes
  boardElement.classList.add('board');

  // add area for state of game information
  const stateOfGameElement = document.createElement('div');
  stateOfGameElement.classList.add('game-state');
  stateOfGameElement.innerText = 'Click deal button to start.';
  boardElement.appendChild(stateOfGameElement);

  // add area for scores
  const scoresElement = document.createElement('div');
  scoresElement.classList.add('scores');
  boardElement.appendChild(scoresElement);

  // make an element for this row of cards
  const rowElement = document.createElement('div');
  rowElement.classList.add('row');

  // make all the squares for this row
  for (let j = 0; j < NUMBER_OF_CARDS; j += 1) {
    const card = document.createElement('div');
    card.classList.add('card');

    // set the click event
    // eslint-disable-next-line
    card.addEventListener('click', (event) => {
      // we will want to pass in the card element so
      // that we can change how it looks on screen, i.e.,
      // "turn the card over"
      cardClick(event.currentTarget, j);
    });

    rowElement.appendChild(card);
  }

  boardElement.appendChild(rowElement);

  // add area for buttons
  const buttonsElement = document.createElement('div');
  buttonsElement.classList.add('buttons');

  // add deal game button
  const dealButtonElement = document.createElement('button');
  dealButtonElement.innerText = 'DEAL';
  dealButtonElement.classList.add('button');
  dealButtonElement.addEventListener('click', () => dealCards());
  buttonsElement.appendChild(dealButtonElement);

  // add draw game button
  const drawButtonElement = document.createElement('button');
  drawButtonElement.innerText = 'DRAW';
  drawButtonElement.classList.add('button');
  drawButtonElement.addEventListener('click', () => drawCards());
  buttonsElement.appendChild(drawButtonElement);

  boardElement.appendChild(buttonsElement);

  return boardElement;
};

/**
 * Make a new card deck.
 * @returns An array of cards
 */
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  // const suitsSymbol = ['♥️', '♦️', '♣️', '♠️'];
  const suitsSymbol = ['Hea', 'Dia', 'Clu', 'Spa'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplayName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplayName = 'K';
      }

      let cardColour = 'black';
      if ((suits[suitIndex] === 'hearts') || (suits[suitIndex] === 'diamonds')) {
        cardColour = 'red';
      }

      // Create a new card info with the suit symbol ('♦️'), suit ('diamond'),
      // name ('queen'), display name ('Q'), colour ('red'), and rank (12).
      const card = {
        suitSymbol: suitsSymbol[suitIndex],
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: cardColour,
        rank: rankCounter,
      };

      console.log(`rank: ${rankCounter}`);

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/**
 * Initialize game.
 */
const initGame = () => {
  const boardEl = buildBoardElements(board);
  document.body.appendChild(boardEl);
};

initGame();

const tallyCards = (cards) => {
  // Create Object as tally
  let cardRankTally = {};
  let cardSuitTally = {};

  // Loop over hand
  for (let i = 0; i < cards.length; i += 1) {
    let cardRank = cards[i].rank;
    let cardSuit = cards[i].suit;

    // If we have seen the card rank before, increment its count
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    }
    // Else, initialise count of this card rank to 1
    else {
      cardRankTally[cardRank] = 1;
    }

    // If we have seen the card suit before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card suit to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }

  return { ranks: cardRankTally, suits: cardSuitTally };
};

const isOnePair = (cardTally) => {
  let rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 4)
  && (((cardTally.ranks[rankKeys[0]] === 2) && (rankKeys[0] >= 11))
    || ((cardTally.ranks[rankKeys[1]] === 2) && (rankKeys[1] >= 11))
    || ((cardTally.ranks[rankKeys[2]] === 2) && (rankKeys[2] >= 11))
    || ((cardTally.ranks[rankKeys[3]] === 2) && (rankKeys[3] >= 11)));
};

const isTwoPair = (cardTally) => {
  let rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 3)
  && (((cardTally.ranks[rankKeys[0]] === 2) && (cardTally.ranks[rankKeys[1]] === 2))
    || ((cardTally.ranks[rankKeys[0]] === 2) && (cardTally.ranks[rankKeys[2]] === 2))
    || ((cardTally.ranks[rankKeys[1]] === 2) && (cardTally.ranks[rankKeys[2]] === 2)));
};

const isThreeOfAKind = (cardTally) => {
  let rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 3) 
    && ((cardTally.ranks[rankKeys[0]] === 3) || (cardTally.ranks[rankKeys[1]] === 3));
};

const isFlush = (cardTally) => (Object.keys(cardTally.suits).length === 1);

const isStraight = (cardTally) => {
  let rankKeys = Object.keys(cardTally.ranks);
  if (rankKeys.length !== 5) return false;

  rankKeys = rankKeys.map(Number).sort((a, b) => a - b);
  for (let i = 1; i < rankKeys.length; i += 1) {
    if ((rankKeys[i] - rankKeys[i - 1]) !== 1) return false; 
  }

  return true;
};

const isFullHouse = (cardTally) => {
  let rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 2) 
    && ((cardTally.ranks[rankKeys[0]] === 3) || (cardTally.ranks[rankKeys[1]] === 3));
};

const isFourOfAKind = (cardTally) => {
  let rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 2) 
    && ((cardTally.ranks[rankKeys[0]] === 4) || (cardTally.ranks[rankKeys[1]] === 4));
};

const isStraightFlush = (cardTally) => isStraight(cardTally) && isFlush(cardTally);

/**
 * Calculate score for the cards in hand.
 * @param {*} cards Array of card objects
 * @returns Number of points that the user scored for the cards in their hand
 */
const calcHandScore = (cards) => {
  let handScore = 0;

  let cardTally = tallyCards(cards);

  if (isStraightFlush(cardTally)) return 8;
  else if (isFourOfAKind(cardTally)) return 7;
  else if (isFullHouse(cardTally)) return 6;
  else if (isFlush(cardTally)) return 5;
  else if (isStraight(cardTally)) return 4;
  else if (isThreeOfAKind(cardTally)) return 3;
  else if (isTwoPair(cardTally)) return 2;
  else if (isOnePair(cardTally)) return 1;
  
  return handScore;
};

// module.exports = calcHandScore;
