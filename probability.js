/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * Function that returns all possible combinations of size n from array
 * (referenced from k-combinations function)
 * @param {array} array array from which to make combinations out of
 * @param {number} n size of combinations
 * @return {array} array containing all possible combination arrays
 */
const chooseNFromArray = (array, n) => {
  let head = [];
  let tail = [];
  let combs = [];

  // return empty array if n is 0
  if (n < 1) {
    return [];
  }

  // return array if n is 1
  if (n === 1) {
    combs = [];
    for (let i = 0; i < array.length; i += 1) {
      combs.push(array[i]);
    }
    return combs;
  }

  // recursive
  for (let j = 0; j < array.length - n + 1; j += 1) {
    head = array.slice(j, j + 1);
    tail = chooseNFromArray(array.slice(j + 1), n - 1);
    for (let k = 0; k < tail.length; k += 1) {
      combs.push(head.concat(tail[k]));
    }
  }
  return combs;
};

/**
 * Function that calculates and updates probability of each winning hand based on cards held
 * (min. 2 held cards to trigger calculation)
 */
const calcProb = () => {
  const mockHand = []; // to store held cards
  const mockDeck = JSON.parse(JSON.stringify(deck)); // deep copy of deck
  const allResults = []; // to store results of all possible permutations
  const pointTally = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 6: 0, 9: 0, 25: 0, 50: 0, 250: 0,
  }; // tally of allResults
  let totalCount = 0; // total number of combinations

  // copy held cards into mockHand
  document.querySelectorAll('.clicked-card').forEach((card) => {
    const currentID = Number(card.id[4]);
    mockHand.push(JSON.parse(JSON.stringify(hand[currentID])));
  });

  // limit min. 2 held cards to prevent lag
  if (mockHand.length > 1) {
    if (mockHand.length < 5) {
    // get all possible combinations for remaining cards
      const mockDraw = chooseNFromArray(mockDeck, 5 - mockHand.length);

      // for each combination, push result into allResults array
      for (let i = 0; i < mockDraw.length; i += 1) {
        const newHand = mockHand.concat(mockDraw[i]);
        const mockRankTally = makeTally(newHand, 'rank');
        const mockSuitTally = makeTally(newHand, 'suit');
        const mockResult = calcHandScore(mockRankTally, mockSuitTally);
        allResults.push(mockResult);
      }
    } else {
      const mockRankTally = makeTally(mockHand, 'rank');
      const mockSuitTally = makeTally(mockHand, 'suit');
      allResults.push(calcHandScore(mockRankTally, mockSuitTally));
    }

    // tally allResults
    for (let j = 0; j < allResults.length; j += 1) {
      pointTally[allResults[j]] += 1;
      totalCount += 1;
    }

    // update probability values
    for (let k = 0; k < multipliers.length; k += 1) {
      const probDec = pointTally[multipliers[k]] / totalCount;
      const probPercent = Math.round(probDec * 100000) / 1000;
      probabilities[k] = `${probPercent}%`;
    }
  } else {
    probabilities = ['...', '...', '...', '...', '...', '...', '...', '...', '...'];
  }

  result = 'BUMMER :('; // reset result to default
  updateTable(3, probabilities);
};
