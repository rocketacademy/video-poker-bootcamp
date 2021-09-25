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
  const suit = document.createElement('suit');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('name');
  name.classList.add(cardInfo.name, cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};





/* ####################
## GLOBAL VARIABLES ##
#################### */
let deck;

// const canClick = true;
let canDeal = true;

let cardContainerPlayer1;

const player1Button = document.createElement('button');
const betUp = document.createElement('button');
const betDown = document.createElement('button');
const currentBet = document.createElement('div');

const gameInfo = document.createElement('div');
gameInfo.id = 'game-info';

const pointsInfo = document.createElement('div');
pointsInfo.id = 'points-info';

// instantiate points
let points = 100;

// instantiate card list
let hand = [];
let cardsToSwap = [];
const deselectedCards = [];


let pointsModifier = 0;
let combo = "";

let betAmount = 1;
let resetState = false;

//sound effects
const dealSound = new Audio();
dealSound.src = "/Users/grahamlim/Documents/bootcamp/projects/video-poker-bootcamp/playing card sound Effect.mp3"

const winSound = new Audio();
winSound.src = "/Users/grahamlim/Documents/bootcamp/projects/video-poker-bootcamp/Slot Machine Jackpot - Sound Effect for Editing.mp3"

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerHTML = message;
};

// creating another helper function to push cards from deck into hand
function handBuilder() {
  console.log('popping card and pushing to list');
  const card = deck.pop();
  hand.push(card);
  return card;
}


/* ##########################
## PLAYER ACTION CALLBACKS ##
########################### */

const player1Click = () => {

  //play dealing sound
  dealSound.play()

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
          output(`
          
          Selected the ${hand[i].name} of ${hand[i].suitSymbol} to swap! 
          
          `);
        }
        // If it's already been selected, and you deselect, make sure that
        // doesn't get swapped and the cardsToSwap logic accounts for this
        else if (cardElement.getAttribute('class') === 'card-selected') {
          cardElement.classList.remove('card-selected');
          cardElement.classList.add('card');
          cardsToSwap.splice(hand[i], 1)
          console.log(`undoing card to swap is ${hand[i].name} of ${hand[i].suitSymbol}, index ${i}`);
          output(`You've de-selected the ${hand[i].name} of ${hand[i].suitSymbol}!`);
          };

      });
      // Append the card element to the card container
      cardContainerPlayer1.appendChild(cardElement);

      output(`You've drawn 5 cards! Click on the cards you want to SWAP!`);
      player1Button.innerText = 'Swap Clicked Card(s)';
      canDeal = false;
   
    }
  }
  else if (canDeal === false) {
  // if you can't deal, you're swapping.
  // set up the swap function here

    // wipe the hand brute force style
    cardContainerPlayer1.innerHTML = '';

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
    
    // calc the score with the amount betted!
    let [pointsModifier, combo] = calcHandScore(hand);
    
    pointsModifier = pointsModifier*betAmount;

    points += pointsModifier;

    // change win/loss message
    
    // what happens when you win or lose?

    // generic losing message
    if (points <= 0){
      gameInfo.innerHTML = `Sorry, YOU LOSE! Restarting...`
      player1Button.innerText = "Restarting Game in 3 Seconds!";
      setTimeout(() => {
        location.reload();
      }, 3000)
    }
    // gameplay still ongoing, no win/loss
    else if (points >0 && points < 350){
      output(`${combo} Earned ${pointsModifier} Point(s). Bet & Deal Again?`);
      player1Button.innerText = "I've Bet, Deal Again";
    }
    // be rewarded with a glorious doge upon winning for 7777 milliseconds
    else if (points >= 350){
      gameInfo.innerHTML = "YOU WIN! Wow"

      winSound.play()

      let paytable = document.getElementById("paytable")
      paytable.remove();
      let h2 = document.getElementById("win-condition")

      h2.innerHTML = '<img src="/Users/grahamlim/Documents/bootcamp/week-02/day-003/pre-class/match-game-bootcamp/doge_card.gif" width="250" height="280" />'
      player1Button.innerText = "Restarting Game in 7.77 Seconds!";
      setTimeout(() => {
        location.reload();
      }, 7777)
    }
    // update & refresh display
    pointsInfo.innerText = `Points: ${points}`;

    cardsToRedraw = 0;
    cardsToSwap = [];
    betAmount = 1;
    currentBet.innerText = `Amount Bet: ${betAmount}`;    
    canDeal = true;
  }
  //resets the game if reset button is pressed by doing a hard refresh
  // if (resetState === true && canDeal === true){
  //   // points = 100;
  //   // resetState = false;
  //   // canDeal = false;
  //   location.reload()
  // }
};

//bet amount callback events - using existing points as credit
const increaseBet = () => {
  if (betAmount >= 1 && canDeal === true && points >= 2){
    betAmount += 1
    points -= 1
    console.log(`new bet amount is ${betAmount}`)
    currentBet.innerText = `Amount Bet: ${betAmount}`;
    pointsInfo.innerText = `Points: ${points}`;

  }
}

const decreaseBet = () => {
  if (betAmount > 1 && canDeal === true){
    betAmount -= 1
    points += 1
    console.log(`new bet amount is ${betAmount}`)
    currentBet.innerText = `Amount Bet: ${betAmount}`;
    pointsInfo.innerText = `Points: ${points}`;
  }
}



/* #######################
## GAME INITIALISATION ##
####################### */
const initGame = () => {
  cardContainer = document.createElement('div');

  // fill game info div with starting instructions
  gameInfo.innerText = `Place your Bet Amount, then Draw 5 Cards!
  
  `;
  
  // display points up top
  pointsInfo.innerText = `Points: ${points}`;
  document.body.appendChild(pointsInfo);

  // create row1, append to main card container
  const row1 = document.createElement('div');
  row1.setAttribute('class', 'row');
  // row1.innerText = "Player 1's Cards";
  cardContainer.appendChild(row1);

  // create card container for player 1, append to row 1
  cardContainerPlayer1 = document.createElement('div');
  cardContainerPlayer1.classList.add('card-container-player-1');
  row1.appendChild(cardContainerPlayer1);

  // append all the containers, rows and sub-containers to the document
  document.body.appendChild(cardContainer);

  //display game info just below the hand dealt
  document.body.appendChild(gameInfo);

  // build a row for the only buttons used in-game
  const row2 = document.createElement('div');
  row2.setAttribute('class', 'button-row');

  // initialize deal button functionality and append with listener
  player1Button.innerText = 'Deal Cards';
  player1Button.setAttribute('class', 'deal-button');
  player1Button.addEventListener('click', player1Click);
  row2.appendChild(player1Button);

  // initialize betting button functionality and append with listener
  const betButtons = document.createElement('div')
  
  betUp.innerText = '+';
  betUp.setAttribute('class', 'button');
  betUp.addEventListener('click', increaseBet);

  betDown.setAttribute('class', 'button');
  betDown.innerText = '-';
  betDown.addEventListener('click', decreaseBet);

  currentBet.setAttribute('id', 'bet-amount');
  currentBet.innerText = `Amount Bet: ${betAmount}`;
  
  betButtons.appendChild(betUp);
  betButtons.appendChild(currentBet);
  betButtons.appendChild(betDown);
  betButtons.setAttribute('id', 'bet-buttons');

  row2.appendChild(betButtons);
  document.body.appendChild(row2);
};

// ############################################################

// call the function that will initialise gameplay
initGame();
