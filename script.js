
/* ---------------------------- Clobal variables ---------------------------- */
  
let deck; 

/* -------------------------------------------------------------------------- */
/*                              Helper Functions                              */
/* -------------------------------------------------------------------------- */
//<---------------Functions to make deck and give cards ---------> 
/**
 * a function that gives a deck of card 
 * @return {array}  new deck with each card contained in an object 
 */

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'A';
      } else if (cardName === '11') {
        cardName = 'J';
      } else if (cardName === '12') {
        cardName = 'Q';
      } else if (cardName === '13') {
        cardName = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};


/**
 * a function that gives a random number 
 * @param {number}
 * @return {number}  - a random number 
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * a function that shuffle cards 
 * @param {array} of cards 
 * @return {array} of cards that are shuffled 
 */
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

/** function to give 5 cards to player
 * @return {array} containing 5 cards --> each as an object 
 */
let hand = [];
const dealHand = () =>{
for (let i = 0; i < 5; i += 1) {
  hand.push(deck.pop());
}
console.log("playerHand", hand)
}

/* -------------------------------------------------------------------------- */
/*                      Check for Winning Combinations                        */
/* -------------------------------------------------------------------------- */
let order = 0
let cardNameTally = {};

/** function that creates card name as keys and freq of card appearing as value 
 * @param {array} - player hand 
 * @return {object} - tally of cards and freq of cards appearing 
 */
const createTally = (playerHand) =>{
  cardNameTally = {}
// Create Object as tally

// Loop over hand
for (let i = 0; i < playerHand.length; i += 1) {
  let cardName = playerHand[i].name;
  // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
    cardNameTally[cardName] += 1;
     }
  // Else, initialise count of this card name to 1
    else {
    cardNameTally[cardName] = 1;
    }
  }
}

/** function to check for the same suit 
 * @param {array} - player hand 
 * @return {boolean} whether running sequence exists 
 */
let flush;
const checkSameSuit = (cards) =>{
  //iterate through each card object in player hand array, 
  let cardSuits = []
  //gives an array containing the card suits 
cards.forEach(card => cardSuits.push(card.suit))
console.log(cardSuits)
//check if every suit in the array are the same 
if (cardSuits.every(suit => suit === cardSuits[0]))
 {
  flush = true 
  order =5 
}
else flush = false
}
 
let straightExist;
/**function to check for whether a running squence exist 
 * @param {object} tally --> tally of all cards 
 * @return {boolean} --> whether straight exists? 
 */

 const checkStraights = (cards) =>{
let listOfCardRank = [];
cards.forEach(card => listOfCardRank.push(card.rank))
listOfCardRank.sort(function(a,b) {return a-b})
console.log(listOfCardRank)


   //you need to sort the numbers in order from smallest to greatest
   let difference =[]
  for (let i =0; i<listOfCardRank.length-1; i+=1){
    difference.push(Math.abs(listOfCardRank[i]- listOfCardRank[i+1]))
}
if (difference.every(element => element === 1 )){
  straightExist = true 
  order =4
}
}

const checker = (cardArray,target)=> {
return cardArray.some(element => target.includes(element))
}
/**function to check for X of the same kind 
 * @param {object} tally  -- tally that records the freq of cards appearing 
 * @return {boolean} 
 */
const checkForSameKind = (tally) =>{
  let highValueCards = ["J","Q","K","A"]
  let freqOfCardAppearing = []
  console.log(tally)
 
  for (let card in tally){
    freqOfCardAppearing.push(tally[card])
    //iterate through each element in the card array and if some of them includes the highvalue card in highvaluecards array, then true

    for (let i =0; i<highValueCards.length; i+=1){
      if (card === highValueCards[i]){
        let freq =  tally[card]
        if (freq === 2){
          order =1 
        }
      }
    }
}
  //to check 4kind,3kind,2pairs
  freqOfCardAppearing.forEach(frequency => {
    if (frequency ===4){
      console.log("4kind")
      order = 7 
    }
    if (frequency ===3 ){
      console.log("3ofakind")
      order = 3
    if (freqOfCardAppearing.length ===2){
        console.log("fullhouse")
        order = 6
      }
  }
  if (frequency ===2) { 
    if (freqOfCardAppearing.length ===3){
      console.log("2pair")
      order =2 
     }
   }
  }
  )
}

