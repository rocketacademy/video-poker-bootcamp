/**
 * GAME STATE AND UI TOGGLES
 *
 */

/**
 * Creates .coins-wrapper if it does not exist
 * @function
 * @param {null}
 */
const showOrUpdateCoinsWrapper = () => {
  const VIEW_COINS_WRAPPERS = document.querySelectorAll('.viewCoinsWrapper');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (VIEW_COINS_WRAPPERS.length > 0 && COINS_WRAPPERS.length <= 0) {
    const COINS_WRAPPER = document.createElement('div');
    COINS_WRAPPER.className = 'coinsWrapper coins-wrapper';
    VIEW_COINS_WRAPPERS[0].appendChild(COINS_WRAPPER);
  }
};

/**
 * Updates totalCoins in UI if .totalCoins exists
 * Otherwise, creates the .totalCoins UI
 * @function
 * @param {null}
 */
const showOrUpdateTotalCoins = () => {
  const TOTAL_COINS_PARAGRAPHS = document.querySelectorAll('.totalCoins');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (TOTAL_COINS_PARAGRAPHS.length > 0 && COINS_WRAPPERS.length > 0) {
    const TOTAL_COINS_SUB_VALUE = document.querySelector('.totalCoinsSubValue');
    TOTAL_COINS_SUB_VALUE.innerText = `${totalCoins}`;
  } else if (COINS_WRAPPERS.length > 0) {
    const TOTAL_COINS_PARAGRAPH = document.createElement('div');
    TOTAL_COINS_PARAGRAPH.className = 'totalCoins total-coins flex';
    const TOTAL_COINS_SUB_HEADER = document.createElement('div');
    TOTAL_COINS_SUB_HEADER.innerHTML = '<i class="lni lni-coin"></i> Left';
    const TOTAL_COINS_SUB_VALUE = document.createElement('div');
    TOTAL_COINS_SUB_VALUE.classList.add('totalCoinsSubValue');
    TOTAL_COINS_SUB_VALUE.innerText = `${totalCoins}`;
    COINS_WRAPPERS[0].appendChild(TOTAL_COINS_PARAGRAPH);
    TOTAL_COINS_PARAGRAPH.appendChild(TOTAL_COINS_SUB_HEADER);
    TOTAL_COINS_PARAGRAPH.appendChild(TOTAL_COINS_SUB_VALUE);
  }
};

/**
 * Updates currentBet in UI if .currentBet exists
 * Otherwise, creates the .currentBet UI
 * @function
 * @param {null}
 */
const showOrUpdateCurrentBet = () => {
  const CURRENT_BET_PARAGRAPHS = document.querySelectorAll('.currentBet');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (CURRENT_BET_PARAGRAPHS.length > 0 && COINS_WRAPPERS.length > 0) {
    const CURRENT_BET_SUB_VALUE = document.querySelector('.currentBetSubValue');
    CURRENT_BET_SUB_VALUE.innerText = `${currentBet}`;
  } else if (COINS_WRAPPERS.length > 0) {
    const CURRENT_BET_PARAGRAPH = document.createElement('div');
    CURRENT_BET_PARAGRAPH.className = 'currentBet current-bet flex';
    const CURRENT_BET_SUB_HEADER = document.createElement('div');
    CURRENT_BET_SUB_HEADER.innerHTML = 'Bet <i class="lni lni-coin"></i>';
    const CURRENT_BET_SUB_VALUE = document.createElement('div');
    CURRENT_BET_SUB_VALUE.classList.add('currentBetSubValue');
    CURRENT_BET_SUB_VALUE.innerText = `${currentBet}`;
    COINS_WRAPPERS[0].appendChild(CURRENT_BET_PARAGRAPH);
    CURRENT_BET_PARAGRAPH.appendChild(CURRENT_BET_SUB_HEADER);
    CURRENT_BET_PARAGRAPH.appendChild(CURRENT_BET_SUB_VALUE);
  }
};

/**
 * Updates totalWinnings in UI if .yourWinnings exists
 * This includes changing the colors depending on positive or negative values
 * Otherwise, creates the .yourWinnings UI
 * @function
 * @param {null}
 */
