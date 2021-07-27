/* eslint-disable no-eval */

let deck = shuffleCards(makeDeck());
const folderPath = './resources/cardFace';
let points = 100;
let playerHand = [];
let bet = 0;
let maxHandSize = 5;
let handContainer = document.createElement('div');

const getFilePathCard = (suit, displayName) =>
{
  const filePath = `${folderPath}/card_b_${suit}${displayName}_large.png`;
  return filePath;
};

/**
 * Append multiple childs
 * @param {*} parentDom
 * @param {*} children
 */
const appendChilds = (parentDom, children) => {
  for (let i = 0; i < children.length; i++)
  {
    parentDom.appendChild(children[i]);
  }
};

/**
 * Represents cards dealt from the deck
 * @param {*} numCards
 * @returns cards
 */
// used to deal all cards or one at a time
const dealCards = (numCards) => {
  if (deck.length >= numCards)
  {
    return popMultiple(deck, numCards);
  }
  return popMultiple(deck, deck.length);
};

/**
 * Pop multiple items from array
 * @param {*} array
 * @param {*} num
 * @returns popped items
 */
const popMultiple = (array, num) => {
  const popped = [];
  for (let i = 0; i < num; i++) {
    popped.push(array.pop());
  }
  return popped;
};

/**
 * Create card image dom from card object
 * @param {*} cardObj 
 * @returns card image dom
 */
const createCardImg = (cardObj) => {
  const cardImg = document.createElement('img');
  cardImg.src = getFilePathCard(cardObj.suit, cardObj.displayName);
  cardImg.classList.add('cardimg','card-inner');
  return cardImg;
};

/**
 * create card dom elements
 * @param {*} cards
 * @returns card dom elements
 */
const createCards = () => {
  const domCards = [];
  for (let i = 0; i < playerHand.length; i++)
  { const refCard = playerHand[i];
    //card dom creation
    const card = document.createElement('div');
    const cardInner= document.createElement('div');
    const cardFront= document.createElement('div');
    const cardBack = document.createElement('div');
    const cardBackImg= document.createElement('img');
    const holder = document.createElement('div');
    
    cardBackImg.src='./resources/cardFace/deck_4_large.png';
    
    const cardOpenImg = createCardImg(refCard);
    cardFront.appendChild(cardOpenImg);
    cardFront.appendChild(holder);

    cardBack.appendChild(cardBackImg);
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    
    card.appendChild(cardInner);
    domCards.push(card);

    card.classList.add('card');
    cardInner.classList.add('card-inner');
    cardFront.classList.add('openCard');
    cardBack.classList.add('closeCard');

    cardFront.addEventListener('click', () => {
      playerHand[i].isHeld = !playerHand[i].isHeld;
      const heldSound= new Audio('./resources/sounds/cardPlace2.wav')
      heldSound.play();

      if (playerHand[i].isHeld)
      {
        holder.classList.add('holder');
        holder.innerText = 'hold';
      }
      else {
        holder.classList.remove('holder');
        holder.innerText = '';
      }
    });
  }
  return domCards;
};

/**
 * replaces card
 * @param {*} cards
 * @param {*} i
 * @returns card contents of replacement
 */
const replaceCardImg = (cards, i) => {
  const replacement = deck.pop();
  cards[i] = replacement;
  return createCardImg(replacement);
};

/**
 * replaces unheld cards in array of card elem
 * @param {*} cardsDom 
 */
const replaceUnheldCards = (cardsDom) => {
  for (let i = 0; i < playerHand.length; i++)
  {
    const refCard = playerHand[i];
    const refDom = cardsDom[i];
    if (refCard.isHeld === false)
    {
       refDom.classList.add('cardAnimateDiscard');
        //remove card after discard animation is finished
       setTimeout(()=>{
        while (refDom.firstChild) {
         refDom.removeChild(refDom.lastChild);
        }
        },500)
      
      setTimeout(()=>{
        const cardImg = replaceCardImg(playerHand, i);
        refDom.appendChild(cardImg);
        refDom.classList.remove('cardAnimateDiscard');
        refDom.classList.add('cardAnimateOpenNew');
        const cardRollSound= new Audio('./resources/sounds/cardTakeOutPackage2.wav')
        cardRollSound.play();
      },1000);
    }
  }
};

/**
 * Tally Hand
 * @returns rankTally, suitTally
 */
const tallyHand = () => {
  const rankTally = {};
  const suitTally = {};
  for (let i = 0; i < playerHand.length; i++)
  {
    const card = playerHand[i];
    if (card.rank in rankTally) {
      rankTally[`${card.rank}`] += 1;
    }
    else {
      rankTally[`${card.rank}`] = 1;
    }

    if (card.suit in suitTally) {
      suitTally[card.suit] += 1;
    }
    else {
      suitTally[card.suit] = 1;
    }

  }

  return [rankTally, suitTally];
};

const getRandomInt = (max) => Math.floor(Math.random() * max);
