const SCORES = {
  ROYAL_FLUSH: 250,
  STRAIGHT_FLUSH: 50,
  FOUR_OF_A_KIND: 25,
  FULL_HOUSE: 9,
  FLUSH: 6,
  STRAIGHT: 4,
  THREE_OF_A_KIND: 3,
  TWO_PAIR: 2,
  ONE_PAIR: 1,
};

let board = [];
let deck;
let credit = 100;
let bet = 0;

const NUMBER_OF_CARDS = 5;
const MAX_BET = 5;
const MAX_MULTIPLIER = 16;
const MIN_RANK_FOR_ONE_PAIR = 11; // jack or higher

const DELAY_IN_MILLI_SECONDS = 150;

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
 * Update credits after a game.
 * @param {*} creditChange Change of credit
 */
const updateCredits = (creditChange) => {
  const credits = document.querySelector('.credits');

  if (creditChange > 0) {
    const newCredit = credit + creditChange;
    let addCredit = 0;
    const creditId = setInterval(() => {
      if (credit === newCredit) {
        clearInterval(creditId);
      } else {
        credit += 1;
        addCredit += 1;
        credits.innerText = `Credits:${credit} Win:${addCredit}`;
      }
    }, DELAY_IN_MILLI_SECONDS);
  } else {
    credit += creditChange;
    credits.innerText = `Credits:${credit}`;
  }
};

/**
 * Calculate winnings based on score and bet.
 * @param {*} score Score of hand
 * @param {*} gameBet Bet placed for game
 */
const calcWinnings = (score, gameBet) => {
  let winCredits = gameBet;

  // special extra winnings if player gets royal flush and bets max
  if (score === SCORES.ROYAL_FLUSH) {
    winCredits = (gameBet === MAX_BET) ? MAX_MULTIPLIER : gameBet;
  }

  return score * winCredits;
};

/**
 * Update bets.
 * @param {*} newBet
 */
const updateBets = (newBet) => {
  bet += newBet;
  const bets = document.querySelector('.bets');
  bets.innerText = `Bet:${bet}`;
};

/**
 * Hold selected card.
 * @param {*} cardElement Card selected
 * @param {*} index
 */
const holdCard = (cardElement) => {
  if (cardElement.classList.contains('held')) {
    cardElement.classList.remove('held');
  } else {
    cardElement.classList.add('held');
  }
};

/**
 * Handle card click
 * @param {*} cardElement Card
 */
const cardClick = (cardElement) => {
  holdCard(cardElement);
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

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/**
 * Tally the occurence of cards in hand.
 * @param {*} cards Cards in hand
 * @returns Object that contains card rank tally and card suit tally.
 */
const tallyCards = (cards) => {
  // Create Object as tally
  const cardRankTally = {};
  const cardSuitTally = {};

  // Loop over hand
  for (let i = 0; i < cards.length; i += 1) {
    const cardRank = cards[i].rank;
    const cardSuit = cards[i].suit;

    // If we have seen the card rank before, increment its count
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    } else {
      // Else, initialise count of this card rank to 1
      cardRankTally[cardRank] = 1;
    }

    // If we have seen the card suit before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    } else {
      // Else, initialise count of this card suit to 1
      cardSuitTally[cardSuit] = 1;
    }
  }

  return { ranks: cardRankTally, suits: cardSuitTally };
};

/**
 * Check if there is one pair in hand.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is one pair. False, otherwise.
 */
const isOnePair = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);

  if (rankKeys.length !== 4) return false;

  // check for pairs
  for (let i = 0; i < rankKeys.length; i += 1) {
    const rank = 1 * rankKeys[i];
    if ((cardTally.ranks[rank] === 2)
      && ((rank >= MIN_RANK_FOR_ONE_PAIR) || rank === 1)) return true;
  }

  return false;
};

/**
 * Check if there is two pair in hand.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is two pair. False, otherwise.
 */
const isTwoPair = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 3)
  && (((cardTally.ranks[rankKeys[0]] === 2) && (cardTally.ranks[rankKeys[1]] === 2))
    || ((cardTally.ranks[rankKeys[0]] === 2) && (cardTally.ranks[rankKeys[2]] === 2))
    || ((cardTally.ranks[rankKeys[1]] === 2) && (cardTally.ranks[rankKeys[2]] === 2)));
};

