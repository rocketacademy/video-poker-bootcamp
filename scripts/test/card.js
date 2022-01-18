const TEST_CARDS = () => {
  runTest(`testSingleCardOrdinal`, () => {
    const cardAce = newCard(CARD_VALUES.ONE, CARD_SUITS.CLUB);
    assertLog(1, getCardOrdinal(cardAce), () => `[testSingleCardOrdinal] Fail`);
  });
};
