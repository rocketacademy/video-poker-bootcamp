// ========== DECK STUFF ============

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive)
 * @param {*} max
 * @returns random index
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * make card deck
 * @returns 52 card deck array object
 */
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    let symbol = '';
    let color = '';

    if (currentSuit === 'hearts') {
      symbol = '♥️';
      color = 'red';
    } else if (currentSuit === 'diamonds') {
      symbol = '♦️';
      color = 'red';
    } else if (currentSuit === 'clubs') {
      symbol = '♣️';
      color = 'black';
    } else if (currentSuit === 'spades') {
      symbol = '♠️';
      color = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortForm = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        shortForm = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        shortForm = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        shortForm = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        shortForm = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        displayName: shortForm,
        suitSymbol: symbol,
        suitColour: color,
        keep: false,
      };

      // Create a second set of card with the current name, suit, and rank
      // const card2 = {
      //   name: cardName,
      //   suit: currentSuit,
      //   rank: rankCounter,
      //   displayName: shortForm,
      //   suitSymbol: symbol,
      //   suitColour: color,
      //   keep: false,
      // };

      // Add the new card to the deck
      newDeck.push(card);
      // newDeck.push(card2);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/**
 * Shuffle an array of cards
 * @param {*} cards
 * @returns shuffled deck array object
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

let deck = shuffleCards(makeDeck());

// ========== GLOBAL VARIABLES ==========

let playerPoints = 100;
let playerBet = 0;
let cardNameTally = {};
let suitTally = {};
let winValue = '';
let straightTally = [];
let isStraightRoyal = false;
let gameMode = 'default';
let hand = [];

// ========== HELPER FUNCTIONS ==========

/**
 * function to populate the tally of each card name in hand
 * @returns object tally of hand by card name
 */
const populCardNameTally = () => {
  for (let i = 0; i < hand.length; i += 1) {
    const cardName = hand[i].displayName;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    else {
      cardNameTally[cardName] = 1;
    }
  }
};

/**
 * function to populate the tally of each card suit in hand
 * @returns object tally of suit by card name
 */
const populSuitTally = () => {
  for (let i = 0; i < hand.length; i += 1) {
    const cardSuit = hand[i].suit;
    if (cardSuit in suitTally) {
      suitTally[cardSuit] += 1;
    }
    else {
      suitTally[cardSuit] = 1;
    }
  }
};

/**
 * function to check x of a kind
 * @param {*} x which is the tally you are looking for
 * @returns length of keys (card name) with value that matches the tally
 */
const xOfAKind = (x) => {
  const keys = Object.keys(cardNameTally).filter((k) => cardNameTally[k] === x);
  return keys.length;
};

/**
 * function to check x of a kind and royal suit
 * @param {*} x which is the tally you are looking for
 * @returns length of keys (card name) with value that matches the tally
 */
const xOfAKindRoyal = (x) => {
  const keys = Object.keys(cardNameTally).filter((k) => cardNameTally[k] === x);
  if (keys[0] === 'J' || keys[0] === 'Q' || keys[0] === 'K' || keys[0] === 'A') {
    return keys.length;
  }
  return 0;
};

/**
 * function to check x of a suit
 * @param {*} x is the tally you are looking for
 * @returns length of keys (suit) with value that matches the tally
 */
const xOfSuit = (x) => {
  const keys = Object.keys(suitTally).filter((k) => suitTally[k] === x);
  console.log(keys);
  return keys.length;
};

/**
 * function to display text in game msg box
 * @param {*} msg
 */
const output = (msg) => {
  gameText.innerHTML = msg;
};

// hardcoded hand for testing
const hardCodeHand = [
  {
    rank: 13, suit: 'hearts', displayName: 'K', suitSymbol: '♥️', keep: false,
  },
  {
    rank: 12, suit: 'hearts', displayName: 'Q', suitSymbol: '♥️', keep: false,
  },
  {
    rank: 11, suit: 'hearts', displayName: 'J', suitSymbol: '♥️', keep: false,
  },
  {
    rank: 10, suit: 'hearts', displayName: '10', suitSymbol: '♥️', keep: false,
  },
  {
    rank: 1, suit: 'hearts', displayName: 'A', suitSymbol: '♥️', keep: false,
  },
];

/**
 * function to check for straights in hand
 * @returns true if straight condition is met
 */
