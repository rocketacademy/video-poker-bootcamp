const POKER_HAND_SIZE = 5;

const CARD_VALUE = {
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
  CLUB: `CLUBS`,
  SPADE: `SPADES`,
  DIAMOND: `DIAMONDS`,
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
    case CARD_VALUE.ONE:
      return 14;
    case CARD_VALUE.TWO:
      return 2;
    case CARD_VALUE.THREE:
      return 3;
    case CARD_VALUE.FOUR:
      return 4;
    case CARD_VALUE.FIVE:
      return 5;
    case CARD_VALUE.SIX:
      return 6;
    case CARD_VALUE.SEVEN:
      return 7;
    case CARD_VALUE.EIGHT:
      return 8;
    case CARD_VALUE.NINE:
      return 9;
    case CARD_VALUE.TEN:
      return 10;
    case CARD_VALUE.JACK:
      return 11;
    case CARD_VALUE.QUEEN:
      return 12;
    case CARD_VALUE.KING:
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

const getInPlayCardSuit = (inPlayCard) => getCardSuit(inPlayCard.value);
const getInPlayCardValue = (inPlayCard) => getCardValue(inPlayCard.value);
const getInPlayCardRankAndSuitString = (inPlayCard) => {
  console.log(`getInPlayCardSuit(inPlayCard)`);

  return `${getInPlayCardSuit(inPlayCard)}-${getInPlayCardSuit(inPlayCard)}`;
};
const getInPlayCardOrdinal = (inPlayCard) => getCardOrdinal(inPlayCard.value);
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
    faceUp: true,
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
 * @param {Card} card
 */
const addCardToHand = (hand, card) => hand.push(newInPlayCard(card));

/**
 *
 * @param {Hand} hand
 * @param {InPlayCard} inPlayCard
 * @returns
 */
const addInPlayCardToHand = (hand, inPlayCard) => hand.push(inPlayCard);

const getHandAsString = (hand) => {
  const cardStrings = [];
  for (const card of hand) {
    cardStrings.push(getInPlayCardRankAndSuitString(card));
  }
  return `[ ${cardStrings.join(` | `)} ]`;
};
/**
 *
 * @param {Hand} hand
 * @param {card} card
 */
const addCardsToHand = (hand, cards) => {
  console.log(cards);
  cards.forEach((card) => addCardToHand(hand, card));
};

const newHandWithCards = (cards) => {
  console.log(`newHandWithCards`);
  console.log(cards);
  const hand = newHand();
  addCardsToHand(hand, cards);
  return hand;
};

/**
 *
 * @param {*} hand
 * @param {*} currentIndex
 * @param {*} sizePerHandCombination
 * @param {*} toTake
 * @param {*} result
 * @param {*} currentCombination
 * @returns
 */
const _addHandCombinations = (
  hand,
  currentIndex,
  sizePerHandCombination,
  toTake,
  result,
  currentCombination
) => {
  if (currentCombination.length === sizePerHandCombination) {
    result.push(currentCombination);
    return;
  }
  if (0 === toTake) {
    return;
  }

  if (currentIndex === hand.length) {
    return;
  }

  const combination = [...currentCombination, hand[currentIndex]];

  _addHandCombinations(
    hand,
    currentIndex + 1,
    sizePerHandCombination,
    toTake,
    result,
    currentCombination
  );
  _addHandCombinations(
    hand,
    currentIndex + 1,
    sizePerHandCombination,
    toTake - 1,
    result,
    combination
  );
};

/**
 * WARNING: If no. of combinations is expected to be big, this method will fry your browser.
 * @param {Hand} hand
 * @param {number} sizePerHandCombination
 */
const ______WARN_getHandCombinations = (hand, sizePerHandCombination) => {
  const result = [];
  const currentCombination = [];

  _addHandCombinations(
    hand,
    0,
    sizePerHandCombination,
    sizePerHandCombination,
    result,
    currentCombination
  );
  return result;
};
