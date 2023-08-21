/* eslint-disable no-loop-func */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/** HELPER FUNCTIONS */
/** Function to get random index ranging from 0 (inclusive) to max (exclusive)
 * @param max - max number
*/
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

/** Function to create table element from array */
const createTable = (array, tableObj) => {
  for (let i = 0; i < array.length; i += 1) {
    let newRow = tableObj.insertRow(tableObj.length);
    for (let j = 0; j < array[i].length; j += 1) {
      let cell = newRow.insertCell(j);
      cell.innerHTML = array[i][j];
    }
  }
};

/** Function to shuffle cards
 * @param cards - array of cards
 */
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

/** Function to make card deck */
const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
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
      }
      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(card);
    }
  }
  // Return the completed card deck
  return newDeck;
};

/** Function to output message */
const output = (message) => {
  gameInfo.innerText = message;
};

/** Function to build card deck elements */
const buildCardElements = (hand) => {
  cardTable.innerHTML = '';
  const redrawIndexArr = [];
  /** build card elements */
  for (let i = 0; i < 5; i += 1) {
    let suit1 = hand[i].suit;
    let name1 = hand[i].name;
    const cardElement = document.createElement('img');
    cardElement.src = `../video-poker-bootcamp/media/${suit1}-${name1}.png`;
    cardElement.id = `${i}`;
    cardElement.alt = `${name1} of ${suit1}`;
    cardElement.className = 'card-element';

    cardElement.addEventListener('click', (e) => {
      if (currentGameMode === 'choose redraw' && e.currentTarget.className === 'card-element') {
        e.currentTarget.className = 'redraw-card-element';
        let index = Number(e.currentTarget.id);
        redrawIndexArr.push(index);
        redrawIndexArr.sort((a, b) => a - b);
        console.log(redrawIndexArr);
      } else if (currentGameMode === 'choose redraw' && e.currentTarget.className === 'redraw-card-element') {
        e.currentTarget.className = 'card-element';
        let index = Number(e.currentTarget.id);
        console.log(redrawIndexArr);
        for (let j = 0; j < redrawIndexArr.length; j += 1) {
          if (redrawIndexArr[j] === index) {
            redrawIndexArr.splice(j, 1);
            console.log(redrawIndexArr);
          }
        }
      }
    });
    redrawIndexes = redrawIndexArr;
    // cardBoxElement.appendChild(cardElement);
    cardTable.appendChild(cardElement);
  }
};

/** Function to check winning conditions with same card suit or sequential increase */
/** which includes royal flush, straight flush, flush, straight */
const checkSameCardSuits = () => {
  /** reset values for winning conditions */
  royalFlush = false;
  straightFlush = false;
  flush = false;
  straight = false;
  /** sort player hand in ascending order */
  playerHand.sort((a, b) => a.rank - b.rank);
  let cardSuitTally = {};
  /** loop to check if there are cards in sequential order */
  let seqCount = 0;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    if (playerHand[i].rank + 1 === playerHand[i + 1].rank) {
      seqCount += 1;
    }
  }
  /** loop to calc card suit tally */
  for (let i = 0; i < playerHand.length; i += 1) {
    let cardSuit = playerHand[i].suit;
    // If we have seen the card suit before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card suit to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }
  /** call values from card suit tally into an array */
  let suitArray = Array.from(Object.values(cardSuitTally));
  /** sort values in ascending order */
  suitArray.sort((a, b) => a - b);
  console.log('card suit tally values');
  console.log(suitArray);
  if (suitArray[suitArray.length - 1] === 5) {
    if (seqCount === 4) {
      straightFlush = true;
      return straightFlush;
    } if (seqCount === 3 && playerHand[0].rank === 1) {
      royalFlush = true;
      return royalFlush;
    }
    flush = true;
    return flush;
  } if (suitArray[suitArray.length - 1] < 5 && seqCount === 4) {
    straight = true;
    return straight;
  }
};

/** Function to check winning conditions with same card name */
/** which includes four of a kind, three of a kind, full house, two pairs, one pair */
const checkSameCardNames = () => {
  /** reset values for winning conditions */
  fourOfAKind = false;
  threeOfAKind = false;
  fullHouse = false;
  twoPairs = false;
  onePair = false;

  let cardNameTally = {};

  for (let i = 0; i < playerHand.length; i += 1) {
    let cardName = playerHand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }
  let nameArray = Array.from(Object.values(cardNameTally));
  nameArray.sort((a, b) => a - b);
  console.log('card name tally values');
  console.log(nameArray);

  if (nameArray[nameArray.length - 1] === 4) {
    fourOfAKind = true;
    return fourOfAKind;
  } if (nameArray[nameArray.length - 1] === 3 && nameArray[nameArray.length - 2] === 2) {
    fullHouse = true;
    return fullHouse;
  } if (nameArray[nameArray.length - 1] === 3) {
    threeOfAKind = true;
  } else if (nameArray[nameArray.length - 1] === 2 && nameArray[nameArray.length - 2] === 2) {
    twoPairs = true;
    return twoPairs;
  } else if (nameArray[nameArray.length - 1] === 2) {
    onePair = true;
    return onePair;
  }
};

/** Function to check high card */
const checkHighCard = () => {
  highCard = false;
  /** check high card */
  for (let i = 0; i < 5; i += 1) {
    if (playerHand[i].rank > 10) {
      highCard = true;
    }
  }
};

// /** Function to check hand */
const calcHandScore = () => {
  checkSameCardNames();
  checkSameCardSuits();
  checkHighCard();
  if (royalFlush) {
    console.log('royal flush');
    winCondition = 'Royal Flush';
    handScore = bet * 30;
  } else if (straightFlush) {
    console.log('straight flush');
    winCondition = 'Straight Flush';
    handScore = bet * 25;
  } else if (fourOfAKind) {
    console.log('four of a kind');
    winCondition = 'Four of a Kind';
    handScore = bet * 20;
  } else if (fullHouse) {
    console.log('full house');
    winCondition = 'Full House';
    handScore = bet * 15;
  } else if (flush) {
    console.log('flush');
    winCondition = 'Flush';
    handScore = bet * 10;
  } else if (straight) {
    console.log('straight');
    winCondition = 'Straight';
    handScore = bet * 8;
  } else if (threeOfAKind) {
    console.log('three of a kind');
    winCondition = 'Three of a Kind';
    handScore = bet * 6;
  } else if (twoPairs) {
    console.log('two pairs');
    winCondition = 'Two Pairs';
    handScore = bet * 4;
  } else if (onePair) {
    console.log('one pair');
    winCondition = 'One Pair';
    handScore = bet * 2;
  } else if (highCard) {
    console.log('high card');
    winCondition = 'High Card';
    handScore = bet * 1;
  } else {
    console.log('lose');
    handScore = -bet;
  }
};
