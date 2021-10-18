// Function makes test deck with same suit and running order

const testDeck = [];

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
  testDeck.push(testCard);
};

// Fodder card
makeTestCard(1, 'hearts');
makeTestCard(1, 'clubs');
makeTestCard(1, 'diamonds');
makeTestCard(1, 'spades');
makeTestCard(7, 'diamonds'); makeTestCard(8, 'hearts');
makeTestCard(9, 'clubs');
makeTestCard(5, 'diamonds');
makeTestCard(1, 'spades');
makeTestCard(3, 'diamonds');
makeTestCard(7, 'diamonds'); makeTestCard(8, 'hearts');
makeTestCard(9, 'clubs');
makeTestCard(5, 'diamonds');
makeTestCard(1, 'spades');
makeTestCard(3, 'diamonds');

// Four of a kind
makeTestCard(1, 'hearts');
makeTestCard(1, 'clubs');
makeTestCard(1, 'diamonds');
makeTestCard(1, 'spades');
makeTestCard(3, 'diamonds');

// Full house
makeTestCard(2, 'hearts');
makeTestCard(2, 'spades');
makeTestCard(3, 'hearts');
makeTestCard(3, 'spades');
makeTestCard(3, 'clubs');

// Straight flush, change one card
makeTestCard(2, 'clubs');
makeTestCard(3, 'hearts');
makeTestCard(4, 'hearts');
makeTestCard(5, 'hearts');
makeTestCard(6, 'hearts');
makeTestCard(10, 'spades');

// Straight, change one card
makeTestCard(7, 'hearts');
makeTestCard(8, 'spades');
makeTestCard(9, 'hearts');
makeTestCard(10, 'clubs');
makeTestCard(11, 'clubs');
makeTestCard(9, 'spades');

// Flush
makeTestCard(2, 'diamonds');
makeTestCard(7, 'diamonds');
makeTestCard(10, 'diamonds');
makeTestCard(5, 'diamonds');
makeTestCard(13, 'diamonds');
makeTestCard(5, 'clubs');

// Royal Flush
makeTestCard(1, 'clubs');
makeTestCard(10, 'clubs');
makeTestCard(11, 'clubs');
makeTestCard(12, 'clubs');
makeTestCard(13, 'clubs');

// Broadway
makeTestCard(1, 'hearts');
makeTestCard(10, 'clubs');
makeTestCard(11, 'diamonds');
makeTestCard(12, 'diamonds');
makeTestCard(13, 'clubs');

// Two of a kind
makeTestCard(1, 'hearts');
makeTestCard(1, 'clubs');
makeTestCard(4, 'diamonds');
makeTestCard(12, 'diamonds');
makeTestCard(13, 'clubs');

// Two pair
makeTestCard(1, 'hearts');
makeTestCard(1, 'clubs');
makeTestCard(4, 'diamonds');
makeTestCard(12, 'diamonds');
makeTestCard(4, 'clubs');

// Three of a kind
makeTestCard(1, 'hearts');
makeTestCard(2, 'clubs');
makeTestCard(4, 'diamonds');
makeTestCard(4, 'diamonds');
makeTestCard(4, 'clubs');
