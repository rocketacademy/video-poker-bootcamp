

const cardContainer = document.getElementById("card-container")
const cardsInContainer = document.getElementsByClassName("card")
const cardsBackInContainer = document.getElementsByClassName("cardback")

const resetButton = document.getElementById("reset")
const winRate = document.getElementById("winrate")

const cardName = document.getElementsByClassName("name")
const cardSuit = document.getElementsByClassName("suit")
const cardBody = document.getElementsByClassName("body")
const holdText = document.getElementsByClassName("hold")

const pointsAmt = document.getElementById("points")

let hold = false;
let playerHand = Array(5).fill(hold)
let pointsNum = 100
let gamesPlayed = 0
let gamesWon = 0
let gameEnd = false

pointsAmt.innerText = `Points: ${pointsNum}`

/**
 * A function to generate a random index ranging from 0 (inclusive) to max (exclusive).
 * @param max {number} maximum number (exclusive)
 * @returns  random index
 */

const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * A function to shuffle an array of cards
 * @param cards {array} 
 * @returns {array} the shuffled deck
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

/**
 * A function to make a deck
 * @returns {array} an unshuffled deck
 */

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const symbols = ['♥', '♦', '♣', '♠']

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const suitSymbol = symbols[suitIndex]
    let colour = "black"
    if(suitIndex <= 1){
      colour = "red"
    } 

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
        suitSymbol,
        rank: rankCounter,
        colour,
        hold
      };
      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/**
 * A function to deal cards such that a player always has 5 cards in hand
 * @param playerHand {array} number of cards already in hand 
 * checks if there are any cards in hand and / or whether player has chosen to hold the card
 * replace cards that are not marked as hold
 * @returns 5 cards
 */


 
// let pointsList = [
//   {hand:'royal flush', points: 250},
//   {hand: 'straight flush', points: 50},
//   {hand: 'four of a kind', points: 25},
//   {hand: 'fullhouse', points: 9},
//   {hand: 'flush', points: 6},
//   {hand: 'straight', points: 4},
//   {hand: 'three of a kind', points: 3},
//   {hand: 'two pair', points: 2},
//   {hand: 'jacks or better', points: 1},
//   {hand: 'lose', points:0}]

let index = []

/**
 * A function to check for flushes and straights
 * @param {array} playerHand 
 * returns if hand is straight flush, flush, or straight
 */
const flushCheck = (playerHand)=>{
  
  playerHand.sort((a, b) => parseFloat(a.rank) - parseFloat(b.rank));
  const suitTally = new Set(playerHand.map(function (hand) {
    return hand.suit
  }))

  let flushCount = 0
  for (let i =1 ; i < playerHand.length; i +=1){
    if(playerHand[i-1].rank + 1 === playerHand[i].rank){
      flushCount += 1
    }
  }

  if(suitTally.size === 1){
    index.push(4)
    // console.log(`flush`)
    if(flushCount === 4){
      index.push(1)
      // console.log(`straight flush`)
    }
    if(playerHand[0].rank + 12 === playerHand[4].rank && flushCount === 3){
      index.push(0)
    }
  } else {
    if(playerHand[0].rank + 12 === playerHand[4].rank && flushCount === 3 || (flushCount === 4)){
      index.push(5)
      // console.log(`straight`)
    }
  }
  console.log(index)
}

/**
 * A function to check for situations where there is >=2 of the same cardRank
 * @param {array} playerHand 
 * returns all other conditions except high card
 */
const cardTally = (playerHand) =>{
  let cardRankTally = {}
  // Loop over hand
  for (let i = 0; i < playerHand.length; i += 1) {
    let cardRank = playerHand[i].rank;
    // If we have seen the card name before, increment its count
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    }
    // Else, initialise count of this suit name to 1
    else {
      cardRankTally[cardRank] = 1;
    }
  }
  console.log(cardRankTally)
  
  let uniqueCardRanks = Object.keys(cardRankTally).length
  let [key1, value1] = Object.entries(cardRankTally)[0]
  let [key2, value2] = Object.entries(cardRankTally)[1]
  console.log(uniqueCardRanks)

  if(uniqueCardRanks === 5){
    index.push(9)
    console.log('lose')
    
  }
  //either four of a kind or full house
  if(uniqueCardRanks === 2){
    //four of a kind
    if(value1 === 4 || value2 === 4){
      index.push(2)
      // console.log("four of a kind")
    } else {
      //fullhouse
      index.push(3)
      // console.log("fullhouse")
    } 
  } 
  //either three of a kind or 2 pair
  else if (uniqueCardRanks === 3){
    if (value1 === 2 || value2 === 2){
      index.push(7)
      // console.log("two pair")
    } else{
      index.push(6)
      // console.log("three of a kind")
    }
  } 
  else if (uniqueCardRanks === 4){
    let highPair;
    for (cardRank in cardRankTally){
      if(cardRankTally[cardRank] === 2){
        highPair = cardRank
      }
      console.log(highPair)
    }
    if(highPair >= 11 || highPair == 1){
      index.push(8)
      console.log('jacks or better')
    } else{
      index.push(9)
      console.log('lose')
    }
    
  }
  console.log(index)
}

