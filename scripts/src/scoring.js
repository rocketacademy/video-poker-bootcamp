const SCORING = {
  STRAIGHTS: `SCORING_TYPE_STRAIGHTS`,
  FLUSH: `SCORING_TYPE_FLUSH`,
  UNKNOWN: `SCORING_TYPE_UNKNOWN`,
  SIZE_MISMATCH: `SCORING_SIZE_MISMATCH`,
  FOUR_OF_A_KIND: `SCORING_TYPE_FOOK`,
  FULL_HOUSE: `SCORING_TYPE_FULL_HOUSE`,
};

const incrementOneToObjProp = (obj, property) => {
  if (typeof obj[property] !== `number`) {
    if (isNoU(obj[property])) {
      obj[property] = 0;
    } else {
      console.warn(
        `[addOneToObjProp] the property ${property} of object is assigned to a non-scalar value.`
      );
      return;
    }
  }
  obj[property] += 1;
};

/**
 *
 * @param {*} obj
 * @param {Array<*>} prop
 * @param {*} element
 */
const addElementToPropInObject = (obj, prop, element) => {
  obj[prop].push(element);
};

const getBagSuitByCount = (hand) => {
  const bagCountBySuit = {};
  const bagSuitByCount = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const card of hand) {
    const suit = getInPlayCardSuit(card);
    incrementOneToObjProp(bagCountBySuit, suit);
  }
  for (const [suit, count] of Object.entries(bagCountBySuit)) {
    addElementToPropInObject(bagSuitByCount, count, suit);
  }

  return bagSuitByCount;
};

const getBagValueByCount = (hand) => {
  const bagCountByValue = {};
  const bagValueByCount = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const card of hand) {
    const value = getInPlayCardValue(card);
    incrementOneToObjProp(bagCountByValue, value);
  }

  for (const [value, count] of Object.entries(bagCountByValue)) {
    addElementToPropInObject(bagValueByCount, count, value);
  }
  return bagValueByCount;
};

/**
 *
 * @param {Hand} hand
 */
const getHandBags = (hand) => {
  return {
    bagSuitByCount: getBagSuitByCount(hand),
    bagValueByCount: getBagValueByCount(hand),
  };
};

const usingPrimer = (primer) => (a, b) => primer(a) - primer(b);

const comparatorCardOrdinal = usingPrimer(getInPlayCardOrdinal);

const getCardRankDifference = comparatorCardOrdinal;

const newAscendingArray = (hand) => {
  const thisHand = hand.slice();
  thisHand.sort(comparatorCardOrdinal);
  return thisHand;
};

const isHandFullHouse = (hand) => {
  console.group(`[isHandFullHouse]`);

  const bagValueByCount = getBagValueByCount(hand);
  const is = bagValueByCount[3].length === 1 && bagValueByCount[2].length === 1;
  console.groupEnd();

  return is;
};

const isHandFourOfAKind = (hand) => {
  console.group(`[isHandFourOfAKind]`);
  const bagValueByCount = getBagValueByCount(hand);
  const is = bagValueByCount[4].length === 1;

  console.groupEnd();
  return is;
};
const isHandFlush = (hand) => {
  console.group(`[isHandFlush]`);
  const bagSuitByCount = getBagSuitByCount(hand);
  const is = bagSuitByCount[5].length === 1;

  console.groupEnd();
  return is;
};
const isHandStraight = (hand) => {
  const thisHand = newAscendingArray(hand);

  for (let i = 1; i < POKER_HAND_SIZE; i += 1) {
    const thisCard = thisHand[i - 1];
    const forward = thisHand[i];
    if (getCardRankDifference(forward, thisCard) !== 1) {
      return false;
    }
  }
  return true;
};

const getScoreType = (hand) => {
  if (getHandSize(hand) !== POKER_HAND_SIZE) {
    return SCORING.SIZE_MISMATCH;
  }

  if (isHandFourOfAKind(hand)) {
    return SCORING.FOUR_OF_A_KIND;
  }
  if (isHandFullHouse(hand)) {
    return SCORING.FULL_HOUSE;
  }
  if (isHandFlush(hand)) {
    return SCORING.FLUSH;
  }
  if (isHandStraight(hand)) {
    return SCORING.STRAIGHTS;
  }

  return SCORING.UNKNOWN;
};