const showOrUpdateTotalWinnings = () => {
  const YOUR_WINNINGS_PARAGRAPHS = document.querySelectorAll('.yourWinnings');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (YOUR_WINNINGS_PARAGRAPHS.length > 0) {
    const YOUR_WINNINGS_SUB_VALUE = document.querySelector('.yourWinningsSubValue');
    YOUR_WINNINGS_SUB_VALUE.innerText = `${totalWinnings}`;
    if (totalWinnings > 0) {
      YOUR_WINNINGS_SUB_VALUE.classList.add('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-negative');
    } else if (totalWinnings === 0) {
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-negative');
    } else {
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.add('text-negative');
    }
  } else if (COINS_WRAPPERS.length > 0) {
    const YOUR_WINNINGS_PARAGRAPH = document.createElement('div');
    YOUR_WINNINGS_PARAGRAPH.className = 'yourWinnings your-winnings flex';
    const YOUR_WINNINGS_SUB_HEADER = document.createElement('div');
    YOUR_WINNINGS_SUB_HEADER.innerHTML = 'Winnings <i class="lni lni-coin"></i>';
    const YOUR_WINNINGS_SUB_VALUE = document.createElement('div');
    YOUR_WINNINGS_SUB_VALUE.className = 'yourWinningsSubValue your-winnings-sub-value';
    YOUR_WINNINGS_SUB_VALUE.innerText = `${totalWinnings}`;
    if (totalWinnings > 0) {
      YOUR_WINNINGS_SUB_VALUE.classList.add('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-negative');
    } else if (totalWinnings === 0) {
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-negative');
    } else {
      YOUR_WINNINGS_SUB_VALUE.classList.remove('text-positive');
      YOUR_WINNINGS_SUB_VALUE.classList.add('text-negative');
    }
    COINS_WRAPPERS[0].appendChild(YOUR_WINNINGS_PARAGRAPH);
    YOUR_WINNINGS_PARAGRAPH.appendChild(YOUR_WINNINGS_SUB_HEADER);
    YOUR_WINNINGS_PARAGRAPH.appendChild(YOUR_WINNINGS_SUB_VALUE);
  }
};

const showOrUpdatePayoutButton = () => {
  const PAYOUT_BUTTONS = document.querySelectorAll('.payoutButton');
  const COINS_WRAPPERS = document.querySelectorAll('.coinsWrapper');
  if (COINS_WRAPPERS.length > 0 && PAYOUT_BUTTONS.length <= 0) {
    const PAYOUT_BUTTON = document.createElement('a');
    PAYOUT_BUTTON.className = 'payoutButton payoutButton button info';
    PAYOUT_BUTTON.setAttribute('target', '_blank');
    PAYOUT_BUTTON.setAttribute('href', 'view_payouts.html');
    PAYOUT_BUTTON.innerText = 'View Payout';
    COINS_WRAPPERS[0].appendChild(PAYOUT_BUTTON);
  }
};

/**
 * Helper function to update or create all UI elements pertaining to coins
 * @function
 * @param {null}
 */
const showOrUpdateCoins = () => {
  showOrUpdateCoinsWrapper();
  showOrUpdateTotalCoins();
  showOrUpdateCurrentBet();
  showOrUpdateTotalWinnings();
  showOrUpdatePayoutButton();
};

/**
 * Remove .totalCoins UI elements from DOM
 * @function
 * @param {null}
 */
const hideTotalCoins = () => {
  const TOTAL_COINS_PARAGRAPHS = document.querySelectorAll('.totalCoins');
  for (let i = 0; i < TOTAL_COINS_PARAGRAPHS.length; i += 1) {
    TOTAL_COINS_PARAGRAPHS[i].remove();
  }
};

/**
 * Remove .currentBet UI elements from DOM
 * @function
 * @param {null}
 */
const hideCurrentBet = () => {
  const CURRENT_BET_PARAGRAPHS = document.querySelectorAll('.currentBet');
  for (let i = 0; i < CURRENT_BET_PARAGRAPHS.length; i += 1) {
    CURRENT_BET_PARAGRAPHS[i].remove();
  }
};

/**
 * Remove .yourWinnings UI elements from DOM
 * @function
 * @param {null}
 */
const hideYourWinnings = () => {
  const YOUR_WINNINGS_PARAGRAPHS = document.querySelectorAll('.yourWinnings');
  for (let i = 0; i < YOUR_WINNINGS_PARAGRAPHS.length; i += 1) {
    YOUR_WINNINGS_PARAGRAPHS[i].remove();
  }
};

