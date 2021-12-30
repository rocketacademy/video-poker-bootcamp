// Global Variables //
let handScore;
let totalPoints;
let hand = [];
let deals = 0;
let playerBet = 0;
let playerChips = 100;
let deck;
let handName;

// DOM elements
const container = document.getElementById("hand");
const output = document.getElementById("output");
const dealButton = document.getElementById("deal-button");
const betOne = document.getElementById("bet-one");
const betMax = document.getElementById("bet-max");
const playerPoints = document.getElementById("player-points");
const playerBetsDiv = document.getElementById("player-bets");

/** Plays the sound when the person presses the bet one or bet max */
const betSound = () => {
  new Audio("./buttonsound.wav").play();
};

/** Plays the sound of cards dealing  */
const dealSound = () => {
  new Audio("./dealcard.mp3").play();
};

/** Plays the sound when the person press the cards. */
const holdSound = () => {
  new Audio("./hold.mp3").play();
};

/** Plays the sound when the person has a winning hand */
const winSound = () => {
  new Audio("./win.wav").play();
};

/** Plays the sound when the person loses */
const loseSound = () => {
  new Audio("./lose.wav").play();
};

/**
 * Increases the player's bet by 1. if player bet is more than or equal to 5, player bet will revert back to 1. It also disables the deal button and highlights the score that is respective of the bet size.
 */
const increaseBet = () => {
  dealButton.disabled = false;
  if (playerBet >= 5) {
    playerBet = 0;
  }
  playerBet += 1;
  highlightScore();
  playerBetsDiv.innerText = `Player's Bet \n\n ${playerBet}`;
};

/**
 * Increases the player's bet to the max bet size (5), disables the deal button and highlights the score that is respective of the bet size.
 */
const maxBet = () => {
  dealButton.disabled = false;
  playerBet = 5;
  highlightScore();
  playerBetsDiv.innerText = `Player's Bet \n\n ${playerBet}`;
};

/**
 * Highlights the score the box in scoreboard that corresponds to the bet size.
 */
const highlightScore = () => {
  let x = document.querySelectorAll(".score");
  for (let o = 0; o < x.length; o += 1) {
    x[o].style.backgroundColor = "rgba(0, 0, 139, 0.514)";
  }
  let num = playerBet - 1;
  x[num].style.backgroundColor = "rgba(255, 0, 221, 0.616)";
};

/**
 * Initiates the game by making a new card deck, shuffling the cards and deal to hand.
 */
const initGame = () => {
  deck = makeDeck();
  deck = shuffleCards(deck);
  dealToHand(deck);
};

/**
 * Takes the player's hand, calculating the total number of points and changes the global player's score accordingly.
 * @param {Array.<Object>} hand - array of card objects in player's hand.
 */
const calcHandScore = (hand) => {
  totalPoints = hand[0].rank;
  for (let i = 1; i < hand.length; i += 1) {
    totalPoints += hand[i].rank;
  }
  pointSelection(hand);
};

/**
 * Takes the player's hand and calculates if they win or lose.
 * @param {Array.<Object>} hand - array of card objects in player's hand.
 */
const calcWinLose = (hand) => {
  calcHandScore(hand);

  if (handScore < 0) {
    playerChips -= playerBet;
  } else {
    playerChips += playerBet * handScore;
  }

  playerPoints.innerText = `Player Points \n\n ${playerChips}`;
};

/**
 * Makes a deck of 52 card objects
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;

      if (cardName === "1") {
        cardName = "ace";
      } else if (cardName === "11") {
        cardName = "jack";
      } else if (cardName === "12") {
        cardName = "queen";
      } else if (cardName === "13") {
        cardName = "king";
      }

      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        pic: `./images/${cardName}_of_${currentSuit}.png`,
        change: "change",
      };

      newDeck.push(card);
    }
  }
  return newDeck;
};

/**
 * Returns a random number within a range of 0 to a selected max num.
 * @param {number} max - the selected max num of range
 * @returns {number} random number within the the range of 0 and max.
 */
const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * Shuffles the deck of card objects.
 * @param {object} cards - the array of caard objects.
 * @returns shuffled cards
 */
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

/**
 * Takes two cards from the deck and adds it to the player's hand.
 * @param {Array.<Object>} deck - deck of 52 card objects
 */
