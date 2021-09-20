// create deck

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === 'hearts') {
      currentSymbol = '♥️';
    } else if (currentSuit === 'spades') {
      currentSymbol = '♠️';
    } else if (currentSuit === 'clubs') {
      currentSymbol = '♣️';
    } else {
      currentSymbol = '♦️';
    }

    // set the color of the card (used later to
    // determine the css class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === '♥️' || currentSymbol === '♦️') {
      cardColor = 'red';
    } else {
      cardColor = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }
      const cardSelected = false;
      // Create a new card with the current name, suit, suit symbol, display name colour and rank
      const cardInfo = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        color: cardColor,
        rank: rankCounter,
        isSelected: cardSelected,
      };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// shuffle cards in the deck
const shuffleDeck = (Deck) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < Deck.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(Deck.length);
    // Select the card that corresponds to randomIndex
    const randomCard = Deck[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = Deck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    Deck[currentIndex] = randomCard;
    Deck[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return Deck;
};

// shuffle the deck
let deck = shuffleDeck(makeDeck());

// create a single card and return card element
// para a is a object cardInfo
// return NIL
const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add(cardInfo.name, cardInfo.color);
  name.innerText = cardInfo.name;

  const hold = document.createElement('div');
  hold.classList.add('hold');

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);
  card.appendChild(hold);

  return card;
};

let cardArray = [];

// function that deal 5 cards when the user press deal and auto reduce a single point
// return NIL
const dealFiveCards = () => {
  // make the comment div  string empty
  commentDiv.innerText = '';
  // reduce 1 point after pressing deal button  and update the points
  points -= 1;
  updatePoint(points);

  // remove the element to have always 5 cards
  const cards = document.querySelector('#cardDiv');
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }

  // clear card array if the array is filled

  if (cardArray.length !== 0) {
    cardArray = [];
  }

  for (let i = 0; i < 5; i++) {
    // get card out of the deck
    const currentCard = deck.pop();
    // put card into a array
    cardArray.push(currentCard);
  }

  // the array have always 5 elements
  cardArray.forEach((card) => {
    // create card and add card into div
    const cardElement = createCard(card);
    cardElement.addEventListener('click', (event) => {
      // add a event listener to handle card selection
      cardClicked(card, event.currentTarget);
    });
    // append the card element to the div
    cardDiv.appendChild(cardElement);
  });
};

let selectedCardsElementArray = [];
let selectedCardArray = [];

// function that handle a card being card click and unclicking
// parameter card is a object cardInfo
// parameter  cardElement is the clicked element
// return NIL
const cardClicked = (card, cardElement) => {
  // get the element div of hold
  const hold = cardElement.querySelector('.hold');
  if (card.isSelected === true) {
    // remove the element and card from the array
    card.isSelected = false;
    hold.innerHTML = '';
    selectedCardsElementArray.splice(cardElement, 1);
    selectedCardArray.splice(card, 1);
  } else {
    // add the element and card to the array
    card.isSelected = true;
    hold.innerHTML = 'Change';
    // console.log(cardElement);
    selectedCardsElementArray.push(cardElement);
    selectedCardArray.push(card);
  }
  console.log(selectedCardsElementArray.length);
  console.log(selectedCardArray.length);
};

// change function allow the change of the cards
// return NIL
const change = () => {
  // remove the selected card from the orginal array
  cardArray = cardArray.filter((val) => !selectedCardArray.includes(val));
  console.log(cardArray);

  for (let i = 0; i < selectedCardsElementArray.length; i++) {
    // remove the card div
    selectedCardsElementArray[i].remove();
    // remove the card from the orginal array and add in the new card
    // create new card
    const currentCard = deck.pop();
    const newCard = createCard(currentCard);
    // push new card in the array
    cardArray.push(currentCard);
    cardDiv.appendChild(newCard);
    // replace the card element
  }
  // reset the element array
  selectedCardsArray = [];
  selectedCardsElementArray = [];
  calcHandScore();
};

const playerHand = [
  { rank: 1, suit: 'spades', name: '2' },
  { rank: 2, suit: 'spades', name: '2' },
  { rank: 3, suit: 'spades', name: '2' },
  { rank: 4, suit: 'spades', name: '7' },
  { rank: 5, suit: 'spades', name: '9' },
];

let cardNameTally = [];
let highcard = 0;
let rankArray = [];
let suitArray = [];
let IsHighCardTrue = false;
let isOnePairTrue = false;
let isTwoPairTrue = false;
let isThreeOfAKindTrue = false;
let isFourOfAKindTrue = false;
let isFiveOfAKindTrue = false;
let isFlushTrue = false;
let isStraightTrue = false;
let isStraightFlush = false;
let isFullHouseTrue = false;

