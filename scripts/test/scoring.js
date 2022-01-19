const TEST_SCORINGS = () => {
  runTest(`testScoreShouldBeFourOfAKind`, () => {});
  runTest(`testScoreShouldBeStraight`, () => {
    const cardYoungest = newCard(CARD_RANK.THREE, CARD_SUITS.HEART);
    const cardYounger = newCard(CARD_RANK.FOUR, CARD_SUITS.HEART);
    const cardYoung = newCard(CARD_RANK.FIVE, CARD_SUITS.HEART);
    const cardOld = newCard(CARD_RANK.SIX, CARD_SUITS.HEART);
    const cardOldest = newCard(CARD_RANK.SEVEN, CARD_SUITS.CLUB);
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

    const handCombinations = getHandCombinations(
      sortedHand,
      sizePerHandCombination
    );
    assertLogTrue(
      1,
      handCombinations.length,
      () => `[testGetHandCombinations] Combinations not matching`
    );
    const combination = handCombinations[0];

    const thisHand = newAscendingArray(combination);

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
    const cardYoungest = newCard(CARD_RANK.JACK, CARD_SUITS.HEART);
    const cardYounger = newCard(CARD_RANK.QUEEN, CARD_SUITS.HEART);
    const cardYoung = newCard(CARD_RANK.KING, CARD_SUITS.HEART);
    const cardNotYoung = newCard(CARD_RANK.ONE, CARD_SUITS.HEART);
    const cardNotOld = newCard(CARD_RANK.TWO, CARD_SUITS.HEART);
    const cardOld = newCard(CARD_RANK.THREE, CARD_SUITS.CLUB);
    const cardOlder = newCard(CARD_RANK.THREE, CARD_SUITS.HEART);
    const cardOldest = newCard(CARD_RANK.FOUR, CARD_SUITS.HEART);

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

      const handCombinations = getHandCombinations(
        sortedHand,
        sizePerHandCombination
      );
      assertLogTrue(
        1,
        handCombinations.length,
        () => `[testCardsScoreShouldNotBeStraight] Combinations not matching`
      );
      const combination = handCombinations[0];

      const thisHand = newAscendingArray(combination);

      assertLogNotTrue(
        SCORING.STRAIGHTS,
        getScoreType(thisHand),
        (e) => `[testCardsScoreShouldNotBeStraight] Expected Hand to Be ${e}`
      );
    }
    assertToDo(`new test to assert the expected scoring type of the samples`);
  });

  runTest(`testCardsScoreShouldBeFlush`, () => {
    const cardThemed1 = newCard(CARD_RANK.JACK, CARD_SUITS.HEART);
    const cardThemed2 = newCard(CARD_RANK.THREE, CARD_SUITS.HEART);
    const cardThemed3 = newCard(CARD_RANK.SEVEN, CARD_SUITS.HEART);
    const cardThemed4 = newCard(CARD_RANK.ONE, CARD_SUITS.HEART);
    const cardThemed5 = newCard(CARD_RANK.TWO, CARD_SUITS.HEART);

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

    const handCombinations = getHandCombinations(
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
    const cardPack1 = newCard(CARD_RANK.TWO, CARD_SUITS.HEART);
    const cardPack2 = newCard(CARD_RANK.TWO, CARD_SUITS.CLUB);
    const cardPack3 = newCard(CARD_RANK.TWO, CARD_SUITS.DIAMOND);
    const cardPack4 = newCard(CARD_RANK.TWO, CARD_SUITS.SPADE);
    const cardHigh = newCard(CARD_RANK.JACK, CARD_SUITS.HEART);

    const cardRange = [cardPack1, cardPack2, cardPack3, cardPack4, cardHigh];

    const themedHand = newHand();
    const sizePerHandCombination = 5;

    for (const card of cardRange) {
      addCardToHand(themedHand, card);
    }

    const handCombinations = getHandCombinations(
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
    const cardPack1 = newCard(CARD_RANK.TWO, CARD_SUITS.HEART);
    const cardPack2 = newCard(CARD_RANK.TWO, CARD_SUITS.DIAMOND);
    const cardPack3 = newCard(CARD_RANK.TWO, CARD_SUITS.SPADE);
    const cardPair1 = newCard(CARD_RANK.JACK, CARD_SUITS.CLUB);
    const cardPair2 = newCard(CARD_RANK.JACK, CARD_SUITS.HEART);

    const cardRange = [cardPack1, cardPair1, cardPack2, cardPack3, cardPair2];
    const housedHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(housedHand, card);
    }
    const handCombinations = getHandCombinations(
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

    assertToDo();
  });

  runTest(`testCardScoreShouldBeTrips`, () => {
    const functionName = `testCardScoreShouldBeTrips`;
    const cardHigh1 = newCard(CARD_RANK.JACK, CARD_SUITS.CLUB);
    const cardHigh2 = newCard(CARD_RANK.FIVE, CARD_SUITS.HEART);
    const cardPack1 = newCard(CARD_RANK.TWO, CARD_SUITS.HEART);
    const cardPack2 = newCard(CARD_RANK.TWO, CARD_SUITS.DIAMOND);
    const cardPack3 = newCard(CARD_RANK.TWO, CARD_SUITS.SPADE);
    const cardRange = [cardPack1, cardHigh1, cardPack2, cardPack3, cardHigh2];
    const housedHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(housedHand, card);
    }
    const handCombinations = getHandCombinations(
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
    const cardPack1 = newCard(CARD_RANK.THREE, CARD_SUITS.HEART);
    const cardPack2 = newCard(CARD_RANK.SIX, CARD_SUITS.HEART);
    const cardPack3 = newCard(CARD_RANK.FOUR, CARD_SUITS.HEART);
    const cardPack4 = newCard(CARD_RANK.FIVE, CARD_SUITS.HEART);
    const cardPack5 = newCard(CARD_RANK.SEVEN, CARD_SUITS.HEART);
    const cardRange = [cardPack1, cardPack2, cardPack3, cardPack4, cardPack5];
    const housedHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(housedHand, card);
    }
    const handCombinations = getHandCombinations(
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
    const cardPair1_1 = newCard(CARD_RANK.THREE, CARD_SUITS.HEART);
    const cardPair1_2 = newCard(CARD_RANK.THREE, CARD_SUITS.CLUB);
    const cardPair2_1 = newCard(CARD_RANK.FOUR, CARD_SUITS.HEART);
    const cardPair2_2 = newCard(CARD_RANK.FOUR, CARD_SUITS.DIAMOND);
    const cardHigh = newCard(CARD_RANK.SEVEN, CARD_SUITS.HEART);
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
    const handCombinations = getHandCombinations(
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
    const cardPair1 = newCard(CARD_RANK.THREE, CARD_SUITS.HEART);
    const cardPair2 = newCard(CARD_RANK.THREE, CARD_SUITS.CLUB);
    const cardHigh2 = newCard(CARD_RANK.FOUR, CARD_SUITS.HEART);
    const cardHigh3 = newCard(CARD_RANK.JACK, CARD_SUITS.DIAMOND);
    const cardHigh1 = newCard(CARD_RANK.SEVEN, CARD_SUITS.HEART);
    const cardRange = [cardPair1, cardHigh3, cardPair2, cardHigh2, cardHigh1];
    const doubsHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(doubsHand, card);
    }
    const handCombinations = getHandCombinations(
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
    const cardPair1 = newCard(CARD_RANK.KING, CARD_SUITS.HEART);
    const cardPair2 = newCard(CARD_RANK.THREE, CARD_SUITS.CLUB);
    const cardHigh2 = newCard(CARD_RANK.FOUR, CARD_SUITS.HEART);
    const cardHigh3 = newCard(CARD_RANK.JACK, CARD_SUITS.DIAMOND);
    const cardHigh1 = newCard(CARD_RANK.SEVEN, CARD_SUITS.HEART);
    const cardRange = [cardPair1, cardHigh3, cardPair2, cardHigh2, cardHigh1];
    const doubsHand = newHand();
    const sizePerHandCombination = 5;
    for (const card of cardRange) {
      addCardToHand(doubsHand, card);
    }
    const handCombinations = getHandCombinations(
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
      SCORING.HIGH,
      scoreType,
      () => `[${functionName}]  Score Type assertion failed.`
    );
  });
};
