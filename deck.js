// return filepath of card
const getFilePathCard = (suit, rank) =>
{
  const filePath = `${folderPath}/${suit}\ ${rank}.png`;
  return filePath;
};

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
  const suits = ['hearts', 'diamond', 'clubs', 'spades'];
  let cardColor = '';
  let symbol;
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

      if (currentSuit === 'diamonds') {
        symbol = '♦';
        cardColor = 'red';
      } else if (currentSuit === 'clubs') {
        symbol = '♣';
        cardColor = 'black';
      } else if (currentSuit === 'hearts') {
        symbol = '♥️';
        cardColor = 'red';
      } else if (currentSuit === 'spades') {
        symbol = '♠️';
        cardColor = 'black';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: cardColor,
        symbol,
      };
      console.log(card);

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const createCardImg = (cardInfo) => {
  const cardImg = document.createElement('img');
  cardImg.src = getFilePathCard(cardInfo.suit, cardInfo.rank);
  cardImg.classList.add('cardimg');
  return cardImg;
};

const deck = shuffleCards(makeDeck());

// function to store the metainfo of the drawn card
const createCard = (cardInfo) => {
  console.log('card info:', cardInfo);

  const card = document.createElement('div');
  const cardImage = createCardImg(cardInfo);
  card.classList.add('card');
  card.appendChild(cardImage);

  return card;
};