/**
 * Check if there is a three of a kind in hand.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a three of a kind. False, otherwise.
 */
const isThreeOfAKind = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 3)
    && ((cardTally.ranks[rankKeys[0]] === 3) || (cardTally.ranks[rankKeys[1]] === 3));
};

/**
 * Check if the cards in hand make a flush.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a flush. False, otherwise.
 */
const isFlush = (cardTally) => (Object.keys(cardTally.suits).length === 1);

/**
 * Check if the cards in hand make a straight.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a straight. False, otherwise.
 */
const isStraight = (cardTally) => {
  let rankKeys = Object.keys(cardTally.ranks);
  if (rankKeys.length !== 5) return false;

  // sort rank keys array to compare each values
  rankKeys = rankKeys.map(Number).sort((a, b) => a - b);

  // special case of straight to ace
  if (JSON.stringify(rankKeys) === JSON.stringify([1, 10, 11, 12, 13])) return true;

  for (let i = 1; i < rankKeys.length; i += 1) {
    // compare current value and previous value to confirm consecutive numbers
    if ((rankKeys[i] - rankKeys[i - 1]) !== 1) return false;
  }

  return true;
};

/**
 * Check if the cards in hand make a full house.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a full house. False, otherwise.
 */
const isFullHouse = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 2)
    && ((cardTally.ranks[rankKeys[0]] === 3) || (cardTally.ranks[rankKeys[1]] === 3));
};

/**
 * Check if there is a four of a kind in hand.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a four of a kind. False, otherwise.
 */
const isFourOfAKind = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);
  return (rankKeys.length === 2)
    && ((cardTally.ranks[rankKeys[0]] === 4) || (cardTally.ranks[rankKeys[1]] === 4));
};

/**
 * Check if the cards in hand make a straight flush.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a straight flush. False, otherwise.
 */
const isStraightFlush = (cardTally) => isStraight(cardTally) && isFlush(cardTally);

/**
 * Check if the cards in hand make a royal flush.
 * @param {*} cardTally Tally of cards in hand
 * @returns True, if there is a royal flush. False, otherwise.
 */
const isRoyalFlush = (cardTally) => {
  const rankKeys = Object.keys(cardTally.ranks);

  // royal flush hand is also a straight flush
  if (!isStraightFlush(cardTally)) return false;

  // check hand is straight flush with 10, jack, queen, king, ace
  for (let i = 0; i < rankKeys.length; i += 1) {
    const rank = 1 * rankKeys[i];
    if ((rank < 10) && (rank !== 1)) return false;
  }

  return true;
};

/**
 * Calculate score for the cards in hand.
 * @param {*} cards Array of card objects
 * @returns Number of points that the user scored for the cards in their hand
 */
const calcHandScore = (cards) => {
  const cardTally = tallyCards(cards);

  if (isRoyalFlush(cardTally)) return SCORES.ROYAL_FLUSH;
  if (isStraightFlush(cardTally)) return SCORES.STRAIGHT_FLUSH;
  if (isFourOfAKind(cardTally)) return SCORES.FOUR_OF_A_KIND;
  if (isFullHouse(cardTally)) return SCORES.FULL_HOUSE;
  if (isFlush(cardTally)) return SCORES.FLUSH;
  if (isStraight(cardTally)) return SCORES.STRAIGHT;
  if (isThreeOfAKind(cardTally)) return SCORES.THREE_OF_A_KIND;
  if (isTwoPair(cardTally)) return SCORES.TWO_PAIR;
  if (isOnePair(cardTally)) return SCORES.ONE_PAIR;

  return 0;
};

/**
 * Handle deal button click with dealing cards.
 * @param {*} cardElements Cards on hand
 */
const dealCards = (cardElements) => {
  board = [];
  deck = shuffleCards(makeDeck());

  for (let j = 0; j < NUMBER_OF_CARDS; j += 1) {
    board.push(deck.pop());
    revealCard(cardElements[j], board[j]);
  }
};

/**
 * Handle draw button click by replacing cards not held.
 * @param {*} cardElements Cards on hand
 */
