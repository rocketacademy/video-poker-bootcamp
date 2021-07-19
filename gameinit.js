



const gameinit=()=>{
  const dealButton = document.createElement('button');
  const scoreButton = document.createElement('button');
  // scoreButton.style='right:0px';
  scoreButton.disabled=true;
  dealButton.innerText='Deal';
  scoreButton.innerText='Score';
  cardContainer.innerHTML='';

  
  cardContainer.classList.add('cardContainer');
  //refresh deck
  dealButton.addEventListener('click',()=>{
    cardContainer.innerHTML='';
    playerHand= dealCards(maxHandSize);
    appendChilds(cardContainer, createCards(playerHand));
    dealButton.disabled=true;
    scoreButton.disabled=false;

  });

  document.body.appendChild(cardContainer);
  document.body.appendChild(dealButton);
  document.body.appendChild(scoreButton);

}
gameinit();