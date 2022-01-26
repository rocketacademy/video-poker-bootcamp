/**
 * @typedef {Hand} Deck
 */
const newDeck = newHand;
const addCardToDeck = addCardToHand;
const getDeckSize = getHandSize;

const drawCard = (deck) => deck.pop();

/**
 * @returns {Deck}
 */
const newSampleSingleSuitDeck = (suit) => {
  const deck = newDeck();
  suit = suit || CARD_SUITS.HEART;
  for (const value of Object.values(CARD_VALUE)) {
    const card = newCard(value, suit);
    addCardToDeck(deck, card);
  }
  return deck;
};

const newStandardDeck = (isToRiffle = true) => {
  const values = Object.values(CARD_VALUE);
  const suits = Object.values(CARD_SUITS);

  const deck = newDeck();
  for (const v of values) {
    for (const s of suits) {
      const card = newCard(v, s);
      addCardToDeck(deck, card);
    }
  }

  if (isToRiffle) {
    const le = deck.length;
    for (let i = 0; i < le; i += 1) {
      const j = Math.floor(Math.random() * (le - i)) + i;
      [deck[j], deck[i]] = [deck[i], deck[j]];
    }
  }

  return deck;
};
