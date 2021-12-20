import { shuffleCards, makeDeck } from "./createDeck.js";
import {
  convertToHandSimp,
  checkRoyalFlush,
  checkStraight,
  checkFlush,
  checkFourKind,
  checkHighCard,
  checkTwoKind,
  checkThreeKind,
  checkStraightFlush,
  checkFullHouse,
} from "./checkStates.js";

// ========================================================
// - Global vars
// ========================================================
let userHand = [];
let deck = shuffleCards(makeDeck());
let numberToDeal = 5;
let maxSwaps = 5;
let swapCount = 0;
let credits = 100;
let betAmount = 1;
let gameStarted = false;

// ========================================================
// - UI Helper functions
// ========================================================
/**
 * Function to deal hand - based on numberToDeal
 * @function
 * @param {number} Number of cards to deal to a hand
 * @param {array} Array of user's Hand
 */
const dealHand = (n, arr) => {
  for (let i = 0; i < n; i += 1) {
    arr.push(deck.pop());
  }
  return arr;
};

/**
 * Function to display card elements from cardHand
 * @function
 * @param {array} Array of card obj (hand)
 */
const buildCardHand = (hand) => {
  const cardHandElement = document.getElementById("user-hand");

  for (let i = 0; i < hand.length; i += 1) {
    const card = hand[i];
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.id = `card-${i}`;

    if (card.suitSymbol === "♥️" || card.suitSymbol === "♦️") {
      cardElement.style.color = "red";
    }

    if (
      card.displayName === "J" ||
      card.displayName === "Q" ||
      card.displayName === "K" ||
      card.displayName === "A"
    ) {
      cardElement.innerHTML =
        card.displayName + "<br />" + card.suitSymbol + "<br />" + card.rank;
    } else {
      cardElement.innerHTML = card.displayName + "<br />" + card.suitSymbol;
    }

    cardElement.addEventListener("click", (event) => {
      if (swapCount < maxSwaps) {
        const cardIndex = parseInt(event.target.id.replace("card-", ""));
        swapCard(hand, cardIndex);
      }
    });

    cardHandElement.appendChild(cardElement);
  }
  return cardHandElement;
};

/**
 * Function to remove card elements in dom, used in recreating cardHand (refer to swapCard)
 * @function
 */
const removeCardHandElements = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((e) => e.remove());
};

/**
 * Function to update and populate credits and bet amount display
 * @function
 */
const fillCreditsBets = () => {
  const creditsElement = document.getElementById("credits");
  const betsElement = document.getElementById("bets");
  creditsElement.innerHTML = `Credits: ${credits}`;
  betsElement.innerHTML = `Bet: ${betAmount}`;
};

/**
 * Function to update and populate output instructions
 * @function
 * @param {string} String output to show in output box
 */
const fillOutput = (s) => {
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = s;
};

/**
 * Function to set the start-button and show-hand button functionality
 * @function
 */
const startShowHandButtons = () => {
  const startBtn = document.getElementById("start-button");
  const showHandBtn = document.getElementById("show-hand-button");

  startBtn.addEventListener("click", () => {
    console.log("dealhand");
    // check and clear existing card elements, reset deck, reset hand etc
    const cards = document.querySelectorAll(".card");
    if (cards) {
      removeCardHandElements();
      resetStates();
    }
    // start game
    credits -= betAmount;
    fillCreditsBets();
    gameStarted = true;
    startBtn.disabled = true;
    // deal cards
    dealHand(numberToDeal, userHand);
    buildCardHand(userHand);
    // output instructions
    fillOutput(
      `Click any card to swap it out, you have ${
        maxSwaps - swapCount
      } swaps left`
    );
  });

  showHandBtn.addEventListener("click", () => {
    console.log("calculateHand");

    // check wins
    const output = calculateHand(userHand);
    console.log(output);
    calculateWinCredits(output);

    // enable start button
    gameStarted = false;

    // output Instructions
    setTimeout(() => {
      startBtn.disabled = false;
      fillOutput("Click start to deal cards");
    }, 3000);
  });
};

// ========================================================
// - Business Logic functions
// ========================================================
const resetStates = () => {
  deck = [];
  userHand = [];
  swapCount = 0;
  deck = shuffleCards(makeDeck());
};

/**
 * Function to swap card in hand, update userHand and recreate userHand element
 * @function
 * @param {array} Array of card obj (hand)
 * @param {number} Index of card in hand to swap with new card
 */
