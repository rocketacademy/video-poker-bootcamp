/* eslint-disable no-unused-vars */

/**
 * Function that creates 52 distinct cards, i.e. a poker deck
 * @return newDeck {array}
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ['❤️', '♦️', '♣️', '♠️'];
  const suitImgs = ['heart.png', 'diamond.png', 'club.png', 'spade.png'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentImg = suitImgs[suitIndex];

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

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        img: currentImg,
      };

      newDeck.push(card);
    }
  }
  return newDeck;
};

/**
 * Function that gives random number x, where 0 <= x < max
 * @param max {number} for the upper bound
 * @return {number} between 0 (inclusive) and max
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Function that shuffles cards
 * @param cardDeck {array} to be shuffled
 * @return cardDeck {array} that has been shuffled
 */
const shuffleCards = (cardDeck) => {
  for (let currentIndex = 0; currentIndex < cardDeck.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cardDeck.length);
    const randomCard = cardDeck[randomIndex];
    const currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};
