/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chooseNFromArray = (array, n) => {
  let head = [];
  let tail = [];
  let combs = [];

  if (n > array.length || n < 1) {
    return [];
  }
  if (n === 1) {
    combs = [];
    for (let i = 0; i < array.length; i += 1) {
      combs.push(array[i]);
    }
    return combs;
  }
  for (let j = 0; j < array.length - n + 1; j += 1) {
    head = array.slice(j, j + 1);
    tail = chooseNFromArray(array.slice(j + 1), n - 1);
    for (let k = 0; k < tail.length; k += 1) {
      combs.push(head.concat(tail[k]));
    }
  }
  return combs;
};

const calcProb = () => {
  const mockHand = [];
  const mockDeck = JSON.parse(JSON.stringify(deck));
  const allResults = [];
  const pointTally = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 6: 0, 9: 0, 25: 0, 50: 0, 800: 0,
  };
  let totalCount = 0;

  // copy held cards into mockHand
  document.querySelectorAll('.clicked-card').forEach((card) => {
    const currentID = Number(card.id[4]);
    mockHand.push(JSON.parse(JSON.stringify(hand[currentID])));
  });

  // limit because of lag
  if (mockHand.length > 1) {
    const mockDraw = chooseNFromArray(mockDeck, 5 - mockHand.length);

    for (let i = 0; i < mockDraw.length; i += 1) {
      const newHand = mockHand.concat(mockDraw[i]);

      const mockRankTally = makeTally(newHand, 'rank');
      const mockSuitTally = makeTally(newHand, 'suit');

      const mockResult = calcHandScore(mockRankTally, mockSuitTally);

      allResults.push(mockResult);
    }

    for (let j = 0; j < allResults.length; j += 1) {
      pointTally[allResults[j]] += 1;
      totalCount += 1;
    }

    for (let k = 0; k < multipliers.length; k += 1) {
      const probDec = pointTally[multipliers[k]] / totalCount;
      const probPercent = Math.round(probDec * 100000) / 1000;
      probabilities[k] = `${probPercent}%`;
    }
  } else {
    probabilities = ['...', '...', '...', '...', '...', '...', '...', '...', '...'];
  }

  result = 'BUMMER :(';
  updateTable(3, probabilities);
};
