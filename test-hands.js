/* -------------------------------------------------------------------------- */
/*                             test hands objects                             */
/* -------------------------------------------------------------------------- */

const royalFlushHand = [{
  name: 'queen', suit: 'spades', rank: 12,
},
{
  name: '10', suit: 'spades', rank: 10,
},
{
  name: 'king', suit: 'spades', rank: 13,
},
{
  name: 'jack', suit: 'spades', rank: 11,
},
{
  name: 'ace', suit: 'spades', rank: 1,
}];

const fullHouseHand = [{
  name: '6', suit: 'diamonds', rank: 6,
}, {
  name: '6', suit: 'hearts', rank: 6,
}, {
  name: '6', suit: 'spades', rank: 6,
}, {
  name: '3', suit: 'clubs', rank: 3,
}, {
  name: '3', suit: 'diamonds', rank: 3,
}];

const straightFlushHand = [{
  name: '9', suit: 'diamonds', rank: 9,
}, {
  name: 'jack', suit: 'diamonds', rank: 11,
}, {
  name: '7', suit: 'diamonds', rank: 7,
}, {
  name: '8', suit: 'diamonds', rank: 8,
}, {
  name: '10', suit: 'diamonds', rank: 10,
}];

const fourKindHand = [{
  name: '7', suit: 'diamonds', rank: 7,
}, {
  name: '7', suit: 'hearts', rank: 7,
}, {
  name: '7', suit: 'spades', rank: 7,
}, {
  name: '7', suit: 'clubs', rank: 7,
}, {
  name: '10', suit: 'diamonds', rank: 10,
}];

const flushHand = [{
  name: '2', suit: 'diamonds', rank: 2,
},
{
  name: '4', suit: 'diamonds', rank: 4,
},
{
  name: '9', suit: 'diamonds', rank: 9,
},
{
  name: '5', suit: 'diamonds', rank: 5,
},
{
  name: 'ace', suit: 'diamonds', rank: 1,
}];

const straightHand = [{
  name: '5', suit: 'diamonds', rank: 5,
}, {
  name: '4', suit: 'hearts', rank: 4,
}, {
  name: '3', suit: 'spades', rank: 3,
}, {
  name: '7', suit: 'clubs', rank: 7,
}, {
  name: '6', suit: 'diamonds', rank: 6,
}];

const threeKindHand = [{
  name: '8', suit: 'diamonds', rank: 8,
}, {
  name: '2', suit: 'hearts', rank: 2,
}, {
  name: '8', suit: 'spades', rank: 8,
}, {
  name: '8', suit: 'clubs', rank: 8,
}, {
  name: 'queen', suit: 'diamonds', rank: 12,
}];

const twoPairsHand = [{
  name: '7', suit: 'diamonds', rank: 7,
}, {
  name: 'king', suit: 'hearts', rank: 13,
}, {
  name: 'king', suit: 'spades', rank: 13,
}, {
  name: '7', suit: 'clubs', rank: 7,
}, {
  name: '5', suit: 'diamonds', rank: 5,
}];

const jackPairHand = [{
  name: '9', suit: 'diamonds', rank: 9,
}, {
  name: 'jack', suit: 'hearts', rank: 11,
}, {
  name: 'jack', suit: 'spades', rank: 11,
}, {
  name: '7', suit: 'clubs', rank: 7,
}, {
  name: '5', suit: 'diamonds', rank: 5,
}];

const fiveKindHand = [{
  name: '7', suit: 'diamonds', rank: 7,
}, {
  name: '7', suit: 'hearts', rank: 7,
}, {
  name: '7', suit: 'spades', rank: 7,
}, {
  name: '7', suit: 'clubs', rank: 7,
}, {
  name: 'joker', suit: 'diamonds', rank: 0, joker: 'red',
}];
