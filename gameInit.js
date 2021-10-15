/** game init */
const initGame = () => {
  if (isTimerOn === false) {
    startTimer();
    isTimerOn = true;
  }
  if (hand.length !== 0) {
    refreshHand();
    dealCards();
    refreshCanClick(); }
  else if (hand.length === 0) {
    dealCards();
  }
  console.log(hand);
};

/** deal button */
dealButton.addEventListener('click', () => initGame());
