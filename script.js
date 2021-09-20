// =========================== GLOBAL VARIABLES ===========================
// Variable to keep track of game mode: deal or select
let gameMode = 'deal';

// Variable to help track first game
let numClick = 0;

// Variable for initial number of points
let handPoints = 100;

// Amount that user choose to bet
let betAmount = 0;

// Variable to store cards on hand
let userHands = [];
// const userHands = [
//   { rank: 1, suitSymbol: 'heart', displayName: 'A' },
//   { rank: 10, suitSymbol: 'heart', displayName: '10' },
//   { rank: 11, suitSymbol: 'heart', displayName: 'J' },
//   { rank: 12, suitSymbol: 'heart', displayName: 'Q' },
//   { rank: 13, suitSymbol: 'heart', displayName: 'K' },
// ];

// DOM div to display game instructions
const gameGuide = document.createElement('div');
gameGuide.innerText = 'Place your bet to begin!';

// DOM div to display winning state
const gameInfo = document.createElement('div');
gameInfo.innerText = '';

// DOM div to display remaining credits
const creditDisplay = document.createElement('div');
creditDisplay.innerText = `CREDITS: ${handPoints}`;

// Variable to hold the shuffled deck
let shuffledDeck = [];

// DOM div to display cards on hand
const cardDisplay = document.createElement('div');
cardDisplay.classList.add('card-display');

// =========================== DECK RELATED FUNCTIONS ===========================
const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['❤️', '♦️', '♣️', '♠️'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    let cardColor;
    // make a variable of the current suit
    // eslint-disable-next-line prefer-const
    let currentSuit = suits[suitIndex];

    // Assign color of the card according to the suits.
    if (currentSuit === '❤️' || currentSuit === '♦️') {
      cardColor = 'red';
    } else {
      cardColor = 'black';
    }

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // make a single card object variable
      const card = {
        displayName: cardName,
        suitSymbol: currentSuit,
        rank: rankCounter,
        color: cardColor,
        holdStatus: 'remove',
      };

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 * @param {number} max Maximum number of cards in a deck
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Function that shuffles the deck of cards
 * @param {array} cards Deck of cards
 * @returns Shuffled deck of cards
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

// Create DOM element with card visual
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.color);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  card.addEventListener('click', () => {
    toggleHold(cardInfo);
    if (cardInfo.holdStatus === 'hold') {
      card.classList.add('hold-card');
      card.classList.remove('card');
    } else if (cardInfo.holdStatus === 'remove') {
      card.classList.add('card');
      card.classList.remove('hold-card');
    }
  });

  return card;
};

// =========================== HELPER FUNCTIONS ===========================
// Function to reset game parameters. 1) Empty user hand 2) Shuffle and make avaiable a full deck
const resetParameters = () => {
  userHands = [];
  shuffledDeck = shuffleCards(makeDeck());
};

// Function to deal cards into user hands
const dealCards = (inputDeck) => {
  for (let i = 0; i < 5; i += 1) {
    userHands.push(inputDeck.pop());
  }
};

// Display cards
const displayCards = (inputHand) => {
  for (let i = 0; i < inputHand.length; i += 1) {
    cardDisplay.appendChild(createCard(inputHand[i]));
  }

  document.querySelector('#card-graphic').appendChild(cardDisplay);
};

/**
 * Function that updates game info and credit display
 * @param {string} input Message to appear in the game info div
 * @return {string} Update game info and credit display div with message
 */
const message = (input) => {
  let count = 0;
  gameInfo.innerText = input;
  const blinkMessage = setInterval(() => { gameInfo.style.visibility = (gameInfo.style.visibility === 'hidden' ? '' : 'hidden');
    if ((count += 1) === 6) {
      clearInterval(blinkMessage);
    } }, 1000);

  creditDisplay.innerText = `CREDITS: ${handPoints}`;
};

// Function to toggle hold or remove for the card
const toggleHold = (inputCard) => {
  if (inputCard.holdStatus === 'remove') {
    inputCard.holdStatus = 'hold';
  } else {
    inputCard.holdStatus = 'remove';
  }
};

// Function to check if hand consists of an Ace
const haveAce = (inputHand) => {
  for (let i = 0; i < inputHand.length; i += 1) {
    console.log(`checking through ${i}`);
    if (inputHand[i].displayName === 'A') {
      console.log(`Returning true for ${i}`);
      return true;
    }
  }
  return false;
};

// Function to check if hand is straight cards.
const checkStraight = (inputHand) => {
  const cardRankSorted = [];

  for (let i = 0; i < inputHand.length; i += 1) {
    if (inputHand[i].rank === 1) {
      inputHand[i].rank = 14;
    }
    cardRankSorted.push(inputHand[i].rank);
  }
  cardRankSorted.sort((a, b) => a - b);

  for (let i = 0; i < cardRankSorted.length - 1; i += 1) {
    const d = cardRankSorted[i] - cardRankSorted[i + 1];
    if (Math.abs(d) !== 1) {
      return false;
    }
  }
  return true;
};

