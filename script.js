// eslint-disable-next-line
let points = 100;
let deck = [];
let hand = [];
let canClick = false;

const handDiv = document.createElement('div');
const buttonDiv = document.createElement('div');

/**
 * Function that creates 52 distinct cards, i.e. a poker deck
 * @return newDeck {array}
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ['❤️', '♦️', '♣️', '♠️'];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];

    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;

      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      newDeck.push(card);
    }
  }
  return newDeck;
};

/**
 * Function that gives random number x, where 0 <= x < max
 * @param max {number} for the upper bound
 * @return {number} between 0 (inclusive) and max
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Function that shuffles cards
 * @param cardDeck {array} to be shuffled
 * @return cardDeck {array} that has been shuffled
 */
const shuffleCards = (cardDeck) => {
  for (let currentIndex = 0; currentIndex < cardDeck.length; currentIndex += 1) {
    const randomIndex = getRandomIndex(cardDeck.length);
    const randomCard = cardDeck[randomIndex];
    const currentCard = cardDeck[currentIndex];
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
  }
  return cardDeck;
};

/**
 * Function that calculates score of a given hand
 * @param  an {array} hand containing cards to calculate score with
 * @return {number} score of hand (fixed as 1 temporariliy)
 */
// eslint-disable-next-line
const calcHandScore = () => {
  return 1;
};

/**
 * Function that resets deck (shuffled), handDiv, buttonDiv (with deal button)
 */
const resetGame = () => {
  deck = makeDeck();
  shuffleCards(deck);

  handDiv.innerHTML = '';
  buttonDiv.innerHTML = '';

  const dealBtn = document.createElement('button');
  dealBtn.innerText = 'Deal';
  // eslint-disable-next-line
  dealBtn.addEventListener('click', dealCards);
  buttonDiv.appendChild(dealBtn);
};

/**
 * Function that toggles element's class between 'unclicked-card' and 'clicked-card'
 * @param {element} of which to toggle class
 */
const onCardClick = (cardEl) => {
  if (canClick === true) {
    if (cardEl.classList[0] === 'unclicked-card') {
      cardEl.classList.remove('unclicked-card');
      cardEl.classList.add('clicked-card');
    } else {
      cardEl.classList.remove('clicked-card');
      cardEl.classList.add('unclicked-card');
    }
  }
};

/**
 * Function that swaps out unselected cards for new cards, then calculate and updates points
 * Changes draw button to new game button
 */
const drawCards = () => {
  canClick = false;

  // change UNselected cards
  const cardsToChange = handDiv.querySelectorAll('.unclicked-card');
  for (let i = 0; i < cardsToChange.length; i += 1) {
    const indexInHand = Number(cardsToChange[i].id[4]);
    hand[indexInHand] = deck.pop();
    cardsToChange[i].innerText = `${hand[indexInHand].name}${hand[indexInHand].suit}`;
  }

  // remove selection on cards
  const cardsClicked = handDiv.querySelectorAll('.clicked-card');
  for (let j = 0; j < cardsClicked.length; j += 1) {
    cardsClicked[j].classList.remove('clicked-card');
    cardsClicked[j].classList.add('unclicked-card');
  }

  // calculate and update points
  points += calcHandScore();
  buttonDiv.innerHTML = `Score: ${points}`;

  // new game button
  const newGameBtn = document.createElement('button');
  newGameBtn.innerText = 'New Game';
  newGameBtn.addEventListener('click', resetGame);
  buttonDiv.appendChild(newGameBtn);
};

/**
 * Function to deal 5 cards from deck to hand, create span for each card with event listener
 * Changes deal button to draw button
 */
const dealCards = () => {
  canClick = true;
  hand = deck.splice(0, 5);

  // create span for each card
  for (let i = 0; i < 5; i += 1) {
    const newSpan = document.createElement('span');
    newSpan.classList.add('unclicked-card');
    newSpan.setAttribute('id', `card${i}`);
    newSpan.innerText = `${hand[i].name}${hand[i].suit}`;
    newSpan.addEventListener('click', (event) => { onCardClick(event.currentTarget); });
    handDiv.appendChild(newSpan);
  }

  // remove deal button and creates draw button
  buttonDiv.innerHTML = '';
  const drawBtn = document.createElement('button');
  drawBtn.innerText = 'Draw';
  drawBtn.addEventListener('click', drawCards);
  buttonDiv.appendChild(drawBtn);
};

/**
 * Function to initialise game
 */
const initialiseGame = () => {
  document.body.appendChild(handDiv);
  document.body.appendChild(buttonDiv);
  resetGame();
};

initialiseGame();
