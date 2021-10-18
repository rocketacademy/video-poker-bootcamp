// Global variables
// Card arrays
let cardDeck = [];
let playerHand = [];
// Arrays to store data from player's hand
let arraySuitsNames = [];
let arrayNumOfEachSuit = [];
let arrayCardNames = [];
let arrayNumOfEachCard = [];
// Array to store index of cards to swap after clicking
let cardsToChangeIndex = [];
let playerPoints = 1000;
// Multiply players points based on bet amount selected
let pointMultiplier = 1;
// Variables to generate visual displays and add a class
const cardDisplay = document.createElement('div');
cardDisplay.classList.add('card-container');
const pointsDisplay = document.createElement('div');
const handDisplay = document.createElement('div');
handDisplay.classList.add('hand-outcome');
const endGameDiv = document.createElement('div');
pointsDisplay.classList.add('points');
const instructionsBtn = document.createElement('button');
instructionsBtn.classList.add('instructions-button');
instructionsBtn.innerHTML = 'Instructions';
document.body.appendChild(instructionsBtn);
const blackBox = document.createElement('div');
blackBox.classList.add('black-box');
document.body.appendChild(blackBox);
const resetSwapCard0 = document.querySelector('.swap-bar0');
const resetSwapCard1 = document.querySelector('.swap-bar1');
const resetSwapCard2 = document.querySelector('.swap-bar2');
const resetSwapCard3 = document.querySelector('.swap-bar3');
const resetSwapCard4 = document.querySelector('.swap-bar4');
const pokerTable = document.querySelector('.poker-table-container');
const welcomeMessage = document.createElement('div');
// Global values for output variables
let gameOutcome = '';
let isInstrucDisplayed = false;
let swapCard = '';
let addedScore = '';
// Arrays to get sound elements from HTML file and adjust volume
const cardSound = document.getElementById('card-sound');
cardSound.volume = 1;
const betSound = document.getElementById('bet-sound');
betSound.volume = 0.2;
const instructionsSound = document.getElementById('instructions-sound');
instructionsSound.volume = 0.4;
const dealSound = document.getElementById('deal-sound');
dealSound.volume = 0.5;
const introSound = document.getElementById('intro-sound');
introSound.volume = 0.6;
const winSound = document.getElementById('win-sound');
winSound.volume = 0.3;
const winSound2 = document.getElementById('win-sound2');
winSound2.volume = 0.3;
const winSound3 = document.getElementById('win-sound3');
winSound3.volume = 0.3;
const loseSound = document.getElementById('lose-sound1');
loseSound.volume = 0.3;
const loseSound2 = document.getElementById('lose-sound2');
loseSound2.volume = 0.3;
const gameOverSound = document.getElementById('game-over');
gameOverSound.volume = 0.6;
// Store win and lose sounds in array so that they can be rotated on each button click
const winSoundArray = [winSound, winSound2, winSound3];
const loseSoundArray = [loseSound, loseSound2];
// Using global counters to loop through above arrays to change sounds
let winIndex = 0;
let loseIndex = 0;

// Function to toggle between showing and hiding instructions
const showInstructions = () => {
  // Play sound when button clicked
  instructionsSound.play();
  // If hidden show, else hide instructions
  if (isInstrucDisplayed === false) {
    isInstrucDisplayed = true;
    document.body.removeChild(blackBox);
  } else {
    isInstrucDisplayed = false;
    document.body.appendChild(blackBox);
  }
};
instructionsBtn.addEventListener('click', showInstructions);