const checkForStraightFlush = (cards) => {
  if(flush === true && straightExist ===true){
    order = 8 
  }
}

//if cards are of the same suits, if A exists, let A = 14
const checkForRoyalFlush = (cards) =>{
  if (flush === true){
    cards.forEach(card => {
      if (card.name ==="A"){
       card.rank = 14 
      }
    }
    )

   checkStraights(cards)
   //need to add check for straight flush if not order will be disrupted  
   checkForStraightFlush(cards)
   for(let i =0;i<cards.length;i+=1){
     if (cards[i].name ==="A" && straightExist === true){
    order =9 
  
    cards[i].rank = 1 
  }
  }
}
}
/* --------------- To Calculate score for Winning Combinations -------------- */

  //check for order of winning combo, higher number is higher value combo 
const checkForWinningCombo = (playerHand) => {
order = 0 
  //same suit and straights and X of a kind mutually exclusive - order does not matter
createTally(playerHand)
checkSameSuit(playerHand)
checkStraights(playerHand)
checkForSameKind(cardNameTally)

//the following - order does matter 
checkForStraightFlush(playerHand)
checkForRoyalFlush(playerHand)
}

//key --> order, value --> payout value 
let payout = {
  1:[1,"Jacks or better"],
  2:[2,"Two pairs"],
  3:[3,"Three of a Kind"],
  4:[4, "Straight" ],
  5:[6,"Flush" ],
  6:[9,"Full house" ],
  7:[25,"Four of a Kind" ],
  8:[50, "Straight Flush" ],
  9:[250, "Royal Flush" ],
}

let totalCredit = 100
let betAmount = 1
let win
let totalPayout = 0

const calcHandScore = (handOrder) =>{
  const betValueEl = document.getElementById("bet-amount")
    betAmount = betValueEl.innerHTML 
 for (let comboOrder in payout){
   if (handOrder == comboOrder){
     win = true 
     let comboPayout = payout[handOrder][0]

     if (handOrder ===9 && betAmount ===5){
       comboPayout =800
      } 
    
     totalPayout += betAmount*comboPayout
     totalCredit += totalPayout
   }
   else win = false 
 }
 if (!win){
   totalCredit -= betAmount
 }
} 


/* -------------------------------------------------------------------------- */
/*                              DOM Manipulation                              */
/* -------------------------------------------------------------------------- */
const modal = document.getElementsByClassName("modal")[0]
const closeBtn = document.getElementsByClassName("close")[0]
const playInstructions = document.getElementsByTagName("i")[0]

const messageDiv = document.createElement("div")
const cardEl = document.getElementsByClassName("card")
const payoutRow = document.getElementsByClassName("payout-row")

const decreaseBet = document.getElementById("decrease-bet")
const increaseBet = document.getElementById("increase-bet")

const dealBtn = document.getElementById("deal-btn")

let betInputEl = document.querySelector("#bet-amount")
const payoutColumn = document.querySelectorAll(".payout-column")
const royalFlushEl =document.getElementById("royal-flush")

const coinAudio = document.getElementById("coin-sound")
const playCardSound = document.getElementById("deal-card")
const backgroundMusic = document.getElementById("autoplay")
const winValue = document.getElementsByClassName("win-value")

 /* ------------------------- To show gameplay- modal ------------------------ */
playInstructions.onclick = function(){
  modal.style.display = "block"
}

closeBtn.onclick=function(){
    modal.style.display = "none"
}

