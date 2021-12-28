// code to handle deck creation, shuffling of cards

/**
 * Helper function get random number between 0 and max
 * @function
 * @param {number} integer
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Helper function to shuffle cards.
 * @function
 * @param {array} Array of card obj (name: str, suit: str, rank: int, color: str(red/black), displayName: str , suitSymbol: str)
 * @returns {array} Array of card obj (name: str, suit: str, rank: int, color: str(red/black), displayName: str , suitSymbol: str)
 */
export const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cards.length);
    const randomCard = cards[randomIndex];
    const currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  return cards;
};

/**
 * Function to generate a new deck of cards.
 * @function
 * @returns {array} Array of card obj (name: str, suit: str, rank: int, color: str(red/black), displayName: str, suitSymbol: str)
 */
export const makeDeck = () => {
  const newDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const suitSymbols = ["♥️", "♦️", "♣️", "♠️"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      let displayName = cardName;
      const color = suitIndex >= 1 ? "black" : "red";

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "ace";
        displayName = "A";
      } else if (cardName === "11") {
        cardName = "jack";
        displayName = "J";
      } else if (cardName === "12") {
        cardName = "queen";
        displayName = "Q";
      } else if (cardName === "13") {
        cardName = "king";
        displayName = "K";
      }

      // Create a new card obj with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        color: color,
        displayName: displayName,
        suitSymbol: currentSymbol,
      };

      newDeck.push(card);
    }
  }

  return newDeck;
};
