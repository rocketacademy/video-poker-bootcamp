/** Function sorts hand by rank
 * @param hand refers to hand array with all 5 card objects
 * @return sorted ranks
 */
const sortByRank = (hand) => {
  const rankValues = [];
  for (let i = 0; i < hand.length; i += 1) {
    rankValues.push(hand[i].rank);
  }

  // bubble sort
  let swapped = true;
  do {
    swapped = false;
    for (let j = 0; j < rankValues.length; j += 1) {
      if (rankValues[j] > rankValues[j + 1]) {
        const temp = rankValues[j];
        rankValues[j] = rankValues[j + 1];
        rankValues[j + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return rankValues;
};

/** Create Object as tally
 * @param hand array containing all 5 card objects
 * @return cardNameTally object where keys are card.name, values are no. of occurence
*/
const tallyUpCards = (hand) => {
  console.log('tallyUpCards running');
  const cardNameTally = {};
  for (let i = 0; i < hand.length; i += 1) {
    const cardName = hand[i].name;

    // If we have seen the card name before, increment its count
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    // Else, initialise count of this card name to 1
    else {
      cardNameTally[cardName] = 1;
    }
  } console.log(cardNameTally);
  return cardNameTally; };

/** Function details all winning conditions and manipulates corresponding boolean value
 * @param hand is hand array with all 5 card objects
   */
const determineWin = (hand) => {
  const currentCardNameTally = tallyUpCards(hand);
  const sortedRanks = sortByRank(hand);
  const arrayOfCardNameTallyValues = Object.values(currentCardNameTally);

  for (let i = 0; i < hand.length - 1; i += 1) {
    console.log('flush check is running');
    if (hand[i].suit !== hand[i + 1].suit) {
      flush = false; // flush
    }
  }

  for (let j = 0; j < sortedRanks.length - 1; j += 1) {
    console.log('straights');
    if (sortedRanks[j] + 1 !== sortedRanks[j + 1]) {
      straights = false; // straights
    }
  }
  // broadway, straight sequence of A-K-Q-J-10
  const broadwaySequence = [1, 10, 11, 12, 13];

  if (JSON.stringify(broadwaySequence) === JSON.stringify(sortedRanks)) {
    broadway = true;
  }

  for (let i = 0; i < arrayOfCardNameTallyValues.length; i += 1) {
    if (arrayOfCardNameTallyValues[i] === 4) {
      fourOfAKind = true; // four of a kind
    }
    if (arrayOfCardNameTallyValues[i] === 3 && arrayOfCardNameTallyValues.length === 2) {
      fullHouse = true; // full house
    }
    if (arrayOfCardNameTallyValues[i] === 3 && arrayOfCardNameTallyValues.length === 3) {
      threeOfAKind = true; // three of a kind
    } if (arrayOfCardNameTallyValues[i] === 2 && arrayOfCardNameTallyValues.length === 3) {
      twoPairs = true; // two pairs
    } if (arrayOfCardNameTallyValues[i] === 2 && arrayOfCardNameTallyValues.length === 4) {
      twoOfAKind = true; // two of a kind
    } if (arrayOfCardNameTallyValues.length === 5 && flush === false && straights === false) {
      highCard = true; // high card
    }
  }
};
