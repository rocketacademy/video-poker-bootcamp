//////*GLOBAL VARIABLES*//////
let playerPoints = 100;
let deck = [];
let playerCards = [];
let playerHoldCards = [];
let betPoints = 0;
let results = "";

//boards that display the cards
let board;

//game mode variables
let isBet = false;
let isDeal = false;
let isSwap = false;
let isCalcHand = false;
let isNewRound = true;

/*DOM ELEMENTS*/
//bet input and button
const betInput = document.createElement("input");
betInput.placeholder = "Enter your bet here";

const betButton = document.createElement("button");
betButton.innerHTML = "BET";

//deal button
const dealButton = document.createElement("button");
dealButton.innerHTML = "DEAL";
dealButton.classList.add("disappear");

//swap button
const swapButton = document.createElement("button");
swapButton.innerHTML = "SWAP";
swapButton.classList.add("disappear");

//calculate score button
const calScore = document.createElement("button");
calScore.innerHTML = "GET SCORE";
calScore.classList.add("disappear");

//reset game button
const resetButton = document.createElement("button");
resetButton.innerHTML = "NEXT ROUND";
resetButton.classList.add("disappear");

//container for the entire results board
const resultsContainer = document.createElement("div");
resultsContainer.classList.add("resultsContainer");

//result board that display the results
const resultDiv = document.createElement("div");
resultDiv.classList.add("resultsBoard");

//point systems
const currentPoints = document.createElement("p");
currentPoints.innerHTML = `Current points: ${playerPoints}`;
currentPoints.classList.add("currentPts");
const pointsbet = document.createElement("p");
pointsbet.innerHTML = `Bet for current round:`;
pointsbet.classList.add("betPts");
resultDiv.appendChild(currentPoints);
resultDiv.appendChild(pointsbet);

resultsContainer.appendChild(resultDiv);

//message board the shows prompt message to player
const messageContainer = document.createElement("div");
messageContainer.classList.add("container");
const messageBoard = document.createElement("div");
messageBoard.classList.add("msgBoardDiv");
const promptMessage = document.createElement("p");
promptMessage.innerHTML =
  "Welcome to the SUPER FUN Poker Game!! Please start by placing a bet.";
promptMessage.classList.add("promptMsg");
messageBoard.appendChild(promptMessage);
messageContainer.appendChild(messageBoard);

//scoring system that shows all the multipliers for each combination
const scoreSystem = document.createElement("div");
scoreSystem.classList.add("scoreSys");
scoreSystem.innerHTML = "Scoring System";

const scoreTableDiv = document.createElement("div");
scoreTableDiv.classList.add("disappear");

const scoreTable = document.createElement("table");
scoreTable.classList.add("fullScore");

const scoreText = [
  ["Combinations", "Mutliplier"],
  ["A Pair of Jacks or Better", "5"],
  ["Two Pairs ", "10"],
  ["Three of a kind", "20"],
  ["Straight", "40"],
  ["Flush", "50"],
  ["Full House", "100"],
  ["Four of a Kind", "200"],
  ["Straight Flush", "300"],
];

for (let i = 0; i < 9; i += 1) {
  const row = document.createElement("tr");
  for (let j = 0; j < 2; j += 1) {
    const column = document.createElement("th");
    column.innerText = scoreText[i][j];
    row.appendChild(column);
  }
  scoreTable.appendChild(row);
}

scoreTableDiv.appendChild(scoreTable);
scoreSystem.addEventListener("mouseover", () => {
  scoreTableDiv.classList.remove("disappear");
});
scoreSystem.addEventListener("mouseleave", () => {
  scoreTableDiv.classList.add("disappear");
});

//////*HELPER FUNCTIONS*//////

/**
 * A function that gets a random index ranging from 0 (inclusive) to max (exclusive).
 * @return {number}  a random integer
 */

const getRandomIndex = (max) => Math.floor(Math.random() * max);

