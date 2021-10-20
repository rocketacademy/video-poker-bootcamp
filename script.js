//what is JSDoc commenting

// Globals
const score = 100;
let cardArray = [];
let hand = [];
let handscore = 0;
let bid = 0;
let totalPoints = 0;

//random index template
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards (template)
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
  
  // Deck Maker template
  const makeDeck = () => {
    // Initialise an empty deck array
    const newDeck = [];
    // Initialise an array of the 4 suits in our deck. We will loop over this array.
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const suitShapes = ['♥', '♦', '♣', '♠'];
    let cardColor = ''
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
          cardName = 'A';
        } else if (cardName === '11') {
          cardName = 'J';
        } else if (cardName === '12') {
          cardName = 'Q';
        } else if (cardName === '13') {
          cardName = 'K';
        }
  
        if (currentSuit === `diamonds`){
          symbol = `♦`;
          cardColor = "red";
        } else if (currentSuit === `clubs`){
          symbol = `♣`
          cardColor = "black";
        }else if (currentSuit === `hearts`){
          symbol = `♥`
          cardColor = "red";
        } else if (currentSuit === `spades`){
          symbol = `♠`
          cardColor = "black";
        }
  
  
  
        // Create a new card with the current name, suit, and rank
        const card = {
          name: cardName,
          suit: currentSuit,
          rank: rankCounter,
          color: cardColor,
          symbol: symbol,
        };
        //brand new pack of cards
        // console.log(card)
  
        // Add the new card to the deck
        newDeck.push(card); 
      }
    }
  
    // Return the completed card deck
    return newDeck;
  };
  
const deck = shuffleCards(makeDeck());
console.log("shuffled deck", deck)

// start game w new hand and then give player 5 cards randomly
const newHand = () => {
  //refresh hand 
  hand = []
  for (let i = 0; i < 5; i += 1) {
    hand.push(deck.pop());
  }
};
newHand()
console.log("player hand", hand)

//create card display
const createCard = (hand) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = hand.symbol;

  const name = document.createElement('div');
  name.classList.add('name')
  name.innerText = hand.name;

  const card = document.createElement('div');
  card.classList.add('card');

  if (hand.color === 'red'){
    card.classList.add('red')
  };

  

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

let cardContainer;
cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');
document.body.appendChild(cardContainer);

cardSwapIndex = []

//card swap functions
const swapCard = (i) => {
  for (let j = 0; j < 5; j += 1){
    if (i === j){
      if (cardSwapIndex.includes(j) === true){
        cardSwapIndex = cardSwapIndex.filter((e) => e !== j)
      } 
      else {cardSwapIndex.push(j)}
    }
  }
  console.log(cardSwapIndex)
}; 
 
const changeCardDisplay = () => {
  cardContainer.innerHTML = ''
  for (let h = 0; h < cardSwapIndex.length; h += 1){
    const newCard = deck.pop()
    hand[cardSwapIndex[h]] = newCard
  }
  cardSwapIndex = []
  dealCard()
  // console.log(sortHand(hand))
};

const dealCard = () => {
    for (let i = 0; i < 5; i += 1){
    const currentCard = hand[i]
    const showhand = createCard(currentCard)
    showhand.addEventListener(`click`,() => swapCard(i)) // so that each card has an eventlistener attached
    cardContainer.appendChild(showhand)
  }
};

//arrange hand function
// but dont completely understand how it runs
const sortHand = () => {
  hand.sort((a,b)=> (a.rank > b.rank ? 1 : -1))
  return hand
};


 

//Game Initialization
const initGame = () => {
  //(1) CREDITS
  let credits;
  credits = document.createElement('div')
  credits.classList.add('message')
  document.body.appendChild(credits)
  credits.innerText = `Current Score: ${score}`;

  //(2) DRAW
  const btn = document.createElement('button');
  btn.innerText = "Draw Hand";
  document.body.appendChild(btn, 'click');
  btn.addEventListener('click', () => dealCard(sortHand()))

  //(3) SWAP
  swap = document.createElement('button');
  document.body.appendChild(swap);
  swap.addEventListener('click', changeCardDisplay)
  swap.innerText = 'Change Card(s)'

  //(4) Input Bet
  bet = document.createElement('input');
  document.body.appendChild(bet);

  //(4a) submit button
  sbutton = document.createElement('button');
  document.body.appendChild(sbutton);
  sbutton.addEventListener('click', bet);
  sbutton.innerText = 'submit bet'
};


initGame()

const isJackOrHigher = () => {
  let checkJackOrHigher = false;
  // check every card in player's hand for jack,queen,king or ace
  for (let i = 0; i < playerHand.length; i += 1) {
    if (playerHand[i].rank > 10 || playerHand[i].rank === 1) {
      checkJackOrHigher = true;
    }
  }
  return checkJackOrHigher;
};

// returns number of points based on player's hand
const calcHandScore = () => {
  if (isRoyalFlush() === true) { // royal flush
    points = 10;
  } else if (isStraight() === true && isFlush() === true) { // straight flush
    points = 9;
  } else if (numOf4OfAKind === 1) { // 4 of a kind
    points = 8;
  } else if (isFullHouse() === true) { // full house
    points = 7;
  } else if (isFlush() === true) { // flush
    points = 6;
  } else if (isStraight() === true) { // straight
    points = 5;
  } else if (numOf3OfAKind === 1) { // 3 of a kind
    points = 4;
  } else if (numOfPairs === 2) { // 2 pairs
    points = 3;
  } else if (numOfPairs === 1) { // 1 pair
    points = 2;
  } else if (isJackOrHigher() === true) {
    points = 1;
  } else {
    points = 0;
  }
};

const numOfPairs = () => {
  sortHand(hand)
  if(hand[] === 4)
};

const calPoints = () => {
  totalPoints = bid * handScore;
  score = score + totalPoints
  handscore = 0;
};

