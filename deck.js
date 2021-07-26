/**
 * DECK AND CARD CREATION FUNCTIONS
 * Helper functions for creating deck
 */
// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    // CX: Setting of suit symbol as well as card colors
    let suitSymbol = '';
    let colour = '';
    let cardImage = '';

    switch (currentSuit) {
      case 'hearts':
        suitSymbol = '♥';
        colour = 'red';
        break;
      case 'diamonds':
        suitSymbol = '♦️';
        colour = 'red';
        break;
      case 'clubs':
        suitSymbol = '♣';
        colour = 'black';
        break;
      case 'spades':
      default:
        suitSymbol = '♠';
        colour = 'black';
        break;
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      // CX: Setting of display name
      let displayName = cardName;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayName = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayName = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayName = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayName = 'K';
      }

      // set card image
      switch (cardName) {
        case 'ace':
          if (currentSuit === 'hearts') {
            cardImage = '🂱';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃁';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃑';
          } else {
            // spades
            cardImage = '🂡';
          }
          break;
        case 'king':
          if (currentSuit === 'hearts') {
            cardImage = '🂾';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃎';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃞';
          } else {
            // spades
            cardImage = '🂮';
          }
          break;
        case 'queen':
          if (currentSuit === 'hearts') {
            cardImage = '🂽';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃍';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃝';
          } else {
            // spades
            cardImage = '🂭';
          }
          break;
        case 'jack':
          if (currentSuit === 'hearts') {
            cardImage = '🂻';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃋';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃛';
          } else {
            // spades
            cardImage = '🂫';
          }
          break;
        case '10':
          if (currentSuit === 'hearts') {
            cardImage = '🂺';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃊';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃚';
          } else {
            // spades
            cardImage = '🂪';
          }
          break;
        case '9':
          if (currentSuit === 'hearts') {
            cardImage = '🂹';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃉';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃙';
          } else {
            // spades
            cardImage = '🂩';
          }
          break;
        case '8':
          if (currentSuit === 'hearts') {
            cardImage = '🂸';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃈';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃘';
          } else {
            // spades
            cardImage = '🂨';
          }
          break;
        case '7':
          if (currentSuit === 'hearts') {
            cardImage = '🂷';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃇';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃗';
          } else {
            // spades
            cardImage = '🂧';
          }
          break;
        case '6':
          if (currentSuit === 'hearts') {
            cardImage = '🂶';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃆';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃖';
          } else {
            // spades
            cardImage = '🂦';
          }
          break;
        case '5':
          if (currentSuit === 'hearts') {
            cardImage = '🂵';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃅';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃕';
          } else {
            // spades
            cardImage = '🂥';
          }
          break;
        case '4':
          if (currentSuit === 'hearts') {
            cardImage = '🂴';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃄';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃔';
          } else {
            // spades
            cardImage = '🂤';
          }
          break;
        case '3':
          if (currentSuit === 'hearts') {
            cardImage = '🂳';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃃';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃓';
          } else {
            // spades
            cardImage = '🂣';
          }
          break;
        case '2':
        default:
          if (currentSuit === 'hearts') {
            cardImage = '🂲';
          } else if (currentSuit === 'diamonds') {
            cardImage = '🃂';
          } else if (currentSuit === 'clubs') {
            cardImage = '🃒';
          } else {
            // spades
            cardImage = '🂢';
          }
          break;
      }

      // Create a new card with the current name, suit, and rank
      // CX fix: set aces to 14, as highest rank (above king)
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: (rankCounter === 1) ? 14 : rankCounter,
        suitSymbol,
        displayName,
        cardImage,
        colour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Make a card in the DOM
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  // CX: Add color to the suit
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;
  suit.style.display = 'none';

  const name = document.createElement('div');
  name.classList.add(cardInfo.displayName, cardInfo.colour);
  // CX: Replace 3 with the display name of the card
  name.innerText = cardInfo.displayName;
  name.style.display = 'none';

  const image = document.createElement('div');
  image.classList.add('card-image', cardInfo.colour);
  image.innerText = cardInfo.cardImage;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(image);
  card.appendChild(suit);

  return card;
};
