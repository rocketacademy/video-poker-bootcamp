/* -------------------------------------------------------------------------- */
/*                                create result                               */
/* -------------------------------------------------------------------------- */

/* ------------------------------ game message function ------------------------------ */
const createOutput = (message) => {
  // create message element
  const output = document.createElement('div');
  // add class to message element
  output.classList.add('output');
  // input message into message element
  output.innerHTML = message;
  // append message to output container
  outputContainer.appendChild(output);
};

/* ------------------------- create betting function ------------------------ */
const enterBet = () => {
  // create bet one button
  betOne = document.createElement('button');
  // add class list to bet one button
  betOne.classList.add('bet-one', 'buttons');
  // insert text into bet one button
  betOne.innerHTML = 'Bet One';

  // add click function for bet one button
  betOne.addEventListener('click', () => {
    buttonSounds.play();
    if (bettingMode === true) {
    // push single point bet into player bet array
      playerBet.push(1);
      // update bet screen
      bet.innerHTML = `Bet: ${playerBet[playerBet.length - 1]}`;
      // minus bet amount from player points
      playerPoints -= 1;
      // update player points screen
      points.innerHTML = `Credits: ${playerPoints}`;
      console.log(`player bet ${playerBet}`);
      // change betting mode
      bettingMode = false;
      // change deal mode
      dealMode = true;

      // select the deal button class
      const showDealButton = document.querySelector('.deal-button');
      // change the display to visible
      showDealButton.style.display = 'initial';

      // change the display to none for both betting buttons
      betMax.style.display = 'none';
      betOne.style.display = 'none';
    }

    // reset hand after each round
    if (dealMode === true && bettingMode === false) {
      resetHand();
      console.log('reset hand');
    }
  });

  // append bet one button into points container
  buttonContainer.appendChild(betOne);

  // create bet max button
  betMax = document.createElement('button');
  // add class list to bet max button
  betMax.classList.add('bet-max', 'buttons');
  // insert text into bet max button
  betMax.innerHTML = 'Bet Max';

  // add click function for bet max button
  betMax.addEventListener('click', () => {
    buttonSounds.play();
    if (bettingMode === true) {
    // push 5 points bet into player bet array
      playerBet.push(5);
      // update bet screen
      bet.innerHTML = `Bet: ${playerBet[playerBet.length - 1]}`;
      // minus bet amount from player points
      playerPoints -= 5;
      // update player points screen
      points.innerHTML = `Credits: ${playerPoints}`;
      console.log(`player bet ${playerBet}`);
      bettingMode = false;
      dealMode = true;

      // select the deal button class
      const showDealButton = document.querySelector('.deal-button');
      // change the display to visible
      showDealButton.style.display = 'initial';

      // change the display to none for both betting buttons
      betMax.style.display = 'none';
      betOne.style.display = 'none';
    }

    // reset hand after each round
    if (dealMode === true && bettingMode === false) {
      resetHand();
      console.log('reset hand');
    }
  });

  // append bet max button into points container
  buttonContainer.appendChild(betMax);

  // create bet amount element
  bet = document.createElement('div');
  // add class list to bet amount element
  bet.classList.add('bet');
  // add text into bet element
  bet.innerHTML = 'Bet:';
  // append bet element to points container
  pointsContainer.appendChild(bet);

  // create points element
  points = document.createElement('div');
  // add class list to points element
  points.classList.add('points');
  // show initial amount of points
  points.innerHTML = `Credits: ${playerPoints}`;
  // append points amounts into points container
  pointsContainer.appendChild(points);
};

/* --------------------------- create deal button --------------------------- */
const createDealButton = () => {
  // create deal button element
  const dealButton = document.createElement('button');
  // add class name to deal button
  dealButton.classList.add('deal-button', 'buttons');
  // add text to the deal button
  dealButton.innerHTML = 'DEAL';

  // add event listener to the deal button
  dealButton.addEventListener('click', () => {
    // play button sound
    buttonSounds.play();
    // deal the hand if conditions are met
    if (clicked === false && bettingMode === false && dealMode === true) {
      // change game mode status
      clicked = true;
      holdMode = true;
      // deal hand
      gamePlay();

      // select the keep button class name
      const showKeepButton = document.querySelector('.keep-button');
      // show the keep button
      showKeepButton.style.display = 'initial';

      // hide the deal button
      dealButton.style.display = 'none';
    }
  });

  // append the deal button to the button container
  buttonContainer.appendChild(dealButton);

  // during betting mode hide the deal button
  if (bettingMode === true) {
    dealButton.style.display = 'none';
  }
};

