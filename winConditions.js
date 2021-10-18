const calcHandScore = (hand) => {
  //sort hand according to rank
  hand = hand.sort((a, b) => {
    return a.rank - b.rank;
  });

  const tally = tallyPlayerHand(hand);

  if (checkForRoyalFlush(hand, tally)) {
    return 'Royal Flush';
  } else if (checkForStraightFlush(hand, tally)) {
    return 'Straight Flush';
  } else if (checkForFourOfAKind(tally)) {
    return 'Four Of A Kind';
  } else if (checkForFullHouse(tally)) {
    return 'Full House';
  } else if (checkForFlush(tally)) {
    return 'Flush';
  } else if (checkForStraight(hand, tally)) {
    return 'Straight';
  } else if (checkForThreeOfAKind(tally)) {
    return 'Three of A Kind';
  } else if (checkForTwoPair(tally)) {
    return 'Two Pair';
  } else if (checkForJacks(tally)) {
    return 'Jacks Or Better';
  }

  return 'Lose';
};

const tallyPlayerHand = (hand) => {
  const tally = hand.reduce(
    (tally, card) => {
      //tallies up the different card ranks
      //creates a new key if the key is not found within the object
      const tallyNames = tally.names[card.name];
      tally.names[card.name] = tallyNames ? tallyNames + 1 : 1;

      //tallies up the different suit ranks
      //creates a new key if the key is not found within the object
      const tallySuits = tally.suits[card.suit];
      tally.suits[card.suit] = tallySuits ? tallySuits + 1 : 1;
      return tally;
    },
    { names: {}, suits: {} }
  );

  return tally;
};

const checkForRoyalStraight = (hand, tally) => {
  const royalStraightNames = ['10', 'jack', 'queen', 'king', 'ace'];

  //first check if theres 5 unique cards , causes a bug if i dont because as long as all
  //the cards in hand are inside the array royalStraightNames, it would not return a false
  let count = 0;
  if (Object.keys(tally.names).length === 5) {
    hand.forEach((card) => {
      if (royalStraightNames.includes(card.name)) {
        count += 1;
      }
    });
  }

  if (count === 5) {
    return true;
  }

  return false;
};

const checkForRoyalFlush = (hand, tally) => {
  //checking for a Royal Flush requires 3 winning conditions,
  // 1. must be a flush
  // 2. must be a spades flush
  // 3. must be a royal straight, meaning 10, J, Q, K, A

  // 1.checking for flush
  const flush = checkForFlush(tally);

  let spade;
  if (flush) {
    //2. checking if all suits spade
    spade = Object.keys(tally.suits)[0] === 'spade';
  } else {
    return false;
  }
  //3. checking for royal straight and putting it all together
  if (checkForRoyalStraight(hand, tally) && flush && spade) {
    return true;
  }

  return false;
};

const checkForStraightFlush = (hand, tally) => {
  //basically checking for a straight and a flush, since we already have
  //functions that check for them seperately (checkForStraight and checkForFlush),
  //we'll just put them together here

  if (checkForFlush(tally) && checkForStraight(hand, tally)) {
    return true;
  }

  return false;
};

const checkForFourOfAKind = (tally) => {
  //similar to how checkForFullHouse would work but this time we check if
  //there is a card in the player's hand with a count of 4
  const cardCount = Object.values(tally.names);

  if (cardCount.includes(4)) {
    return true;
  }

  return false;
};

const checkForFullHouse = (tally) => {
  //Object.values enumerates the object's properties and returns the count of each
  //key. Since the tally keeps track of the count of each card in the player's hand
  //Object.values(tally.names) will return the count of each card in the player's hand
  //in a list
  const cardCount = Object.values(tally.names);

  //since we're looking for a full house, we expect the list to only have 2 elements
  if (cardCount.length === 2) {
    // a full house is a 3 of a kind with a pair, so we check that condition
    if (cardCount.includes(3) && cardCount.includes(2)) {
      return true;
    }
  }

  return false;
};

const checkForFlush = (tally) => {
  console.log('flush tally', tally);
  //returns a array of different keys, therefore if array length only 1,
  //it is a flush
  const numberOfSuits = Object.keys(tally.suits);
  if (numberOfSuits.length === 1) {
    return true;
  }
  return false;
};

const checkForStraight = (hand, tally) => {
  if (checkForRoyalStraight(hand, tally)) {
    console.log('here?');
    return true;
  }
  let previousCard;
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];
    if (!previousCard) {
      previousCard = card;
    } else {
      if (!(previousCard.rank === card.rank - 1)) {
        return false;
      }
    }
  }
  return true;
};

const checkForThreeOfAKind = (tally) => {
  const cardCount = Object.values(tally.names);
  if (cardCount.includes(3)) {
    return true;
  }

  return false;
};

const checkForTwoPair = (tally) => {
  const cardCount = Object.values(tally.names);
  const numberOfPairs = cardCount.filter((card) => card === 2).length;
  if (numberOfPairs === 2) {
    return true;
  }

  return false;
};

const checkForJacks = (tally) => {
  console.log('tallcheckingy');
  const jacksOrBetter = ['jack', 'queen', 'king', 'ace'];
  for (let [name, count] of Object.entries(tally.names)) {
    if (count >= 2) {
      if (jacksOrBetter.includes(name)) {
        return true;
      }
    }
  }
  return false;
};
