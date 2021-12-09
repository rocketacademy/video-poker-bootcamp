
/** Run game set-up functions */
const startGame = () => {
  pointsInWallet = 100;
  createHand(deck);
  playerArray = [
    {
      suit: "hearts",
      rank: 7,
      displayName: "7",
      suitSymbol: "♥️",
      colour: "red",
    },
    {
      suit: "hearts",
      rank: 9,
      displayName: "9",
      suitSymbol: "♥️",
      colour: "red",
    },
    {
      suit: "diamonds",
      rank: 7,
      displayName: "7",
      suitSymbol: "♦️",
      colour: "red",
    },
    {
      suit: "spades",
      rank: 7,
      displayName: "7",
      suitSymbol: "♠",
      colour: "black",
    },
    {
      suit: "clubs",
      rank: 13,
      displayName: "K",
      suitSymbol: "♣",
      colour: "black",
    },
  ]; 
  displayHand(playerArray);
  displayWallet();
  gameInfo.innerHTML = "Place your bet";
};

// ------------------------------------------ //
// -------------- GAME PLAY ----------------- //
// ------------------------------------------ //
let gameMode = "bet";
startGame();
