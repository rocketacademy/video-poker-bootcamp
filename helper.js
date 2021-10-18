// TODO
// 1. swapping mechanism DONE
// 2. checking for win conditions
// 3. betting system
// 4. credit allocation system

const makeDeck = () => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ['heart', 'diamond', 'club', 'spade'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === '1') {
        cardName = 'ace';
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      // checks the cardName of each card and assigns their respective displayNames
      let displayName;
      switch (cardName) {
        case 'ace':
          displayName = 'A';
          break;
        case 'jack':
          displayName = 'J';
          break;
        case 'queen':
          displayName = 'Q';
          break;
        case 'king':
          displayName = 'K';
          break;
        default:
          displayName = cardName;
          break;
      }

      // checks the suits of each card and assigns their respective emoji suit
      let suitSymbol;
      switch (currentSuit) {
        case 'diamond':
          suitSymbol = '♦️';
          break;
        case 'club':
          suitSymbol = '♣️';
          break;
        case 'spade':
          suitSymbol = '♠️';
          break;
        case 'heart':
          suitSymbol = '♥️';
          break;
        default:
          console.log('weird');
      }

      let color;
      if (currentSuit === 'diamond' || currentSuit === 'heart') {
        color = 'red';
      } else {
        color = 'black';
      }

      const cardImgPath = `assets/cards/${currentSuit}/card_${rankCounter}_${currentSuit}.png`;
      const cardBackPath = `assets/cards/common/${color}`;

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        displayName,
        suitSymbol,
        color,
        cardImgPath,
        cardBackPath,
      };

      // add the card to the deck
      newDeck.push(card);
    }
  }

  return newDeck;
};

// Shuffle an array of cards
const shuffleCards = (cards) => {
  const getRandomIndex = (max) => Math.floor(Math.random() * max);
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

const holdCard = (cardDiv) => {
  //checks if carddiv already exists in the cardsToHold array
  //and toggles the hold badge accordingly
  if (!gameOver) {
    const holdBadge = cardDiv.childNodes[0];

    if (cardsToHold.includes(cardDiv)) {
      cardsToHold = cardsToHold.filter((cardToHold) => cardToHold !== cardDiv);
      holdBadge.style.display = 'none';
    } else {
      cardsToHold = cardsToHold.concat(cardDiv);
      holdBadge.style.display = 'block';
    }

    console.log(cardsToHold);
  }
};

const deal = () => {
  console.log(gameOver);
  if (!gameOver) {
    //if first round swap cards not in holdCards list
    //player holds all then skip to 2nd round

    // returns a HTML collection
    const cards = document.getElementsByClassName('card');
    //convert to array so we can use array specific functions like .includes
    const cardsArray = [...cards];

    //checks if cards in hand are in the cardsToHold arrFay,
    //if not swap the card out for a new one
    cardsArray.forEach((card) => {
      if (!cardsToHold.includes(card)) {
        const cardIndex = cardsArray.indexOf(card);
        const cardDiv = cardsArray[cardIndex];
        const newCard = deck.pop();
        player.hand[cardIndex] = newCard;
        const cardImg = cardDiv.querySelector('img');
        cardImg.src = newCard.cardImgPath;
      }
    });

    //changes the display style to none for previously selected cards
    cardsToHold.forEach((cardToHold) => {
      console.log(cardToHold);
      const holdBadge = cardToHold.childNodes[0];
      holdBadge.style.display = 'none';
    });

    //resets cardsToHold
    cardsToHold = [];

    const result = calcHandScore(player.hand);
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = result;
    gameOver = true;
  } else {
    //init game again
    gameOver = false;
    player.hand = [];
    const cardRow = document.getElementById('card-row');
    cardRow.innerHTML = '';
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = '';
    deck = shuffleCards(makeDeck());
    dealCards(player, deck);
  }
};

const createCardDiv = (card) => {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.addEventListener('click', () => holdCard(cardDiv));

  const img = document.createElement('img');
  img.src = card.cardImgPath;
  img.classList.add('img-fluid');

  const holdBadge = document.createElement('div');
  holdBadge.classList.add('hold-badge');
  holdBadge.innerText = 'HOLD';
  cardDiv.appendChild(holdBadge);

  cardDiv.appendChild(img);

  return cardDiv;
};

/**
 * Adds card to row
 * @param {object} card -
 */

const addCardToRow = (card) => {
  const cardDiv = createCardDiv(card);
  const cardRow = document.getElementById('card-row');
  cardRow.append(cardDiv);
};

/**
 * Deals card to player after bets have been placed
 * @param {object} player - Player global object created at initialisation
 * @param {object} deck  - Deck object created using make deck
 */

const dealCards = (player, deck) => {
  // basically creates the effect of the cards being given out by a "dealer"
  const delayDeal = (i) => {
    setTimeout(() => {
      const card = deck.pop();
      player.hand.push(card);
      addCardToRow(card);
    }, 100 + 100 * i);
  };
  for (let i = 0; i < 5; i += 1) {
    const card = deck.pop();
    player.hand.push(card);
    addCardToRow(card);
  }
};
