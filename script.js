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
  const suitSymbols = ["♥", "♦", "♣", "♠"];
  const suitColours = ["red", "red", "black", "black"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const cardSymbol = suitSymbols[suitIndex];
    const cardColour = suitColours[suitIndex];

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
        suitSymbol: cardSymbol,
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
        displayName: cardName,
        colour: cardColour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

const createCard = (cardInfo) => {
  // const cardID = String(playerNum) + "-" + String(cardNum);
  const suit = document.createElement("div");
  suit.classList.add("suit", cardInfo.colour);
  suit.innerText = cardInfo.suitSymbol;
  const name = document.createElement("div");
  name.classList.add("name", cardInfo.colour);
  name.innerText = cardInfo.displayName;
  const card = document.createElement("div");
  card.className = "card";
  // card.id = cardID;
  // const decision = document.createElement("div");
  // decision.innerText = "REPLACE";
  // decision.className = "decision";
  card.appendChild(name);
  card.appendChild(suit);
  // card.appendChild(decision);
  return card;
};

const dealFirstHands = () => {
  hand = [];
  handClickTracker = [REPLACE, REPLACE, REPLACE, REPLACE, REPLACE];
  deck = shuffleCards(makeDeck());
  for (let i = 0; i < 5; i += 1) {
    let card = deck.pop();
    hand.push(card);
  }
};

const calcHandScore = (hand) => {
  const isFlush = (cardSuitTally) => {
    for (const suit in cardSuitTally) {
      if (cardSuitTally[suit] === 5) {
        return true;
      }
    }
  };

  const isStraight = (hand) => {
    let rankList = [];
    for (let i = 0; i < hand.length; i += 1) {
      rankList.push(hand[i].rank);
    }
    rankList.sort(function (a, b) {
      return a - b;
    });
    let isStraightCheck = 0;
    for (let j = 1; j < rankList.length; j += 1) {
      if (rankList[j] - j === rankList[0]) {
        isStraightCheck += 1;
      }
    }
    if (isStraightCheck === 4) {
      return true;
    }
  };

  const isFourOfKind = (cardNameTally) => {
    for (const name in cardNameTally) {
      if (cardNameTally[name] === 4) {
        return true;
      }
    }
  };

  const isThreeOfKind = (cardNameTally) => {
    for (const name in cardNameTally) {
      if (cardNameTally[name] === 3) {
        return true;
      }
    }
  };

  const numPairs = (cardNameTally) => {
    let pairsCount = 0;
    for (const name in cardNameTally) {
      if (cardNameTally[name] === 2) {
        pairsCount += 1;
      }
    }

    if (pairsCount === 1) {
      for (const name in cardNameTally) {
        if (
          cardNameTally[name] === 2 &&
          !(name === "J" || name === "Q" || name === "K" || name === "A")
        ) {
          pairsCount = 0;
        }
      }
    }
    return pairsCount;
  };

  const cardNameTally = {};
  for (let i = 0; i < hand.length; i += 1) {
    var cardName = hand[i].name;
    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  }

  const cardSuitTally = {};
  for (let i = 0; i < hand.length; i += 1) {
    var cardSuit = hand[i].suit;
    // If we have seen the card name before, increment its count
    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardSuitTally[cardSuit] = 1;
    }
  }

  if (isFlush(cardSuitTally) && isStraight(hand)) {
    return "STRAIGHT FLUSH";
  }

  if (isFourOfKind(cardNameTally)) {
    return "4 OF A KIND";
  }

  if (isThreeOfKind(cardNameTally) && numPairs(cardNameTally) === 1) {
    return "FULL HOUSE";
  }

  if (isFlush(cardSuitTally)) {
    return "FLUSH";
  }

  if (isStraight(hand)) {
    return "STRAIGHT";
  }

  if (isThreeOfKind(cardNameTally)) {
    return "3 OF A KIND";
  }

  if (numPairs(cardNameTally) === 2) {
    return "2 PAIRS";
  }

  if (numPairs(cardNameTally) === 1) {
    return "PAIR OF JACKS";
  }

  return "Did not win anything";
};

const printDecision = () => {
  decisionContainer.innerHTML = "";
  for (let i = 0; i < 5; i += 1) {
    const decision = document.createElement("div");
    decision.innerText = handClickTracker[i];
    decision.className = "decision";
    decisionContainer.appendChild(decision);
  }
};

const printResult = () => {
  for (let i = 0; i < 5; i += 1) {
    if (handClickTracker[i] === REPLACE) {
      let newCard = deck.pop();
      hand[i] = newCard;
    }
  }
  cardContainer.innerHTML = "";
  const handElement = document.createElement("div");
  for (let i = 0; i < 5; i += 1) {
    const cardElement = createCard(hand[i]);

    handElement.appendChild(cardElement);
  }
  cardContainer.appendChild(handElement);
};