const checkStraights = () => {
  // create empty array to use for checking straights
  straightTally = [];
  // create default straight condition as true
  let isStraight = true;
  // create default secondCheck condition as false to check for A cards in reverse for royal suits
  let secondCheck = false;
  // push hand ranks into straight tally array
  for (let i = 0; i < hand.length; i += 1) {
    const cardRank = hand[i].rank;
    straightTally.push(cardRank);
  }
  // sort straights array in ascending order
  straightTally.sort((a, b) => a - b);
  console.log(straightTally);
  // if there is A or rank 1 hand in straight tally
  if (straightTally[0] === 1) {
    // loop to check each array value for straight condition
    for (let j = 1; j < straightTally.length; j += 1) {
      // check if current index is consecutive to the index before it
      if (isStraight === true && straightTally[j] === straightTally[(j - 1)] + 1) {
        // if consecutive, set straight condition to true
        isStraight = true;
        console.log(isStraight);
      } else {
        // if not consecutive, end the loop and set condition to false
        console.log('reached');
        j = straightTally.length + 1;
        isStraight = false;
        // turn on secondCheck condition so that we can check consecutive for A in reverse order
        secondCheck = true;
      }
    }
  } if (secondCheck === true) {
    console.log('reached');
    // reset straight condition to default value
    isStraight = true;
    console.log(straightTally);
    // replace A card with rank 14
    straightTally.splice(0, 1, 14);
    console.log(straightTally);
    // sort straight tally so that loop can check consecutive
    straightTally.sort((a, b) => a - b);
    console.log(straightTally);
    // run loop to check if each index is consecutive to the one before
    for (let j = 1; j < straightTally.length; j += 1) {
      if (isStraight === true && straightTally[j] === straightTally[(j - 1)] + 1) {
        // if condition met, set straight value to true
        isStraight = true;
        console.log(isStraight);
      } else {
        // end loop and set straight condition to false
        j = straightTally.length + 1;
        isStraight = false;
      }
      console.log(isStraight);
    }
    if (isStraight === true) {
      isStraightRoyal = true;
    }
  }
  else {
    // if no As in straight tally, run loop to check for consecutive values
    for (let k = 1; k < straightTally.length; k += 1) {
      if (isStraight === true && straightTally[k] === straightTally[(k - 1)] + 1) {
        // if condition met, set straight value to true
        isStraight = true;
        console.log(isStraight);
      } else {
        // if not met, end loop and set straight value to false
        k = straightTally.length + 1;
        isStraight = false;
      }
      console.log(isStraight);
    }
  }
  // return straight value as true or false
  return isStraight;
};

/**
 * function to calculate hand score and return game message
 * @param {*} hand
 * @returns game message with hand score
 */
const calcHandScore = (hand) => {
  // populate tally object for card name in hand
  populCardNameTally();
  // populate tally object for suit in hand
  populSuitTally();
  // 1 royal flush (800)
  if (xOfSuit(5) === 1 && checkStraights() === true && isStraightRoyal === true) {
    winValue = 'royal flush';
    if (playerBet === 5) {
      console.log(playerBet);
      return getResult(800);
      console.log('reached');
    } return getResult(250);
    console.log('reached also');
  }
  // 2 straight flush
  if (xOfSuit(5) === 1 && checkStraights() === true) {
    winValue = 'straight flush';
    return getResult(50);
  }
  // 3 four of a kind
  if (xOfAKind(4) === 1) {
    // winRank = 3;
    winValue = 'four of a kind';
    return getResult(25);
  }
  // 4 full house
  if (xOfAKind(3) === 1 && xOfAKind(2) === 1) {
    winValue = 'full house';
    return getResult(9);
  }
  // 5 flush
  if (xOfSuit(5) === 1) {
    winValue = 'flush';
    return getResult(6);
  }
  // 6 straight
  if (checkStraights() === true) {
    winValue = 'straights';
    return getResult(4);
  }
  // 7 three of a kind
  if (xOfAKind(3) === 1) {
    // winRank = 7;
    winValue = 'three of a kind';
    return getResult(3);
  }
  // 8 two pair
  if (xOfAKind(2) === 2) {
    // winRank = 7;
    winValue = 'two pair';
    return getResult(2);
  }
  // 9 one pair
  // === TO CHANGE TO PAIR OF JACKS OR BETTER ===
  if (xOfAKindRoyal(2) === 1) {
    // winRank = 7;
    winValue = 'jacks or better';
    return getResult(2);
  }
  return forLosers();
};

/**
 * function to calculate player points and generate game msg based on bet and hand score
 * @param {*} multiplier hand score
 */
const getResult = (multiplier) => {
  console.log(winValue);
  const score = Number(playerBet) * multiplier;
  output(`You won ${winValue}.<br>You bet ${playerBet} credit(s) and won ${score} points.<br>`);
  playerPoints += Number(score);
  creditNumber.innerHTML = `${playerPoints}`;
};

/**
 * function to display game message when no winning hand
 */
