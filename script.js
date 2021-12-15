/* eslint-disable prefer-const */
/** GLOBAL VARIABLES */
let credits = 100;
let playerCard = '';
let handScore = 0;
let bet = 0;
let currentGameMode = 'input bet';
let playerHand = [];
let redrawIndexes = [];
let deck;
let royalFlush;
let straightFlush;
let fourOfAKind;
let fullHouse;
let flush;
let straight;
let threeOfAKind;
let twoPairs;
let onePair;
let highCard;
let winCondition = '';

/** CREATION OF ELEMENTS */
const gameInfo = document.createElement('div');
const winningInfo = document.createElement('table');
const creditsInfo = document.createElement('div');
creditsInfo.innerText = credits;
const betInputField = document.createElement('input');
betInputField.className = 'betinputfield';
const submitButton = document.createElement('button');
submitButton.innerText = 'Submit / Deal Cards';

const cardTable = document.createElement('div');
cardTable.className = 'cardtable';

/** HELPER FUNCTIONS */
/** Function to get random index ranging from 0 (inclusive) to max (exclusive)
 * @param max - max number
*/
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

/** Function to shuffle cards
 * @param cards - array of cards
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

/** Function to make card deck */
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }
      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(card);
    }
  }
  // Return the completed card deck
  return newDeck;
};

/** Function to output message */
const output = (message) => {
  gameInfo.innerText = message;
};

/** Function to select cards to redraw */

/** Function to build card deck elements */
const buildCardElements = (hand) => {
  cardTable.innerHTML = '';
  const redrawIndexArr = [];
  /** build card elements */
  for (let i = 0; i < 5; i += 1) {
    let suit1 = hand[i].suit;
    let name1 = hand[i].name;
    /** create box elements first to house 'redraw' message and card image */
    const cardBoxElement = document.createElement('div');
    cardBoxElement.className = 'cardboxelement';
    cardBoxElement.id = `${i}`;
    /** create image element for each card */
    const cardElement = document.createElement('img');
    cardElement.src = `../video-poker-bootcamp/media/${suit1}-${name1}.png`;
    cardElement.alt = `${name1} of ${suit1}`;
    cardElement.className = 'cardfront';

    cardBoxElement.addEventListener('click', (e) => {
      if (e.currentTarget.className === 'cardboxelement') {
        e.currentTarget.className = 'cardboxredraw';
        let index = Number(e.currentTarget.id);
        redrawIndexArr.push(index);
        redrawIndexArr.sort((a, b) => a - b);
      } else if (e.currentTarget.className === 'cardboxredraw') {
        e.currentTarget.className = 'cardboxelement';
        let index = Number(e.currentTarget.id);
        document.getElementById(`redrawBox${index}`).innerHTML = '';

        for (let j = 0; j < redrawIndexArr.length; j += 1) {
          if (redrawIndexArr[j] === index) {
            redrawIndexArr.splice(j, 1);
          }
        }
      }
    });
    redrawIndexes = redrawIndexArr;
    cardBoxElement.appendChild(cardElement);
    cardTable.appendChild(cardBoxElement);
  }
};

// /** Function for clicking card to redraw */

/** Function to check winning conditions with same card suit or sequential increase */
/** which includes royal flush, straight flush, flush, straight */
const checkSameCardSuits = () => {
  /** reset values for winning conditions */
  royalFlush = false;
  straightFlush = false;
  flush = false;
  straight = false;
  /** sort player hand in ascending order */
  playerHand.sort((a, b) => a.rank - b.rank);
  let cardSuitTally = {};
  /** loop to check if there are cards in sequential order */
  let seqCount = 0;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 === playerHand[i + 1].rank) {
      seqCount += 1;
    }
  }
  /** loop to calc card suit tally */
  for (let i = 0; i < playerHand.length; i += 1) {
    let cardSuit = playerHand[i].suit;
    // If we have seen the card suit before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card suit to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  /** call values from card suit tally into an array */
  let suitArray = Array.from(Object.values(cardSuitTally));
  /** sort values in ascending order */
  suitArray.sort((a, b) => a - b);
  console.log('card suit tally values');
  console.log(suitArray);
  if (suitArray[suitArray.length - 1] === 5) {
    if (seqCount === 4) {
      straightFlush = true;
      return straightFlush;
    } if (seqCount === 3 && playerHand[0].rank === 1) {
      royalFlush = true;
      return royalFlush;
    }
    flush = true;
    return flush;
  } if (suitArray[suitArray.length - 1] < 5 && seqCount === 4) {
    straight = true;
    return straight;
  }
};