const cardClick = (cardElement, i) => {
  if (handClickTracker[i] === REPLACE && gameMode != "end-round") {
    // gameMode = "calc-score";

    cardElement.classList.add("selected-card");
    handClickTracker[i] = KEEP;

    // const clickedCard = hand[i];

    const clickedCard = hand[i];
    gameInfo.innerText = `Clicked card is ${clickedCard.displayName} ${clickedCard.suitSymbol}`;
    printDecision();
    return;
    // let newCard = deck.pop();
    // hand[i] = newCard;
    // handClickTracker[i] = true;
  }

  if (handClickTracker[i] === KEEP && gameMode != "end-round") {
    // gameMode = "calc-score";

    cardElement.classList.remove("selected-card");
    handClickTracker[i] = REPLACE;
    // const clickedCard = hand[i];

    const clickedCard = hand[i];
    gameInfo.innerText = `Clicked card is ${clickedCard.displayName} ${clickedCard.suitSymbol}`;
    // let newCard = deck.pop();
    // hand[i] = newCard;
    // handClickTracker[i] = true;
    printDecision();
    return;
  }
};

const indexPossibilities = (numToReplace) => {
  let combis = [];
  if (numToReplace === 1) {
    for (let i = 0; i < 47; i += 1) {
      combis.push([i]);
    }
  }
  if (numToReplace === 2) {
    for (let i = 0; i < 47; i += 1) {
      for (let j = i + 1; j < 47; j += 1) {
        combis.push([i, j]);
      }
    }
  }
  if (numToReplace === 3) {
    for (let i = 0; i < 47; i += 1) {
      for (let j = i + 1; j < 47; j += 1) {
        for (let k = j + 1; k < 47; k += 1) {
          combis.push([i, j, k]);
        }
      }
    }
  }
  if (numToReplace === 4) {
    for (let i = 0; i < 47; i += 1) {
      for (let j = i + 1; j < 47; j += 1) {
        for (let k = j + 1; k < 47; k += 1) {
          for (let l = k + 1; l < 47; l += 1) {
            combis.push([i, j, k, l]);
          }
        }
      }
    }
  }
  if (numToReplace === 5) {
    for (let i = 0; i < 47; i += 1) {
      for (let j = i + 1; j < 47; j += 1) {
        for (let k = j + 1; k < 47; k += 1) {
          for (let l = k + 1; l < 47; l += 1) {
            for (let m = l + 1; m < 47; m += 1) {
              combis.push([i, j, k, l, m]);
            }
          }
        }
      }
    }
  }
  return combis;
};

//1. Game info message
let gameInfo = document.createElement("div");
gameInfo.innerText = "Video Poker - Click Deal to start";
gameInfo.className = "game-info";
document.body.appendChild(gameInfo);

//2. Card container (and slider buttons for keep or discard?)
let cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
document.body.appendChild(cardContainer);

let decisionContainer = document.createElement("div");
decisionContainer.classList.add("decision-container");
document.body.appendChild(decisionContainer);

//Credits tracker container
let creditsInfo = document.createElement("div");
creditsInfo.innerText = "Credits: 100";
creditsInfo.className = "credits-tracker";
document.body.appendChild(creditsInfo);

//Buttons
let buttonsContainer = document.createElement("div");
buttonsContainer.classList.add("buttons-container");
let dealButton = document.createElement("button");
dealButton.innerText = "Deal";

let betButton = document.createElement("button");
betButton.innerText = "Bet 1";
buttonsContainer.appendChild(betButton);
buttonsContainer.appendChild(dealButton);
document.body.appendChild(buttonsContainer);

const output = (message) => {
  gameInfo.innerText = message;
};

//start of game logic

const KEEP = "keep";
const REPLACE = "replace";
let deck;
let hand;
let handClickTracker = [REPLACE, REPLACE, REPLACE, REPLACE, REPLACE];
let gameMode = "first-draw"; // "calc-score" //"end-round"

dealButton.addEventListener("click", () => {
  // buildCardElements();

  if (gameMode === "first-draw") {
    dealFirstHands();
    gameInfo.innerText = "Select cards you want to replace";
    cardContainer.innerHTML = "";
    const handElement = document.createElement("div");
    for (let i = 0; i < 5; i += 1) {
      const cardElement = createCard(hand[i]);
      cardElement.addEventListener("click", (event) => {
        // we will want to pass in the card element so
        // that we can change how it looks on screen, i.e.,
        // "turn the card over"
        cardClick(event.currentTarget, i);
      });
      handElement.appendChild(cardElement);
    }
    cardContainer.appendChild(handElement);
    gameMode = "calc-score";
    return;
  }
  if (gameMode === "calc-score") {
    decisionContainer.innerHTML = "";
    gameMode = "end-round";
    printResult();

    gameInfo.innerText = calcHandScore(hand);
    gameMode = "first-draw";
    return;
  }
});
