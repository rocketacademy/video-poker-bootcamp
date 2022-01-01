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

const createCard = (cardInfo, tracker) => {
  let img = document.createElement("img");
  img.className = "card";
  if (tracker === REPLACE) {
    img.classList.add("card-animate");
  }
  img.src = `./${cardInfo.name}_of_${cardInfo.suit}.svg`;

  return img;
};

const showCardBacks = () => {
  cardContainer.innerHTML = "";
  const handElement = document.createElement("div");
  for (let i = 0; i < 5; i += 1) {
    let img = document.createElement("img");
    img.className = "card";
    img.src = "./Card_back_05a.svg";
    const cardElement = img;
    handElement.appendChild(cardElement);
  }
  cardContainer.appendChild(handElement);
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
    if (
      rankList[0] === 1 &&
      rankList[1] === 10 &&
      rankList[2] === 11 &&
      rankList[3] === 12 &&
      rankList[4] === 13
    ) {
      return "BROADWAY";
    }
    if (isStraightCheck === 4) {
      return "STRAIGHT";
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

  if (isFlush(cardSuitTally) && isStraight(hand) === "BROADWAY") {
    return "ROYAL FLUSH";
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

  if (isStraight(hand) === "BROADWAY" || isStraight(hand) === "STRAIGHT") {
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

  return "NIL";
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

const revealAdvice = (decisionTracker) => {
  probContainer.innerHTML = "";
  for (let i = 0; i < 5; i += 1) {
    const decision = document.createElement("div");
    decision.innerText = decisionTracker[i];
    decision.className = "decision";
    probContainer.appendChild(decision);
  }
};

const printResultHand = () => {
  for (let i = 0; i < 5; i += 1) {
    if (handClickTracker[i] === REPLACE) {
      let newCard = deck.pop();
      hand[i] = newCard;
    }
  }
  cardContainer.innerHTML = "";
  const handElement = document.createElement("div");
  for (let i = 0; i < 5; i += 1) {
    const cardElement = createCard(hand[i], handClickTracker[i]);

    handElement.appendChild(cardElement);
  }
  cardContainer.appendChild(handElement);
};

const findPayout = (result) => {
  let payAmount = 0;
  if (result === "ROYAL FLUSH") {
    payAmount = 250;
    if (betAmount === 5) {
      payAmount = 800;
    }
  }

  if (result === "STRAIGHT FLUSH") {
    payAmount = 50;
  }

  if (result === "4 OF A KIND") {
    payAmount = 25;
  }
  if (result === "FULL HOUSE") {
    payAmount = 9;
  }
  if (result === "FLUSH") {
    payAmount = 6;
  }
  if (result === "STRAIGHT") {
    payAmount = 4;
  }
  if (result === "3 OF A KIND") {
    payAmount = 3;
  }
  if (result === "2 PAIRS") {
    payAmount = 2;
  }
  if (result === "PAIR OF JACKS") {
    payAmount = 1;
  }
  payAmount *= betAmount;

  return payAmount;
};

const givePayout = (payAmount) => {
  credits += payAmount;
};

const cardClick = (cardElement, i) => {
  if (handClickTracker[i] === REPLACE && gameMode != "end-round") {
    // gameMode = "calc-score";

    cardElement.classList.add("selected-card");
    handClickTracker[i] = KEEP;

    // const clickedCard = hand[i];

    const clickedCard = hand[i];

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

    // let newCard = deck.pop();
    // hand[i] = newCard;
    // handClickTracker[i] = true;
    printDecision();
    return;
  }
};

const indexPossibilities = (numToReplace, listLength) => {
  let combis = [];
  if (numToReplace === 1) {
    for (let i = 0; i < listLength; i += 1) {
      combis.push([i]);
    }
  }
  if (numToReplace === 2) {
    for (let i = 0; i < listLength; i += 1) {
      for (let j = i + 1; j < listLength; j += 1) {
        combis.push([i, j]);
      }
    }
  }
  if (numToReplace === 3) {
    for (let i = 0; i < listLength; i += 1) {
      for (let j = i + 1; j < listLength; j += 1) {
        for (let k = j + 1; k < listLength; k += 1) {
          combis.push([i, j, k]);
        }
      }
    }
  }
  if (numToReplace === 4) {
    for (let i = 0; i < listLength; i += 1) {
      for (let j = i + 1; j < listLength; j += 1) {
        for (let k = j + 1; k < listLength; k += 1) {
          for (let l = k + 1; l < listLength; l += 1) {
            combis.push([i, j, k, l]);
          }
        }
      }
    }
  }
  if (numToReplace === 5) {
    for (let i = 0; i < listLength; i += 1) {
      for (let j = i + 1; j < listLength; j += 1) {
        for (let k = j + 1; k < listLength; k += 1) {
          for (let l = k + 1; l < listLength; l += 1) {
            for (let m = l + 1; m < listLength; m += 1) {
              combis.push([i, j, k, l, m]);
            }
          }
        }
      }
    }
  }
  return combis;
};

const findProbabilities = (decisionTracker) => {
  let numToReplace = 0;
  let indexToReplace = [];
  for (let i = 0; i < 5; i += 1) {
    if (decisionTracker[i] === REPLACE) {
      indexToReplace.push(i);
      numToReplace += 1;
      // let newCard = deck.pop();
      // hand[i] = newCard;
    }
  }
  let deckIndices = indexPossibilities(numToReplace, 47);
  let allPossibleHands = [];
  if (numToReplace === 0) {
    allPossibleHands.push(hand);
  }
  for (let i = 0; i < deckIndices.length; i += 1) {
    let possibleHand = [...hand];
    for (let j = 0; j < indexToReplace.length; j += 1) {
      possibleHand[indexToReplace[j]] = deck[deckIndices[i][j]];
    }
    allPossibleHands.push(possibleHand);
  }
  const resultsList = [
    "ROYAL FLUSH",
    "STRAIGHT FLUSH",
    "4 OF A KIND",
    "FULL HOUSE",
    "FLUSH",
    "STRAIGHT",
    "3 OF A KIND",
    "2 PAIRS",
    "PAIR OF JACKS",
    "NIL",
  ];
  let winningHandsTally = {};
  winningHandsTally["TOTAL"] = allPossibleHands.length;

  for (let i = 0; i < resultsList.length; i += 1) {
    winningHandsTally[resultsList[i]] = 0;
  }
  for (let i = 0; i < allPossibleHands.length; i += 1) {
    let result = calcHandScore(allPossibleHands[i]);
    winningHandsTally[result] += 1;
  }

  return winningHandsTally;
};

const expectedProbabilities = (probTally) => {
  const total = probTally["TOTAL"];
  let expectedPayout = 0;
  let outputString = `TOTAL POSSIBLE HAND COMBIS: ${total}<br><br>`;
  const resultsList = [
    "ROYAL FLUSH",
    "STRAIGHT FLUSH",
    "4 OF A KIND",
    "FULL HOUSE",
    "FLUSH",
    "STRAIGHT",
    "3 OF A KIND",
    "2 PAIRS",
    "PAIR OF JACKS",
    "NIL",
  ];
  for (let i = 0; i < resultsList.length; i += 1) {
    let probPct = (100 * probTally[resultsList[i]]) / total;
    expectedPayout += (probPct * findPayout(resultsList[i])) / 100;
    outputString += `${resultsList[i]}: ${probPct.toFixed(5)}%<br>`;
  }
  outputString += `<br>EXPECTED PAYOUT: ${expectedPayout.toFixed(5)}`;

  // probContainer.innerHTML = outputString;

  return [outputString, expectedPayout];
};

const giveSelectionAdvice = () => {
  let expectedPayoutList = [];
  const sampleSelection = [REPLACE, REPLACE, REPLACE, REPLACE, REPLACE];
  let sampleSelectionList = [];
  sampleSelectionList.push(sampleSelection);
  for (let i = 1; i <= 5; i += 1) {
    let indexToKeep = indexPossibilities(i, 5);

    for (let j = 0; j < indexToKeep.length; j += 1) {
      let possibleSelection = [...sampleSelection];
      for (let k = 0; k < indexToKeep[j].length; k += 1) {
        possibleSelection[indexToKeep[j][k]] = KEEP;
      }
      sampleSelectionList.push(possibleSelection);
    }
  }
  for (let i = 0; i < sampleSelectionList.length; i += 1) {
    expectedPayoutList.push({
      choices: sampleSelectionList[i],
      value: expectedProbabilities(
        findProbabilities(sampleSelectionList[i])
      )[1],
    });
  }

  expectedPayoutList.sort(function (a, b) {
    return b.value - a.value;
  });

  return expectedPayoutList[0].choices;
};

//1. Game info message
let gameInfo = document.createElement("div");
gameInfo.innerText = "Place bet and click deal to start";
gameInfo.className = "game-info";
document.body.appendChild(gameInfo);

//2. Card container (and slider buttons for keep or discard?)
let cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
cardContainer.classList.add("gradient-border");
document.body.appendChild(cardContainer);

let decisionContainer = document.createElement("div");
decisionContainer.classList.add("decision-container");
document.body.appendChild(decisionContainer);

//Credits tracker container
let creditsInfo = document.createElement("div");
creditsInfo.innerText = "BET: 0 CREDITS: 100";
creditsInfo.className = "credits-tracker";
document.body.appendChild(creditsInfo);

//Buttons
let buttonsContainer = document.createElement("div");
buttonsContainer.classList.add("buttons-container");
let dealButton = document.createElement("button");
dealButton.innerText = "DEAL";

let betButton = document.createElement("button");
betButton.innerText = "BET ONE";

let probButton = document.createElement("button");
probButton.innerText = "CALC PROBS";
probButton.classList.add("disabled-button");

let adviceButton = document.createElement("button");
adviceButton.innerText = "ADVISE ME";
adviceButton.classList.add("disabled-button");

buttonsContainer.appendChild(betButton);
buttonsContainer.appendChild(dealButton);
buttonsContainer.appendChild(probButton);
buttonsContainer.appendChild(adviceButton);
document.body.appendChild(buttonsContainer);

let probContainer = document.createElement("div");
probContainer.classList.add("game-info");
document.body.appendChild(probContainer);
// probText = `hello <br> did br work`;
// probContainer.innerHTML = probText;

const output = (message) => {
  gameInfo.innerText = message;
};

//start of game logic

const KEEP = "KEEP";
const REPLACE = "REPLACE";
let betAmount = 0;
let credits = 100;
let deck;
let hand;
let handClickTracker = [REPLACE, REPLACE, REPLACE, REPLACE, REPLACE];
let gameMode = "first-draw"; // "calc-score" //"end-round"
let adviceResult = 0;

showCardBacks();
betButton.addEventListener("click", () => {
  if (betAmount < 5 && gameMode === "first-draw") {
    betAmount += 1;
    credits -= 1;
    creditsInfo.innerText = `BET: ${betAmount} CREDITS: ${credits}`;
  }

  if (betAmount === 5) {
    betButton.classList.add("disabled-button");
  }
});

probButton.addEventListener("click", () => {
  if (gameMode === "calc-score") {
    // const drStrangeImage =
    //   '<img src="https://c.tenor.com/nDhUSRc7Q-8AAAAd/timeline-doctor-strange.gif"/>';
    probContainer.innerHTML = `Calculating...`;

    setTimeout(() => {
      let outputList = expectedProbabilities(
        findProbabilities(handClickTracker)
      );
      let outputString = outputList[0];
      probContainer.innerHTML = outputString;
    }, 1);
  }
});

dealButton.addEventListener("click", () => {
  // buildCardElements();

  if (gameMode === "first-draw" && betAmount > 0) {
    betButton.classList.add("disabled-button");
    probButton.classList.remove("disabled-button");
    adviceButton.classList.remove("disabled-button");
    dealFirstHands();
    gameInfo.innerText = "Select cards you want to keep then deal again";
    cardContainer.innerHTML = "";
    const handElement = document.createElement("div");
    for (let i = 0; i < 5; i += 1) {
      const cardElement = createCard(hand[i], handClickTracker[i]);
      cardElement.addEventListener("click", (event) => {
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
    probButton.classList.add("disabled-button");
    adviceButton.classList.add("disabled-button");
    dealButton.classList.add("disabled-button");
    gameMode = "end-round";
    //FOR TEST HANDS
    // hand = testrf;
    // handClickTracker = [KEEP, KEEP, KEEP, KEEP, KEEP];
    printResultHand();
    let handResult = calcHandScore(hand);
    givePayout(findPayout(handResult));

    setTimeout(() => {
      gameInfo.classList.add("blinking");
      gameInfo.innerText = handResult;
      if (handResult === "NIL") {
        gameInfo.classList.remove("blinking");
        gameInfo.innerText = "Oops, no luck :(";
      }
    }, 1);

    betAmount = 0;

    setTimeout(() => {
      gameInfo.innerText = "Place bet and click deal to start";
      creditsInfo.innerText = `BET: ${betAmount} CREDIT: ${credits}`;
      probContainer.innerHTML = "";
      showCardBacks();
      gameMode = "first-draw";
      betButton.classList.remove("disabled-button");
      dealButton.classList.remove("disabled-button");
      gameInfo.classList.remove("blinking");
      adviceResult = 0;
    }, 5000);

    return;
  }
});

adviceButton.addEventListener("click", () => {
  if (gameMode === "calc-score") {
    probContainer.innerHTML = `Thinking...`;

    setTimeout(() => {
      if (adviceResult === 0) {
        adviceResult = giveSelectionAdvice();
        revealAdvice(adviceResult);
      } else {
        revealAdvice(adviceResult);
      }
    }, 1);
  }
});