/**
 * Remove .viewCoinsWrapper UI elements from DOM
 * @function
 * @param {null}
 */
const hideViewCoinsWrapper = () => {
  const VIEW_COINS_WRAPPERS = document.querySelectorAll('.viewCoinsWrapper');
  for (let i = 0; i < VIEW_COINS_WRAPPERS.length; i += 1) {
    VIEW_COINS_WRAPPERS[i].remove();
  }
};

/**
 * Helper function for removing all coin status related UI elements from DOM
 * @function
 * @param {null}
 */
const hideCoins = () => {
  hideTotalCoins();
  hideCurrentBet();
  hideYourWinnings();
  hideViewCoinsWrapper();
};

/**
 * Populates DOM with UI elements from INIT_COINS
 * If a different game state, remove all DOM elements from INIT_COINS game state
 * @function
 * @param {null}
 */
const toggleInsertCoins = () => {
  if (gameState === INIT_COINS) {
    // hide coins indicators from previous UI states
    hideCoins();

    // create insert coins container
    const INSERT_COINS_CONTAINER = document.createElement('div');
    INSERT_COINS_CONTAINER.className += ' initCoins init-coins-container flex flex-direction-column justify-content-center';
    document.body.appendChild(INSERT_COINS_CONTAINER);

    // add headers
    const WELCOME_TO_HEADER = document.createElement('h2');
    WELCOME_TO_HEADER.classList.add('welcome-to-header');
    WELCOME_TO_HEADER.classList.add('initCoins');
    WELCOME_TO_HEADER.innerText = 'Welcome to';
    INSERT_COINS_CONTAINER.appendChild(WELCOME_TO_HEADER);

    const VIDEO_POKER_HEADER = document.createElement('h1');
    VIDEO_POKER_HEADER.classList.add('video-poker-header');
    VIDEO_POKER_HEADER.classList.add('initCoins');
    const VIDEO_HEADER = document.createElement('span');
    VIDEO_HEADER.classList.add('video-header');
    VIDEO_HEADER.classList.add('initCoins');
    VIDEO_HEADER.innerText = 'Video';
    VIDEO_POKER_HEADER.appendChild(VIDEO_HEADER);
    const POKER_HEADER = document.createElement('span');
    POKER_HEADER.classList.add('poker-header');
    POKER_HEADER.classList.add('initCoins');
    POKER_HEADER.innerText = 'Poker';
    VIDEO_POKER_HEADER.appendChild(POKER_HEADER);
    INSERT_COINS_CONTAINER.appendChild(VIDEO_POKER_HEADER);

    // initialize coins input
    const COINS_INPUT_PARAGRAPH = document.createElement('p');
    COINS_INPUT_PARAGRAPH.className = 'coinsInputParagraph coins-input-paragraph initCoins';
    const INSERT_SPAN = document.createElement('span');
    INSERT_SPAN.style.marginRight = '10px';
    INSERT_SPAN.innerText = 'Insert';
    COINS_INPUT_PARAGRAPH.appendChild(INSERT_SPAN);
    const COINS_INPUT = document.createElement('input');
    COINS_INPUT.setAttribute('type', 'number');
    COINS_INPUT.className = 'coinsInput initCoins coins-input';
    COINS_INPUT.addEventListener('keypress', coinsInputKeypress);
    COINS_INPUT_PARAGRAPH.appendChild(COINS_INPUT);
    const COINS_SPAN = document.createElement('span');
    COINS_SPAN.innerHTML = '<i class="lni lni-coin coin"></i>';
    COINS_SPAN.style.marginLeft = '10px';
    COINS_INPUT_PARAGRAPH.appendChild(COINS_SPAN);
    INSERT_COINS_CONTAINER.appendChild(COINS_INPUT_PARAGRAPH);

    // initialize coins input feedback
    const COINS_INPUT_FEEDBACK_PARAGRAPH = document.createElement('p');
    COINS_INPUT_FEEDBACK_PARAGRAPH.className = 'coinsInputFeedback initCoins coins-input-feedback text-danger invisible';
    COINS_INPUT_FEEDBACK_PARAGRAPH.innerHTML = 'Please insert a minimum of 1 <i class="lni lni-coin coin"></i>, and a maximum of 1000 <i class="lni lni-coin coin"></i>.';
    INSERT_COINS_CONTAINER.appendChild(COINS_INPUT_FEEDBACK_PARAGRAPH);

    // initialize coins input button
    const COINS_INPUT_BUTTON = document.createElement('button');
    COINS_INPUT_BUTTON.className = 'initCoins coins-input-button button cta big';
    COINS_INPUT_BUTTON.innerText = 'Start';
    COINS_INPUT_BUTTON.addEventListener('click', insertCoinsSubmit);
    INSERT_COINS_CONTAINER.appendChild(COINS_INPUT_BUTTON);
  } else {
    const INIT_COINS_ELEMENTS = document.querySelectorAll('.initCoins');
    for (let i = 0; i < INIT_COINS_ELEMENTS.length; i += 1) {
      INIT_COINS_ELEMENTS[i].remove();
    }
  }
};

