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
let canClick = true;
let score = 0;

// deifning sound events
const backgroundSound = new Audio('/images/Patakas World.wav');
backgroundSound.volume = 0.2;

const dealSound = new Audio('/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/shuffling-cards-1.wav');

const successPurchaseSound = new Audio('/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/Success-sound-effect.wav');

const defaultButtonSound = new Audio('/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/button-3.wav');
defaultButtonSound.volume = 0.1;

const winSound = new Audio('/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/mixkit-slot-machine-win-1928.wav');
winSound.volume = 0.2;

const loseSound = new Audio('/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/mixkit-retro-arcade-game-over-470.wav');
// loseSound.volume = 0.2;

const pointsCreditSound = new Audio('/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/mixkit-clinking-coins-1993.wav');

const flipCardsSound = new Audio('/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/Card-flip-sound-effect.wav');

// ========== HELPER FUNCTIONS ==========

// loop background music
backgroundSound.addEventListener('ended', () => {
  backgroundSound.currentTime = 0;
  backgroundSound.play();
}, false);

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

let winID = '';
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
    winValue = 'ROYAL FLUSH';
    winID = 'win1';
    if (playerBet === 5) {
      console.log(playerBet);
      return getResult(800);
      console.log('reached');
    } return getResult(250);
    console.log('reached also');
  }
  // 2 straight flush
  if (xOfSuit(5) === 1 && checkStraights() === true) {
    winValue = 'STRAIGHT FLUSH';
    winID = 'win2';

    return getResult(50);
  }
  // 3 four of a kind
  if (xOfAKind(4) === 1) {
    // winRank = 3;
    winValue = 'FOUR OF A KIND';
    winID = 'win3';

    return getResult(25);
  }
  // 4 full house
  if (xOfAKind(3) === 1 && xOfAKind(2) === 1) {
    winValue = 'FULL HOUSE';
    winID = 'win4';

    return getResult(9);
  }
  // 5 flush
  if (xOfSuit(5) === 1) {
    winValue = 'FLUSH';
    winID = 'win5';

    return getResult(6);
  }
  // 6 straight
  if (checkStraights() === true) {
    winValue = 'STRAIGHTS';
    winID = 'win6';

    return getResult(4);
  }
  // 7 three of a kind
  if (xOfAKind(3) === 1) {
    // winRank = 7;
    winValue = 'THREE OF A KIND';
    winID = 'win7';

    return getResult(3);
  }
  // 8 two pair
  if (xOfAKind(2) === 2) {
    // winRank = 7;
    winValue = 'TWO PAIR';
    winID = 'win8';

    return getResult(2);
  }
  // 9 one pair
  // === TO CHANGE TO PAIR OF JACKS OR BETTER ===
  if (xOfAKindRoyal(2) === 1) {
    // winRank = 7;
    winValue = 'JACKS OR BETTER';
    winID = 'win9';

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
  score = Number(playerBet) * multiplier;
  pointsCredited.innerHTML = `+ ${score}`;
  pointsCredited.classList.remove('pointsDebited');
  pointsCredited.classList.add('pointsCredited');
  output(`You bet ${playerBet} credit(s) and won ${score} points<br>`);
  winMsg(`${winValue}`);
  winSound.play();
  winMsgBanner.style.visibility = 'visible';
  playerPoints += Number(score);
  creditNumber.innerHTML = `${playerPoints}`;
};

/**
 * function to display game message when no winning hand
 */
const forLosers = () => {
  console.log('loser');
  output(`You have no winning hand and lost ${playerBet} points<br>`);
  pointsCredited.innerHTML = `- ${playerBet}`;
  pointsCredited.classList.add('pointsDebited');
  pointsCredited.classList.remove('pointsCredited');
  playerPoints -= Number(playerBet);
  creditNumber.innerHTML = `${playerPoints}`;
  loseMsgBanner.innerHTML = 'YOU LOST';
  loseSound.play();
  loseMsgBanner.style.visibility = 'visible';
};

/**
 * function to run when hold button is clicked
 * @param {*} cardElement
 * @param {*} index
 */