// Create a deck
const makeDeck = () => {
  cardDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitEmoji = ['❤️', '♦️', '♣️', '♠️'];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentEmoji = suitEmoji[suitIndex];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let shortName = `${rankCounter}`;

      if (shortName === '1') {
        shortName = 'A';
      } else if (shortName === '11') {
        shortName = 'J';
      } else if (shortName === '12') {
        shortName = 'Q';
      } else if (shortName === '13') {
        shortName = 'K';
      }

      let cardName = `${rankCounter}`;
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      let emojiColour = '';
      if (currentSuit === 'hearts') {
        emojiColour = 'red';
      } else if (currentSuit === 'diamonds') {
        emojiColour = 'red';
      } else if (currentSuit === 'spades') {
        emojiColour = 'black';
      } else if (currentSuit === 'clubs') {
        emojiColour = 'black';
      }
      // Create a new card with the current name, suit, and rank, colour, displayName and emoji
      const generatedCard = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentEmoji,
        displayName: shortName,
        colour: emojiColour,
      };

      // Add the new card to the deck
      cardDeck.push(generatedCard);
    }
  }
  // Return the completed card deck
  return cardDeck;
};

const getRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleCards = (cardDeck) => {
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    const randomIndex = getRandomIndex(cardDeck.length);
    const randomCard = cardDeck[randomIndex];
    const currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

// Select or unselect card to be swapped and hide or show 'swap' message
const cardClick = (index) => {
  // Play sound when button clicked
  cardSound.play();
  // Each card is linked to an index based on loop in line 222
  for (let m = 0; m < 5; m += 1) {
    // If card index equal to loop index then enter code block
    if (index === m) {
      // If card index is inside of global array, remove it
      // This means that if player clicks the same card twice, we count it as unselecting the card
      // and remove it from the array
      if (cardsToChangeIndex.includes(m) === true) {
        cardsToChangeIndex = cardsToChangeIndex.filter((n) => n !== m);
        swapCard = document.querySelector(`.swap-bar${m}`);
        // Hide 'swap' text
        swapCard.style.zIndex = '-4';
        // If card index is not inside global array, add index to global array
      } else {
        cardsToChangeIndex.push(m);
        swapCard = document.querySelector(`.swap-bar${m}`);
        // Show 'swap' text
        swapCard.style.zIndex = '4';
      }
    }
  }
};

// Create visual card based on card info from playerHand
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);
  return card;
};

// Deal player a hand after clicking deal button
const dealHand = () => {
  let newCard;
  for (let i = 0; i < 5; i += 1) {
    newCard = cardDeck.pop();
    newCard.index = `${i}`;
    playerHand.push(newCard);
  }
  return playerHand;
};

// Convert dealt hand into visual cards
const convertHandToDisplay = () => {
  let cardElement;
  let appendCard;
  for (let k = 0; k < playerHand.length; k += 1) {
    cardElement = playerHand[k];
    appendCard = createCard(cardElement);
    cardDisplay.appendChild(appendCard);
    appendCard.addEventListener('click', () => { cardClick(k); });
  }
};

// Deal card to player and convert info into visual card
const displayCard = () => {
  // Play sound effect on button click
  dealSound.play();
  // 'Reset' swap messages by changing stack order
  resetSwapCard0.style.zIndex = '-4';
  resetSwapCard1.style.zIndex = '-4';
  resetSwapCard2.style.zIndex = '-4';
  resetSwapCard3.style.zIndex = '-4';
  resetSwapCard4.style.zIndex = '-4';
  // Reset all visual elements and global values for subsequent rounds
  handDisplay.innerHTML = '';
  cardDisplay.innerHTML = '';
  endGameDiv.innerHTML = '';
  playerHand = [];
  cardDeck = [];
  cardsToChangeIndex = [];
  arraySuitsNames = [];
  arrayNumOfEachSuit = [];
  arrayCardNames = [];
  arrayNumOfEachCard = [];
  // Create new deck
  makeDeck();
  shuffleCards(cardDeck);
  // Create element to visualize score subtraction from betting
  const scoreSubtraction = document.querySelector('.score-subtraction');
  // Update player points based on bet amount
  playerPoints -= (100 * pointMultiplier);
  // If player is broke, give them another 1000 point
  if (playerPoints < 0) {
    playerPoints = 1000;
    playerPoints -= (100 * pointMultiplier);
    // Used inline styling to show 1000 points given in green and bet amount in red
    scoreSubtraction.innerHTML = `<p style="color:green">+1000</p>  -${(100 * pointMultiplier)}`;
  } else {
    scoreSubtraction.innerHTML = `-${(100 * pointMultiplier)}`;
  }
  // Displays players current points
  pointsDisplay.innerHTML = `Credits: ${playerPoints}`;
  // Deal cards to player
  dealHand();
  // Convert cards into visual display
  convertHandToDisplay();
  // Timeout so that point subtraction is only temporary
  setTimeout(() => { scoreSubtraction.innerHTML = ''; }, 1500);
};