/* --------------------------- create keep button --------------------------- */
const createKeepButton = () => {
  // create keep button element
  const keepButton = document.createElement('button');
  // add class names to keep button
  keepButton.classList.add('keep-button', 'buttons');
  // add text to keep button
  keepButton.innerHTML = 'KEEP';
  // append the keep button to the button container
  buttonContainer.appendChild(keepButton);

  // add event listener to the keep button
  keepButton.addEventListener('click', () => {
    // play button sound
    buttonSounds.play();

    // keep cards if conditions are met
    if (clicked === true && bettingMode === false && holdMode === true) {
      // select the card element
      const allCard = document.querySelectorAll('.card');
      console.log(allCard);
      // draw new cards for those cards not selected
      playerHand.forEach((card, i) => {
        if (selectedCards.includes(card) === false) { playerHand.splice(i, 1, deck.pop()); }
      });

      // remove the previous drawn cards
      const clearCard = document.getElementsByClassName('card');
      while (clearCard.length > 0) {
        clearCard[0].parentNode.removeChild(clearCard[0]);
      }

      console.log(playerHand.length);
      // check if any of the win conditions are met
      calcHandScore();

      // for each of the new cards drawn create a new card image
      playerHand.forEach((card) => {
      // create card image
        const cardImage = document.createElement('img');
        cardImage.classList.add('card-image');
        cardImage.src = getCardImg(card);

        // create a card image container
        const cardImgHolder = document.createElement('div');
        cardImgHolder.classList.add('card');
        // append card image to card image
        cardImgHolder.appendChild(cardImage);
        // append card image holder to card container
        cardContainer.appendChild(cardImgHolder);
        console.log(cardContainer);
      });
      // change game mode
      clicked = false;
      holdMode = false;
      bettingMode = true;

      // hide the keep button
      keepButton.style.display = 'none';

      // show the betting buttons
      const showBetMax = document.querySelector('.bet-max');
      showBetMax.style.display = 'initial';
      const showBetOne = document.querySelector('.bet-one');
      showBetOne.style.display = 'initial';

      // clear all the hold status on the card images
      const clearHoldStatus = document.getElementsByClassName('hold-status');
      while (clearHoldStatus.length > 0) {
        clearHoldStatus[0].parentNode.removeChild(clearHoldStatus[0]);
        console.log('hold status');
      }
    }
  });

  // during betting mode hide the keep button
  if (bettingMode === true) {
    keepButton.style.display = 'none';
  }
};

/* --------------------------- deal hand function --------------------------- */
const dealHand = () => {
  const clearCard = document.getElementsByClassName('card');
  while (clearCard.length > 0) {
    clearCard[0].parentNode.removeChild(clearCard[0]);
  }

  for (let i = 0; i < 5; i += 1) {
    const card = deck.pop();
    playerHand.push(card);

    // create hold status display
    const holdStatusMessage = document.createElement('div');
    holdStatusMessage.classList.add('hold-status');

    // create card image
    const cardImage = document.createElement('img');
    cardImage.classList.add('card-image');
    cardImage.src = getCardImg(card);

    // create a card image container
    const cardImgHolder = document.createElement('div');
    cardImgHolder.classList.add('card');
    // append hold status to card image holder
    cardImgHolder.appendChild(holdStatusMessage);
    // append card image to card image
    cardImgHolder.appendChild(cardImage);
    // append card image holder to card container
    cardContainer.appendChild(cardImgHolder);

    // add event listener to card image holder to enable selection of cards to keep
    // eslint-disable-next-line no-loop-func
    cardImgHolder.addEventListener('click', () => {
      // play card select sounds
      cardSelectSounds.play();
      // if hold status is false change to true and display hold in text
      if (holdStatus === false) {
        holdStatus = true;
        holdStatusMessage.innerHTML = 'Hold';
        // else change back to false and remove hold text
      } else {
        holdStatus = false;
        holdStatusMessage.innerHTML = '';
      }
      // push selected cards to new array
      selectedCards.push(card);
      console.log(selectedCards);
      console.log(`hold status ${holdStatus}`);
    });
  }
  console.log(playerHand);
};

/* ----------------------------- reset hand function ----------------------------- */
const resetHand = () => {
  // clear all card images
  const clearCard = document.getElementsByClassName('card');
  while (clearCard.length > 0) {
    clearCard[0].parentNode.removeChild(clearCard[0]);
  }

  // clear game messages
  const clearOutput = document.getElementsByClassName('output');
  while (clearOutput.length > 0) {
    clearOutput[0].parentNode.removeChild(clearOutput[0]);
  }

  // clear player hand array
  playerHand = [];

  // clear selected cards array
  selectedCards = [];

  // clear tallies
  cardRankTally = {};
  cardSuitTally = {};

  // add cover cards
  coverCard();

  // disable coin falling display if turned on
  if (win === true) {
    gimmick('body');
    win = false;
  }
};

/* ------------------------------ player tally ------------------------------ */
const playerCardRankTally = () => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardRank = playerHand[i].rank;
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    }

    else {
      cardRankTally[cardRank] = 1;
    }
    console.log(`[Rank] There are ${cardRankTally[cardRank]} ${cardRank} in the player hand`);
  }
};

const playerCardSuitTally = () => {
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardSuit = playerHand[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }

    else {
      cardSuitTally[cardSuit] = 1;
    }
    console.log(`[Suit] There are ${cardSuitTally[cardSuit]} ${cardSuit} in the player hand`);
  }
};

