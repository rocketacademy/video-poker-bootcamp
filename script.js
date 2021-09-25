// ##### Global Variable ##### //
// ########################### //

let deck;
let playerHand = [];
let selectedHand = [0, 0, 0, 0, 0];
let arrangedHand = [];
let points = 100;
const GAME_INFO_MODE = 'Game Info Mode';
const DEAL_CARD_MODE = 'Deal Card Mode';
const SWAP_CARD_MODE = 'Swap Card Mode';
let currentGameMode = GAME_INFO_MODE;
let cardNameTally = {};
let musicOn = false;
const payTable = [
  { combo: 'Royal Flush', image: './images/ROYAL_FLUSH.png', points: 250 },
  { combo: 'Straight Flush', image: './images/STRAIGHT_FLUSH.png', points: 50 },
  { combo: 'Four of a Kind', image: './images/FOUR_OF_A_KIND.png', points: 25 },
  { combo: 'Full House', image: './images/FULL_HOUSE.png', points: 9 },
  { combo: 'Flush', image: './images/FLUSH.png', points: 6 },
  { combo: 'Straight', image: './images/STRAIGHT.png', points: 4 },
  { combo: 'Three of a Kind', image: './images/THREE_OF_A_KIND.png', points: 3 },
  { combo: 'Two Pairs', image: './images/TWO_PAIR.png', points: 2 },
  { combo: 'One Pair', image: './images/ONE_PAIR.png', points: 1 },
  { combo: 'Empty', image: './images/EMPTY.png', points: -1 },
];

// ##### Defining Sounds ##### //
// ########################### //

const openCardSound = new Audio('./sounds/cardPlace4.wav');
const swapCardSound = new Audio('./sounds/cardSlide7.wav');
const selectCardSound = new Audio('./sounds/cardPlace1.wav');
const rejectSound = new Audio('./sounds/reject.wav');
const backgroundSound = new Audio('./sounds/Harmonies.mp3');
backgroundSound.volume = 0.2;
backgroundSound.loop = true;

// ##### Helper Functions ##### //
// ########################### //

// function to turn on and off the music
const playMusic = () => {
  if (musicOn === false) {
    backgroundSound.play();
    musicOn = true;
    getElement('music').src = './images/music.png';
  }
  else if (musicOn === true) {
    backgroundSound.pause();
    musicOn = false;
    getElement('music').src = './images/musicOff.png';
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

// function to shuffle the cards in the deck
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

// function to get DOM element by ID
const getElement = (a) => document.getElementById(`${a}`);

// function to run through the player's hand and display in UI
const createCard = (array) => {
  for (let i = 0; i < 5; i += 1) {
    getElement(`card${i}name`).innerHTML = array[i].displayName;
    if (array[i].suit === 'clubs') {
      getElement(`card${i}suit`).src = './images/1clubs.png';
    }
    if (array[i].suit === 'hearts') {
      getElement(`card${i}suit`).src = './images/1hearts.png';
    }
    if (array[i].suit === 'spades') {
      getElement(`card${i}suit`).src = './images/1spades.png';
    }
    if (array[i].suit === 'diamonds') {
      getElement(`card${i}suit`).src = './images/1diamonds.png';
    }
    if (array[i].colour === 'red') {
      getElement(`card${i}name`).classList.remove('black');
      getElement(`card${i}name`).classList.add('red');
    } else {
      getElement(`card${i}name`).classList.remove('red');
      getElement(`card${i}name`).classList.add('black'); }
  } };

// function that to embed in the card display to enable select / un-select
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

/**
 * A function that sums numbers
 * @param  a {number} number to add together
 * @param  b {number} number to add together
 * @return {number}   a and b added together
 */
// function to calculate the "combo" of player's hand based various payout conditions
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

// function to carry out when user clicks on deal button
const deal = () => {
  if (currentGameMode === SWAP_CARD_MODE) {
    getElement('info').innerHTML = 'Select the cards to swap';
    rejectSound.play();
  }
  if (currentGameMode === DEAL_CARD_MODE) {
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
  }
};

// function that carries out the backend when user swaps cards
// includes the calculation of payout
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
    getElement('info').innerHTML = `Your Hand : ${winnings.combo} <br><br> Points : ${winnings.points}`;
    getElement('yourPoints').innerHTML = `Your Wallet: ${points}`;
  }
};

// function to help tally the player's hand in order to help check payout conditions
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

// #### booleans to check the various card combinations ####
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

