// Global Variables //
let handScore;
let totalPoints;
let hand = [];
let deals = 0;
let playerBet = 0;
let playerChips = 100;
let deck;

// DOM elements
const container = document.getElementById("hand");
const output = document.getElementById("output");
const dealButton = document.getElementById("deal-button");
const betOne = document.getElementById("bet-one");
const betMax = document.getElementById("bet-max");
const playerPoints = document.getElementById("player-points");
const playerBetsDiv = document.getElementById("player-bets");

const increaseBet = () => {
  dealButton.disabled = false;
  if (playerBet >= 5) {
    playerBet = 0;
  }
  playerBet += 1;
  highlightScore();
  playerBetsDiv.innerText = `Player's Bet \n\n ${playerBet}`;
};

const maxBet = () => {
  dealButton.disabled = false;
  playerBet = 5;
  highlightScore();
  playerBetsDiv.innerText = `Player's Bet \n\n ${playerBet}`;
};

const highlightScore = () => {
  let x = document.querySelectorAll(".score");
  for (let o = 0; o < x.length; o += 1) {
    x[o].style.backgroundColor = "rgba(0, 0, 139, 0.514)";
  }
  let num = playerBet - 1;
  x[num].style.backgroundColor = "rgba(255, 0, 221, 0.616)";
};

const initGame = () => {
  deck = makeDeck();
  deck = shuffleCards(deck);
  dealToHand(deck);
  console.log(hand);
};

const calcHandScore = (hand) => {
  totalPoints = hand[0].rank;
  for (let i = 1; i < hand.length; i += 1) {
    totalPoints += hand[i].rank;
  }

  pointSelection(hand);
  console.log("score", handScore);
  if (handScore < 0) {
    playerChips -= playerBet;
  } else {
    playerChips += playerBet * handScore;
  }

  playerPoints.innerText = `Player Points \n\n ${playerChips}`;
};

const makeDeck = () => {
  // create the empty deck at the beginning
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

const dealToHand = (deck) => {
  for (let i = 0; i < 5; i += 1) {
    let card = deck.pop();
    hand.push(card);
  }
};

const toggleStay = (card) => {
  if (card.change === "hold") {
    card.change = "change";
  } else if (card.change === "change") {
    card.change = "hold";
  }
};

const resetChange = (hand) => {
  for (let b = 0; b < hand.length; b += 1) {
    let card = hand[b];
    card.change = "change";
  }
};

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

  initGame();

  dealButton.disabled = true;
  betOne.disabled = false;
  betMax.disabled = false;
  console.log(deals);
};

const popup = () => {
  const pop = document.createElement("div");
  if (handScore < 0) {
    pop.innerText = "GAME OVER";
  } else {
    pop.innerText = "YOU WIN";
  }

  pop.classList.add("popup");
  document.body.appendChild(pop);
  setTimeout(function () {
    pop.remove();
    resetGame();
  }, 1000);
};

betOne.addEventListener("click", increaseBet);
betMax.addEventListener("click", maxBet);
initGame();

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
    calcHandScore(hand);
    setTimeout(popup, 1000);
  }
});

dealButton.disabled = true;
