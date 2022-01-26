/* ################################ CARD IN HAND TEST BLOC BELOW #################### */

let onePairPositive = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: 'king',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 13,
    value: 13,
  },
  {
    name: '10',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 10,
    value: 10,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
  {
    name: 'ace',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 1,
    value: 11,
  },
];

let onePairPositive2 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '10',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 10,
    value: 10,
  },
  {
    name: '4',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 4,
    value: 4,
  },
  {
    name: 'ace',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 1,
    value: 11,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
];
let TwoPairPositive1 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '10',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 10,
    value: 10,
  },
  {
    name: '10',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 10,
    value: 10,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
  {
    name: 'ace',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 1,
    value: 11,
  },
];

let tripletPositive1 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 1,
    value:11,
  },
  {
    name: 'ace',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 1,
    value: 11,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
  {
    name: '6',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 6,
    value: 6,
  },
];

let tripletPositive2 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
  {
    name: '6',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 6,
    value: 6,
  },
  {
    name: 'ace',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 1,
    value:11,
  },
  {
    name: 'ace',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 1,
    value: 11,
  },
];

let tripletPair = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '10',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 10,
    value:10,
  },
  {
    name: 'ace',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 1,
    value: 11,
  },
  {
    name: '10',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 10,
    value: 10,
  },
  {
    name: 'ace',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 1,
    value: 1,
  },
];

let quadPositive1 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 1,
    value:1,
  },
  {
    name: 'ace',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 1,
    value: 11,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
  {
    name: 'ace',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 1,
    value: 11,
  },
];


let quadPositive2 = [
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 1,
    value:1,
  },
  {
    name: 'ace',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 1,
    value: 11,
  },
];

let quadPositive3 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 1,
    value:1,
  },
  {
    name: 'ace',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 1,
    value: 11,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
];

let sameSuitDiffRank = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '4',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 4,
    value:4,
  },
  {
    name: '9',
    suit: 'hearts',
    suitEmoji: '♥',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 9,
    value: 9,
  },
  {
    name: 'jack',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 11,
    value: 11,
  },
  {
    name: 'queen',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 12,
    value: 12,
  },
];

let sameSuitConsecRank = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '2',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 2,
    value:2,
  },
  {
    name: '3',
    suit: 'hearts',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 3,
    value: 3,
  },
  {
    name: '4',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 4,
    value: 4,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
];

let fullHousePositiveT1 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 1,
    value: 11,
  },
  {
    name: '5',
    suit: 'spades',
    suitEmoji: '♠',
    rank: 5,
    value: 5,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
];

let fullHousePositiveT2 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '5',
    suit: 'spades',
    suitEmoji: '♠',
    rank: 5,
    value: 5,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
  {
    name: 'ace',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 1,
    value: 11,
  },
  {
    name: 'ace',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 1,
    value: 11,
  },
];

let straightPositive = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '2',
    suit: 'diamonds',
    suitEmoji: '♦',
    rank: 2,
    value: 2,
  },
  {
    name: '3',
    suit: 'spades',
    suitEmoji: '♠',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 3,
    value: 3,
  },
  {
    name: '4',
    suit: 'clubs',
    suitEmoji: '♣',
    rank: 4,
    value: 4,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
];

let flushPositive = [
  {
    name: 'king',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 13,
    value: 13,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
  {
    name: '3',
    suit: 'hearts',
    suitEmoji: '♥',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 3,
    value: 3,
  },
  {
    name: '7',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 7,
    value: 7,
  },
  {
    name: 'queen',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 12,
    value: 12,
  },
];


let strFlushPositive = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: '2',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 2,
    value: 2,
  },
  {
    name: '3',
    suit: 'hearts',
    suitEmoji: '♥',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 3,
    value: 3,
  },
  {
    name: '4',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 4,
    value: 4,
  },
  {
    name: '5',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 5,
    value: 5,
  },
];

let royalFlushPositive = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: 'king',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 13,
    value:13,
  },
  {
    name: 'jack',
    suit: 'hearts',
    suitEmoji: '♥',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 11,
    value: 11,
  },
  {
    name: '10',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 10,
    value: 10,
  },
  {
    name: 'queen',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 12,
    value: 12,
  },
];

let highCardPositive2 = [
  {
    name: 'ace',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 1,
    value: 11,
  },
  {
    name: 'king',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 13,
    value:13,
  },
  {
    name: 'jack',
    suit: 'hearts',
    suitEmoji: '♥',    /* '♥', "♦", "♣", "♠"  */ 
    rank: 11,
    value: 11,
  },
  {
    name: '10',
    suit: 'spades',
    suitEmoji: '♥',
    rank: 10,
    value: 10,
  },
  {
    name: 'queen',
    suit: 'hearts',
    suitEmoji: '♥',
    rank: 12,
    value: 12,
  },
];
