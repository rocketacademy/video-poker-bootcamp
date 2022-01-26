const SCORING = {
  STRAIGHT_FLUSH: `SCORING_TYPE_STRAIGHT_FLUSH`,
  FOUR_OF_A_KIND: `SCORING_TYPE_FOOK`,
  FULL_HOUSE: `SCORING_TYPE_FULL_HOUSE`,
  FLUSH: `SCORING_TYPE_FLUSH`,
  STRAIGHTS: `SCORING_TYPE_STRAIGHTS`,
  TRIPS: `SCORING_TYPE_TRIPS`,
  DOUBLE: `SCORING_TYPE_DOUBLE`,
  PAIR: `SCORING_TYPE_PAIR`,
  JOB: `SCORING_TYPE_JOB`, // Jacks Or Better
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
    case SCORING.JOB:
      return 7;
    case SCORING.HIGH:
      return 6;
    default:
      return -1;
  }
};

const getNiceStringOfScoringType = (scoringType) => {
  switch (scoringType) {
    case SCORING.STRAIGHT_FLUSH:
      return `STRAIGHT FLUSH`;
    case SCORING.FOUR_OF_A_KIND:
      return `FOUR OF A KIND`;
    case SCORING.FULL_HOUSE:
      return `FULL HOUSE`;
    case SCORING.FLUSH:
      return `FLUSH`;
    case SCORING.STRAIGHTS:
      return `STRAIGHTS`;
    case SCORING.TRIPS:
      return `TRIPS`;
    case SCORING.DOUBLE:
      return `DOUBLE`;
    case SCORING.PAIR:
      return `PAIR`;
    case SCORING.JOB:
      return `> JACKS`;
    case SCORING.HIGH:
      return `HIGH`;
    default:
      return -1;
  }
};

const getBasePayoutOfScoringType = (scoringType, pot = 1) => {
  switch (scoringType) {
    case SCORING.STRAIGHT_FLUSH:
      return 51;
    case SCORING.FOUR_OF_A_KIND:
      return 15;
    case SCORING.FULL_HOUSE:
      return 4;
    case SCORING.FLUSH:
      return 3;
    case SCORING.STRAIGHTS:
      return 2;
    case SCORING.TRIPS:
      return 1;
    default:
      return 0;
  }
};

const getPayoutOfScoringType = (scoringType, pot = 1) => {
  return getBasePayoutOfScoringType(scoringType) * pot;
};

/**
 *
 * @param {InPlayCard} card
 */
