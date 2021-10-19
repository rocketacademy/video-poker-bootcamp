// GLOBALS

let deck;
const player = {
  bet: 1,
  hand: [],
  credits: 100,
  wins: 0,
};
let cardsToHold = [];
let gameOver = false;

// END GLOBALS

const init = () => {
  highlightBet(player.bet);

  const decreaseBtn = document.getElementById('decrease');
  decreaseBtn.disabled = true;
  deck = shuffleCards(makeDeck());
  dealCards(player, deck);
};
init();