const holdButtonClickEvent = (cardElement, index) => {
  if (gameMode === 'secondDeal') {
    defaultButtonSound.play();
    console.log(hand[index].keep);
    if (hand[index].keep === false) {
      hand[index].keep = true;
      cardElement.classList.add('border-card');
    } else {
      hand[index].keep = false;
      cardElement.classList.remove('border-card');
    }
  }
  // else {
  //   output('Round over.<br>Enter bet and click "Deal" to play again.');
  // }
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
  defaultButtonSound.play();

  betAmount.classList.add('flash');
  const currentValue = Number(target.value);
  if (gameMode === 'default') {
    if (currentValue < 5) {
      target.value = currentValue + 1;
      playerBet = Number(target.value);
      highlightColumn(target);
    }
    playerBet = Number(target.value);
    highlightColumn(target);
  } else {
    output('Game in progress.<br>Bet cannot be changed at this time.');
  }
};

/**
 * function to run when minus button is clicked
 * @param {*} target
 */
const minusButtonClick = (target) => {
  defaultButtonSound.play();
  betAmount.classList.add('flash');
  const currentValue = Number(target.value);
  if (gameMode === 'default') {
    if (currentValue >= 1) {
      target.value = currentValue - 1;
      playerBet = Number(target.value);
      highlightColumn(target);
    } else {
      playerBet = Number(target.value);
      highlightColumn(target);
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
  defaultButtonSound.play();
  betAmount.classList.add('flash');
  if (gameMode === 'default') {
    target.value = 5;
    playerBet = Number(target.value);
    highlightColumn(target);
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
    // cardElement.id = `cardElement${i}`;
    const colorClass = hand[i].suitColour;

    // --- show card details in top left corner

    const nameSuitGroup = document.createElement('div');
    nameSuitGroup.classList.add('card-topleft');
    cardElement.appendChild(nameSuitGroup);

    const cardElementName = document.createElement('div');
    cardElementName.innerText = hand[i].displayName;
    cardElementName.classList.add('card-corner-rank', `${colorClass}`);
    nameSuitGroup.appendChild(cardElementName);

    const cardElementSuit = document.createElement('div');
    cardElementSuit.classList.add('card-corner-suit', 'suitSize');
    cardElementSuit.innerText = hand[i].suitSymbol;
    nameSuitGroup.appendChild(cardElementSuit);

    // === show card details in other corner

    const nameSuitGroup2 = document.createElement('div');
    nameSuitGroup2.classList.add('card-bottomright');
    cardElement.appendChild(nameSuitGroup2);

    const cardElementName2 = document.createElement('div');
    cardElementName2.innerText = hand[i].displayName;
    cardElementName2.classList.add('card-corner-rank', `${colorClass}`);
    nameSuitGroup2.appendChild(cardElementName2);

    const cardElementSuit2 = document.createElement('div');
    cardElementSuit2.classList.add('card-corner-suit', 'suitSize');
    cardElementSuit2.innerText = hand[i].suitSymbol;
    nameSuitGroup2.appendChild(cardElementSuit2);

    cardElement.classList.add('card');
    cardElement.addEventListener('click', (event) => {
    // we will want to pass in the card element so
    // that we can change how it looks on screen, i.e.,
    // "turn the card over"
      holdButtonClickEvent(event.currentTarget, i);
      console.log(event.currentTarget);
    });
    boardCard.appendChild(cardElement);
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
  if (canClick === true) {
    pointsCredited.innerHTML = '';
    winMsgBanner.style.visibility = 'hidden';
    loseMsgBanner.style.visibility = 'hidden';
    // check playerBet in case bet amount entered manually
    playerBet = Number(betAmount.value);
    highlightColumn();
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
        dealSound.play();
        setTimeout(displayCards, 500);
        board.appendChild(buttonRow);
        gameMode = 'secondDeal';
        setTimeout(() => {
          gameText.innerHTML = 'Select which cards to keep (if any) and click [ DEAL ]<br>Highlighted cards will remain in your hand'; }, 1000);
      } else if (gameMode === 'secondDeal') {
        canClick = false;
        dealSound.play();
        gameText.innerHTML = 'analyzing results ...';

        setTimeout(() => {
          reDeal();
          gameMode = 'default';
        }, 600);

        setTimeout(() => {
          calcHandScore();
          hand = [];
          betAmount.value = 0;
          playerBet = Number(0);
          const rowID = `#${winID}`;
          if (score > 0) {
            document.querySelectorAll(`${rowID}`).forEach((el) => {
              el.classList.add('highlight-column');
            });
          } }, 2000);

        setTimeout(() => {
          pointsCreditSound.play();
          creditNumber.classList.add('flash');
          pointsCredited.style.visibility = 'visible';
        }, 5000);

        setTimeout(() => {
          gameText.innerHTML = 'Enter bet and click [ DEAL ] to play another round';
          boardCard.innerHTML = '';
          winMsgBanner.style.visibility = 'hidden';
          loseMsgBanner.style.visibility = 'hidden';
          initDeck();
          document.querySelectorAll('[id^="bet"]').forEach((el) => {
            el.classList.remove('highlight-column');
          });
          document.querySelectorAll('[id^="win"]').forEach((el) => {
            el.classList.remove('highlight-column');
          });
          canClick = true;
          score = 0;
          flipCardsSound.play();
          pointsCredited.style.visibility = 'hidden';
        }, 8000);
      }
      else if (playerPoints <= 0) {
        output('You have no more credits left<br>Buy more credits to continue playing');
      } }
    else { gameText.innerHTML = 'Use [ MAX ] [ + ] [ - ] buttons<br>to enter your bet and then click [ DEAL ]'; }
  }
};

/**
 * function to run when reset button is click
 */
const resetButtonClickEvent = () => {
  defaultButtonSound.play();
  gameText.innerHTML = 'reset in progress ...';
  setTimeout(() => {
    flipCardsSound.play();
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
    gameText.innerHTML = 'Use [ MAX ] [ + ] [ - ] buttons to enter your bet<br>Then, click [ DEAL ] to begin the poker game';
    score = 0;
    initDeck();
    document.querySelectorAll('[id^="bet"]').forEach((el) => {
      el.classList.remove('highlight-column');
    });
  }, 2000);
};

// function to highlight pay table columns
const highlightColumn = () => {
  document.querySelectorAll('[id^="bet"]').forEach((el) => {
    el.classList.remove('highlight-column');
  });
  const columnName = `#bet${playerBet}`;
  document.querySelectorAll(`${columnName}`).forEach((el) => {
    el.classList.add('highlight-column');
  });
};

// ========== DOM ELEMENTS ==========

// create div for board to place dealt cards
const gameText = document.createElement('div');
gameText.classList.add('gameText');
gameText.innerHTML = 'Use [ MAX ] [ + ] [ - ] buttons to enter your bet<br>Then, click [ DEAL ] to begin the poker game';

const board = document.createElement('div');
board.classList.add('board');

// create div for cards
const boardCard = document.createElement('div');
board.appendChild(boardCard);

// create div for top info
const topRow = document.createElement('div');
topRow.classList.add('topRow');

// create span for credited winning points
const pointsCredited = document.createElement('span');
// topRow.appendChild(pointsCredited);
pointsCredited.classList.add('pointsCredited');
pointsCredited.style.visibility = 'hidden';
pointsCredited.innerHTML = '+ 5';

// create div for keep/release buttons
const buttonRow = document.createElement('div');
// buttonRow.classList.add('buttonRow');

const buttonRow2 = document.createElement('div');
buttonRow2.classList.add('buttonRow');

const buttonRow3 = document.createElement('div');
buttonRow3.classList.add('buttonRow');

const buttonGroupCredit = document.createElement('div');
buttonGroupCredit.classList.add('buttonGroup');
topRow.appendChild(buttonGroupCredit);

const buttonGroupTop = document.createElement('div');
buttonGroupTop.classList.add('buttonGroup');
topRow.appendChild(buttonGroupTop);

// create placement for playerPoints
const creditName = document.createElement('div');
creditName.innerText = 'CREDIT';
creditName.classList.add('creditName', 'extra-credit');

// create placement to show points
const creditNumber = document.createElement('div');
creditNumber.innerHTML = `${playerPoints}`;
creditNumber.classList.add('creditNumber');
creditNumber.addEventListener('animationend', () => {
  creditNumber.classList.remove('flash');
});

// create placement for playerBet
const betName = document.createElement('div');
betName.innerText = 'BET';
betName.classList.add('creditName', 'extra-bet');

// creater placement to show bet
const betAmount = document.createElement('input');
betAmount.value = 0;
betAmount.innerHTML = `${playerBet}`;
betAmount.classList.add('creditNumber');
betAmount.addEventListener('animationend', () => {
  betAmount.classList.remove('flash');
});

// global for input + button
const betPlusButton = document.createElement('button');
betPlusButton.innerText = '+';
betPlusButton.classList.add('button-bet');

// global for input - button
const betMinusButton = document.createElement('button');
betMinusButton.innerText = '-';
betMinusButton.classList.add('button-bet');

betPlusButton.addEventListener('click', (event) => { plusButtonClick(betAmount); });
betMinusButton.addEventListener('click', (event) => { minusButtonClick(betAmount); });

// global for max button
const maxButton = document.createElement('button');
maxButton.innerText = 'MAX';
maxButton.addEventListener('click', (event) => { maxButtonClick(betAmount); });
maxButton.classList.add('button');

// create deal button
const dealButton = document.createElement('button');
dealButton.classList.add('button-deal');
dealButton.innerText = 'DEAL';
dealButton.addEventListener('click', dealButtonClickEvent);

// create reset button
const resetButton = document.createElement('button');
resetButton.classList.add('button');
resetButton.innerText = 'RESET';
resetButton.addEventListener('click', resetButtonClickEvent);

// create winning banner
const winMsgBanner = document.createElement('div');
winMsgBanner.classList.add('winMsg');
winMsgBanner.innerHTML = '';
board.appendChild(winMsgBanner);

const winMsg = (msg) => {
  winMsgBanner.innerHTML = '';
  winMsgBanner.innerHTML = msg;
};

// create losing banner
const loseMsgBanner = document.createElement('div');
loseMsgBanner.classList.add('loseMsg');
loseMsgBanner.innerHTML = '';
board.appendChild(loseMsgBanner);

// append buttonrow3 elements
buttonGroupCredit.appendChild(creditName);
buttonGroupCredit.appendChild(creditNumber);
buttonGroupTop.appendChild(betName);
buttonGroupTop.appendChild(betAmount);
buttonRow2.appendChild(resetButton);
buttonRow2.appendChild(betMinusButton);
buttonRow2.appendChild(dealButton);
buttonRow2.appendChild(betPlusButton);
buttonRow2.appendChild(maxButton);

const initDeck = () => {
  // board.innerHTML = '';
  for (let i = 0; i < 5; i += 1) {
    const cardDefault = document.createElement('div');
    // cardDefault.innerHTML = '';
    // cardElement.id = `cardElement${i}`;
    // const cardElementName = document.createElement('div');
    // cardElementName.innerText = hand[i].displayName;
    // cardElementName.classList.add('cardText');
    // cardElement.appendChild(cardElementName);
    // const cardElementSuit = document.createElement('div');
    // cardElementSuit.classList.add('cardText');
    // cardElementSuit.innerText = hand[i].suitSymbol;
    // cardElement.appendChild(cardElementSuit);
    cardDefault.classList.add('card-back');
    // cardElement.addEventListener('click', (event) => {
    // we will want to pass in the card element so
    // that we can change how it looks on screen, i.e.,
    // "turn the card over"
    //   holdButtonClickEvent(event.currentTarget, i);
    //   console.log(event.currentTarget);
    // });
    boardCard.appendChild(cardDefault);
  // }
  }
};

const initGame = () => {
  document.body.appendChild(gameText);
  document.body.appendChild(board);
  document.body.appendChild(topRow);
  document.body.appendChild(buttonRow2);
  document.body.appendChild(buttonRow3);
};

initDeck();
initGame();

let musicOn = false;

const backgroundPlay = () => {
  if (musicOn === false) {
    backgroundSound.play();
    musicOn = true;
  } else {
    backgroundSound.pause();
    musicOn = false;
  }
};

// create music toggle button
const coll = document.getElementsByClassName('collapsible');
for (let i = 0; i < coll.length; i += 1) {
  coll[i].addEventListener('click', function () {
    defaultButtonSound.play();
    this.classList.toggle('active');
    const content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
}

// jsdoc --- done
// organise code -- done
// check bet value, return error msg if input is more than 5 --- done
// if points run out, pop up window buy credits --- done
// clicked card is highlighted -- no keep buttons --- done
// confirm prompt when player buys coins -- done
// sound on/off? --- done
// clicked card is highlighted -- no keep buttons --- done
// maybe push bet amount and credit to the top? buttons below. --- done
// ability to hide/show pay schedule --- done
// css modal window for buy coins --- done
// rework the color scheme --- done
// transition effects when cards are dealt --- done
// animation for dealt cards --- done
// sound effect for each button --- done
// modern attractive colors --- okok
// canclick check for cards --- done
// check reset button outcome --- done
// instead of how much they won in text, have a dom element appear beside credits box -- done
// celebration animation when won with highlight on which pay schedule won and how many credits done

// still pending

// consider flashing pay schedule
// debug error on highlight row when lost

// instead of reset, dom element pops up when playerPoints is 0. get user to buy more coins

// add click delay when bet buttons are clicked to revert back to initial game text -- maybe no need

// JS DOC
// first line is a description of the function
// @param describes the input of the function
// @return describes the output
