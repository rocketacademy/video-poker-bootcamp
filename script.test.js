const calcHandScore = require('./script');

test('calculate hand score by default returns 5', () => {
  expect(calcHandScore([])).toBe(5);
});

test('calculate hand score returns 5', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 2, suit: 'diamonds', name: '2' },
    { rank: 5, suit: 'spades', name: '5' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 9, suit: 'hearts', name: '9' },
  ];

  expect(calcHandScore(playerHand)).toBe(playerHand.length);
});
