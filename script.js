const makeDeck = () => {  
  const newDeck = [];  
  const suits = ['heart', 'diamond', 'club', 'spade'];
  
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {    
    const currentSuit = suits[suitIndex];
    
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      
      let cardName = `${rankCounter}`;

      if (cardName === '1') {
        cardName = 'ace';        
      } else if (cardName === '11') {
        cardName = 'jack';
      } else if (cardName === '12') {
        cardName = 'queen';
      } else if (cardName === '13') {
        cardName = 'king';
      }

      let cardImg = currentSuit+cardName +".png"      

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,    
        img: cardImg    
      };
      
      console.log(card.img)
      newDeck.push(card);
    }
  }

  return newDeck;
};

const getRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleCards = (cards) => {  
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    
    const randomIndex = getRandomIndex(cards.length);    
    const randomCard = cards[randomIndex];    
    const currentCard = cards[currentIndex];    
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }  
  return cards;
};

let outputMessage = (message) => {
  document.getElementById('container-message').innerHTML = message
};

const reset = () => {
  gameMode = 'bet'
  playerBet = 0;
  playerHand.splice(0, playerHand.length)
  double = 0;
  triple = 0;
  quadruple = 0;
  straight = false;
  flush = false;
  royalStraight = false;
  cardInHand1.src = ('cardback.png')
  cardInHand2.src = ('cardback.png')
  cardInHand3.src = ('cardback.png')
  cardInHand4.src = ('cardback.png')
  cardInHand5.src = ('cardback.png')
  document.getElementById('display-points').innerHTML = playerPoints 
}

const drawPhase = () => {

 if (playerHand.length <1 && playerBet !== 0 && gameMode === 'draw') { 

  const deck = shuffleCards(makeDeck());  

  outputMessage ("Click on any card to trade for a different one. <br><br> Your can only do this once per card, think carefully. <br><br> Click 'Confirm' when you are ready.") 

  for (counter = 0; counter < 5; counter +=1){
    playerHand.push(deck.pop())    
  }

  console.log(playerHand, "Cards Drawn")  
  
  cardInHand1.src = playerHand[0].img
  cardInHand1.addEventListener("click", ()=>{    
  playerHand.splice(0,1,deck.pop())            
  cardInHand1.src = playerHand[0].img
  },{once : true}); 
  document.getElementById("display-card").appendChild(cardInHand1); 

  
  cardInHand2.src = playerHand[1].img
  cardInHand2.addEventListener("click", ()=>{    
  playerHand.splice(1,1,deck.pop())     
  cardInHand2.src = playerHand[1].img     
  },{once : true});     
  document.getElementById("display-card").appendChild(cardInHand2);
  
  cardInHand3.src = playerHand[2].img
  cardInHand3.addEventListener("click", ()=>{    
  playerHand.splice(2,1,deck.pop())       
  cardInHand3.src = playerHand[2].img    
  },{once : true}); 
  document.getElementById("display-card").appendChild(cardInHand3);

  cardInHand4.src = playerHand[3].img
  cardInHand4.addEventListener("click", ()=>{    
  playerHand.splice(3,1,deck.pop())        
  cardInHand4.src = playerHand[3].img     
  },{once : true}); 
  document.getElementById("display-card").appendChild(cardInHand4);
  
  cardInHand5.src = playerHand[4].img
  cardInHand5.addEventListener("click", ()=>{    
  playerHand.splice(4,1,deck.pop())        
  cardInHand5.src = playerHand[4].img     
  },{once : true}); 
  document.getElementById("display-card").appendChild(cardInHand5);    

  gameMode = 'check'
  }  
}

const checkWin = () =>{  
if (gameMode === 'check'){
  var cardNameTally = {};

    for (let i = 0; i < playerHand.length; i += 1) {
      var cardName = playerHand[i].name;  

    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }  
    else {
    cardNameTally[cardName] = 1;
      }
    }
 
  var cardSuitTally = {};

    for (let i = 0; i < playerHand.length; i += 1) {
      var cardSuit = playerHand[i].suit;
  
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }  
    else {
    cardSuitTally[cardSuit] = 1;
      }
    }  
    
  const nameTallyArrayKey = Object.keys(cardNameTally); 
  console.log(nameTallyArrayKey)
  const nameTallyArrayValue = Object.values(cardNameTally);
  console.log(nameTallyArrayValue)

  const suitTallyArrayKey = Object.keys(cardSuitTally);
  console.log(suitTallyArrayKey)
  const suitTallyArrayValue = Object.values(cardSuitTally);
  console.log(suitTallyArrayValue)

// Check hand for same card type  
for (let i = 0; i < nameTallyArrayValue.length; i += 1) {
  if (nameTallyArrayValue[i] === 2){
    double += 1
  }  
  if (nameTallyArrayValue[i] === 3){  
    triple += 1
  }
  if (nameTallyArrayValue[i] === 4){  
    quadruple += 1
  }
}

