const deck = shuffleCards(makeDeck());

let points=100;
let playerHand=[];
let bet=1;
const maxHandSize=5;
const cardContainer=document.createElement('div');


//create cards that roll out
//create cards as document elements that can be removed
/**
 * Append multiple childs
 * @param {*} parentDom 
 * @param {*} children 
 */
const appendChilds=(parentDom, children)=>{
  for(let i=0; i<children.length; i++)
  {
    parentDom.appendChild(children[i]);
  }
}
/**
 * Represents cards dealt from the deck
 * @param {*} numCards 
 * @returns cards
 */
//used to deal all cards or one at a time
const dealCards = (numCards)=>{
  if(deck.length>=numCards)
  {
    return popMultiple(deck,numCards);
  }
  return popMultiple(deck,deck.length);
}
/**
 * Pop multiple items from array
 * @param {*} array 
 * @param {*} num 
 * @returns popped items
 */
const popMultiple=(array, num)=>{
  const popped=[];
  for (let i=0; i<num; i++){
    popped.push(array.pop())
  }
  return popped;
}

//deal deck with animation
//deals card face down
//slides down container
//flip one by one 
/**
 * Creates card content dom from card object
 * @param {*} cardObj 
 * @returns card contents
 */
const createCard=(cardObj)=>{
 
  const suit=document.createElement('div');
  const name=document.createElement('div');
  const color= cardObj.colour
  
  suit.classList.add('suit', color);
  name.classList.add('name', color);

  suit.innerText=cardObj.suitSymbol;
  name.innerText=cardObj.displayName;

  return [name, suit];
}
/**
 * create card dom elements
 * @param {*} cards 
 * @returns card dom elements
 */
const createCards = (cards) => { 
  const domCards=[];
  for(let i=0; i<cards.length; i++)
  {
    let name, suit;
    const card=document.createElement('div');
    card.classList.add('card','openCard');
    [name, suit] = createCard(cards[i]);

    card.appendChild(name);
    card.appendChild(suit);

    domCards.push(card);

    card.addEventListener('click', ()=>{
      card.removeChild(name);
      card.removeChild(suit);
      //if cards can only be swapped once, prefix name and suit 
      [nName, nSuit]= replaceCard(cards, i)
      ;

      card.appendChild(nName);
      card.appendChild(nSuit);
    })
  }
  return domCards;
}
/**
 * replaces card
 * @param {*} cards 
 * @param {*} i 
 * @returns card contents of replacement
 */
const replaceCard = (cards, i)=>{
  const replacement= deck.pop();
  cards[i]=replacement;
  return createCard(replacement);
}

const tallyHand = ()=>{
  const rankTally={};
  const suitTally={};
  for(let i=0; i<playerHand.length;i++)
  {
    const card= playerHand[i];
    if(card.rank in rankTally){
      rankTally[`${card.rank}`]+=1;
    }
    else{
      rankTally[`${card.rank}`]=1;
    }

    if(card.suit in suitTally){
      suitTally[card.suit]+=1;
    }
    else{
      suitTally[card.suit]=1;
    }
     console.log(card.rank)
  }
 
  return[rankTally, suitTally];
}