// Calculate best hand after player clicks swap button
const evaluateWin = () => {
  // Store card names and frequency in object
  const cardNameTally = {};
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardName = playerHand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  // Store card suit and frequency in object
  const cardSuitTally = {};
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardSuit = playerHand[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  // Update global arrays to store card data
  arraySuitsNames = Object.keys(cardSuitTally);
  arrayCardNames = Object.keys(cardNameTally);
  arrayNumOfEachCard = Object.values(cardNameTally);
  // Execute each function to check for winning condition
  checkForRoyalFlush();
  checkForStraightFlush();
  checkForFourOfKind();
  checkForFullHouse();
  checkForFlush();
  checkForStraight();
  checkForThreeOfKind();
  checkForTwoPair();
  checkForOnePair();
  checkForHighCard();
  // Update points
  pointsDisplay.innerHTML = `Credits: ${playerPoints}`;
  if (playerPoints <= 0) {
    handDisplay.innerHTML = 'You Ran Out Of Points! <br> Game Over!';
  } else {
    handDisplay.innerHTML = `Your Best Hand: ${gameOutcome}! `;
  }
  // Display players hand
  endGameDiv.classList.add('next-round-container');
  endGameDiv.innerHTML = `You got a ${gameOutcome}`;
  document.body.appendChild(endGameDiv);
  // Display points won or loss for a few seconds
  const scoreAddition = document.querySelector('.score-addition');
  scoreAddition.innerHTML = `${addedScore}`;
  // If high card (lose points) ensure points change text color is red, else green
  if (addedScore === `-${(100 * pointMultiplier)}`) {
    scoreAddition.style.color = 'red';
  } else {
    scoreAddition.style.color = 'green';
  }
  setTimeout(() => { scoreAddition.innerHTML = ''; }, 1500);
};

// After player has clicked swap button, use index of positions to change to update hand, generate new display and check for winning condition
const changeCards = () => {
  let newCard;
  for (let j = 0; j < cardsToChangeIndex.length; j += 1) {
    newCard = cardDeck.pop();
    playerHand[cardsToChangeIndex[j]] = newCard;
  }
  cardDisplay.innerText = '';
  convertHandToDisplay();
  evaluateWin();
};

// Multiply bet amount based on betting button selected
const multiplyBet1 = () => {
  betSound.play();
  const scoreTable = document.querySelector('.score-board');
  scoreTable.src = 'Media/score-board1.png';
  return pointMultiplier = 1;
};

const multiplyBet2 = () => {
  betSound.play();
  const scoreTable = document.querySelector('.score-board');
  scoreTable.src = 'Media/score-board2.png';
  return pointMultiplier = 2;
};

const multiplyBet3 = () => {
  betSound.play();
  const scoreTable = document.querySelector('.score-board');
  scoreTable.src = 'Media/score-board3.png';
  return pointMultiplier = 3;
};

const multiplyBet4 = () => {
  betSound.play();
  const scoreTable = document.querySelector('.score-board');
  scoreTable.src = 'Media/score-board4.png';
  return pointMultiplier = 4;
};

const multiplyBet5 = () => {
  betSound.play();
  const scoreTable = document.querySelector('.score-board');
  scoreTable.src = 'Media/score-board5.png';
  return pointMultiplier = 5;
};

// Create visual displays for when browser loads
const createDisplay = () => {
  pointsDisplay.innerHTML = `Credits: ${playerPoints}`;
  const gameInfo = document.createElement('div');
  gameInfo.innerHTML = '.';
  gameInfo.classList.add('game-info');

  const dealButton = document.createElement('button');
  dealButton.innerText = 'Deal';
  dealButton.classList.add('deal-button');
  dealButton.classList.add('chip6');

  const swapButton = document.createElement('button');
  swapButton.innerText = 'Swap';
  swapButton.classList.add('swap-button');
  swapButton.classList.add('chip7');

  const pointsBtn1 = document.createElement('button');
  pointsBtn1.classList.add('bet-button-1');
  pointsBtn1.classList.add('chip1');

  pointsBtn1.innerHTML = 'Bet 100';
  const pointsBtn2 = document.createElement('button');
  pointsBtn2.classList.add('bet-button-2');
  pointsBtn2.classList.add('chip2');

  pointsBtn2.innerHTML = 'Bet 200';
  const pointsBtn3 = document.createElement('button');
  pointsBtn3.classList.add('bet-button-3');
  pointsBtn3.classList.add('chip3');

  pointsBtn3.innerHTML = 'Bet 300';
  const pointsBtn4 = document.createElement('button');
  pointsBtn4.classList.add('bet-button-4');
  pointsBtn4.classList.add('chip4');

  pointsBtn4.innerHTML = 'Bet 400';
  const pointsBtn5 = document.createElement('button');
  pointsBtn5.classList.add('bet-button-5');
  pointsBtn5.classList.add('chip5');

  pointsBtn5.innerHTML = 'Bet 500';

  pokerTable.appendChild(dealButton);
  pokerTable.appendChild(swapButton);
  pokerTable.appendChild(pointsBtn1);
  pokerTable.appendChild(pointsBtn2);
  pokerTable.appendChild(pointsBtn3);
  pokerTable.appendChild(pointsBtn4);
  pokerTable.appendChild(pointsBtn5);
  pokerTable.appendChild(gameInfo);
  pokerTable.appendChild(pointsDisplay);
  pokerTable.appendChild(handDisplay);
  pokerTable.appendChild(cardDisplay);

  dealButton.addEventListener('click', displayCard);
  swapButton.addEventListener('click', changeCards);
  pointsBtn1.addEventListener('click', multiplyBet1);
  pointsBtn2.addEventListener('click', multiplyBet2);
  pointsBtn3.addEventListener('click', multiplyBet3);
  pointsBtn4.addEventListener('click', multiplyBet4);
  pointsBtn5.addEventListener('click', multiplyBet5);
};

// Check for winning conditions
const checkForFlush = () => {
  // Sort cards so they can be compared for straight winning condition
  playerHand.sort((a, b) => a.rank - b.rank);
  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  if (straight === false && arraySuitsNames.length === 1 && arrayNumOfEachCard.includes(4) === false && !(arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === true)) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'Flush';
    addedScore = `+${(500 * pointMultiplier)}`;
    return playerPoints += (500 * pointMultiplier);
  }
  return playerPoints;
};

