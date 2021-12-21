/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/** PLAYER ACTION FUNCTION */
/** Function for when player clicks on submit button */
const playerClick = () => {
  /** if current game mode is input bet */
  if (currentGameMode === 'input bet') {
    betInputField.disabled = false;
    cardTable.innerHTML = '';
    let betInput = betInputField.value;
    /** check if bet input is valid */
    if (betInput === '' || isNaN(betInput)) {
      output('You gotta type a number!');
    } else if (betInput !== '') {
      if (betInput > credits) {
        output('You don\'t have that many credits!');
      } else if (betInput <= credits) {
        betInputField.disabled = true;
        currentGameMode = 'deal cards';
        bet = betInput;
        output(`You bet ${bet} credits. Click the 'Submit / Deal Cards' button again to deal cards!`);
      }
    }
  } else if (currentGameMode === 'deal cards') {
    deck = shuffleCards(makeDeck());
    for (let i = 0; i < 5; i += 1) {
      playerCard = deck.pop();
      playerHand.push(playerCard);
    }
    calcHandScore();
    buildCardElements(playerHand);

    output('Now click on the cards you want to redraw, and click the \'Submit / Deal Cards\' button again to redraw them!');
    currentGameMode = 'choose redraw';
  } else if (currentGameMode === 'choose redraw') {
    for (let j = 0; j < redrawIndexes.length; j += 1) {
      let redrawIndex = Number(redrawIndexes[j]);
      playerCard = deck.pop();
      playerHand.splice(redrawIndex, 1, playerCard);
    }
    calcHandScore();
    buildCardElements(playerHand);
    credits += handScore;
    creditsInfo.innerText = credits;
    if (handScore > 0) {
      output(`Congrats! You got ${winCondition}! You have ${credits} credits now. Key in a new bet amount and click 'Submit / Deal Cards' if you'd like to play again!`);
    } else {
      output(`Oh man, you didn't win anything. You have ${credits} credits left. Key in a new bet amount and click 'Submit / Deal Cards' to play again!`);
    }
    currentGameMode = 'input bet';
    playerHand = [];
    redrawIndexes = [];
    betInputField.disabled = false;
    betInputField.placeholder = 'Enter Bet Amount';
  }
};

const audioClick = () => {
  if (audioOn) {
    audio.pause();
    audioButton.innerHTML = '&#x1F508';
    audioOn = false;
  } else if (!audioOn) {
    audio.play();
    audioButton.innerHTML = '&#x1F50A';
    audioOn = true;
  }
};

/** GAME INITIALISATION */
const initGame = () => {
  /** Display welcome message */
  output('Welcome! Start by setting a bet amount!');

  /** Append all the elements */
  gameHeader.appendChild(audioButton);
  gameHeader.appendChild(gameTitle);
  gameHeader.appendChild(pokerCardsGif);
  document.body.appendChild(gameHeader);

  document.body.appendChild(gameInfo);

  document.body.appendChild(gameBody);
  createTable(winningInfoArr, winningInfoTable);
  gameBody.appendChild(winningInfoTable);
  gameBody.appendChild(cardTable);

  gameFooter1.appendChild(creditsText);
  gameFooter1.appendChild(creditsInfo);

  gameFooter2.appendChild(betText);
  gameFooter2.appendChild(betInputField);
  gameFooter2.appendChild(submitButton);

  gameFooter.appendChild(gameFooter1);
  gameFooter.appendChild(gameFooter2);

  document.body.appendChild(gameFooter);

  /** Add event listener to submit button for player to click and play :) */
  audioButton.addEventListener('click', audioClick);
  submitButton.addEventListener('click', playerClick);
};

initGame();
