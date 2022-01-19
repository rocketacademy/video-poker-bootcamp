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
          `[testCardsScoreShouldBeFlush] The five cards chosen from a pool of five should be the same in order (don't need to change card order as we are testing for colors)`
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
    assertToDo();
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
          `[testCardScoreShouldBeFourOfAKind] The five cards chosen from a pool of five should be the same in order (don't need to change card order as we are testing for colors)`
      );
    }

    const scoreType = getScoreType(themedHand);
    assertLogTrue(
      SCORING.FOUR_OF_A_KIND,
      scoreType,
      () => `[testCardScoreShouldBeFourOfAKind] Score Type assertion failed.`
    );
    assertToDo();
  });
};
