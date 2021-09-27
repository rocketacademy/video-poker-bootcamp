/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * Function that creates CONTAINER element
 */
const createContainer = () => {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('container');
  document.body.appendChild(mainDiv);
};

/**
 * Function that creates OVERLAY element
 */
const createOverlay = () => {
  const overlayImg = document.createElement('img');
  overlayImg.classList.add('overlay');
  overlayImg.src = 'vp-img/background.jpg';
  document.querySelector('.container').appendChild(overlayImg);
};

/**
 * Function that creates HEADER element
 */
const createTitle = () => {
  const mainTitle = document.createElement('h1');
  mainTitle.classList.add('glitch');
  mainTitle.innerText = 'VIDEO POKER';
  document.querySelector('.container').appendChild(mainTitle);

  mainTitle.addEventListener('mouseenter', () => { mainTitle.classList.add('glitch'); });
  mainTitle.addEventListener('mouseleave', () => { mainTitle.classList.remove('glitch'); });
};

/**
 * Function that creates TABLE element
 */
const createTable = () => {
  const tableEl = document.createElement('table');
  const tableHead = document.createElement('thead');
  const tableBody = document.createElement('tbody');
  tableBody.setAttribute('id', 'table-body');
  tableEl.appendChild(tableHead);
  tableEl.appendChild(tableBody);
  document.querySelector('.container').appendChild(tableEl);

  const tableHeaders = ['HAND', 'X', 'WIN', 'CHANCE'];

  const headRow = document.createElement('tr');
  tableHead.appendChild(headRow);
  for (let k = 0; k < 4; k += 1) {
    const headCell = document.createElement('th');
    const headCellText = document.createTextNode(tableHeaders[k]);
    headCell.appendChild(headCellText);
    headRow.appendChild(headCell);
  }

  const winningHands = ['ROYAL FLUSH', 'STRAIGHT FLUSH', '4 OF A KIND', 'FULL HOUSE', 'FLUSH', 'STRAIGHT', '3 OF A KIND', '2 PAIRS', 'JACKS OR BETTER'];

  for (let i = 0; i < 9; i += 1) {
    const row = document.createElement('tr');
    for (let j = 0; j < 4; j += 1) {
      const cell = document.createElement('td');
      if (j === 0) {
        const cellText = document.createTextNode(winningHands[i]);
        cell.appendChild(cellText);
      } else if (j < 3) {
        const cellText = document.createTextNode(multipliers[i]);
        cell.appendChild(cellText);
      } else {
        const cellText = document.createTextNode(probabilities[i]);
        cell.appendChild(cellText);
      }
      row.appendChild(cell);
    }
    tableBody.appendChild(row);
  }
};

/**
 * Function that creates RESULTS element
 */
const createResults = () => {
  const resultsDiv = document.createElement('div');
  resultsDiv.classList.add('results');
  resultsDiv.innerText = "INPUT YOUR BET AND PRESS 'DEAL' TO BEGIN";
  document.querySelector('.container').appendChild(resultsDiv);

  resultsDiv.classList.add('animate__animated');
  resultsDiv.classList.add('animate__flash');
  resultsDiv.classList.add('animate__infinite');
};

/**
 * Function that creates HAND element
 */
const createHand = () => {
  const handDiv = document.createElement('div');
  handDiv.classList.add('hand');
  document.querySelector('.container').appendChild(handDiv);
};

/**
 * Function that creates BUTTON element
 */
const createButtons = () => {
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button-div');
  document.querySelector('.container').appendChild(buttonDiv);

  // bet (left side)
  const betDiv = document.createElement('div');
  buttonDiv.appendChild(betDiv);

  const betDivHead = document.createElement('div');
  const betDivBody = document.createElement('div');
  const betDivFoot = document.createElement('div');
  betDivHead.classList.add('bet-head');
  betDivBody.classList.add('bet-div');
  betDivFoot.classList.add('bet-foot');
  betDivHead.innerText = 'BET';
  betDivFoot.innerText = '◻︎ ALL IN';
  betDiv.appendChild(betDivHead);
  betDiv.appendChild(betDivBody);
  betDiv.appendChild(betDivFoot);

  const betMinus = document.createElement('div');
  const betPlus = document.createElement('div');
  const betInput = document.createElement('div');
  betMinus.innerText = '-';
  betPlus.innerText = '+';
  betInput.innerText = currentBet;
  betMinus.classList.add('bet-buttons');
  betPlus.classList.add('bet-buttons');
  betInput.setAttribute('id', 'bet');
  betDivBody.appendChild(betMinus);
  betDivBody.appendChild(betInput);
  betDivBody.appendChild(betPlus);

  betMinus.addEventListener('click', decreaseBet);
  betMinus.addEventListener('mouseenter', () => { onButtonEnter(betMinus); });
  betMinus.addEventListener('mouseleave', () => { onButtonLeave(betMinus); });
  betPlus.addEventListener('click', increaseBet);
  betPlus.addEventListener('mouseenter', () => { onButtonEnter(betPlus); });
  betPlus.addEventListener('mouseleave', () => { onButtonLeave(betPlus); });
  betDivFoot.addEventListener('click', allInBet);
  betDivFoot.addEventListener('mouseenter', () => { onButtonEnter(betDivFoot); });
  betDivFoot.addEventListener('mouseleave', () => { onButtonLeave(betDivFoot); });

  // deal/draw button (right side)
  const gameBtn = document.createElement('div');
  gameBtn.classList.add('game-button');
  gameBtn.innerText = 'DEAL';
  buttonDiv.appendChild(gameBtn);

  gameBtn.addEventListener('click', onButtonClick);
  gameBtn.addEventListener('mouseenter', () => { onButtonEnter(gameBtn); });
  gameBtn.addEventListener('mouseleave', () => { onButtonLeave(gameBtn); });
};

