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

test('bet 1 one-pair-jack hand score returns 1', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 11, suit: 'diamonds', name: 'jack' },
    { rank: 11, suit: 'spades', name: 'jack' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 9, suit: 'hearts', name: '9' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(1);
});

test('bet 1 one-pair-ace hand score returns 1', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 1, suit: 'diamonds', name: 'ace' },
    { rank: 1, suit: 'spades', name: 'ace' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 9, suit: 'hearts', name: '9' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(1);
});

test('bet 1 two-pair-queen-seven hand score returns 2', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 12, suit: 'diamonds', name: 'queen' },
    { rank: 12, suit: 'spades', name: 'queen' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 7, suit: 'hearts', name: '7' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(2);
});

test('bet 1 three-of-a-kind-seven hand score returns 3', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 7, suit: 'diamonds', name: '7' },
    { rank: 12, suit: 'spades', name: 'queen' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 7, suit: 'hearts', name: '7' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(3);
});

test('bet 1 straight-to-five hand score returns 4', () => {
  const playerHand = [
    { rank: 1, suit: 'hearts', name: '1' },
    { rank: 2, suit: 'diamonds', name: '2' },
    { rank: 3, suit: 'spades', name: '3' },
    { rank: 4, suit: 'spades', name: '4' },
    { rank: 5, suit: 'hearts', name: '5' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(4);
});

test('bet 1 straight-to-ace hand score returns 4', () => {
  const playerHand = [
    { rank: 10, suit: 'hearts', name: '10' },
    { rank: 11, suit: 'diamonds', name: '11' },
    { rank: 12, suit: 'spades', name: '12' },
    { rank: 13, suit: 'spades', name: '13' },
    { rank: 1, suit: 'hearts', name: '1' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(4);
});

test('bet 1 flush-king-high hand score returns 6', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 4, suit: 'hearts', name: '4' },
    { rank: 7, suit: 'hearts', name: '7' },
    { rank: 11, suit: 'hearts', name: '11' },
    { rank: 13, suit: 'hearts', name: '13' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(6);
});

test('bet 3 flush-seven-high hand score returns 18', () => {
  const playerHand = [
    { rank: 2, suit: 'hearts', name: '2' },
    { rank: 4, suit: 'hearts', name: '4' },
    { rank: 7, suit: 'hearts', name: '7' },
    { rank: 5, suit: 'hearts', name: '5' },
    { rank: 3, suit: 'hearts', name: '3' },
  ];

  expect(calcHandScore(playerHand, 3)).toBe(18);
});

test('bet 1 full-house-seven hand score returns 9', () => {
  const playerHand = [
    { rank: 7, suit: 'hearts', name: '7' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 7, suit: 'clubs', name: '7' },
    { rank: 11, suit: 'hearts', name: '11' },
    { rank: 11, suit: 'diamonds', name: '11' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(9);
});

test('bet 1 four-of-a-kind-jack hand score returns 25', () => {
  const playerHand = [
    { rank: 7, suit: 'hearts', name: '7' },
    { rank: 11, suit: 'spades', name: '11' },
    { rank: 11, suit: 'clubs', name: '11' },
    { rank: 11, suit: 'hearts', name: '11' },
    { rank: 11, suit: 'diamonds', name: '11' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(25);
});

test('bet 1 straight-flush-to-nine hand score returns 50', () => {
  const playerHand = [
    { rank: 5, suit: 'spades', name: '5' },
    { rank: 6, suit: 'spades', name: '6' },
    { rank: 7, suit: 'spades', name: '7' },
    { rank: 8, suit: 'spades', name: '8' },
    { rank: 9, suit: 'spades', name: '9' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(50);
});

test('bet 1 royal-flush hand score returns 250', () => {
  const playerHand = [
    { rank: 10, suit: 'diamonds', name: '10' },
    { rank: 11, suit: 'diamonds', name: '11' },
    { rank: 12, suit: 'diamonds', name: '12' },
    { rank: 13, suit: 'diamonds', name: '13' },
    { rank: 1, suit: 'diamonds', name: '1' },
  ];

  expect(calcHandScore(playerHand, 1)).toBe(250);
});

test('bet 5 royal-flush hand score returns 4000', () => {
  const playerHand = [
    { rank: 10, suit: 'diamonds', name: '10' },
    { rank: 11, suit: 'diamonds', name: '11' },
    { rank: 12, suit: 'diamonds', name: '12' },
    { rank: 13, suit: 'diamonds', name: '13' },
    { rank: 1, suit: 'diamonds', name: '1' },
  ];

  expect(calcHandScore(playerHand, 5)).toBe(4000);
});
