/** SHOW_HAND BUTTON ON DOM */

/** Function checks hand against winning conditions
 * defines score
 */
const getResults = (hand) => {
  // updates winning conditions related boolean globals
  determineWin(hand);

  // checks for win and updates score
  if (twoPairs === true) {
    print('Two pairs, double fun!');
    score += 10;
    twoPairs = false;
  } else if (twoOfAKind === true) {
    print('Two of a kind, neat!');
    score += 5;
    twoOfAKind = false;
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
  else if (flush === true && straights === true) {
    print('Straight flush, does this get any better?');
    score += 50;
  } else if (flush === true && broadway === true) {
    print('Royal flush! Amazing, you are truly a Queen');
    score += 100;
  }
  else if (flush === true) {
    print(`Flush of ${hand[0].suit}, that's grand!`);
    score += 20;
  } else if (broadway === true) {
    print('Highest straights, let them eat cake!');
    score += 20;
  } else if (straights === true) {
    print('Straights, all the way!');
    score += 20;
  } else {
    print('High card');
    score -= 10;
  }

  // reset flush, straights and broadway boolean
  if (flush === false) {
    flush = true;
  }

  if (straights === false) {
    straights = true;
  }

  if (broadway === true) {
    broadway = false;
  }
  // print score
  printScore();
  if (score >= winningScore) {
    winGame();
  }
};

resultsButtonElement.addEventListener('click', () => getResults(hand));