/**
 * Populates DOM with UI elements from SET_BET
 * If a different game state, remove all DOM elements from SET_BET game state
 * @function
 * @param {null}
 */
const toggleSetBet = () => {
  if (gameState === SET_BET) {
    // hide coins indicators from previous UI states
    hideCoins();
    // create set bet container
    const SET_BET_WRAPPER = document.createElement('div');
    SET_BET_WRAPPER.className = 'setBet set-bet-wrapper flex flex-direction-column';
    const VIEW_COINS_WRAPPER = document.createElement('div');
    VIEW_COINS_WRAPPER.className = 'viewCoinsWrapper view-coins-wrapper flex-grow-zero flex-shrink-zero flex';
    const SET_BET_CONTAINER = document.createElement('div');
    SET_BET_CONTAINER.className = 'setBet setBetContainer set-bet-container flex flex-direction-column justify-content-center flex-grow-one flex-shrink-one';
    document.body.appendChild(SET_BET_WRAPPER);
    SET_BET_WRAPPER.appendChild(VIEW_COINS_WRAPPER);
    SET_BET_WRAPPER.appendChild(SET_BET_CONTAINER);

    showOrUpdateCoins();

    // initialize bet input
    const CURRENT_BET_INPUT_PARAGRAPH = document.createElement('p');
    CURRENT_BET_INPUT_PARAGRAPH.className = 'currentBetParagraph current-bet-paragraph setBet';
    const INSERT_SPAN = document.createElement('span');
    INSERT_SPAN.style.marginRight = '10px';
    INSERT_SPAN.innerText = 'Bet';
    CURRENT_BET_INPUT_PARAGRAPH.appendChild(INSERT_SPAN);
    const CURRENT_BET_INPUT = document.createElement('input');
    CURRENT_BET_INPUT.setAttribute('type', 'number');
    CURRENT_BET_INPUT.className = 'currentBetInput setBet current-bet-input';
    CURRENT_BET_INPUT.addEventListener('keypress', currentBetInputKeypress);
    CURRENT_BET_INPUT_PARAGRAPH.appendChild(CURRENT_BET_INPUT);
    const COINS_SPAN = document.createElement('span');
    COINS_SPAN.innerHTML = '<i class="lni lni-coin coin"></i> this round';
    COINS_SPAN.style.marginLeft = '10px';
    CURRENT_BET_INPUT_PARAGRAPH.appendChild(COINS_SPAN);
    SET_BET_CONTAINER.appendChild(CURRENT_BET_INPUT_PARAGRAPH);

    // initialize current bet input feedback
    const BET_INPUT_FEEDBACK_PARAGRAPH = document.createElement('p');
    BET_INPUT_FEEDBACK_PARAGRAPH.className = 'betInputFeedback setBet bet-input-feedback text-danger invisible';
    BET_INPUT_FEEDBACK_PARAGRAPH.innerHTML = `You must bet at least 1 <i class="lni lni-coin coin"></i>, and at most ${totalCoins} <i class="lni lni-coin coin"></i>.`;
    SET_BET_CONTAINER.appendChild(BET_INPUT_FEEDBACK_PARAGRAPH);

    // initialize current bet button
    const CURRENT_BET_SUBMIT_BUTTON = document.createElement('button');
    CURRENT_BET_SUBMIT_BUTTON.innerText = 'Continue';
    CURRENT_BET_SUBMIT_BUTTON.className = 'setBet current-bet-input-button button cta big';
    CURRENT_BET_SUBMIT_BUTTON.addEventListener('click', placeBetsSubmit);
    SET_BET_CONTAINER.appendChild(CURRENT_BET_SUBMIT_BUTTON);
  } else {
    const INIT_BET_ELEMENTS = document.querySelectorAll('.setBet');
    for (let i = 0; i < INIT_BET_ELEMENTS.length; i += 1) {
      INIT_BET_ELEMENTS[i].remove();
    }
  }
};

