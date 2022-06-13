/*===============================================================
=========================GLOBAL VARIABLES========================
=================================================================*/

//container for cards

let cardContainer;
//dealt hand
let hand = [];

//array for cards to be held
const heldCards = [];

//array for the holdmsg
const holdmsg = [];

//object for tally of card name
const cardNameTally = {};

//object for tally of card name
const cardSuitTally = {};

//node for cardcontainer
cardContainer = document.createElement("div");

const dealBtn = document.createElement("button");

const gameMessage = document.createElement("div");
gameMessage.classList.add("message");

const output = (message) => {
  gameMessage.innerHTML = message;
};

//default credits 100
let points = 100;

//div to show credits.
const creditsDiv = document.createElement("div");

//bet is only worth 1 points
let bet = 1;

//object to store how much points each winning combination is worth
const handRankingScores = {
  "Better luck next time!": -1,
  "Jacks or Better!": 1,
  "Two pairs!": 2,
  "Three of a kind!": 3,
  "Straight! ": 4,
  "Flush! ": 6,
  "Full House!": 9,
  "Four of a kind!": 25,
  "Straight Flush!": 50,
  "Royal Flush": 250,
};

//To house everything in here
const mainUI = document.createElement("div");
mainUI.setAttribute("id", "main");

//music variables
const volumnIcon = document.createElement("i");
const audioContainer = document.createElement("div");
const audio = document.createElement("audio");

/*===============================================================
=========================HELPER FUNCTIONS========================
=================================================================*/

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

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

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  //for testing if straight flush cna be detected
  //const suits = ["hearts", "hearts", "hearts", "hearts"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    // initialise variable suitSymbol
    let currentSymbol;

    // set suit symbol to match current suit
    if (currentSuit === "hearts") {
      currentSymbol = "♥️";
    } else if (currentSuit === "spades") {
      currentSymbol = "♠️";
    } else if (currentSuit === "clubs") {
      currentSymbol = "♣️";
    } else {
      currentSymbol = "♦️";
    }

    // for testing if Straight Flush can be detected by game logic
    /*if (currentSuit === "hearts") {
      currentSymbol = "♥️";
    } else if (currentSuit === "spades") {
      currentSymbol = "♥️";
    } else if (currentSuit === "clubs") {
      currentSymbol = "♥️";
    } else {
      currentSymbol = "♥️";
    }*/

    // set the color of the card (used later to determine the css class which in turn determines the color)
    // does not directly set the color of the card
    let cardColor;
    if (currentSymbol === "♥️" || currentSymbol === "♦️") {
      cardColor = "red";
    } else {
      cardColor = "black";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    //below testing 1-5 to issue only 5 cards to see if game logic to detect 5 numerical consecutive numbers (1 to 5) worked
    //for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1)
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "A";
      } else if (cardName === "11") {
        cardName = "J";
      } else if (cardName === "12") {
        cardName = "Q";
      } else if (cardName === "13") {
        cardName = "K";
      }

      // Create a new card with the current name, suit, suit symbol, display name colour and rank
      const cardInfo = {
        suitSymbol: currentSymbol,
        suit: currentSuit,
        name: cardName,
        color: cardColor,
        rank: rankCounter,
      };
      // Add the new card to the deck
      newDeck.push(cardInfo);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// build the card display
const createCard = (cardInfo) => {
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.color);
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement("div");
  name.classList.add("name", cardInfo.color);
  name.innerText = cardInfo.name;

  const card = document.createElement("div");
  card.classList.add("card");

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

/*===============================================================
=========================GAME FUNCTIONS==========================
=================================================================*/

let deck = shuffleCards(makeDeck());

//function to create empty card
const createEmptyCard = () => {
  cardContainer.innerHTML = ``;
  for (let i = 0; i < 5; i += 1) {
    const cardEmpty = document.createElement("div");
    cardEmpty.classList.add("card-empty");

    // Create a div for the empty card itself
    const emptyCard = document.createElement("div");
    emptyCard.classList.add("empty-card", "down");
    emptyCard.innerHTML = ``;

    // Append divs to cardWrapper and cardContainer
    cardEmpty.appendChild(emptyCard);
    cardContainer.appendChild(cardEmpty);
  }
};

//function to create dealed cards
const createPopulatedCard = () => {
  cardContainer.innerHTML = "";
  for (let i = 0; i < hand.length; i += 1) {
    const currentCard = hand[i];

    const cardElements = createCard(currentCard);

    // create a div to contain both the card and the hold message
    const cardbox = document.createElement("div");
    cardbox.classList.add("card-div");

    //div for the holding message
    holdmsg[i] = document.createElement("div");
    holdmsg[i].classList.add("hold");
    holdmsg[i].innerHTML = "";
    if (heldCards.includes(i)) {
      holdmsg[i].innerHTML = "Hold";
    }

    // Append the card element
    cardbox.appendChild(holdmsg[i]);
    cardbox.appendChild(cardElements);
    cardContainer.appendChild(cardbox);
    cardbox.addEventListener("click", () => {
      //note i will be used for current card index
      holdMessage(holdmsg[i], i);
    });
    output(`Select cards you want to hold`);
  }
};

