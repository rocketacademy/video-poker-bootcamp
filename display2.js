/* ====================== */
/* ---- GAME DISPLAY ---- */
/* ====================== */

const tableEl = document.getElementById('tableEl');

const displayScore = document.getElementById('scoreBanner');
displayScore.innerText = `${plyr1Pts} pts`;

/* FN: PUT USER CLICKED CARDS ON HOLD */
const applyHoldLabel = (cardImage) => {
  const idOfPic = cardImage.id;
  if(idOfPic === 'pic0') {
    idOfCardHolder = 0;
  } else if (idOfPic === 'pic1') {
    idOfCardHolder = 1;
  } else if (idOfPic === 'pic2') {
    idOfCardHolder = 2;
  } else if (idOfPic === 'pic3') {
    idOfCardHolder = 3;
  } else if (idOfPic === 'pic4') {
    idOfCardHolder = 4;
  }

  const cardHolderEl = document.getElementById(`${idOfCardHolder}`);
  if (plyr1Hand[idOfCardHolder].hold === false) {
    cardImage.classList.add('fadeOut');
    cardHolderEl.classList.add('holdLabel');
    plyr1Hand[idOfCardHolder].hold = true;
  }
};

/* FN: REMOVE HOLD LABEL VIA JS */
const removeHoldLabel = (hand) => {
  for (let i = 0; i < hand.length; i += 1) {
    if (plyr1Hand[i].hold === true) {
      const cardHolderEl = document.getElementById(`${i}`);
      cardHolderEl.classList.remove('holdLabel');

      const cardImage = document.getElementById(`pic${i}`);
      cardImage.classList.remove('fadeOut');
      plyr1Hand[i].hold = false;
    }
  }
  return;
};

/*  Mini FN: cover up cards that need to be swapped */
const foldCards = (hand) => {
  /* read the hand to get which cards will be discarded */
  for (let i = 0; i < hand.length; i += 1) {
    if (hand[i].hold === false) {
      discardIndexArr.push(i);
    }
  }
  /* console.log ('Card Indexes to discard = ', discardIndexArr); */
  for (let j = 0; j < discardIndexArr.length; j += 1) {
    const discardPicIndex = `pic${discardIndexArr[j]}`;
    const discardPic = document.getElementById(discardPicIndex);

    const disContainerIndex = `${discardIndexArr[j]}`;
    const disContainer = document.getElementById(disContainerIndex);

    disContainer.classList.add('showBack');
    discardPic.classList.add('none');
  }
};

/* Mini- FN: SWAP CARD and turn over the covered card */
const swapCard = () => {
/* load new cards into discard pile */
  const discardPile = [];
  for (let i = 0; i < discardIndexArr.length; i += 1) {
    discardPile.push(shuffledDeck.pop());
  }
  /* console.log ('discard Pile =', discardPile); */
  /* Below code: get card position indexes that need swapping from */
  /* discardArray and get their elements by id */
  for (let j = 0; j < discardIndexArr.length; j += 1) {
    const discardPicIndex = `pic${discardIndexArr[j]}`;
    const discardPic = document.getElementById(discardPicIndex);

    const disContainerIndex = `${discardIndexArr[j]}`;
    console.log('Loop Number, j = ', j);
    console.log('disContainerIndex =', disContainerIndex);
    const disContainer = document.getElementById(disContainerIndex);

    /* expunge cardImage element from the selected cardHolder */
    disContainer.removeChild(discardPic);
    /* carry out the swap function for the plyr1Hand array */
    /*    plyr1Hand[disContainerIndex] = shuffledDeck.pop(); */
    const newCard = discardPile[j];
    const oldCard = plyr1Hand[disContainerIndex];
    plyr1Hand[disContainerIndex] = newCard;
    discardPile[j] = oldCard;
    console.log('discard Pile =', discardPile);

    /* based on new cardIndo, establish new CardImage in this */
    /* container per j */
    const cardImage = new Image(); /* 157, 220 */
    cardImage.classList.add('cardImg');
    cardImage.setAttribute('id', `pic${disContainerIndex}`);
    cardImage.src = './images/' + plyr1Hand[disContainerIndex].suit + '-' + plyr1Hand[disContainerIndex].rank + '.png';
    disContainer.appendChild(cardImage);
  }
return;
};

/* FN: REMOVE HOLD BANNER AND SHOW HELD CARDS AGAIN */
/* plyr1Hand index is the same as cardContainerIndex */
const unHoldCards = (hand) => {
  for (let i = 0; i < hand.length; i += 1) {
    if(hand[i].hold === true) {
      const cardHolder = document.getElementById(`${i}`);
      cardHolder.classList.remove('holdLabel');
      const cardImage = document.getElementById(`pic${i}`);
      cardImage.classList.remove('fadeOut');
      cardImage.classList.add('cardImg');
    }
  }

  /* after swap is completed, reset all cardInfo FOLD states to FALSE */
  for (let j = 0; j < hand.length; j += 1) {
    plyr1Hand[j].hold = false;
  }
};
/* USER SHOULD STILL BE ABLE TO UN-HOLD CARDS AFTER HE/SHE HOLDs ON THEM TO MAKE CORRECTIONS */

/* FN: DEAL 5 CARDS TO SPECIFIED HAND */
const deal5Cards = () => {
  const prefix = './images/';

  /* This is for the start of the game */
  /* use game states to lock this part step 1 = 5 cards */
  if (gameState === 0) {
    for (let i = 0; i < handSize; i += 1) {
      plyr1Hand.push(shuffledDeck.pop());
      cardHolder = document.createElement('div');
      cardHolder.classList.add('cardHolder');
      cardHolder.setAttribute('id', `${i}`);
      tableEl.appendChild(cardHolder);

      const cardImage = new Image(157, 220); /* 157, 220 */
      cardImage.classList.add('cardImg');
      cardImage.setAttribute('id', `pic${i}`);
      cardImage.src = prefix + plyr1Hand[i].suit + "-" + plyr1Hand[i].rank + ".png";
      cardImage.addEventListener('click', (event) => {
        applyHoldLabel(event.currentTarget);
      });
      cardHolder.appendChild(cardImage);
    }
    gameState = 1;
    output("1) Click Card: HOLD. 2) Input Bid amount, press 'BID' to submit.");
  }
  return;
};