/**
 * Populates DOM with UI elements from SHOW_INITIAL_HAND
 * If a different game state, remove all DOM elements from SHOW_INITIAL_HAND game state
 * @function
 * @param {null}
 */
const toggleShowInitialHand = () => {
  if (gameState === SHOW_INITIAL_HAND) {
    // hide coins indicators from previous UI states
    hideCoins();

    const SHOW_INITIAL_HAND_WRAPPER = document.createElement('div');
    SHOW_INITIAL_HAND_WRAPPER.className = 'showInitialHand show-initial-hand-wrapper flex flex-direction-column';
    const VIEW_COINS_WRAPPER = document.createElement('div');
    VIEW_COINS_WRAPPER.className = 'viewCoinsWrapper view-coins-wrapper flex-grow-zero flex-shrink-zero flex';
    const SHOW_INITIAL_HAND_CONTAINER = document.createElement('div');
    SHOW_INITIAL_HAND_CONTAINER.className = 'showInitialHand showInitialHandContainer show-initial-hand-container flex flex-direction-column justify-content-center flex-grow-one flex-shrink-one';
    document.body.appendChild(SHOW_INITIAL_HAND_WRAPPER);
    SHOW_INITIAL_HAND_WRAPPER.appendChild(VIEW_COINS_WRAPPER);
    SHOW_INITIAL_HAND_WRAPPER.appendChild(SHOW_INITIAL_HAND_CONTAINER);

    showOrUpdateCoins();
    // Initialise cardContainer as a div with CSS class card-container,
    // and add it to the document body. Add this logic to the initGame function.
    cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.classList.add('showInitialHand');

    // draw initial hand
    drawInitialHand();

    // get status of current hand
    const CURRENT_HAND_STATUS = calcHandScore(player1Cards);

    // set current hand header
    const CURRENT_HAND_HEADER = document.createElement('h2');
    CURRENT_HAND_HEADER.classList.add('text-align-center', 'font-variant-small-caps', 'current-hand-header', 'showInitialHand');
    CURRENT_HAND_HEADER.innerText = 'Your Hand:';
    SHOW_INITIAL_HAND_CONTAINER.appendChild(CURRENT_HAND_HEADER);
    const CURRENT_HAND_SUBHEADER = document.createElement('h1');
    CURRENT_HAND_SUBHEADER.classList.add('text-align-center', 'current-hand-subheader', 'showInitialHand');
    CURRENT_HAND_SUBHEADER.innerHTML = `${CURRENT_HAND_STATUS.handString}`;
    SHOW_INITIAL_HAND_CONTAINER.appendChild(CURRENT_HAND_SUBHEADER);

    SHOW_INITIAL_HAND_CONTAINER.appendChild(cardContainer);

    if (totalCoins > 0) {
      const RAISE_INPUT_PARAGRAPH = document.createElement('p');
      RAISE_INPUT_PARAGRAPH.className = 'raiseInput raiseInputParagraph raise-input-paragraph showInitialHand';
      const RAISE_SPAN = document.createElement('span');
      RAISE_SPAN.classList.add('raiseInput');
      RAISE_SPAN.style.marginRight = '10px';
      RAISE_SPAN.innerText = 'Raise';
      RAISE_INPUT_PARAGRAPH.appendChild(RAISE_SPAN);
      const RAISE_INPUT = document.createElement('input');
      RAISE_INPUT.setAttribute('type', 'number');
      RAISE_INPUT.classList.add('raiseInput', 'raiseInputInput', 'raise-input', 'showInitialHand');
      RAISE_INPUT_PARAGRAPH.appendChild(RAISE_INPUT);
      const COINS_SPAN = document.createElement('span');
      COINS_SPAN.classList.add('raiseInput', 'showInitialHand');
      COINS_SPAN.innerHTML = '<i class="lni lni-coin coin"></i>';
      COINS_SPAN.style.marginLeft = '10px';
      RAISE_INPUT_PARAGRAPH.appendChild(COINS_SPAN);
      SHOW_INITIAL_HAND_CONTAINER.appendChild(RAISE_INPUT_PARAGRAPH);
      // initialize raise input feedback
      const RAISE_INPUT_FEEDBACK_PARAGRAPH = document.createElement('p');
      RAISE_INPUT_FEEDBACK_PARAGRAPH.className = 'raiseInputFeedback raiseInput showInitialHand raise-input-feedback text-danger invisible';
      RAISE_INPUT_FEEDBACK_PARAGRAPH.innerHTML = `You can only raise a maximum of ${totalCoins} <i class="lni lni-coin coin"></i>!`;
      SHOW_INITIAL_HAND_CONTAINER.appendChild(RAISE_INPUT_FEEDBACK_PARAGRAPH);
    } else {
      const RAISE_INPUTS = document.querySelectorAll('.raiseInput');
      for (let i = 0; i < RAISE_INPUTS.length; i += 1) {
        RAISE_INPUTS[i].remove();
      }
    }

    const SCORE_FEEDBACK_PARAGRAPH = document.createElement('p');
    SCORE_FEEDBACK_PARAGRAPH.classList.add('showInitialHand', 'text-align-center', 'score-feedback-paragraph');
    SCORE_FEEDBACK_PARAGRAPH.innerHTML = `${CURRENT_HAND_STATUS.scoreFeedback}`;
    SHOW_INITIAL_HAND_CONTAINER.appendChild(SCORE_FEEDBACK_PARAGRAPH);

    const TOTAL_COINS_FEEDBACK_PARAGRAPH = document.createElement('p');
    TOTAL_COINS_FEEDBACK_PARAGRAPH.classList.add('showInitialHand', 'text-align-center', 'total-coins-feedback-paragraph');

    if (totalCoins > 0) {
      TOTAL_COINS_FEEDBACK_PARAGRAPH.innerHTML = 'You may (or may not) select any number of cards to replace, or raise your bet.';
    } else {
      TOTAL_COINS_FEEDBACK_PARAGRAPH.innerHTML = 'Since you have no <i class="lni lni-coin coin"></i> left, you cannot raise your bet any further. You may (or may not) still select any number of cards to replace.';
    }

    SHOW_INITIAL_HAND_CONTAINER.appendChild(TOTAL_COINS_FEEDBACK_PARAGRAPH);

    // create raise and replace cards button
    const RAISE_AND_REPLACE_BUTTON = document.createElement('button');
    RAISE_AND_REPLACE_BUTTON.innerText = 'Continue';
    RAISE_AND_REPLACE_BUTTON.classList.add('showInitialHand', 'button', 'cta', 'raise-and-replace-button');
    RAISE_AND_REPLACE_BUTTON.addEventListener('click', raiseAndReplaceClick);
    SHOW_INITIAL_HAND_CONTAINER.appendChild(RAISE_AND_REPLACE_BUTTON);
  } else {
    const SHOW_INITIAL_HAND_ELEMENTS = document.querySelectorAll('.showInitialHand');
    for (let i = 0; i < SHOW_INITIAL_HAND_ELEMENTS.length; i += 1) {
      SHOW_INITIAL_HAND_ELEMENTS[i].remove();
    }
  }
};