// Returns total number of points on hand
const calcHandScore = (inputHand) => {
  const cardNameTally = {};
  const cardSuitTally = {};

  for (let i = 0; i < inputHand.length; i += 1) {
    const cardName = inputHand[i].displayName;
    const cardSuit = inputHand[i].suitSymbol;

    // Tallying the card names
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    else {
      cardNameTally[cardName] = 1;
    }

    // Tallying the suits
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }

  console.log(cardNameTally);
  console.log(cardSuitTally);

  const numCardsName = Object.values(cardNameTally);
  const numCardsSuit = Object.values(cardSuitTally);

  // Helper to compute for 2 pairs
  let numPairs = 0;
  for (let i = 0; i < numCardsName.length; i += 1) {
    if (numCardsName[i] === 2) {
      numPairs += 1;
    }
  }

  // Royal flush
  if (checkStraight(inputHand) && numCardsSuit.includes(5) && haveAce(inputHand)) {
    if (Number(betAmount) === 4) {
      handPoints += (1000 - betAmount);
    }
    else if (Number(betAmount) === 5) {
      handPoints += (4000 - betAmount);
    }
    else {
      handPoints += ((betAmount * 250) - betAmount);
    }

    message('Royal Flush');
    gameGuide.innerText = 'Wow! Luck is by your side! Place your next bet.';
    resetParameters();
  }

  // Straight flush
  else if (checkStraight(inputHand) && numCardsSuit.includes(5)) {
    handPoints += ((betAmount * 50) - betAmount);
    message('Straight Flush');
    gameGuide.innerText = 'Grow your money! Place your next bet.';
    resetParameters();
  }

  // Four of a kind
  else if (numCardsName.includes(4)) {
    handPoints += ((betAmount * 25) - betAmount);
    message('Four of a kind');
    gameGuide.innerText = 'Grow your money! Place your next bet.';
    resetParameters();
  }

  // Full house
  else if (numCardsName.includes(3) && numCardsName.includes(2)) {
    handPoints += ((betAmount * 9) - betAmount);
    gameGuide.innerText = 'Grow your money! Place your next bet.';
    message('Full House');
    resetParameters();
  }

  // Flush
  else if (numCardsSuit.includes(5)) {
    handPoints += ((betAmount * 6) - betAmount);
    gameGuide.innerText = 'Grow your money! Place your next bet.';
    message('Flush');
    resetParameters();
  }

  // Straight
  else if (checkStraight(inputHand)) {
    handPoints += ((betAmount * 4) - betAmount);
    gameGuide.innerText = 'Grow your money! Place your next bet.';
    message('Straight');
    resetParameters();
  }

  // Three of a kind
  else if (numCardsName.includes(3)) {
    handPoints += ((betAmount * 3) - betAmount);
    gameGuide.innerText = 'Grow your money! Place your next bet.';
    message('Three of a kind');
    resetParameters();
  }

  // Two pair
  else if (numPairs === 2) {
    handPoints += ((betAmount * 2) - betAmount);
    gameGuide.innerText = 'Grow your money! Place your next bet.';
    message('Two Pair');
    resetParameters();
  }

  else {
    handPoints -= betAmount;
    message('Lose');
    gameGuide.innerText = 'Better luck next time! Place your next bet.';
    resetParameters();
  }

  // High card
};

// =========================== GAME LOGIC ===========================

/**
 * Function that gets user input for the amount to bet
 * @return Updates bet amount to user input
 */
const getBetAmountAndDeal = (inputShuffledDeck) => {
  const betInput = document.createElement('select');
  betInput.addEventListener('change', () => {
    document.querySelectorAll('[id^="bet"]').forEach((el) => {
      el.classList.remove('highlight-column');
    });

    if (Number(betInput.value) === 1) {
      document.querySelectorAll('#bet1').forEach((el) => {
        el.classList.add('highlight-column');
      });
    }
    else if (Number(betInput.value) === 2) {
      document.querySelectorAll('#bet2').forEach((el) => {
        el.classList.add('highlight-column');
      });
    }
    else if (Number(betInput.value) === 3) {
      document.querySelectorAll('#bet3').forEach((el) => {
        el.classList.add('highlight-column');
      });
    }
    else if (Number(betInput.value) === 4) {
      document.querySelectorAll('#bet4').forEach((el) => {
        el.classList.add('highlight-column');
      });
    }
    else if (Number(betInput.value) === 5) {
      document.querySelectorAll('#bet5').forEach((el) => {
        el.classList.add('highlight-column');
      });
    }
  });

  for (let i = 0; i <= 5; i += 1) {
    const betOption = document.createElement('option');
    betOption.value = Number(i);
    if (i === 0) {
      betOption.innerText = 'Bet Amount:';
    } else {
      betOption.innerText = Number(i);
    }
    betInput.appendChild(betOption);
  }

  const dealButton = document.createElement('button');
  dealButton.innerText = 'Deal / Submit';
  dealButton.addEventListener('click', () => {
    if (gameMode === 'deal' && numClick === 0) {
      betAmount = betInput.value;
      dealCards(inputShuffledDeck);
      displayCards(userHands);
      gameGuide.innerText = 'Select the cards that you want to hold.';
      gameInfo.innerText = '';
      gameMode = 'select';
    }
    else if (gameMode === 'deal' && numClick >= 1) {
      betAmount = betInput.value;
      dealCards(inputShuffledDeck);
      cardDisplay.innerHTML = '';
      displayCards(userHands);
      gameGuide.innerText = 'Select the cards that you want to hold.';
      gameInfo.innerText = '';
      gameMode = 'select';
    }
    else if (gameMode === 'select') {
      for (let i = 0; i < userHands.length; i += 1) {
        if (userHands[i].holdStatus === 'remove') {
          userHands[i] = shuffledDeck.pop();
        }
      }
      numClick += 1;
      cardDisplay.innerHTML = '';
      displayCards(userHands);
      calcHandScore(userHands);
      gameMode = 'deal';
    }
  });

  document.querySelector('#game-instructions').appendChild(gameGuide);
  document.querySelector('#bet-amount').appendChild(betInput);
  document.querySelector('#bet-amount').appendChild(dealButton);

  document.querySelector('#credits-bet').appendChild(creditDisplay);
};

// =========================== GAME INITIALISATION ===========================
const gameInit = () => {
  shuffledDeck = shuffleCards(makeDeck());
  getBetAmountAndDeal(shuffledDeck);
  document.querySelector('#game-message').appendChild(gameInfo);
};

gameInit();
