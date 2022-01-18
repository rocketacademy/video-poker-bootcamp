const TEST_CARDS = () => {
  runTest(`testSingleCardOrdinal`, () => {
    const cardAce = newCard(CARD_RANK.ONE, CARD_SUITS.CLUB);
    assertLog(1, getCardOrdinal(cardAce), () => `[testSingleCardOrdinal] Fail`);
  });

  runTest(`testGetHandCombinations`, () => {
    const hand = newHand();

    const card1 = newCard(CARD_RANK.ONE, CARD_SUITS.HEART);
    const card2 = newCard(CARD_RANK.TWO, CARD_SUITS.HEART);
    const card3 = newCard(CARD_RANK.THREE, CARD_SUITS.HEART);
    const card4 = newCard(CARD_RANK.FOUR, CARD_SUITS.HEART);
    const card5 = newCard(CARD_RANK.FIVE, CARD_SUITS.HEART);
    const card6 = newCard(CARD_RANK.SIX, CARD_SUITS.HEART);
    const card7 = newCard(CARD_RANK.SEVEN, CARD_SUITS.HEART);

    for (const card of [card1, card2, card3, card4, card5, card6, card7]) {
      addCardToHand(hand, card);
    }

    assertLog(
      7,
      getHandSize(hand),
      (e, a) => `[testGetHandCombinations] Hand Size Fail`
    );

    const sizePerHand = 5;
    const handCombinations = getHandCombinations(hand, sizePerHand);
  });
};
