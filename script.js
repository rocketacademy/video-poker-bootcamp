/* 
* A function that returns a fixed number of points
* @param cardInHand = [] to store all cards drawn
* @param push cards drawn into cardInHand
* @return number of points that the user scored for the cards in hand
 */
 
let cardInHand =[];
let userPoints = 0;

// buttons creation
// Need deal, hold, submit buttons
 let dealButton = document.createElement("button")
 dealButton.id = "deal-button";
 dealButton.innerHTML = "DEAL";


 let holdButton = document.createElement("button")
 holdButton.id = "hold-button";
 holdButton.innerHTML = "HOLD";
 
 

 
 
 // Inputting username and then amount to wager
 const startOfGame = () => {
 // DOM Elements
 // game instruction tells user what the game wants you to do
 let gameInst = document.createElement("h3");
 gameInst.id = "game-instruction";
 gameInst.innerHTML = "What is your name?"
 document.body.appendChild(gameInst)
 
 // form to take in input and submit button
 let form = document.createElement("div");
 form.id = "form";
 
 let input = document.createElement("input");
 input.id = "input";
 
 let submitButton = document.createElement("button");
 submitButton.id = "submit-button"
 submitButton.innerHTML = "SUBMIT"
 
 // append input and submit button into form
 form.appendChild(input);
 form.appendChild(submitButton);
 document.body.appendChild(form)
	 submitButton.addEventListener("click", () => {
		 if(input.value === ""){
		 alert("Field cannot be empty.")
	 } 	 if(input.value !== ""){
		 gameInst.innerHTML = `Hey ${input.value}! <br> Welcome to Video Poker.`
		 input.value = ""
	 }	 else {
		 alert("Please enter a valid name.")
	 }
	 })
	 
 }
 
 startOfGame();
 
const makeDeck = (cardAmount) => {
  // create the empty deck at the beginning
  const newDeck = [];
  const suits = ["❤", "♦", "♣", "♠"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // make a variable of the current suit
    const currentSuit = suits[suitIndex];
    /* console.log(`current suit: ${currentSuit}`); */

    // loop to create all cards in this suit
    // rank 1-13
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // Convert rankCounter to string
      let cardName = `${rankCounter}`;

      // 1, 11, 12 ,13
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }
      if (currentSuit === "❤" || currentSuit === "♦") {
        var color = "red";
      } else if (currentSuit === "♣" || currentSuit === "♠") {
        var color = "black";
      }

      // make a single card object variable
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        cardColor: color,
      };

      // add the card to the deck
      newDeck.push(card);
    }
}
}

const getRandomIndex = (max) => Math.floor(Math.random() * max);

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
}

// let shuffledCards = shuffleCards(newDeck)

const calcHandScore = (inHand) => {
	let drawCards = shuffledCards.pop();
};