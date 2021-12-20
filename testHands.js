const royalFlushHand = {
  hand: [
    {
      name: 'ace',
      suit: 'diamonds',
      rank: 1,
      pic: './images/cards/ace_of_diamonds.png',
    },
    {
      name: 'king',
      suit: 'diamonds',
      rank: 13,
      pic: './images/cards/king_of_diamonds.png',
    },
    {
      name: 'queen',
      suit: 'diamonds',
      rank: 12,
      pic: './images/cards/queen_of_diamonds.png',
    },
    {
      name: 'jack',
      suit: 'diamonds',
      rank: 11,
      pic: './images/cards/jack_of_diamonds.png',
    },
    {
      name: '10',
      suit: 'diamonds',
      rank: 10,
      pic: './images/cards/10_of_diamonds.png',
    },
  ],
  suit: {
    clubs: 0,
    spades: 0,
    hearts: 0,
    diamonds: 5,
  },
  name: {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 1,
    ace: 1,
    jack: 1,
    queen: 1,
    king: 1,
  },
};

const straightFlushHand = {
  hand: [
    {
      name: '7',
      suit: 'diamonds',
      rank: 7,
      pic: './images/cards/7_of_diamonds.png',
    },
    {
      name: '8',
      suit: 'diamonds',
      rank: 8,
      pic: './images/cards/8_of_diamonds.png',
    },
    {
      name: '9',
      suit: 'diamonds',
      rank: 9,
      pic: './images/cards/9_of_diamonds.png',
    },
    {
      name: 'jack',
      suit: 'diamonds',
      rank: 11,
      pic: './images/cards/jack_of_diamonds.png',
    },
    {
      name: '10',
      suit: 'diamonds',
      rank: 10,
      pic: './images/cards/10_of_diamonds.png',
    },
  ],
  suit: {
    clubs: 0,
    spades: 0,
    hearts: 0,
    diamonds: 5,
  },
  name: {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    ace: 0,
    jack: 1,
    queen: 0,
    king: 0,
  },
};

