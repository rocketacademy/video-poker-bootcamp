// video poker is a single player poker
// ** five-card draw rules **
// user starts with 100 points
// "deal" gives 5 cards
// user can choose any number of cards to "swap"
// after "swap", game assigns points based on resulting hand

// ========== GLOBAL VARIABLES ========== //
// ----- General ----- //
let playerPoints = 100;
let pointsBet = 0;

let gameDeck = '';

let cardElement;

// ----- Game Hands ----- //
let firstHand;
let secondHand;
let handRank = 0;

// ----- Game State ----- //
let gameState = '';
const GAME_STATE_INITIALISE = 'initialise';
const GAME_STATE_ANTE = 'ante';
const GAME_STATE_FIRST_HAND = 'first hand';
const GAME_STATE_PAYOUT = 'payout';
const GAME_STATE_RESET = 'reset';

// ----- html ----- //
const mainDiv = document.createElement('div');
mainDiv.classList.add('main-div', 'wrapper');
const messageInterface = document.createElement('div');
messageInterface.classList.add('message-interface');
const outputMessage = document.createElement('p');
outputMessage.classList.add('message');
messageInterface.appendChild(outputMessage);

const gameInterface = document.createElement('div');
gameInterface.classList.add('game-interface');
const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');
const gameInfo = document.createElement('div');
gameInfo.classList.add('game-info');

const pokerTable = document.createElement('img');
pokerTable.setAttribute('src', 'assets/poker-table.png');
pokerTable.classList.add('poker-table');
gameBoard.appendChild(pokerTable);

const cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
gameBoard.appendChild(cardContainer);

const playerPanel = document.createElement('div');
playerPanel.classList.add('player-panel');
gameInterface.appendChild(gameBoard);
gameInterface.appendChild(gameInfo);
gameInfo.innerText = `Player Credits: ${playerPoints}
Betting Pot: ${pointsBet}`;
gameInterface.appendChild(playerPanel);

// ----- playerPanel buttons setup -----/
const betButton = document.createElement('button');
betButton.classList.add('bet-button');
betButton.innerText = 'Bet 1';
playerPanel.appendChild(betButton);
let betClick = false;
const dealButton = document.createElement('button');
dealButton.classList.add('deal-button');
dealButton.innerText = 'Deal Hand';
playerPanel.appendChild(dealButton);
let dealClick = false;
// const swapButton = document.createElement('button');
// swapButton.innerText = 'swap';
// playerPanel.appendChild(swapButton);
// const swapClick = false;

// ========== HELPER FUNCTIONS ========== //
// ----- Function 1: Create the deck ----- //
/**
 * A function that creates the deck
 *
 * @returns {Array}
 */
const createDeck = () => {
  // newDeck array to contain cards
  const newDeck = [];

  // outer loop. four suits; suit symbols; suit colors
  const suits = ['diamonds', 'clubs', 'hearts', 'spades'];
  const suitSymbols = ['♦️', '♣️', '♥️', '♠️'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];

    let suitColor = '';
    if (currentSuit === 'diamonds' || currentSuit === 'hearts') {
      suitColor = 'red';
    } else if (currentSuit === 'clubs' || currentSuit === 'spades') {
      suitColor = 'black';
    }
    // inner loop. 1 to 13 ranks;
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Define card names
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;
      // Define exceptions for card name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // Define exceptions for display name
      if (shortName === '1') {
        shortName = 'A';
      } else if (shortName === '11') {
        shortName = 'J';
      } else if (shortName === '12') {
        shortName = 'Q';
      } else if (shortName === '13') {
        shortName = 'K';
      }

      // Create Card
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        symbol: currentSymbol,
        color: suitColor,
        displayName: shortName,
        image: `card-${currentSuit}-${rankCounter}.png`,
      };

      // add card to deck through push function.
      newDeck.push(card);
    }
  }

  return newDeck;
};

// ----- Function 2: Shuffle the deck ----- //
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);
// Shuffle an array of cards
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

// ----- Function 3: Place function 1 and 2 into a var; ----- //
// ** Can be used for making a new deck for reset ** //
const getGameDeck = () => {
  gameDeck = shuffleCards(createDeck());
  console.log(gameDeck);
  return gameDeck;
};

