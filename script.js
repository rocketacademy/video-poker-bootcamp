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

let gameDeck = '';
const playerHand = [];
let cardElement;

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

const getGameDeck = () => {
  gameDeck = shuffleCards(createDeck());
  console.log(gameDeck);
  return gameDeck;
};

const drawHand = () => {
  for (let i = 0; i < 5; i += 1) {
    // create virtual hand
    const card = gameDeck.pop();
    playerHand.push(card);

    // create UI hand
  }
  console.log(playerHand[0]);
  console.log(playerHand[1]);
  console.log(playerHand[2]);
  console.log(playerHand[3]);
  console.log(playerHand[4]);

  return playerHand;
};

const sortHand = (inputArray) => {
  let sorted = false;
  while (sorted === false) {
    let swapCounter = 0;
    for (let i = 0; i < inputArray.length - 1; i += 1) {
      if (inputArray[i].rank > inputArray[i + 1].rank) {
        const tempObj = inputArray[i + 1];
        inputArray[i + 1] = inputArray[i];
        inputArray[i] = tempObj;
        swapCounter += 1;
      } else if (i === inputArray.length - 2 && swapCounter === 0) {
        sorted = true;
      }
    }
  }
  return inputArray;
};
const createCard = (cardInfo) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardName = document.createElement('div');
  cardName.classList.add(cardInfo.name, cardInfo.color);
  cardName.innerText = cardInfo.displayName;

  const cardSuit = document.createElement('div');
  cardSuit.classList.add(cardInfo.suit, cardInfo.color);
  cardSuit.innerText = cardInfo.symbol;

  card.appendChild(cardName);
  card.appendChild(cardSuit);

  return card;
};

const instantiateHand = (handArray) => {
  for (let i = 0; i < handArray.length; i += 1) {
    cardElement = createCard(handArray[i]);
    gameInterface.appendChild(cardElement);
  }
};

const checkHandCondition = (handArray) => {
  let handCondition;

  // cheat hand
  // const handArray = [
  //   { name: 'ace', suit: 'hearts', rank: 1 },
  // { name: 'ace', suit: 'diamonds', rank: 1 },
  // { name: 'ace', suit: 'spades', rank: 1 },
  // { name: 'ace', suit: 'clubs', rank: 5 },
  // { name: '5', suit: 'hearts', rank: 5 },
  // ];

  // condition checkers
  const matchArray = [];
  let straightCond = true;
  let flushCond = true;

  // loop through entire hand
  for (let i = 0; i < handArray.length - 1; i += 1) {
    // if find a match, push to matchArray
    if (handArray[i].rank === handArray[i + 1].rank) {
      matchArray.push(handArray[i].rank);
    }
    // check for flush
    if (handArray[i].suit !== handArray[i + 1].suit) {
      flushCond = false;
    }
    // check for straight
    if (handArray[i].rank !== handArray[i + 1].rank - 1) {
      straightCond = false;
    }
    console.log(handArray[i]);
  }

  // CHEATS
  // flushCond = true;
  // straightCond = true;

  console.log(`Match Array: ${matchArray}`);
  console.log(`Match Array Length: ${matchArray.length}`);
  console.log(handArray[0].rank);
  console.log(handArray[4].rank);

  console.log(`straight cond: ${straightCond}, flush cond: ${flushCond}`);

  // determine hand conditions

  if (matchArray.length === 0 && straightCond === true && flushCond === true) {
    handCondition = 9; // STRAIGHT FLUSH
  } else if (matchArray.length === 3
    && matchArray[0] === matchArray[1] && matchArray[0] === matchArray[2]) {
    handCondition = 8; // FOUR OF A KIND
  } else if (matchArray.length === 3
    && (matchArray[0] !== matchArray[1] || matchArray[0] !== matchArray[2])) {
    handCondition = 7; // FULL HOUSE
  } else if (matchArray.length === 0 && flushCond === true && straightCond === false) {
    handCondition = 6; // FLUSH
  } else if (matchArray.length === 0 && straightCond === true && flushCond === false) {
    handCondition = 5; // STRAIGHT
  } else if (matchArray.length === 2 && matchArray[0] === matchArray[1]) {
    handCondition = 4; // THREE OF A KIND
  } else if (matchArray.length === 2 && matchArray[0] !== matchArray[1]) {
    handCondition = 3; // TWO PAIR
  } else if (matchArray.length === 1) {
    handCondition = 2; // ONE PAIR
  } else if (matchArray.length === 0 && (handArray[0].rank === 1 || handArray[4].rank > 10)) {
    handCondition = 1; // HIGH CARD
  } else {
    handCondition = 0; // LOSE
  }
  console.log(`Hand Condition: ${handCondition}`);
  return handCondition;
};
// ========== INITIALISATION ========== //
const initGame = () => {
  document.body.appendChild(messageInterface);
  document.body.appendChild(gameInterface);

  getGameDeck();
  // sort hand in ascending order of rank
  const firstHand = sortHand(drawHand());
  // create hand based on card data
  instantiateHand(firstHand);

  checkHandCondition(firstHand);
};

initGame();
