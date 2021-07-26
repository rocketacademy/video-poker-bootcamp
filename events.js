/** *
 ** * EVENT HANDLERS AND CALLBACKS
 ** *
 ** */

/**
 * Submission of value for coins inserted
 * Input validation in .coinInput
 * Updates coins inserted and changes game state when valid
 * @function
 * @param {null}
 */
const insertCoinsSubmit = () => {
  const COINS_INPUT = document.querySelector('.coinsInput');
  const COINS = Number(COINS_INPUT.value);
  const IS_COINS_NUMBER = !Number.isNaN(COINS);
  if (COINS_INPUT.value.trim() !== '' && IS_COINS_NUMBER && COINS > 0 && COINS <= 1000) {
    totalCoins += COINS;
    initBet();
  } else {
    const COINS_INPUT_FEEDBACK_PARAGRAPHS = document.querySelectorAll('.coinsInputFeedback');
    if (COINS_INPUT_FEEDBACK_PARAGRAPHS.length > 0 && COINS_INPUT_FEEDBACK_PARAGRAPHS[0].classList.contains('invisible')) {
      COINS_INPUT_FEEDBACK_PARAGRAPHS[0].classList.remove('invisible');
      COINS_INPUT_FEEDBACK_PARAGRAPHS[0].classList.add('visible');
    }
  }
};

/**
 * Tracks keypresses in .coinInput
 * @function
 * @param {event} e - for tracking pressing "Enter"
 */
const coinsInputKeypress = (e) => {
  if (e.keyCode === 13) {
    insertCoinsSubmit();
  }
};

/**
 * Tracks keypresses in .currentBetInput
 * @function
 * @param {event} e - for tracking pressing "Enter"
 */
const currentBetInputKeypress = (e) => {
  if (e.keyCode === 13) {
    placeBetsSubmit();
  }
};

/**
 * Submission of value for coins to bet
 * Input validation in .currentBetInput
 * Updates coins inserted, total coins, and changes game state when valid
 * @function
 * @param {null}
 */
const placeBetsSubmit = () => {
  const BET_INPUT = document.querySelector('.currentBetInput');
  const BET = Number(BET_INPUT.value);
  const IS_BET_NUMBER = !Number.isNaN(BET);
  if (BET_INPUT.value.trim() !== '' && IS_BET_NUMBER && BET > 0 && BET <= totalCoins) {
    totalCoins -= BET;
    currentBet += BET;
    initGame();
  } else {
    const BET_INPUT_FEEDBACK_PARAGRAPHS = document.querySelectorAll('.betInputFeedback');
    if (BET_INPUT_FEEDBACK_PARAGRAPHS.length > 0 && BET_INPUT_FEEDBACK_PARAGRAPHS[0].classList.contains('invisible')) {
      BET_INPUT_FEEDBACK_PARAGRAPHS[0].classList.remove('invisible');
      BET_INPUT_FEEDBACK_PARAGRAPHS[0].classList.add('visible');
    }
  }
};

/**
 * Re-shuffles deck
 * Resets hand
 * Reset game state to new round or game depending on coins remaining
 * @function
 * @param {null}
 */
const newRoundOrGameClick = () => {
  // create new deck and reshuffle
  deck = shuffleCards([...unshuffledDeck]);
  // reset existing player cards
  player1Cards = [];

  if (totalCoins > 0) {
    currentBet = 0;
    initBet();
  } else {
    totalCoins = 0;
    currentBet = 0;
    initCoins();
  }
};

/**
 * Handler for button click when initial hand is shown
 * Checks if raise number is valid, updates bet and total coins if so
 * Checks if there are cards to be replaced, updates hand if so
 * Changes game state to SHOW_FINAL_HAND
 * @function
 * @param {null}
 */
const raiseAndReplaceClick = () => {
  const RAISE_INPUTS = document.querySelectorAll('.raiseInputInput');
  let raise = 0;
  let isRaiseNumber = false;

  if (RAISE_INPUTS.length > 0) {
    raise = Number(RAISE_INPUTS[0].value);
    isRaiseNumber = !Number.isNaN(raise);
  }

  if (RAISE_INPUTS.length > 0 && RAISE_INPUTS[0].value.trim() !== '' && isRaiseNumber && raise > 0 && raise <= totalCoins) {
    currentBet += raise;
    totalCoins -= raise;
    replaceHand();
    initFinalHand();
  } else if (RAISE_INPUTS.length > 0 && RAISE_INPUTS[0].value.trim() !== '' && isRaiseNumber && raise > 0) {
    const RAISE_INPUT_FEEDBACK_PARAGRAPHS = document.querySelectorAll('.raiseInputFeedback');
    if (RAISE_INPUT_FEEDBACK_PARAGRAPHS.length > 0 && RAISE_INPUT_FEEDBACK_PARAGRAPHS[0].classList.contains('invisible')) {
      RAISE_INPUT_FEEDBACK_PARAGRAPHS[0].classList.remove('invisible');
      RAISE_INPUT_FEEDBACK_PARAGRAPHS[0].classList.add('visible');
    }
  } else {
    replaceHand();
    initFinalHand();
  }
};

/**
 * Handler for clicking a card to be replaced
 * Toggles .selected CSS class on card
 * @function
 * @param {event} event - for marking card to be selected for replacement
 */
const cardClick = (event) => {
  const CARD = event.currentTarget;
  // if already selected
  if (CARD.className.indexOf('selected') !== -1) {
    CARD.classList.remove('selected');
  } else {
    CARD.classList.add('selected');
  }
};
