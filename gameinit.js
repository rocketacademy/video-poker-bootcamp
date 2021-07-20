let tokens=[];
let tokenTranslation=[];

const addTokens=()=>{
  if(bet===points){
    return;
  }
  const colors=['biege','black','blue','gray','green','lightblue','pink','purple','red','white','yellow'];
  const addition= colors[getRandomInt(colors.length)];
  const translation=`${getRandomInt(15)-5}px , ${-7*tokens.length+50}px`;
  bet+=1;
  tokens.push(addition)
  tokenTranslation.push(translation);
}
const removeToken=()=>{
  if(bet===1){
    return;
  }
  bet-=1;
  tokens.pop();
  tokenTranslation.pop();
}
const createtokens =()=>{
  const tokenContainer=document.createElement('div');
  tokenContainer.classList.add('betContainer');
  for(let i=0; i< tokens.length;i++)
  {
    const token=document.createElement('img');
    const color= tokens[i];
    const filePath= `./resources/chips/chip_${color}_flat_large.png`;
    token.style.transform=`translate(${tokenTranslation[i]})`;
    token.style.zIndex=i;
    token.style.position='absolute';
    
    // token.classList.add('betContainer');
    token.src= filePath;
    tokenContainer.appendChild(token);
  }
  return tokenContainer;
}


const gameinit=()=>{
  const header= document.createElement('h1');
  const cardContainer =document.createElement('div');
  const deckContainer=document.createElement('div');
  const faceDownImg= document.createElement('img');
  const totalPoints=document.createElement('div');

  const betContainer=document.createElement('div');
  const tokensContainer=document.createElement('div');

  const betArrows= document.createElement('div');
  const upBet=document.createElement('button');
  const downBet= document.createElement('button');

  const betButton= document.createElement('button');
  const dealButton = document.createElement('button');
  const scoreButton = document.createElement('button');
  const results= document.createElement('div');

  header.innerText='Video Poker!';
  totalPoints.innerText=points;
  scoreButton.disabled=true;
  dealButton.innerText='Deal';
  scoreButton.innerText='Score';
  betButton.innerText='Bet';
  handContainer.innerHTML='';

  deckContainer.classList.add(`card`,'cardContainer');
  handContainer.classList.add('cardContainer');
  betContainer.classList.add('betcontainer');
  betArrows.classList.add('bet-arrows');
  upBet.classList.add('arrow-up');
  downBet.classList.add('arrow-down');

  faceDownImg.src= './resources/cardFace/deck_4_large.png';
 // betButton.addEventListener
 addTokens();
 let tokensDom= createtokens(bet);
 tokensContainer.appendChild(tokensDom);
  
  upBet.addEventListener('click',()=>{
    addTokens();
    tokensContainer.removeChild(tokensDom);
    tokensDom= createtokens(bet);
    tokensContainer.appendChild(tokensDom);
  });
  downBet.addEventListener('click',()=>{
    removeToken();
    tokensContainer.removeChild(tokensDom);
    tokensDom= createtokens(bet);
    tokensContainer.appendChild(tokensDom);
  });

  //refresh deck
  dealButton.addEventListener('click',()=>{
    points-=1;
    handContainer.innerHTML='';
    //For testing
    // playerHand= doubleJack;
    playerHand=dealCards(maxHandSize);
    appendChilds(handContainer, createCards(playerHand));

    dealButton.disabled=true;
    scoreButton.disabled=false;

  });

  scoreButton.addEventListener('click', ()=>{
    let rankTally, suitTally, prize, outputString;
    [rankTally, suitTally]= tallyHand();
    [prize, outputString]=calHandScore(rankTally, suitTally);
    points+=prize;
    results.innerText=`${outputString}, your win ${prize} points`;

    setTimeout(()=>{
      document.body.innerHTML='';
      gameinit()
    }, 1000);
  })

  deckContainer.appendChild(faceDownImg);
  cardContainer.appendChild(deckContainer);
  cardContainer.appendChild(handContainer);
  betArrows.appendChild(upBet);
  betArrows.appendChild(downBet);
  
  
  betContainer.appendChild(tokensContainer);
  betContainer.appendChild(betArrows);

  document.body.appendChild(header);
  document.body.appendChild(totalPoints);

  document.body.appendChild(cardContainer);
  
  document.body.appendChild(betContainer);
  document.body.appendChild(betButton);
  document.body.appendChild(dealButton);
  document.body.appendChild(scoreButton);
  document.body.appendChild(results);

}
gameinit();