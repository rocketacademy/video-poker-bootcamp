// Generate deck

const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * A function that shuffles cards
 * @param cardDeck {deck of cards}
 * @returns shuffleddeck {shuffledDeck}
 */

// Shuffle the cards
const shuffleDeck = (cardDeck) => {
  // Loop over card deck
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cardDeck.length);
    // Random card and Current Card
    const randomCard = cardDeck[randomIndex];
    const currentCard = cardDeck[currentIndex];
    // Swap positions with current position with random position;
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return cardDeck;
};

/**
 * A function that generates the deck
 * @returns deck of cards
 */
const generateDeck = () => {
  const deck = []; // Empty array for deck
  const suits = ['spades', 'hearts', 'clubs', 'diamonds']; // 4 suits
  const suitSymbol = ['♠️', '♥️', '♣️', '♦️'];
  const ranks = [...Array(13).keys()]; // Generates 13 numbers, from 0 to 12
  const name = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];// ;
  const displayName = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  for (let i = 0; i < suits.length; i += 1) {
    const suit1 = suits[i]; // Allow the suit to go through the loop
    const suitSymbol1 = suitSymbol[i];
    let color1;
    if (suitSymbol1 === suitSymbol[0] || suitSymbol1 === suitSymbol[2]) {
      color1 = 'black';
    } else {
      color1 = 'red';
    }

    let j = 0;
    while (j < ranks.length) {
      const element = {}; // Initialise / Reset element as empty
      const rank1 = ranks[j] + 1;
      const name1 = name[j];
      const displayName1 = displayName[j];

      element.suitSymbol = suitSymbol1; // Assign element with suit symbol
      element.suit = suit1; // Assign element with suit
      element.name = name1; // Assign element with name
      element.displayName = displayName1; // Assign display name
      element.color = color1; // Assign color
      element.rank = rank1; // Assign element with rank\

      deck.push(element); // Put element inside array
      j += 1;
    }
  }
  // console.log(`No of cards is: ${noOfCards}`);
  // console.log(deck);
  return deck;
};

const generatePoints = () => {
  const listOfPoints = {};
  listOfPoints['Royal Flush'] = 1000;
  listOfPoints['Straight Flush'] = 500;
  listOfPoints['4-kind'] = 250;
  listOfPoints['Full-House'] = 100;
  listOfPoints.Flush = 50;
  listOfPoints.Straights = 40;
  listOfPoints.Triples = 25;
  listOfPoints['2 Pairs'] = 10;
  listOfPoints['1 Pair'] = 1;
  listOfPoints['High Card'] = 0;

  return listOfPoints;
};
