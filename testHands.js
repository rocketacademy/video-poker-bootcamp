const makeDeckTest = () => {
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

const testDeck = makeDeckTest();

const isStraightTest = (hand) => {
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
  if (isStraightCheck == 4) {
    return true;
  } else return false;
};

const testsf = [
  testDeck[32],
  testDeck[33],
  testDeck[34],
  testDeck[35],
  testDeck[36],
];

const testrf = [
  testDeck[9],
  testDeck[11],
  testDeck[12],
  testDeck[10],
  testDeck[0],
];

const testfourk = [
  testDeck[14],
  testDeck[4],
  testDeck[17],
  testDeck[30],
  testDeck[43],
];

const testfhse = [
  testDeck[5],
  testDeck[18],
  testDeck[31],
  testDeck[12],
  testDeck[25],
];

const testflush = [
  testDeck[23],
  testDeck[21],
  testDeck[20],
  testDeck[16],
  testDeck[15],
];

const teststraight = [
  testDeck[1],
  testDeck[15],
  testDeck[29],
  testDeck[43],
  testDeck[44],
];

const testthreek = [
  testDeck[11],
  testDeck[24],
  testDeck[37],
  testDeck[46],
  testDeck[26],
];

const testHand_twopair = [
  testDeck[9],
  testDeck[22],
  testDeck[27],
  testDeck[40],
  testDeck[4],
];

const testHand_onepair = [
  testDeck[4],
  testDeck[14],
  testDeck[2],
  testDeck[3],
  testDeck[1],
];

const testHand_onepair_king = [
  testDeck[4],
  testDeck[0],
  testDeck[2],
  testDeck[3],
  testDeck[13],
];
