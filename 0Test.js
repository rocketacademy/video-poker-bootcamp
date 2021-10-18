// Function makes test deck with same suit and running order

const testDeck = [];
const makeTestDeck = () => {
  const currentSuit = 'hearts';
  for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
    let cardName = `${rankCounter}`;

    // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
    if (cardName === '1') {
      cardName = 'ace';
    } else if (cardName === '11') {
      cardName = 'jack';
    } else if (cardName === '12') {
      cardName = 'queen';
    } else if (cardName === '13') {
      cardName = 'king';
    }

    // Create a new card with the current name, suit, and rank
    const testCard = {
      name: cardName,
      suit: currentSuit,
      rank: rankCounter,
      image: `${cardName}_of_${currentSuit}.png`,
    };

    testDeck.push(testCard);
  }
};
makeTestDeck();
makeTestDeck();

const makeTestCard = (rankCounter, currentSuit) => {
  let cardName = `${rankCounter}`;

  // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
  if (cardName === '1') {
    cardName = 'ace';
  } else if (cardName === '11') {
    cardName = 'jack';
  } else if (cardName === '12') {
    cardName = 'queen';
  } else if (cardName === '13') {
    cardName = 'king';
  }

  const testCard = {
    name: cardName,
    suit: currentSuit,
    rank: rankCounter,
    image: `${cardName}_of_${currentSuit}.png`,
  };
  return testCard;
};

testDeck.push(makeTestCard(1, 'hearts'));
testDeck.push(makeTestCard(1, 'clubs'));
testDeck.push(makeTestCard(1, 'diamonds'));
testDeck.push(makeTestCard(3, 'diamonds'));
testDeck.push(makeTestCard(3, 'hearts'));
testDeck.push(makeTestCard(3, 'spades'));
testDeck.push(makeTestCard(3, 'clubs'));
