/** Function prints message on DOM
 * @param message
 * @returns message as text in message box on DOM
 */
const print = (message) => {
  messageBox.innerHTML = message;
};

/** Funtion prints score on DOM
 * @param score
 * @returns score on DOM
*/
const printScore = () => {
  scoreBoard.innerHTML = score;
};

/** Function checks hand against winning conditions
 * defines score
 */
const getResults = (hand) => {
  determineWin(hand);

  if (twoOfAKind === true) {
    print('Two of a kind, neat!');
    score += 5;
    twoOfAKind = false;
  } else if (twoPairs === true) {
    print('Two pairs, double fun!');
    score += 10;
    twoPairs = false;
  }
  else if (threeOfAKind === true) {
    print('Three of a kind, nice one!');
    score += 15;
    threeOfAKind = false;
  } else if (fourOfAKind === true) {
    print('Four of a kind, amazing!');
    score += 20;
    fourOfAKind = false;
  }
  else if (flush === true) {
    print(`Flush of ${hand[0].suit}, that's grand!`);
    score += 20;
  } else if (straights === true) {
    print('Straights, all the way!');
    score += 20;
  } else if (flush === true && straights === true) {
    print('Straight flush, does this get any better?');
    score += 50;
  } else {
    print('High card');
    score -= 20;
  }
  printScore();
};

resultsButton.addEventListener('click', () => getResults(hand));
