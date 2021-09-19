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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === 'hearts') {
      currentSymbol = '♥️';
    } else if (currentSuit === 'spades') {
      currentSymbol = '♠️';
    } else if (currentSuit === 'clubs') {
      currentSymbol = '♣️';
    } else {
      currentSymbol = '♦️';
    }

    // set the color of the card (used later to determine the css
    // class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === '♥️' || currentSymbol === '♦️') {
      cardColor = 'red';
    } else {
      cardColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // Create a new card with the current name, suit, suit symbol, display name colour and rank
      const cardInfo = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        color: cardColor,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  console.log('a newDeck was created with cardInfo symbol, suit, name, colour and rank');
  return newDeck;
};

// build the card display, comprising of suit, name and card classList items
// these are then appended to the card element
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.name, cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

/* ####################
## GLOBAL VARIABLES ##
#################### */
let deck;

// const canClick = true;
let canDeal = true;

let cardContainerPlayer1;

const player1Button = document.createElement('button');

const gameInfo = document.createElement('div');
gameInfo.id = 'game-info';

const pointsInfo = document.createElement('div');
pointsInfo.id = 'game-info';

// instantiate points
let points = 100;

// instantiate card list
let hand = [];
let cardsToSwap = [];
const deselectedCards = [];

function handBuilder() {
  console.log('popping card and pushing to list');
  const card = deck.pop();
  hand.push(card);
  return card;
}
let pointsModifier = 0;

/* ##########################
## PLAYER ACTION CALLBACKS ##
########################### */
const player1Click = () => {
  if (canDeal === true) {
    // arbitrary 5-second delay in dealing cards
    // getting player 1's cards
    // wipes the card array first in case of multi clicks
    deck = shuffleCards(makeDeck());
    hand = [];

    // reset states so that we don't mess up calcHandScore

    cardContainerPlayer1.innerHTML = '';
    // print 5 cards out into initial hand
    for (let i = 0; i < 5; i++) {
      handBuilder();
    }

    console.log(`hand is now ${hand}`);
    output('dealing...');
    console.log('dealing...');

    // Create card element from card metadata 5 times
    for (let i = 0; i < hand.length; i++) {
      console.log(`printing ${i}`);

      const cardElement = createCard(hand[i]);

      // add an event Listener to each card created
      cardElement.addEventListener('click', (event) => {
        // console.log(`just clicked ${event.currentTarget}`);
        console.log(`card to swap is ${hand[i].name} of ${hand[i].suitSymbol}, index ${i}`);

        // CSS Control to Select and Deselect Cards to Swap
        if (cardElement.getAttribute('class') === 'card') {
          cardElement.classList.remove('card');
          cardElement.classList.add('card-selected');
          // push selected card onto the array of cards to swap
          cardsToSwap.push(hand[i]);
          output(`A Decision Has Been Set In Stone!
          
          Player 1 has selected the ${hand[i].name} of ${hand[i].suitSymbol} to swap! 
          
          `);
        }
        // couldn't get this to work so I commented it out
        // else if (cardElement.getAttribute('class') === 'card-selected') {
        //   cardElement.classList.remove('card-selected');
        //   cardElement.classList.add('card');
        //   console.log(`undoing card to swap is ${hand[i].name} of ${hand[i].suitSymbol}, index ${i}`);
        //   deselectedCards.push(hand[i]);
        // remove deselected cards from the cards to swap pile
      });
      // Append the card element to the card container
      cardContainerPlayer1.appendChild(cardElement);

      output(`Player 1 has drawn 5 cards! 
      
      Click on the cards you want to SWAP, NO DE-SELECTING allowed!!!
      
      `);
      player1Button.innerText = 'Swap Clicked Cards';
      canDeal = false;
    }
  }
  else if (canDeal === false) {
  // if you can't deal, you're swapping.
  // set up the swap function here

    // wipe the hand brute force style
    cardContainerPlayer1.innerHTML = '';

    // remove deselected cards from the cardsToSwap object
    // adapted from https://newbedev.com/javascript-remove-array-elements-from-another-array-javascript-code-example
    // cardsToSwap = cardsToSwap.filter((ar) => !deselectedCards.find((rm) => (rm.suitSymbol === ar.suitSymbol && ar.suit === rm.suit && ar.name === rm.name && ar.color === rm.color && ar.rank === rm.rank)));

    // remove cards that had to be swapped
    // adapted from https://newbedev.com/javascript-remove-array-elements-from-another-array-javascript-code-example
    hand = hand.filter((ar) => !cardsToSwap.find((rm) => (rm.suitSymbol === ar.suitSymbol && ar.suit === rm.suit && ar.name === rm.name && ar.color === rm.color && ar.rank === rm.rank)));

    // replace lost cards with redrawn cards
    // to do this, check how many more cards we need
    // to bring the hand length back to 5
    // then create more cards accordingly
    let cardsToRedraw = 5 - hand.length;
    for (let i = 0; i < cardsToRedraw; i++) {
      handBuilder();
      console.log(`swapped ${i} card(s)!`);
    }

    // reprint modified hand
    for (let i = 0; i < hand.length; i++) {
      console.log(`printing ${i}`);

      const cardsSwapped = createCard(hand[i]);
      cardContainerPlayer1.appendChild(cardsSwapped);
    }

    cardsToRedraw = 0;
    cardsToSwap = [];
    canDeal = true;

    // calc the score!
    pointsModifier = calcHandScore(hand);
    points += pointsModifier;

    output(`Swapped Out ${cardsToRedraw} Cards!
          
          You've Earned ${pointsModifier} Point(s)!

          Another Round?
          
          `);

    // update display
    pointsInfo.innerText = `Points: ${points}`;

    player1Button.innerText = 'Deal Another Hand';
  }
};

/* #######################
## GAME INITIALISATION ##
####################### */
const initGame = () => {
  cardContainer = document.createElement('div');

  // create row1, append to main card container
  const row1 = document.createElement('div');
  row1.setAttribute('class', 'row');
  row1.innerText = "Player 1's Cards";
  cardContainer.appendChild(row1);

  // create card container for player 1, append to row 1
  cardContainerPlayer1 = document.createElement('div');
  cardContainerPlayer1.classList.add('card-container-player-1');
  row1.appendChild(cardContainerPlayer1);

  // initialize button functionality
  player1Button.innerText = 'Deal Cards';
  player1Button.setAttribute('class', 'button');
  document.body.appendChild(player1Button);

  player1Button.addEventListener('click', player1Click);

  // append all the containers, rows and sub-containers to the document
  document.body.appendChild(cardContainer);

  // fill game info div with starting instructions
  gameInfo.innerText = `Its player 1's turn. Click to draw 5 cards!
  
  `;
  document.querySelector('h1').appendChild(gameInfo);

  pointsInfo.innerText = `Points: ${points}`;
  document.querySelector('h1').appendChild(pointsInfo);
};

// ############################################################

// call the function that will initialise gameplay
initGame();
