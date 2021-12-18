/**
 * Returns the file path based on the suit and rank of card
 * @param {key} suit of the card
 * @param {key} rank of the card
 * @returns 
 */
const getFilePathCard = (suit, rank) =>
{
  const filePath = `${folderPath}/${suit}${rank}.png`;
  return filePath;
};
/**
 * Generates a random number
 * @param {number} max 
 * @returns a random number
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);
/**
 * Shuffles the deck by using getRandomIndex
 * @param {array} deck of cards 
 * @returns a shuffled deck
 */
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];

    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};
/**
 * Generates a deck of cards based on suits and rank
 * @returns a deck of cards
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ['hearts', 'diamond', 'clubs', 'spades'];
  let cardColor = '';
  let symbol;
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
 
      let cardName = `${rankCounter}`;

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

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: cardColor,
        symbol,
      };
      console.log(card);

      newDeck.push(card);
    }
  }
  return newDeck;
};
/**
 * Returns the correct card image based on the card info
 * @param {object} cardInfo 
 * @returns file path of the card image
 */
const createCardImg = (cardInfo) => {
  const cardImg = document.createElement('img');
  cardImg.src = getFilePathCard(cardInfo.suit, cardInfo.rank);
  cardImg.classList.add('cardimg');
  return cardImg;
};

/**
 * Appends the card image into the card object
 * @param {object} cardInfo 
 * @returns the card object with the correct card image
 */
const createCard = (cardInfo) => {
  console.log('card info:', cardInfo);

  const card = document.createElement('div');
  const cardImage = createCardImg(cardInfo);
  card.classList.add('card');
  card.appendChild(cardImage);

  return card;
};

let deck = shuffleCards(makeDeck());
