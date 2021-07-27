/* eslint-disable no-eval */
let tokens = [];
let tokenTranslation = [];
/**
 * Adds color and translation of new tokens to tokens
 * and tokenTranslation. Adds num to bet
 * @param {*} num - number of tokens to add
 * @returns 
 */
const addTokens = (num=1) => {
  if (bet > points) {
    return;
  }
  const colors = ['biege', 'black', 'blue', 'gray', 'green', 'lightblue', 'pink', 'purple', 'red', 'white', 'yellow'];
  for(let i=0; i<num;i+=1){
    const addition = colors[getRandomInt(colors.length)];
    const translation = `${getRandomInt(12)/10}vw , ${-0.8*tokens.length+4}vw`;

    bet += 1;
    tokens.push(addition);
    tokenTranslation.push(translation);
  }

};
/**
 * removes token from token and translation arrays.
 * reduces bet by 1
 * @returns 
 */
const removeToken = () => {
  if (bet === 1) {
    return;
  }
  bet -= 1;
  tokens.pop();
  tokenTranslation.pop();
};
/**
 * Creates HTMLDivElement for tokens
 * @returns HTMLDivElement tokenContainer
 */
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
/**
 * Remake tokens and tokenTranslation
 * for new token stack 
 * @returns tokenDom
 */
const refreshTokens=()=>{
    tokens = [];  
    tokenTranslation = [];
    const betVal=bet;
    addTokens(bet);
    bet-=betVal;
    tokensDom = createtokens();
    return tokensDom;
}


/**
 * Updates token container
 * @param {HTMLDivElement} tokensContainer 
 * @param {HTMLDivElement} tokensDom 
 * @param {HTMLDivElement} tokenCount 
 * @param {int} bet 
 */
const updateTokenCon=(tokensContainer, tokensDom, tokenCount, bet)=>{
    tokensContainer.innerHTML='';
    tokensDom = createtokens();
    tokensContainer.appendChild(tokensDom);
    tokenCount.innerText = bet;
}
/**
 * Updates scoring table
 * @param {HTMLDivElement} tableContainer -enclosing element
 * @param {HTMLDivElement} table -table itself
 */
const updateTable = (tableContainer, table, highlightCriteria='') =>{

    tableContainer.innerHTML='';
    table = createTable(jackOrBetterScore, highlightCriteria);
    tableContainer.appendChild(table);
  }
/**
 * create score table for hand variation
 * @param {object} variation -Jack or better varaint
 * @param {string} wonHand - Hand from calculateScore
 * @returns table dom
 */
const createTable=(variation, wonHand='')=>{
    const table = document.createElement('table');
    const tableRow = document.createElement('tr');
    const rowHeader = document.createElement('th');
    const numCol = 5;  
    const maxNum = bet < numCol ? numCol: bet;    
    const startingBet = maxNum-numCol+1;
    
    rowHeader.innerText = 'Hand';
    tableRow.appendChild(rowHeader);
    for(let i = startingBet ; i <= maxNum; i += 1)
      {
         const rowData = document.createElement('td');
         rowData.innerText = i;
         tableRow.appendChild(rowData);
      }
    table.appendChild(tableRow);
       
    for(const hand in variation)
    {
       const tableRow = document.createElement('tr');
       const rowHeader = document.createElement('th');
       
       rowHeader.innerText = hand;
       tableRow.appendChild(rowHeader);
       //make variable to number of bets
       for(let i = startingBet ; i <= maxNum; i+=1)
       {
         const rowData = document.createElement('td');
         rowData.innerText = variation[hand]*i;
         tableRow.appendChild(rowData);
        
         if(hand == wonHand && i == bet)
         {
           rowData.classList.add('highlight-text');
           rowHeader.classList.add('highlight-text');
         }
       }
       if(hand == wonHand)
       {
         tableRow.classList.add('hightlight-row');
       }
       table.appendChild(tableRow);
    }
    return table;
  }
  /**
   * Create modal box to ask player to refill tokens
   * @returns [refillModal, refillNum, refillSubmit] which are dom elements
   */
 const refillTokens = () => {
    const refillModal = document.createElement('div');
    const refillWindow = document.createElement('div');
    const refillPrompt = document.createElement('div');
    const refillInputs = document.createElement('div');
    const refillCreditCard = document.createElement('input');
    const refillCvc = document.createElement('input');
    const refillNum = document.createElement('input');
    const refillSubmit = document.createElement('button');

    refillCvc.type ='text';
    refillCreditCard.type ='text';
    refillNum.type ='text';
    refillSubmit.innerText ='top-up';

    refillCvc.size = 3;
    refillCreditCard.size = 20;
    refillNum.size = 10;

    refillCvc.placeholder ='cvc'
    refillCreditCard.placeholder ='5105-1051-0510-5100'
    refillNum.placeholder = 1000;
    refillNum.value = 1000;

    refillPrompt.innerText='hey! not enough credits. top-up to continue winning';
   
    refillModal.classList.add('refill-overlay');
    refillWindow.classList.add('refill-window');

    refillInputs.appendChild(refillCreditCard);
    refillInputs.appendChild(refillCvc);
    refillInputs.appendChild(refillNum);
    refillInputs.appendChild(refillSubmit);

    refillWindow.appendChild(refillPrompt);
    refillWindow.appendChild(refillInputs);

    refillModal.appendChild(refillWindow);
    return [refillModal, refillNum, refillSubmit];
  }
/**
 * deals hand 
 * @param {HTMLDivElement} handContainer 
 */
  const dealHand = (handContainer)=>{
    let cardsDom = document.createElement('div');
    // For testing
    // playerHand= royalFlush;

    playerHand = dealCards(maxHandSize);
    cardsDom = createCards(playerHand);
    appendChilds(handContainer, cardsDom);
  }

  /**
   * 
   * @param {string} sign - '+' or '-'
   * @param {HTMLDivElement} creditEffects 
   * @param {HTMLDivElement} totalPoints 
   * @param {int} iter -number of iterations
   */
  const signFloat=(sign, creditEffects, totalPoints, iter )=>{
    creditEffects.innerText=sign;
    creditEffects.classList.add('sign-float');
    creditEffects.style.animationIterationCount=iter;
    creditEffects.style.animationDuration=1500/iter;
    let pointCount = 0;
    const pointInterval = setInterval(() => {
      if(pointCount === iter)
      {
        clearInterval( pointInterval );
        creditEffects.innerText = '';
        creditEffects.classList.remove('sign-float');
        return;
      }
      if(sign ==='-'){
        points -= 1;
      }
      else if(sign ==='+'){
        points += 1;
      }

      pointCount += 1;
      totalPoints.innerText = `${points} credits`;
    }, 1500 / iter);
  }
  