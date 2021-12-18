/**
 * Calculates the total points won
 * @returns pointsWon as a number
 */
const calcPointsWon = () => {
  pointsWon = currentBet * handScore;
  return pointsWon;
};
/**
 * Adds the points won into gameScore
 * @returns gameScore as a number
 */
const addPoints = () => {
  gameScore += calcPointsWon();
  return gameScore;
};
/**
 * Display the winning message based on the handscore
 * @returns output, betOuput as string
 */
const displayGameResult = () => {
  if (handScore === 800) {
    winSoundEffect();
    output('You Win! You got a Royal Flush!');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  } if (handScore === 50) {
    winSoundEffect();
    output('You Win! You got a Straight Flush!');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  } if (handScore === 6) {
    winSoundEffect();
    output('You Win! You got a Flush!');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  } if (handScore === 25) {
    winSoundEffect();
    output('You Win! You got a Four of a Kind!');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  } if (handScore === 3) {
    winSoundEffect();
    output('You Win! You got Three of a Kind!');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  } if (handScore === 9) {
    winSoundEffect();
    output('You Win! You got a Full House!');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  } if (handScore === 2) {
    winSoundEffect();
    output('You Win! You got a Two Pair!');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  } if (handScore === 4) {
    winSoundEffect();
    output('You Win! You got a Straight');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  } if (handScore === 1) {
    winSoundEffect();
    output('You Win! You got Jacks or Better');
    betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
    return (output, betOutput);
  }
  loseSoundEffect();
  output('You Lose!');
  betOutput(`You have ${gameScore} Coins! You won ${pointsWon} coins`);
  return (output, betOutput);
};
/**
 * Adds the clicked card into cardsToSwap array
 * @param {object} cardElement - div with the image of the card
 * @param {array} cardToSwap - array with the cards clicked
 */
const cardClick = (cardElement, cardToSwap) => {
  if (canSwap === true) {
    let isCardPresent = false;
    if (cardsToSwap.length > 0) {
      for (let j = 0; j < cardsToSwap.length; j += 1) {
        if (cardToSwap === cardsToSwap[j]) {
        // if the card is present, remove it from array
          isCardPresent = true;
          cardsToSwap.splice(j, 1); // remove it from array
          j -= 1; // account for the decrease in array length
        }
      }
    }
    cardElement.classList.toggle('cardSwap');
    // if there is no card in cards to swap array, push it into the cardsToSwap array
    if (isCardPresent === false) {
      cardsToSwap.push(cardToSwap);
    }
  }
};
/**
 * Deals 5 cards from the deck, when user clicks on a card, it will append the card into array, cardsToSwap
 */
const dealHand = () => {
  if (canDeal === true) {
    output('Deal Hand! Select Which Cards to Swap!');
    console.log(`${gameMode}`);
    flipEffect();
    if (currentBet >= 1 && gameMode === 'deal_Hand') {
      for (let i = 0; i < maxPlayerHand; i += 1) {
        playerHand.push(deck.pop());
        const cardElement = createCard(playerHand[i]);
        const cardToSwap = playerHand[i];
        cardElement.addEventListener('click', (event) => {
          // if (canDeal === true) {
          cardClick(event.currentTarget, cardToSwap);
          // }
        });
        playerdiv.appendChild(cardElement);
      }
    }
  }
  canDeal = false;
  canSwap = true;
  gameMode = 'swap_Cards';
};
/**
 * Reinitalise the game
 */
const reinitGame = () => {
  canDeal = false;
  playerHand = [];
  currentBet = 0;
  playerdiv.innerHTML = '';
  gameMode = 'place_bets';
  clearTally(rankTally);
  clearTally(suitTally);
  scoreContainer.innerText = `${gameScore}`;
  output('Place Your Bets');
  betOutput(`You have ${gameScore} Coins! Your Bet is ${currentBet}`);
};
/**
 * Swaps the card user has selected. It will then clear
 * all the cards in playerdiv and draws the rest of the
 * cards and appends them in playerdiv
 */
const swapCards = () => {
  if (canSwap === true && gameMode === 'swap_Cards') {
    output('Pick Which Cards to Swap!');
    for (let i = 0; i < playerHand.length; i += 1) {
      for (let j = 0; j < cardsToSwap.length; j += 1) {
        if (cardsToSwap[j].rank === playerHand[i].rank
        && cardsToSwap[j].suit === playerHand[i].suit) {
          playerHand.splice(i, 1, deck.pop());
        }
      }
    }
  
    cardsToSwap = [];

    playerdiv.innerHTML = '';
    flipEffect();
    for (let i = 0; i < playerHand.length; i += 1) {
      const cardElement = createCard(playerHand[i]);
      playerdiv.appendChild(cardElement);
    }
    tallyHand(playerHand);
    calcHandScore(rankTally, suitTally);
    addPoints();
    displayGameResult();
    setTimeout(() => {
      reinitGame();
    }, 6000);
  }
  canSwap = false;
};
/**
 * Increments 1 to current bet and deducts from gameScore
 */
const betOne = () => {
  if (gameMode === 'place_bets') {
    insertCoinEffect();
    gameScore -= 1;
    currentBet += 1;
  }
  scoreContainer.innerText = `${gameScore}`;
  betOutput(`You have ${gameScore} Coins! Your Bet is ${currentBet}`);
  gameMode = 'deal_Hand';
  canDeal = true;
};
/**
 * Increments 5 to current bet and deducts from gameScore
 */
const betFive = () => {
  if (gameMode === 'place_bets') {
    insertCoinEffect();
    gameScore -= 5;
    currentBet += 5;
  }
  scoreContainer.innerText = `${gameScore}`;
  betOutput(`You have ${gameScore} Coins! Your Bet is ${currentBet}`);
  gameMode = 'deal_Hand';
  canDeal = true;
};

dealBtn.addEventListener('click', dealHand);
swapBtn.addEventListener('click', swapCards);
bet1Btn.addEventListener('click', betOne);
bet5Btn.addEventListener('click', betFive);
