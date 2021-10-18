/** DEAL_CARDS BUTTON ON DOM */

/** Function starts or refresh round everytime dealButtonElement is clicked */
const startOrRefreshRound = () => {
// clear message in messageBoxElement
  print('');
  if (isLastRound === true) {
    changePortrait();
    abortGame('You\'ve ran out of cards.<br> "Pardon me sir, I didn\'t mean to." ');
  } else {
    // if first round, start timer
    if (isTimerOn === false) {
      startTimer();
      isTimerOn = true;
    }

    // if there are only 10 cards or less left in deck, indicate that it's the last round
    if (shuffledDeck.length <= 10) {
      isLastRound = true;
      print('Final round, your deck is running out');
    }

    // not the first round
    if (hand.length !== 0) {
      refreshHand();
      dealCards();
      refreshCanClick(); }
    // first round
    else if (hand.length === 0) {
      dealCards();
    } }
};

/** Deal button element */
dealButtonElement.addEventListener('click', () => startOrRefreshRound());

/** SHOW_CARD BUTTON */
