// ========= HELPER FUNCTIONS ========= //
/** Function prints message on DOM
 * @param message
 * @returns message as text in message box on DOM
 */
const print = (message) => {
  messageBoxElement.innerHTML = message;
};

/** Funtion prints score on DOM
 * @param score
 * @returns score on DOM
*/
const printScore = () => {
  scoreBoardElement.innerHTML = score;
};

/** Function selects card and swaps it out
 * @param cardElement is the DOM element of the selected card
 * @param cardObject is the object in the hand array which feeds back to whole logic
 */
const selectCard = (cardElement, cardObject) => {
  // pinpoints index of selected card so that we can swap that specific cardObject out
  const index = hand.indexOf(cardObject);

  // canClick boolean prevents card from being clicked while flipping
  if (canClick[index] === true) {
    // flip selected card element around
    cardElement.setAttribute('src', 'card-images/card-back.png');

    // remove selected card object from hand array and deal new card in its place
    const newCard = shuffledDeck.pop();
    hand.splice(index, 1, newCard);

    // shows back of card for 0.8 seconds before showing new card
    setTimeout(() => {
      cardElement.setAttribute('src', `card-images/${newCard.image}`);
      canClick[index] = false;
    }, 800);
  }
};

/**
 * Function renders card object on DOM
 * @param card the card object that will be rendered
 * @return appends card image to DOM
*/
const makeCard = (card) => {
  const index = hand.indexOf(card);
  console.log(`index: ${index}`);
  const cardElement = document.querySelector(`#card-container-${index}`);
  cardElement.setAttribute('src', `card-images/${card.image}`);
  cardElement.setAttribute('class', 'card');

  // allow card to be flipped back when clicked
  cardElement.addEventListener('click', (event) => {
    selectCard(event.currentTarget, card);
  });
};

/** Function deals 5 cards */
const dealCards = () => {
  for (let i = 0; i < 5; i += 1) {
    hand.push(shuffledDeck.pop());
    makeCard(hand[i]); }
};

/** Function refreshes hand */
const refreshHand = () => {
  for (let i = 0; i < 5; i += 1) {
    console.log('hand popping');
    hand.pop();
  }
};

/** Function refreshes value of all elements in canClick function to true  */
const refreshCanClick = () => {
  for (let i = 0; i < canClick.length; i += 1) {
    if (canClick[i] === false) {
      canClick[i] = true;
    }
  }
};

/** Function changes portrait to signify gameover */
const changePortrait = () => {
  portraitElement.setAttribute('src', 'other-images/portrait-time-out.png');
};

/** Function flips cards to face back */
const flipCardsBack = () => {
  for (let i = 0; i < 5; i += 1) {
    const cardContainerElement = document.querySelector(`#card-container-${[i]}`);
    cardContainerElement.setAttribute('src', 'card-images/card-back.png');
  }
};

/** Function aborts game */
const abortGame = (message) => {
  flipCardsBack();
  refreshHand();
  print(message);
};

/** Function for when score is met */
const winGame = () => {
  flipCardsBack();
  refreshHand();
  print('You won! <br>A royalist helped the Queen escape and a scape goat was executed in her place.');
  portraitElement.setAttribute('src', 'other-images/portrait-win.png');
};

/** Function starts timer */
const startTimer = () => {
  const timer = setInterval(() => {
    countDownElement.innerText = timerStartSeconds;
    if (score >= 120) {
      clearInterval(timer);
    }
    else if (timerStartSeconds <= 0) {
      changePortrait();
      clearInterval(timer);
      abortGame('Time\'s up. <br>"Pardon me sir, I didn\'t mean to."');
    }
    else if (isLastRound === true) {
      clearInterval(timer);
    }
    timerStartSeconds -= 1;
  }, 1000);
};
