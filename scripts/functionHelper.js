const convertCardsLeftToStats = (cardsLeft) => {
  const cardsLeftKeys = Object.keys(cardsLeft);
  const cardsLeftValues = Object.values(cardsLeft);

  const cleanedUpCardsLeft = [];

  for (let i = 0; i < cardsLeftKeys.length; i += 1) {
    const cardsLeftValues2 = Object.values(cardsLeftValues[i]);
    for (let j = 0; j < cardsLeftValues2.length; j += 1) {
      if (cardsLeftValues2[j] !== 0) {
        const cleanedUpCardsLeftItem = {};
        cleanedUpCardsLeftItem.name = cardsLeftKeys[i];

        if (j === 0) {
          cleanedUpCardsLeftItem.suit = 'clubs';
        } else if (j === 1) {
          cleanedUpCardsLeftItem.suit = 'spades';
        } else if (j === 2) {
          cleanedUpCardsLeftItem.suit = 'hearts';
        } else {
          cleanedUpCardsLeftItem.suit = 'diamonds';
        }

        if (cardsLeftKeys[i] === 'jack') {
          cleanedUpCardsLeftItem.rank = 11;
        } else if (cardsLeftKeys[i] === 'queen') {
          cleanedUpCardsLeftItem.rank = 12;
        } else if (cardsLeftKeys[i] === 'king') {
          cleanedUpCardsLeftItem.rank = 13;
        } else if (cardsLeftKeys[i] === 'ace') {
          cleanedUpCardsLeftItem.rank = 14;
        } else {
          cleanedUpCardsLeftItem.rank = parseInt(cardsLeftKeys[i], 10);
        }
        cleanedUpCardsLeft.push(cleanedUpCardsLeftItem);
      }
    }
  }

  return cleanedUpCardsLeft;
};

const countHeldCards = () => {
  let counter = 0;

  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === true) {
      counter += 1;
    }
  }

  return counter;
};

const countReplacedCards = () => {
  let replaceCounter = 0;
  for (let i = 0; i < stats.hand.length; i += 1) {
    if (stats.hand[i].hold === false) {
      replaceCounter += 1;
    }
  }

  return replaceCounter;
};

/**
 *
 * @returns {Array} newDeck array contains a fresh deck of 52 cards
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const colors = ['red', 'red', 'black', 'black'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const color = colors[suitIndex];

    for (let rankCounter = 2; rankCounter <= 14; rankCounter += 1) {
      let cardName = `${rankCounter}`;

      if (cardName === '14') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        pic: `./images/cards/${cardName}_of_${currentSuit}.png`,
        color,
      };

      newDeck.push(card);
    }
  }

  return newDeck;
};

/**
 *
 * @param {Array} cards containing 52 newly created cards
 * @returns {Array} 52 shuffled cards
 */
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = Math.floor(Math.random() * cards.length);
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
