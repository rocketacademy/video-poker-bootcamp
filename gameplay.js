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

// create cards that roll out
// create cards as document elements that can be removed
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

// deal deck with animation
// deals card face down
// slides down container
// flip one by one
/**
 * Creates card content dom from card object
 * @param {*} cardObj
 * @returns card contents
 */
const createCard = (cardObj) => {
  const suit = document.createElement('div');
  const name = document.createElement('div');
  const color = cardObj.colour;

  suit.classList.add('suit', color);
  name.classList.add('name', color);

  suit.innerText = cardObj.suitSymbol;
  name.innerText = cardObj.displayName;

  return [name, suit];
};

const createCardImg = (cardObj) => {
  const cardImg = document.createElement('img');
  cardImg.src = getFilePathCard(cardObj.suit, cardObj.displayName);
  cardImg.classList.add('cardimg');
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
    let name; let
      suit;
    const card = document.createElement('div');
    card.classList.add('card', 'openCard');
    // [name, suit] = createCard(refCard);
    const cardImg = createCardImg(refCard);
    card.appendChild(cardImg);

    domCards.push(card);
    const holder = document.createElement('div');
    card.appendChild(holder);

    card.addEventListener('click', () => {
      playerHand[i].isHeld = !playerHand[i].isHeld;

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

const replaceUnheldCards = (cardsDom) => {
  for (let i = 0; i < playerHand.length; i++)
  {
    const refCard = playerHand[i];
    const refDom = cardsDom[i];
    if (refCard.isHeld === false)
    {
      // scaling with rotation animation
      // refDom.style.transform='scale(0.01,0.01)';
       refDom.classList.add('cardAnimateDiscard');
        
       setTimeout(()=>{
        while (refDom.firstChild) {
         refDom.removeChild(refDom.lastChild);
        }

        },500)
      
     
      setTimeout(()=>{
        const cardImg = replaceCard(playerHand, i);
        refDom.appendChild(cardImg);
        refDom.classList.remove('cardAnimateDiscard');
        refDom.classList.add('cardAnimateOpenNew');
      },1000);
   
    }
    else {
      const holder = document.createElement('div');
      refDom.appendChild(holder);
      holder.classList.add('holder');
      holder.innerText = 'hold';
    }
  }
};
/**
 * replaces card
 * @param {*} cards
 * @param {*} i
 * @returns card contents of replacement
 */
const replaceCard = (cards, i) => {
  const replacement = deck.pop();
  cards[i] = replacement;
  return createCardImg(replacement);
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
