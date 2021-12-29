// Helper Function //
/**
 * A function that deals the initiate cards out
 * returns playerHand
 */
const dealCards = (noOfCards) => {
  const listOfCards = [];
  // Shuffle the deck of cards
  console.log(cardDeck);

  // Draw x number of cards
  for (let i = 0; i < noOfCards; i += 1) {
    const card = cardDeck.pop();
    const cardName = card.name;
    listOfCards.push(card);
  }
  console.log(listOfCards);
  return listOfCards;
};

/**
 * Calculates the score of the player's hand
 * @param {array} playerHand, array of objects
 * @returns {number} total rank / score of the total cards in Hand
 */
const calcHandScore = (playerHand) => {
  cardTally = [];
  cardTally.suit = {};
  cardTally.name = {};
  cardTally.rank = {};

  // let score = 0;
  // for (cards in playerHand) {
  //   score += playerHand[cards].rank;
  // }

  for (index in playerHand) {
    const card = playerHand[index];
    const cardName = card.name;
    const cardSuit = card.suit;
    const cardRank = card.rank;

    tallyCards(cardName, cardTally.name);
    tallyCards(cardSuit, cardTally.suit);
    tallyCards(cardRank, cardTally.rank);
  }
  // Check for flush
  flush = countSuit();
  // Check for 4 of a kind , flush, 2 pair
  const combination = countNames();

  console.log(flush);
  console.log(combination);
  console.log(cardTally);

  outputMessage(`You have obtained ${combination} so far!<br><br> Click 'Deal' if you want to keep them. <br> Otherwise, click the cards that you want to change and 'Swap'`);
  const score = obtainScore(combination);

  if (dealCounter % 2 != 0) {
    const betAmount = document.getElementById('betting').value;
    credits += score * Number(betAmount);
    updateScore();
    outputMessage(`You have obtained ${combination}. You have obtained ${score * Number(betAmount)} credit from your bet!<br> Place your bets and click 'Deal' to continue`);
  }

  console.log(`The card score is ${score}`);
  return score;
};

/**
 * Use to calculate the score of the hand combination
 * @param {string} combinationType is the combination name e.g. "Flush" or "Straights" etc
 * @returns {number} score based on the combination type
 */
const obtainScore = (combinationType) => {
  const keys = Object.keys(scoreBoard);

  for (index in keys) {
    const combinationName = keys[index];
    if (String(combinationType) == combinationName) {
      return scoreBoard[combinationName];
    }
  }
};

/**
 * tallyCards helps to total up the number of cards in the hand.
 * @param {key} cardAttribute it is one of the keys from playerHand, either suit or name
 * @param {element} cardTallyAttribute empty element, counting the new cards
 */
const tallyCards = (cardAttribute, cardTallyAttribute) => {
  if (cardAttribute in cardTallyAttribute) {
    cardTallyAttribute[cardAttribute] += 1;
  } else {
    cardTallyAttribute[cardAttribute] = 1;
  }
};

/**
 * Detects whether there is a flush draw
 * @returns true or false condition, whether it is a flush
 */
const countSuit = () => {
  // Obtain the keys of the element
  const suitKeys = Object.keys(cardTally.suit);
  // iterate through the suit and find if there's a flush
  for (index in suitKeys) {
    const suitName = suitKeys[index];
    if (cardTally.suit[suitName] == 5) {
      return true;
    }
    return false;
  }
};

/**
 * Check cards to see what combination type it is
 * @returns {string} Tells what type of set there is
 */