const dealToHand = (deck) => {
  for (let i = 0; i < 5; i += 1) {
    let card = deck.pop();
    hand.push(card);
  }
};

/**
 * Change the property value of the card object from hold to change and vice versa, when applicable.
 * @param {object} card - card object
 */
const toggleStay = (card) => {
  if (card.change === "hold") {
    card.change = "change";
  } else if (card.change === "change") {
    card.change = "hold";
  }
};

/**
 * Resets the property value of all the card objects in the player's hand to default (i.e.change).
 * @param {Array.<Object>} hand
 */
const resetChange = (hand) => {
  for (let b = 0; b < hand.length; b += 1) {
    let card = hand[b];
    card.change = "change";
  }
};

/**
 * Resets the global variables to the starting values and resets all functions back to the original starting point. Then initiates the game.
 */
const resetGame = () => {
  //reset the global variables
  handScore = 0;
  totalPoints = 0;
  hand = [];
  deals = 0;
  playerBet = 0;
  dealButton.removeEventListener;

  //restart the color highlight
  let x = document.querySelectorAll(".score");
  for (let o = 0; o < x.length; o += 1) {
    x[o].style.backgroundColor = "rgba(0, 0, 139, 0.514)";
  }
  //reset the player bets
  playerBetsDiv.innerText = `Player's Bet \n\n ${playerBet}`;

  //restart the cards image;
  let n = document.querySelectorAll(".card");
  console.log(n.length);
  for (let a = 0; a < n.length; a += 1) {
    n[a].innerHTML = "";
  }

  //initiates game
  initGame();

  //changes the buttons status to original
  dealButton.disabled = true;
  betOne.disabled = false;
  betMax.disabled = false;
  console.log(deals);
};

/**
 * Creates a popup that informs the player of the hand they achieved and whether they have win or lose. Also, adds buttons that allow the user to restart game or ends game.
 */
const popup = () => {
  const pop = document.createElement("div");
  if (handScore < 0) {
    loseSound();
    pop.innerText = `You got ${handName}! \nGAME OVER!\n `;
  } else {
    winSound();
    pop.innerText = `You got ${handName}! \nYou Win!\n `;
  }

  // adding css to the popup
  pop.classList.add("popup");
  document.body.appendChild(pop);

  //create button for the next game
  const nextGame = document.createElement("button");
  nextGame.innerText = "Next Game";
  pop.appendChild(nextGame);
  nextGame.addEventListener("click", function () {
    pop.remove();
    resetGame();
  });

  //create button for end game
  const endGame = document.createElement("button");
  endGame.innerText = "End Game";
  pop.appendChild(endGame);
  endGame.addEventListener("click", function () {
    pop.innerHTML = "";
    pop.innerText = `End Game \n Player Points: ${playerChips}`;
  });
};

betOne.addEventListener("click", increaseBet);
betMax.addEventListener("click", maxBet);
initGame();

/**
 * Deals 5 card objects into the player's hand and displays it. If the player has clicked deal twice, it will calculate the points of the hand and initate the popup.
 */
dealButton.addEventListener("click", function () {
  betMax.disabled = true;
  betOne.disabled = true;

  if (deals < 2) {
    //change the cards that are set to change, change in hand
    container.innerHTML = "";
    for (let i = 0; i < 5; i += 1) {
      if (hand[i].change === "change") {
        let newCard = deck.pop();
        hand[i] = newCard;
      }

      //Present the new hand
      let card = hand[i];
      const handCard = document.createElement("div");
      handCard.classList.add("card");
      handCard.innerHTML = `<img src="${card.pic}"/>`;
      container.appendChild(handCard);
      handCard.addEventListener("click", holdSound);
      handCard.addEventListener("click", function () {
        toggleStay(card);
        console.log(card.change);
        if (card.change === "hold") {
          const holdChange = document.createElement("div");
          holdChange.innerText = "Hold";
          holdChange.classList.add("hold");
          handCard.appendChild(holdChange);
        } else if (card.change === "change") {
          x = handCard.querySelector(".hold");
          console.log(x);
          x.remove();
        }
      });
    }
  }

  deals += 1;
  resetChange(hand);
  output.innerText =
    "Click the cards that you want to hold. \n Then click draw when you are ready!";

  if (deals === 2) {
    calcWinLose(hand);
    popup();
  }
});

dealButton.disabled = true;