//function to create a hold message for when cards are clicked
const holdMessage = (msg, currentCard) => {
  if (!dealBtn.disabled) {
    if (msg.innerHTML === "") {
      //hold message
      msg.innerHTML = "Hold";
      //push card info into the array
      heldCards.push(currentCard);
    } else {
      msg.innerHTML = "";
      // Remove held cards in array
      const removeFromHeldArray = heldCards.indexOf(currentCard);
      heldCards.splice(removeFromHeldArray);
    }
    console.log(`Card Clicked`);
  }
};

const toggleBtnText = () => {
  if (dealBtn.innerHTML === `Deal`) {
    dealBtn.innerHTML = `Draw`;
  } else {
    dealBtn.innerHTML = "Deal";
  }
};

//function to deal out cards
const dealCards = () => {
  if (hand.length === 0) {
    for (let i = 0; i < 5; i += 1) {
      //pop out 5 cards and push into hand
      hand.push(deck.pop());
    }
    createPopulatedCard();
    console.log(`deck created`);
    toggleBtnText();
  } else {
    for (let i = 0; i < hand.length; i += 1) {
      //checks heldCards arry for cards that are not selectec and they will be replace
      if (!heldCards.includes(i)) {
        //pop out cards to replace cards not found in heldCards Arry
        hand[i] = deck.pop();
        console.log(`cards switch!`);
      }
    }
    createPopulatedCard();
    dealBtn.disabled = true;
    tallyCards();
    checkForWin();
    testConsecutive();
    let outcome = checkForWin();
    //outputs the result from the checkforWin function
    output(outcome);
    //returns a number based on the result from checkForWin. score numbers are from handRankingScore Object
    const alterCredits = credits(outcome);
    //alter points based on results
    points += alterCredits;

    //displays the points lost or gained
    let alterCreditsNode = document.createTextNode(` ${alterCredits}`);
    if (alterCredits >= 0) {
      alterCreditsNode = document.createTextNode(` +${alterCredits}`);
    }
    console.log(`${alterCredits} score`);
    creditsDiv.appendChild(alterCreditsNode);
    setTimeout(resetGame, 5000);
  }
};

//function to change credits. result is parsed in from checkForWin function as handRankingScore Object determines the score based on the result.
const credits = (result) => {
  return bet * handRankingScores[result];
};

//function to tally cards
const tallyCards = () => {
  //tally card Names (1 to K)
  for (let i = 0; i < hand.length; i += 1) {
    const cardName = hand[i].name;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    } else {
      cardNameTally[cardName] = 1;
    }
  }

  //tally card suits
  for (let i = 0; i < hand.length; i += 1) {
    const cardSuit = hand[i].suit;
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    } else {
      cardSuitTally[cardSuit] = 1;
    }
  }
};

//function to check if numbers are consectutive
const testConsecutive = function () {
  hand.sort(function (a, b) {
    return a.rank - b.rank;
  });
  let conseq = 1;
  for (let i = 1; i < hand.length; i += 1) {
    if (hand[i].rank == hand[i - 1].rank + 1) conseq += 1;
    else conseq = 1;
    if (conseq == 5) return true;
  }
  return false;
};

//function to sort ranks

//-------------Test for two of a Kind using object values------------------

/*const twoPairs = () => {
  if (
    Object.values(cardNameTally).includes(2) &&
    Object.values(cardNameTally).length === 3
  )
    console.log(`Two of a kind`);
};*/

//function to check win conditions using object.values to reference to the handRankingScore Object
/*-------------winning combinations able to be determined by object.values------------------
-Jacks or better rule = object.values containing 2 jacks to win

-Two Pairs rule = object.values containing 2 card names of the same kind. (Object.values(cardNameTally).includes(2))

 -Three of a kind rule = object.values containing 3 cards of the same kind.(Object.values(cardNameTally).includes(3))

 -Four of a Kind = requires object.values containining 4 of the same cards. (Object.values(cardnameTally).includes(4))

 -Flush = object.values for cardSuitTally to be at 5. (Object.values(cardSuitTally).includes(5))

 -Full house rule requires 2 pair and 3 pair in Object.values for cardNameTally = (Object.values(cardSuitTally).includes(3)) && (Object.values(cardSuitTally).includes(2))

 - Striaght FLush requires ascending order for example 9, 10, 11(J), 12(Q), 13(K) and same suit = will need to sort object in ascending order using .sort and Object.values(cardSuitTally).includes(3). 
 */

