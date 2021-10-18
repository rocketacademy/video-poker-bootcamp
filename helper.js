// ---------------------------------------------------------
// HELPER FUNCTIONS WIN CONDITIONS
// ---------------------------------------------------------

// 1) ROYAL FLUSH - ACE HIGH STRAIGHT FLUSH -- checked and working
const checkRoyalFlush = (playerHand) => {
  // const royalFlush = ['ace', 'king', 'queen', 'jack', '10'];
  let cardRanks = [];

  // Check that suits are same across hand
  for (let i = 0; i < 5; i++) {
    cardRanks.push(playerHand[i].name)
    if (playerHand.every((e) => e.suit === testRoyalFlushHand[0].suit)) {
      // console.log('same suits')
    }
  }
  if (cardRanks.includes('ace') && cardRanks.includes('king') && cardRanks.includes('queen') && cardRanks.includes('jack') && cardRanks.includes('10')) {
    // console.log('royal flush'); 
    return true;
  } else {
    // console.log('NO ROYAL FLUSH');
    return false;
}
}

// 2) STRAIGHT FLUSH (SEQUENTIAL RANK IN SAME SUIT) -- checked and working
const checkStraightFlush = (playerHand) => {
  if (checkFlush(playerHand) === true && checkStraight(playerHand) === true) {
    // console.log('straight flush');
    return true;
  } else {
    // console.log('no straight flush');
    return false;
  }

}

// 3) FOUR OF A KIND (4 CARDS 1 RANK) -- checked and working
const checkFourKind = (playerHand) => {
    let cardNameTally = {};
    let cardFourKind = 0;

  for (let i = 0; i < playerHand.length; i++) {
  let cardName = playerHand[i].name;
  // If we have seen the card name before, increment its count
  if (cardName in cardNameTally) {
    cardNameTally[cardName] ++;

    // checks 2 of a kind
   if (cardNameTally[cardName] === 4) {
      console.log("3. four kind");
      cardFourKind++;
      // console.log("card name tally: ",cardNameTally)
    }
  } else {
    cardNameTally[cardName] = 1;
  };
};

  if (cardFourKind === 1) {
    // console.log("U HAVE four of kind");
    return true;
  } else {
    // console.log("U HAVE no four of kind");
    return false;
  }

}

// 4) FULL HOUSE (3 CARDS 1 RANK + 2 CARDS 1 RANK) --- checked and working 
const checkFullHouse = (playerHand) => {
  // Extract ranks from player's hand and sort them in ascending order
  let sortedRanks = [];
  for (let i = 0; i < playerHand.length; i++) {
    sortedRanks.push(playerHand[i].rank);
  }

  function compareNum(a, b) {
    return a - b;
  }
  sortedRanks.sort(compareNum);
  // console.log(sortedRanks);

  // refactor please
  if ((sortedRanks[0] === sortedRanks[1] && sortedRanks[1] === sortedRanks[2] && sortedRanks[3] === sortedRanks[4]) || (sortedRanks[4] === sortedRanks[3] && sortedRanks[3] === sortedRanks[2] && sortedRanks[1] === sortedRanks[0])) {
      
    // console.log('YOU HAVE full house');
    return true;
    } else {
    // console.log('YOU HAVE NO full house');
    return false;
  }
};

// 5) FLUSH - 5 CARDS OF THE SAME SUIT -- checked and working
const checkFlush = (playerHand) => {
  // for (let i = 0; i < 5; i++) {
    if (playerHand.every((e) => e.suit === playerHand[0].suit)) {
      // console.log('flush');
      return true;
    } else {
      // console.log('no flush');
      return false;
    }
  // };
};


// 6) STRAIGHT (SQUENTIAL RANK)
// need 1 condition that checks for AKQJ10
// rest can be determined just through rank
const checkStraight = (playerHand) => {
  
  // Extract ranks from player's hand and sort them in ascending order
  let sortedRanks = [];
  for (let i = 0; i < playerHand.length; i++) {
    sortedRanks.push(playerHand[i].rank);
  }
  // Callback function for sort() to order elements as numbers instead of str
  function compareNum(a, b) {
    return a - b;
  }
  sortedRanks.sort(compareNum);
  // console.log(sortedRanks);

  let sequencedNum = 0;

  for (let j = 0; j < sortedRanks.length - 1; j++) {
    if (sortedRanks[j] + 1 !== sortedRanks[j+1]) {
        // console.log(sortedRanks[j]);
        // console.log('no sequential numbers found');
    } else {
      // console.log('sequential numbers found')
      sequencedNum++;
    }
  }

  // const highAcesRanks = [1, 10, 11, 12, 13];

    if (sortedRanks.includes(1) && sortedRanks.includes(10) && sortedRanks.includes(11) && sortedRanks.includes(12) && sortedRanks.includes(13)) {
    // console.log('ace high straight'); 
    return true;
  } else if (sequencedNum === 4) {
    // console.log('u r straight');
    return true;
  } else {
    // console.log("U R NOT STRAIGHT");
    return false;
  }
};

// 7) THREE OF A KIND -- checked and working
// AAA 222 111 222 333 444 555 666 777 888 999 101010 JJJ QQQ KKK