window.onclick=function(e){
  console.log(e.target)
  if(e.target == modal){
    modal.style.display = "none"
  }
}


/**Function to show total credits on page 
 * @return {string} - to show credit on page 
 */
const calculateTotalCredits = () =>{
  const creditEl = document.getElementById("credits-value")
  console.log(totalCredit)
  creditEl.innerHTML = totalCredit
}

/** Function to show message of win/lose
 * @param {number} - which order does the card combo belongs to 
 * @return {String} - lose/win message
 */
const showMessageDiv =(handOrder) =>{
 messageDiv.classList.add("message")

for (let comboOrder in payout){
  if (handOrder == comboOrder){
     const winAudio = document.getElementById("win-sound")
  winAudio.play()
    console.log(payoutRow)
    payoutRow[9-handOrder].classList.add("win-row")
    messageDiv.innerHTML = `${handOrder}. ${payout[handOrder][1]}`
    winValue[0].innerHTML = `+${totalPayout}`
  }
}
if (handOrder ==0) {
  const loseAudio = document.getElementById("lose-sound")
  winValue[0].innerHTML = `-${betAmount}`
  console.log(winValue)
  loseAudio.play()
  
  let loseMsg = `Sorry, no luck this time round!<br> Play the deal button to start the game again`
  messageDiv.innerHTML = loseMsg
}

const cardsLayoutEl = document.getElementById("cards-display")
cardsLayoutEl.appendChild(messageDiv)

//to restart the dom card manipualtion 
console.log(cardEl)
for (let i =0; i<cardEl.length;i+=1){
  cardEl[i].removeEventListener("click", holdCards)
  if (cardEl[i].classList.contains("flip")){
    cardEl[i].classList.remove("flip")
  }
  if (cardEl[i].classList.contains("clicked", "hold-show")){
    cardEl[i].classList.remove("clicked", "hold-show")
  }

  const hideEl = document.createElement("hide")
  hideEl.innerHTML= "Hold"
  hideEl.classList.add("hide")
  cardEl[i].appendChild(hideEl)
}

  setTimeout(()=>{
    winValue[0].innerHTML = ""
  },2500)
}

/**Function to display card images on page 
 * @param {array} playerHand 
 */
const showPlayerCards = (playerHand) =>
{
console.log(cardEl)
//to show cards one by one using setTimeout 
for (let i =0; i<cardEl.length; i+=1){
  let k=i
  setTimeout(()=>{
   cardEl[i].style.backgroundImage = `url(Images/card-images-52/${playerHand[i].name}_of_${playerHand[i].suit}.png`
   console.log(playCardSound)
   playCardSound.play()
  cardEl[i].classList.add('flip')
   cardEl[i].addEventListener("click", holdCards)
},700*(k+1))
}

for (let j =0;j<payoutRow.length; j+=1){
  if (payoutRow[j].classList.contains("win-row")){
    payoutRow[j].classList.remove("win-row")
  }
}

decreaseBet.disabled = true;
increaseBet.disabled = true;
}

//function to decrease bet amount and show amount on page 
const decreaseBetAmount = () =>{
  coinAudio.play()
betAmount -=1 
if (betAmount<= 1){
  betAmount =1 
}

betInputEl.innerHTML = betAmount
console.log(payoutColumn)

for (let i =0;i<payoutColumn.length;i+=1){
  payoutColumn[i].innerHTML = `${betAmount}x${payout[9-i][0]}`
}

if (betAmount <5){
royalFlushEl.innerHTML = "x250"
}
}

//function to increase bet amount and show amount on page 
const increaseBetAmount = () =>{
  coinAudio.play()
betAmount +=1 
if (betAmount >=5){
  betAmount =5 
}
betInputEl.innerHTML = betAmount

for (let i =0;i<payoutColumn.length;i+=1){
  payoutColumn[i].innerHTML = `${betAmount}x${payout[9-i][0]}`
}
 
if (betAmount ===5){
 payoutColumn[0].innerHTML = `${betAmount}x800`
 console.log(royalFlushEl)
 royalFlushEl.innerHTML = "x800"
}

}