const forLosers = () => {
  console.log('loser');
  output(`You have no winning hand and lost ${playerBet} points.<br>`);
  playerPoints -= Number(playerBet);
  creditNumber.innerHTML = `${playerPoints}`;
};

/**
 * function to run when hold button is clicked
 * @param {*} cardElement
 * @param {*} index
 */
const holdButtonClickEvent = (cardElement, index) => {
  if (gameMode === 'secondDeal') {
    console.log(hand[index].keep);
    cardElement = hand;
    if (hand[index].keep === false) {
      hand[index].keep = true;
    } else { hand[index].keep = false; }
  }
  else {
    output('Round over.<br>Enter bet and click "Deal" to play again.');
  }
};

/**
 * function to deal released cards
 */
const reDeal = () => {
  checkDeck();
  for (let i = 0; i < hand.length; i += 1) {
    // when keep condition is false, splice hand array index and deal new card from deck
    if (hand[i].keep === false) {
      hand.splice(i, 1, deck.pop());
    }
    displayCards();
  }
};

/**
 * function to run when plus button is clicked
 * @param {*} target
 */
const plusButtonClick = (target) => {
  const currentValue = Number(target.value);
  if (gameMode === 'default') {
    if (currentValue < 5) {
      target.value = currentValue + 1; }
    playerBet = target.value;
  } else {
    output('Game in progress.<br>Bet cannot be changed at this time.');
  }
};

/**
 * function to run when minus button is clicked
 * @param {*} target
 */
const minusButtonClick = (target) => {
  const currentValue = Number(target.value);
  if (gameMode === 'default') {
    if (currentValue >= 1) {
      target.value = currentValue - 1;
    } else {
      playerBet = Number(target.value);
    }
  } else {
    output('Game in progress.<br>Bet cannot be changed at this time.');
  }
};

/**
 * function to run when max button is clicked
 * @param {*} target
 */
const maxButtonClick = (target) => {
  if (gameMode === 'default') {
    target.value = 5;
    playerBet = Number(target.value);
  } else {
    output('Game in progress.<br>Bet cannot be changed at this time.');
  }
};

/**
 * function to display dealt cards
 */
const displayCards = () => {
  boardCard.innerHTML = '';

  for (let i = 0; i < hand.length; i += 1) {
    const cardElement = document.createElement('div');
    cardElement.id = `cardElement${i}`;
    const cardElementName = document.createElement('div');
    cardElementName.innerText = hand[i].displayName;
    cardElementName.classList.add('cardText');
    cardElement.appendChild(cardElementName);
    const cardElementSuit = document.createElement('div');
    cardElementSuit.classList.add('cardText');
    cardElementSuit.innerText = hand[i].suitSymbol;
    cardElement.appendChild(cardElementSuit);
    cardElement.classList.add('card');
    boardCard.appendChild(cardElement);
  }

  // create hold/unhold buttons for each card on board

  buttonRow.innerHTML = '';

  for (let i = 0; i < 5; i += 1) {
    const holdButton = document.createElement('button');
    holdButton.classList.add('keep');
    holdButton.innerText = 'Keep';
    holdButton.addEventListener('click', (event) => {
    // we will want to pass in the card element so
    // that we can change how it looks on screen, i.e.,
    // "turn the card over"
      holdButtonClickEvent(event.currentTarget, i);
      console.log(event.currentTarget);
    });
    buttonRow.appendChild(holdButton);
  }
};

/**
 * function to check and regenerate deck if finished
 */
const checkDeck = () => {
  if (deck.length < 5) {
    deck = [];
    deck = shuffleCards(makeDeck());
    console.log('NEWDECK');
  }
};

/**
 * function to run when deal button is clicked
 */
const dealButtonClickEvent = () => {
  // check playerBet in case bet amount entered manually
  playerBet = Number(betAmount.value);
  if (playerBet > 0 && playerBet < 6 && playerPoints > 0) {
    if (gameMode === 'default') {
      cardNameTally = {};
      suitTally = {};
      straightTally = {};
      checkDeck();
      for (let i = 0; i < 5; i += 1) {
        const card = deck.pop();
        hand.push(card);
      }
      // hand = hardCodeHand;
      displayCards();
      board.appendChild(buttonRow);
      gameMode = 'secondDeal';
      gameText.innerHTML = 'Select which cards to keep (if any) and then click \'Draw\'';
    } else if (gameMode === 'secondDeal') {
      reDeal();
      calcHandScore();
      gameMode = 'default';
      hand = [];
      gameText.innerHTML += 'Enter bet and click \'Deal\' to play another round.';
      betAmount.value = 0;
      playerBet = Number(0);
    }
  }
  else if (playerPoints <= 0) {
    output('You have no more credits<br>Buy more credits to continue playing');
  }
  else { gameText.innerHTML = 'Please enter your bet between 1 and 5'; }
};

