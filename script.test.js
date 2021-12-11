/**
 * @jest-environment jsdom
 */

const calcHandScore = require('./script');

test('bet 1 empty hand score by default returns 0', () => {
  expect(calcHandScore([], 1)).toBe(0);
});

test('bet 1 one-pair-below-jack hand score returns 0', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 2, suit: 'diamonds', name: '2' },
    { rank: 5, suit: 'spades', name: '5' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 9, suit: 'hearts', name: '9' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(0);
});

test('bet 1 one-pair-jack hand score returns 0', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 11, suit: 'diamonds', name: 'jack' },
    { rank: 11, suit: 'spades', name: 'jack' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 9, suit: 'hearts', name: '9' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(1);
});
