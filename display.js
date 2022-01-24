/* ======================
 * ---DISPLAY---
 * ====================== */


/* 1) Generate background
 * 2) Generate table
 * 2B) Generate message board
 * 2C) Generate buttons
 * 2D) Generate card container*/  


let idOfCard;
let cardHolder;

/* ============================ ENVIRONMENT 
 ========================================== */
const wrapper = document.createElement('div');
wrapper.innerText = '';
wrapper.classList.add('wrapper');
document.body.appendChild(wrapper);

const tableEl = document.createElement('div');
tableEl.innerText = '';
tableEl.classList.add('table');
wrapper.appendChild(tableEl);

/* ============================ CARD CONTAINER
 ========================================== */



/* ================================ BUTTONS 
 ========================================== */

/* FN: PUT SELECTED CARDS ON HOLD */

const fadeOutCardFace = (cardImage) => {
     cardImage.classList.remove('cardImg');
     /* cardImage.classList.add('none'); */
     cardImage.classList.add('fadeOut');
};

const applyHoldLabel = (cardHolder) => {
  cardHolder.classList.add('holdLabel');
 /*  const cardBack = document.createElement('div');
  cardBack.setAttribute('id', `back${i}`);
  cardBack.innerText = '';
  cardBack.classList.add('showBack'); 
  cardHolder.appendChild(cardBack);*/
  
  idOfCard = cardHolder.id;
  /* console.log('ID = ', idOfCard); */
  plyr1Hand[idOfCard].hold = true;
  console.log('ON HOLD: plyr1Hand [i]=', idOfCard);

  return idOfCard;
};




const discardIndexArr = [];  /* ================================> GLOBAL VARIABLES

/*  Mini FN: cover up cards that need to be swapped */

const foldCards = (hand) => {
  
  /* read the hand to get which cards will be discarded */
  for (let i = 0; i < hand.length; i += 1) {
    if (hand[i].hold === false) {
      discardIndexArr.push(i);
    }
  }
  console.log ('Card Indexes to discard = ', discardIndexArr);
  for (let j = 0; j < discardIndexArr.length; j += 1) {
    const discardPicIndex = `pic${discardIndexArr[j]}`;
    const discardPic = document.getElementById(discardPicIndex);

    const disContainerIndex = `${discardIndexArr[j]}`;
    const disContainer = document.getElementById(disContainerIndex);

    disContainer.classList.add('showBack')
    discardPic.classList.add('none');
  }
};

/* Mini- FN: SWAP CARD and turn over the covered card*/
const swapCard = () => {

/* load new cards into discard pile */
const discardPile = [];
for (let i = 0; i < discardIndexArr.length; i += 1) {
  discardPile.push(shuffledDeck.pop());
}
console.log ('discard Pile =', discardPile);

/* get card position indexes that need swapping from discardArray 
 * and get their elements by id */
for (let j = 0; j < discardIndexArr.length; j += 1) {
  const discardPicIndex = `pic${discardIndexArr[j]}`;
  const discardPic = document.getElementById(discardPicIndex);

  const disContainerIndex = `${discardIndexArr[j]}`;
  console.log('Loop Number, j = ', j);
  console.log('disContainerIndex =', disContainerIndex);
  const disContainer = document.getElementById(disContainerIndex);

/* expunge cardImage element from the selected cardHolder */
  disContainer.removeChild(discardPic);
 
/* carry out the swap function for the plyr1Hand array */;
/*    plyr1Hand[disContainerIndex] = shuffledDeck.pop(); */
   const newCard = discardPile[j];
   const oldCard = plyr1Hand[disContainerIndex];
   plyr1Hand[disContainerIndex] = newCard;
   discardPile[j] = oldCard;
   console.log ('discard Pile =', discardPile);

/* based on new cardIndo, establish new CardImage in this container per j */
   const cardImage = new Image(157, 220); /* 157, 220 */
   cardImage.classList.add('cardImg');
   cardImage.setAttribute('id', `pic${disContainerIndex}`);
   cardImage.src = "./images/" + plyr1Hand[disContainerIndex].suit + "-" + plyr1Hand[disContainerIndex].rank + ".png";
   disContainer.appendChild(cardImage);

}

return;
};


/* FN: remove hold banner and show held cards again */
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





/* FN: DEAL 5 CARDS TO SPECIFIED HAND */
const deal5Cards = () => {
  const prefix = './images/';
  for (let i = 0; i < handSize; i += 1) {
    plyr1Hand.push(shuffledDeck.pop());
    cardHolder = document.createElement('div');
    cardHolder.classList.add('cardHolder');
    cardHolder.setAttribute('id', `${i}`);
    cardHolder.addEventListener('click', (event) => {
      applyHoldLabel(event.currentTarget);
    });

    tableEl.appendChild(cardHolder);

    const cardImage = new Image(157, 220); /* 157, 220 */
    cardImage.classList.add('cardImg');
    cardImage.setAttribute('id', `pic${i}`);
    cardImage.src = prefix + plyr1Hand[i].suit + "-" + plyr1Hand[i].rank + ".png";
    cardImage.addEventListener('click', (event) => {
      fadeOutCardFace(event.currentTarget);
    });
    cardHolder.appendChild(cardImage);

  }
  return;
};
 
/* FN: DEAL CARDS */
/* querySelector for DEAL BUTTON */
const dealButton = document.querySelector('#dealBtn');
/* Define what clicking Deal Button does */
const dealBtnClicked = () =>
{ deal5Cards(plyr1Hand);
};
// say which function to call *when* the user clicks the button
dealButton.addEventListener('click', dealBtnClicked);
