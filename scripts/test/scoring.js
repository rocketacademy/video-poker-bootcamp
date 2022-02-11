const TEST_SCORINGS = () => {
  runTest(`testScoreShouldBeJacksOrBetter`, () => {
    const card1 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const card2 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const card3 = newCard(CARD_VALUE.FIVE, CARD_SUITS.HEART);
    const card4 = newCard(CARD_VALUE.SIX, CARD_SUITS.HEART);
    const cardJOB1 = newCard(CARD_VALUE.JACK, CARD_SUITS.CLUB);
    const cardJOB2 = newCard(CARD_VALUE.QUEEN, CARD_SUITS.CLUB);
    const cardJOB3 = newCard(CARD_VALUE.KING, CARD_SUITS.CLUB);

    const precedingCards = [card1, card2, card3, card4];
    for (const card of [cardJOB1, cardJOB2, cardJOB3]) {
      const handJacksOrBetter = newHand();
      addCardToHand(handJacksOrBetter, card);
      addCardsToHand(handJacksOrBetter, precedingCards);

      assertLogTrue(
        SCORING.JOB,
        getScoreType(handJacksOrBetter),
        () =>
          `[testScoreShouldBeHigh] ${getHandAsString(
            handJacksOrBetter
          )} should be jacks or better.`
      );
    }
  });
  assertToDo(`testScoreShouldBeHigh`);
  runTest(`testScoreShouldBeStraight`, () => {
    const cardYoungest = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const cardYounger = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const cardYoung = newCard(CARD_VALUE.FIVE, CARD_SUITS.HEART);
    const cardOld = newCard(CARD_VALUE.SIX, CARD_SUITS.HEART);
    const cardOldest = newCard(CARD_VALUE.SEVEN, CARD_SUITS.CLUB);
    const sortedHand = newHand();
    const sizePerHandCombination = 5;

    for (const card of [
      cardYoungest,
      cardYounger,
      cardYoung,
      cardOld,
      cardOldest,
    ]) {
      addCardToHand(sortedHand, card);
    }

    const handCombinations = ______WARN_getHandCombinations(
      sortedHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[testGetHandCombinations] Combinations not matching`
    );
    const combination = handCombinations[0];

    const thisHand = newAscendingHand(combination);

    for (let i = 0; i < thisHand.length; i++) {
      assertLogTrue(
        thisHand[i],
        combination[i],
        () => `[testScoreShouldBeStraight] New array should be sorted`
      );
    }

    const expectedScore = SCORING.STRAIGHTS;
    const actualScore = getScoreType(sortedHand);
    assertLogTrue(
      expectedScore,
      actualScore,
      () => `[testScoreShouldBeStraight] Failed`
    );
  });
  runTest(`testCardsScoreShouldNotBeStraight`, () => {
    const cardYoungest = newCard(CARD_VALUE.JACK, CARD_SUITS.HEART);
    const cardYounger = newCard(CARD_VALUE.QUEEN, CARD_SUITS.HEART);
    const cardYoung = newCard(CARD_VALUE.KING, CARD_SUITS.HEART);
    const cardNotYoung = newCard(CARD_VALUE.ONE, CARD_SUITS.HEART);
    const cardNotOld = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);
    const cardOld = newCard(CARD_VALUE.THREE, CARD_SUITS.CLUB);
    const cardOlder = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const cardOldest = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);

    const cardRange = [
      cardYoungest,
      cardYounger,
      cardYoung,
      cardNotYoung,
      cardNotOld,
      cardOld,
      cardOlder,
      cardOldest,
    ];

    for (let i = 0; i < 1; i += 1) {
      const thisCardYoungest = cardRange[i];
      const thisCardYounger = cardRange[i + 1];
      const thisCardYoung = cardRange[i + 2];
      const thisCardOld = cardRange[i + 3];
      const thisCardOldest = cardRange[i + 4];

      const sortedHand = newHand();
      const sizePerHandCombination = 5;
      const thisRange = [
        thisCardYoungest,
        thisCardYounger,
        thisCardYoung,
        thisCardOld,
        thisCardOldest,
      ];
      for (const card of thisRange) {
        addCardToHand(sortedHand, card);
      }

      const handCombinations = ______WARN_getHandCombinations(
        sortedHand,
        sizePerHandCombination
      );
      assertLogTrue(
        1,
        handCombinations.length,
        () => `[testCardsScoreShouldNotBeStraight] Combinations not matching`
      );
      const combination = handCombinations[0];

      const thisHand = newAscendingHand(combination);

      assertLogNotTrue(
        SCORING.STRAIGHTS,
        getScoreType(thisHand),
        (e) => `[testCardsScoreShouldNotBeStraight] Expected Hand to Be ${e}`
      );
    }
    assertToDo(`new test to assert the expected scoring type of the samples`);
  });

  runTest(`testCardsScoreShouldBeFlush`, () => {
    const cardThemed1 = newCard(CARD_VALUE.JACK, CARD_SUITS.HEART);
    const cardThemed2 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const cardThemed3 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);
    const cardThemed4 = newCard(CARD_VALUE.ONE, CARD_SUITS.HEART);
    const cardThemed5 = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);

    const cardRange = [
      cardThemed1,
      cardThemed2,
      cardThemed3,
      cardThemed4,
      cardThemed5,
    ];

    const themedHand = newHand();
    const sizePerHandCombination = 5;

    for (const card of cardRange) {
      addCardToHand(themedHand, card);
    }

    const handCombinations = ______WARN_getHandCombinations(
      themedHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[testCardsScoreShouldBeFlush] Combinations not matching`
    );
    const combination = handCombinations[0];

    for (let i = 0; i < themedHand.length; i++) {
      assertLogTrue(
        themedHand[i],
        combination[i],
        () =>
          `[testCardsScoreShouldBeFlush] The five cards chosen from a pool of five should be in original order (don't need to change original card order as we are testing for colors)`
      );
    }

    const scoreType = getScoreType(themedHand);
    assertLogTrue(
      SCORING.FLUSH,
      scoreType,
      () => `[testCardsScoreShouldBeFlush] Score Type assertion failed.`
    );
    assertLogNotTrue(
      SCORING.STRAIGHTS,
      scoreType,
      () => `[testCardsScoreShouldBeFlush] Unexpected Score Type`
    );
  });

  runTest(`testCardScoreShouldBeFourOfAKind`, () => {
    const cardPack1 = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);
    const cardPack2 = newCard(CARD_VALUE.TWO, CARD_SUITS.CLUB);
    const cardPack3 = newCard(CARD_VALUE.TWO, CARD_SUITS.DIAMOND);
    const cardPack4 = newCard(CARD_VALUE.TWO, CARD_SUITS.SPADE);
    const cardHigh = newCard(CARD_VALUE.JACK, CARD_SUITS.HEART);

    const cardRange = [cardPack1, cardPack2, cardPack3, cardPack4, cardHigh];

    const themedHand = newHand();
    const sizePerHandCombination = 5;

    for (const card of cardRange) {
      addCardToHand(themedHand, card);
    }

    const handCombinations = ______WARN_getHandCombinations(
      themedHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[testCardScoreShouldBeFourOfAKind] Combinations not matching`
    );
    const combination = handCombinations[0];

    for (let i = 0; i < themedHand.length; i++) {
      assertLogTrue(
        themedHand[i],
        combination[i],
        () =>
          `[testCardScoreShouldBeFourOfAKind] The five cards chosen from a pool of five should be in original order (don't need to change original card order as we are testing for colors)`
      );
    }

    const scoreType = getScoreType(themedHand);
    assertLogTrue(
      SCORING.FOUR_OF_A_KIND,
      scoreType,
      () => `[testCardScoreShouldBeFourOfAKind] Score Type assertion failed.`
    );
  });

  runTest(`testCardScoreShouldBeHouse`, () => {
    const functionName = `testCardScoreShouldBeHouse`;
    const cardPack1 = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);
    const cardPack2 = newCard(CARD_VALUE.TWO, CARD_SUITS.DIAMOND);
    const cardPack3 = newCard(CARD_VALUE.TWO, CARD_SUITS.SPADE);
    const cardPair1 = newCard(CARD_VALUE.JACK, CARD_SUITS.CLUB);
    const cardPair2 = newCard(CARD_VALUE.JACK, CARD_SUITS.HEART);

    const cardRange = [cardPack1, cardPair1, cardPack2, cardPack3, cardPair2];
    const housedHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(housedHand, card);
    }
    const handCombinations = ______WARN_getHandCombinations(
      housedHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[${functionName}] Combinations not matching`
    );
    const combination = handCombinations[0];

    for (let i = 0; i < housedHand.length; i++) {
      assertLogTrue(
        housedHand[i],
        combination[i],
        () =>
          `[${functionName}] The five cards chosen from a pool of five should be in original order (don't need to change original card order as we are testing for colors)`
      );
    }
    const scoreType = getScoreType(housedHand);
    assertLogTrue(
      SCORING.FULL_HOUSE,
      scoreType,
      () => `[${functionName}]  Score Type assertion failed.`
    );

    assertLogNotTrue(
      SCORING.TRIPS,
      scoreType,
      () =>
        `[testCardsScoreShouldBeFlush] Unexpected Score Type, three of a Kind and TWO of another`
    );
  });

  runTest(`testCardScoreShouldBeTrips`, () => {
    const functionName = `testCardScoreShouldBeTrips`;
    const cardHigh1 = newCard(CARD_VALUE.JACK, CARD_SUITS.CLUB);
    const cardHigh2 = newCard(CARD_VALUE.FIVE, CARD_SUITS.HEART);
    const cardPack1 = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);
    const cardPack2 = newCard(CARD_VALUE.TWO, CARD_SUITS.DIAMOND);
    const cardPack3 = newCard(CARD_VALUE.TWO, CARD_SUITS.SPADE);
    const cardRange = [cardPack1, cardHigh1, cardPack2, cardPack3, cardHigh2];
    const housedHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(housedHand, card);
    }
    const handCombinations = ______WARN_getHandCombinations(
      housedHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[${functionName}] Combinations not matching`
    );
    const combination = handCombinations[0];

    for (let i = 0; i < housedHand.length; i++) {
      assertLogTrue(
        housedHand[i],
        combination[i],
        () =>
          `[${functionName}] The five cards chosen from a pool of five should be in original order (don't need to change original card order as we are testing for colors)`
      );
    }
    const scoreType = getScoreType(housedHand);
    assertLogTrue(
      SCORING.TRIPS,
      scoreType,
      () => `[${functionName}]  Score Type assertion failed.`
    );
  });

  runTest(`testCardScoreShouldBeStraightFlush`, () => {
    const functionName = `testCardScoreShouldBeStraightFlush`;
    const cardPack1 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const cardPack2 = newCard(CARD_VALUE.SIX, CARD_SUITS.HEART);
    const cardPack3 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const cardPack4 = newCard(CARD_VALUE.FIVE, CARD_SUITS.HEART);
    const cardPack5 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);
    const cardRange = [cardPack1, cardPack2, cardPack3, cardPack4, cardPack5];
    const housedHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(housedHand, card);
    }
    const handCombinations = ______WARN_getHandCombinations(
      housedHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[${functionName}] Combinations not matching`
    );
    const combination = handCombinations[0];

    for (let i = 0; i < housedHand.length; i++) {
      assertLogTrue(
        housedHand[i],
        combination[i],
        () =>
          `[${functionName}] The five cards chosen from a pool of five should be in original order (don't need to change original card order as we are testing for colors)`
      );
    }
    const scoreType = getScoreType(housedHand);
    assertLogTrue(
      SCORING.STRAIGHT_FLUSH,
      scoreType,
      () => `[${functionName}]  Score Type assertion failed.`
    );
  });

  runTest(`testCardScoreShouldBeDoubs`, () => {
    const functionName = `testCardScoreShouldBeDoubs`;
    const cardPair1_1 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const cardPair1_2 = newCard(CARD_VALUE.THREE, CARD_SUITS.CLUB);
    const cardPair2_1 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const cardPair2_2 = newCard(CARD_VALUE.FOUR, CARD_SUITS.DIAMOND);
    const cardHigh = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);
    const cardRange = [
      cardPair1_1,
      cardPair2_2,
      cardPair1_2,
      cardPair2_1,
      cardHigh,
    ];
    const doubsHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(doubsHand, card);
    }
    const handCombinations = ______WARN_getHandCombinations(
      doubsHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[${functionName}] Combinations not matching`
    );
    const combination = handCombinations[0];

    for (let i = 0; i < doubsHand.length; i++) {
      assertLogTrue(
        doubsHand[i],
        combination[i],
        () =>
          `[${functionName}] The five cards chosen from a pool of five should be in original order (don't need to change original card order as we are testing for colors)`
      );
    }
    const scoreType = getScoreType(doubsHand);
    assertLogTrue(
      SCORING.DOUBLE,
      scoreType,
      () => `[${functionName}]  Score Type assertion failed.`
    );
  });

  runTest(`testCardScoreShouldBePair`, () => {
    const functionName = `testCardScoreShouldBePair`;
    const cardPair1 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const cardPair2 = newCard(CARD_VALUE.THREE, CARD_SUITS.CLUB);
    const cardHigh2 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const cardHigh3 = newCard(CARD_VALUE.JACK, CARD_SUITS.DIAMOND);
    const cardHigh1 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);
    const cardRange = [cardPair1, cardHigh3, cardPair2, cardHigh2, cardHigh1];
    const doubsHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(doubsHand, card);
    }
    const handCombinations = ______WARN_getHandCombinations(
      doubsHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[${functionName}] Combinations not matching`
    );
    const combination = handCombinations[0];

    for (let i = 0; i < doubsHand.length; i++) {
      assertLogTrue(
        doubsHand[i],
        combination[i],
        () =>
          `[${functionName}] The five cards chosen from a pool of five should be in original order (don't need to change original card order as we are testing for colors)`
      );
    }
    const scoreType = getScoreType(doubsHand);
    assertLogTrue(
      SCORING.PAIR,
      scoreType,
      () => `[${functionName}]  Score Type assertion failed.`
    );
  });

  runTest(`testCardScoreShouldBeHigh`, () => {
    const functionName = `testCardScoreShouldBeHigh`;
    const cardPair1 = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);
    const cardPair2 = newCard(CARD_VALUE.THREE, CARD_SUITS.CLUB);
    const cardHigh2 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const cardHigh3 = newCard(CARD_VALUE.SIX, CARD_SUITS.DIAMOND);
    const cardHigh1 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);
    const cardRange = [cardPair1, cardHigh3, cardPair2, cardHigh2, cardHigh1];
    const handHigh = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(handHigh, card);
    }
    const handCombinations = ______WARN_getHandCombinations(
      handHigh,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[${functionName}] Combinations not matching`
    );
    const combination = handCombinations[0];

    for (let i = 0; i < handHigh.length; i++) {
      assertLogTrue(
        handHigh[i],
        combination[i],
        () =>
          `[${functionName}] The five cards chosen from a pool of five should be in original order (don't need to change original card order as we are testing for colors)`
      );
    }
    const scoreType = getScoreType(handHigh);
    assertLogTrue(
      SCORING.HIGH,
      scoreType,
      () => `[${functionName}]  Score Type assertion failed.`
    );
  });

  runTest(`testSingleSuitDeckDistributionAgainstCombinationsV1`, () => {
    const functionName = `testSingleSuitDeckDistributionAgainstCombinationsV1`;

    const singleSuitDeck = newSampleSingleSuitDeck();
    assertLogTrue(
      13,
      getDeckSize(singleSuitDeck),
      () => `[${functionName}] Combinations not matching`
    );
    const sizePerHandCombination = 5;

    const handCombinations = ______WARN_getHandCombinations(
      singleSuitDeck,
      sizePerHandCombination
    );
    assertLogTrue(
      1287,
      handCombinations.length,
      () =>
        `[${functionName}] [______WARN_getHandCombinations] No. of Combinations`
    );
    const actualScoringDistribution =
      calcActualScoringDistribution(singleSuitDeck);

    const totalSamples = Object.values(actualScoringDistribution).reduce(
      (sum, i) => sum + i,
      0
    );

    assertLogTrue(
      1287,
      totalSamples,
      () => `[${functionName}] [actualScoringDistribution] No. of Combinations`
    );

    assertLogTrue(
      9,
      actualScoringDistribution[SCORING.STRAIGHT_FLUSH],
      (e, a) =>
        `[${functionName}] No. of ${SCORING.STRAIGHT_FLUSH} Combinations`
    );

    assertLogTrue(
      1278,
      actualScoringDistribution[SCORING.FLUSH],
      (e, a) =>
        `[${functionName}] No. of ${SCORING.STRAIGHT_FLUSH} Combinations`
    );

    assertLogTrue(
      0,
      actualScoringDistribution[SCORING.STRAIGHTS],
      (e, a) => `[${functionName}] No. of ${SCORING.STRAIGHTS} Combinations`
    );
    assertLogTrue(
      0,
      actualScoringDistribution[SCORING.FOUR_OF_A_KIND],
      (e, a) =>
        `[${functionName}] No. of ${SCORING.FOUR_OF_A_KIND} Combinations`
    );
    assertLogTrue(
      0,
      actualScoringDistribution[SCORING.FULL_HOUSE],
      (e, a) => `[${functionName}] No. of ${SCORING.FULL_HOUSE} Combinations`
    );
    assertLogTrue(
      0,
      actualScoringDistribution[SCORING.DOUBLE],
      (e, a) => `[${functionName}] No. of ${SCORING.DOUBLE} Combinations`
    );
    assertLogTrue(
      0,
      actualScoringDistribution[SCORING.PAIR],
      (e, a) => `[${functionName}] No. of ${SCORING.PAIR} Combinations`
    );
    assertLogTrue(
      0,
      actualScoringDistribution[SCORING.HIGH],
      (e, a) => `[${functionName}] No. of ${SCORING.HIGH} Combinations`
    );
  });
  runTest(`testTopCombinationShouldBeHighestStraightFlush`, () => {
    const functionName = `testTopCombinationShouldBeHighestStraightFlush`;

    const handSevenCard = newHand();

    const card1 = newCard(CARD_VALUE.ONE, CARD_SUITS.HEART);
    const card2 = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);
    const card3 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const card4 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const card5 = newCard(CARD_VALUE.FIVE, CARD_SUITS.HEART);
    const card6 = newCard(CARD_VALUE.SIX, CARD_SUITS.HEART);
    const card7 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);

    for (const card of [card6, card1, card3, card2, card5, card4, card7]) {
      addCardToHand(handSevenCard, card);
    }

    const expectedHandSize = 7;
    assertLogTrue(
      expectedHandSize,
      getHandSize(handSevenCard),
      (e, a) => `[${functionName}] Hand Size Fail`
    );

    const sizePerHandCombination = 5;
    const expectedCombinations = 21; // C(7,5)

    const handCombinations = ______WARN_getHandCombinations(
      handSevenCard,
      sizePerHandCombination
    );
    assertLogTrue(
      expectedCombinations,
      handCombinations.length,
      () => `[${functionName}] No. of Combinations not matching`
    );

    const expectedBestHandOfSeven = newHandWithCards([
      card7,
      card6,
      card5,
      card4,
      card3,
    ]);

    const actualBestFromCombinationsOfHandOfSeven =
      getBestCombination(handCombinations);

    const scoringType = getScoreType(expectedBestHandOfSeven);

    assertLogTrue(
      SCORING.STRAIGHT_FLUSH,
      scoringType,
      () => `[${functionName}] Scoring Type of best hand not matching`
    );

    const rankOfScoringType = getRankOfScoringType(scoringType);

    assertLogTrue(
      15,
      rankOfScoringType,
      () => `[${functionName}] Rank of Scoring Type of best hand not matching`
    );

    const sortedHand = newAscendingHand(expectedBestHandOfSeven);
    const prettiedHand = getPrettiedHand(expectedBestHandOfSeven);

    for (let i = 0; i < prettiedHand.length; i++) {
      assertLogTrue(
        sortedHand[i],
        prettiedHand[i],
        () =>
          `[${functionName}] Straight flush should be presented as a straight.`
      );
    }
  });

  runTest(`testComparisionStraighFlushes`, () => {
    const functionName = `testComparisionStraighFlushes`;

    const card1 = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);
    const card2 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const card3 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const card4 = newCard(CARD_VALUE.FIVE, CARD_SUITS.HEART);
    const card5 = newCard(CARD_VALUE.SIX, CARD_SUITS.HEART);
    const card6 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);

    const lowerStraightFlush = newHand();
    const higherStraightFlush = newHand();

    for (const card of [card1, card3, card2, card5, card4]) {
      addCardToHand(lowerStraightFlush, card);
    }

    for (const card of [card6, card3, card2, card5, card4]) {
      addCardToHand(higherStraightFlush, card);
    }
    const expectedHandSize = 5;

    for (const hand of [lowerStraightFlush, higherStraightFlush]) {
      assertLogTrue(
        expectedHandSize,
        getHandSize(hand),
        (e, a) => `[${functionName}] Hand Size Fail`
      );
    }

    assertLogTrue(
      true,
      comparatorHandRanking(lowerStraightFlush, higherStraightFlush) < 0,
      () => `[${functionName}] Comparision should be lesser`
    );
  });

  runTest(`testComparisionStraight`, () => {
    const functionName = `testComparisionStraight`;

    const card1 = newCard(CARD_VALUE.TWO, CARD_SUITS.SPADE);
    const card2 = newCard(CARD_VALUE.THREE, CARD_SUITS.CLUB);
    const card3 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const card4 = newCard(CARD_VALUE.FIVE, CARD_SUITS.DIAMOND);
    const card5 = newCard(CARD_VALUE.SIX, CARD_SUITS.HEART);
    const card6 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.SPADE);

    const lowerStraight = newHand();
    const higherStraight = newHand();

    for (const card of [card1, card3, card2, card5, card4]) {
      addCardToHand(lowerStraight, card);
    }

    for (const card of [card6, card3, card2, card5, card4]) {
      addCardToHand(higherStraight, card);
    }
    const expectedHandSize = 5;

    for (const hand of [lowerStraight, higherStraight]) {
      assertLogTrue(
        expectedHandSize,
        getHandSize(hand),
        (e, a) => `[${functionName}] Hand Size Fail`
      );
    }

    const comparisonResult = comparatorHandRanking(
      lowerStraight,
      higherStraight
    );

    assertLogTrue(
      true,
      isNoU(comparisonResult) ? comparisonResult : comparisonResult < 0,
      () => {
        const lowerHandString = getHandAsString(lowerStraight);
        const higherHandString = getHandAsString(higherStraight);

        return `[${functionName}] Comparision should be lesser ${lowerHandString} < ${higherHandString}`;
      }
    );
  });

  runTest(`testComparisionFlush`, () => {
    const functionName = `testComparisionFlush`;

    // arrange from small ranking hand to big ranking hand

    const cardClubs1 = newCard(CARD_VALUE.FIVE, CARD_SUITS.CLUB);
    const cardClubs2 = newCard(CARD_VALUE.SIX, CARD_SUITS.CLUB);
    const cardClubs3 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.CLUB);
    const cardClubs4 = newCard(CARD_VALUE.EIGHT, CARD_SUITS.CLUB);
    const cardClubs5 = newCard(CARD_VALUE.NINE, CARD_SUITS.CLUB);

    const clubsRange = [
      cardClubs1,
      cardClubs3,
      cardClubs4,
      cardClubs5,
      cardClubs2,
    ];

    const cardDiamonds1 = newCard(CARD_VALUE.FOUR, CARD_SUITS.DIAMOND);
    const cardDiamonds2 = newCard(CARD_VALUE.FIVE, CARD_SUITS.DIAMOND);
    const cardDiamonds3 = newCard(CARD_VALUE.SIX, CARD_SUITS.DIAMOND);
    const cardDiamonds4 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.DIAMOND);
    const cardDiamonds5 = newCard(CARD_VALUE.EIGHT, CARD_SUITS.DIAMOND);

    const diamondsRange = [
      cardDiamonds1,
      cardDiamonds2,
      cardDiamonds3,
      cardDiamonds4,
      cardDiamonds5,
    ];

    const cardHearts1 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const cardHearts2 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const cardHearts3 = newCard(CARD_VALUE.FIVE, CARD_SUITS.HEART);
    const cardHearts4 = newCard(CARD_VALUE.SIX, CARD_SUITS.HEART);
    const cardHearts5 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);

    const heartsRange = [
      cardHearts1,
      cardHearts2,
      cardHearts3,
      cardHearts4,
      cardHearts5,
    ];

    const cardSpadeLower1 = newCard(CARD_VALUE.TWO, CARD_SUITS.SPADE);
    const cardSpadeLower2 = newCard(CARD_VALUE.THREE, CARD_SUITS.SPADE);
    const cardSpadeLower3 = newCard(CARD_VALUE.FOUR, CARD_SUITS.SPADE);
    const cardSpadeLower4 = newCard(CARD_VALUE.FIVE, CARD_SUITS.SPADE);
    const cardSpadeLower5 = newCard(CARD_VALUE.SIX, CARD_SUITS.SPADE);

    const spadeLowRange = [
      cardSpadeLower1,
      cardSpadeLower2,
      cardSpadeLower3,
      cardSpadeLower4,
      cardSpadeLower5,
    ];
    const cardSpadeHigher1 = newCard(CARD_VALUE.TEN, CARD_SUITS.SPADE);
    const cardSpadeHigher2 = newCard(CARD_VALUE.JACK, CARD_SUITS.SPADE);
    const cardSpadeHigher3 = newCard(CARD_VALUE.QUEEN, CARD_SUITS.SPADE);
    const cardSpadeHigher4 = newCard(CARD_VALUE.KING, CARD_SUITS.SPADE);
    const cardSpadeHigher5 = newCard(CARD_VALUE.ONE, CARD_SUITS.SPADE);

    const spadeHighRange = [
      cardSpadeHigher1,
      cardSpadeHigher3,
      cardSpadeHigher2,
      cardSpadeHigher4,
      cardSpadeHigher5,
    ];

    const ranges = [
      clubsRange,
      diamondsRange,
      heartsRange,
      spadeLowRange,
      spadeHighRange,
    ];
    const hands = [];

    for (let i = 0; i < ranges.length; i += 1) {
      const hand = newHand();
      addCardsToHand(hand, ranges[i]);
      hands.push(hand);
    }

    const expectedHandSize = 5;

    for (const hand of hands) {
      assertLogTrue(
        expectedHandSize,
        getHandSize(hand),
        (e, a) => `[${functionName}] No. of Hands Fail`
      );
    }
    for (let i = 1; i < hands.length; i += 1) {
      const thisHandSmaller = hands[i - 1];
      const forwardBigger = hands[i];
      const comparisonResult = comparatorHandRanking(
        forwardBigger,
        thisHandSmaller
      );
      assertLogTrue(
        true,
        isNoU(comparisonResult) ? comparisonResult : comparisonResult > 0,
        () => {
          const thisHandAsString = getHandAsString(thisHandSmaller);
          const forwardAsString = getHandAsString(forwardBigger);
          return `[${functionName}] [${i}] Comparision expects ${forwardAsString} > ${thisHandAsString}`;
        }
      );
    }
  });

  runTest(`sevenStud_testScoreShouldBeDoubs`, () => {
    const card1 = newCard(CARD_VALUE.THREE, CARD_SUITS.DIAMOND);
    const card2 = newCard(CARD_VALUE.FOUR, CARD_SUITS.SPADE);
    const card3 = newCard(CARD_VALUE.FIVE, CARD_SUITS.CLUB);
    const card4 = newCard(CARD_VALUE.ONE, CARD_SUITS.HEART);
    const card5 = newCard(CARD_VALUE.ONE, CARD_SUITS.DIAMOND);
    const card6 = newCard(CARD_VALUE.NINE, CARD_SUITS.SPADE);
    const card7 = newCard(CARD_VALUE.NINE, CARD_SUITS.CLUB);
    const cardRange = [card1, card2, card3, card4, card5, card6, card7];
    const handSeven = newHand();
    addCardsToHand(handSeven, cardRange);

    const combinations = ______WARN_getHandCombinations(
      handSeven,
      POKER_HAND_SIZE
    );
    console.log(combinations);
    const best = getBestCombination(combinations);
    console.log(getHandAsString(best));
    assertToDo(`Assertion`);
    // assertLogTrue(
    //   SCORING.DOUBLE,
    //   getScoreType(best),
    //   () =>
    //     `[testScoreShouldBeHigh] ${getHandAsString(
    //       handJacksOrBetter
    //     )} should be jacks or better.`
    // );
  });
};
