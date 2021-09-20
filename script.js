/* eslint-disable prefer-destructuring */
// ######### Global Variable ##############
// ##########################

let deck;
let playerHand = [];
let selectedHand = [0, 0, 0, 0, 0];
let arrangedHand = [];
let points = 100;
const DEAL_CARD_MODE = 'Deal Card Mode';
const SWAP_CARD_MODE = 'Swap Card Mode';
let currentGameMode = DEAL_CARD_MODE;
let cardNameTally = {};
let musicOn = false;
const payTable = [
  { combo: 'Royal Flush', points: 250 },
  { combo: 'Straight Flush', points: 50 },
  { combo: 'Four of a Kind', points: 25 },
  { combo: 'Full House', points: 9 },
  { combo: 'Flush', points: 6 },
  { combo: 'Straight', points: 4 },
  { combo: 'Three of a Kind', points: 3 },
  { combo: 'Two Pairs', points: 2 },
  { combo: 'One Pair', points: 1 },
  { combo: 'Empty', points: -1 },
];

// ########### Defining Sounds ################
// ################
const openCardSound = new Audio('./sounds/cardPlace4.wav');
const swapCardSound = new Audio('./sounds/cardSlide7.wav');
const selectCardSound = new Audio('./sounds/cardPlace1.wav');
const rejectSound = new Audio('./sounds/reject.wav');
const backgroundSound = new Audio('./sounds/Harmonies.mp3');
backgroundSound.volume = 0.2;

const playMusic = () => {
  if (musicOn === false) {
    backgroundSound.play();
    musicOn = true;
    getElement('music').src = './images/music.svg';
  }
  else if (musicOn === true) {
    backgroundSound.pause();
    musicOn = false;
    getElement('music').src = './images/musicOff.svg';
  }
};

