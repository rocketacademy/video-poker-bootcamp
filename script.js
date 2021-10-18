
/**
 * (╯°□°)╯︵ ┻━┻
 * 
 */


const dealCards = () => {
  if (canDeal === true) {
    cardContainer.innerText = "";
    userPoints--;
    pointsContainer.innerText = `You have: ${userPoints} points`;

  // deal 5 cards to user and put in array
    for (let i = 0; i < 5; i++) {
      userHand[i] = cardDeck.pop();
      const cardElement = createCard(userHand[i]);
      cardContainer.appendChild(cardElement);
      cardElement.addEventListener('click', () => {
        userHand.indexOf()
      });
      
      cardElement.addEventListener('click', () => selectCard(i));
      // console.log(cardClick);

      cardElement.addEventListener('click', () => {
        if (cardClick[i] === true) {
          cardElement.classList.add('card-placeholder');
          cardClick[i] = false;
        } else if (cardClick[i] === false) {
          cardElement.classList.remove('card-placeholder');
          cardClick[i] = true;
        }
      });
    }

    console.log("user's hand", userHand);
    canDeal = false;
    canSwap = true;
    cardsToSwap = [];
    cardClick = [true, true, true, true, true];
    gameInfo.innerHTML = 'Click on card(s) you want to discard & click SWAP';
  }
};

// User chooses which card(s) they want to discard
const selectCard = (cardIndex) => {
  // clear cardsToSwap

  // console.log("you have selected this card")
// check current index of user's hand
  // for (let i = 0; i < userHand.length; i++) {
    
    // making sure this only runs on the card that was clicked
    // if (cardIndex === i) {
      // if (cardsToSwap.includes(i) === true) {

      if (cardsToSwap.includes(cardIndex) === true) {

        console.log("you deselected this card, it will return to your hand");
        // when user deselects card, match the i in cardstoswap and remove it 
        // filter() creates a new array that does not include the selected index
        // cardsToSwap = cardsToSwap.filter((desel) => desel !== i)
        cardsToSwap = cardsToSwap.filter((desel) => desel !== cardIndex) 
 

        // DOM MAKE THE CARD REAPPEAR

      } else {
        console.log("you selected this card to discard, it will leave your hand");
        cardsToSwap.push(cardIndex);
        // DOM MAKE THE CARD VANISH 
      }

    // }
  // }
  console.log("swap these cards: ", cardsToSwap);
  swapButton.addEventListener('click', swapCard);
}

// use cardsToSwap to remove cards from userHand
const swapCard = () => {

  // cardsToSwap[0, 1, 2] - e.g only 3 cards chosen to discard
  // cardsToSwap['3', '1', '0'] -- indexes to be replaced with in userhand
  if (canSwap === true) {
    // loop through cards to swap index 
    for (k = 0; k < cardsToSwap.length; k++) {

    // replace with new card
    userHand[cardsToSwap[k]] = cardDeck.pop();

  }
    console.log("new user hand: ", userHand)
    console.log("new user hand length: ", userHand.length);
   // REPOPULATE PLAYERS HAND ON DOM

    cardContainer.innerText = "";

    for (let i = 0; i < userHand.length; i++) {
      const cardElement = createCard(userHand[i]);
      cardContainer.appendChild(cardElement);   
    }
    canSwap = false;
    calcHandScore(userHand);
    gameInfo.innerHTML = `You ${userWin} <br> Click DEAL to try again`
  } 
};
/**
 * Calculate hand score
 * @constructor
 * @param {Array} currentHand - Array of cards
 */
const calcHandScore = (currentHand) => {
  
  if (checkRoyalFlush(currentHand) === true) {
  userWin = "royal flush";
  if (userBet === 5) {
    userPoints += 4000;
    // return userWin;
  } else {
    userPoints += (userBet * 250);
    console.log(userWin);
    // return userWin;
  } 
} else if (checkStraightFlush(currentHand) === true) {
  userWin = "got straight flush";
  userPoints += (userBet * 50);
  console.log(userWin);
  // return userWin;
} else if (checkFourKind(currentHand) === true) {
  userWin = "got four of a kind";
  userPoints += (userBet * 25);
  console.log(userWin);
  // return userWin;
} else if (checkFullHouse(currentHand) === true) {
  userWin = "got full house";
  userPoints += (userBet * 9);
  console.log(userWin);
  // return userWin;
} else if (checkFlush(currentHand) === true) {
  userWin = "got flush";
  userPoints += (userBet * 6);
  console.log(userWin);
  // return userWin;
} else if (checkStraight(currentHand) === true) {
  userWin = "got straight";
  userPoints += (userBet * 4);
  console.log(userWin);
  // return userWin;
} else if (checkThreeKind(currentHand) === true) {
  userWin = "got three of a kind";
  userPoints += (userBet * 3);
  console.log(userWin);
  // return userWin;
} else if (checkTwoPair(currentHand) === true) {
  userWin = "got two pair";
  userPoints += (userBet * 2);
  console.log(userWin);
  // return userWin;
} else if (checkJacksBetter(currentHand) === true) {
  userWin = "got jacks or better";
  userPoints += (userBet * 1);
  console.log(userWin);
  // return userWin;
} else {
  userWin = "lose (╯°□°)╯︵ ┻━┻";
  console.log(userWin);
  // return userWin;
} 
canDeal = true;
console.log('user points: ', userPoints);
pointsContainer.innerText = `You have: ${userPoints} points`;
console.log('current card deck length', cardDeck.length);
deckChecker();
bsod(userPoints);
}

// Create a helper function for output to abstract complexity
// of DOM manipulation away from game logic
const output = (message) => {
  gameInfo.innerText = message;
};

// ----------------------------------------------------------------
// GAME INITIALISATION
// ----------------------------------------------------------------

const initGame = () => {
  gameInfo.innerText = "Good " + getGreeting() + ', click DEAL to get your first hand';
  // console.log('game init');
  
  canDeal = true;

  cardDeck = shuffleCards(makeDeck());

  cardContainer.innerText = "";
  userPoints = 100;
  pointsContainer.innerText = `You have: ${userPoints} points`;

 cardContainer.appendChild(cardBack);

  if (canDeal === true) {
  dealButton.addEventListener('click', dealCards);
  };
  
};

initGame();
resetButton.addEventListener('click', () => initGame());

