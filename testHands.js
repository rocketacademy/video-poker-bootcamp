/**
 * 5 cards with the same suit that includes 10, jack, queen, king and ace
 */
const royalFlush = [
  {
    name: `ace`,
    suit: `diamonds`,
    rank: 1,
    img: `./images/cards/ace_of_diamonds.png`,
  },
  {
    name: `king`,
    suit: `diamonds`,
    rank: 13,
    img: `./images/cards/king_of_diamonds.png`,
  },
  {
    name: `queen`,
    suit: `diamonds`,
    rank: 12,
    img: `./images/cards/queen_of_diamonds.png`,
  },
  {
    name: `jack`,
    suit: `diamonds`,
    rank: 11,
    img: `./images/cards/jack_of_diamonds.png`,
  },
  {
    name: `10`,
    suit: `diamonds`,
    rank: 10,
    img: `./images/cards/10_of_diamonds.png`,
  },
];

/**
 * 5 cards with the same suit in sequential order
 */
const straightFlush = [
  {
    name: `jack`,
    suit: `clubs`,
    rank: 11,
    img: `./images/cards/jack_of_clubs.png`,
  },
  {
    name: `10`,
    suit: `clubs`,
    rank: 10,
    img: `./images/cards/10_of_clubs.png`,
  },
  {
    name: `9`,
    suit: `clubs`,
    rank: 9,
    img: `./images/cards/9_of_clubs.png`,
  },
  {
    name: `8`,
    suit: `clubs`,
    rank: 8,
    img: `./images/cards/8_of_clubs.png`,
  },
  {
    name: `7`,
    suit: `clubs`,
    rank: 7,
    img: `./images/cards/7_of_clubs.png`,
  },
];

/**
 * 4 cards with the same rank but different suits and 1 other card
 */
const fourOfAKind = [
  {
    name: `ace`,
    suit: `diamonds`,
    rank: 1,
    img: `./images/cards/ace_of_diamonds.png`,
  },
  {
    name: `ace`,
    suit: `clubs`,
    rank: 1,
    img: `./images/cards/ace_of_clubs.png`,
  },
  {
    name: `ace`,
    suit: `hearts`,
    rank: 1,
    img: `./images/cards/ace_of_hearts.png`,
  },
  {
    name: `ace`,
    suit: `spades`,
    rank: 1,
    img: `./images/cards/ace_of_spades.png`,
  },
  {
    name: `3`,
    suit: `diamonds`,
    rank: 3,
    img: `./images/cards/3_of_diamonds.png`,
  },
];

/**
 * 3 cards with same rank but different suits and 2 cards with same rank but different suits
 */
const fullhouse = [
  {
    name: `ace`,
    suit: `diamonds`,
    rank: 1,
    img: `./images/cards/ace_of_diamonds.png`,
  },
  {
    name: `ace`,
    suit: `clubs`,
    rank: 1,
    img: `./images/cards/ace_of_clubs.png`,
  },
  {
    name: `ace`,
    suit: `hearts`,
    rank: 1,
    img: `./images/cards/ace_of_hearts.png`,
  },
  {
    name: `2`,
    suit: `clubs`,
    rank: 2,
    img: `./images/cards/2_of_clubs.png`,
  },
  {
    name: `2`,
    suit: `hearts`,
    rank: 2,
    img: `./images/cards/2_of_hearts.png`,
  },
];

/**
 * 5 cards with the same suit
 */
const flush = [
  {
    name: `jack`,
    suit: `diamonds`,
    rank: 11,
    img: `./images/cards/jack_of_diamonds.png`,
  },
  {
    name: `9`,
    suit: `diamonds`,
    rank: 9,
    img: `./images/cards/9_of_diamonds.png`,
  },
  {
    name: `8`,
    suit: `diamonds`,
    rank: 8,
    img: `./images/cards/8_of_diamonds.png`,
  },
  {
    name: `4`,
    suit: `diamonds`,
    rank: 4,
    img: `./images/cards/4_of_diamonds.png`,
  },
  {
    name: `3`,
    suit: `diamonds`,
    rank: 3,
    img: `./images/cards/3_of_diamonds.png`,
  },
];

/**
 * 5 cards in sequential order but different suits
 */
const straight = [
  {
    name: `10`,
    suit: `diamonds`,
    rank: 10,
    img: `./images/cards/10_of_diamonds.png`,
  },
  {
    name: `9`,
    suit: `clubs`,
    rank: 9,
    img: `./images/cards/9_of_clubs.png`,
  },
  {
    name: `8`,
    suit: `clubs`,
    rank: 8,
    img: `./images/cards/8_of_clubs.png`,
  },
  {
    name: `7`,
    suit: `diamonds`,
    rank: 7,
    img: `./images/cards/7_of_diamonds.png`,
  },
  {
    name: `6`,
    suit: `clubs`,
    rank: 6,
    img: `./images/cards/6_of_clubs.png`,
  },
];

/**
 * 3 cards with same rank but different suits and 2 cards with whatever rank and suit
 */
const threeOfAKind = [
  {
    name: `ace`,
    suit: `diamonds`,
    rank: 1,
    img: `./images/cards/ace_of_diamonds.png`,
  },
  {
    name: `ace`,
    suit: `clubs`,
    rank: 1,
    img: `./images/cards/ace_of_clubs.png`,
  },
  {
    name: `ace`,
    suit: `hearts`,
    rank: 1,
    img: `./images/cards/ace_of_hearts.png`,
  },
  {
    name: `2`,
    suit: `clubs`,
    rank: 2,
    img: `./images/cards/2_of_clubs.png`,
  },
  {
    name: `3`,
    suit: `hearts`,
    rank: 3,
    img: `./images/cards/3_of_hearts.png`,
  },
];

/**
 * 2 sets of cards with same rank but different suits with 1 other card with whatever rank and suit
 */
const twoPair = [
  {
    name: `ace`,
    suit: `diamonds`,
    rank: 1,
    img: `./images/cards/ace_of_diamonds.png`,
  },
  {
    name: `ace`,
    suit: `clubs`,
    rank: 1,
    img: `./images/cards/ace_of_clubs.png`,
  },
  {
    name: `2`,
    suit: `hearts`,
    rank: 2,
    img: `./images/cards/2_of_hearts.png`,
  },
  {
    name: `2`,
    suit: `clubs`,
    rank: 2,
    img: `./images/cards/2_of_clubs.png`,
  },
  {
    name: `3`,
    suit: `hearts`,
    rank: 3,
    img: `./images/cards/3_of_hearts.png`,
  },
];

/**
 * any other hand
 */
const allOther = [
  { name: `10`, suit: `◆`, rank: 0, number: 10, img: `cards/◆/10.png` },
  { name: `8`, suit: `♣`, rank: 0, number: 8, img: `cards/♣/8.png` },
  { name: `6`, suit: `♣`, rank: 0, number: 6, img: `cards/♣/6.png` },
  { name: `4`, suit: `◆`, rank: 0, number: 4, img: `cards/◆/4.png` },
  { name: `2`, suit: `♣`, rank: 0, number: 2, img: `cards/♣/2.png` },
];