// ---- Function 4: Get the first 5 cards for the first hand ----- //
const drawHand = () => {
  const playerHand = [];
  for (let i = 0; i < 5; i += 1) {
    // create virtual hand

    const card = gameDeck.pop();
    playerHand.push(card);

    // create UI hand
  }
  console.log(playerHand[0]);
  console.log(playerHand[1]);
  console.log(playerHand[2]);
  console.log(playerHand[3]);
  console.log(playerHand[4]);

  return playerHand;
};

// ----- Function 5: Sorts player hand in ascending ranks ----- //
const sortHand = (inputArray) => {
  let sorted = false;
  while (sorted === false) {
    let swapCounter = 0;
    for (let i = 0; i < inputArray.length - 1; i += 1) {
      if (inputArray[i].rank > inputArray[i + 1].rank) {
        const tempObj = inputArray[i + 1];
        inputArray[i + 1] = inputArray[i];
        inputArray[i] = tempObj;
        swapCounter += 1;
      } else if (i === inputArray.length - 2 && swapCounter === 0) {
        sorted = true;
      }
    }
  }
  return inputArray;
};

/**
 * Function ##: To show which card is selected to be swapped.
 * Puts the selected card in temporary array to be compared to hand and to be removed later.
 * @param {*} handArray
 */
let selectedCardsArray = [];
let isCardSelected;

const selectCard = (selectedCard) => {
  isCardSelected = false;
  console.log('Selected card:');
  console.log(selectedCard);
  if (selectedCardsArray.length > 0) {
    for (let i = 0; i < selectedCardsArray.length; i += 1)
    {
      if (selectedCard === selectedCardsArray[i]) {
        isCardSelected = true;
        selectedCardsArray.splice(i, 1);
      }
    }
  }
  if (isCardSelected === false) {
    selectedCardsArray.push(selectedCard);
  }

  console.log(selectedCardsArray);
};

// ----- Function 6: Preparing card details for DOM Manipulation ----- //
const createCard = (cardInfo) => {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardImage = document.createElement('img');
  cardImage.setAttribute('src', `assets/${cardInfo.image}`);
  cardImage.classList.add('card-image');
  let cardFront = true;
  cardImage.addEventListener('click', () => {
    if (gameState === GAME_STATE_FIRST_HAND && cardFront === true) {
      cardImage.setAttribute('src', 'assets/card-back.png');
      cardFront = false;
    } else if (gameState === GAME_STATE_FIRST_HAND && cardFront === false) {
      cardImage.setAttribute('src', `assets/${cardInfo.image}`);
      console.log(`${cardInfo.image}`);
      cardFront = true;
    }
    console.log(cardFront);
  });

  card.appendChild(cardImage);

  // const cardName = document.createElement('div');
  // cardName.classList.add(cardInfo.name, cardInfo.color);
  // cardName.innerText = cardInfo.displayName;

  // const cardSuit = document.createElement('div');
  // cardSuit.classList.add(cardInfo.suit, cardInfo.color);
  // cardSuit.innerText = cardInfo.symbol;

  // card.appendChild(cardName);
  // card.appendChild(cardSuit);

  return card;
};

// ----- Function 7: Use card details from function 6 to manifest cards on screen ----- //

const instantiateHand = (handArray) => {
  cardContainer.innerHTML = '';
  for (let i = 0; i < handArray.length; i += 1) {
    cardElement = createCard(handArray[i]);
    cardElement.addEventListener('click', () => { selectCard(handArray[i]); });
    cardContainer.appendChild(cardElement);
  }
};

/**
 * Function ##: for swaping selected cards
 */
const swapCards = (handArray) => {
  for (let i = 0; i < handArray.length; i += 1) {
    for (let j = 0; j < selectedCardsArray.length; j += 1) {
      // loop through selectedCardsArray for every card in FIRST HAND to compare if card is selected
      // if card is selected, swap out card for new card from deck

      if (selectedCardsArray[j].rank === handArray[i].rank
        && selectedCardsArray[j].suit === handArray[i].suit) {
        handArray.splice(i, 1, gameDeck.pop());
      }
    }
  }
  // empty selectedCardsArray after swapping
  selectedCardsArray = [];
  // clear current player's hand
  return handArray;
};

