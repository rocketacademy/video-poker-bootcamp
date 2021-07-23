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
  const gameContainer=document.createElement('div');
  const header = document.createElement('h1');
  const cardContainer = document.createElement('div');
  const deckContainer = document.createElement('div');
  const faceDownImg = document.createElement('img');


  const bottomBar = document.createElement('div');
  const betContainer = document.createElement('div');
  const tokensContainer = document.createElement('div');

  const betArrows = document.createElement('div');
  const tokenCount = document.createElement('div');
  const upBet = document.createElement('button');
  const downBet = document.createElement('button');

  const buttonContainer = document.createElement('div');
  const betButton=document.createElement('button');
  const dealButton = document.createElement('button');
  const scoreButton = document.createElement('button');
  const results = document.createElement('div');

  const creditContainer=document.createElement('div');
  
  const creditTxt = document.createElement('div');
  const totalPoints = document.createElement('div');

  header.innerText = 'Video Poker!';
  totalPoints.innerText = points;
  betButton.innerText='Bet';
  dealButton.innerText = 'Deal';
  scoreButton.innerText = 'Score';
  creditTxt.innerText = 'Credits';

  

  handContainer.innerHTML = '';
  gameContainer.classList.add('game-container');
  deckContainer.classList.add('card');

  handContainer.classList.add('hand-container');
  betContainer.classList.add('betcontainer');
  betButton.classList.add('inline-block', 'large-button','button-bottom-border');
  dealButton.classList.add('inline-block', 'large-button');
  scoreButton.classList.add('inline-block', 'large-button');

  tokensContainer.classList.add('inline-block', 'tokencontainer');
  betArrows.classList.add('bet-arrows');
  upBet.classList.add('arrow-up');
  downBet.classList.add('arrow-down');
  buttonContainer.classList.add('inline-block');
  bottomBar.classList.add('bottom-bar');
  results.classList.add('inline-block','results');

  faceDownImg.src = './resources/cardFace/deck_4_large.png';
  addTokens();
  tokenCount.innerText = bet;
  let tokensDom = createtokens(bet);
  tokensContainer.appendChild(tokensDom);
  tokensContainer.style.width = '100px';

  //create table for scoreboard
  //highlight the type of hand when player wins

  //more instructions to player on how to play the game
  //joke responses

  //disappearing bets. reset bet after scoring when loss
  //animation for increase in credit score after score button

  //player gold pile

  //when player clicks deal, noo more change of bets.
  //create bet button for player to freeze bet before starting
  
  //can click series
  let upCanClick=true;
  let downCanClick=true;
  let betCanClick=true;
  let dealCanClick=false;
  let scoreCanClick=false;

  upBet.addEventListener('click', () => {
    if(!upCanClick)
    {
      return;
    }
    addTokens();
    tokensContainer.removeChild(tokensDom);
    tokensDom = createtokens(bet);
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;
  });
  downBet.addEventListener('click', () => {
    if(!downCanClick)
    {
      return;
    }
    removeToken();
    tokensContainer.removeChild(tokensDom);
    tokensDom = createtokens(bet);
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;
  });

  betButton.addEventListener('click',()=>{
    if(!betCanClick){
      return;
    }
    upCanClick=false;
    downCanClick=false;
    points -= bet;
    totalPoints.innerText = points;
    dealCanClick=true;
    dealButton.classList.add('button-bottom-border');

    betButton.classList.remove('button-bottom-border');
  })

 
  let cardsDom = document.createElement('div');
  // refresh deck
  dealButton.addEventListener('click', () => {
    if(!dealCanClick)
    {
      return;
    }
    scoreCanClick=true;
    scoreButton.classList.add('button-bottom-border');
    if (consecutiveDeals === 0) {
      consecutiveDeals+=1;
      
      handContainer.innerHTML = '';
      // For testing
      //  playerHand= royalFlush;

      playerHand = dealCards(maxHandSize);
      cardsDom = createCards(playerHand);
      appendChilds(handContainer, cardsDom);
      handContainer.classList.remove('cardAnimateDiscard');
      handContainer.classList.add('cardAnimateOpenNew');
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
      dealCanClick=false;
      dealButton.classList.remove('button-bottom-border');
    }
  });

  scoreButton.addEventListener('click', () => {
    if(!scoreCanClick)
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
    consecutiveDeals=0;
    dealButton.classList.remove('button-bottom-border');
    scoreButton.classList.remove('button-bottom-border');
    
      handContainer.classList.remove('cardAnimateOpenNew');
      setTimeout(()=>{
        handContainer.classList.add('cardAnimateDiscard');
      },1000)
      
      console.log(`deck count: ${deck.length}`);
      betCanClick = true;
      upCanClick=true;
      downCanClick=true;
      dealCanClick=false;
      scoreCanClick=false;
       betButton.classList.add('button-bottom-border');
      setTimeout(() => {
      
      handContainer.innerHTML = '';  
      results.innerText ='';

      if(deck.length < maxHandSize*2 ){
        console.log(`in reset condition`);
        handContainer.classList.remove('cardAnimateDiscard');
        const resetMsg= document.createElement('div');
        resetMsg.innerText = 'Out of cards, deal to reset.';
        resetMsg.classList.add('resetMessage');
        handContainer.appendChild(resetMsg);
        
     
        

        dealButton.disabled = false;
        deck = shuffleCards(makeDeck());
        firstDeal=true;
      }
    }, 2000);
  });

  deckContainer.appendChild(faceDownImg);
  cardContainer.appendChild(deckContainer);
  cardContainer.appendChild(handContainer);
  betArrows.appendChild(tokenCount);
  betArrows.appendChild(upBet);
  betArrows.appendChild(downBet);


  betContainer.appendChild(tokensContainer);
  betContainer.appendChild(betArrows);

  buttonContainer.appendChild(betButton);
  buttonContainer.appendChild(dealButton);
  buttonContainer.appendChild(scoreButton);

  creditContainer.appendChild(creditTxt);
  creditContainer.appendChild(totalPoints);

  bottomBar.appendChild(betContainer);
  bottomBar.appendChild(buttonContainer);
  bottomBar.appendChild(results);
  bottomBar.appendChild(creditContainer);

  gameContainer.appendChild(header);
  

  gameContainer.appendChild(cardContainer);

  gameContainer.appendChild(bottomBar);
  document.body.appendChild(gameContainer);
};
gameinit();