const countNames = () => {
  // keys within the cardTally
  const nameKeys = Object.keys(cardTally.name);
  let combinationType;
  // 4 of a kind or full house. Only 2 unique numbers for them.
  if (nameKeys.length == 2) {
    for (let index = 0; index < nameKeys.length; index += 1) {
      // name is the key of the element
      const name = nameKeys[index];
      // cardTally.name[name] = value of the name
      if (cardTally.name[name] == 4) {
        combinationType = '4-kind';
        return combinationType;
      }
      if (cardTally.name[name] == 3) {
        combinationType = 'Full-House';
        return combinationType;
      }
    }
  }
  // Check Straights
  if (nameKeys.length == 5) {
    let aceStatus = false;
    // Ace
    if (nameKeys.includes('A')) {
      aceStatus = true;
    }

    const nameRank = Object.keys(cardTally.rank);
    let straightCounter = 0;
    // Counter to verify
    for (let i = 0; i < nameKeys.length - 1; i += 1) {
      const a = nameRank[i];
      const b = nameRank[i + 1];
      const value = b - a;
      if (value == 1) {
        straightCounter += 1;
      }
    }
    // Check for straights
    if (straightCounter == 4) {
      combinationType = 'Straights';
      // Check Straight Flush
      if (flush == true) {
        combinationType = 'Straight Flush';
      }
      // Check Royal Flush
      if (aceStatus == true && flush == true) {
        combinationType = 'Royal Flush';
      }
      return combinationType;
    }

    // Special case Ace for lower straights
    if (aceStatus == true) {
      const lowStraights = ['2', '3', '4', '5', '14'];
      if (nameRank.every((value) => lowStraights.includes(value))) { combinationType = 'Straights'; }

      if (flush == true) {
        combinationType = 'Straight Flush';
      }
      return combinationType;
    }
  }

  // Triple or 2 pairs or pair or high card
  if (nameKeys.length >= 3) {
    if (flush == true) {
      combinationType = 'Flush';
      return combinationType;
    }
    let pairCounter = 0;
    for (let index = 0; index < nameKeys.length; index += 1) {
      const name = nameKeys[index];
      if (cardTally.name[name] == 3) {
        combinationType = 'Triples';
        return combinationType;
      }
      if (cardTally.name[name] == 2) {
        pairCounter += 1;
      }
    }
    if (pairCounter == 2) {
      combinationType = '2 Pairs';
      return combinationType;
    }
    if (pairCounter == 1) {
      combinationType = '1 Pair';
      return combinationType;
    }
    combinationType = 'High Card';
    return combinationType;
  }
};

const testClick = () => {
  const test = playerHandLowStraightsFlush;
  console.log(test);
  calcHandScore(test);
};

/**
 * Create the DOM elements of the card
 * @param {object} cardInfo, details of each card
 * @returns DOM created card
 */
const createCard = (cardInfo, index) => {
  const suit = document.createElement('div');
  suit.classList.add(cardInfo.suit, cardInfo.color);
  suit.innerText = cardInfo.suitSymbol + cardInfo.displayName;
  suit.id = 'suit1';

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.color);
  name.innerText = cardInfo.displayName;

  const suit2 = document.createElement('div');
  suit2.classList.add(cardInfo.suit, cardInfo.color);
  suit2.innerText = cardInfo.suitSymbol + cardInfo.displayName;
  suit2.id = 'suit2';

  const card = document.createElement('div');
  card.classList.add('card');

  const frontContainer = document.createElement('div');
  frontContainer.classList.add('front-container');

  frontContainer.appendChild(suit);
  frontContainer.appendChild(name);
  frontContainer.appendChild(suit2);

  // frontContainer.addEventListener('click', () => {
  //   cardSelect(cardInfo, index);
  //   console.log(cardInfo, index);
  // });

  const backContainer = document.createElement('div');
  backContainer.classList.add('back-container');

  // backContainer.addEventListener('click' () => {
  //   console.log(cardInfo, index);
  // })

  card.addEventListener('click', (event) => {
    cardSelect(cardInfo, index);
    console.log(cardInfo, index);

    const element = event.currentTarget;
    if (element.className === 'card') {
      if (element.style.transform == 'rotateY(180deg)') {
        element.style.transform = 'rotateY(0deg)';
      }
      else {
        element.style.transform = 'rotateY(180deg)';
      }
    }
  });

  card.appendChild(frontContainer);
  card.appendChild(backContainer);

  return card;
};

/**
 * Deals the cards and calculates the score.
 */
const dealClick = () => {
  // This line resets and reshuffle the deck for subsequent plays
  if (dealCounter % 2 == 0) {
    cardContainer.innerHTML = '';
    cardDeck = shuffleDeck(generateDeck());

    player1Hand = dealCards(cardDrawn);
    player1Score = calcHandScore(player1Hand);

    for (index in player1Hand) {
      const card = createCard(player1Hand[index], index);
      cardContainer.appendChild(card);
    }

    // Disable button after dealing the cards
    const btnMode = document.getElementById('deal-btn');
    btnMode.disabled = true;
    swapOnce = true;
    dealCounter += 1;

    let i = 0;
    const ref = setInterval(() => {
      const btnMode = document.getElementById('deal-btn');
      btnMode.disabled = false;

      i += 1;
      if (i >= 1) {
        clearInterval(ref);
      }
    }, 1000);

    const betButton = document.getElementById('betting');
    betButton.disabled = true;
    betButton.style.color = 'red';
    const betAmount = betButton.value;
    credits -= betAmount;
    updateScore();
    return;
  }

  if (dealCounter % 2 != 0) {
    calcHandScore(player1Hand);

    const betButton = document.getElementById('betting');
    betButton.disabled = false;
    betButton.style.color = 'white';
    resetGame();
  }
};

