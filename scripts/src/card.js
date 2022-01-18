const CARD_RANK = {
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
 * @returns {string} Card Value
 */
const getCardValue = (card) => card.cardValue;

/**
 *
 * @param {Card} card
 * @returns {string} Card Suit
 */
const getCardSuit = (card) => card.suit;

/**
 *
 * @param {Card} card
 * @returns {number} The numerical value of the card.
 */
const getCardOrdinal = (card) => {
  const cardValue = getCardValue(card);
  switch (cardValue) {
    case CARD_RANK.ONE:
      return 1;
    case CARD_RANK.TWO:
      return 2;
    case CARD_RANK.THREE:
      return 3;
    case CARD_RANK.FOUR:
      return 4;
    case CARD_RANK.FIVE:
      return 5;
    case CARD_RANK.SIX:
      return 6;
    case CARD_RANK.SEVEN:
      return 7;
    case CARD_RANK.EIGHT:
      return 8;
    case CARD_RANK.NINE:
      return 9;
    case CARD_RANK.TEN:
      return 10;
    case CARD_RANK.JACK:
      return 11;
    case CARD_RANK.QUEEN:
      return 12;
    case CARD_RANK.KING:
      return 13;
  }
};

/**
 * @typedef {Object} InPlayCard
 * @property {Card} value
 * @property {HTMLElement} element
 * @property {boolean} faceUp
 * @property {boolean} isDiscarded
 */

const getInPlayCardValue = (inPlayCard) => inPlayCard.value;
const getInPlayCardElement = (inPlayCard) => inPlayCard.element;
const isInPlayCardFaceUp = (inPlayCard) => inPlayCard.faceUp;
const isInPlayCardDiscarded = (inPlayCard) => inPlayCard.isDiscarded;

/**
 *
 * @param {Card} card
 * @returns {InPlayCard}
 */
const newInPlayCard = (card) => {
  return {
    value: card,
    element: null,
    faceUp: true,
    isDiscarded: false,
  };
};

/**
 * @typedef {Array<InPlayCard>} Hand
 */

/**
 *
 * @param {Hand} hand
 * @returns {number} Size of hand
 */
const getHandSize = (hand) => hand.length;
/**
 *
 * @returns {Hand}
 */
const newHand = () => {
  return [];
};

/**
 *
 * @param {Hand} hand
 * @param {card} card
 */
const addCardToHand = (hand, card) => hand.push(newInPlayCard(card));

const getHandCombinations = () => {};