/**
 * A function that shuffle an array of cards
 * @param cards {array}  the whole deck of 52 cards
 * @return {number}  a random integer
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
 * A function that make the deck of 52 poker cards
 * @return {array}  array with all 52 poker cards
 */

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];

    //add the suitIcon in the object of the card
    let currentSuitIcon;
    let currentSuitImg;
    if (currentSuit === "hearts") {
      currentSuitIcon = "♥️";
      currentSuitImg = "heart.jpg";
    } else if (currentSuit === "diamonds") {
      currentSuitIcon = "♦️";
      currentSuitImg = "diamond.jpg";
    } else if (currentSuit === "clubs") {
      currentSuitIcon = "♣️";
      currentSuitImg = "club.jpg";
    } else if (currentSuit === "spades") {
      currentSuitIcon = "♠️";
      currentSuitImg = "spade.jpg";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
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

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        suitIcon: currentSuitIcon,
        suitImg: currentSuitImg,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

//////*GAME LOGIC*//////

/**
 * A function that check all the necessary conditions and input the bet points
 */

const placeBet = () => {
  //can only bet if it is a new round
  if (isNewRound) {
    //check if the player input a correct number
    const input = betInput.value;
    if (
      isNaN(parseInt(input)) ||
      Number(input) > playerPoints ||
      Number(input) < 0
    ) {
      promptMessage.innerHTML = `Please enter a number that this within your available points: ${playerPoints}`;
    } else {
      betPoints = betInput.value;
      pointsbet.innerHTML = `Bet for current round: ${betPoints}`;
      promptMessage.innerHTML = `Click to deal your cards, all the best!`;
      isBet = true;
      isNewRound = false;
      betInput.classList.add("disappear");
      betButton.classList.add("disappear");
      dealButton.classList.remove("disappear");
      swapButton.classList.remove("disappear");
      calScore.classList.remove("disappear");
    }
  } else {
    promptMessage.innerHTML = "You have already placed your bet.";
  }
};

/**
 * A function that deal the cards when user click the deal button
 */

const dealCards = () => {
  //can only deal if player have placed bet and player have not dealed cards yet
  if (isBet && playerCards.length != 5) {
    //deal the 5 cards
    for (let i = 0; i < 5; i += 1) {
      playerCards.push(deck.pop());
    }

    //////*HARD CODE HAND*//////
    /*playerCards = [
      {
        name: "5",
        rank: 5,
        suit: "hearts",
        suitIcon: "♥️",
        suitImg: "heart.jpg",
      },
      {
        name: "7",
        rank: 7,
        suit: "hearts",
        suitIcon: "♥️",
        suitImg: "heart.jpg",
      },
      {
        name: "7",
        rank: 7,
        suit: "hearts",
        suitIcon: "♥️",
        suitImg: "heart.jpg",
      },
      {
        name: "8",
        rank: 8,
        suit: "hearts",
        suitIcon: "♥️",
        suitImg: "heart.jpg",
      },
      {
        name: "9",
        rank: 9,
        suit: "hearts",
        suitIcon: "♥️",
        suitImg: "heart.jpg",
      },
    ];*/

    //display all the deal cards on the screen
    board = buildCardElements(playerCards);

    document.body.appendChild(board);

    isDeal = true;
    isNewRound = false;
    promptMessage.innerHTML = `Select any cards you want to hold and click SWAP`;
  } else {
    checkGameMode();
  }
};

/**
 * A function that returns the multiplier points
 * @return {number}  the multipler of number of points that the user scored for the cards in their hand
 */

const calcHandScore = () => {
  //can only calculate score if player have dealed
  if (isDeal) {
    //tally objects and arrays
    const cardRankTally = {};
    const cardSuitTally = {};
    let rankArrString = {};
    let suitArrString = {};
    let rankArr = {};

    //perform tally of the players cards

    for (let i = 0; i < playerCards.length; i += 1) {
      let cardRank = playerCards[i].rank;
      if (cardRank in cardRankTally) {
        cardRankTally[cardRank] += 1;
      } else {
        cardRankTally[cardRank] = 1;
      }

      let cardSuit = playerCards[i].suit;
      if (cardSuit in cardSuitTally) {
        cardSuitTally[cardSuit] += 1;
      } else {
        cardSuitTally[cardSuit] = 1;
      }
    }

    //convert the keys in the cardRankTally object to be array
    rankArrString = Object.keys(cardRankTally);
    //convert rankArrString array values from string to number
    rankArr = rankArrString.map((key) => Number(key));

    //convert the keys in the cardSuitTally object to be array
    suitArrString = Object.keys(cardSuitTally);

    let multiplier = 0;
    let currentMultiplier = checkJackPairsOrBetter(cardRankTally);
    if (currentMultiplier > multiplier) {
      multiplier = currentMultiplier;
    }
    currentMultiplier = checkTwoPairs(cardRankTally, rankArr);
    if (currentMultiplier > multiplier) {
      multiplier = currentMultiplier;
    }

    currentMultiplier = checkThreeOfAKind(cardRankTally, rankArr);
    if (currentMultiplier > multiplier) {
      multiplier = currentMultiplier;
    }
    currentMultiplier = checkStraight(rankArr);
    if (currentMultiplier > multiplier) {
      multiplier = currentMultiplier;
    }
    currentMultiplier = checkFlush(cardSuitTally, suitArrString);
    if (currentMultiplier > multiplier) {
      multiplier = currentMultiplier;
    }
    currentMultiplier = checkFullHouse(cardRankTally, rankArr);
    if (currentMultiplier > multiplier) {
      multiplier = currentMultiplier;
    }

    currentMultiplier = checkFourOfAKind(cardRankTally, rankArr);
    if (currentMultiplier > multiplier) {
      multiplier = currentMultiplier;
    }

    currentMultiplier = checkStraightFlush(
      rankArr,
      cardSuitTally,
      suitArrString
    );
    if (currentMultiplier > multiplier) {
      multiplier = currentMultiplier;
    }

    if (multiplier === 0) {
      results = "there is no winning combination";
    }

    isCalcHand = true;
    isNewRound = true;
    resetButton.classList.remove("disappear");

    return multiplier;
  } else {
    checkGameMode();
  }
};

/**
 * A function that check the number of pairs , to be used in checking full house and two pairs
 * @param  cardRankTally {object} keys contain the rank information of the player's card
 * @param rankArr {array} ranks of each card, in number type
 * @return {integer} number of pairs present in player's cards
 */
const checkPairs = (cardRankTally, rankArr) => {
  let numOfPairs = 0;
  for (let i = 0; i < rankArr.length; i += 1) {
    if (cardRankTally[rankArr[i]] === 2) {
      numOfPairs += 1;
    }
  }
  return numOfPairs;
};

/**
 * A function that check if there is pair of jacks or better
 * @param  cardRankTally {object} keys contain the rank information of the player's card
 * @return {integer} multipler for this combination
 */
const checkJackPairsOrBetter = (cardRankTally) => {
  //should it be ===2 or >1 (incase there is 3 or more cards)
  if (
    cardRankTally[1] > 1 ||
    cardRankTally[11] > 1 ||
    cardRankTally[12] > 1 ||
    cardRankTally[13] > 1
  ) {
    results = "Jack Pairs or Better";
    return 5;
  }
  return 0;
};

/**
 * A function that check if there are two pairs
 * @param  cardRankTally {object} keys contain the rank information of the player's card
 * @param rankArr {array} ranks of each card, in number type
 * @return {integer} multipler for this combination
 */
const checkTwoPairs = (cardRankTally, rankArr) => {
  if (checkPairs(cardRankTally, rankArr) === 2) {
    results = "Two Pairs";
    return 10;
  }
  return 0;
};

/**
 * A function that check if there are three of a kind
 * @param  cardRankTally {object} keys contain the rank information of the player's card
 * @param rankArr {array} ranks of each card, in number type
 * @return {integer} multipler for this combination
 */
const checkThreeOfAKind = (cardRankTally, rankArr) => {
  for (let i = 0; i < rankArr.length; i += 1) {
    if (cardRankTally[rankArr[i]] === 3) {
      results = "Three of a Kind";
      return 20;
    }
  }
  return 0;
};

/**
 * A function that check if there is straight
 * @param rankArr {array} ranks of each card, in number type
 * @return {integer} multipler for this combination
 */
const checkStraight = (rankArr) => {
  const firstRank = rankArr[0];
  let nextRank = firstRank + 1;

  let straightCount = 0;

  for (let i = 1; i < rankArr.length; i += 1) {
    if (rankArr[i] === nextRank) {
      straightCount += 1;
      nextRank += 1;
    }
  }

  if (straightCount === 4) {
    results = "Straight";
    return 40;
  }

  return 0;
};

/**
 * A function that check if there is flush
 * @param  cardSuitTally {object} keys contain the suit information of the player's card
 * @param suitArrString {array} suits of each card
 * @return {integer} multipler for this combination
 */
const checkFlush = (cardSuitTally, suitArrString) => {
  let firstSuit = suitArrString[0];

  if (cardSuitTally[firstSuit] === 5) {
    results = "Flush";
    return 50;
  }
  return 0;
};

/**
 * A function that check if there is full house
 * @param  cardRankTally {object} keys contain the rank information of the player's card
 * @param rankArr {array} ranks of each card, in number type
 * @return {integer} multipler for this combination
 */

const checkFullHouse = (cardRankTally, rankArr) => {
  if (
    checkPairs(cardRankTally, rankArr) === 1 &&
    checkThreeOfAKind(cardRankTally, rankArr) != 0
  ) {
    results = "Full House";
    return 100;
  }
  return 0;
};

/**
 * A function that check if there is four of a kind
 * @param  cardRankTally {object} keys contain the rank information of the player's card
 * @param rankArr {array} ranks of each card, in number type
 * @return {integer} multipler for this combination
 */
const checkFourOfAKind = (cardRankTally, rankArr) => {
  for (let i = 0; i < rankArr.length; i += 1) {
    if (cardRankTally[rankArr[i]] === 4) {
      results = "Four of a Kind";
      return 200;
    }
  }
  return 0;
};

/**
 * A function that check if there is straight flush
 * @param rankArr {array} ranks of each card, in number type
 * @param  cardSuitTally {object} keys contain the suit information of the player's card
 * @param suitArrString {array} suits of each card
 * @return {integer} multipler for this combination
 */
const checkStraightFlush = (rankArr, cardSuitTally, suitArrString) => {
  if (
    checkStraight(rankArr) != 0 &&
    checkFlush(cardSuitTally, suitArrString) != 0
  ) {
    results = "Straight Flush";
    return 300;
  }
  return 0;
};

/**
 * A function that enable holding of the player's chosen cards
 * @param  cardElement {element} cards that the player chose to hold
 * @param  cardArrNum {number} the item number in the playerCard array
 */

const cardHold = (cardElement, cardArrNum) => {
  //check if player have swapped before
  if (isSwap) {
    promptMessage.innerHTML =
      "Tsk tsk... You have already swapped your cards, you cannot hold any more cards";
  } else {
    let isCardClicked = false;
    let toUnclickCardArrNum;

    //check for all the cards in the playerHoldCards array
    for (let i = 0; i < playerHoldCards.length; i += 1) {
      const currentRank = playerHoldCards[i].rank;
      const currentSuit = playerHoldCards[i].suit;

      if (
        currentRank === playerCards[cardArrNum].rank &&
        currentSuit === playerCards[cardArrNum].suit
      ) {
        isCardClicked = true;
        toUnclickCardArrNum = i;
      }
    }

    //if the card have not been clicked before
    if (isCardClicked === false) {
      playerHoldCards.push(playerCards[cardArrNum]);
      // cardElement.innerHTML = `Hold <br> ${playerCards[cardArrNum].name} <br> ${playerCards[cardArrNum].suitIcon}`;
      cardElement.querySelector(
        ".cardRank"
      ).innerHTML = `${playerCards[cardArrNum].name}`;
      cardElement.querySelector(
        ".suitImage"
      ).innerHTML = `${playerCards[cardArrNum].suitImg}`;
      cardElement.querySelector(".holdCard").classList.remove("disappear");
    }
    //if the card have been clicked before
    else if (isCardClicked === true) {
      playerHoldCards.splice(toUnclickCardArrNum, 1);
      cardElement.querySelector(
        ".cardRank"
      ).innerHTML = `${playerCards[cardArrNum].name}`;
      cardElement.querySelector(
        ".suitImage"
      ).innerHTML = `${playerCards[cardArrNum].suitImg}`;
      cardElement.querySelector(".holdCard").classList.add("disappear");
    }
  }
};

/**
 * A function that swap the player's chosen cards and display the final cards
 */

const swapCards = () => {
  //can only swap cards after player have decided the cards to hold and player have not swapped before
  if (playerHoldCards.length > 0 && !isSwap) {
    //empty the board
    board.innerHTML = "";

    let numOfCardsSwap = playerHoldCards.length;

    //deal the number cards player want to swap
    for (let i = 0; i < 5 - numOfCardsSwap; i += 1) {
      playerHoldCards.push(deck.pop());
    }
    //copy the final cards and replace all the cards in the playerCards array while emptying the playerHoldCards
    playerCards = [...playerHoldCards];
    playerHoldCards = [];

    //display all the deal cards on the screen
    board = buildCardElements(playerCards);

    document.body.appendChild(board);
    isSwap = true;
    promptMessage.innerHTML = `Here are your new cards, click GET SCORE to find out if you have won`;
  } else {
    //check if user have already clicked swap
    if (isSwap) {
      promptMessage.innerHTML =
        "Tsk tsk... You have already swapped your cards.";
    } else {
      promptMessage.innerHTML = "You have not chosen any cards to hold.";
    }
  }
};

/**
 * A function that builds the elements of the players' cards
 * @param  cards {array} player's cards
 * @return containerElement {element} the container element with the players' cards
 */

const buildCardElements = (cards) => {
  const containerElement = document.createElement("div");
  containerElement.classList.add("mainContainer");

  for (let i = 0; i < cards.length; i += 1) {
    //create each card element
    const cardElement = document.createElement("div");
    const cardRankElement = document.createElement("p");
    const cardSuitElement = document.createElement("img");
    cardElement.classList.add("card");
    cardRankElement.innerHTML = `${cards[i].name}`;
    cardSuitElement.src = `${cards[i].suitImg}`;
    cardRankElement.classList.add("cardRank");
    cardSuitElement.classList.add("suitImage");

    //create hold card div
    const holdDiv = document.createElement("div");
    holdDiv.innerHTML = `HOLD`;
    holdDiv.classList.add("holdCard");
    holdDiv.classList.add("disappear");

    if (cards[i].suit === "hearts" || cards[i].suit === "diamonds") {
      cardRankElement.classList.add("red");
    }

    cardElement.appendChild(cardRankElement);
    cardElement.appendChild(holdDiv);
    cardElement.appendChild(cardSuitElement);

    //add event listener to each card to enable holding of card
    cardElement.addEventListener("click", (event) => {
      cardHold(event.currentTarget, i);
    });
    containerElement.appendChild(cardElement);
  }

  return containerElement;
};

/**
 * A function that resets a new round
 */
const resetRound = () => {
  deck = shuffleCards(makeDeck());
  playerCards = [];
  playerHoldCards = [];
  betPoints = 0;
  results = "";
  board.innerHTML = "";
  pointsbet.innerHTML = `Bet for current round: `;
  currentPoints.innerHTML = `Current points: ${playerPoints}`;
  isBet = false;
  isDeal = false;
  isSwap = false;
  isCalcHand = false;
  //set the displays of buttons
  betInput.classList.remove("disappear");
  betButton.classList.remove("disappear");
  dealButton.classList.add("disappear");
  swapButton.classList.add("disappear");
  calScore.classList.add("disappear");
  resetButton.classList.add("disappear");
  promptMessage.innerHTML = "Woohoo another round, all the best!";
};

/**
 * A function that displays the score of this round
 */

const getScore = () => {
  //only display the score after the player dealed cards, and player have swapped card after holding cards, and if Get Score button was not already clicked
  if (!isCalcHand && (isDeal || (playerHoldCards.length > 0 && isSwap))) {
    let multiplier = calcHandScore();

    if (multiplier > 0) {
      playerPoints += betPoints * multiplier;
      promptMessage.innerHTML = `Congrats, you have a winning combination:<br>${results}!!<br>You earned ${
        betPoints * multiplier
      } points`;
    } else {
      playerPoints -= betPoints;
      promptMessage.innerHTML = `Oh no, ${results}!! <br> You lost ${betPoints} points`;
    }

    currentPoints.innerHTML = `Current points: ${playerPoints}`;
    promptMessage.innerHTML +=
      "<br>This round have ended, please click the NEXT ROUND button";
  } else {
    checkGameMode();
  }
};

/**
 * A function that checks the state of the game
 */

const checkGameMode = () => {
  if (!isBet) {
    promptMessage.innerHTML = "You have not placed your bet, how dare you?!";
  } else if (!isDeal) {
    promptMessage.innerHTML =
      "You have not dealed your cards, please get your lucky cards 🤭";
  } else if (!isCalcHand) {
    promptMessage.innerHTML =
      "You have not calculated your score, looking suspicious... 😒";
  } else {
    promptMessage.innerHTML = `This round have ended, please click the NEXT ROUND button`;
  }
};

//////*GAME INITIALISATION*//////
/**
 * A function that initialize the game
 */
const initGame = () => {
  //display all the buttons
  document.body.appendChild(betInput);
  document.body.appendChild(betButton);
  document.body.appendChild(dealButton);
  document.body.appendChild(swapButton);
  document.body.appendChild(calScore);
  document.body.appendChild(resetButton);

  betButton.addEventListener("click", placeBet);
  dealButton.addEventListener("click", dealCards);
  swapButton.addEventListener("click", swapCards);
  calScore.addEventListener("click", getScore);
  resetButton.addEventListener("click", resetRound);

  //display the results board
  document.body.appendChild(resultsContainer);

  //display the message board;
  document.body.appendChild(messageContainer);

  //display the scoring system;
  document.body.appendChild(scoreSystem);
  document.body.appendChild(scoreTableDiv);

  //create the shuffled deck
  deck = shuffleCards(makeDeck());
};

initGame();
