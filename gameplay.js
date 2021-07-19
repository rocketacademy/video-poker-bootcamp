const deck = shuffleCards(makeDeck());

let points=100;
let playerHand=[];
let bet=1;
const maxHandSize=5;
const cardContainer=document.createElement('div');


//create cards that roll out
//create cards as document elements that can be removed

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
 * popped multiple items from array
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
    rankTally[card.rankCounter]+=1;
    suitTally[card.suit]+=1;  //flush condition
  }
  return[nameTally, suitTally];
}

const calHandScore=(rankTally, suitTally)=>{
  let multiplier=0;
  
  if(isRoyalFlush(rankTally))
  {
    multiplier=800;
  }
  else if(isStraightFlush(rankTally, suitTally))
  {
    multiplier=50;
  }
  else if(isFourOfKind(rankTally))
  {
    multiplier=25;
  }
  else if(isFullHouse(rankTally))
  {
    multiplier=9;
  }
  else if(isFlush(suitTally))
  {
    multiplier=6;
  }
  else if(isStraight(rankTally))
  {
    multiplier=4;
  }
  else if(isThreeKind(rankTally))
  {
    multiplier=3;
  }
  else if(isTwoPair(rankTally))
  {
    multiplier=2;
  }
  else if(isJackOrBetter(rankTally))
  {
    multiplier=1;
  }
  return multiplier*bet;
}

isRoyalFlush=(rankTally)=>{
  if (
  rankTally['1']===1 && 
  rankTally['13']===1 && 
  rankTally['12']===1 && 
  rankTally['11']===1 &&
  rankTally['10']===1)
  {
    return true;
  }
  return false;
}
isStraightFlush=(rankTally, suitTally)=>{
  if(isFlush(suitTally)||isStraight(rankTally)){
    return true;
  }
   return false;
 }

isFourOfKind=(rankTally)=>{
  for(rank in rankTally)
  {
    if(rankTally[rank]===4)
    {
      return true;
    } 
  }
  return false;
}
isFullHouse=(rankTally)=>{
  if(isThreeKind(rankTally)!=0 && isPair(rankTally)){
    return true;
  }
  return false;
}
isFlush=(suitTally)=>{
  for(suit in suitTally)
  {
    if(suitTally[suit]===5)
    {
      return true;
    } 
  }
  return false;
}

isStraight=(rankTally)=>{
  //ace to 9
  for(let i=1; i<= 13 - maxHandSize + 1; i++){
    const countSequential=0;
    for(let j=0; j<maxHandSize; j++)
    {
      if(rankTally[i+j]>=1)
      {
        countSequential+=1;
      }
      else{
        break;
      }
    }
    if(countSequential===maxHandSize)
    {
      return true;
    }
  }
  return false;
}
//to test if full house not true
isThreeKind=(rankTally)=>{
  for(rank in rankTally)
  {
    if(rankTally[rank]===3)
    {
      return true;
    } 
  }
  return false;
}

isPair=(rankTally)=>{
  for(rank in rankTally)
  {
    if(rankTally[rank]===2)
    {
      return true;
    } 
  }
  return false;
}
isTwoPair=(rankTally)=>{
  let pairCount=0;
  for(rank in rankTally)
  {
    if(rankTally[rank]===2)
    {
      pairCount+=1;
    } 
  }
  if(pairCount==2){
    return true;
  }
  return false;
}

isJackOrBetter=(rankTally)=>{
  if(rankTally['11']==2){
    return true;
  }
  return false;
}