/**
 * function to run when reset button is click
 */
const resetButtonClickEvent = () => {
  deck = [];
  deck = shuffleCards(makeDeck());
  playerPoints = 100;
  creditNumber.innerHTML = `${playerPoints}`;
  playerBet = Number(0);
  betAmount.value = `${playerBet}`;
  hand = [];
  gameMode = 'default';
  boardCard.innerHTML = '';
  buttonRow.innerHTML = '';
  gameText.innerHTML = 'Enter bet and click \'Deal\' to begin the poker game';
};

// ========== DOM ELEMENTS ==========

// create div for board to place dealt cards
const gameText = document.createElement('div');
gameText.classList.add('gameText');
gameText.innerHTML = 'Enter bet and click \'Deal\' to begin the poker game';
document.body.appendChild(gameText);

const board = document.createElement('div');
board.classList.add('board');
document.body.appendChild(board);

// create div for cards
const boardCard = document.createElement('div');
board.appendChild(boardCard);

// create div for keep/release buttons
const buttonRow = document.createElement('div');
buttonRow.classList.add('buttonRow');

const buttonRow2 = document.createElement('div');
buttonRow2.classList.add('buttonRow');
document.body.appendChild(buttonRow2);

const buttonRow3 = document.createElement('div');
buttonRow3.classList.add('buttonRow');
document.body.appendChild(buttonRow3);

const buttonGroupCredit = document.createElement('div');
buttonGroupCredit.classList.add('buttonGroup');
buttonRow3.appendChild(buttonGroupCredit);

const buttonGroupBet = document.createElement('div');
buttonGroupBet.classList.add('buttonGroup');
buttonRow3.appendChild(buttonGroupBet);

// create placement for playerPoints
const creditName = document.createElement('div');
creditName.innerText = 'Credits';
creditName.classList.add('creditName');

// create placement to show points
const creditNumber = document.createElement('div');
creditNumber.innerHTML = `${playerPoints}`;
creditNumber.classList.add('creditNumber');

// create placement for playerBet
const betName = document.createElement('div');
betName.innerText = 'Bet';
betName.classList.add('creditName');

// creater placement to show bet
const betAmount = document.createElement('input');
betAmount.value = 0;
betAmount.innerHTML = `${playerBet}`;
betAmount.classList.add('creditNumber');

// global for input + button
const betPlusButton = document.createElement('button');
betPlusButton.innerText = '+';

// global for input - button
const betMinusButton = document.createElement('button');
betMinusButton.innerText = '-';

betPlusButton.addEventListener('click', (event) => { plusButtonClick(betAmount); });
betMinusButton.addEventListener('click', (event) => { minusButtonClick(betAmount); });

// global for max button
const maxButton = document.createElement('button');
maxButton.innerText = 'max';
maxButton.addEventListener('click', (event) => { maxButtonClick(betAmount); });

// create deal button
const dealButton = document.createElement('button');
dealButton.classList.add('button');
dealButton.innerText = 'Deal / Draw';
dealButton.addEventListener('click', dealButtonClickEvent);
buttonRow2.appendChild(dealButton);

// create reset button
const resetButton = document.createElement('button');
resetButton.classList.add('button');
resetButton.innerText = 'Reset';
resetButton.addEventListener('click', resetButtonClickEvent);
buttonRow2.appendChild(resetButton);

// append buttonrow3 elements
buttonGroupCredit.appendChild(creditNumber);
buttonGroupCredit.appendChild(creditName);
buttonGroupBet.appendChild(betAmount);
buttonGroupBet.appendChild(betName);
buttonGroupBet.appendChild(betPlusButton);
buttonGroupBet.appendChild(betMinusButton);
buttonGroupBet.appendChild(maxButton);

// jsdoc --- done
// organise code -- done
// check bet value, return error msg if input is more than 5 --- done

// if points run out, pop up window buy credits --- done
// clicked card is highlighted -- no keep buttons
// add click delay when bet buttons are clicked to revert back to initial game text
// refactor to include fixed dom elements in html

// css improvements
// sound on/off?
// transition effects when cards are dealt
// start game with delay for shuffling etc and animations
// celebration animation when won with highlight on which pay schedule won and how many credits
// clicked card is highlighted -- no keep buttons
// maybe push bet amount and credit to the top? buttons below.
// modern attractive colors
// instead of reset, dom element pops up when playerPoints is 0. get user to buy more coins
// ability to hide/show pay schedule
// player name
// leaderboard

// JS DOC
// first line is a description of the function
// @param describes the input of the function
// @return describes the output
