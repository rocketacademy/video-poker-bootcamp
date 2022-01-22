const TEST_CARDS = () => {
  runTest(`testSingleCardOrdinal`, () => {
    const cardAce = newCard(CARD_VALUE.ONE, CARD_SUITS.CLUB);
    assertLogTrue(
      14,
      getCardOrdinal(cardAce),
      () => `[testSingleCardOrdinal] Ordinal mismatch`
    );
  });

  runTest(`testGetHandCombinations`, () => {
    const handSevenCard = newHand();

    const card1 = newCard(CARD_VALUE.ONE, CARD_SUITS.HEART);
    const card2 = newCard(CARD_VALUE.TWO, CARD_SUITS.HEART);
    const card3 = newCard(CARD_VALUE.THREE, CARD_SUITS.HEART);
    const card4 = newCard(CARD_VALUE.FOUR, CARD_SUITS.HEART);
    const card5 = newCard(CARD_VALUE.FIVE, CARD_SUITS.HEART);
    const card6 = newCard(CARD_VALUE.SIX, CARD_SUITS.HEART);
    const card7 = newCard(CARD_VALUE.SEVEN, CARD_SUITS.HEART);

    for (const card of [card1, card2, card3, card4, card5, card6, card7]) {
      addCardToHand(handSevenCard, card);
    }

    const expectedHandSize = 7;
    assertLogTrue(
      expectedHandSize,
      getHandSize(handSevenCard),
      (e, a) => `[testGetHandCombinations] Hand Size Fail`
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
      () => `[testGetHandCombinations] Combinations not matching`
    );

    assertToDo();
  });
};
