const playerHandTest = [
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 2, suit: 'diamonds', name: '2' },
  { rank: 5, suit: 'spades', name: '5' },
  { rank: 7, suit: 'spades', name: '7' },
  { rank: 9, suit: 'hearts', name: '9' },
];

const playerHandTestFlush = [
  { rank: 2, suit: 'spades', name: '2' },
  { rank: 2, suit: 'spades', name: 'ace' },
  { rank: 5, suit: 'spades', name: '5' },
  { rank: 7, suit: 'spades', name: '7' },
  { rank: 9, suit: 'spades', name: '9' },
];

const playerHandTest4Kind = [
  { rank: 2, suit: 'clubs', name: '2' },
  { rank: 2, suit: 'diamonds', name: '2' },
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 2, suit: 'spades', name: '2' },
  { rank: 9, suit: 'spades', name: '9' },
];

const playerHandTestFullHouse = [
  { rank: 2, suit: 'clubs', name: '2' },
  { rank: 2, suit: 'diamonds', name: '2' },
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 9, suit: 'hearts', name: '9' },
  { rank: 9, suit: 'spades', name: '9' },
];

const playerHandTestTrips = [
  { rank: 2, suit: 'clubs', name: '2' },
  { rank: 2, suit: 'diamonds', name: '2' },
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 1, suit: 'hearts', name: 'ace' },
  { rank: 9, suit: 'spades', name: '9' },
];

const playerHandTestTwoPair = [
  { rank: 2, suit: 'clubs', name: '2' },
  { rank: 2, suit: 'diamonds', name: '2' },
  { rank: 9, suit: 'hearts', name: '9' },
  { rank: 1, suit: 'hearts', name: 'ace' },
  { rank: 1, suit: 'spades', name: 'ace' },
];

const playerHandTestSinglePair = [
  { rank: 2, suit: 'clubs', name: '2' },
  { rank: 7, suit: 'diamonds', name: '7' },
  { rank: 9, suit: 'hearts', name: '9' },
  { rank: 8, suit: 'hearts', name: '8' },
  { rank: 2, suit: 'spades', name: '2' },
];

const playerHandTestHighCard = [
  { rank: 2, suit: 'clubs', name: '2' },
  { rank: 7, suit: 'diamonds', name: '7' },
  { rank: 9, suit: 'hearts', name: '9' },
  { rank: 8, suit: 'hearts', name: '8' },
  { rank: 13, suit: 'spades', name: 'K' },
];

const playerHandStraights = [
  { rank: 6, suit: 'clubs', name: '6' },
  { rank: 3, suit: 'diamonds', name: '3' },
  { rank: 4, suit: 'hearts', name: '4' },
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 5, suit: 'spades', name: '5' },
];

const playerHandStraightsFlush = [
  { rank: 6, suit: 'hearts', name: '6' },
  { rank: 3, suit: 'hearts', name: '3' },
  { rank: 4, suit: 'hearts', name: '4' },
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 5, suit: 'hearts', name: '5' },
];

const playerHandRoyalStraightsFlush = [
  { rank: 13, suit: 'hearts', name: 'K' },
  { rank: 11, suit: 'hearts', name: 'J' },
  { rank: 10, suit: 'hearts', name: '10' },
  { rank: 12, suit: 'hearts', name: 'Q' },
  { rank: 14, suit: 'hearts', name: 'A' },
];

const playerHandLowStraightsFlush = [
  { rank: 5, suit: 'hearts', name: '5' },
  { rank: 4, suit: 'hearts', name: '4' },
  { rank: 3, suit: 'hearts', name: '3' },
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 14, suit: 'hearts', name: 'A' },
];
