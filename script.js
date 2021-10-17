// Global variables
let cardDeck = [];
let playerPoints = 1000;
let pointMultiplier = 1;
let cardsToChangeIndex = [];
const cardDisplay = document.createElement('div');
cardDisplay.classList.add("card-container")
const pointsDisplay = document.createElement('div');
const handDisplay = document.createElement('div');
handDisplay.classList.add('hand-outcome')
const endGameDiv = document.createElement('div');
pointsDisplay.classList.add('points')
let playerHand = [];
let arraySuitsNames = [];
let arrayNumOfEachSuit = [];
let arrayCardNames = [];
let arrayNumOfEachCard = [];
let gameOutcome = '';
let isInstrucDisplayed = false;
let swapCard = '';
let addedScore = '';
const cardSound = document.getElementById('card-sound');
cardSound.volume = 1;
const betSound = document.getElementById('bet-sound');
betSound.volume = 0.5;
const instructionsSound = document.getElementById('instructions-sound');
instructionsSound.volume = 0.5;
const dealSound = document.getElementById('deal-sound');
// const introSound = document.getElementById('intro-sound');

const scoreboardContainer = document.querySelector('.score-board-container');
const instructionsBtn = document.createElement('button');
instructionsBtn.classList.add('instructions-button');
instructionsBtn.innerHTML = 'Instructions';
document.body.appendChild(instructionsBtn);
const blackBox = document.createElement('div');
blackBox.classList.add('black-box');
  document.body.appendChild(blackBox);

