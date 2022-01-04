/**
 * function to bet one credit
 */
betOneBtn.addEventListener('click', () => {
  gameContainer.innerText = '';
  gameContainer.appendChild(image0);
  gameContainer.appendChild(image1);
  gameContainer.appendChild(image2);
  gameContainer.appendChild(image3);
  gameContainer.appendChild(image4);

  if (gameMode === 'bet' || gameMode === 'deal') {
    if (betAmount < 5) {
      credits -= 1;
      betAmount += 1;
      updateCredits();
      outputContainer.innerText = 'Come on, you can bet more! 💸';
      gameMode = 'deal';
      betFiveBtn.disabled = true;
    }
    if (betAmount === 5) {
      gameMode = 'deal';
      outputContainer.innerText = "That's the way to play! Good luck! 😁";
      betOneBtn.disabled = true;
      betFiveBtn.disabled = true;
    }
  }

  // highlight the pointsBoard that corresponds to the betAmount
  let highLight0 = document.querySelector('.board0');
  let highLight1 = document.querySelector('.board1');
  let highLight2 = document.querySelector('.board2');
  let highLight3 = document.querySelector('.board3');
  let highLight4 = document.querySelector('.board4');

  switch (betAmount) {
    case 1:
      highLight0.classList.add('highLightBoard');
      break;
    case 2:
      highLight0.classList.remove('highLightBoard');
      highLight1.classList.add('highLightBoard');
      break;
    case 3:
      highLight1.classList.remove('highLightBoard');
      highLight2.classList.add('highLightBoard');
      break;
    case 4:
      highLight2.classList.remove('highLightBoard');
      highLight3.classList.add('highLightBoard');
      break;
    case 5:
      highLight3.classList.remove('highLightBoard');
      highLight4.classList.add('highLightBoard');
      break;
  }

  dealCardsBtn.disabled = false;
});

/**
 * function to bet five credits
 */
betFiveBtn.addEventListener('click', () => {
  gameContainer.innerText = '';
  gameContainer.appendChild(image0);
  gameContainer.appendChild(image1);
  gameContainer.appendChild(image2);
  gameContainer.appendChild(image3);
  gameContainer.appendChild(image4);
  if (gameMode === 'bet') {
    credits -= 5;
    betAmount = 5;
    updateCredits();
    gameMode = 'deal';
    outputContainer.innerText = 'All the best to ya boss! 😎';
  }

  let highlight4 = document.querySelector('.board4');
  highlight4.classList.add('highLightBoard');

  dealCardsBtn.disabled = false;
  betFiveBtn.disabled = true;
  betOneBtn.disabled = true;
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
      outputContainer.innerText =
        'Looks good! Click on the cards you want to hold. ✋';
    }
    // calcHandScore(userHand);
    gameMode = 'swap';
    betOneBtn.disabled = true;
    betFiveBtn.disabled = true;
    swapCardsBtn.disabled = false;
    dealCardsBtn.disabled = true;
  }
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
    // calculates credits & add them to credits
    calcPointsToAdd();
    // updates credits in HTML
    updateCredits();
    gameMode = 'bet';
  }
  betOneBtn.disabled = false;
  betFiveBtn.disabled = false;
  swapCardsBtn.disabled = true;
  dealCardsBtn.disabled = true;

  gameContainer.style.fontSize = '1.5rem';
  gameContainer.innerHTML = 'Start betting to play again!';
});
