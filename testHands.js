const playerHand = [
  { rank: 5, suit: 'hearts', name: '2' },
  { rank: 4, suit: 'hearts', name: '2' },
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 2, suit: 'hearts', name: '2' },
  { rank: 2, suit: 'hearts', name: '2' },
];

// calcHandScore returns the number of points a given hand earns.
const pointsForHand = calcHandScore(playerHand);
