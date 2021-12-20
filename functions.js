let deck;
let hand;

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
  const suitsSymbol = ["♥", "♦", "♣", "♠"];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitsSymbol[suitIndex];
    let currentColour;

    if (currentSuit == "hearts" || currentSuit == "diamonds") {
      currentColour = "red";
    } else {
      currentColour = "black";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let shortName = `${rankCounter}`;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === "1") {
        cardName = "Ace";
        shortName = "A";
      } else if (cardName === "11") {
        cardName = "Jack";
        shortName = "J";
      } else if (cardName === "12") {
        cardName = "Queen";
        shortName = "Q";
      } else if (cardName === "13") {
        cardName = "King";
        shortName = "K";
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        name: cardName,
        suit: currentSuit,
        suitSymbol: currentSuitSymbol,
        rank: rankCounter,
        displayName: shortName,
        colour: currentColour,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

/**
 * A function that takes in card hand & calculates the number of points based on that hand
 * Checks for the categories ranking first, then checks for higher card if previous check is a draw
 * In a draw situation, suits don't matter, higher card does (Ace highest)
 * To check for straights, check every card tally equals to 1, sum of ranks is a mulitple of 5, diff of max & min is 4 (accomodate for Ace)
 * To check for flush, suit tally equals to 5
 * To check for straight flush, combine checks for straights & flush
 * --To check for 3 or 4 of a kind, card tally equals to 3 or 4
 * TO check for full house, 4 or 3 of a kind, double or single pair, check card tally occurence pattern
 * @param  a {number} category points
 * @param  b {number} high card points
 * @return {number}   a & b mulitply with each other
 */

const getTallyValues = (tally) => {
  const tallyObjectValues = Object.values(tally);
  const descendingTallyObjectValues = tallyObjectValues.sort((a, b) => b - a);
  return descendingTallyObjectValues;
};

const getTallyKeys = (tally) => {
  const tallyObjectKeys = Object.keys(tally);
  const descendingTallyObjectKeys = tallyObjectKeys.sort((a, b) => b - a);
  return descendingTallyObjectKeys;
};

const checkFlush = (cardSuitTally) => {
  const cardSuitTallyValues = getTallyValues(cardSuitTally);
  if (cardSuitTallyValues[0] === 5) {
    return true;
  } else {
    return false;
  }
};

const checkStraight = (cardRankTally, checkAce) => {
  const cardRankTallyValues = getTallyValues(cardRankTally).map((x) =>
    Number(x)
  );
  let outputvalue = false;
  const rankFrequency = [...new Set(cardRankTallyValues)];

  if (rankFrequency.length != 1 && rankFrequency[0] != 1) {
    return outputvalue;
  }

  const cardRankTallyKeys = getTallyKeys(cardRankTally).map((x) => Number(x));
  let rankSum = cardRankTallyKeys.reduce((a, b) => a + b);
  let rankMaxMinDiff =
    Math.max(...cardRankTallyKeys) - Math.min(...cardRankTallyKeys);

  if (rankSum % 5 === 0 && rankMaxMinDiff === 4) {
    outputvalue = true;
  } else if (checkAce === true) {
    // Ace rank changes from 1 to 14
    rankSum += 13;
    // Diff between initial Ace rank & King = 12
    // Diff between modified Ace rank & 10 = 4
    rankMaxMinDiff -= 8;

    if (rankSum === 60 && rankMaxMinDiff === 4) {
      outputvalue = true;
    }
  }

  return outputvalue;
};

// Placed after check straight & flush
const checkOtherCondition = (cardRankTally) => {
  let outputvalue = "Something went wrong";
  const cardRankTallyValues = getTallyValues(cardRankTally);

  // cardRankTallyValues.length will never be less than 2
  if (cardRankTallyValues[0] === 1) {
    outputvalue = "High Card";
  } else if (cardRankTallyValues[0] === 2 && cardRankTallyValues[1] === 2) {
    outputvalue = "2 Pairs";
  } else if (cardRankTallyValues[0] === 2) {
    outputvalue = "1 Pair";
  } else if (cardRankTallyValues[0] === 3 && cardRankTallyValues[1] === 2) {
    outputvalue = "Full House";
  } else if (cardRankTallyValues[0] === 3) {
    outputvalue = "3 of a Kind";
  } else if (cardRankTallyValues[0] === 4) {
    outputvalue = "4 of a Kind";
  }

  return outputvalue;
};

const checkHighCard = () => {};

const calcHandScore = (hand, betAmount) => {
  let outputvalue;
  let cardRankTally = {};
  let cardSuitTally = {};
  let checkAce = false;
  let highCardCounter = 0;
  let winnings = 0;

  for (let i = 0; i < hand.length; i++) {
    let cardRank = hand[i].rank;
    let cardSuit = hand[i].suit;

    if (cardRank === 1) {
      checkAce = true;
      highCardCounter += 1;
    } else if (cardRank >= 11) {
      highCardCounter += 1;
    }

    // Tallying card ranks & suits
    if (cardRank in cardRankTally) {
      cardRankTally[cardRank] += 1;
    } else {
      cardRankTally[cardRank] = 1;
    }

    if (cardSuit in cardSuitTally) {
      cardSuitTally[cardSuit] += 1;
    } else {
      cardSuitTally[cardSuit] = 1;
    }
  }

  console.log(cardRankTally);
  console.log(cardSuitTally);

  // const cardRankTallyValues = getTallyValues(cardRankTally);
  // const cardSuitTallyValues = getTallyValues(cardSuitTally);

  // console.log(cardRankTallyValues);
  // console.log(cardSuitTallyValues);

  const otherCheck = checkOtherCondition(cardRankTally);
  const straightHand = checkStraight(cardRankTally, checkAce);
  const flushHand = checkFlush(cardSuitTally);

  if (straightHand && flushHand) {
    console.log("straight flush");
    winnings = betAmount * 50;
    outputvalue = `You won ${winnings} points with a Straight Flush!!`;
  } else if (straightHand) {
    console.log("straight");
    winnings = betAmount * 4;
    outputvalue = `You won ${winnings} points with a Straight`;
  } else if (flushHand) {
    console.log("flush");
    winnings = betAmount * 6;
    outputvalue = `You won ${winnings} points with a Flush`;
  } else if (otherCheck === "High Card" && highCardCounter > 0) {
    console.log("high");
    winnings = betAmount * 1;
    outputvalue = `You won ${winnings} points with a High Card (Jack or higher)`;
    console.log("High Card Counter: " + highCardCounter);
  } else if (otherCheck === "High Card") {
    console.log("all other");
    outputvalue = `You didn't win anything 😢`;
  } else if (otherCheck === "2 Pairs") {
    console.log("2 pairs");
    winnings = betAmount * 2;
    outputvalue = `You won ${winnings} points with 2 Pairs`;
  } else if (otherCheck === "1 Pair") {
    console.log("1 pair");
    winnings = betAmount * 1;
    outputvalue = `You won ${winnings} points with a Pair`;
  } else if (otherCheck === "Full House") {
    console.log("full house");
    winnings = betAmount * 9;
    outputvalue = `You won ${winnings} points with a Full House`;
  } else if (otherCheck === "3 of a Kind") {
    console.log("3 of a Kind");
    winnings = betAmount * 3;
    outputvalue = `You won ${winnings} points with 3 of a kind`;
  } else if (otherCheck === "4 of a Kind") {
    console.log("4 of a Kind");
    winnings = betAmount * 25;
    outputvalue = `You won ${winnings} points with 4 of a kind!`;
  }

  return [outputvalue, winnings];
};

// Refer to testHands.js to whats the current hand
// calcHandScore returns the number of points a given hand earns.
const pointsForHand = calcHandScore(playerHand);