/**
 * Function that creates SCORE element
 */
const createScore = () => {
  const scoreDiv = document.createElement('div');
  scoreDiv.classList.add('score');
  scoreDiv.innerText = `CREDITS ${points}`;
  document.querySelector('.container').appendChild(scoreDiv);
};

/**
 * Function that creates INSTRUCTIONS BUTTON element
 */
const createInstrBtn = () => {
  const instrBtnDiv = document.createElement('div');
  instrBtnDiv.classList.add('instr-btn');
  instrBtnDiv.innerText = '?';
  document.querySelector('.container').appendChild(instrBtnDiv);

  instrBtnDiv.addEventListener('click', () => {
    document.querySelector('.instructions').classList.remove('hide');
  });
};

/**
 * Function that creates LOSE MESSAGE element (hidden by default)
 */
const createLoseMsg = () => {
  const loseDiv = document.createElement('div');
  loseDiv.classList.add('lose-div');
  loseDiv.classList.add('hide');
  loseDiv.innerText = 'YOU LOSE!';
  document.body.appendChild(loseDiv);

  const loseBtn = document.createElement('div');
  loseBtn.classList.add('lose-btn');
  loseBtn.innerText = 'NEW GAME';
  loseDiv.appendChild(loseBtn);

  loseBtn.addEventListener('mouseenter', () => { onButtonEnter(loseBtn); });
  loseBtn.addEventListener('mouseleave', () => { onButtonLeave(loseBtn); });
  // "NEW GAME" BUTTON
  loseBtn.addEventListener('click', clickNewGame);
};

/**
 * Function that creates INSTRUCTIONS element (hidden by default)
 */
const createInstr = () => {
  const instrDiv = document.createElement('div');
  instrDiv.classList.add('instructions');
  instrDiv.classList.add('hide');
  document.body.appendChild(instrDiv);

  instrDiv.addEventListener('click', () => {
    document.querySelector('.instructions').classList.add('hide');
  });

  const instrHead = document.createElement('p');
  const instrBody = document.createElement('p');
  const instrFoot = document.createElement('p');
  const instrSource = document.createElement('p');
  instrHead.classList.add('instr-head');
  instrBody.classList.add('instr-body');
  instrFoot.classList.add('instr-head');
  instrSource.classList.add('instr-sources');
  instrDiv.appendChild(instrHead);
  instrDiv.appendChild(instrBody);
  instrDiv.appendChild(instrFoot);
  instrDiv.appendChild(instrSource);

  instrHead.innerHTML = '- INSTRUCTIONS -';
  instrBody.innerHTML = "1. INPUT A BET AND PRESS 'DEAL'. <br> 2. YOU ARE DEALT 5 CARDS. CHOOSE THE CARDS YOU WISH TO HOLD AND PRESS 'DRAW'. <br> 3. THE UNHELD CARDS WILL BE REPLACED AND YOU WIN CREDITS AS PER THE PAYOUT TABLE IF YOU HAVE A WINNING HAND. <br> 4. INPUT A NEW BET AND PRESS 'DEAL' TO START A NEW ROUND. THE GAME ENDS WHEN YOU RUN OUT OF CREDITS.";
  instrFoot.innerText = 'BONAM FORTUNA!';
  instrSource.innerHTML = '[ICONS AND OVERLAY IMAGE FROM FREEPIK]';
};

/**
 * Function that creates card div with event listener, name, suit and hidden hold div
 * @param {number} index index of card in hand
*/
const createCardEl = (index) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('unclicked-card');
  animateCSS(cardDiv, 'flipInY');
  cardDiv.setAttribute('id', `card${index}`);
  document.querySelector('.hand').appendChild(cardDiv);

  cardDiv.addEventListener('click', (event) => { onCardClick(event.currentTarget); });
  cardDiv.addEventListener('mouseenter', (event) => { onCardEnter(event.currentTarget); });
  cardDiv.addEventListener('mouseleave', (event) => { onCardLeave(event.currentTarget); });

  const cardName = document.createElement('p');
  cardName.classList.add('card-name');
  cardName.innerText = `${hand[index].name}`;
  cardDiv.appendChild(cardName);

  const cardSuitImg = document.createElement('img');
  cardSuitImg.src = `vp-img/${hand[index].img}`;
  cardSuitImg.classList.add('suit-img');
  cardDiv.appendChild(cardSuitImg);
  if (hand[index].img === 'heart.png' || hand[index].img === 'diamond.png') {
    cardSuitImg.classList.add('red');
  }

  const holdDiv = document.createElement('div');
  holdDiv.classList.add('hold-text');
  holdDiv.classList.add('hide');
  holdDiv.innerText = 'HOLD';
  cardDiv.appendChild(holdDiv);
};
