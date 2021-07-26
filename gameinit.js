/* eslint-disable no-eval */

let tokens = [];
let tokenTranslation = [];


const addTokens = (num=1) => {
  if (bet === points) {
    return;
  }
  const colors = ['biege', 'black', 'blue', 'gray', 'green', 'lightblue', 'pink', 'purple', 'red', 'white', 'yellow'];
  for(let i=0; i<num;i+=1){
    const addition = colors[getRandomInt(colors.length)];
     const translation = `${getRandomInt(12)/10}vw , ${-0.8*tokens.length+2 }vw`;

    bet += 1;
    tokens.push(addition);
    tokenTranslation.push(translation);
  }

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
  tokenContainer.id='tokens';
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

const refreshTokens=()=>{
    tokens = [];  
    tokenTranslation = [];
    const betVal=bet;
    addTokens(bet);
    bet-=betVal;
    tokensDom = createtokens();
    return tokensDom;
}

const updateTokenCon=(tokensContainer, tokensDom, tokenCount, bet)=>{
    tokensContainer.removeChild(tokensDom);
    tokensDom = createtokens();
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;

}
const createTable=(variation, wonHand='')=>{
    const table =document.createElement('table');
    const tableRow= document.createElement('tr');
    const rowHeader= document.createElement('th');
    const maxNum = bet < 5? 5: bet; 

    rowHeader.innerText='Hand';
    tableRow.appendChild(rowHeader);
    for(let i = maxNum-4 ; i <= maxNum; i+=1)
      {
         const rowData= document.createElement('td');
         rowData.innerText=i;
         tableRow.appendChild(rowData);
      }
    table.appendChild(tableRow);
       
    for(const hand in variation)
    {
       const tableRow= document.createElement('tr');
       const rowHeader= document.createElement('th');
       
       rowHeader.innerText=hand;
       tableRow.appendChild(rowHeader);
       //make variable to number of bets
       for(let i = maxNum-4 ; i <= maxNum; i+=1)
       {
         const rowData= document.createElement('td');
         rowData.innerText=variation[hand]*i;
         tableRow.appendChild(rowData);
         console.log(hand)
         if(hand==wonHand && i==maxNum)
         {
           tableRow.classList.add('highlight-text');
         }
       }
       if(hand==wonHand)
       {
         tableRow.classList.add('hightlight-row');
       }
       table.appendChild(tableRow);
    }
    return table;
  }


let firstDeal = true;
let consecutiveDeals=0;
const gameinit = () => {
  const gameContainer=document.createElement('div');

  const topBar= document.createElement('div');
  const tableContainer= document.createElement('div');
  const tableButton= document.createElement('button');

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
  const resetMsg= document.createElement('div');

  const credits= document.createElement('div');
  const totalPoints = document.createElement('div');
  const creditEffects= document.createElement('div');

  let table = createTable(jackOrBetterScore);

  resetMsg.classList.add('resetMessage');
  handContainer.appendChild(resetMsg);
  resetMsg.innerText='Bet to start';

  header.innerText = 'Video Poker!';
  totalPoints.innerText = `${points} credits`;
  betButton.innerText='Bet';
  dealButton.innerText = 'Deal';
  scoreButton.innerText = 'Score';
  tableButton.innerText='Scoring table';

 

  

  gameContainer.classList.add('game-container');
  topBar.classList.add('top-bar');
  deckContainer.classList.add('card','box-shadow');
  header.classList.add('inline-block'); 
  
  tableContainer.classList.add('table-container');
  tableButton.classList.add('large-button','button-bottom-border','table-button');
  cardContainer.classList.add('middle-bar');
  handContainer.classList.add('hand-container');
  betContainer.classList.add('betcontainer');
  betButton.classList.add('inline-block', 'large-button','button-bottom-border');
  dealButton.classList.add('inline-block', 'large-button');
  scoreButton.classList.add('inline-block', 'large-button');

  tokensContainer.classList.add('inline-block', 'tokencontainer');
  betArrows.classList.add('bet-arrows');
  upBet.classList.add('arrow-up');
  downBet.classList.add('arrow-down');
  buttonContainer.classList.add('inline-block','button-container');
  bottomBar.classList.add('bottom-bar');
  results.classList.add('inline-block','results');
  
  creditEffects.classList.add('credit-effects', 'inline-block');
  credits.classList.add('inline-block','credit-container');
  creditContainer.classList.add('credit-container');
  totalPoints.classList.add('inline-block');

  faceDownImg.src = './resources/cardFace/deck_4_large.png';

  //create table for scoreboard
  //highlight the type of hand when player wins

  //more instructions to player on how to play the game
  //joke responses

  //player gold pile

  //can click series
  let upCanClick=true;
  let downCanClick=true;
  let betCanClick=true;
  let dealCanClick=false;
  let scoreCanClick=false;
  let isTableHidden=false;

  tableButton.addEventListener('click',()=>{
    if(isTableHidden){
       table.classList.remove('hide');
    }
    else{
       table.classList.add('hide');
    }
    isTableHidden =! isTableHidden;
  })

  addTokens(5);
  tokenCount.innerText = bet;
  let tokensDom = createtokens();
  tokensContainer.appendChild(tokensDom);


  upBet.addEventListener('click', () => {
    if(!upCanClick)
    {
      return;
    }
    addTokens();
    tokensContainer.removeChild(tokensDom);
    tokensDom = createtokens();
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;

    tableContainer.removeChild(table);
    table = createTable(jackOrBetterScore);
    tableContainer.appendChild(table);
  });
  downBet.addEventListener('click', () => {
    if(!downCanClick)
    {
      return;
    }
    removeToken();

    tokensContainer.removeChild(tokensDom);
    tokensDom = createtokens();
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;

    tableContainer.removeChild(table);
    table = createTable(jackOrBetterScore);
    tableContainer.appendChild(table);
  });



  let cardsDom = document.createElement('div');
  betButton.addEventListener('click',()=>{
    if(!betCanClick){
      return;
    }
    results.innerText ='';
    handContainer.innerHTML = '';

      // For testing
      //  playerHand= royalFlush;

    creditEffects.innerText='-';
    creditEffects.classList.add('sign-float');
    creditEffects.style.animationIterationCount=bet;

    let pointCount=0;
    const pointInterval=setInterval(() => {
      if(pointCount===bet)
      {
        clearInterval(pointInterval);
        creditEffects.innerText = '';
        creditEffects.classList.remove('sign-float');
        return;
      }
      points-=1;
      pointCount+=1;
      totalPoints.innerText = `${points} credits`;
    }, 500);
    
    deckContainer.classList.remove('cardAnimateDiscard');
    playerHand = dealCards(maxHandSize);
    cardsDom = createCards(playerHand);
    appendChilds(handContainer, cardsDom);
    handContainer.classList.remove('cardAnimateDiscard');
    handContainer.classList.add('cardAnimateOpenNew');

    upCanClick=false;
    downCanClick=false;

    betCanClick=false;
    dealCanClick=true;
    dealButton.classList.add('button-bottom-border');

    betButton.classList.remove('button-bottom-border');
  })

  // refresh deck
  let parentNodes=[];
  let inners;
  dealButton.addEventListener('click', () => {
    if(!dealCanClick)
    {
      return;
    }
    scoreCanClick=true;
    scoreButton.classList.add('button-bottom-border');
    deckContainer.classList.remove('cardAnimateDiscard');
    if (consecutiveDeals === 0) {
      parentNodes=[]
      consecutiveDeals+=1;
      inners = document.querySelectorAll('div.card-inner');

      console.log(inners);
      [].forEach.call(inners,function(inner){
        inner.classList.add('card-flip');
        parentNodes.push(inner.parentNode)
      })
      console.log(inners);
      console.log(parentNodes);


      cardsDom = createCards(playerHand);
      console.log(cardsDom);
      handContainer.innerHTML = '';
      appendChilds(handContainer, parentNodes);

      firstDeal = false;
    }
    else if(consecutiveDeals < 2){
      console.log('in 2nd deal');
      consecutiveDeals+=1;

      replaceUnheldCards(parentNodes);
      dealCanClick=false;
      dealButton.classList.remove('button-bottom-border');
      parentNodes=[];
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
    // points += prize;
    totalPoints.innerText =`${points} credits`;
  
    tableContainer.removeChild(table);
    table = createTable(jackOrBetterScore,outputString);
    tableContainer.appendChild(table);
    if(prize>0)
    {
      results.innerText = `${outputString}, you win ${prize} points`;

      creditEffects.innerText='+';
      creditEffects.classList.add('sign-float');
      creditEffects.style.animationIterationCount=prize;
      
      let pointCount=0;
      const pointPosInterval=setInterval(() => {
        if(pointCount===prize)
        {
          clearInterval(pointPosInterval);
          creditEffects.innerText = '';
          creditEffects.classList.remove('sign-float');
          return;
        }
        console.log(prize);
        points+=1;
        totalPoints.innerText = `${points} credits`;
        pointCount+=1;
    }, 500);
    }
    else{
      results.innerText = `${outputString}`;
    }

    consecutiveDeals=0;

    handContainer.classList.remove('cardAnimateOpenNew');
    setTimeout(()=>{
        tokensDom.classList.add('cardAnimateDiscard');
        handContainer.classList.add('cardAnimateDiscard');
        if(deck.length < maxHandSize*2 ){
        deckContainer.classList.add('cardAnimateDiscard');}
    },1000)

    setTimeout(() => {
      handContainer.innerHTML = '';
      handContainer.classList.remove('cardAnimateDiscard');
      handContainer.appendChild(resetMsg);
      tokensDom.classList.remove('cardAnimateDiscard');

      tokensDom=refreshTokens();
      tokensContainer.innerHTML='';
      tokensContainer.appendChild(tokensDom);

      if(deck.length < maxHandSize*2 ){
        resetMsg.innerText = 'Out of cards, Bet to reset.';
        deck = shuffleCards(makeDeck());
      }
      else{
        resetMsg.innerText = 'Place your bet';
      }
    }, 1500);

      console.log(`deck count: ${deck.length}`);
      betCanClick = true;
      upCanClick = true;
      downCanClick = true;
      dealCanClick = false;
      scoreCanClick = false;
      dealButton.classList.remove('button-bottom-border');
      scoreButton.classList.remove('button-bottom-border');
      betButton.classList.add('button-bottom-border');

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

  // credits.appendChild(creditTxt);
  credits.appendChild(totalPoints);

  creditContainer.appendChild(creditEffects);
  creditContainer.appendChild(totalPoints);
  // creditContainer.appendChild(credits);

  tableContainer.appendChild(table);

  topBar.appendChild(header);
  topBar.appendChild(tableButton);

  bottomBar.appendChild(betContainer);
  bottomBar.appendChild(buttonContainer);
  bottomBar.appendChild(results);
  bottomBar.appendChild(creditContainer);
  
  gameContainer.appendChild(tableContainer);
  gameContainer.appendChild(topBar);
  gameContainer.appendChild(cardContainer);
  gameContainer.appendChild(bottomBar);
  document.body.appendChild(gameContainer);
};
gameinit();
