/**
 * HAND CHECKING AND CREATION HELPER FUNCTIONS
 *
 */

/**
 * Draws first 5 cards in SHOW_INITIAL_HAND game state
 * Updates UI in DOM to show cards
 * Add click event listeners on all cards for marking .selected CSS class
 * @function
 * @param {null}
 */
const drawInitialHand = () => {
  // Empty cardContainer in case this is not the 1st round of gameplay
  cardContainer.innerHTML = '';

  // For testing: use this hand
  // ♠, ♥, ♣, ♦️
  // const TEST_HAND = [
  //   {
  //     name: 'king',
  //     suit: 'clubs',
  //     rank: 13,
  //     suitSymbol: '♣',
  //     displayName: 'K',
  //     colour: 'black',
  //   },
  //   {
  //     name: 'ace',
  //     suit: 'clubs',
  //     rank: 14,
  //     suitSymbol: '♣',
  //     displayName: 'A',
  //     colour: 'black',
  //   },
  //   {
  //     name: '3',
  //     suit: 'spades',
  //     rank: 3,
  //     suitSymbol: '♠',
  //     displayName: '3',
  //     colour: 'black',
  //   },
  //   {
  //     name: '9',
  //     suit: 'hearts',
  //     rank: 9,
  //     suitSymbol: '♥',
  //     displayName: '9',
  //     colour: 'red',
  //   },
  //   {
  //     name: 'queen',
  //     suit: 'spades',
  //     rank: 12,
  //     suitSymbol: '♠',
  //     displayName: 'Q',
  //     colour: 'black',
  //   },
  // ];

  // Pop player 1's card metadata from the deck
  for (let i = 0; i < 5; i += 1) {
    // For testing: use this hand
    // player1Cards.push(TEST_HAND[i]);
    player1Cards.push(deck.pop());
    // Create card element from card metadata
    const cardElement = createCard(player1Cards[i]);
    cardElement.classList.add('showInitialHand');
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
  }

  /* Add event listeners on click to all cards */
  const CARDS = cardContainer.querySelectorAll('.card');
  for (let i = 0; i < CARDS.length; i += 1) {
    CARDS[i].style.cursor = 'pointer';
    CARDS[i].addEventListener('click', cardClick);
  }
};

/**
 * Replaces the cards marked in DOM with .selected CSS class
 * Finds selected cards based on their display names and suit symbols
 * Replaces selected cards with new cards from deck
 * @function
 * @param {null}
 */
const replaceHand = () => {
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
};

/**
 * Callback to be used for sorting hand with .sort()
 * @function
 * @param {object} firstCard - For retrieving rank
 * @param {object} secondCard - For retrieving rank
 * @returns {number} Rank of firstCard minus rank of secondCard
 */
const sortCurrentHand = (firstCard, secondCard) => firstCard.rank - secondCard.rank;

/**
 * Check if hand is a straight
 * @function
 * @param {array} hand - A hand of 5 card objects
 * @returns {boolean} Is the hand a straight?
 */
const getStraights = (hand) => {
  const IS_STRAIGHT = true;
  // comparing current card with next, so we want to stop at 2nd last card
  for (let i = 0; i < hand.length - 1; i += 1) {
    if (hand[i + 1].rank - hand[i].rank !== 1) {
      return false;
    }
  }
  return IS_STRAIGHT;
};

/**
 * Check if hand is a flush
 * Compares current item's suit with next item's
 * @function
 * @param {array} hand - A hand of 5 card objects
 * @returns {boolean} Is the hand a flush?
 */
const getFlush = (hand) => {
  const IS_FLUSH = true;
  for (let i = 0; i < hand.length - 1; i += 1) {
    if (hand[i + 1].suit !== hand[i].suit) {
      return false;
    }
  }

  return IS_FLUSH;
};

/**
 * Gets score of hand
 * Also returns various strings based on game state and score of hand
 * @function
 * @param {array} hand - A hand of 5 card objects
 * @returns {object} The score, and various UI feedback strings
 */
