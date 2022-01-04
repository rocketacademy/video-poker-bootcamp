/* -------------------------- calculate hand score -------------------------- */
const calcHandScore = () => {
  // run play card rank tally
  playerCardRankTally();
  // run play card suit tally
  playerCardSuitTally();

  // check winning conditions
  checkFiveOfAKind();
  checkRoyalFlush();
  checkStraightFlush();
  checkFlush();
  checkStraight();
  checkFullHouse();
  checkFourOfAKind();
  checkThreeOfAKind();
  checkTwoPair();
  checkPair();
  checkHighCard();

  // create results
  createResult();
};

/* ------------------------ initiate the game function ----------------------- */
const gamePlay = () => {
  // show cover cards
  if (clicked === false) {
    coverCard();
    // deal cards
  } else if (clicked === true) {
    dealHand();
  }
};

/* -------------------------------------------------------------------------- */
/*                        main function to execute game                       */
/* -------------------------------------------------------------------------- */
const gameInit = () => {
  // build over game UI
  buildBoard();
  // initiate game
  gamePlay();
  // add game background music
  playMusic();
  // enable betting
  enterBet();
  // enable to draw cards
  createDealButton();
  // enable to keep cards and check results
  createKeepButton();
};

// start game
gameInit();