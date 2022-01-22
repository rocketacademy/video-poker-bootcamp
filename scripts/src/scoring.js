const SCORING = {
  STRAIGHT_FLUSH: `SCORING_TYPE_STRAIGHT_FLUSH`,
  FOUR_OF_A_KIND: `SCORING_TYPE_FOOK`,
  FULL_HOUSE: `SCORING_TYPE_FULL_HOUSE`,
  FLUSH: `SCORING_TYPE_FLUSH`,
  STRAIGHTS: `SCORING_TYPE_STRAIGHTS`,
  TRIPS: `SCORING_TYPE_TRIPS`,
  DOUBLE: `SCORING_TYPE_DOUBLE`,
  PAIR: `SCORING_TYPE_PAIR`,
  HIGH: `SCORING_TYPE_HIGH`,
  SIZE_MISMATCH: `SCORING_SIZE_MISMATCH`,
  UNKNOWN: `SCORING_TYPE_UNKNOWN`,
};

const getRankOfScoringType = (scoringType) => {
  switch (scoringType) {
    case SCORING.STRAIGHT_FLUSH:
      return 15;
    case SCORING.FOUR_OF_A_KIND:
      return 14;
    case SCORING.FULL_HOUSE:
      return 13;
    case SCORING.FLUSH:
      return 12;
    case SCORING.STRAIGHTS:
      return 11;
    case SCORING.TRIPS:
      return 10;
    case SCORING.DOUBLE:
      return 9;
    case SCORING.PAIR:
      return 8;
    case SCORING.HIGH:
      return 7;
    default:
      return 0;
  }
};

const getPrettiedHand = (hand) => {
  const scoreType = getScoreType(hand);
  if (scoreType === SCORING.STRAIGHT_FLUSH) {
    return newAscendingHand(hand);
  }
};

/**
 * SCORING TYPES
 */

const getBagPropByCount = (pokerHand, accessor) => {
  if (getHandSize(pokerHand) !== POKER_HAND_SIZE) {
    throw new Error(`hand must be a poker hand`);
  }
  const bagCountByProp = {};
  const bagPropByCount = { 1: [], 2: [], 3: [], 4: [], 5: [] };
  for (const card of pokerHand) {
    const prop = accessor(card);
    incrementOneToObjProp(bagCountByProp, prop);
  }
  for (const [prop, count] of Object.entries(bagCountByProp)) {
    addElementToPropInObject(bagPropByCount, count, prop);
  }
  return bagPropByCount;
};

const getBagSuitByCount = (pokerHand) =>
  getBagPropByCount(pokerHand, getInPlayCardSuit);

const getBagValueByCount = (pokerHand) =>
  getBagPropByCount(pokerHand, getInPlayCardValue);

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

const newAscendingHand = (hand) => {
  const thisHand = hand.slice();
  thisHand.sort(comparatorCardOrdinal);
  return thisHand;
};

const _isHandFullHouse = (hand) => {
  console.group(`[_isHandFullHouse]`);

  const bagValueByCount = getBagValueByCount(hand);
  const is = bagValueByCount[3].length === 1 && bagValueByCount[2].length === 1;
  console.groupEnd();

  return is;
};

const _isHandTrips = (hand) => {
  console.group(`[_isHandTrips]`);

  const bagValueByCount = getBagValueByCount(hand);
  const is = bagValueByCount[3].length === 1 && bagValueByCount[2].length !== 1;
  console.groupEnd();
  return is;
};

const _isHandDouble = (hand) => {
  console.group(`[_isHandDouble]`);

  const bagValueByCount = getBagValueByCount(hand);
  const is = bagValueByCount[2].length === 2;
  console.groupEnd();
  return is;
};

const _isHandPair = (hand) => {
  console.group(`[_isHandPair]`);

  const bagValueByCount = getBagValueByCount(hand);
  const is = bagValueByCount[2].length === 1 && bagValueByCount[1].length === 3;
  console.groupEnd();
  return is;
};

const _isHandFourOfAKind = (hand) => {
  console.group(`[_isHandFourOfAKind]`);
  const bagValueByCount = getBagValueByCount(hand);
  const is = bagValueByCount[4].length === 1;

  console.groupEnd();
  return is;
};
const _isHandStraightFlush = (hand) => {
  console.group(`[_isHandStraightFlush]`);
  const is = _isHandStraight(hand) && _isHandFlush(hand);
  console.groupEnd();
  return is;
};
const _isHandFlush = (hand) => {
  console.group(`[_isHandFlush]`);
  const bagSuitByCount = getBagSuitByCount(hand);
  const is = bagSuitByCount[5].length === 1;

  console.groupEnd();
  return is;
};
const _isHandStraight = (hand) => {
  console.group(`[_isHandStraight]`);

  const thisHand = newAscendingHand(hand);

  for (let i = 1; i < POKER_HAND_SIZE; i += 1) {
    const thisCard = thisHand[i - 1];
    const forward = thisHand[i];
    if (getCardRankDifference(forward, thisCard) !== 1) {
      console.groupEnd();

      return false;
    }
  }
  console.groupEnd();

  return true;
};

const _isHandHigh = (hand) => {
  console.group(`[_isHandHigh]`);

  const bagValueByCount = getBagValueByCount(hand);
  const is = bagValueByCount[1].length === 5;
  console.groupEnd();

  return is;
};