// ----- Function 8: Check for
const checkHandCondition = (handArray) => {
  let handCondition;

  // cheat hand
  // const handArray = [
  //   { name: 'ace', suit: 'hearts', rank: 1 },
  // { name: 'ace', suit: 'diamonds', rank: 1 },
  // { name: 'ace', suit: 'spades', rank: 1 },
  // { name: 'ace', suit: 'clubs', rank: 5 },
  // { name: '5', suit: 'hearts', rank: 5 },
  // ];

  // condition checkers
  const matchArray = [];
  const royalHand = [1, 10, 11, 12, 13];
  let straightCond = true;
  let flushCond = true;
  let royalCond = true;

  // loop through entire hand
  for (let i = 0; i < handArray.length - 1; i += 1) {
    // if find a match, push to matchArray
    if (handArray[i].rank === handArray[i + 1].rank) {
      matchArray.push(handArray[i].rank);
    }
    // check for flush
    if (handArray[i].suit !== handArray[i + 1].suit) {
      flushCond = false;
    }
    // check for straight
    if (handArray[i].rank !== handArray[i + 1].rank - 1) {
      straightCond = false;
    }
    if (handArray[i].rank !== royalHand[i]) {
      royalCond = false;
    }
  }

  // determine hand conditions
  // ********** Hand Rankings ********** //
  // 1. five of a kind
  // 2. straight flush
  // 3. four of a kind
  // 4. full house
  // 5. flush
  // 6. straight
  // 7. three of a kind
  // 8. two pair
  // 9. one pair
  // 10. high card
  // *********************************** //
  if (matchArray.length === 0 && royalCond === true && flushCond === true)
  {
    handCondition = 10; // ROYAL FLUSH
  } else if (matchArray.length === 0 && straightCond === true && flushCond === true) {
    handCondition = 9; // STRAIGHT FLUSH
  } else if (matchArray.length === 3
    && matchArray[0] === matchArray[1] && matchArray[0] === matchArray[2]) {
    handCondition = 8; // FOUR OF A KIND
  } else if (matchArray.length === 3
    && (matchArray[0] !== matchArray[1] || matchArray[0] !== matchArray[2])) {
    handCondition = 7; // FULL HOUSE
  } else if (matchArray.length === 0 && flushCond === true && straightCond === false) {
    handCondition = 6; // FLUSH
  } else if (matchArray.length === 0 && straightCond === true && flushCond === false) {
    handCondition = 5; // STRAIGHT
  } else if (matchArray.length === 2 && matchArray[0] === matchArray[1]) {
    handCondition = 4; // THREE OF A KIND
  } else if (matchArray.length === 2 && matchArray[0] !== matchArray[1]) {
    handCondition = 3; // TWO PAIR
  } else if (matchArray.length === 1) {
    handCondition = 2; // ONE PAIR
  } else if (matchArray.length === 0 && (handArray[0].rank === 1 || handArray[4].rank > 10)) {
    handCondition = 1; // HIGH CARD
  } else {
    handCondition = 0; // LOSE
  }
  console.log(`Hand Condition: ${handCondition}`);
  return handCondition;
};
const getPayoutMultiplier = (handTier) => {
  let multiplier;
  // high card
  if (handTier === 1) {
    multiplier = 1;
  }
  // one pair
  if (handTier === 2) {
    multiplier = 2;
  }
  // two pair
  if (handTier === 3) {
    multiplier = 3;
  }
  // three of a kind
  if (handTier === 4) {
    multiplier = 4;
  }
  // straight
  if (handTier === 5) {
    multiplier = 6;
  }
  // flush
  if (handTier === 6) {
    multiplier = 9;
  }
  // full house
  if (handTier === 7) {
    multiplier = 25;
  }
  // four of a kind
  if (handTier === 8) {
    multiplier = 50;
  }
  // straight flush
  if (handTier === 9) {
    multiplier = 800;
  }
  // royal flush
  if (handTier === 10) {
    multiplier = 2500;
  }

  return multiplier;
};
/**
 * Function ##: Hand Rank Text
 */