const checkForWin = () => {
  //check for two pairs
  let result;
  if (
    cardNameTally["J"] === 2 ||
    cardNameTally["K"] === 2 ||
    cardNameTally["Q"] === 2 ||
    !Object.values(cardNameTally).length === 3
  ) {
    result = "Jacks or Better!";
    // check for two pairs
  } else if (
    Object.values(cardNameTally).includes(2) &&
    Object.values(cardNameTally).length === 3 &&
    !Object.values(cardSuitTally).includes(5)
  ) {
    result = "Two pairs!";
    //check for 3 of a kind
  } else if (Object.values(cardNameTally).includes(3)) {
    result = "Three of a kind!";
    //check for 4 of a kind
  } else if (Object.values(cardNameTally).includes(4)) {
    result = "Four of a kind!";
    //check for flush
  } else if (
    Object.values(cardSuitTally).includes(5) &&
    testConsecutive() === false
  ) {
    result = "Flush! ";
    //check for full house
  } else if (
    Object.values(cardNameTally).includes(2) &&
    Object.values(cardNameTally).includes(3)
  ) {
    result = "Full House!";
    //check if Straight
  } else if (
    testConsecutive() === true &&
    !Object.values(cardSuitTally).includes(5)
  ) {
    result = "Straight! ";
    //check if straight flush
  } else if (
    testConsecutive() === true &&
    Object.values(cardNameTally).length === 5 &&
    Object.values(cardSuitTally).includes(5)
  ) {
    result = "Straight Flush!";
  } else if (
    cardNameTally["J"] === 1 &&
    cardNameTally["Q"] === 1 &&
    cardNameTally["K"] === 1 &&
    cardNameTally[10] === 1 &&
    cardNameTally["A"] === 1 &&
    Object.values(cardSuitTally).includes(5)
  ) {
    result = "Royal Flush!";
  } else {
    result = `Better luck next time!`;
  }
  //returns the winning combination string
  return result;
};

//function to reset the Game
const resetGame = () => {
  //clear the tally
  for (cardName in cardNameTally) delete cardNameTally[cardName];
  for (cardSuit in cardSuitTally) delete cardSuitTally[cardSuit];
  makeDeck();
  deck.length = 0;
  deck = shuffleCards(makeDeck());
  hand.length = 0;
  heldCards.length = 0;
  createEmptyCard();
  dealBtn.disabled = false;
  toggleBtnText();
  gameMessage.innerHTML = "click on deal to begin";
  creditsDiv.innerText = `CREDITS: ${points}`;

  if (points <= 0) {
    dealBtn.disabled = 3;
    output(
      `You have run out of credits! Please reset the browser for a new game!`
    );
  }
};

const toggleAudio = () => {
  if (audio.paused === false) {
    audio.pause();
    volumnIcon.classList.remove("fa-volume-up");
    volumnIcon.classList.add("fa-volume-off");
  } else {
    audio.play();
    volumnIcon.classList.add("fa-volume-up");
    volumnIcon.classList.remove("fa-volume-off");
  }
};

//create a score guide
const scoreUI = document.createElement("div");
const scoreTable = () => {
  for (key in handRankingScores) {
    let rankingName = document.createElement("div");
    let rankingScore = document.createElement("span");
    rankingName.innerHTML = key;
    rankingScore.innerHTML = `  +${handRankingScores[key]}`;
    if (key === "Better luck next time!") {
      rankingName.innerHTML = `Nothing`;
      rankingScore.innerHTML = ` ${handRankingScores[key]}`;
    }
    rankingName.appendChild(rankingScore);
    scoreUI.appendChild(rankingName);
  }
  const closeButton = document.createElement("button");
  closeButton.innerHTML = `Close`;
  closeButton.classList.add("close-button");
  closeButton.addEventListener("click", () => {
    scoreUI.classList.toggle("hidden");
  });
  scoreUI.appendChild(closeButton);
};

const scoreToggle = document.createElement("button");
scoreToggle.classList.add("score-button");
scoreToggle.innerHTML = `Click to check Score Points Guide`;

/*===============================================================
=========================GAME INITIALIZATION=====================
=================================================================*/
const gameStart = () => {
  scoreUI.classList.add("score-table", "hidden");
  scoreToggle.addEventListener("click", () => {
    scoreUI.classList.toggle("hidden");
  });
  const audioContainer = document.createElement("div");
  audioContainer.setAttribute("id", "music-container");
  cardContainer.classList.add("card-container");
  document.body.appendChild(cardContainer);
  dealBtn.classList.add("deal-button");
  //document.body.appendChild(dealBtn);
  gameMessage.innerHTML = "click on deal to begin";
  //document.body.appendChild(gameMessage);
  creditsDiv.classList.add("credits");
  creditsDiv.innerText = `CREDITS: ${points}`;
  //document.body.appendChild(creditsDiv);
  audioContainer.appendChild(volumnIcon);
  audioContainer.addEventListener("click", () => toggleAudio());
  mainUI.appendChild(audioContainer);
  mainUI.appendChild(creditsDiv);
  mainUI.appendChild(gameMessage);
  mainUI.appendChild(cardContainer);
  mainUI.appendChild(dealBtn);
  mainUI.appendChild(scoreToggle);
  document.body.appendChild(scoreUI);
  document.body.appendChild(mainUI);
  toggleBtnText();
  createEmptyCard();
  scoreTable();
  dealBtn.addEventListener("click", () => {
    dealCards();
  });

  //inserting background music
  let audioSource = document.createElement("source");
  audioSource.src = "Missing-You.mp3";
  audio.appendChild(audioSource);
  volumnIcon.classList.add("fa", "fa-volume-off");
  audio.volumn = 0.3;
  audio.loop = true;
  document.body.appendChild(audio);
};

gameStart();
