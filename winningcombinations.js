/* A function that goes through cardRankInHand and sorts them
 * @return true/false if hand has two pairs in it
 */
const twoPairsCombo = () => {
  let pairs = [];
  let sortedDeck = cardRankInHand.sort();
  for (i = 0; i < 5; i++) {
    if (sortedDeck[i] === sortedDeck[i + 1]) {
      pairs.push(sortedDeck[i]);
    }
  }
  if (pairs.length === 2 && pairs[0] !== pairs[1]) {
    return (twoPairs = true);
  }
};

/* A function that goes through cardNameTally to see if there are any three of the same card name and full house combos
 * @return true/false if hand has threes or full houses
 */
const threeKindsAndFullHouseCombo = () => {
  let duplicates = [];
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 3) {
      duplicates.push(cardNameTally[cardName]);
    }
    if (cardNameTally[cardName] === 2) {
      duplicates.push(cardNameTally[cardName]);
    }
    if (
      (duplicates[0] === 3 && duplicates[1] !== 2) ||
      (duplicates[1] === 3 && duplicates[0] !== 2)
    ) {
      threeKinds = true;
    }
    if (
      (duplicates[0] === 3 && duplicates[1] === 2) ||
      (duplicates[1] === 3 && duplicates[0] === 2)
    ) {
      // making threeKinds false so that it will not show both threeKinds and fullHouse true at the end
      // if this happens, it will output that threeKinds is the one won and ignoring fullHouse
      threeKinds = false;
      fullHouse = true;
    }
  }
};

/* A function that goes through cardNameTally to see if there are four of the same card name
 * @return true/false if hand has four of a kind in it
 */
const fourKindsCombo = () => {
  for (cardName in cardNameTally) {
    if (cardNameTally[cardName] === 4) {
      fourKinds = true;
    }
  }
};

/* A function that goes through cardSuitTally and cardRankInHand
 *  and sorts them. This is to see if there are card ranks that
 *  are in proper numerical order of difference 1 OR if they have
 *  the same suit OR both.
 * @return true/false if hand has said combos or not.
 */
const straightStraightFlushAndRoyalFlushCombo = () => {
  let count = 1;
  let sortedDeck = cardRankInHand.sort(function (a, b) {
    return a - b;
  });
  for (j = 0; j < 5; j++) {
    if (sortedDeck[j] + 1 === sortedDeck[j + 1]) {
      count += 1;
      if (count === 5) {
        straight = true;
      }
    }
  }
  for (cardSuit in cardSuitTally) {
    if (cardSuitTally[cardSuit] === 5) {
      flush = true;
    }
    if (count === 5 && flush === true) {
      // making straight and flush false so that it will not ignore the straightFlush being true at the end of the game
      straight = false;
      flush = false;
      straightFlush = true;
    }
  }
  for (cardName in cardNameTally) {
    if (
      "A" in cardNameTally &&
      "10" in cardNameTally &&
      "J" in cardNameTally &&
      "Q" in cardNameTally &&
      "K" in cardNameTally &&
      cardSuitTally[cardSuit] === 5
    ) {
      // making flush and straightflush false so that it will not ignore the royalflush being true at the end of the game
      flush = false;
      straightFlush = false;
      royalFlush = true;
    }
  }
};

/* A function that goes through all different combo functions to
 * see if hand has at least Jack or better in it
 * @return true/false if hand has Jack or better in it
 */
const jackOrBetterCombo = () => {
  for (cardName in cardNameTally) {
    if (
      cardName === "J" &&
      cardName === "Q" &&
      cardName === "K" &&
      cardName === "A" &&
      cardNameTally[cardName] >= 1
    ) {
      jackOrBetter = true;
      outputMessage.innerHTML = "You have Jacks or Better.";
    }
  }
};

/* A function that goes through all different combo functions to
 * see if hand has any of it
 * @param
 * @return an output message of what combination you have in hand
 */
const winningCombos = () => {
  twoPairsCombo();
  threeKindsAndFullHouseCombo();
  fourKindsCombo();
  straightStraightFlushAndRoyalFlushCombo();
  jackOrBetterCombo();
  let winningAudio = new Audio();
  winningAudio.src = "winning-audio.wav";
  let losingAudio = new Audio();
  losingAudio.src = "total-fail.wav";

  if (twoPairs === true) {
    returns = bettingMoney * 2;
    winnings = bettingMoney * 3;
    balanceAmount += winnings;
    winningAudio.play();
    outputMessage.innerHTML = `You have a Two pairs. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else if (threeKinds === true) {
    returns = bettingMoney * 3;
    winnings = bettingMoney * 4;
    balanceAmount += winnings;
    winningAudio.play();

    outputMessage.innerHTML = `You have Three of a kind. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else if (fullHouse === true) {
    returns = bettingMoney * 9;
    winnings = bettingMoney * 10;
    balanceAmount += winnings;
    winningAudio.play();

    outputMessage.innerHTML = `You have a Full House. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else if (fourKinds === true) {
    returns = bettingMoney * 25;
    winnings = bettingMoney * 26;
    balanceAmount += winnings;
    winningAudio.play();

    outputMessage.innerHTML = `You have Four of a kind. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else if (straight === true) {
    returns = bettingMoney * 4;
    winnings = bettingMoney * 5;
    balanceAmount += winnings;
    winningAudio.play();
    outputMessage.innerHTML = `You have a Straight. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else if (flush === true) {
    returns = bettingMoney * 6;
    winnings = bettingMoney * 7;
    balanceAmount += winnings;
    winningAudio.play();
    outputMessage.innerHTML = `You have a Flush. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else if (straightFlush === true) {
    returns = bettingMoney * 50;
    winnings = bettingMoney * 51;
    balanceAmount += winnings;
    winningAudio.play();
    outputMessage.innerHTML = `You have a Straight Flush. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else if (royalFlush === true) {
    returns = bettingMoney * 250;
    winnings = bettingMoney * 251;
    balanceAmount += winnings;
    winningAudio.play();
    outputMessage.innerHTML = `You have a Royal Flush. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else if (jackOrBetter === true) {
    returns = bettingMoney * 1;
    winnings = bettingMoney * 2;
    balanceAmount += winnings;
    winningAudio.play();
    outputMessage.innerHTML = `You have a Jacks or Better. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  } else {
    winnings = 0;
    balanceAmount += winnings;
    losingAudio.play();
    outputMessage.innerHTML = `You have no special combinations. <br><br>You've won $${returns}. <br><br> Your balance in hand: $${balanceAmount}`;
  }
  // ALL OF THIS BELOW IS TO RESET EVERYTHING BACK TO ITS DEFAULT STATE AFTER ROUND IS COMPLETED
  returns = 0;
  bettingMoney = 0;
  deck = shuffleCards(makeDeck());
  twoPairs = false;
  threeKinds = false;
  straight = false;
  flush = false;
  fullHouse = false;
  fourKinds = false;
  straightFlush = false;
  royalFlush = false;
  jackOrBetter = false;
};
