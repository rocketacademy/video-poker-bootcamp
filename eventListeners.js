/**
 * function to bet one credit
 */
betOneBtn.addEventListener('click', () => {
  if (gameMode === 'bet') {
    credits -= 1;
    betAmount += 1;
    updateCredits();
    if (betAmount >= 5) {
      gameMode = 'deal';
    }
  }
});

/**
 * function to bet five credits
 */
betFiveBtn.addEventListener('click', () => {
  if (gameMode === 'bet') {
    credits -= 5;
    betAmount += 5;
    updateCredits();
    gameMode = 'deal';
  }
});

/**
 * function to create a button to deal shuffled cards
 * also displays cards in gameContainer
 */
dealCardsBtn.addEventListener('click', () => {
  if (gameMode === 'deal') {
    // empties user hand array
    userHand = [];

    gameContainer.innerText = '';
    for (let i = 0; i < 5; i += 1) {
      const card = deck.pop();
      card.holdStatus = false;
      userHand.push(card);

      console.log(`${userHand[i].name} of ${userHand[i].suit} dealt`);
      const cardEl = makeCard(userHand[i]);

      // adds the index of the card to saved card array on 1st click
      let clickedTimes = 0;
      cardEl.addEventListener('click', () => {
        cardEl.classList.toggle('clicked');
        console.log(`cardname: ${card.name}`);

        if (clickedTimes % 2 === 0) {
          // console.log('clickedTimes = 0');
          card.holdStatus = true;
          // removes index of card from array on 2nd click
        } else if (clickedTimes % 2 === 1) {
          card.holdStatus = false;
          // console.log('clickedTimes = 1');
        }
        clickedTimes += 1;
      });
      gameContainer.appendChild(cardEl);
    }
    calcHandScore(userHand);
  }
  gameMode = 'swap';
});

/**
 * function to swap cards that are not under holdStatus true
 */
swapCardsBtn.addEventListener('click', () => {
  if (gameMode === 'swap') {
    // saves cards on 'hold' status to an array
    savedCardsArray = userHand.filter((x) => x.holdStatus === true);
    console.log(savedCardsArray);
    const amtOfCardsToFillHand = 5 - savedCardsArray.length;
    console.log(`amt of cards needed = ${amtOfCardsToFillHand}`);
    // add x amt of cards into saved hand array to make it 5
    for (let i = 0; i < amtOfCardsToFillHand; i += 1) {
      const newCard = deck.pop();
      savedCardsArray.push(newCard);
    }
    // makeCards this new array and deal
    gameContainer.innerText = '';
    for (let i = 0; i < savedCardsArray.length; i += 1) {
      const card = savedCardsArray[i];
      const cardEl = makeCard(card);
      gameContainer.appendChild(cardEl);
    }
    // calculate the score of this card
    calcHandScore(savedCardsArray);
    // empties savedCardsArray
    savedCardsArray = [];
  }
});
