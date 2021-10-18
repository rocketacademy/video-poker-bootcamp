// GLOBALS

let deck;
const player = {
  bet: 0,
  hand: [],
  credits: 100,
  wins: 0,
};
let cardsToHold = [];
let gameOver = false;

// END GLOBALS

const init = () => {
  deck = shuffleCards(makeDeck());
  dealCards(player, deck);
};
init();