const swapCard = (arr, idx) => {
  const newCard = deck.pop();
  let arrCopy = JSON.parse(JSON.stringify(arr));
  arrCopy[idx] = newCard;
  // update hand
  userHand = arrCopy;

  // rebuild cardHand with newHand (arrCopy)
  removeCardHandElements();
  buildCardHand(userHand);

  // output instructions
  swapCount += 1;
  if (swapCount < maxSwaps) {
    fillOutput(
      `Click any card to swap it out, you have ${
        maxSwaps - swapCount
      } swaps left`
    );
  } else {
    fillOutput(
      `You have ${
        maxSwaps - swapCount
      } swaps left, click SHOW HAND to see winnings`
    );
  }
};

/**
 * Function to calculate hand, update win condition states
 * @function
 * @param {array} Array of card obj
 * @return {object} Object of win states (bool)
 */
const calculateHand = (arr) => {
  let isRoyalFlush = false;
  let isStraightFlush = false;
  let isFourKind = false;
  let isFullHouse = false;
  let isFlush = false;
  let isStraight = false;
  let isThreeKind = false;
  let isTwoKind = false;
  let isHighCard = false;

  const hand = convertToHandSimp(arr);
  console.log(hand);
  let checkStates = false;

  switch (Object.keys(hand).length) {
    case 5:
      // 5 different type of cards, check for RF, SF, F, S
      isRoyalFlush = checkRoyalFlush(arr);
      isStraightFlush = checkStraightFlush(arr);
      isFlush = checkFlush(arr);
      isStraight = checkStraight(arr);
      checkStates = isRoyalFlush || isStraightFlush || isFlush || isStraight;
      break;
    case 3:
      // 3 different type of cards, check for 3 of a kind and 2 of a kind
      isThreeKind = checkThreeKind(arr);
      isTwoKind = checkTwoKind(arr);
      checkStates = isTwoKind || isThreeKind;
      break;
    case 2:
      // 2 different type of cards, check for 3 of a kind, 4 of a kind, FH
      isFullHouse = checkFullHouse(arr);
      isFourKind = checkFourKind(arr);
      isThreeKind = checkThreeKind(arr);
      checkStates = checkThreeKind || checkFourKind || checkFullHouse;
      break;
    default:
      break;
  }

  if (!checkStates) {
    isHighCard = checkHighCard(arr);
  }

  return {
    isRoyalFlush,
    isStraightFlush,
    isFourKind,
    isFullHouse,
    isFlush,
    isStraight,
    isThreeKind,
    isTwoKind,
    isHighCard,
  };
};

/**
 * Function to calculate win credits, updates output message and credits
 * @function
 * @param {obj} Object result of calculate hand - string: bool
 */
const calculateWinCredits = (obj) => {
  let n = 0;
  switch (true) {
    case obj.isRoyalFlush:
      n = 250;
      credits += n;
      fillOutput(`Royal Flush! Congratulations! You won ${n} credits`);
      break;
    case obj.isStraightFlush:
      n = 50;
      credits += n;
      fillOutput(`Straight Flush! Congratulations! You won ${n} credits`);
      break;
    case obj.isFourKind:
      n = 25;
      credits += n;
      fillOutput(`Four of a kind! Congratulations! You won ${n} credits`);
      break;
    case obj.isFullHouse:
      n = 9;
      credits += n;
      fillOutput(`Full House! Congratulations! You won ${n} credits`);
      break;
    case obj.isFlush:
      n = 6;
      credits += n;
      fillOutput(`Flush! Congratulations! You won ${n} credits`);
      break;
    case obj.isStraight:
      n = 4;
      credits += n;
      fillOutput(`Straight! Congratulations! You won ${n} credits`);
      break;
    case obj.isThreeKind:
      n = 3;
      credits += n;
      fillOutput(`Three of a kind! Congratulations! You won ${n} credits`);
      break;
    case obj.isTwoKind:
      n = 2;
      credits += n;
      fillOutput(`Two of a kind! Congratulations! You won ${n} credits`);
      break;
    case obj.isHighCard:
      n = 1;
      credits += n;
      fillOutput(`High Card! Congratulations! You won ${n} credit`);
      break;
    default:
      fillOutput(
        `Sorry no winning hands found. Click START to replay and try again!`
      );
      break;
  }

  // update credits
  fillCreditsBets();
};

// ========================================================
// - Main
// ========================================================
const main = () => {
  startShowHandButtons();
  fillCreditsBets();
  fillOutput("Click start to deal cards");
};

main();
