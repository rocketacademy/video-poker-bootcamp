/**
 * Function to create example Royal Flush hand
 * @function
 */
const exampleRoyalFlush = () => {
  const hand = [
    { displayName: "A", suitSymbol: "♠️", rank: "1" },
    { displayName: "K", suitSymbol: "♠️", rank: "13" },
    { displayName: "Q", suitSymbol: "♠️", rank: "12" },
    { displayName: "J", suitSymbol: "♠️", rank: "11" },
    { displayName: "10", suitSymbol: "♠️", rank: "10" },
  ];

  buildMiniCardExample(hand, "royal-flush-card-example");
};

/**
 * Function to create example Straight Flush hand
 * @function
 */
const exampleStraightFlush = () => {
  const hand = [
    { displayName: "K", suitSymbol: "♥️", rank: "13" },
    { displayName: "Q", suitSymbol: "♥️", rank: "12" },
    { displayName: "J", suitSymbol: "♥️", rank: "11" },
    { displayName: "10", suitSymbol: "♥️", rank: "10" },
    { displayName: "9", suitSymbol: "♥️", rank: "9" },
  ];

  buildMiniCardExample(hand, "straight-flush-card-example");
};

/**
 * Function to create example Four kind hand
 * @function
 */
const exampleFourKind = () => {
  const hand = [
    { displayName: "5", suitSymbol: "♥️", rank: "13" },
    { displayName: "5", suitSymbol: "♦️", rank: "12" },
    { displayName: "5", suitSymbol: "♣️", rank: "11" },
    { displayName: "5", suitSymbol: "♠️", rank: "10" },
    { displayName: "x", suitSymbol: "x", rank: "x" },
  ];

  buildMiniCardExample(hand, "four-kind-card-example");
};

/**
 * Function to create example Full House hand
 * @function
 */
const exampleFullHouse = () => {
  const hand = [
    { displayName: "9", suitSymbol: "♥️", rank: "9" },
    { displayName: "9", suitSymbol: "♦️", rank: "9" },
    { displayName: "7", suitSymbol: "♣️", rank: "7" },
    { displayName: "7", suitSymbol: "♦️", rank: "7" },
    { displayName: "7", suitSymbol: "♠️", rank: "7" },
  ];

  buildMiniCardExample(hand, "full-house-card-example");
};

/**
 * Function to create example Flush hand
 * @function
 */
const exampleFlush = () => {
  const hand = [
    { displayName: "3", suitSymbol: "♣️", rank: "3" },
    { displayName: "5", suitSymbol: "♣️", rank: "5" },
    { displayName: "8", suitSymbol: "♣️", rank: "8" },
    { displayName: "9", suitSymbol: "♣️", rank: "9" },
    { displayName: "10", suitSymbol: "♣️", rank: "10" },
  ];

  buildMiniCardExample(hand, "flush-card-example");
};

/**
 * Function to create example Straight hand
 * @function
 */
const exampleStraight = () => {
  const hand = [
    { displayName: "6", suitSymbol: "♦️", rank: "6" },
    { displayName: "7", suitSymbol: "♣️", rank: "7" },
    { displayName: "8", suitSymbol: "♠️", rank: "8" },
    { displayName: "9", suitSymbol: "♥️", rank: "9" },
    { displayName: "10", suitSymbol: "♠️", rank: "10" },
  ];

  buildMiniCardExample(hand, "straight-card-example");
};

/**
 * Function to create example Three of a kind hand
 * @function
 */
const exampleThreeKind = () => {
  const hand = [
    { displayName: "2", suitSymbol: "♦️", rank: "2" },
    { displayName: "2", suitSymbol: "♣️", rank: "2" },
    { displayName: "2", suitSymbol: "♥️", rank: "2" },
    { displayName: "x", suitSymbol: "x", rank: "x" },
    { displayName: "x", suitSymbol: "x", rank: "x" },
  ];

  buildMiniCardExample(hand, "three-kind-card-example");
};

/**
 * Function to create example Two of a kind hand
 * @function
 */
const exampleTwoKind = () => {
  const hand = [
    { displayName: "Q", suitSymbol: "♥️", rank: "12" },
    { displayName: "Q", suitSymbol: "♠️", rank: "12" },
    { displayName: "4", suitSymbol: "♦️", rank: "4" },
    { displayName: "4", suitSymbol: "♣️", rank: "4" },
    { displayName: "x", suitSymbol: "x", rank: "x" },
  ];

  buildMiniCardExample(hand, "two-kind-card-example");
};

/**
 * Function to create example High card hand
 * @function
 */
const exampleHighCard = () => {
  const hand = [
    { displayName: "J", suitSymbol: "♠️", rank: "12" },
    { displayName: "x", suitSymbol: "x", rank: "x" },
    { displayName: "x", suitSymbol: "x", rank: "x" },
    { displayName: "x", suitSymbol: "x", rank: "x" },
    { displayName: "x", suitSymbol: "x", rank: "x" },
  ];

  buildMiniCardExample(hand, "high-card-example");
};

/**
 * Helper Function to build mini cards for example column in score table
 * @function
 * @param {array} hand array containing card objs
 * @param {string} id of dom element
 */
const buildMiniCardExample = (hand, id) => {
  const miniCardExample = document.getElementById(id);

  for (let i = 0; i < hand.length; i += 1) {
    const card = hand[i];
    const cardElement = document.createElement("div");
    cardElement.classList.add("mini-card");
    cardElement.id = `mini-card-${i}`;

    if (card.suitSymbol === "♥️" || card.suitSymbol === "♦️") {
      cardElement.style.color = "red";
    }

    switch (true) {
      case card.displayName === "J" ||
        card.displayName === "Q" ||
        card.displayName === "K" ||
        card.displayName === "A":
        cardElement.innerHTML =
          card.displayName + "<br />" + card.suitSymbol + "<br />" + card.rank;
        break;
      case card.displayName === "x":
        cardElement.className = "mini-card-back";
        break;
      default:
        cardElement.innerHTML = card.displayName + "<br />" + card.suitSymbol;
        break;
    }
    miniCardExample.appendChild(cardElement);
  }

  return miniCardExample;
};

/**
 * Helper Function to generate all examples in the score table
 * @function
 */
const buildAllExamples = () => {
  exampleRoyalFlush();
  exampleStraightFlush();
  exampleFourKind();
  exampleFullHouse();
  exampleFlush();
  exampleStraight();
  exampleThreeKind();
  exampleTwoKind();
  exampleHighCard();
};

/**
 * Function to give toggle button functionality (refer to onToggleButtonClick)
 * @function
 */
const createToggleButton = () => {
  const toggleButton = document.getElementById("toggle-button");
  toggleButton.addEventListener("click", onToggleButtonClick);
};

/**
 * Function for toggle button behavior
 * @function
 */
const onToggleButtonClick = () => {
  const tableDiv = document.getElementById("instructions-table-div");
  tableDiv.style.display = tableDiv.style.display === "none" ? "block" : "none";
};

/**
 * Exported Function to create toggle button and display score table
 * @function
 */
export const createScoreTable = () => {
  createToggleButton();
  buildAllExamples();
};
