/* eslint-disable prefer-const */
/** GLOBAL VARIABLES */
let suit1 = '';
let name1 = '';
let credits = 100;
let playerCard = '';
let handScore = 0;
let bet = 0;
let currentGameMode = 'input bet';
const playerHand = [
  {
    name: 'queen',
    rank: 12,
    suit: 'hearts',
  },
  {
    name: '7',
    rank: 7,
    suit: 'diamonds',
  },
  {
    name: '3',
    rank: 3,
    suit: 'spades',
  },
  {
    name: '10',
    rank: 10,
    suit: 'spades',
  },
  {
    name: '5',
    rank: 5,
    suit: 'clubs',
  },
];

let royalFlush;
let straightFlush;
let fourOfAKind;
let fullHouse;
let flush;
let straight;
let threeOfAKind;
let twoPairs;
let onePair;
let highCard;

/** CREATION OF ELEMENTS */
const gameInfo = document.createElement('div');
const winningInfo = document.createElement('table');
const creditsInfo = document.createElement('div');
creditsInfo.innerText = credits;
const betInputField = document.createElement('input');
betInputField.className = 'betinputfield';
const submitButton = document.createElement('button');
submitButton.innerText = 'Submit / Deal Cards';

const cardTable = document.createElement('div');
cardTable.className = 'cardtable';

/** HELPER FUNCTIONS */

/** Function to get random index ranging from 0 (inclusive) to max (exclusive)
 * @param max - max number
*/
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/** Function to shuffle cards
 * @param cards - array of cards
 */
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

/** Function to make card deck */
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
      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(card);
    }
  }
  // Return the completed card deck
  return newDeck;
};

const deck = shuffleCards(makeDeck());

/** Function to output message */
const output = (message) => {
  gameInfo.innerText = message;
};
/** Function to create card element */
const createCardImage = () => {
  // let suit1 = playerCard.suit;
  // let name1 = playerCard.name;
  const cardImage = document.createElement('img');
  cardImage.src = `../video-poker-bootcamp/media/${suit1}-${name1}.png`;
  cardImage.alt = `${name1} of ${suit1}`;
  cardImage.classList.add('cardfront');
  return cardImage;
};

/** Function to check winning conditions with same card suit or sequential increase */
/** which includes royal flush, straight flush, flush, straight */
const checkSameCardSuits = () => {
  playerHand.sort((a, b) => a.rank - b.rank);
  let cardSuitTally = {};
  let seqCount = 0;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 === playerHand[i + 1].rank) {
      seqCount += 1;
    }
  }
  console.log('seq count');
  console.log(seqCount);

  for (let i = 0; i < playerHand.length; i += 1) {
    let cardSuit = playerHand[i].suit;
    // If we have seen the card suit before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card suit to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  let suitArray = Array.from(Object.values(cardSuitTally));
  suitArray.sort((a, b) => a - b);
  console.log('card suit tally values');
  console.log(suitArray);
  if (suitArray[suitArray.length - 1] === 5) {
    if (seqCount === 4) {
      straightFlush = true;
      return straightFlush;
    } if (seqCount === 3 && playerHand[0].rank === 1) {
      royalFlush = true;
      return royalFlush;
    }
    flush = true;
    return flush;
  } if (suitArray[suitArray.length - 1] < 5 && seqCount === 4) {
    straight = true;
    return straight;
  }
};

/** Function to check winning conditions with sequential cards */