const getHandRankText = () => {
  let handEvaluation = '';
  if (handRank === 0) {
    handEvaluation = `Your current hand is a x${handRank} multiplier. Nothing. Yes, anything multiplied by 0 is nothing. You'll lost your bet.
    Try to at least get a "high card" that is worth x1 multiplier so you can test your luck without feeling too bad.`;
  } else if (handRank === 1) {
    handEvaluation = `Jacks or better! Your current hand is worth x${handRank} multiplier. At the very least you get your money back.

    But you didn't come here to not win... did you?`;
  } else if (handRank === 2) {
    handEvaluation = `One pair! Your current hand is worth x${handRank} multiplier. Not bad, you have now made a 100% return on investment...
    At least for this round`;
  } else if (handRank === 3) {
    handEvaluation = `Two pairs, but it's not 2x2 multiplier. Your current hand is worth x${handRank} multiplier. Well you're getting somewhere.
    I hope you've managed to recover some of your losses. 😐`;
  } else if (handRank === 4) {
    handEvaluation = `A three of a kind is worth a x${handRank} multiplier, go figure. One has a 7% change of getting this hand. Either you're really lucky or this might mean you've been playing for awhile. Please go take a break if needed. ❤️`;
  } else if (handRank === 5) {
    handEvaluation = `A straight hand's pretty tough to get and it's worth x6 multiplier of your investment.
    Don't forget that attaining this hand is a 1% chance and to try and push your luck doesn't bring you good places.
    `;
  } else if (handRank === 6) {
    handEvaluation = `A flush 🚽 returns a x9 multiplier. 
    Take care and not take too many chances or you may flush your winnings from this hand away!`;
  } else if (handRank === 7) {
    handEvaluation = `A full house 🏡👨‍👩‍👦👨‍👩‍👧‍👦🏠. Dont forget that gambling too hard gives you an empty house instead...

    A full house is worth x25 multiplier to support your full house back in your real home. Don't forget them. 🙂`;
  } else if (handRank === 8) {
    handEvaluation = `Nice, a four of a kind is really rare, almost legendary like a unicorn 🦄. Your current hand is worth x50 multiplier. Not bad, you can now made a 100% return on investment...
    At least for this round`;
  } else if (handRank === 9) {
    handEvaluation = `A straight flush gives a x800 multiplier. 
    That's really something else. I'm glad you've managed to make a profit from this session. Better leave now because we all know what happens if you try to push your luck 😬`;
  } else if (handRank === 10) {
    handEvaluation = `A ROYAL FLUSH?!?! This hand gives a x2500 multiplier.
    Good job, you literally got the highest hand in the game - whether by pure luck or cheating
    
    If you relied on luck to pull this hand... I wonder if you've spent your lifetime supply of it here... 🤔`;
  }
  return handEvaluation;
};
/**
 * Function 9: Game State Manager
 */
const changeGameState = () => {
  if (gameState === GAME_STATE_PAYOUT) {
    gameState = GAME_STATE_RESET;
  }
  if (gameState === GAME_STATE_FIRST_HAND) {
    gameState = GAME_STATE_PAYOUT;
  }
  if (gameState === GAME_STATE_ANTE) {
    gameState = GAME_STATE_FIRST_HAND;
  }
  if (gameState === GAME_STATE_INITIALISE) {
    gameState = GAME_STATE_ANTE;
  }
};
/**
 * Function that helps evaluate and process payout
 */
const processPayout = (multiplier) => {
  const winnings = pointsBet * multiplier;
  playerPoints += winnings;
  return `You got ${winnings} credits for this round, bringing your credits total to ${playerPoints}!
  
  Hit 'Continue' to start the next round! The deck has ${gameDeck.length} cards left.`;
};
/**
 * Function 10: Output messages based on game state
 */