const showInstructions = () => {
  console.log('working???');
  instructionsSound.play();
if (isInstrucDisplayed === false){
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

const cardClick = (index) => {
 cardSound.play();
  // Each card is linked to an index based on loop in line 172
  for (let m = 0; m < 5; m += 1) {

    // If card index equal to loop index then enter code block
    if (index === m) {
      // If card index is inside of global array, remove it
      // This means that if player clicks the same card twice, we count it as unselecting the card
      // and remove it from the array
      if (cardsToChangeIndex.includes(m) === true) {
        console.log('card UNCLICKED');
        cardsToChangeIndex = cardsToChangeIndex.filter((n) => n !== m);
        swapCard = document.querySelector(`.swap-bar${m}`);
        swapCard.style.zIndex = "-4";
        // If card index is not inside global array, add index to global array
      } else {
        console.log('card CLICKED');
        cardsToChangeIndex.push(m);
        swapCard = document.querySelector(`.swap-bar${m}`);
        swapCard.style.zIndex = "4";

      }
    }
  }
};
const resetSwapCard0 = document.querySelector('.swap-bar0');
const resetSwapCard1 = document.querySelector('.swap-bar1');
const resetSwapCard2 = document.querySelector('.swap-bar2');
const resetSwapCard3 = document.querySelector('.swap-bar3');
const resetSwapCard4 = document.querySelector('.swap-bar4');


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

const dealHand = () => {
  let newCard;
  for (let i = 0; i < 5; i += 1) {
    newCard = cardDeck.pop();
    newCard.index = `${i}`;
    playerHand.push(newCard);
  }
  return playerHand;
};

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

const displayCard = () => {
  dealSound.play();
  resetSwapCard0.style.zIndex = "-4";
  resetSwapCard1.style.zIndex = "-4";
  resetSwapCard2.style.zIndex = "-4";
  resetSwapCard3.style.zIndex = "-4";
  resetSwapCard4.style.zIndex = "-4";

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
  makeDeck();
  shuffleCards(cardDeck);

 const scoreSubtraction = document.querySelector('.score-subtraction');

  playerPoints = playerPoints - (100 * pointMultiplier);


  if (playerPoints < 0) {
    playerPoints = 1000;
    playerPoints = playerPoints - (100 * pointMultiplier);
      scoreSubtraction.innerHTML = `<p style="color:green">+1000</p>  -${(100 * pointMultiplier)}`;
  } else {
    scoreSubtraction.innerHTML = `-${(100 * pointMultiplier)}`;
  }

  pointsDisplay.innerHTML = `Points: ${playerPoints}`;

  dealHand();
  convertHandToDisplay();
  setTimeout(() => { scoreSubtraction.innerHTML = `` }, 1500);
};

const evaluateWin = () => {
 // // calcHandScore returns the number of points a given hand earns.
  // const pointsForHand = calcHandScore(playerHand);
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

  arraySuitsNames = Object.keys(cardSuitTally);
  arrayCardNames = Object.keys(cardNameTally);
  arrayNumOfEachCard = Object.values(cardNameTally);

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
  pointsDisplay.innerHTML = `Points: ${playerPoints}`;
  if (playerPoints <= 0) {
    handDisplay.innerHTML =  `You Ran Out Of Points! <br> Game Over!`
  } else {
    handDisplay.innerHTML =  `Your Best Hand: ${gameOutcome}! `;
  }
  endGameDiv.classList.add('next-round-container');
  endGameDiv.innerHTML = `You got a ${gameOutcome}`;
  document.body.appendChild(endGameDiv);

  const scoreAddition = document.querySelector('.score-addition');
  scoreAddition.innerHTML = `${addedScore}`
  if (addedScore === `-${(100 * pointMultiplier)}`) {
    scoreAddition.style.color = 'red';
  } else {
    scoreAddition.style.color = 'green';
  };
  setTimeout(() => { scoreAddition.innerHTML = `` }, 1500);
};

const changeCards = () => {
    dealSound.play();
  let newCard;
  for (let j = 0; j < cardsToChangeIndex.length; j += 1) {
    newCard = cardDeck.pop();
    playerHand[cardsToChangeIndex[j]] = newCard;
  }
  cardDisplay.innerText = '';
  convertHandToDisplay();
  evaluateWin();
};

const multiplyBet1 = () => {
  betSound.play();
  const scoreTable = document.querySelector('.score-board')
    scoreTable.src = "Media/score-board1.png";
  return pointMultiplier = 1;
};

const multiplyBet2 = () => {
    betSound.play();
  const scoreTable = document.querySelector('.score-board')
    scoreTable.src = "Media/score-board2.png";
  return pointMultiplier = 2;
};

const multiplyBet3 = () => {
    betSound.play();
  const scoreTable = document.querySelector('.score-board')
    scoreTable.src = "Media/score-board3.png";
  return pointMultiplier = 3;
};

const multiplyBet4 = () => {
    betSound.play();
  const scoreTable = document.querySelector('.score-board')
    scoreTable.src = "Media/score-board4.png";
  return pointMultiplier = 4;
};

const multiplyBet5 = () => {
    betSound.play();
  const scoreTable = document.querySelector('.score-board')
    scoreTable.src = "Media/score-board5.png";
  return pointMultiplier = 5;
};


const createDisplay = () => {
  pointsDisplay.innerHTML = `Points: ${playerPoints}`;
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

  pointsBtn3.innerHTML = `Bet 300`;
  const pointsBtn4 = document.createElement('button');
  pointsBtn4.classList.add('bet-button-4');
  pointsBtn4.classList.add('chip4');

  pointsBtn4.innerHTML = `Bet 400`;
  const pointsBtn5 = document.createElement('button');
  pointsBtn5.classList.add('bet-button-5');
  pointsBtn5.classList.add('chip5');

  pointsBtn5.innerHTML = `Bet 500`;

  const pokerTable = document.querySelector('.poker-table-container');

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

const checkForFlush = () => {
  playerHand.sort((a, b) => a.rank - b.rank);

  let straight = true;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 !== playerHand[i + 1].rank) {
      straight = false;
    }
  }
  if (straight === false && arraySuitsNames.length === 1 && arrayNumOfEachCard.includes(4) === false && !(arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === true)) {
    console.log('Flush win');
    gameOutcome = 'Flush';
    addedScore = `+${(500 * pointMultiplier)}`;
    return playerPoints = playerPoints + (500 * pointMultiplier);
  }
  return playerPoints ;
};

const checkForThreeOfKind = () => {
  if (arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === false && arraySuitsNames.length !== 1) {
    console.log('3 of a kind win');
    gameOutcome = 'Three of a Kind';
    addedScore = `+${(300 * pointMultiplier)}`;

    return playerPoints = playerPoints + (300 * pointMultiplier);
  }
  return playerPoints ;
};

const checkForFourOfKind = () => {
  if (arrayNumOfEachCard.includes(4) === true) {
    console.log('Four of a kind win');
    gameOutcome = 'Four of a Kind';
    addedScore = `+${(2500 * pointMultiplier)}`;
    return playerPoints = playerPoints + (2500 * pointMultiplier);
  }
  return playerPoints;
};

const checkForFullHouse = () => {
  if (arrayNumOfEachCard.includes(3) === true && arrayNumOfEachCard.includes(2) === true) {
    console.log('Full house win');
    gameOutcome = 'Full House';
    addedScore = `+${(1000 * pointMultiplier)}`;
    return playerPoints = playerPoints + (1000 * pointMultiplier);
  }
  return playerPoints;
};

const checkForTwoPair = () => {
  if (arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.includes(3) === false && arraySuitsNames.length !== 1 && arrayCardNames.length === 3) {
    console.log('2 pair win');
    gameOutcome = 'Two Pair';
    addedScore = `+${(200 * pointMultiplier)}`;
    return playerPoints = playerPoints + (200 * pointMultiplier);
  }
  return playerPoints;
};

const checkForOnePair = () => {
  // eslint-disable-next-line max-len
  if (arrayNumOfEachCard.includes(2) === true && arrayNumOfEachCard.length === 4 && arrayNumOfEachCard.includes(3) === false && arrayNumOfEachCard.includes(4) === false && arraySuitsNames.length !== 1) {
    console.log('One pair win');
    gameOutcome = 'One Pair';
    addedScore = `+${(100 * pointMultiplier)}`;
    return playerPoints = playerPoints + (100 * pointMultiplier);
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
      console.log('Straight win');
      gameOutcome = 'Straight';
      addedScore = `+${(400 * pointMultiplier)}`;
      return playerPoints = playerPoints + (400 * pointMultiplier);
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
    gameOutcome = 'Straight Flush';
    addedScore = `+${(5000 * pointMultiplier)}`;
    console.log('Straight flush win');
    return playerPoints = playerPoints + (5000 * pointMultiplier);
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
    gameOutcome = 'Royal Flush';
    addedScore = `+${(10000 * pointMultiplier)}`;
    console.log('Royal flush win');
    return playerPoints = playerPoints + (10000 * pointMultiplier);
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
    playerPoints = playerPoints - (100 * pointMultiplier)
    console.log('High card');
    gameOutcome = 'High Card';
    addedScore = `-${(100 * pointMultiplier)}`;
    return playerPoints ;
  }
  return playerPoints;
};

// /**
//  * A function that calculates players score
//  * @param  a {number} number to add together
//  * @param  b {number} number to add together
//  * @return {number}   a and b added together
//  */
// const calcHandScore = () => playerPoints;

const initGame = () => {
  // introSound.play();
  createDisplay();
};

initGame();
