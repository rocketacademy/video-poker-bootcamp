const testSuitTally = {
  diamonds: 5,
  hearts: 0,
};

const testNameTally = {
  card1: 4,
  joker: 1,
};

const testHand = [
  { name: 1, rank: 1 },
  { name: 2, rank: 2 },
  { name: 3, rank: 3 },
  { name: 4, rank: 4 },
  { name: 5, rank: 5 },
];

console.log(getMultiplier(testNameTally, testSuitTally, testHand));