/** Function to check winning conditions with same card name */
/** which includes four of a kind, three of a kind, full house, two pairs, one pair */
const checkSameCardNames = () => {
  /** reset values for winning conditions */
  fourOfAKind = false;
  threeOfAKind = false;
  fullHouse = false;
  twoPairs = false;
  onePair = false;

  let cardNameTally = {};

  for (let i = 0; i < playerHand.length; i += 1) {
    let cardName = playerHand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  let nameArray = Array.from(Object.values(cardNameTally));
  nameArray.sort((a, b) => a - b);
  console.log('card name tally values');
  console.log(nameArray);

  if (nameArray[nameArray.length - 1] === 4) {
    fourOfAKind = true;
    return fourOfAKind;
  } if (nameArray[nameArray.length - 1] === 3 && nameArray[nameArray.length - 2] === 2) {
    fullHouse = true;
    return fullHouse;
  } if (nameArray[nameArray.length - 1] === 3) {
    threeOfAKind = true;
  } else if (nameArray[nameArray.length - 1] === 2 && nameArray[nameArray.length - 2] === 2) {
    twoPairs = true;
    return twoPairs;
  } else if (nameArray[nameArray.length - 1] === 2) {
    onePair = true;
    return onePair;
  }
};

/** Function to check high card */
const checkHighCard = () => {
  highCard = false;
  /** check high card */
  for (let i = 0; i < 5; i += 1) {
    if (playerHand[i].rank > 10) {
      highCard = true;
    }
  }
};

// /** Function to check hand */
const calcHandScore = () => {
  checkSameCardNames();
  checkSameCardSuits();
  checkHighCard();
  if (royalFlush) {
    console.log('royal flush');
    winCondition = 'Royal Flush';
    handScore = bet * 30;
  } else if (straightFlush) {
    console.log('straight flush');
    winCondition = 'Straight Flush';
    handScore = bet * 25;
  } else if (fourOfAKind) {
    console.log('four of a kind');
    winCondition = 'Four of a Kind';
    handScore = bet * 20;
  } else if (fullHouse) {
    console.log('full house');
    winCondition = 'Full House';
    handScore = bet * 15;
  } else if (flush) {
    console.log('flush');
    winCondition = 'Flush';
    handScore = bet * 10;
  } else if (straight) {
    console.log('straight');
    winCondition = 'Straight';
    handScore = bet * 8;
  } else if (threeOfAKind) {
    console.log('three of a kind');
    winCondition = 'Three of a Kind';
    handScore = bet * 6;
  } else if (twoPairs) {
    console.log('two pairs');
    winCondition = 'Two Pairs';
    handScore = bet * 4;
  } else if (onePair) {
    console.log('one pair');
    winCondition = 'One Pair';
    handScore = bet * 2;
  } else if (highCard) {
    console.log('high card');
    winCondition = 'High Card';
    handScore = bet * 1;
  } else {
    console.log('lose');
    handScore = -bet;
  }
};

/** PLAYER ACTION FUNCTION */
/** Function for when player clicks on submit button */
const playerClick = () => {
  /** if current game mode is input bet */
  if (currentGameMode === 'input bet') {
    let betInput = betInputField.value;
    /** check if bet input is valid */
    if (betInput === '' || isNaN(betInput)) {
      output('You gotta type a number!');
    } else if (betInput !== '') {
      currentGameMode = 'deal cards';
      bet = betInput;
      output(`You bet ${bet} credits. Click the 'Submit / Deal Cards' button again to deal cards!`);
    }
  } else if (currentGameMode === 'deal cards') {
    deck = shuffleCards(makeDeck());
    for (let i = 0; i < 5; i += 1) {
      playerCard = deck.pop();
      playerHand.push(playerCard);
    }
    calcHandScore();
    buildCardElements(playerHand);

    output('Now click on the cards you want to redraw, and click the \'Submit / Deal Cards\' button again to redraw them!');
    currentGameMode = 'choose redraw';
  } else if (currentGameMode === 'choose redraw') {
    for (let j = 0; j < redrawIndexes.length; j += 1) {
      let redrawIndex = Number(redrawIndexes[j]);
      playerCard = deck.pop();
      playerHand.splice(redrawIndex, 1, playerCard);
    }
    calcHandScore();
    buildCardElements(playerHand);
    credits += handScore;
    creditsInfo.innerText = credits;
    if (handScore > 0) {
      output(`Congrats! You got ${winCondition}! You have ${credits} credits now. Key in a new bet amount and click 'Submit / Deal Cards' if you'd like to play again!`);
    } else {
      output(`Oh man, you didn't win anything. You have ${credits} credits left. Key in a new bet amount and click 'Submit / Deal Cards' to play again!`);
    }
    currentGameMode = 'input bet';
    playerHand = [];
    redrawIndexes = [];
  }
};

/** GAME INITIALISATION */
const initGame = () => {
  /** game instructions */
  output('Welcome to Video Poker Game!');
  document.body.appendChild(gameInfo);

  document.body.appendChild(cardTable);

  document.body.appendChild(betInputField);
  document.body.appendChild(submitButton);
  document.body.appendChild(creditsInfo);
  submitButton.addEventListener('click', playerClick);
};

initGame();
