/**
 *
 * To disable the button so that user cannot click it
 * @param {String} id of button to be disabled
 */
const disableButton = (buttonId) => {
  document.getElementById(buttonId).className = 'nes-btn is-disabled';
  document.getElementById(buttonId).disabled = true;
};

/**
 *
 * To enable the button so that user can click it
 * @param {String} id of button to be enabled
 */
const enableButton = (buttonId) => {
  document.getElementById(buttonId).classList.remove('is-disabled');
  document.getElementById(buttonId).disabled = false;

  if (buttonId === 'deal') {
    document.getElementById(buttonId).classList.add('is-primary');
  } else if (buttonId === 'bet-1') {
    document.getElementById(buttonId).classList.add('is-warning');
  } else if (buttonId === 'bet-5') {
    document.getElementById(buttonId).classList.add('is-error');
  } else if (buttonId === 'calculate-probability') {
    document.getElementById(buttonId).classList.add('is-normal');
  }
};

/**
 *
 * To designate cards that are to be held and cards that are to be replaced
 * @param {String} id of card to be held
 */
const toggleHold = (cardId) => {
  if (mode === 'firstDeal') {
    if (document.getElementById(`hold-${cardId}`).className === 'unhold') {
      document.getElementById(`hold-${cardId}`).className = 'hold';
      stats.hand[cardId].hold = true;
    } else {
      document.getElementById(`hold-${cardId}`).className = 'unhold';
      stats.hand[cardId].hold = false;
    }
  }
};

/**
 *
 * To update the display of player bet
 */
const updatePlayerBetUI = () => {
  document.getElementById('player-bet').innerHTML = playerBet;
};

/**
 *
 * To update the display of player credits
 */
const updatePlayerCreditsUI = () => {
  document.getElementById('player-credits').innerHTML = playerCredits;
};

/**
 *
 * To update the display of player instructions
 */
const updateInstructions = (instructions) => {
  document.getElementById('instructions').innerHTML = instructions;
};

/**
 *
 * To update the cards displayed 
 */
const updateCardsUI = () => {
  let counter = 0;

  if (document.getElementById('cards').className === 'display-none') {
    document.getElementById('cards').className = 'flex';
  }

  // clear any outstanding cards
  for (let i = 0; i < 5; i += 1) {
    document.getElementById(`card-${i}`).innerHTML = '';
  }

  const setCards = setInterval(() => {
    const card = document.createElement('IMG');
    card.src = `${stats.hand[counter].pic}`;
    card.id = `${counter}`;

    const cardDiv = document.getElementById(`card-${counter}`);

    card.addEventListener('click', (event) => {
      toggleHold(event.target.id);
    });

    cardDiv.appendChild(card);

    const hold = document.createElement('div');
    hold.classList.add('unhold');
    hold.id = `hold-${counter}`;
    hold.innerText = 'Hold';

    hold.addEventListener('click', (event) => {
      toggleHold(event.target.id.split('-')[1]);
    });

    cardDiv.appendChild(hold);

    if (counter === 4) {
      clearInterval(setCards);
      if (mode === 'firstDeal') {
        enableButton('deal');
      }
    }

    counter += 1;
  }, 100);
};

/**
 *
 * To highlight the column of potential rewards depending on size of player bets
 */
const highlightRewardColumn = () => {
  const scoreTable = document.getElementById('score-table');

  for (let i = 0; i < scoreTable.rows.length; i += 1) {
    for (let j = 0; j <= 5; j += 1) {
      if (j === playerBet) {
        scoreTable.rows[i].cells[j].style.color = '#209cee';
      } else {
        scoreTable.rows[i].cells[j].style.color = 'white';
      }
    }
  }
};

/**
 *
 * To present long number properly with commas
 * @param {Number} any number
 * @returns {String} string of a number with properly denoted commas e.g. 1000000 -> 1,000,000
 */
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/**
 *
 * To update the total number of combinations available with current hand and cards to be replaced
 * @param {Number} number of card combinations
 */
const updateTotalCombinationsAvailableUI = (totalCombinations) => {
  document.getElementById('total-combinations').innerHTML = numberWithCommas(totalCombinations.toFixed(0));
};

/**
 *
 * To update the respective probabilities for each winning hand
 */
const updateProbabilityUI = () => {
  document.getElementById('probabilities').classList.remove('display-none');
  document.getElementById('probability-royal-flush').innerHTML = Number.parseFloat(probability.royalFlush).toFixed(5);
  document.getElementById('probability-straight-flush').innerHTML = Number.parseFloat(probability.straightFlush).toFixed(5);
  document.getElementById('probability-four-of-a-kind').innerHTML = Number.parseFloat(probability.fourOfAKind).toFixed(5);
  document.getElementById('probability-full-house').innerHTML = Number.parseFloat(probability.fullHouse).toFixed(5);
  document.getElementById('probability-flush').innerHTML = Number.parseFloat(probability.flush).toFixed(5);
  document.getElementById('probability-straight').innerHTML = Number.parseFloat(probability.straight).toFixed(5);
  document.getElementById('probability-three-of-a-kind').innerHTML = Number.parseFloat(probability.threeOfAKind).toFixed(5);
  document.getElementById('probability-two-pair').innerHTML = Number.parseFloat(probability.twoPairs).toFixed(5);
};