const getInPlayCardSuitAsRank = (card) => {
  const color = getInPlayCardSuit(card);
  switch (color) {
    case CARD_SUITS.HEART:
      return 3;
    case CARD_SUITS.CLUB:
      return 1;
    case CARD_SUITS.SPADE:
      return 4;
    case CARD_SUITS.DIAMOND:
      return 2;
  }
  throw new Error(`Undefined rank`);
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
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandFullHouse = ({ bagValueByCount }) =>
  bagValueByCount[3].length === 1 && bagValueByCount[2].length === 1;
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandTrips = ({ bagValueByCount }) =>
  bagValueByCount[3].length === 1 && bagValueByCount[2].length !== 1;
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandDouble = ({ bagValueByCount }) => bagValueByCount[2].length === 2;

/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandPair = ({ bagValueByCount }) =>
  bagValueByCount[2].length === 1 && bagValueByCount[1].length === 3;
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandFourOfAKind = ({ bagValueByCount }) =>
  bagValueByCount[4].length === 1;
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandStraightFlush = ({ hand, bagSuitByCount }) =>
  _isHandStraight({ hand }) && _isHandFlush({ bagSuitByCount });
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandFlush = ({ bagSuitByCount }) => bagSuitByCount[5].length === 1;
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandStraight = ({ hand }) => {
  const thisHand = newAscendingHand(hand);
  for (let i = 1; i < POKER_HAND_SIZE; i += 1) {
    const thisCard = thisHand[i - 1];
    const forward = thisHand[i];
    if (getCardRankDifference(forward, thisCard) !== 1) {
      return false;
    }
  }
  return true;
};
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandJacksOrBetter = ({ bagValueByCount, hand }) => {
  return (
    bagValueByCount[1].length === 5 &&
    hand.some((card) => {
      const value = getInPlayCardValue(card);

      return (
        value === CARD_VALUE.JACK ||
        value === CARD_VALUE.QUEEN ||
        value === CARD_VALUE.KING ||
        value === CARD_VALUE.ONE
      );
    })
  );
};
/**
 * Warning: inner helper function of @see getScoreType
 * @param {*} param0
 * @returns
 */
const _isHandHigh = ({ bagValueByCount }) => {
  return bagValueByCount[1].length === 5;
};

/**
 *
 * @param {Hand} hand
 * @returns {string} SCORING
 */
const getScoreType = (hand) => {
  if (getHandSize(hand) !== POKER_HAND_SIZE) {
    return SCORING.SIZE_MISMATCH;
  }

  const bagValueByCount = getBagValueByCount(hand);
  const bagSuitByCount = getBagSuitByCount(hand);
  const handAndItsBags = { bagValueByCount, bagSuitByCount, hand };

  if (_isHandStraightFlush(handAndItsBags)) {
    return SCORING.STRAIGHT_FLUSH;
  }
  if (_isHandFourOfAKind(handAndItsBags)) {
    return SCORING.FOUR_OF_A_KIND;
  }
  if (_isHandFullHouse(handAndItsBags)) {
    return SCORING.FULL_HOUSE;
  }
  if (_isHandTrips(handAndItsBags)) {
    return SCORING.TRIPS;
  }
  if (_isHandDouble(handAndItsBags)) {
    return SCORING.DOUBLE;
  }
  if (_isHandFlush(handAndItsBags)) {
    return SCORING.FLUSH;
  }
  if (_isHandStraight(handAndItsBags)) {
    return SCORING.STRAIGHTS;
  }
  if (_isHandPair(handAndItsBags)) {
    return SCORING.PAIR;
  }
  if (_isHandJacksOrBetter(handAndItsBags)) {
    return SCORING.JOB;
  }
  if (_isHandHigh(handAndItsBags)) {
    return SCORING.HIGH;
  }
  return SCORING.UNKNOWN;
};

const _comparatorSubRankSuitOfInPlayCards = (handA, handB) =>
  getInPlayCardSuitAsRank(handA) - getInPlayCardSuitAsRank(handB);

/**
 * Compares suits then value of the lowest card
 * @param {InPlayCard} handA A straight flush
 * @param {InPlayCard} handB A straight flush
 * @returns {number}
 */
const _comparatorSubRankStraightFlush = (handA, handB) => {
  // NOTE: Call this only if both hands are straight flush.
  if (isAnyNoU(handA, handB)) {
    throw new Error(`Null received. handA ${handA} handB ${handB}`);
  }
  const handALowestCard = newAscendingHand(handA)[0];
  const handBLowestCard = newAscendingHand(handB)[0];
  const suitComparison = _comparatorSubRankSuitOfInPlayCards(
    handALowestCard,
    handBLowestCard
  );

  if (suitComparison === 0) {
    return (
      getInPlayCardOrdinal(handALowestCard) -
      getInPlayCardOrdinal(handBLowestCard)
    );
  } else {
    return suitComparison;
  }
};

/**
 *
 * @param {InPlayCard} handA
 * @param {InPlayCard} handB
 * @returns
 */
const _comparatorSubRankStraight = (handA, handB) => {
  if (isAnyNoU(handA, handB)) {
    throw new Error(`Null received. handA ${handA} handB ${handB}`);
  }
  const handALowestCard = newAscendingHand(handA)[0];
  const handBLowestCard = newAscendingHand(handB)[0];
  return (
    getInPlayCardOrdinal(handALowestCard) -
    getInPlayCardOrdinal(handBLowestCard)
  );
};

const _isSameScoringTypesLessThan = (handA, handB) => {
  const scoringTypeA = getScoreType(handA);
  const scoringTypeB = getScoreType(handB);
  if (scoringTypeA !== scoringTypeB) {
    throw new Error(
      `This method should be called only if scoring types are same`
    );
  }
  if (scoringTypeA === SCORING.STRAIGHT_FLUSH) {
    return _comparatorSubRankStraightFlush(handA, handB);
  }

  if (_isHandStraight({ hand: handA })) {
    return _comparatorSubRankStraight(handA, handB);
  }

  return undefined;
};

/**
 *
 * @param {*} handA
 * @param {*} handB
 * @returns {number}
 */
const comparatorHandRanking = (handA, handB) => {
  const scoringTypeA = getScoreType(handA);
  const scoringTypeB = getScoreType(handB);
  const rankA = getRankOfScoringType(scoringTypeA);
  const rankB = getRankOfScoringType(scoringTypeB);
  if (rankA === rankB) {
    return _isSameScoringTypesLessThan(handA, handB);
  }
  return rankA - rankB;
};

/**
 *
 * @param {Hand[]} handCombinations Hands of poker hand size (5 cards)
 * @returns
 */
const getCombinationsSortedByRankAscending = (handCombinations) => {
  const hands = handCombinations.slice();
  hands.sort(comparatorHandRanking);
  return hands;
};

/**
 *
 * @param {Hand[]} handCombinations Hands of poker hand size (5 cards)
 * @returns
 */
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
 * @param {number} currentIndex of hand
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
 * @param {Hand|Deck} hand Sample Space
 */
const calcActualScoringDistribution = (hand, distribution) => {
  const handSize = POKER_HAND_SIZE;
  distribution = distribution || newScoringDistribution();
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

const _calcScoringDistributionSevenStudGivenSomeRevealedCards = (
  revealed,
  deck,
  currentIndex,
  optionsSize,
  toTake,
  distribution,
  optionsFromDeck
) => {
  if (optionsFromDeck.length === optionsSize) {
    // I reach the size limit to choose unrevealed cards (options from deck)
    const handOfX = newHand(); // x = no. of revealed + no. of options card
    addInPlayCardsToHand(handOfX, revealed);
    addInPlayCardsToHand(handOfX, optionsFromDeck);

    const { bestScore: scoringType } =
      ______WARN_getHandSimpleBestCombination(handOfX);
    addToScoringDistribution(distribution, scoringType);
    return;
  }
  if (0 === toTake) {
    return;
  }

  if (currentIndex === deck.length) {
    return;
  }

  _calcScoringDistributionSevenStudGivenSomeRevealedCards(
    revealed,
    deck,
    currentIndex + 1,
    optionsSize,
    toTake,
    distribution,
    optionsFromDeck
  );
  const thisCard = deck[currentIndex];
  const optionsIncludingThisCard = [...optionsFromDeck, thisCard];

  _calcScoringDistributionSevenStudGivenSomeRevealedCards(
    revealed,
    deck,
    currentIndex + 1,
    optionsSize,
    toTake - 1,
    distribution,
    optionsIncludingThisCard
  );
};

/**
 * @param {Hand|Deck} revealed The cards that are revealed
 * @param {Hand|Deck} deck The deck to draw cards from to form hands of size handSize.
 */
const calcScoringDistributionSevenStudGivenSomeRevealedCards = (
  revealed,
  deck,
  handSize = 7
) => {
  const distribution = newScoringDistribution();
  const noOfCardsToTake = handSize - getHandSize(revealed);
  _calcScoringDistributionSevenStudGivenSomeRevealedCards(
    revealed,
    deck,
    0,
    noOfCardsToTake,
    noOfCardsToTake,
    distribution,
    []
  );
  return distribution;
};

const getPMF = (distribution) => {
  const totalSamples = Object.values(distribution).reduce((s, i) => s + i, 0);
  return Object.entries(distribution).reduce((pmf, [type, occurrence]) => {
    return {
      ...pmf,
      [type]: {
        occurrence,
        p: ((occurrence / totalSamples) * 100).toFixed(2),
        payoutRatio: getPayoutOfScoringType(type),
        hand: getNiceStringOfScoringType(type),
      },
    };
  }, {});
};
