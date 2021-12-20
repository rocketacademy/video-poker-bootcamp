const playerHand = [
  { rank: 13, suit: 'hearts', name: '2' },
  { rank: 12, suit: 'hearts', name: '2' },
  { rank: 11, suit: 'hearts', name: '2' },
  { rank: 10, suit: 'hearts', name: '2' },
  { rank: 1, suit: 'hearts', name: '2' },
];

// calcHandScore returns the number of points a given hand earns.
const pointsForHand = calcHandScore(playerHand);
