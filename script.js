let shuffledDeck = [];
const stats = {
  hand: [],
  clubs: 0,
  spades: 0,
  hearts: 0,
  diamonds: 0,
  ace: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  jack: 0,
  queen: 0,
  king: 0,
};
const rewards = {
  royalFlush: 250,
  straightFlush: 50,
  fourOfAKind: 25,
  fullHouse: 9,
  flush: 6,
  straight: 4,
  threeOfAKind: 3,
  twoPair: 2,
  jacksOrBetter: 1,
};
let playerCredits = 100;
let playerBet = 0;

/**
 *
 * @returns {Array} newDeck array contains a fresh deck of 52 cards
 */
const makeDeck = () => {
  const newDeck = [];
  const suits = ["hearts", "diamonds", "clubs", "spades"];
  const colors = ["red", "red", "black", "black"];

  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    const currentSuit = suits[suitIndex];
    const color = colors[suitIndex];

    for (let rankCounter = 2; rankCounter <= 14; rankCounter += 1) {
      let cardName = `${rankCounter}`;

      if (cardName === "14") {
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
        pic: `./images/cards/${cardName}_of_${currentSuit}.png`,
        color: color,
      };

      newDeck.push(card);
    }
  }

  return newDeck;
};

/**
 *
 * @param {Array} cards containing 52 newly created cards
 * @returns {Array} 52 shuffled cards
 */
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = Math.floor(Math.random() * cards.length);
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

const checkSameSuit = () => {};

const disableButton = (buttonId) => {
  document.getElementById(buttonId).className = "nes-btn is-disabled";
  document.getElementById(buttonId).disabled = true;
};

const enableButton = (buttonId) => {
  document.getElementById(buttonId).classList.remove("is-disabled");
  document.getElementById(buttonId).disabled = false;

  if (buttonId == "deal") {
    document.getElementById(buttonId).classList.add("is-primary");
  }
};

const updatePlayerBet = () => {
  document.getElementById("player-bet").innerHTML = playerBet;
};

const updatePlayerCredits = () => {
  document.getElementById("player-credits").innerHTML = playerCredits;
};

const updateInstructions = (instructions) => {
  document.getElementById("instructions").innerHTML = instructions;
};

const toggleHold = (cardId) => {
  if (document.getElementById(`hold-${cardId}`).className == "unhold") {
    document.getElementById(`hold-${cardId}`).className = "hold";
  } else {
    document.getElementById(`hold-${cardId}`).className = "unhold";
  }
};

const updateCards = () => {
  let counter = 0;
  let setCards = setInterval(() => {
    let card = document.createElement("IMG");
    card.src = `${stats.hand[counter].pic}`;
    card.id = `${counter}`

    let cardDiv = document.getElementById(
      `card-${counter}`
    );

    card.addEventListener('click', (event) => {
      toggleHold(event.target.id);
    });

    cardDiv.appendChild(card);

    let hold = document.createElement("div");
    hold.classList.add("unhold");
    hold.id = `hold-${counter}`;
    hold.innerText = "Hold";

    hold.addEventListener('click', (event) => {
      toggleHold(event.target.id.split("-")[1]);
    });

    cardDiv.appendChild(hold);

    if (counter == 4) {
      clearInterval(setCards);
    }

    counter++;
  }, 100);
};

const highlightRewardColumn = () => {
  let scoreTable = document.getElementById("score-table");
  let col;

  for (let i = 0; i < scoreTable.rows.length; i++) {
    for (let j = 0; j <= 5; j++) {
      if (j == playerBet) {
        scoreTable.rows[i].cells[j].style.color = "#209cee";
      } else {
        scoreTable.rows[i].cells[j].style.color = "white";
      }
    }
  }
};

const initGame = () => {
  shuffledDeck = shuffleCards(makeDeck());

  document.getElementById("bet-1").addEventListener("click", () => {
    if (playerBet < 5) {
      playerBet += 1;
      playerCredits -= 1;

      if (playerBet == 5) {
        disableButton("bet-1");
      }

      disableButton("bet-5");
      enableButton("deal");

      updatePlayerBet();
      updatePlayerCredits();

      highlightRewardColumn();
    }
  });

  document.getElementById("bet-5").addEventListener("click", () => {
    playerBet = 5;
    playerCredits -= 5;

    disableButton("bet-5");
    disableButton("bet-1");
    enableButton("deal");

    updatePlayerBet();
    updatePlayerCredits();

    highlightRewardColumn();
  });

  document.getElementById("deal").addEventListener("click", () => {
    disableButton("bet-1");
    disableButton("bet-5");

    let drawnCard;

    for (let i = 0; i < 5; i++) {
      drawnCard = shuffledDeck.pop();

      stats.hand.push(drawnCard);
      stats[drawnCard.name]++;
      stats[drawnCard.suit]++;
    }

    updateInstructions(
      `Click on any card to hold and press <span class="nes-text is-primary">Deal</span> again.`
    );
    updateCards();
  });
};

initGame();
