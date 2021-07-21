/* eslint-disable no-eval */

const tokens = [];
const tokenTranslation = [];

const addTokens = () => {
  if (bet === points) {
    return;
  }
  const colors = ['biege', 'black', 'blue', 'gray', 'green', 'lightblue', 'pink', 'purple', 'red', 'white', 'yellow'];
  const addition = colors[getRandomInt(colors.length)];
  const translation = `${getRandomInt(15) - 5}px , ${-7 * tokens.length + 20}px`;
  bet += 1;
  tokens.push(addition);
  tokenTranslation.push(translation);
};
const removeToken = () => {
  if (bet === 1) {
    return;
  }
  bet -= 1;
  tokens.pop();
  tokenTranslation.pop();
};
const createtokens = () => {
  const tokenContainer = document.createElement('div');

  for (let i = 0; i < tokens.length; i++)
  {
    const token = document.createElement('img');
    const color = tokens[i];
    const filePath = `./resources/chips/chip_${color}_flat_large.png`;
    token.style.transform = `translate(${tokenTranslation[i]})`;
    token.style.zIndex = i;
    token.style.position = 'absolute';
    token.src = filePath;
    tokenContainer.appendChild(token);
  }
  return tokenContainer;
};

let firstDeal = true;
let consecutiveDeals=0;
const gameinit = () => {
  const header = document.createElement('h1');
  const cardContainer = document.createElement('div');
  const deckContainer = document.createElement('div');
  const faceDownImg = document.createElement('img');
  const totalPoints = document.createElement('div');

  const bottomBar = document.createElement('div');
  const betContainer = document.createElement('div');
  const tokensContainer = document.createElement('div');

  const betArrows = document.createElement('div');
  const tokenCount = document.createElement('div');
  const upBet = document.createElement('button');
  const downBet = document.createElement('button');

  const buttonContainer = document.createElement('div');
  const dealButton = document.createElement('button');
  const scoreButton = document.createElement('button');
  const results = document.createElement('div');

  header.innerText = 'Video Poker!';
  totalPoints.innerText = points;
  dealButton.innerText = 'Deal';
  scoreButton.innerText = 'Score';

  handContainer.innerHTML = '';

  deckContainer.classList.add('card', 'cardContainer');
  handContainer.classList.add('cardContainer');
  betContainer.classList.add('betcontainer');
  dealButton.classList.add('inline-block', 'large-button');
  scoreButton.classList.add('inline-block', 'large-button');
  tokenCount.classList.add('inline-block');
  tokensContainer.classList.add('inline-block', 'tokencontainer');
  betArrows.classList.add('bet-arrows');
  upBet.classList.add('arrow-up');
  downBet.classList.add('arrow-down');
  buttonContainer.classList.add('inline-block', 'vertical-center');
  bottomBar.classList.add('bottom-bar');

  faceDownImg.src = './resources/cardFace/deck_4_large.png';
  addTokens();
  tokenCount.innerText = bet;
  let tokensDom = createtokens(bet);
  tokensContainer.appendChild(tokensDom);
  tokensContainer.style.width = '100px';
  upBet.addEventListener('click', () => {
    addTokens();
    tokensContainer.removeChild(tokensDom);
    tokensDom = createtokens(bet);
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;
  });
  downBet.addEventListener('click', () => {
    removeToken();
    tokensContainer.removeChild(tokensDom);
    tokensDom = createtokens(bet);
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;
  });

  let cardsDom = document.createElement('div');
  // refresh deck
  dealButton.addEventListener('click', () => {
    if (firstDeal === true) {
      consecutiveDeals+=1;
      points -= bet;
      handContainer.innerHTML = '';
      // For testing
      // playerHand= doubleJack;
      console.log('in 1st deal');

      playerHand = dealCards(maxHandSize);
      cardsDom = createCards(playerHand);
      appendChilds(handContainer, cardsDom);
      console.log(cardsDom);
      firstDeal = false;
    }
    else if(consecutiveDeals < 2){
      console.log('in 2nd deal');
      consecutiveDeals+=1;
      cardsDom = createCards(playerHand);
      handContainer.innerHTML = '';
      appendChilds(handContainer, cardsDom);
      replaceUnheldCards(cardsDom);
     
    }
    else{
    // dealButton.disabled = true;
    }
  });
  // endgame message when deck is exhausted

  scoreButton.addEventListener('click', () => {
    if(firstDeal)
    {
      return;
    }
    let rankTally; let suitTally; let prize; let
      outputString;
    [rankTally, suitTally] = tallyHand();
    [prize, outputString] = calHandScore(rankTally, suitTally);
    points += prize;
    totalPoints.innerText = points;
    results.innerText = `${outputString}, you win ${prize} points`;
    consecutiveDeals=1;

    setTimeout(() => {
      

      handContainer.classList.add('cardAnimateDiscard');

      handContainer.innerHTML = '';
      if(deck.length < maxHandSize*2 ){
        const resetMsg= document.createElement('div');
        resetMsg.innerText = 'Out of cards, deal to reset.';
        resetMsg.classList.add('resetMessage');
        // resetMsg.style.transform='translate (400px, 160px)'
        handContainer.appendChild(resetMsg);
        
        dealButton.disabled = false;
        deck = shuffleCards(makeDeck());
        firstDeal=true;
      }
      else{    
        playerHand = dealCards(maxHandSize);
        appendChilds(handContainer, createCards());

        setTimeout(()=>{ 
          handContainer.classList.add('cardAnimateOpenNew');},
          500);
       
      }

    }, 1000);
  });

  deckContainer.appendChild(faceDownImg);
  cardContainer.appendChild(deckContainer);
  cardContainer.appendChild(handContainer);
  betArrows.appendChild(tokenCount);
  betArrows.appendChild(upBet);
  betArrows.appendChild(downBet);
  buttonContainer.appendChild(dealButton);
  buttonContainer.appendChild(scoreButton);

  betContainer.appendChild(tokensContainer);
  betContainer.appendChild(betArrows);

  bottomBar.appendChild(betContainer);
  bottomBar.appendChild(buttonContainer);
  bottomBar.appendChild(results);

  document.body.appendChild(header);
  document.body.appendChild(totalPoints);

  document.body.appendChild(cardContainer);

  document.body.appendChild(bottomBar);
};
gameinit();
