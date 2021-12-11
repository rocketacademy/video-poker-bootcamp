let board = [];
let deck;
let credit = 100;
let bet = 0;

const NUMBER_OF_CARDS = 5;
const MAX_BET = 5;
const MAX_MULTIPLIER = 40;

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
 */
const updateCredits = (score) => {
  console.log(`pre credit: ${credit}`);
  credit += score;
  console.log(`bet: ${bet} score: ${score}`);
  console.log(`new credit: ${credit}`);

  const credits = document.querySelector('.credits');
  credits.innerText = `Credits: ${credit}`;
};

/**
 * Update bets.
 * @param {*} newBet
 */
const updateBets = (newBet) => {
  bet += newBet;
  const bets = document.querySelector('.bets');
  bets.innerText = `Bet: ${bet}`;
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
  return (rankKeys.length === 4)
  && (((cardTally.ranks[rankKeys[0]] === 2) && ((rankKeys[0] >= 11) || (rankKeys[0] === 1)))
    || ((cardTally.ranks[rankKeys[1]] === 2) && ((rankKeys[1] >= 11) || (rankKeys[1] === 1)))
    || ((cardTally.ranks[rankKeys[2]] === 2) && ((rankKeys[2] >= 11) || (rankKeys[2] === 1)))
    || ((cardTally.ranks[rankKeys[3]] === 2) && ((rankKeys[3] >= 11) || (rankKeys[3] === 1))));
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

  rankKeys = rankKeys.map(Number).sort((a, b) => a - b);
  for (let i = 1; i < rankKeys.length; i += 1) {
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
  return isStraightFlush(cardTally)
    && ((rankKeys[0] >= 10) || (rankKeys[0] === 1))
    && ((rankKeys[1] >= 10) || (rankKeys[1] === 1))
    && ((rankKeys[2] >= 10) || (rankKeys[2] === 1))
    && ((rankKeys[3] >= 10) || (rankKeys[3] === 1))
    && ((rankKeys[4] >= 10) || (rankKeys[4] === 1));
};

/**
 * Calculate score for the cards in hand.
 * @param {*} cards Array of card objects
 * @param {*} gameBet Current game bet
 * @returns Number of points that the user scored for the cards in their hand
 */
const calcHandScore = (cards, gameBet) => {
  const cardTally = tallyCards(cards);

  if (isRoyalFlush(cardTally)) {
    return SCORES.ROYAL_FLUSH * ((gameBet === MAX_BET) ? MAX_MULTIPLIER : MAX_BET);
  }
  if (isStraightFlush(cardTally)) return SCORES.STRAIGHT_FLUSH * gameBet;
  if (isFourOfAKind(cardTally)) return SCORES.FOUR_OF_A_KIND * gameBet;
  if (isFullHouse(cardTally)) return SCORES.FULL_HOUSE * gameBet;
  if (isFlush(cardTally)) return SCORES.FLUSH * gameBet;
  if (isStraight(cardTally)) return SCORES.STRAIGHT * gameBet;
  if (isThreeOfAKind(cardTally)) return SCORES.THREE_OF_A_KIND * gameBet;
  if (isTwoPair(cardTally)) return SCORES.TWO_PAIR * gameBet;
  if (isOnePair(cardTally)) return SCORES.JACKS_OR_BETTER * gameBet;

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

  // calculate hand score and update credits
  updateCredits(calcHandScore(board, bet));

  updateBets(-1 * bet);
};

module.exports = calcHandScore;

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

  // add area for credits
  const creditsElement = document.createElement('div');
  creditsElement.classList.add('credits');
  creditsElement.innerText = `Credits: ${credit}`;
  boardElement.appendChild(creditsElement);

  // add area for bets
  const betsElement = document.createElement('div');
  betsElement.classList.add('bets');
  betsElement.innerText = `Bet: ${bet}`;
  boardElement.appendChild(betsElement);

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

  // add area for buttons
  const buttonsElement = document.createElement('div');
  buttonsElement.classList.add('buttons');

  // add bet button
  const betButtonElement = document.createElement('button');
  betButtonElement.innerText = 'BET';
  betButtonElement.classList.add('button');
  betButtonElement.addEventListener('click', () => {
    updateCredits(-1);
    updateBets(1);
  });
  buttonsElement.appendChild(betButtonElement);

  // add deal game button
  const dealButtonElement = document.createElement('button');
  dealButtonElement.innerText = 'DEAL';
  dealButtonElement.classList.add('button');
  dealButtonElement.addEventListener('click', () => dealCards(cardsElement.children));
  buttonsElement.appendChild(dealButtonElement);

  // add draw game button
  const drawButtonElement = document.createElement('button');
  drawButtonElement.innerText = 'DRAW';
  drawButtonElement.classList.add('button');
  drawButtonElement.addEventListener('click', () => drawCards(cardsElement.children));
  buttonsElement.appendChild(drawButtonElement);

  boardElement.appendChild(buttonsElement);

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