/**
 * Obtains the index of the card & toggle the swap button
 * @param {Element} cardInfo cardInfo is the details of the card.
 * @param {number} index index of cards that is gonna be replaced
 * @returns Index of cards that needs to be replaced
 */
const cardSelect = (cardInfo, index) => {
  // if index is not inside, append. Otherwise remove.
  if (cardSelectIndex.includes(Number(index)) === false) {
    cardSelectIndex.push(Number(index));
    console.log(cardSelectIndex);
  }
  else {
    // Obtain the index of which the number is repeated
    const removeIndex = cardSelectIndex.indexOf(Number(index));
    // Remove the card base on the index, 1 time.
    cardSelectIndex.splice(removeIndex, 1);
    console.log(cardSelectIndex);
  }

  // Toggle the swap button, can remove btnMode below here once done
  const toggleMode = document.getElementById('deal-btn');
  if (cardSelectIndex.length > 0) {
    toggleMode.innerHTML = 'Swap';
    toggleMode.disabled = false;
    toggleDeal = false;
  } else {
    toggleMode.disabled = true;
    toggleMode.innerHTML = 'Deal';
    toggleDeal = true;
  }
  // console.log(cardSelectIndex);
  return cardSelectIndex;
};

/**
 *
 * @param {array} newCards array of card elements
 * @param {array} playerHand overall playerHand, array of elements
 * @param {array} cardSelectIndex contains array of index to remove playerHand
 * @returns updated playerHand
 */
const replaceCard = (newCards, playerHand, cardSelectIndex) => {
  for (index in cardSelectIndex) {
  // The index of the hand of which cards to be replaced
    const cardIndex = cardSelectIndex[index];
    // Obtain the element of the new card
    const newCard = newCards[index];
    // Replace the old card using index, 1 time, with the new element card
    playerHand.splice(cardIndex, 1, newCard);
  }
  return playerHand;
};

/**
 * Swap Click button allows for user to swap their cards
 */
const swapClick = () => {
  // Draw new cards base on length;
  const noOfCards = cardSelectIndex.length;
  const newCards = dealCards(noOfCards);

  // Replace the cards in player's Hand
  player1Hand = replaceCard(newCards, player1Hand, cardSelectIndex);
  // console.log(player1Hand);

  // Print the score for the new cards
  const score = calcHandScore(player1Hand);

  // Reupdate the javascript DOM with new cards
  cardContainer.innerHTML = ''; // Empty the container
  for (index in player1Hand) {
    const card = createCard(player1Hand[index], index);

    // cardWrapper.appendChild(card);
    cardContainer.appendChild(card);
  }

  const betButton = document.getElementById('betting');
  betButton.disabled = false;
  betButton.style.color = 'white';

  resetGame();
};

/**
 * Function to toggle between deal and swap card
 */
const clickFunc = () => {
  if (toggleDeal == true) {
    dealClick();
  }

  if (toggleDeal == false && swapOnce == true) {
    swapClick();
  }
};

const resetGame = () => {
  const btnMode = document.getElementById('deal-btn');
  btnMode.innerHTML = 'Deal';
  btnMode.disabled = false;
  toggleDeal = true;
  swapOnce = false;
  dealCounter += 1;
  cardSelectIndex = [];
  cardTally = [];
};

const outputMessage = (message) => {
  const messagePlace = document.getElementById('message-board');
  messagePlace.innerHTML = message;
};

const updateScore = () => {
  const scoreSystem = document.getElementById('credit-scoree');
  scoreSystem.innerHTML = `points: ${credits}`;
};

