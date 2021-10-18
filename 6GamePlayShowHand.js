/** SHOW_HAND BUTTON ON DOM */

/** Function checks hand against winning conditions
 * defines score
 */
const getResults = (hand) => {
  // updates winning conditions related boolean globals
  determineWin(hand);

  // checks for win and updates score
  if (twoPairs === true) {
    print('Two pairs, double trouble!');
    score += 30;
    twoPairs = false;
  } else if (twoOfAKind === true) {
    print('Two of a kind, all the treasures you find!');
    score += 20;
    twoOfAKind = false;
  } else if (fullHouse === true) {
    print('Full house, merry merry joy and sherry!');
    score += 40;
    fullHouse = false;
  }
  else if (threeOfAKind === true) {
    print('Three of a kind, grind grind grind!');
    score += 30;
    threeOfAKind = false;
  } else if (fourOfAKind === true) {
    print('Four of a kind, a little more till you unwind!');
    score += 40;
    fourOfAKind = false;
  }
  else if (flush === true && straights === true) {
    print('Straight flush, are you feeling that adrenaline rush?');
    score += 50;
  } else if (flush === true && broadway === true) {
    print('Royal flush! Amazing, you are truly a Queen, enemies before you crumple and crush');
    score += 100;
  }
  else if (flush === true) {
    print(`Flush of ${hand[0].suit}, that's grand!`);
    score += 40;
  } else if (broadway === true) {
    print('Broadway, clear the path before the Queen of France slay!');
    score += 50;
  } else if (straights === true) {
    print('Straight, may the storm abate!');
    score += 40;
  } else {
    print('Nothing in the cards, beware, too much nought will bring distraught! ');
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