// function to create a deck
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

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
      if (cardName === '1') {
        cardName = 'Ace';
      } else if (cardName === '11') {
        cardName = 'Jack';
      } else if (cardName === '12') {
        cardName = 'Queen';
      } else if (cardName === '13') {
        cardName = 'King';
      }
      let icon = suitIndex;
      if (suitIndex === 0) {
        icon = '♥️';
      } else if (suitIndex === 1) {
        icon = '♦️';
      } else if (suitIndex === 2) {
        icon = '♣️';
      } else if (suitIndex === 3) {
        icon = '♠️';
      }

      let cardDisplayName = `${rankCounter}`;
      if (cardDisplayName === '1') {
        cardDisplayName = 'A';
      } else if (cardDisplayName === '11') {
        cardDisplayName = 'J';
      } else if (cardDisplayName === '12') {
        cardDisplayName = 'Q';
      } else if (cardDisplayName === '13') {
        cardDisplayName = 'K';
      }

      let cardColor = suitIndex;
      if (suitIndex === 0 || suitIndex === 1) {
        cardColor = 'red';
      } else {
        cardColor = 'black';
      }

      let trueRank = rankCounter;
      if (trueRank === 1) {
        trueRank = 14; }

      const card = {
        suitSymbol: icon,
        suit: currentSuit,
        name: cardName,
        displayName: cardDisplayName,
        colour: cardColor,
        rank: trueRank,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const getRandomIndex = (max) => Math.floor(Math.random() * max);

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

deck = shuffleCards(makeDeck());

// function to get DOM element by ID
const getElement = (a) => document.getElementById(`${a}`);

const createCard = (array) => {
  for (let i = 0; i < 5; i += 1) {
    getElement(`card${i}name`).innerHTML = array[i].displayName;
    getElement(`card${i}suit`).innerHTML = array[i].suitSymbol;
    if (array[i].colour === 'red') {
      getElement(`card${i}name`).classList.add('red');
    } else { getElement(`card${i}name`).classList.remove('red'); }
  } };

const squareClick = (cardElement, i) => {
  if (currentGameMode === DEAL_CARD_MODE) {
    getElement('info').innerHTML = 'Deal your cards first';
    rejectSound.play();
  }
  else if (currentGameMode === SWAP_CARD_MODE) {
    const clickedCard = playerHand[i];
    if (selectedHand[i] === 0) {
      selectedHand[i] = 1;
      getElement(`card${i}`).classList.add('cardSelected');
    }
    else if (selectedHand[i] === 1) {
      selectedHand[i] = 0;
      getElement(`card${i}`).classList.remove('cardSelected');
    }
    selectCardSound.play();
    return clickedCard;
  }
};

const buildBoard = () => {
  // start with an empty container
  for (let i = 0; i < 5; i += 1) {
    getElement(`card${i}`).addEventListener('click', (event) => {
      squareClick(event.currentTarget, i);
    });
  }
};
buildBoard();
getElement('music').addEventListener('click', playMusic);

/**
 * A function that sums numbers
 * @param  a {number} number to add together
 * @param  b {number} number to add together
 * @return {number}   a and b added together
 */
calcHandScore = () => {
  let wonCondition = payTable[9];
  if (isOnePair()) {
    console.log('One Pair');
    wonCondition = payTable[8];
  }
  if (isTwoPair()) {
    console.log('Two Pairs');
    wonCondition = payTable[7];
  }
  if (isThreeOfAKind() && !isOnePair()) {
    console.log('Three of a Kind');
    wonCondition = payTable[6];
  }
  if (isStraight() && !isflush()) {
    console.log('Straight');
    wonCondition = payTable[5];
  }
  if (!isStraight() && isflush()) {
    console.log('Flush');
    wonCondition = payTable[4];
  }
  if (isThreeOfAKind() && isOnePair()) {
    console.log('Full House');
    wonCondition = payTable[3];
  }
  if (isFourOfAKind()) {
    console.log('Four of a Kind');
    wonCondition = payTable[2];
  }
  if (isStraight() && isflush() && arrangedHand[4].rank !== 14) {
    console.log('Straight Flush');
    wonCondition = payTable[1];
  }
  if (isStraight() && isflush() && arrangedHand[4].rank === 14) {
    console.log('Royal Flush');
    wonCondition = payTable[0];
  }
  return wonCondition;
};

const deal = () => {
  deck = shuffleCards(makeDeck());
  playerHand = [];
  for (let i = 0; i < 5; i += 1) {
    playerHand.push(deck.pop());
  }
  for (let i = 0; i < 5; i += 1) {
    getElement(`card${i}`).classList.remove('cardLocked');
  }
  // playerHand = FOUR_OF_A_KIND;
  playerHand.sort((a, b) => a.rank - b.rank);
  createCard(playerHand);
  selectedHand = [0, 0, 0, 0, 0];
  cardNameTally = {};
  currentGameMode = SWAP_CARD_MODE;
  openCardSound.play();
  getElement('info').innerHTML = 'Select the cards to swap';
  for (let i = 0; i < 5; i += 1) {
    getElement(`card${i}`).classList.remove('cardSelected');
  }
};

const swap = () => {
  if (currentGameMode === DEAL_CARD_MODE) {
    getElement('info').innerHTML = 'Deal your cards first';
    rejectSound.play();
  }
  else if (currentGameMode === SWAP_CARD_MODE) {
    for (let i = 0; i < 5; i += 1) {
      if (selectedHand[i] === 1) {
        playerHand.splice(i, 1, deck.pop());
        getElement(`card${i}`).classList.remove('cardSelected');
      }
      for (let i = 0; i < 5; i += 1) {
        getElement(`card${i}`).classList.add('cardLocked');
      }
      currentGameMode = DEAL_CARD_MODE;
    }
    swapCardSound.play();
    createCard(playerHand);
    tallyCards(playerHand);
    const winnings = calcHandScore();
    points += winnings.points;
    getElement('info').innerHTML = `Your Hand : ${winnings.combo} <br><br> Points : ${winnings.points}<br><br> Current total wallet : ${points} `;
  }
};

getElement('dealButton').addEventListener('click', deal);
getElement('swapButton').addEventListener('click', swap);

const tallyCards = (hand) => {
  for (let i = 0; i < hand.length; i += 1) {
    const cardName = hand[i].rank;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
};

const isflush = () => {
  // eslint-disable-next-line max-len
  if (playerHand[0].suit === playerHand[1].suit && playerHand[1].suit === playerHand[2].suit && playerHand[2].suit === playerHand[3].suit && playerHand[3].suit === playerHand[4].suit) {
    return true;
  } return false;
};

const isOnePair = () => {
  let pair = 0;
  for (let i = 0; i < 15; i += 1) {
    if (cardNameTally[i] === 2) {
      pair += 1;
    }
  }
  if (pair === 1) {
    return true;
  }
  return false;
};

const isTwoPair = () => {
  let pair = 0;
  for (let i = 0; i < 15; i += 1) {
    if (cardNameTally[i] === 2) {
      pair += 1;
    }
  }
  if (pair === 2) {
    return true;
  }
  return false;
};

const isThreeOfAKind = () => {
  let triple = 0;
  for (let i = 0; i < 15; i += 1) {
    if (cardNameTally[i] === 3) {
      triple += 1;
    }
  }
  if (triple === 1) {
    return true;
  }
  return false;
};

const isFourOfAKind = () => {
  let four = 0;
  for (let i = 0; i < 15; i += 1) {
    if (cardNameTally[i] === 4) {
      four += 1;
    }
  }
  if (four === 1) {
    return true;
  }
  return false;
};

const isStraight = () => {
  arrangedHand = playerHand;
  arrangedHand.sort((a, b) => a.rank - b.rank);
  let testCard = arrangedHand[0];
  let consecutive = 1;
  for (let i = 1; i < 5; i += 1) {
    if ((arrangedHand[i].rank - testCard.rank) === 1) {
      consecutive += 1;
      testCard = arrangedHand[i];
    }
  }
  if (arrangedHand[0].rank === 2 && consecutive === 4 && arrangedHand[4].rank === 14) {
    consecutive += 1;
  }
  if (consecutive === 5) {
    return true;
  } return false;
};
