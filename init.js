// GLOBALS

let deck;
const player = {
  bet: 0, hand: [], credits: 100, wins: 0,
};
let cardsToHold = [];

// END GLOBALS

const init = () => {
  deck = shuffleCards(makeDeck());
  dealCards(player, deck);
  console.log(deck);
};
init();