const calcHandScore = (hand) => {
  // initialize score
  let score = -1;
  // initialize type of hand
  let handString = '';
  // initialize score feedback
  let scoreFeedback = '';
  // initialize score feedback
  let newRoundOrGameFeedback = '';

  console.log('current hand:', hand);
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

  // initialize fours
  const FOURS = Object.keys(tally).filter((key) => tally[key] === 4);
  // initialize isFlush
  const IS_FLUSH = getFlush(SORTED_HAND);
  // initialize isStraight
  const IS_STRAIGHT = getStraights(SORTED_HAND);
  // initialize three of a kind
  const THREES = Object.keys(tally).filter((key) => tally[key] === 3);
  // initialize pairs
  const PAIRS = Object.keys(tally).filter((key) => tally[key] === 2);
  const FIRST_PAIR = PAIRS[0];
  let firstPairRank = -1;
  if (PAIRS.length > 0) {
    firstPairRank = SORTED_HAND.filter((item) => item.name === FIRST_PAIR)[0].rank;
  }
  // hand recognition logic
  // ROYAL FLUSH
  if (
    IS_FLUSH && IS_STRAIGHT
    && SORTED_HAND[0].rank === 10 && SORTED_HAND[SORTED_HAND.length - 1].rank === 14
  ) {
    score = 250;
    handString = `Royal Flush of <span class='capitalize'>${SORTED_HAND[0].suit}</span>`;
  }
  // STRAIGHT FLUSH
  else if (IS_FLUSH && IS_STRAIGHT) {
    score = 50;
    handString = `Straight Flush of <span class='capitalize'>${SORTED_HAND[0].suit}</span>`;
  }
  // FOUR OF A KIND
  else if (FOURS.length > 0) {
    score = 25;
    handString = `Four of a Kind with <span class='capitalize'>${FOURS[0]}s</span>`;
  }
  // FULL HOUSE
  else if (THREES.length > 0 && PAIRS.length > 0) {
    score = 9;
    handString = 'Full House';
  }
  // FLUSH
  else if (IS_FLUSH) {
    score = 6;
    handString = `Flush of <span class='capitalize'>${SORTED_HAND[0].suit}</span>`;
  }
  // STRAIGHTS
  else if (IS_STRAIGHT) {
    score = 4;
    handString = 'Straights';
  }
  // THREE OF A KIND
  else if (THREES.length === 1) {
    score = 3;
    handString = `Three of a Kind with <span class='capitalize'>${THREES[0]}s</span>`;
  }
  // 2 PAIRS
  else if (PAIRS.length === 2) {
    score = 2;
    handString = `2 Pairs of <span class='capitalize'>${FIRST_PAIR}s</span> and <span class='capitalize'>${PAIRS[1]}s</span>`;
  }
  // A HIGH PAIR (JACK AND ABOVE)
  else if (PAIRS.length > 0 && firstPairRank >= 11) {
    score = 1;
    handString = `A Pair of <span class='capitalize'>${FIRST_PAIR}s</span>`;
  }
  // A LOW PAIR (10s AND BELOW)
  // score use default -1
  else if (PAIRS.length > 0) {
    handString = `A Pair of <span class='capitalize'>${FIRST_PAIR}s</span>`;
  }
  // HIGH CARD
  // score use default -1
  else {
    handString = `High Card of <span class='capitalize'>${SORTED_HAND[SORTED_HAND.length - 1].name}</span>`;
  }

  const HAND_SCORE = score;
  const BET_SCORE = HAND_SCORE * currentBet;
  const WINNINGS = BET_SCORE - currentBet;

  if (WINNINGS > 0 && gameState === 'SHOW_INITIAL_HAND') {
    scoreFeedback = `You will <span class="text-cta">win ${WINNINGS}</span> <i class="lni lni-coin coin"></i> if you do not replace your cards!`;
  } else if (WINNINGS > 0) {
    totalWinnings += WINNINGS;
    totalCoins += WINNINGS + currentBet;
    scoreFeedback = `You have <span class="text-cta">won ${WINNINGS}</span> <i class="lni lni-coin coin"></i> this round!`;
  } else if (BET_SCORE - currentBet === 0 && gameState === 'SHOW_INITIAL_HAND') {
    scoreFeedback = 'You will not win or lose any <i class="lni lni-coin coin"></i> if you do not replace your cards.';
  } else if (BET_SCORE - currentBet === 0) {
    totalCoins += currentBet;
    scoreFeedback = 'You have not won or lost any <i class="lni lni-coin coin"></i> this round.';
  } else if (BET_SCORE - currentBet < 0 && gameState === 'SHOW_INITIAL_HAND') {
    scoreFeedback = `You will <span class="text-danger">lose</span> your bet of <span class="text-danger">${Math.abs(BET_SCORE)}</span> <i class="lni lni-coin coin"></i> if you do not replace your cards.`;
  } else {
    totalWinnings -= Math.abs(BET_SCORE);
    scoreFeedback = `You have <span class="text-danger">lost</span> your bet of <span class="text-danger">${Math.abs(BET_SCORE)}</span> <i class="lni lni-coin coin"></i> this round.`;
  }

  if (totalCoins > 0 && gameState === 'SHOW_FINAL_HAND') {
    newRoundOrGameFeedback = 'Click the button below to start a new round.';
  } else if (gameState === 'SHOW_FINAL_HAND') {
    newRoundOrGameFeedback = ' You are out of coins! Click the button below to insert some coins!';
  }

  showOrUpdateCoins();

  return {
    score,
    handString,
    scoreFeedback,
    newRoundOrGameFeedback,
  };
};
