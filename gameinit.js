



const gameinit=()=>{
  const header= document.createElement('h1');
  const totalPoints=document.createElement('div');
  const dealButton = document.createElement('button');
  const scoreButton = document.createElement('button');
  const results= document.createElement('div');
  header.innerText='Video Poker!';
  totalPoints.innerText=points;
  scoreButton.disabled=true;
  dealButton.innerText='Deal';
  scoreButton.innerText='Score';
  cardContainer.innerHTML='';

  
  cardContainer.classList.add('cardContainer');
  //refresh deck
  dealButton.addEventListener('click',()=>{
    points-=1;
    cardContainer.innerHTML='';
    //For testing
    // playerHand= doubleJack;
    playerHand=dealCards(maxHandSize);
    appendChilds(cardContainer, createCards(playerHand));

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
  document.body.appendChild(header);
  document.body.appendChild(totalPoints);
  document.body.appendChild(cardContainer);
  document.body.appendChild(dealButton);
  document.body.appendChild(scoreButton);
  document.body.appendChild(results);

}
gameinit();