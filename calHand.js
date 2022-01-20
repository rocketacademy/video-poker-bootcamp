import { logForExport } from './script.js';

console.log(logForExport);

const FACES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
const SUITS = ['♥', '♦', '♣', '♠'];

const analyzeHand = (hand) => {
  const cards = hand.split(' ').filter((x) => x !== 'joker');
  const jokers = hand.split(' ').length - cards.length;

  const faces = cards.map((card) => FACES.indexOf(card.slice(0, -1)));
  const suits = cards.map((card) => SUITS.indexOf(card.slice(-1)));

  if (cards.some((card, i, self) => i !== self.indexOf(card)) || faces.some((face) => face === -1) || suits.some((suit) => suit === -1)) return 'invalid';

  const flush = suits.every((suit) => suit === suits[0]);
  const groups = FACES.map((face, i) => faces.filter((j) => i === j).length).sort((x, y) => y - x);
  const shifted = faces.map((x) => (x + 1) % 13);
  const distance = Math.min(Math.max(...faces) - Math.min(...faces), Math.max(...shifted) - Math.min(...shifted));
  const straight = groups[0] === 1 && distance < 5;
  groups[0] += jokers;

  if (groups[0] === 5) return 'five-of-a-kind';
  if (straight && flush) return 'straight-flush';
  if (groups[0] === 4) return 'four-of-a-kind';
  if (groups[0] === 3 && groups[1] === 2) return 'full-house';
  if (flush) return 'flush';
  if (straight) return 'straight';
  if (groups[0] === 3) return 'three-of-a-kind';
  if (groups[0] === 2 && groups[1] === 2) return 'two-pair';
  if (groups[0] === 2) return 'one-pair';
  return 'high-card';
};

for (hand of logForExport) console.log(`${hand}: ${analyzeHand(hand)}`);

const testHands = [
  '2♥ 2♦ 2♣ k♣ q♦',
  '2♥ 5♥ 7♦ 8♣ 9♠',
  'a♥ 2♦ 3♣ 4♣ 5♦',
  '2♥ 3♥ 2♦ 3♣ 3♦',
  '2♥ 7♥ 2♦ 3♣ 3♦',
  '2♥ 7♥ 7♦ 7♣ 7♠',
  '10♥ j♥ q♥ k♥ a♥',
  '4♥ 4♠ k♠ 5♦ 10♠',
  'q♣ 10♣ 7♣ 6♣ 4♣',
  'joker 4♣ k♣ 5♦ 10♠',
  'joker 2♦ 2♠ k♠ q♦',
  'joker 3♥ 2♦ 3♠ 3♦',
  'joker 7♥ 7♦ 7♠ 7♣',
  'joker 2♦ joker 4♠ 5♠',
  'joker 2♠ joker a♠ 10♠',
  'joker q♦ joker a♦ 10♦',
];

for (hand of testHands) console.log(`${hand}: ${analyzeHand(hand)}`);