//function to hold cards --> to click and unclick cards
const holdCards = (e) =>{
  const holdAudio = document.getElementById("hold-sound")
  holdAudio.play()
//check which is the card that was clicked, 
let clickedEl = e.target
console.log("clickedEl", clickedEl)
if (!clickedEl.classList.contains("clicked")){
  clickedEl.classList.remove("flip")
  clickedEl.classList.add("clicked")
}
else 
{
clickedEl.classList.remove("clicked")
}
}

/**function when called will show new cards that are clicked (hold)
 */
const makeNewHand = () =>{
  firstGame = false 
let holdEl = document.getElementsByClassName("clicked")
let numberOfCardsHold =  holdEl.length
messageDiv.classList.remove("hidden")
let newCards = []

//to make cards return to original position 
for (let i=0;i<holdEl.length;i+=1){
  holdEl[i].classList.add("hold-show")
}
//to deal new cards depending on how many cards need to be changed
for (let i =0;i<(5-numberOfCardsHold);i+=1){
   newCards.push(deck.pop());
}

//find cards that are not clicked 
const notClickedCards = document.getElementsByClassName("flip")
console.log(notClickedCards)


 let indexOfClickedElements =[]
for (let i=0;i<notClickedCards.length;i+=1){
  
notClickedCards[i].style.backgroundImage=`url(Images/background-image2.jpg)`
notClickedCards[i].style.backgroundImage = `url(Images/card-images-52/${newCards[i].name}_of_${newCards[i].suit}.png`
console.log(cardEl)

 //to find out how many cards are clicked 
}

for (let k=0;k<cardEl.length;k+=1){
if(cardEl[k].classList.contains("clicked")){
  //to remove the hold element 
  cardEl[k].innerHTML = ""
    indexOfClickedElements.push(k)
}
}

console.log(indexOfClickedElements)
//to find out which cards are not changed (hold not clicked)
let exisitingCards = []
indexOfClickedElements.forEach(index => 
exisitingCards.push(hand[index])
  )

//to get the new set of cards by combining new cards and exisiting cards array 
 let newSetHand = [...newCards,...exisitingCards]
console.log(newSetHand)
checkForWinningCombo(newSetHand)
 calcHandScore(order)
showMessageDiv(order)
calculateTotalCredits()
 console.log(totalCredit)


 decreaseBet.disabled = false;
increaseBet.disabled = false;
}

const restartGame = () =>{
  messageDiv.classList.add("hidden")
  console.log(messageDiv)

}

let firstGame = true ;
const initGame = () =>{
  for (let i =0; i<cardEl.length; i+=1){
   cardEl[i].style.backgroundImage = `url(Images/background-image2.jpg)`
  }
  if (!firstGame ) {
 restartGame()}
 deck = shuffleCards(makeDeck());
  hand =  []
  dealHand()
 showPlayerCards(hand)
 console.log("secondgame", cardEl)
 
}
 
decreaseBet.addEventListener("click",decreaseBetAmount)
increaseBet.addEventListener("click",increaseBetAmount)

dealBtn.addEventListener("click", function(){
  if(this.value === "1"){
    initGame()
    this.value = "2"
  }
  else if (this.value =="2"){
    makeNewHand()
    this.value = "1"

  }
})

const audioBtn = document.getElementById("audio-icon")
let audioOn = true

audioBtn.addEventListener("click",function(){
  if (audioOn ===true){
backgroundMusic.pause()
audioBtn.classList.remove("fa-volume-up")
audioBtn.classList.add("fa-volume-off")
audioOn=false
  }
else {
 backgroundMusic.play()
  audioBtn.classList.remove("fa-volume-off")
  audioBtn.classList.add("fa-volume-up")
  audioOn=true

}

  })