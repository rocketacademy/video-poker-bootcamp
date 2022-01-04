/* -------------------------------------------------------------------------- */
/*                            create the poker deck                           */
/* -------------------------------------------------------------------------- */

/* ---- Get a random index ranging from 0 (inclusive) to max (exclusive). --- */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/* ------------------------ Shuffle an array of cards function ----------------------- */
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

/* ------------------------- get random joker color function ------------------------- */
const getRandomJokerColor = () => {
  // create array of joker colors
  const jokerColor = ['black', 'red'];
  // get random index of joker colors in array
  const randomJokerIndex = getRandomIndex(jokerColor.length);
  // get random joker color from the random index
  const randomJokerColor = jokerColor[randomJokerIndex];
  console.log(randomJokerColor);
  // return the random joker color
  return randomJokerColor;
};

/* -------------------------------- make deck function ------------------------------- */
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // joker color variable
  let jokerColor;

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 0; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
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
        // if card name is 0 change it to joker
      } else if (cardName === '0') {
        cardName = 'joker';
        // get random joker color
        jokerColor = getRandomJokerColor();
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        // random joker color
        joker: jokerColor,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

//  create shuffled deck
const deck = shuffleCards(makeDeck());

/* --------------------------- display cover card function --------------------------- */
const coverCard = () => {
  // get directory to cover card
  const imgSrc = 'card_images/card_back.png';

  // run a loop 5 times to display 5 cover card images
  for (let i = 0; i < 5; i += 1) {
    // create card image element
    const coverCardImg = document.createElement('img');
    // add class list to card image
    coverCardImg.classList.add('card-image');
    // point the card image to card cover image source
    coverCardImg.src = imgSrc;

    // create cover card image container element
    const coverCardImgHolder = document.createElement('div');
    // add class list to the cover card holder
    coverCardImgHolder.classList.add('card');
    // append the cover card to the image holder
    coverCardImgHolder.appendChild(coverCardImg);
    // append the card image holder to the card container
    cardContainer.appendChild(coverCardImgHolder);
  }
};

/* --------------------------- get card image url function --------------------------- */
const getCardImg = (card) => {
  // create a empty variable to store image source
  let imgSrc = '';

  // get directory to each card
  imgSrc = `./card_images/${card.name}_of_${card.suit}.png`;

  // if card name is joker change directory path name
  if (card.name === 'joker') {
    imgSrc = `./card_images/${card.name}_of_${card.joker}.png`;
  }

  // return image source
  return imgSrc;
};