const buildBoard = () => {
  // start with an empty container
  const main = document.createElement('div');
  main.classList.add('main');
  main.setAttribute('id', 'main');
  document.body.appendChild(main);

  const header1 = document.createElement('h1');
  header1.innerHTML = 'Video Poker';
  main.appendChild(header1);

  const cardContainer = document.createElement('div');
  cardContainer.classList.add('board');
  main.appendChild(cardContainer);

  for (let i = 0; i < 5; i += 1) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('id', `card${i}`);

    const name = document.createElement('div');
    name.classList.add('name');
    name.setAttribute('id', `card${i}name`);

    const suit = document.createElement('img');
    suit.classList.add('suit');
    suit.setAttribute('id', `card${i}suit`);

    card.appendChild(name);
    card.appendChild(suit);
    cardContainer.appendChild(card);

    card.addEventListener('click', (event) => {
      squareClick(event.currentTarget, i);
    });
  }

  const controlsContainer = document.createElement('div');
  controlsContainer.classList.add('board');
  main.appendChild(controlsContainer);

  const dealButton = document.createElement('button');
  dealButton.classList.add('button-81');
  dealButton.innerHTML = 'Deal';
  controlsContainer.appendChild(dealButton);

  const swapButton = document.createElement('button');
  swapButton.classList.add('button-81');
  swapButton.innerHTML = 'Swap/Done';
  controlsContainer.appendChild(swapButton);

  const musicButton = document.createElement('img');
  musicButton.setAttribute('id', 'music');
  musicButton.src = './images/musicOff.png';
  controlsContainer.appendChild(musicButton);

  dealButton.addEventListener('click', deal);
  swapButton.addEventListener('click', swap);
  musicButton.addEventListener('click', playMusic);

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('board');
  messageContainer.setAttribute('id', 'infoContainer');
  main.appendChild(messageContainer);

  const gameMessage = document.createElement('div');
  gameMessage.classList.add('info');
  gameMessage.classList.add('board');
  gameMessage.setAttribute('id', 'info');
  gameMessage.innerHTML = 'Your starting wallet is 100';
  messageContainer.appendChild(gameMessage);

  const pointsTracker = document.createElement('div');
  pointsTracker.classList.add('pointsContainer');
  main.appendChild(pointsTracker);

  const yourPoints = document.createElement('div');
  yourPoints.setAttribute('id', 'yourPoints');
  yourPoints.innerHTML = 'Your Wallet:    100';
  pointsTracker.appendChild(yourPoints);

  const header2 = document.createElement('h2');
  header2.innerHTML = 'Payout Table';
  main.appendChild(header2);

  const table = document.createElement('table');
  table.classList.add('rwd-table');
  main.appendChild(table);

  const tableBody = document.createElement('tbody');
  table.appendChild(tableBody);

  const row1 = document.createElement('tr');
  tableBody.appendChild(row1);

  const item1 = document.createElement('th');
  row1.appendChild(item1);
  item1.innerHTML = 'Name';

  const item2 = document.createElement('th');
  row1.appendChild(item2);
  item2.innerHTML = 'Example';

  const item3 = document.createElement('th');
  row1.appendChild(item3);
  item3.innerHTML = 'Payout';

  for (let i = 0; i < payTable.length; i += 1) {
    const row = document.createElement('tr');
    tableBody.appendChild(row);

    const col1 = document.createElement('td');
    row.appendChild(col1);
    col1.innerHTML = `${payTable[i].combo}`;

    const col2 = document.createElement('td');
    row.appendChild(col2);
    const img = document.createElement('img');
    img.classList.add('payoutExampleImg');
    img.src = `${payTable[i].image}`;
    col2.appendChild(img);

    const col3 = document.createElement('td');
    row.appendChild(col3);
    col3.innerHTML = `${payTable[i].points}`;
    col3.setAttribute('style', 'text-align: center');
  }
};

// ######### DOM functions ######### //
// #################################//

const initGame = () => {
  startGame.innerHTML = '';
  buildBoard();
  currentGameMode = DEAL_CARD_MODE;
  playMusic();
};

const buildIntro = () => {
  const startGame = document.createElement('div');
  startGame.setAttribute('id', 'startGame');
  document.body.appendChild(startGame);

  const header1 = document.createElement('h1');
  header1.innerHTML = 'Video Poker';
  startGame.appendChild(header1);

  const hello = document.createElement('div');
  hello.classList.add('welcome');
  hello.innerHTML = "Welcome to Eric's Video Poker";
  startGame.appendChild(hello);

  const housegif = document.createElement('div');
  housegif.setAttribute('style', 'text-align: center');
  startGame.appendChild(housegif);

  const gif = document.createElement('img');
  gif.setAttribute('id', 'whale');
  gif.src = './images/whale.gif';
  housegif.appendChild(gif);
  gif.addEventListener('click', initGame);

  const container = document.createElement('div');
  container.setAttribute('style', 'text-align: center');
  startGame.appendChild(container);

  const gamePlay = document.createElement('div');
  gamePlay.classList.add('gamePlay');
  gamePlay.innerHTML = `♤ You start with 100 points. <br><br>
♤ When you click the "Deal" button, you will be dealt a hand of 5 cards. <br><br>♤ You can choose any number of your cards to replace with new, random cards.<br><br>♤ Once the cards are swapped, you will be assigned a payout based on the resulting hand. <br><br>♤  Click on the Whale to start the game!`;
  container.appendChild(gamePlay);
};

buildIntro();