const calcHandScore = () => {
  // reset everything before starting
  cardYouGot.innerText = '';
  suitArray = [];
  rankArray = [];
  cardNameTally = [];
  // Loop over hand

  // points -= 1;
  // updatePoint(points);
  console.log(cardArray.length);
  for (let i = 0; i < cardArray.length; i += 1) {
    const cardName = cardArray[i].rank;
    // const cardName = playerHand[i].rank;

    rankArray.push(cardName);

    // suitArray.push(playerHand[i].suit);
    suitArray.push(cardArray[i].suit);

    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  for (cardName in cardNameTally) {
    // get high card
    if (cardNameTally[cardName] === 1) {
      // console.log(cardName);
      cardName = parseInt(cardName, 10);
      if (highcard < cardName) {
        highcard = cardName;
      }
    }
    // 1 pair
    if (cardNameTally[cardName] === 2) {
      // console.log(`${cardName} rank 1 pair`);
      cardYouGot.innerText += ` ${cardName} rank card 1 pair, `;
      isOnePairTrue = true;
    }

    // 3 of a kind
    if (cardNameTally[cardName] === 3) {
      // console.log(`${cardName} rank has 3 of a kind`);
      cardYouGot.innerText += ` ${cardName} rank card has 3 of a kind, `;
      isThreeOfAKindTrue = true;
      // console.log(isThreePairTrue);
    }

    // 4 of a kind
    if (cardNameTally[cardName] === 4) {
      // console.log(`${cardName} rank has 4 of a kind`);
      cardYouGot.innerText += ` ${cardName} rank card has 4 of a kind, `;
      isFourOfAKindTrue = true;
    }
    // 5 of a kind
    if (cardNameTally[cardName] === 5) {
      // console.log(`${cardName} rank has 5 of a kind`);
      cardYouGot.innerText += ` ${cardName} rank card has 4 of a kind, `;
      isFiveOfAKindTrue = true;
    }
  }
  // high card
  const afterFilterLength = rankArray.filter((v, i, a) => a.indexOf(v) === i);
  console.log(` the length is ${afterFilterLength.length}`);
  if (afterFilterLength.length === 5) {
    IsHighCardTrue = true;
    console.log(`hightcard = ${highcard} `);
    cardYouGot.innerText += ` hightcard = ${highcard}, `;
  }
  // 2 pair
  const findOutTwoPair = twoPair(rankArray);
  if (findOutTwoPair) {
    isTwoPairTrue = true;
    // console.log('you have 2 pairs in your hand ');
    cardYouGot.innerText += ' you have 2 pairs in your hand, ';
  }
  // flush
  console.log(suitArray);
  if (sameSuit(suitArray)) {
    // console.log('you have a same suit in your hand ');
    cardYouGot.innerText += 'you have a same suit in your hand, ';
    isFlushTrue = true;
  }

  // straights
  let straightResultCount = 0;
  const straightResult = straightCards(rankArray);
  for (let i = 0; i < straightResult.length; i++) {
    if (straightResult[i]) {
      straightResultCount += 1;
    } else {
      straightResultCount += 0;
    }
  }

  if (straightResultCount === 4) {
    // console.log('you have a straights  ');
    isStraightTrue = true;
    cardYouGot.innerText += 'you have a straights,  ';
  }

  // straight flush
  if (sameSuit(suitArray) === true && straightResultCount === 4) {
    // console.log('you have a straights flush  ');
    isStraightFlush = true;
    cardYouGot.innerText += 'you have a straights flush,  ';
  }

  // full house
  if (fullHouse()) {
    // console.log('you have a full house');
    isFullHouseTrue = true;
    cardYouGot.innerText += 'you have a full house,  ';
  }
  giveScore();
};

const giveScore = () => {
  if (isFiveOfAKindTrue)
  {
    points += 10;
    cardYouGot.innerText += ' + 10 points';
  }
  else if (isStraightFlush) {
    points += 9;
    cardYouGot.innerText += ' + 9 points';
  }
  else if (isFourOfAKindTrue) {
    points += 8;
    cardYouGot.innerText += ' + 8 points';
  }
  else if (isFullHouseTrue) {
    points += 7;
    cardYouGot.innerText += ' + 7 points';
  }
  else if (isFlushTrue) {
    points += 6;
    cardYouGot.innerText += ' + 6 points';
  }
  else if (isStraightTrue) {
    points += 5;
    cardYouGot.innerText += ' + 5 points';
  }
  else if (isThreeOfAKindTrue) {
    points += 4;
    cardYouGot.innerText += ' + 4 points';
  }
  else if (isTwoPairTrue) {
    points += 3;
    cardYouGot.innerText += ' + 3 points';
  }
  else if (isOnePairTrue) {
    points += 2;
    cardYouGot.innerText += ' + 2 points';
  } else if (IsHighCardTrue) {
    points += 0;
    cardYouGot.innerText += ' + NIL';
  }

  updatePoint(points);
};

// full house
const fullHouse = () => {
  // console.log(`  three pair = ${isThreeOfAKindTrue}`);
  if (isOnePairTrue && isThreeOfAKindTrue) {
    return true;
  }
  return false;
};

// straight
let straightCount = [];
const straightCards = (arr) => {
  arr.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
  console.log(arr);
  const nextArr = arr.slice(1);
  for (let i = 0; i < nextArr.length; i++) {
    // 2  // 3
    if (arr[i] + 1 === nextArr[i]) {
      straightCount.push(true);
    } else {
      straightCount.push(false);
    }
  }
  console.log(straightCount);
  // if there any false is not straight, it there is 4 true there is a straight
  return straightCount;
};

// flush method
let suitCount = {};
let result = 0;
let suitResult = false;
const sameSuit = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    const suitName = arr[i];
    // If we have seen the card name before, increment its count
    if (suitName in suitCount) {
      suitCount[suitName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      suitCount[suitName] = 1;
    }
  }
  for (const prop in suitCount) {
    if (suitCount[prop] >= 5) {
      suitResult = true;
    }
  }
  suitCount = {};
  result = 0;
  console.log(result);
  return suitResult;
};

