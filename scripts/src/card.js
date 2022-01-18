const CARD_VALUES = {
  ONE: `ONE`,
  TWO: `TWO`,
  THREE: `THREE`,
  FOUR: `FOUR`,
  FIVE: `FIVE`,
  SIX: `SIX`,
  SEVEN: `SEVEN`,
  EIGHT: `EIGHT`,
  NINE: `NINE`,
  TEN: `TEN`,
  JACK: `JACK`,
  QUEEN: `QUEEN`,
  KING: `KING`,
};

const CARD_SUITS = {
  HEART: `HEARTS`,
  CLUB: `CLUB`,
  SPADE: `SPADE`,
  DIAMOND: `DIAMOND`,
};

/**
 * @typedef {Object} Card
 * @property {string} cardValue
 * @property {string} suit
 */

/**
 * @returns {Card}
 */
const newCard = (cardValue, suit) => {
  if (isAnyNoU(cardValue, suit)) {
    return new Error(`card value and suit must be satisfied.`);
  }
  return {
    cardValue,
    suit,
  };
};

/**
 *
 * @param {Card} card
 * @returns
 */
const getCardValue = (card) => card.cardValue;
const getCardSuit = (card) => card.suit;

const getCardOrdinal = (card) => {
  const cardValue = getCardValue(card);
  switch (cardValue) {
    case CARD_VALUES.ONE:
      return 1;
    case CARD_VALUES.TWO:
      return 2;
    case CARD_VALUES.THREE:
      return 3;
    case CARD_VALUES.FOUR:
      return 4;
    case CARD_VALUES.FIVE:
      return 5;
    case CARD_VALUES.SIX:
      return 6;
    case CARD_VALUES.SEVEN:
      return 7;
    case CARD_VALUES.EIGHT:
      return 8;
    case CARD_VALUES.NINE:
      return 9;
    case CARD_VALUES.TEN:
      return 10;
    case CARD_VALUES.JACK:
      return 11;
    case CARD_VALUES.QUEEN:
      return 12;
    case CARD_VALUES.KING:
      return 13;
  }
};
