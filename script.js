// ========== DECK STUFF ============
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// make card deck
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

      // Add the new card to the deck
      newDeck.push(card);
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};
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

const deck = shuffleCards(makeDeck());

// ========== HELPER FUNCTIONS ==========
/**
 * A function that returns a fixed number of points
 * @param cardArray array of card objects
 * @return {number} num of points in user's hand
 */
let playerPoints = 100;
let playerBet = 0;

// Create Object as tally
// const cardNameTally = {};

// const cardNameTallyFunc = (hand) => {
// Loop over hand
//   for (let i = 0; i < hand.length; i += 1) {
//     const cardName = hand[i].name;
//     // If we have seen the card name before, increment its count
//     if (cardName in cardNameTally) {
//       cardNameTally[cardName] += 1;
//     }
//     // Else, initialise count of this card name to 1
//     else {
//       cardNameTally[cardName] = 1;
//     }
//   }
// };

const calcHandScore = () => {
  // cardNameTallyFunc(hand);

  // check four of a kind
  // for (let i =0; i<hand.length; i+=1){

  // }

  const score = playerBet;
  gameText.innerHTML = `You won ${score} points.<br>`;
  playerPoints += Number(score);
  creditNumber.innerHTML = `${playerPoints}`;
  return score;
};

let gameMode = 'default';

// dom elements
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

// create hold/unhold buttons for each card on board
for (let i = 0; i < 5; i += 1) {
  const holdButton = document.createElement('button');
  holdButton.classList.add('keep');
  holdButton.innerText = 'Keep';
  holdButton.addEventListener('click', (event) => {
    // we will want to pass in the card element so
    // that we can change how it looks on screen, i.e.,
    // "turn the card over"
    holdButtonClickEvent(event.currentTarget, i);
  });
  buttonRow.appendChild(holdButton);
}
let hand = [];

// function to display dealt cards
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
};

// create deal click event to display dealt cards
const dealButtonClickEvent = () => {
  if (playerBet > 0) {
    if (gameMode === 'default') {
      for (let i = 0; i < 5; i += 1) {
        const card = deck.pop();
        hand.push(card);
      }
      displayCards();
      board.appendChild(buttonRow);
      gameMode = 'secondDeal';
      gameText.innerHTML = 'Select which cards to keep (if any) and then click \'Draw\'';
    } else if (gameMode === 'secondDeal') {
      reDeal();
      calcHandScore();
      gameMode = 'default';
      hand = [];
      gameText.innerHTML += 'Click \'Deal\' to play another round.';
    }
  } else { gameText.innerHTML = 'Please enter your bet'; }
};

// create deal button
const dealButton = document.createElement('button');
dealButton.classList.add('button');
dealButton.innerText = 'Deal / Draw';
dealButton.addEventListener('click', dealButtonClickEvent);
buttonRow2.appendChild(dealButton);

// append buttonrow3 elements
buttonGroupCredit.appendChild(creditNumber);
buttonGroupCredit.appendChild(creditName);
buttonGroupBet.appendChild(betAmount);
buttonGroupBet.appendChild(betName);
buttonGroupBet.appendChild(betPlusButton);
buttonGroupBet.appendChild(betMinusButton);
buttonGroupBet.appendChild(maxButton);

// functions

// click event when Keep button is clicked
const holdButtonClickEvent = (cardElement, index) => {
  if (gameMode === 'secondDeal') {
    cardElement = hand;
    if (hand[index].keep === false) {
      hand[index].keep = true;
    } else (hand[index].keep = false);
  }
};

// create function to deal released cards , calculate hand score, and update points
// eslint-disable-next-line max-len
// when condition is true, use splice to remove that index and replace with new card splice(index, 1, deck.pop)
const reDeal = () => {
  for (let i = 0; i < hand.length; i += 1) {
    if (hand[i].keep === false) {
      hand.splice(i, 1, deck.pop());
    }
    displayCards();
    hand[i].keep = false;
  }
};

// function for plus minus buttons
const plusButtonClick = (target) => {
  const currentValue = Number(target.value);
  if (currentValue < playerPoints) {
    target.value = currentValue + 1; }
  playerBet = target.value;
};

const minusButtonClick = (target) => {
  const currentValue = Number(target.value);
  if (currentValue >= 1) {
    target.value = currentValue - 1;
  }
  playerBet = target.value;
};

const maxButtonClick = (target) => {
  target.value = playerPoints;
  playerBet = target.value;
};