/**
 * Populates DOM with UI elements from SHOW_FINAL_HAND
 * If a different game state, remove all DOM elements from SHOW_FINAL_HAND game state
 * @function
 * @param {null}
 */
const toggleShowFinalHand = () => {
  if (gameState === SHOW_FINAL_HAND) {
    // hide coins indicators from previous UI states
    hideCoins();

    const SHOW_FINAL_HAND_WRAPPER = document.createElement('div');
    SHOW_FINAL_HAND_WRAPPER.className = 'showFinalHand show-final-hand-wrapper flex flex-direction-column';
    const VIEW_COINS_WRAPPER = document.createElement('div');
    VIEW_COINS_WRAPPER.className = 'viewCoinsWrapper view-coins-wrapper flex-grow-zero flex-shrink-zero flex';
    const SHOW_FINAL_HAND_CONTAINER = document.createElement('div');
    SHOW_FINAL_HAND_CONTAINER.className = 'showFinalHand showFinalHandContainer show-final-hand-container flex flex-direction-column justify-content-center flex-grow-one flex-shrink-one';
    document.body.appendChild(SHOW_FINAL_HAND_WRAPPER);
    SHOW_FINAL_HAND_WRAPPER.appendChild(VIEW_COINS_WRAPPER);
    SHOW_FINAL_HAND_WRAPPER.appendChild(SHOW_FINAL_HAND_CONTAINER);

    showOrUpdateCoins();

    // Initialise cardContainer as a div with CSS class card-container,
    // and add it to the document body. Add this logic to the initGame function.
    cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');
    cardContainer.classList.add('showFinalHand');

    // Pop player 1's card metadata from the deck
    for (let i = 0; i < player1Cards.length; i += 1) {
      // Create card element from card metadata
      const cardElement = createCard(player1Cards[i]);
      cardElement.classList.add('showFinalHand');
      // Append the card element to the card container
      cardContainer.appendChild(cardElement);
    }

    const CURRENT_HAND_STATUS = calcHandScore(player1Cards);

    // set current hand header
    const CURRENT_HAND_HEADER = document.createElement('h2');
    CURRENT_HAND_HEADER.classList.add('text-align-center', 'font-variant-small-caps', 'current-hand-header', 'showFinalHand');
    CURRENT_HAND_HEADER.innerText = 'Your Hand:';
    SHOW_FINAL_HAND_CONTAINER.appendChild(CURRENT_HAND_HEADER);
    const CURRENT_HAND_SUBHEADER = document.createElement('h1');
    CURRENT_HAND_SUBHEADER.classList.add('text-align-center', 'current-hand-subheader', 'showFinalHand');
    CURRENT_HAND_SUBHEADER.innerHTML = `${CURRENT_HAND_STATUS.handString}`;
    SHOW_FINAL_HAND_CONTAINER.appendChild(CURRENT_HAND_SUBHEADER);

    SHOW_FINAL_HAND_CONTAINER.appendChild(cardContainer);

    const SCORE_FEEDBACK_PARAGRAPH = document.createElement('p');
    SCORE_FEEDBACK_PARAGRAPH.classList.add('showFinalHand', 'text-align-center', 'score-feedback-paragraph');
    SCORE_FEEDBACK_PARAGRAPH.innerHTML = `${CURRENT_HAND_STATUS.scoreFeedback}`;
    SHOW_FINAL_HAND_CONTAINER.appendChild(SCORE_FEEDBACK_PARAGRAPH);

    // final button
    const newRoundOrGameButton = document.createElement('button');
    newRoundOrGameButton.classList.add('newRoundOrGameButton');
    newRoundOrGameButton.classList.add('showFinalHand', 'button', 'cta', 'final-button');
    newRoundOrGameButton.addEventListener('click', newRoundOrGameClick);
    if (totalCoins > 0) {
      newRoundOrGameButton.innerText = 'Start New Round';
    } else {
      newRoundOrGameButton.innerText = 'Insert More Coins';
    }
    SHOW_FINAL_HAND_CONTAINER.appendChild(newRoundOrGameButton);
  } else {
    const SHOW_FINAL_HAND_ELEMENTS = document.querySelectorAll('.showFinalHand');
    for (let i = 0; i < SHOW_FINAL_HAND_ELEMENTS.length; i += 1) {
      SHOW_FINAL_HAND_ELEMENTS[i].remove();
    }
  }
};

/**
 * Helper function for deleting or creating UI based on game states
 * @function
 * @param {null}
 */
const toggleUI = () => {
  toggleInsertCoins();
  toggleSetBet();
  toggleShowInitialHand();
  toggleShowFinalHand();
};

/**
 * GAME INITIALISATION
 * We can now centralise our game initialisation into a single function called `initGame`.
 */

/**
 * Changes gameState to SET_BET, and toggles UI
 * @function
 * @param {null}
 */
const initBet = () => {
  gameState = SET_BET;
  toggleUI();
};

/**
 * Changes gameState to SHOW_INITIAL_HAND, and toggles UI
 * @function
 * @param {null}
 */
const initGame = () => {
  gameState = SHOW_INITIAL_HAND;
  toggleUI();
};

/**
 * Changes gameState to SHOW_FINAL_HAND, and toggles UI
 * @function
 * @param {null}
 */
const initFinalHand = () => {
  gameState = SHOW_FINAL_HAND;
  toggleUI();
};

/**
 * Changes gameState to INIT_COINS, and toggles UI
 * @function
 * @param {null}
 */
const initCoins = () => {
  // set game state
  gameState = INIT_COINS;
  // set UI
  toggleUI();
};