/**
 * A function to for output to abstract complexity of DOM manipulation away from game logic
 * @param {string} message 
 */
const output = (message) => {
  document.getElementById("results").innerText = message
};

/**
 * A function to check player's hand for number of cards & number of desginated 'hold' cards and to return the required number of cards.
 * Also checks hand for end score afterthe second 'deal'
 * @param {array} playerHand 
 * returns player's hand with 5 cards
 */
const deal = (playerHand) =>{

  for (let i = 0; i < playerHand.length; i +=1){
    
    holdText[i].innerText = ""
    if( playerHand[i] === false || playerHand[i].hold === false){
      console.log(playerHand)

      if(playerHand[i].hold === false){
        
        cardsInContainer[i].classList.toggle("toggle-full")
      }

      cardName[i].innerText = ""
      cardSuit[i].innerText = ""
      cardBody[i].innerText = ""
      playerHand[i] = deck.pop()
      cardsInContainer[i].classList.remove("red", "black")
      
      cardName[i].innerText = playerHand[i].name
      cardSuit[i].innerText = playerHand[i].suitSymbol
      cardBody[i].innerText = playerHand[i].suitSymbol
      cardsInContainer[i].classList.add(playerHand[i].colour)
      
      let holdClick = 0

      if(gameEnd === false){

      cardsInContainer[i].addEventListener('click', ()=>{
      
        if (count === 1){
          holdClick +=1;
          if(holdClick % 2 !== 0){
            playerHand[i].hold = true
            holdText[i].innerText = "HOLD"
            console.log(holdClick)
            console.log('true')
          } else {
             playerHand[i].hold = false
        holdText[i].innerText = ""
        console.log('false')
          }
        } 
      })
    }

    } 
    playerHand[i].hold = false
    
  } 
  output("")

  if (count === 2){
    calcHandScore(playerHand)
    count = 0
    index = [] 
    // betButton.disabled = false;
  }
  console.log(deck.length)
}

/**
 * A function to check if deck is almost out of cards (<5 cards) or if a player is out of points to play
 * @param {array} deck 
 * @param {number} pointsNum 
 * results in the game ending if either of the above conditions are true.
 */


const checkEndGame =(deck, pointsNum)=>{
  console.log(pointsNum)
  if(deck.length >= 5 && pointsNum > 0){
    Array.from(document.querySelectorAll('#card-container .card')).forEach(e=>e.classList.add("toggle-half"))
  } else {
    setTimeout(()=>{
    if (deck.length < 10) {
      output("out of cards! game ends!")
    } else if (pointsNum <= 0) {
      output ("out of points! game ends!")
    }
    betButton.disabled = true
    dealButton.disabled = true
    cardsInContainer.disabled = true
    resetButton.style.animation = "glowing 1300ms infinite"
    
  }, 1500)
  gameEnd = true
  }
}


/**
 * A function to check for all winning conditions, including high card
 * @param {array} playerHand 
 * returns resulting points
 */
let winningIndex;

const calcHandScore = (playerHand) => {
  gamesPlayed +=1
  
  flushCheck(playerHand)
  cardTally(playerHand)  
  winningIndex = Math.min(...index)
  let pointsWagered = pointsList[winningIndex].points * betAmt
  console.log(pointsNum)
  if (winningIndex < 9){
    pointsNum = pointsNum + pointsWagered
    gamesWon +=1
  } else {
    pointsNum = pointsNum - betAmt
  }

  console.log(pointsNum)
  console.log(betAmt)

  pointsAmt.innerText = `Points: ${pointsNum}`
  winRate.innerText = `Wins: ${gamesWon}/${gamesPlayed}`
  
  output(`${pointsList[winningIndex].hand}! ${pointsWagered} points!`)

  dealButton.disabled = true  
  betButton.disabled = true  
  const timeout = setTimeout(()=>{
    console.log('timeout')
    checkBet(betAmt, pointsNum)
    if(gameEnd === false){
      betButton.disabled = false
    }
  }
  , 2000)
  
}

// const deck = shuffleCards(makeDeck())

const dealButton = document.getElementById("deal")
dealButton.innerText = `Deal`
dealButton.addEventListener('click', ()=>{
  console.log(betAmt)
  count += 1
  console.log(betAmt)
  if (count > 0) {
    betButton.disabled = true;
  } 
  deal(playerHand)
  checkEndGame(deck, pointsNum)
  
})

resetButton.addEventListener('click', ()=>window.location.reload())

let deck;
/**
 * A function to initialise the game and highlight the column with bet 1
 */
const initGame =()=>{
  deck  = shuffleCards(makeDeck())
  document.querySelector('#scoretable div:nth-child('+ (2) +')').id = "highlight"

  output ("press deal to start")
}

initGame()