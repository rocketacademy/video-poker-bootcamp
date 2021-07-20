const makeDeck = () => {
  const newDeck = [];
  const suits = ['h', 'd', 'c', 's'];
  const suitSymbols = ['♥', '♦', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentSuitSym = suitSymbols[suitIndex];

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let dispName = `${rankCounter}`;
      let suitColor = 'black';

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        dispName = 'a';
      } else if (cardName === '11') {
        cardName = 'jack';
        dispName = 'j';
      } else if (cardName === '12') {
        cardName = 'queen';
        dispName = 'q';
      } else if (cardName === '13') {
        cardName = 'king';
        dispName = 'k';
      }
      if (currentSuit === 'h' || currentSuit === 'd')
      {
        suitColor = 'red';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: currentSuitSym,
        suit: currentSuit,
        name: cardName,
        displayName: dispName,
        colour: suitColor,
        rank: rankCounter,
        isHeld:false
      };

      // Add the new card to the deck
      newDeck.push(card);
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const getRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];

    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};