/** Function to check winning conditions with same card name */
/** which includes four of a kind, three of a kind, full house, two pairs, one pair */
const checkSameCardNames = () => {
  let cardNameTally = {};

  for (let i = 0; i < playerHand.length; i += 1) {
    let cardName = playerHand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  let nameArray = Array.from(Object.values(cardNameTally));
  nameArray.sort((a, b) => a - b);
  console.log('card name tally values');
  console.log(nameArray);

  if (nameArray[nameArray.length - 1] === 4) {
    fourOfAKind = true;
    return fourOfAKind;
  } if (nameArray[nameArray.length - 1] === 3 && nameArray[nameArray.length - 2] === 2) {
    fullHouse = true;
    return fullHouse;
  } if (nameArray[nameArray.length - 1] === 3) {
    threeOfAKind = true;
  } else if (nameArray[nameArray.length - 1] === 2 && nameArray[nameArray.length - 2] === 2) {
    twoPairs = true;
    return twoPairs;
  } else if (nameArray[nameArray.length - 1] === 2) {
    onePair = true;
    return onePair;
  } else {
    console.log('card name tally value is 1');
  }
};

/** Function to check high card */
const checkHighCard = () => {
  /** check high card */
  for (let i = 0; i < 5; i += 1) {
    if (playerHand[i].rank > 10) {
      highCard = true;
    }
  }
};

// /** Function to check hand */
const calcHandScore = () => {
  checkSameCardNames();
  checkSameCardSuits();
  checkHighCard();
  if (royalFlush) {
    console.log('royal flush');
    handScore = bet * 30;
  } else if (straightFlush) {
    console.log('straight flush');
    handScore = bet * 25;
  } else if (fourOfAKind) {
    console.log('four of a kind');
    handScore = bet * 20;
  } else if (fullHouse) {
    console.log('full house');
    handScore = bet * 15;
  } else if (flush) {
    console.log('flush');
    handScore = bet * 10;
  } else if (straight) {
    console.log('straight');
    handScore = bet * 8;
  } else if (threeOfAKind) {
    console.log('three of a kind');
    handScore = bet * 6;
  } else if (twoPairs) {
    console.log('two pairs');
    handScore = bet * 4;
  } else if (onePair) {
    console.log('one pair');
    handScore = bet * 2;
  } else if (highCard) {
    console.log('high card');
    handScore = bet * 1;
  }
};

/** PLAYER ACTION FUNCTION */
const playerClick = () => {
  /** if current game mode is input bet */
  if (currentGameMode === 'input bet') {
    let betInput = betInputField.value;
    /** check if bet input is valid */
    if (betInput === '' || isNaN(betInput)) {
      output('You gotta type a number!');
    } else if (betInput !== '') {
      currentGameMode = 'deal cards';
      bet = betInput;
      output(`You bet ${bet} credits. Click the 'Submit / Deal Cards' button again to deal cards!`);
    }
  } else if (currentGameMode === 'deal cards') {
    /** draw cards */
    for (let i = 0; i < 5; i += 1) {
      // playerCard = deck.pop();
      // playerHand.push(playerCard);
      playerCard = playerHand[i];
      const cardBoxElement = document.createElement('div');
      cardBoxElement.classList.add('cardboxelement');
      cardBoxElement.id = `cardBox${i}`;
      const holdMessageBox = document.createElement('div');
      holdMessageBox.classList.add('holdmessagebox');
      holdMessageBox.text = '';
      suit1 = playerHand[i].suit;
      name1 = playerHand[i].name;
      const cardElement = createCardImage();
      cardBoxElement.appendChild(holdMessageBox);
      cardBoxElement.appendChild(cardElement);
      cardTable.appendChild(cardBoxElement);
    }
    output('Now click on the cards you want to hold, and click the \'Submit / Deal Cards\' button again to re-draw the rest!');
    calcHandScore();
    console.log(handScore);
    currentGameMode = 'choose hold';
  }
};

/** GAME INITIALISATION */
const initGame = () => {
  /** game instructions */
  output('Welcome to Video Poker Game!');
  document.body.appendChild(gameInfo);

  document.body.appendChild(cardTable);

  document.body.appendChild(betInputField);
  document.body.appendChild(submitButton);
  document.body.appendChild(creditsInfo);
  submitButton.addEventListener('click', playerClick);
};

initGame();
