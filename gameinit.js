

const gameinit = () => {

  //dom elements creation
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
  const resetMsg= document.createElement('div');

  const creditContainer=document.createElement('div');
  const creditEffects= document.createElement('div');
  const totalPoints = document.createElement('div');


  //dom elements innertext
  header.innerText = 'Video Poker!';
  faceDownImg.src = './resources/cardFace/deck_4.png';
  tableButton.innerText='Scoring table';
  resetMsg.innerText='Bet to start';

  betButton.innerText='Bet';
  dealButton.innerText = 'Deal';
  scoreButton.innerText = 'Score';
  totalPoints.innerText = `${points} credits`;
  
  //dom elements styling
  gameContainer.classList.add('game-container');
  
  topBar.classList.add('top-bar');
  deckContainer.classList.add('card','box-shadow');
  header.classList.add('inline-block'); 
  
  tableContainer.classList.add('table-container');
  tableButton.classList.add('large-button','button-bottom-border','table-button');

  cardContainer.classList.add('middle-bar');
  handContainer.classList.add('hand-container');
  
  bottomBar.classList.add('bottom-bar');

  tokensContainer.classList.add('inline-block', 'tokencontainer');
  betArrows.classList.add('bet-arrows');
  upBet.classList.add('arrow-up');
  downBet.classList.add('arrow-down');

  buttonContainer.classList.add('inline-block','button-container');
  betContainer.classList.add('betcontainer');
  betButton.classList.add('inline-block', 'large-button','button-bottom-border');
  dealButton.classList.add('inline-block', 'large-button');
  scoreButton.classList.add('inline-block', 'large-button');

  results.classList.add('inline-block','results');
  resetMsg.classList.add('resetMessage');

  creditContainer.classList.add('credit-container');
  creditEffects.classList.add('credit-effects', 'inline-block');
 
  totalPoints.classList.add('inline-block');

  

  //can click series
  let upCanClick=true;
  let downCanClick=true;
  let betCanClick=true;
  let dealCanClick=false;
  let scoreCanClick=false;
  let isTableHidden=false;

  tableButton.addEventListener('click',()=>{
    const tableSound= new Audio('./resources/sounds/Select_007.wav');
    tableSound.volume=0.3;
  
    tableSound.play();
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
    if(bet + 1 > points)
    {
      refillModal.style.display ='block';
      return;
    }
    addTokens();
    const upCoinSound= new Audio('./resources/sounds/chipLay2.wav')
    upCoinSound.play();
    
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
    const upCoinSound= new Audio('./resources/sounds/chipLay1.wav')
    upCoinSound.play();

    tokensContainer.removeChild(tokensDom);
    tokensDom = createtokens();
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;

    tableContainer.removeChild(table);
    table = createTable(jackOrBetterScore);
    tableContainer.appendChild(table);
  });


  let cardsDom = document.createElement('div');
  betButton.addEventListener('click', () => {
    if(!betCanClick){
      return;
    }
    if(bet > points || bet == 0)
    {
      refillModal.style.display='block'
      const alertSound = new Audio('./resources/sounds/Jump_003.wav')
      alertSound.volume = 0.4;
      alertSound.play();
      return;
    }
    handContainer.innerHTML = '';

    const deckOutSound= new Audio('./resources/sounds/cardTakeOutPackage1.wav')
    deckOutSound.play();
    
    // For testing
    // playerHand= royalFlush;

    //redeal hands
    playerHand = dealCards(maxHandSize);
    cardsDom = createCards(playerHand);
    appendChilds(handContainer, cardsDom);
   
    upCanClick=false;
    downCanClick=false;

    betCanClick=false;
    dealCanClick=true;

    deckContainer.classList.remove('cardAnimateDiscard');  //if deck has been reset
    handContainer.classList.remove('cardAnimateDiscard');
    handContainer.classList.add('cardAnimateOpenNew');
    betButton.classList.remove('button-bottom-border');
    dealButton.classList.add('button-bottom-border');
    

    creditEffects.innerText='-';
    creditEffects.classList.add('sign-float');
    creditEffects.style.animationIterationCount=bet;
    creditEffects.style.animationDuration=1500/bet;
    let pointCount = 0;
    const pointInterval = setInterval(() => {
      if(pointCount === bet)
      {
        clearInterval( pointInterval );
        creditEffects.innerText = '';
        creditEffects.classList.remove('sign-float');
        return;
      }
      points -= 1;
      pointCount += 1;
      totalPoints.innerText = `${points} credits`;
    }, 1500 / bet);
  })

  let cardNodes=[];
  let consecutiveDeals=0;
  dealButton.addEventListener('click', () => {
    if(!dealCanClick)
    {
      return;
    }
    if (consecutiveDeals === 0) {
      const flipCard= new Audio('./resources/sounds/cardPlace2.wav')
      flipCard.play();

      results.innerText='click on card to hold';

      cardNodes=[]
      consecutiveDeals+=1;
      const inners = document.querySelectorAll('div.card-inner');

      //apply card flip to each card in handcontainer
      [].forEach.call( inners , function(card) {
        card.classList.add('card-flip');
        cardNodes.push(card.parentNode)
      })
    }
    else if(consecutiveDeals === 1){
      results.innerText='';
      replaceUnheldCards(cardNodes);
      consecutiveDeals=0;
      dealCanClick=false;
      dealButton.classList.remove('button-bottom-border');
    }

    scoreCanClick=true;
    scoreButton.classList.add('button-bottom-border');
    deckContainer.classList.remove('cardAnimateDiscard');
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

    totalPoints.innerText =`${points} credits`;
  
    if(prize>0)
    {
      const coinAdd = new Audio('./resources/sounds/Coins_Pouring_01.mp3')
      coinAdd.play();

      const winSound = new Audio('./resources/sounds/win.wav')
      winSound.volume = 0.2;
      winSound.play();
      
      results.innerText = `${outputString}, you win ${prize} points`;

      creditEffects.innerText = '+';
      creditEffects.classList.add('sign-float');
      creditEffects.style.animationIterationCount = prize;
      creditEffects.style.animationDuration = 1500/prize;
      
      let pointCount=0;
      const pointPosInterval = setInterval(() => {
        if(pointCount === prize)
        {
          clearInterval(pointPosInterval);
          creditEffects.innerText = '';
          creditEffects.classList.remove('sign-float');
          return;
        }
        points += 1;
        totalPoints.innerText = `${points} credits`;
        pointCount += 1;
    }, 1500/prize);
    }
    else{
      const loseSound=new Audio('./resources/sounds/Jump_004.wav')
      loseSound.volume=0.1;
      loseSound.play();
      results.innerText = `${outputString}`;
    }
    
    //highlight table hand
    if(!isTableHidden){
    tableContainer.removeChild(table);
    table = createTable(jackOrBetterScore,outputString);
    tableContainer.appendChild(table);
    }

    //1s
    handContainer.classList.remove('cardAnimateOpenNew');
    setTimeout(()=>{
        tokensDom.classList.add('cardAnimateDiscard');
        handContainer.classList.add('cardAnimateDiscard');
        if(deck.length < maxHandSize*2 ){
        deckContainer.classList.add('cardAnimateDiscard');}
    },1000)

    //1.5s
    setTimeout(() => {
      handContainer.classList.remove('cardAnimateDiscard');
      handContainer.innerHTML = '';
      handContainer.appendChild(resetMsg); 
     
      const tokenResetSound= new Audio('./resources/sounds/chipsStack6.wav')
      tokenResetSound.play();

      tokensDom=refreshTokens();
      tokenCount.innerText = bet;
      tokensDom.classList.remove('cardAnimateDiscard');
      tokensContainer.innerHTML='';
      tokensContainer.appendChild(tokensDom);

      if(deck.length < maxHandSize*2 ){
        const resetSound = new Audio('./resources/sounds/Randomize9.wav')
        resetSound.volume = 0.2;
        resetSound.play();

        resetMsg.innerText = 'Out of cards, Bet to reset.';
        deck = shuffleCards(makeDeck());
      }
      else{
        resetMsg.innerText = 'Place your bet';
      }
    }, 1500);

    //2.5s
    setTimeout(()=>{
      results.innerText='';
      if(!isTableHidden){
      tableContainer.removeChild(table);
      table = createTable(jackOrBetterScore);
      tableContainer.appendChild(table);
      }
    },2500)

      betCanClick = true;
      upCanClick = true;
      downCanClick = true;
      dealCanClick = false;
      scoreCanClick = false;
      dealButton.classList.remove('button-bottom-border');
      scoreButton.classList.remove('button-bottom-border');
      betButton.classList.add('button-bottom-border');
  });

  
  let refillModal, refillNum, refillSubmit;
  [refillModal, refillNum, refillSubmit] = refillTokens();

  refillSubmit.addEventListener('click', ()=>{
    let numInput = Number(refillNum.value);

    if(Number.isNaN(numInput)){ 
      refillNum.value='';
      refillNum.placeholder='Key in a number'
      refillModal.appendChild(errorMsg);
    }
    else{ 
      const addCoinSounds= new Audio('./resources/sounds/Coins_Several_18.mp3');
      addCoinSounds.play();

      creditEffects.innerText='+';
      creditEffects.classList.add('sign-float');
      creditEffects.style.animationIterationCount = numInput;
      creditEffects.style.animationDuration = 1500/numInput;
      
      let pointCount = 0;
      const pointTopInterval = setInterval(() => {
        if(pointCount === numInput)
        {
          clearInterval(pointTopInterval);
          creditEffects.innerText = '';
          creditEffects.classList.remove('sign-float');
          return;
        }
        points += 1;
        totalPoints.innerText = `${points} credits`;
        pointCount += 1;
    }, 1500/numInput);
    
      refillModal.style.display='none';
      refillNum.value='';
    }
  })

  //dom elements append to doc
  deckContainer.appendChild(faceDownImg);
  handContainer.appendChild(resetMsg);
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

  creditContainer.appendChild(creditEffects);
  creditContainer.appendChild(totalPoints);
  
  let table = createTable(jackOrBetterScore);
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

  gameContainer.appendChild(refillModal);

  document.body.appendChild(gameContainer);
};
gameinit();
