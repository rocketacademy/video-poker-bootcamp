// Royal Flush Test Hand
const TH_RFlush = [
  {
    imagePath: "cardImages/fronts/diamonds_ace.svg",
    name: "ace",
    rank: 1,
    scoreValue: 1,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/diamonds_10.svg",
    name: 10,
    rank: 10,
    scoreValue: 10,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/diamonds_jack.svg",
    name: "jack",
    rank: 11,
    scoreValue: 10,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/diamonds_queen.svg",
    name: "queen",
    rank: 12,
    scoreValue: 10,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/diamonds_king.svg",
    name: "king",
    rank: 13,
    scoreValue: 10,
    suit: "diamonds",
    toRemove: false,
  },
];

// Straight Flush Test Hand:
const TH_SFlush = [
  {
    imagePath: "cardImages/fronts/hearts_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "hearts",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_3.svg",
    name: 3,
    rank: 3,
    scoreValue: 3,
    suit: "hearts",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_4.svg",
    name: 4,
    rank: 4,
    scoreValue: 4,
    suit: "hearts",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_5.svg",
    name: 5,
    rank: 5,
    scoreValue: 5,
    suit: "hearts",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_6.svg",
    name: 6,
    rank: 6,
    scoreValue: 6,
    suit: "hearts",
    toRemove: false,
  },
];

// Regular Flush Test Hand
const TH_flush = [
  {
    imagePath: "cardImages/fronts/diamonds_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/diamonds_3.svg",
    name: 3,
    rank: 3,
    scoreValue: 3,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/diamonds_4.svg",
    name: 4,
    rank: 4,
    scoreValue: 4,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/diamonds_5.svg",
    name: 5,
    rank: 5,
    scoreValue: 5,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/diamonds_8.svg",
    name: 8,
    rank: 8,
    scoreValue: 8,
    suit: "diamonds",
    toRemove: false,
  },
];

// Full House
const TH_fullHouse = [
  {
    imagePath: "cardImages/fronts/diamonds_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/clubs_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "clubs",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/spades_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "spades",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_6.svg",
    name: 6,
    rank: 6,
    scoreValue: 6,
    suit: "hearts",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/clubs_6.svg",
    name: 6,
    rank: 6,
    scoreValue: 6,
    suit: "clubs",
    toRemove: false,
  },
];

// Four of a Kind
const TH_4kind = [
  {
    imagePath: "cardImages/fronts/diamonds_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/clubs_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "clubs",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/spades_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "spades",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "hearts",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_6.svg",
    name: 6,
    rank: 6,
    scoreValue: 6,
    suit: "hearts",
    toRemove: false,
  },
];

// Three of a Kind
const TH_3kind = [
  {
    imagePath: "cardImages/fronts/diamonds_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/clubs_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "clubs",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/spades_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "spades",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_8.svg",
    name: 8,
    rank: 8,
    scoreValue: 8,
    suit: "hearts",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_6.svg",
    name: 6,
    rank: 6,
    scoreValue: 6,
    suit: "hearts",
    toRemove: false,
  },
];

// Two pairs
const TH_2Pairs = [
  {
    imagePath: "cardImages/fronts/diamonds_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "diamonds",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/clubs_2.svg",
    name: 2,
    rank: 2,
    scoreValue: 2,
    suit: "clubs",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_8.svg",
    name: 8,
    rank: 8,
    scoreValue: 8,
    suit: "hearts",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/spades_8.svg",
    name: 8,
    rank: 8,
    scoreValue: 8,
    suit: "spades",
    toRemove: false,
  },

  {
    imagePath: "cardImages/fronts/hearts_6.svg",
    name: 6,
    rank: 6,
    scoreValue: 6,
    suit: "hearts",
    toRemove: false,
  },
];

const test = function (testHandArray) {
  playerHand = testHandArray;
  const winner = parseResults(playerHand);
  gameInfoDiv.innerText = `Your hand is: ${winner}`;
  calcHandScore(winner);
  refreshDisplay();
};

test(TH_2Pairs);