// find out if it 2 pair
const twoPair = (arr) => {
  const countObj = {};
  for (const x of arr) {
    countObj[x] = (countObj[x] || 0) + 1;
  }
  const vals = Object.values(countObj);
  // console.log(vals);
  if (vals.filter((x) => x === 2).length == 2) return true;
  return false;
};

const updatePoint = (updatedPoints) => {
  totalPoints.innerHTML = updatedPoints;
};

const reset = () => {
  console.log('reset');

  deck = shuffleDeck(makeDeck());
  const cards = document.querySelector('#cardDiv');
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
  cardYouGot.innerText = '';
  cardArray = [];
  suitArray = [];
  rankArray = [];
  straightCount = [];
  selectedCardsElementArray = [];
  selectedCardArray = [];
  IsHighCardTrue = false;
  isOnePairTrue = false;
  isTwoPairTrue = false;
  isThreeOfAKindTrue = false;
  isFourOfAKindTrue = false;
  isFiveOfAKindTrue = false;
  isFlushTrue = false;
  isStraightTrue = false;
  isStraightFlush = false;
  isFullHouseTrue = false;
};

let buttonDiv;
let cardDiv;
let commentDiv;
let totalPoints;
let cardYouGot;
// total point be 100
let points = 100;

const init = () => {
  const scoreDiv = document.createElement('div');
  scoreDiv.classList.add('scoreDiv');
  const score = document.createElement('h4');
  score.innerHTML = 'Score : ';
  totalPoints = document.createElement('h4');
  totalPoints.innerHTML = points;

  const textContentDiv = document.createElement('div');
  textContentDiv.classList.add('textContentDiv');
  const textContent = document.createElement('h4');
  textContent.innerHTML = ' You Got : ';
  cardYouGot = document.createElement('h4');

  buttonDiv = document.createElement('div');
  const dealBtn = document.createElement('button');
  dealBtn.textContent = 'Deal';
  dealBtn.addEventListener('click', dealFiveCards);

  // const testBtn = document.createElement('button');
  // testBtn.textContent = 'test';
  // testBtn.addEventListener('click', calcHandScore);

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'reset';
  resetBtn.addEventListener('click', reset);

  cardDiv = document.createElement('div');
  cardDiv.classList.add('card-list');
  cardDiv.setAttribute('id', 'cardDiv');

  commentDiv = document.createElement('div');
  commentDiv.innerHTML = 'Please press deal to start the game';
  commentDiv.style.color = 'red';

  const changeBtn = document.createElement('button');
  changeBtn.textContent = 'change';
  changeBtn.addEventListener('click', change);

  document.body.appendChild(scoreDiv).append(score);
  document.body.appendChild(scoreDiv).append(totalPoints);
  document.body.appendChild(textContentDiv).append(textContent);
  document.body.appendChild(textContentDiv).append(cardYouGot);

  document.body.appendChild(commentDiv);
  document.body.appendChild(buttonDiv).append(dealBtn);
  document.body.appendChild(buttonDiv).append(changeBtn);
  // document.body.appendChild(buttonDiv).append(testBtn);
  document.body.appendChild(buttonDiv).append(resetBtn);
  document.body.appendChild(cardDiv);
};

init();