const generateScoreBoard = () => {
  // Table Creation
  const table = document.getElementById('table-body');
  for (let i = 0; i < Object.keys(scoreBoard).length; i += 1) {
    const combinationKeyValuePair = Object.entries(scoreBoard)[i];
    const row = table.insertRow();
    const cell1 = document.createElement('td');
    const cell2 = document.createElement('td');

    cell1.innerHTML = combinationKeyValuePair[0];
    cell2.innerHTML = combinationKeyValuePair[1];
    row.appendChild(cell1);
    row.appendChild(cell2);
  }
};

// Global Variable
let player1Hand;
let cardContainer;
let btnContainer;
let player1Score;
let cardTally = [];
let cardSelectIndex = [];
const cardDrawn = 5;
let cardDeck = shuffleDeck(generateDeck());
let flush;
let toggleDeal = true;
let swapOnce = false;
let dealCounter = 0;
let credits = 100;
const scoreBoard = generatePoints();

const initGame = () => {
  // const score = document.createElement('span');
  // score.innerHTML = '100';
  // score.id = 'score';

  // Card Container
  cardContainer = document.createElement('div');
  cardContainer.classList.add('card-container');
  document.body.appendChild(cardContainer);

  // points
  const pointsContainer = document.createElement('div');
  pointsContainer.classList.add('points-container');
  document.body.appendChild(pointsContainer);

  const creditScore = document.createElement('div');
  creditScore.innerHTML = `points: ${credits}`;
  creditScore.classList.add('credit-score');
  creditScore.id = 'credit-scoree';

  const betRange = document.createElement('input');
  betRange.type = 'number';
  betRange.min = '1';
  betRange.max = credits;
  betRange.defaultValue = 1;
  betRange.classList.add('bet-range');
  betRange.id = 'betting';

  const newlabel = document.createElement('Label');
  newlabel.setAttribute('for', betRange);
  newlabel.innerHTML = 'Bet amount: ';

  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');

  const messageBoard = document.createElement('div');
  messageBoard.innerHTML = 'Welcome to Poker Table. <br> Set the bet amount and "Deal" the cards.';
  messageBoard.id = ('message-board');
  messageContainer.appendChild(messageBoard);

  // pointContainer parent
  pointsContainer.appendChild(messageContainer);
  pointsContainer.appendChild(creditScore);
  pointsContainer.appendChild(newlabel);
  pointsContainer.appendChild(betRange);

  // Btn Container
  btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-container');
  document.body.appendChild(btnContainer);

  // // Bet Button
  // const betContainer = document.createElement('div');
  // betContainer.classList.add('bet-container');
  // btnContainer.appendChild(betContainer);

  // const betButton1 = document.createElement('button');
  // betButton1.innerHTML = 'Bet';
  // betButton1.classList.add('bet-button');
  // betContainer.appendChild(betButton1);

  // const betRange1 = document.createElement('input');
  // betRange1.type = 'number';
  // betRange1.min = '1';
  // betRange1.max = credits;
  // betRange1.classList.add('bet-range');
  // betContainer.appendChild(betRange1);

  // Deal Button
  const dealBtn = document.createElement('button');
  dealBtn.innerHTML = 'Deal';
  dealBtn.classList.add('neon-button');
  dealBtn.id = 'deal-btn';
  btnContainer.appendChild(dealBtn);

  // Deal button contains the deal card and calculating score
  dealBtn.addEventListener('click', clickFunc);

  // Generate scoreboard in CSS DOM
  generateScoreBoard();

  // // Change card button
  // const swapCardBtn = document.createElement('button');
  // swapCardBtn.innerHTML = 'Swap';
  // // swapCardBtn.classList.add('disabled-button');
  // swapCardBtn.id = 'swap-btn';
  // swapCardBtn.disabled = true;
  // btnContainer.appendChild(swapCardBtn);
  // swapCardBtn.addEventListener('click', swapClick);

  // const testContainer = document.createElement('div');
  // document.body.append(testContainer);

  // const testBtn = document.createElement('button');
  // testBtn.innerHTML = 'Test';
  // testBtn.id = 'test-btn';
  // testContainer.appendChild(testBtn);
  // testBtn.addEventListener('click', testClick);

  // const testImage = document.createElement('div');

  // const trial = {
  //   suitSymbol: '♠️', suit: 'spades', name: 'king', displayName: 'K', color: 'black', rank: 13,
  // };

  // testImage.appendChild(createCard(trial, 0));
  // document.body.append(testImage);
};
initGame();