const getMessageOutput = () => {
  let gameMessage;
  if (gameState === GAME_STATE_INITIALISE) {
    gameMessage = `Welcome to 'Pixel Poker'.
    This game takes after the 1-player video poker style in the casinos of 70s-80s Vegas.
    
    The game is played with 5-card draw rules with some house-rules to spice things up.
    Take time to read the little handbook prepared if you want a detailed guide, but you're here to play and not read.
    
    So sit down, take a load off, grab a shot (I reccommend whiskey), and let's play.`;
  }
  if (gameState === GAME_STATE_ANTE) {
    gameMessage = `You are starting this round with ${playerPoints} credits.
    Each click on the 'bet' button places 1 credit into the pot. There is no upper limit to how much you can start the opening bet.`;
  }
  if (gameState === GAME_STATE_FIRST_HAND) {
    gameMessage = `Alright, this is your starting hand
    
    ${getHandRankText()}.
    
    Now, you are free to choose the cards you would like to swap out. Choose wisely.
    
    Are you feeling lucky? You can take this chance to up your bet if you so choose.

    After this your bet will be locked in, you will receive cards to replace those you swapped out,
    and your hand will be evaluated immediately.
    `;
  }
  if (gameState === GAME_STATE_PAYOUT) {
    gameMessage = `This is your new hand after swapping.
    
    ${getHandRankText()}.
    
    `;
  }
  if (gameState === GAME_STATE_RESET) {
    gameMessage = `Here's the start of your next round let's hope you do better this time.
    I mean... there's always a better hand to draw right?
    
    Place your bets please! :)`;
  }
  return gameMessage;
};

/**
 * Function 11: betButton functionality. Helps player give away their money to the game.
 */
const giveAwayMoney = () => {
  if (betClick === true) {
    playerPoints -= 1;
    pointsBet += 1;
    dealClick = true;
  }

  gameInfo.innerText = `Player Credits: ${playerPoints}
Betting Pot: ${pointsBet}`;

  if ((gameState === GAME_STATE_ANTE && playerPoints > 0)
  || (gameState === GAME_STATE_FIRST_HAND && playerPoints > 0)
  || (gameState === GAME_STATE_RESET && playerPoints > 0)) {
    betClick = true;
  } else { betClick = false; }
};

/**
 * Function 12: dealButton functionality
 */

const manipulateCards = () => {
  if (gameState === GAME_STATE_RESET) {
    gameState = GAME_STATE_ANTE;
    outputMessage.innerText = getMessageOutput();
  }
  if (gameState === GAME_STATE_PAYOUT) {
    // restart game because player pressed on 'continue'
    dealButton.innerText = 'Deal Hand';
    pointsBet = 0;
    changeGameState();
    console.log(gameState);

    betClick = true;

    firstHand = '';
    secondHand = '';

    cardContainer.innerHTML = '';
    selectedCardsArray = [];

    gameInfo.innerText = `Player Credits: ${playerPoints}
Betting Pot: ${pointsBet}`;
    outputMessage.innerText = getMessageOutput();
  }
  if (gameState === GAME_STATE_FIRST_HAND && dealClick === true) {
    dealButton.innerText = 'Continue';
    changeGameState();
    console.log(gameState);

    betClick = false;

    secondHand = sortHand(swapCards(firstHand));
    instantiateHand(secondHand);
    handRank = checkHandCondition(secondHand);
    const payoutText = processPayout(getPayoutMultiplier(handRank));

    gameInfo.innerText = `Player Credits: ${playerPoints}
Betting Pot: ${pointsBet}`;
    outputMessage.innerText = getMessageOutput() + payoutText;
  }
  if (gameState === GAME_STATE_ANTE && dealClick === true) {
    dealButton.innerText = 'Swap Cards';
    firstHand = sortHand(drawHand());
    instantiateHand(firstHand);
    handRank = checkHandCondition(firstHand);
    changeGameState();
    console.log(gameState);
    outputMessage.innerText = getMessageOutput();
  }
};

// ========== INITIALISATION ========== //
const initGame = () => {
  document.body.appendChild(mainDiv);
  mainDiv.appendChild(messageInterface);
  mainDiv.appendChild(gameInterface);

  // initialise button functions
  betButton.addEventListener('click', giveAwayMoney);
  dealButton.addEventListener('click', manipulateCards);
  // swapButton.addEventListener('click');

  gameState = GAME_STATE_INITIALISE;
  console.log(`Game State: ${gameState}`);
  outputMessage.innerText = getMessageOutput();
  getGameDeck();

  setTimeout(() => {
    changeGameState();
    console.log(`Game State: ${gameState}`);
    outputMessage.innerText = getMessageOutput();
  }, 3000);
};

initGame();