const checkForThreeOfKind = () => {
  if (arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === false && arraySuitsNames.length !== 1) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'Three of a Kind';
    addedScore = `+${(300 * pointMultiplier)}`;

    return playerPoints += (300 * pointMultiplier);
  }
  return playerPoints;
};

const checkForFourOfKind = () => {
  if (arrayNumOfEachCard.includes(4) === true) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'Four of a Kind';
    addedScore = `+${(2500 * pointMultiplier)}`;
    return playerPoints += (2500 * pointMultiplier);
  }
  return playerPoints;
};

const checkForFullHouse = () => {
  if (arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === true) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'Full House';
    addedScore = `+${(1000 * pointMultiplier)}`;
    return playerPoints += (1000 * pointMultiplier);
  }
  return playerPoints;
};

const checkForTwoPair = () => {
  if (arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.includes(3) === false && arraySuitsNames.length !== 1 && arrayCardNames.length === 3) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'Two Pair';
    addedScore = `+${(200 * pointMultiplier)}`;
    return playerPoints += (200 * pointMultiplier);
  }
  return playerPoints;
};

const checkForOnePair = () => {
  // eslint-disable-next-line max-len
  if (arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.length === 4 && arrayNumOfEachCard.includes(3) === false && arrayNumOfEachCard.includes(4) === false && arraySuitsNames.length !== 1) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'One Pair';
    addedScore = `+${(100 * pointMultiplier)}`;
    return playerPoints += (100 * pointMultiplier);
  }
  return playerPoints;
};