const checkThreeKind = (playerHand) => {

  let cardNameTally = {};
  let cardThreeKind = 0;

  for (let i = 0; i < playerHand.length; i++) {
  let cardName = playerHand[i].name;
  // If we have seen the card name before, increment its count
  if (cardName in cardNameTally) {
    cardNameTally[cardName] ++;

    // checks 2 of a kind
   if (cardNameTally[cardName] === 3) {
      console.log("7. three kind");
      cardThreeKind++;
      console.log("card name tally: ",cardNameTally)
    }
  } else {
    cardNameTally[cardName] = 1;
  };
};

  if (cardThreeKind === 1) {
    // console.log("U HAVE three of kind");
    return true;
  } else {
    // console.log("U HAVE no three of kind");
    return false;
  }
};


// 8) TWO PAIR -- checked and working
// AA 22 33 44 55 66 77 88 99 1010 JJ QQ KK

const checkTwoPair = (playerHand) => {

  let cardNameTally = {};
  let cardPairs = 0; 

  for (let i = 0; i < playerHand.length; i++) {
  let cardName = playerHand[i].name;
  // If we have seen the card name before, increment its count
  if (cardName in cardNameTally) {
    cardNameTally[cardName] ++;

    // checks 2 of a kind
   if (cardNameTally[cardName] === 2) {
      // console.log("9. one pair ");
      cardPairs++;
      // console.log("card name tally: ",cardNameTally)
    }
  } else {
    cardNameTally[cardName] = 1;
  }
}

  if (cardPairs === 2) {
    // console.log("U HAVE two pairs");
    return true;
  } else {
    // console.log("U HAVE no two pairs");
    return false;
  }
}

// 9) JACKS OR BETTER -- checked and working
// AA, JJ, QQ, KK 

const checkJacksBetter = (playerHand) => {

  let cardNameTally = {};
  let cardJacksBetter = 0; 

  for (let i = 0; i < playerHand.length; i++) {

    let cardName = playerHand[i].name;
    if (cardName === "ace" || cardName === "king" || cardName === "queen" || cardName === "jack") {
      // If we have seen the card name before, increment its count
      if (cardName in cardNameTally) {
        cardNameTally[cardName] ++;

        // checks 2 of a kind
        if (cardNameTally[cardName] === 2) {
          // console.log("9. jacks or better ");
          cardJacksBetter++;
          // console.log("card name tally: ",cardNameTally)
        }
      } else {
        cardNameTally[cardName] = 1;
      }
    }
  }

  if (cardJacksBetter === 1) {
    // console.log("U HAVE jacks or better");
    return true;
  } else {
    // console.log("U HAVE no jacks or better");
    return false;
  }
}

// ---------------------------------------------------------
// HELPER FUNCTIONS FOR CARD FACE GENERATION
// ---------------------------------------------------------


const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit', cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);

  if (cardInfo.displayName === "J") {
    name.innerText = `"jack"`;
    // name.classList.add('court');
  } else if (cardInfo.displayName === "Q") {
    name.innerText = `"queen"`;
    // name.classList.add('court');

  } else if (cardInfo.displayName === "K") {
    name.innerText = `"king"`;
    // name.classList.add('court');

  } else {
    name.innerText = cardInfo.displayName;
  // name.innerText = `"QUEEN"`;
  }
  

  const card = document.createElement('div');
  card.classList.add('card-face-container');
  document.body.appendChild(card);

  const cardTop = document.createElement('div');
  cardTop.classList.add('card-face-top');
  card.appendChild(cardTop);

  const cardTopLeft = document.createElement('div');
  cardTopLeft.classList.add('card-face-top-left');
  card.appendChild(cardTopLeft);

  const cardFaceInfo = document.createElement('div');
  cardFaceInfo.classList.add('card-face-info');
  card.appendChild(cardFaceInfo);

  const cardBtm = document.createElement('div');
  cardBtm.classList.add('card-face-btm');
  card.appendChild(cardBtm);

  const cardBtmRight = document.createElement('div');
  cardBtmRight.classList.add('card-face-btm-right');
  cardBtm.appendChild(cardBtmRight);


  cardTopLeft.classList.add(cardInfo.colour);
  cardTopLeft.innerHTML = cardInfo.displayName + "<br />" + cardInfo.suitSymbol;
 
  cardBtmRight.classList.add(cardInfo.colour);
  cardBtmRight.innerHTML = cardInfo.displayName + "<br />" + cardInfo.suitSymbol;


  card.appendChild(name);
  card.appendChild(suit);

  cardFaceInfo.appendChild(name);
  cardFaceInfo.appendChild(suit);

  cardContainer.appendChild(card);

  return card;

};


// ---------------------------------------------------------
// HELPER FUNCTIONS FOR CARD DECK GENERATION
// ---------------------------------------------------------

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
  const suitSymbols = ['♥', '♦', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSymbol = suitSymbols[suitIndex];
    let suitColour = '';

    if (currentSuit === 'hearts' || currentSuit === 'diamonds') {
      suitColour = 'red';
    } else if (currentSuit === 'clubs' || currentSuit === 'spades') {
      suitColour = 'black';
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter++) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayAs = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayAs = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayAs = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayAs = 'Q';
      } else if (cardName === '13') {
        cardName = 'king';
        displayAs = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        suitSymbol: currentSymbol,
        displayName: displayAs,
        colour: suitColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// ---------------------------------------------------------
// HELPER FUNCTION FOR GREETING
// ---------------------------------------------------------

const getGreeting = () => {
  let today = new Date();
  let time = today.getHours();
  // console.log(time);

    if (time > 0 && time <= 12) {
    return "morning";
    } else if (time > 12 && time <= 18) {
    return "afternoon";
    } else if (time > 18) {
    return "evening";
    } else {
    return "time does not exist";
    }
}
