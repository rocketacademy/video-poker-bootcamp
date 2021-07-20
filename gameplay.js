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
  const symbols = ['❤️', '♦️', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = symbols[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let cardDisplay = `${rankCounter}`;
      let cardColor = 'red';
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        cardDisplay = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        cardDisplay = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        cardDisplay = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        cardDisplay = 'K';
      }

      if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
        cardColor = 'red';
      } else if (currentSuit === 'spades' || currentSuit === 'clubs') {
        cardColor = 'black';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitSymbol: currentSymbol,
        displayName: cardDisplay,
        color: cardColor,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// create a shuffled deck
const deck = shuffleCards(makeDeck());

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.color);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card', 'highlight');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

const dealCards = () => {
// Empty cardContainer
  cardContainer.innerHTML = '';
  dealButton.disabled = true;
  bet = Number(betAmount.value);
  document.getElementById('betAmount').disabled = true;
  gameMessage.innerText = 'Please choose the cards to swap!';

  for (let i = 0; i < 5; i += 1) {
    // Pop player's card metadata from the deck
    playerCard = deck.pop();
    playerArr.push(playerCard);
    // Create card element from card metadata
    const cardElement = createCard(playerCard);
    cardElement.id = `card${i + 1}`;
    // Append the card element to the card container
    cardContainer.appendChild(cardElement);
  }
  document.querySelector('#card1').addEventListener('click', swapCard1);
  document.querySelector('#card2').addEventListener('click', swapCard2);
  document.querySelector('#card3').addEventListener('click', swapCard3);
  document.querySelector('#card4').addEventListener('click', swapCard4);
  document.querySelector('#card5').addEventListener('click', swapCard5);
};

// create highlight function to indicate card to be swap
const swapCard1 = () => {
  document.querySelector('#card1').classList.toggle('highlightRed');
};
const swapCard2 = () => {
  document.querySelector('#card2').classList.toggle('highlightRed');
};
const swapCard3 = () => {
  document.querySelector('#card3').classList.toggle('highlightRed');
};
const swapCard4 = () => {
  document.querySelector('#card4').classList.toggle('highlightRed');
};
const swapCard5 = () => {
  document.querySelector('#card5').classList.toggle('highlightRed');
};
/**
 * represents a tool to calc score based on cards in hand
 * return value will be the score based on their cards in hand against the score chart
 * */
const calcHandScore = () => {
  score = 1;
  return score;
};

dealButton.addEventListener('click', dealCards);
document.querySelector('.card').addEventListener('click', swapCard);