const drawCards = (cardElements) => {
  for (let i = 0; i < cardElements.length; i += 1) {
    if (!cardElements[i].classList.contains('held')) {
      board[i] = deck.pop();
      revealCard(cardElements[i], board[i]);
    } else {
      cardElements[i].classList.remove('held');
    }
  }

  // calculate hand score, winnings, and update credits
  const score = calcHandScore(board);
  const winnings = calcWinnings(score, bet);
  updateCredits(winnings);

  // reset bet
  updateBets(-1 * bet);
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

  // add area for score guide
  const scoreGuideElement = document.createElement('div');
  scoreGuideElement.classList.add('nes-container');
  scoreGuideElement.classList.add('is-dark');
  scoreGuideElement.classList.add('with-title');

  // score guide title
  const scoreGuideTitleElement = document.createElement('p');
  scoreGuideTitleElement.classList.add('title');
  scoreGuideTitleElement.innerText = 'SCORE GUIDE';
  scoreGuideElement.appendChild(scoreGuideTitleElement);

  // score guide content
  const scoreGuideContentElement = document.createElement('p');
  scoreGuideContentElement.innerText = 'Guide';
  scoreGuideElement.appendChild(scoreGuideContentElement);

  boardElement.appendChild(scoreGuideElement);

  // make an element for the cards
  const cardsElement = document.createElement('div');
  cardsElement.classList.add('cards');

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
      cardClick(event.currentTarget);
    });

    cardsElement.appendChild(card);
  }

  boardElement.appendChild(cardsElement);

  // add area for credits
  const creditsElement = document.createElement('div');
  creditsElement.classList.add('credits');
  creditsElement.innerText = `Credits:${credit}`;
  boardElement.appendChild(creditsElement);

  // add area for bets
  const betsElement = document.createElement('div');
  betsElement.classList.add('bets');
  betsElement.innerText = `Bet:${bet}`;
  boardElement.appendChild(betsElement);

  // add area for buttons
  const buttonsElement = document.createElement('div');
  buttonsElement.classList.add('buttons');

  // add bet button
  const betButtonElement = document.createElement('button');
  betButtonElement.innerText = 'BET';
  betButtonElement.classList.add('nes-btn');
  betButtonElement.addEventListener('click', () => {
    updateCredits(-1);
    updateBets(1);
  });
  buttonsElement.appendChild(betButtonElement);

  // add bet max button
  const betMaxButtonElement = document.createElement('button');
  betMaxButtonElement.innerText = `BET ${MAX_BET}`;
  betMaxButtonElement.classList.add('nes-btn');
  betMaxButtonElement.addEventListener('click', () => {
    updateCredits(-1 * MAX_BET);
    updateBets(MAX_BET);
  });
  buttonsElement.appendChild(betMaxButtonElement);

  // add deal game button
  const dealButtonElement = document.createElement('button');
  dealButtonElement.innerText = 'DEAL';
  dealButtonElement.classList.add('nes-btn');
  dealButtonElement.addEventListener('click', () => {
    updateCredits(0);
    dealCards(cardsElement.children);
  });
  buttonsElement.appendChild(dealButtonElement);

  // add draw game button
  const drawButtonElement = document.createElement('button');
  drawButtonElement.innerText = 'DRAW';
  drawButtonElement.classList.add('nes-btn');
  drawButtonElement.addEventListener('click', () => drawCards(cardsElement.children));
  buttonsElement.appendChild(drawButtonElement);

  boardElement.appendChild(buttonsElement);

  // add area for state of game information
  const stateOfGameElement = document.createElement('div');
  stateOfGameElement.classList.add('game-state');
  stateOfGameElement.innerText = 'Click BET button to start.';
  boardElement.appendChild(stateOfGameElement);

  return boardElement;
};

/**
 * Initialize game.
 */
const initGame = () => {
  const boardEl = buildBoardElements(board);
  document.body.appendChild(boardEl);
};

initGame();

/**
 * This module.exports is needed to run unit tests.
 * This causes a 'Uncaught ReferenceError: module is not defined'
 * in the browser but it doesn't stop the web app from working.
 */
module.exports = { calcHandScore, calcWinnings };
