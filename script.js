/*
Game logic: 
The user starts with 100 points.
When they click the "Deal" button the computer deals a hand of 5 cards. The user can choose any number of their cards to replace with new, random cards.
After the user finishes replacing cards, the game assigns points based on the resulting hand. See rankings of Poker hands here.

*/

/*
OBJECTIVES:
1. to deal 5 cards to player 
2. Add winning logic 
what do i need to do?: 
1. player get an array of 5 cards 
2. create a function that can detect any winning combinations --> helper function for each winning condition 
    1. Check for same suit (done) 
    2. Check for running sequence (done)
    3. Check for 4 cards same (4 of a kind) (done)
    4. Check for 3 cards same, the rest 2 cards same (full house)(done)
    5. Check for 3 cards same, rest 2 cards can be different (3 of a kind)(done)
    6. Check for 2 pairs (2 pairs) (done)
    7. Check for 1 pair of J/Q/K/A (done)
*/

/************************   FIRST PART TO GET WINNING COMBINATIONS ********************************* */
// get Object.keys --> return an array. then use a for loop to check for running sequence, iterate through each object key and check that each number is just one number difference e.g. let playerCards = Object.keys() --> then find difference of playerCards[i] - playerCards[i+1] 0,1; 1,2; 2,3; 3;4, if there is a difference of 1 then it is indeed a running sequence, else not 


//to check for same suit--> similar to object tally, return an object with suits of cards as keys and values the represent the frequency of the suit appearing --> if all same suit --> flush 



/*to check for same cards --> using the object tally -->should return an object with names of cards as keys and values represent the freq:
  1. Find the freq of card appearing: use a for--in loop --> for card in cardTally --> let freqOfCard = cardTally[card]  --> push the number into an array 
  2. if any number in the array ===4 --> 4 of a kind exists 
  3. if any number in the array ===3 ---> card appear 3 times  ---> can be 3 of a kind/full house 
      ---> if the other number ===2 --> if card appears 3 times and another card appears 2 time -->full house exists 
      ---> else 3 of a kind 
*/

/*to check for 1 pair of J/Q/K/A:
  iterate object tally, if J/Q/K/A exists, then look at the value, if freq ===2, then pair exists --> else no 
  
//========================HELPER FUNCTIONS ========================================
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

// Shuffle an array of cards
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
//====================GLOBAL SETUP ===============/
const deck = shuffleCards(makeDeck());




/** function to give 5 cards to player
 * @return {array} containing 5 cards --> each as an object 
 */
const dealHand = () =>{
let hand = [];
for (let i = 0; i < 5; i += 1) {
  hand.push(deck.pop());
}
console.log("playerHand", hand)
}

dealHand()



/** 
 * a function that calculates hand score 
*/