// Check hand for same suit
for (let i = 0; i < suitTallyArrayValue.length; i += 1) {
  if (suitTallyArrayValue[i] === 5){
    flush = true;
  }    
}

  const newArray =[...nameTallyArrayKey]
  console.log(newArray)

  for (let i = 0; i < newArray.length; i += 1) {
    if (newArray[i] === 'jack'){
      newArray.splice(i, 1, "11")
    }
     if (newArray[i] === 'queen'){
      newArray.splice(i, 1, "12")
    }
     if (newArray[i] === 'king'){
      newArray.splice(i, 1, "13")
    }        
     if (newArray[i] === 'ace'){
      newArray.splice(i, 1, "14")
    }    
    
    newArray.sort((a,b)=>{return a-b})        
  }

  if (newArray.length === 5){
    if ((newArray[0] === newArray[1]-1) && (newArray[1] === newArray[2]-1) && (newArray[2] === newArray[3]-1) && (newArray[3] === newArray[4]-1)){
        straight = true;
    }

    if ((newArray[0] === "10") && (newArray[0] === "11") && (newArray[0] === "12") && (newArray[0] === "13") && (newArray[0] === "14")){
        royalStraight = true;
    }
    console.log(newArray)
   }   
  
  if ((double === 0) && (triple === 0) && (quadruple === 0) && (straight === false) && (flush === false) && (royalStraight === false)){          
    playerPoints = playerPoints;
    reset()    
    outputMessage ("YOU LOST THIS ROUND...")
  }  

  if (double === 1 && triple === 0 && flush === false) {
    playerPoints += playerBet * 2    
    reset()  
    outputMessage ("PAIR ! <br><br> BET PAYOUT ˣ 2")  
  }

  if (double === 2 && flush === false) {
     playerPoints += playerBet * 4
    reset()   
    outputMessage ("TWO PAIRS !! <br><br> BET PAYOUT ˣ 4")     
  }

  if (triple === 1 && double === 0 && flush === false) {
    playerPoints += playerBet * 3
    reset()    
    outputMessage ("THREE OF A KIND !!! <br><br> BET PAYOUT ˣ 3")      
  }

  if (double === 1 && triple === 1) {
    playerPoints += playerBet * 9
    reset()    
    outputMessage ("FULL HOUSE ! <br><br> BET PAYOUT ˣ 9")     
  }

   if (quadruple === 1) {
    playerPoints += playerBet * 25
    reset()    
    outputMessage ("FOUR OF A KIND !!!! <br><br> BET PAYOUT ˣ 25")       
  }

   if (flush === true && straight === false && double !== 1 && triple !== 1) {
    playerPoints += playerBet * 6
    reset()    
    outputMessage ("FLUSH ! <br><br> BET PAYOUT ˣ 6")      
  }

    if (flush === false && straight === true) {
    playerPoints += playerBet * 4  
    reset()    
    outputMessage ( "STRAIGHT ! <br><br> BET PAYOUT ˣ 4")     
  }

    if (flush === true && straight === true) {
    playerPoints += playerBet * 50
    reset()    
    outputMessage ( "STRAIGHT FLUSH ! <br><br> BET PAYOUT ˣ 50")      
  }

    if (flush === true && straight === false && royalStraight === true) {
    playerPoints += playerBet * 250
    reset()    
    outputMessage ( "ROYAL FLUSH !! <br><br> BET PAYOUT ˣ 250")  
  }     
 }
}

let gameMode = 'bet'
let playerPoints = 100;
let playerBet = 0;
const playerHand = [];

let double = 0;
let triple = 0;
let quadruple = 0;
let straight = false;
let flush = false;
let royalStraight = false;

  document.getElementById('display-points').innerHTML = playerPoints   

  const input = document.getElementById('bid')

  const enterBet = (input) => {
    playerBet = input;
  }

  const convertInputPoints = () => {
    playerBet = Number(input.value)
    if (gameMode === 'bet'){
      if (playerBet > playerPoints)  {
        playerBet = 0;        
        document.getElementById('display-points').innerHTML = playerPoints         
        outputMessage ("The guards are watching... <br><br> Please enter a bet within your limits.")      
      }     
      
      if (isNaN(playerBet)) {
        playerBet = 0;        
        document.getElementById('display-points').innerHTML = playerPoints         
        outputMessage ("The guards are watching... <br><br> Please enter a number as your bet.")      
      }  
      
      if (playerBet > 0){
      playerPoints -= playerBet 
      gameMode = 'draw'     
      outputMessage ("You Bet " + playerBet + " Points. <br><br> Proceed to Deal Cards.")  
      document.getElementById('display-points').innerHTML = playerPoints             
      console.log(playerBet)     
      console.log(gameMode)  
      }     

      if (gameMode==='bet' && playerPoints === 0){
      window.location.href="gg.mp4";
      }

      if (gameMode==='bet' && playerPoints === 10000){
      window.location.href="win.mp4";
      }
   }    
  }  

  outputMessage ("Help Sang-woo survive by winning in poker. <br><br> You start with 100 Points. <br><br> Place your bet, then deal cards.")

  const betButton = document.querySelector ('.button-bid')
  betButton.addEventListener("click", convertInputPoints)  

  const drawButton = document.querySelector ('.button-draw')
  drawButton.addEventListener("click", drawPhase)

  const swapButton = document.querySelector ('.button-swap')
  swapButton.addEventListener("click", checkWin)

  const cardInHand1 = document.createElement('img')  
  cardInHand1.classList.add('cardStyle') 
  cardInHand1.src = ('cardback.png')
  document.getElementById("display-card").appendChild(cardInHand1); 

  const cardInHand2 = document.createElement('img')  
  cardInHand2.classList.add('cardStyle') 
  cardInHand2.src = ('cardback.png')
  document.getElementById("display-card").appendChild(cardInHand2); 

  const cardInHand3 = document.createElement('img')  
  cardInHand3.classList.add('cardStyle') 
  cardInHand3.src = ('cardback.png')
  document.getElementById("display-card").appendChild(cardInHand3); 

  const cardInHand4 = document.createElement('img')  
  cardInHand4.classList.add('cardStyle') 
  cardInHand4.src = ('cardback.png')
  document.getElementById("display-card").appendChild(cardInHand4); 

  const cardInHand5 = document.createElement('img')  
  cardInHand5.classList.add('cardStyle') 
  cardInHand5.src = ('cardback.png')
  document.getElementById("display-card").appendChild(cardInHand5); 