const checkForStraight = () => {
  playerHand.sort((a, b) => a.rank - b.rank);
  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  if (straight === true && arraySuitsNames.length !== 1) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'Straight';
    addedScore = `+${(400 * pointMultiplier)}`;
    return playerPoints += (400 * pointMultiplier);
  }
  return playerPoints;
};

const checkForStraightFlush = () => {
  playerHand.sort((a, b) => a.rank - b.rank);
  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  if (straight === true && arraySuitsNames.length === 1) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'Straight Flush';
    addedScore = `+${(5000 * pointMultiplier)}`;
    return playerPoints += (5000 * pointMultiplier);
  }
  return playerPoints;
};

const checkForRoyalFlush = () => {
  playerHand.sort((a, b) => a.rank - b.rank);
  let straight = true;
  for (let i = 1; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  // eslint-disable-next-line max-len
  if (straight === true && arraySuitsNames.length === 1 && playerHand[0].rank === 1 && playerHand[1].rank === 10) {
    winSoundArray[winIndex].play();
    winIndex += 1;
    if (winIndex === 3) {
      winIndex = 0;
    }
    gameOutcome = 'Royal Flush';
    addedScore = `+${(10000 * pointMultiplier)}`;
    return playerPoints += (10000 * pointMultiplier);
  }
  return playerPoints;
};

const checkForHighCard = () => {
  // Check for straight
  playerHand.sort((a, b) => a.rank - b.rank);
  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }

  if (straight === false && arraySuitsNames.length !== 1 && arrayCardNames.length === 5)
  {
    playerPoints -= (100 * pointMultiplier);
    if (playerPoints <= 0) {
      gameOverSound.play();
    } else {
      loseSoundArray[loseIndex].play();
      loseIndex += 1;
      if (loseIndex === 2) {
        loseIndex = 0;
      }
    }

    gameOutcome = 'High Card';
    addedScore = `-${(100 * pointMultiplier)}`;
    return playerPoints;
  }
  return playerPoints;
};

// Remove pop up display at the start so that game can begin
const removeMessageBox = () => {
  pokerTable.removeChild(welcomeMessage);
  // Play intro song
  introSound.play();
};

// Create and display pop-up elements, when page loads
const createWelcomeMessage = () => {
  welcomeMessage.classList.add('welcome-message');

  const continueBtn = document.createElement('button');
  continueBtn.innerHTML = 'Click To Continue!';
  continueBtn.classList.add('continue-button');

  const welcomeGif1 = document.createElement('img');
  welcomeGif1.classList.add('welcome-gif1');
  welcomeGif1.src = 'Media/welcome1.gif';

  const welcomeGif2 = document.createElement('img');
  welcomeGif2.classList.add('welcome-gif2');
  welcomeGif2.src = 'Media/welcome2.gif';

  const gifImg = document.createElement('img');
  gifImg.classList.add('gif-image');
  gifImg.src = 'Media/intro-gif.gif';

  welcomeMessage.appendChild(welcomeGif1);
  welcomeMessage.appendChild(welcomeGif2);
  welcomeMessage.appendChild(continueBtn);
  welcomeMessage.appendChild(gifImg);
  pokerTable.appendChild(welcomeMessage);

  continueBtn.addEventListener('click', removeMessageBox);
};

// Create pop-up and display to appear when page loads
const initGame = () => {
  createDisplay();
  createWelcomeMessage();
};
// Execute game
initGame();
