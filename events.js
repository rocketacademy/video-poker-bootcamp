/**
 * EVENT HANDLERS AND CALLBACKS
 *
 */

/**
 * PLAYER ACTION CALLBACKS
 * Callbacks that get triggered when player 1 and 2 click on their respective buttons.
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

const coinsInputKeypress = (e) => {
  if (e.keyCode === 13) {
    insertCoinsSubmit();
  }
};

const currentBetInputKeypress = (e) => {
  if (e.keyCode === 13) {
    placeBetsSubmit();
  }
};

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

const cardClick = (event) => {
  const CARD = event.currentTarget;
  // if already selected
  if (CARD.className.indexOf('selected') !== -1) {
    CARD.classList.remove('selected');
  } else {
    CARD.classList.add('selected');
  }
};