const twoPairHand = {
  hand: [
    {
      name: '2',
      suit: 'hearts',
      rank: 2,
      pic: './images/cards/2_of_hearts.png',
    },
    {
      name: '4',
      suit: 'hearts',
      rank: 4,
      pic: './images/cards/4_of_hearts.png',
    },
    {
      name: '2',
      suit: 'spades',
      rank: 2,
      pic: './images/cards/2_of_spades.png',
    },
    {
      name: '4',
      suit: 'clubs',
      rank: 4,
      pic: './images/cards/4_of_clubs.png',
    },
    {
      name: '6',
      suit: 'hearts',
      rank: 6,
      pic: './images/cards/6_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 3,
    diamonds: 0,
  },
  name: {
    2: 2,
    3: 0,
    4: 2,
    5: 0,
    6: 1,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    ace: 0,
    jack: 0,
    queen: 0,
    king: 0,
  },
};

const fullHouseHand = {
  hand: [
    {
      name: '2',
      suit: 'hearts',
      rank: 2,
      pic: './images/cards/2_of_hearts.png',
    },
    {
      name: '2',
      suit: 'diamonds',
      rank: 2,
      pic: './images/cards/2_of_diamonds.png',
    },
    {
      name: '2',
      suit: 'spades',
      rank: 2,
      pic: './images/cards/2_of_spades.png',
    },
    {
      name: '4',
      suit: 'clubs',
      rank: 4,
      pic: './images/cards/4_of_clubs.png',
    },
    {
      name: '4',
      suit: 'hearts',
      rank: 4,
      pic: './images/cards/4_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 2,
    diamonds: 1,
  },
  name: {
    2: 3,
    3: 0,
    4: 2,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    ace: 0,
    jack: 0,
    queen: 0,
    king: 0,
  },
};

const fourOfAKindHand = {
  hand: [
    {
      name: '2',
      suit: 'hearts',
      rank: 2,
      pic: './images/cards/2_of_hearts.png',
    },
    {
      name: '2',
      suit: 'diamonds',
      rank: 2,
      pic: './images/cards/2_of_diamonds.png',
    },
    {
      name: '2',
      suit: 'spades',
      rank: 2,
      pic: './images/cards/2_of_spades.png',
    },
    {
      name: '2',
      suit: 'clubs',
      rank: 2,
      pic: './images/cards/2_of_clubs.png',
    },
    {
      name: '6',
      suit: 'hearts',
      rank: 6,
      pic: './images/cards/6_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 2,
    diamonds: 1,
  },
  name: {
    2: 4,
    3: 0,
    4: 0,
    5: 0,
    6: 1,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    ace: 0,
    jack: 0,
    queen: 0,
    king: 0,
  },
};

const threeOfAKindHand = {
  hand: [
    {
      name: '2',
      suit: 'hearts',
      rank: 2,
      pic: './images/cards/2_of_hearts.png',
    },
    {
      name: '2',
      suit: 'diamonds',
      rank: 2,
      pic: './images/cards/2_of_diamonds.png',
    },
    {
      name: '2',
      suit: 'spades',
      rank: 2,
      pic: './images/cards/2_of_spades.png',
    },
    {
      name: '4',
      suit: 'clubs',
      rank: 4,
      pic: './images/cards/4_of_clubs.png',
    },
    {
      name: '6',
      suit: 'hearts',
      rank: 6,
      pic: './images/cards/6_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 2,
    diamonds: 1,
  },
  name: {
    2: 3,
    3: 0,
    4: 1,
    5: 0,
    6: 1,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    ace: 0,
    jack: 0,
    queen: 0,
    king: 0,
  },
};

/**
 * 2 3 4 5 6
 */
const straightHand1 = {
  hand: [
    {
      name: '2',
      suit: 'hearts',
      rank: 2,
      pic: './images/cards/2_of_hearts.png',
    },
    {
      name: '3',
      suit: 'diamonds',
      rank: 3,
      pic: './images/cards/3_of_diamonds.png',
    },
    {
      name: '4',
      suit: 'spades',
      rank: 4,
      pic: './images/cards/4_of_spades.png',
    },
    {
      name: '5',
      suit: 'clubs',
      rank: 5,
      pic: './images/cards/5_of_clubs.png',
    },
    {
      name: '6',
      suit: 'hearts',
      rank: 6,
      pic: './images/cards/6_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 2,
    diamonds: 1,
  },
  name: {
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    ace: 0,
    jack: 0,
    queen: 0,
    king: 0,
  },
};

/**
 * A 2 3 4 5
 */
const straightHand2 = {
  hand: [
    {
      name: 'ace',
      suit: 'hearts',
      rank: 1,
      pic: './images/cards/ace_of_hearts.png',
    },
    {
      name: '3',
      suit: 'diamonds',
      rank: 3,
      pic: './images/cards/3_of_diamonds.png',
    },
    {
      name: '4',
      suit: 'spades',
      rank: 4,
      pic: './images/cards/4_of_spades.png',
    },
    {
      name: '5',
      suit: 'clubs',
      rank: 5,
      pic: './images/cards/5_of_clubs.png',
    },
    {
      name: '2',
      suit: 'hearts',
      rank: 2,
      pic: './images/cards/2_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 2,
    diamonds: 1,
  },
  name: {
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    ace: 1,
    jack: 0,
    queen: 0,
    king: 0,
  },
};

/**
 * 7 8 9 10 11
 */
const straightHand3 = {
  hand: [
    {
      name: '7',
      suit: 'hearts',
      rank: 7,
      pic: './images/cards/7_of_hearts.png',
    },
    {
      name: '8',
      suit: 'diamonds',
      rank: 8,
      pic: './images/cards/8_of_diamonds.png',
    },
    {
      name: '9',
      suit: 'spades',
      rank: 9,
      pic: './images/cards/9_of_spades.png',
    },
    {
      name: '10',
      suit: 'clubs',
      rank: 10,
      pic: './images/cards/10_of_clubs.png',
    },
    {
      name: 'jack',
      suit: 'hearts',
      rank: 11,
      pic: './images/cards/jack_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 2,
    diamonds: 1,
  },
  name: {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
    ace: 0,
    jack: 1,
    queen: 0,
    king: 0,
  },
};

/**
 * 10 J Q K A
 */
const straightHand4 = {
  hand: [
    {
      name: 'ace',
      suit: 'hearts',
      rank: 1,
      pic: './images/cards/ace_of_hearts.png',
    },
    {
      name: 'king',
      suit: 'diamonds',
      rank: 13,
      pic: './images/cards/king_of_diamonds.png',
    },
    {
      name: 'queen',
      suit: 'spades',
      rank: 12,
      pic: './images/cards/queen_of_spades.png',
    },
    {
      name: 'jack',
      suit: 'clubs',
      rank: 11,
      pic: './images/cards/jack_of_clubs.png',
    },
    {
      name: '10',
      suit: 'hearts',
      rank: 10,
      pic: './images/cards/10_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 2,
    diamonds: 1,
  },
  name: {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 1,
    ace: 1,
    jack: 1,
    queen: 1,
    king: 1,
  },
};

const flushHand = {
  hand: [
    {
      name: '2',
      suit: 'hearts',
      rank: 2,
      pic: './images/cards/2_of_hearts.png',
    },
    {
      name: '4',
      suit: 'hearts',
      rank: 4,
      pic: './images/cards/4_of_hearts.png',
    },
    {
      name: '6',
      suit: 'hearts',
      rank: 6,
      pic: './images/cards/6_of_hearts.png',
    },
    {
      name: '8',
      suit: 'hearts',
      rank: 8,
      pic: './images/cards/8_of_hearts.png',
    },
    {
      name: '10',
      suit: 'hearts',
      rank: 10,
      pic: './images/cards/10_of_hearts.png',
    },
  ],
  suit: {
    clubs: 0,
    spades: 0,
    hearts: 5,
    diamonds: 0,
  },
  name: {
    2: 1,
    3: 0,
    4: 1,
    5: 0,
    6: 1,
    7: 0,
    8: 1,
    9: 0,
    10: 1,
    ace: 0,
    jack: 0,
    queen: 0,
    king: 0,
  },
};

const jacksOrBetterHand = {
  hand: [
    {
      name: 'jack',
      suit: 'diamonds',
      rank: 11,
      pic: './images/cards/jack_of_diamonds.png',
    },
    {
      name: 'jack',
      suit: 'hearts',
      rank: 11,
      pic: './images/cards/jack_of_hearts.png',
    },
    {
      name: '2',
      suit: 'spades',
      rank: 2,
      pic: './images/cards/2_of_spades.png',
    },
    {
      name: '4',
      suit: 'clubs',
      rank: 4,
      pic: './images/cards/4_of_clubs.png',
    },
    {
      name: '6',
      suit: 'hearts',
      rank: 6,
      pic: './images/cards/6_of_hearts.png',
    },
  ],
  suit: {
    clubs: 1,
    spades: 1,
    hearts: 2,
    diamonds: 1,
  },
  name: {
    2: 1,
    3: 0,
    4: 1,
    5: 0,
    6: 1,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    ace: 0,
    jack: 2,
    queen: 0,
    king: 0,
  },
};

const testStraightFlushHand = {
  hand: [
    {
      name: 'ace',
      suit: 'diamonds',
      rank: 1,
      pic: './images/cards/ace_of_diamonds.png',
    },
    {
      name: '8',
      suit: 'diamonds',
      rank: 8,
      pic: './images/cards/8_of_diamonds.png',
    },
    {
      name: '9',
      suit: 'diamonds',
      rank: 9,
      pic: './images/cards/9_of_diamonds.png',
    },
    {
      name: 'jack',
      suit: 'diamonds',
      rank: 11,
      pic: './images/cards/jack_of_diamonds.png',
    },
    {
      name: '5',
      suit: 'diamonds',
      rank: 5,
      pic: './images/cards/5_of_diamonds.png',
    },
  ],
  suit: {
    clubs: 0,
    spades: 0,
    hearts: 0,
    diamonds: 5,
  },
  name: {
    2: 0,
    3: 0,
    4: 0,
    5: 1,
    6: 0,
    7: 0,
    8: 1,
    9: 1,
    10: 0,
    ace: 1,
    jack: 1,
    queen: 0,
    king: 0,
  },
};

const testStraightFlushCardsLeft = {
  ace: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 0,
  },
  2: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  3: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  4: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  5: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 0,
  },
  6: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  7: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  8: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 0,
  },
  9: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 0,
  },
  10: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  jack: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 0,
  },
  queen: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
  king: {
    clubs: 1,
    spades: 1,
    hearts: 1,
    diamonds: 1,
  },
};