const _getScoreType = (hand) => {
  if (getHandSize(hand) !== POKER_HAND_SIZE) {
    return SCORING.SIZE_MISMATCH;
  }
  if (_isHandStraightFlush(hand)) {
    return SCORING.STRAIGHT_FLUSH;
  }
  if (_isHandFourOfAKind(hand)) {
    return SCORING.FOUR_OF_A_KIND;
  }
  if (_isHandFullHouse(hand)) {
    return SCORING.FULL_HOUSE;
  }
  if (_isHandTrips(hand)) {
    return SCORING.TRIPS;
  }
  if (_isHandDouble(hand)) {
    return SCORING.DOUBLE;
  }
  if (_isHandFlush(hand)) {
    return SCORING.FLUSH;
  }
  if (_isHandStraight(hand)) {
    return SCORING.STRAIGHTS;
  }
  if (_isHandPair(hand)) {
    return SCORING.PAIR;
  }
  if (_isHandHigh(hand)) {
    return SCORING.HIGH;
  }
  return SCORING.UNKNOWN;
};

/**
 *
 * @param {Hand} hand
 * @returns
 */
const getScoreType = (hand) => {
  console.group(`[getScoreType]`);
  const type = _getScoreType(hand);
  console.groupEnd();
  return type;
};

const _comparatorSubRankStraightFlush = (handA, handB) => {
  console.log(`_comparatorSubRankStraightFlush`);
  if (isAnyNoU(handA, handB)) {
    console.groupEnd();

    throw new Error(`Null received. handA ${handA} handB ${handB}`);
  }

  const sortedFirstCardA = newAscendingHand(handA)[0];
  const sortedFirstCardB = newAscendingHand(handB)[0];

  console.groupEnd();
  return (
    getInPlayCardOrdinal(sortedFirstCardA) -
    getInPlayCardOrdinal(sortedFirstCardB)
  );
};

const _comparatorSubRankStraight = _comparatorSubRankStraightFlush;

const _isSameScoringTypesLessThan = (handA, handB) => {
  const scoringTypeA = getScoreType(handA);
  const scoringTypeB = getScoreType(handB);
  if (scoringTypeA !== scoringTypeB) {
    throw new Error(
      `This method should be called only if scoring types are different`
    );
  }
  if (_isHandStraightFlush(handA)) {
    return _comparatorSubRankStraightFlush(handA, handB);
  }

  if (_isHandStraight(handA)) {
    return _comparatorSubRankStraight(handA, handB);
  }

  return undefined;
};

/**
 *
 * @param {*} handA
 * @param {*} handB
 * @returns {number|undefined}
 */
const comparatorHandRanking = (handA, handB) => {
  console.group(`comparatorHandRanking`);
  const scoringTypeA = getScoreType(handA);
  const scoringTypeB = getScoreType(handB);
  const rankA = getRankOfScoringType(scoringTypeA);
  const rankB = getRankOfScoringType(scoringTypeB);

  if (rankA === rankB) {
    console.groupEnd();
    return _isSameScoringTypesLessThan(handA, handB);
  }
  console.groupEnd();

  return rankA - rankB;
};

const getCombinationsSortedByRankAscending = (handCombinations) => {
  const hands = handCombinations.slice();
  hands.sort(comparatorHandRanking);
  return hands;
};

const getBestCombination = (handCombinations) => {
  const hands = getCombinationsSortedByRankAscending(handCombinations);
  return hands[hands.length - 1];
};

/**
 * STATISTICS
 */

/**
 *
 * @typedef ScoringDistribution
 * @type {Object}
 */

const newScoringDistribution = () => {
  return {
    [SCORING.STRAIGHT_FLUSH]: 0,
    [SCORING.FOUR_OF_A_KIND]: 0,
    [SCORING.FULL_HOUSE]: 0,
    [SCORING.FLUSH]: 0,
    [SCORING.STRAIGHTS]: 0,
    [SCORING.TRIPS]: 0,
    [SCORING.DOUBLE]: 0,
    [SCORING.PAIR]: 0,
    [SCORING.HIGH]: 0,
    [SCORING.SIZE_MISMATCH]: 0,
    [SCORING.UNKNOWN]: 0,
  };
};

const addToScoringDistribution = (distribution, scoreType) => {
  if (isNoU(distribution[scoreType])) {
    distribution[scoreType] = 0;
  }
  distribution[scoreType] += 1;
};

/**
 *
 * @param {Hand} hand
 * @param {number} currentIndex
 * @param {number} sizePerHandCombination constant throughout iterations
 * @param {number} toTake
 * @param {ScoringDistribution} distribution Counts the scoring type occurrence of valid poker hands in a multi-card hand
 * @param {Hand} currentCombination
 * @returns
 */
const _calcActualScoringDistribution = (
  hand,
  currentIndex,
  sizePerHandCombination,
  toTake,
  distribution,
  currentCombination
) => {
  if (currentCombination.length === sizePerHandCombination) {
    const scoringType = getScoreType(currentCombination);
    addToScoringDistribution(distribution, scoringType);
    return;
  }
  if (0 === toTake) {
    return;
  }

  if (currentIndex === hand.length) {
    return;
  }

  const combination = [...currentCombination, hand[currentIndex]];

  _calcActualScoringDistribution(
    hand,
    currentIndex + 1,
    sizePerHandCombination,
    toTake,
    distribution,
    currentCombination
  );
  _calcActualScoringDistribution(
    hand,
    currentIndex + 1,
    sizePerHandCombination,
    toTake - 1,
    distribution,
    combination
  );
};

/**
 * @param {Hand|Deck}
 */
const calcActualScoringDistribution = (hand) => {
  const handSize = POKER_HAND_SIZE;
  const distribution = newScoringDistribution();
  const currentCombination = [];

  _calcActualScoringDistribution(
    hand,
    0,
    handSize,
    handSize,
    distribution,
    currentCombination
  );
  return distribution;
};