/* ------------------------------- check hands from card tally ------------------------------ */
// one pair
const checkPair = () => {
  let numPairs = 0;

  Object.values(cardRankTally).forEach((value) => { if (value === 2) {
    numPairs += 1;
  } });

  if (numPairs === 1) {
    onePair = true;
  }

  return numPairs;
};

// high card
const checkHighCard = () => {
  const jackHigh = Object.keys(cardRankTally).includes('11');
  const queenHigh = Object.keys(cardRankTally).includes('12');
  const kingHigh = Object.keys(cardRankTally).includes('13');

  if ((jackHigh || queenHigh || kingHigh) && checkPair() === 0) {
    highCard = true;
    return 1;
  }
  return 0;
};

// two pair
const checkTwoPair = () => {
  if (checkPair(cardRankTally) === 2) {
    twoPair = true;
    return 2;
  }
  return 0;
};

// three of a kind
const checkThreeOfAKind = () => {
  if (Object.values(cardRankTally).includes(3)) {
    threeOfAKind = true;
    return 3;
  }
  return 0;
};

// straight
const checkStraight = () => {
  let straightCounter = 0;
  const sortTally = Object.keys(cardRankTally);
  sortTally.sort((a, b) => a - b);

  for (let i = 1; i < sortTally.length; i += 1) {
    const currentRank = Number(sortTally[i]);
    const previousRank = Number(sortTally[i - 1]);
    if (currentRank === (previousRank + 1)) {
      straightCounter += 1;
    }
  }
  console.log(straightCounter);
  console.log(cardRankTally);

  if (straightCounter === 4) {
    straight = true;
    console.log(cardRankTally);
    return 4;
  }

  // check ace high straight
  if (straightCounter === 3 && sortTally[0] === 1 && sortTally[1] === 10) {
    aceHigh = true;
    return 4;
  }
  return 0;
};

// flush
const checkFlush = () => {
  if (Object.values(cardSuitTally).includes(5)) {
    flush = true;
    return 5;
  }
  return 0;
};

// full house
const checkFullHouse = () => {
  if (checkThreeOfAKind(cardRankTally) !== 0 && checkPair(cardRankTally) === 1) {
    fullHouse = true;
    return 6;
  }
  return 0;
};

// four of a kind
const checkFourOfAKind = () => {
  if (Object.values(cardRankTally).includes(4)) {
    fourOfAKind = true;
    return 10;
  }
  return 0;
};

// straight flush
const checkStraightFlush = () => {
  if (checkStraight(cardRankTally) !== 0 && checkFlush(cardSuitTally) !== 0) {
    straightFlush = true;
    return 20;
  }
  return 0;
};

// royal flush
const checkRoyalFlush = () => {
  if (checkStraightFlush(cardRankTally, cardSuitTally) !== 0 && aceHigh === true) {
    royalFlush = true;
    return 30;
  }
  return 0;
};

// five of a kind
const checkFiveOfAKind = () => {
  if ((Object.values(cardRankTally)).includes(4) && Object.keys(cardRankTally).includes('0')) {
    fiveOfAKind = true;
    return 50;
  }
  return 0;
};

/* ------------------------------ create result message ----------------------------- */
const createResult = () => {
  // check if the winning conditions are met
  if (fiveOfAKind === true) {
    // if met, create a winning message
    createOutput('Five Of A Kind');
    // make coins fall across the screen
    gimmick('body');
    // update player points according the bet size and multiplier
    playerPoints += playerBet[playerBet.length - 1] * multipliers[0];
    // update the points display
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    // change the win status
    fiveOfAKind = false;
    win = true;
  } else if (royalFlush === true) {
    createOutput('Royal Flush');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[1];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    royalFlush = false;
    win = true;
  } else if (straightFlush === true) {
    createOutput('Straight Flush');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[2];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    straightFlush = false;
    win = true;
  } else if (fourOfAKind === true) {
    createOutput('Four Of A Kind');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[3];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    fourOfAKind = false;
    win = true;
  } else if (fullHouse === true) {
    createOutput('Full House');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[4];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    fullHouse = false;
    win = true;
  } else if (flush === true) {
    createOutput('Flush');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[5];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    flush = false;
    win = true;
  } else if (straight === true) {
    createOutput('Straight');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[6];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    straight = false;
    win = true;
  } else if (threeOfAKind === true) {
    createOutput('Three Of A Kind');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[7];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    threeOfAKind = false;
    win = true;
  } else if (twoPair === true) {
    createOutput('Two Pair');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[8];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    twoPair = false;
    win = true;
  } else if (onePair === true) {
    createOutput('One Pair');
    gimmick('body');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[9];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    onePair = false;
    win = true;
  } else if (highCard === true) {
    createOutput('High Card');
    playerPoints += playerBet[playerBet.length - 1] * multipliers[10];
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
    highCard = false;
  } else { createOutput('Nothing');
    points.innerHTML = `Credits: ${playerPoints}`;
    console.log(`player points ${playerPoints}`);
  }
};