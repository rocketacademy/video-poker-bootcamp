// const player1SumRank = Math.abs(player1Card.rank);

let pointsModifier;
const suitList = [];
const nameList = [];

/**
 * A function that takes a swapped-out Video Poker Hand
 * Then Computes What Their Value at a Casino "Paytable" will be
 * Paytable values are taken from real life example: https://www.pagat.com/banking/video_poker.html
 * @param hand {object} is the player's swapped out hand to analyze
 * @return {number} after computing Paytable value of hand
 */
function calcHandScore(hand) {
  // in actual video poker, the lowest kind of hand you need is 1 Jack or better card to gain 1 point
  for (const card in hand) {
    suitList.push(hand[card].suit);
    nameList.push(hand[card].name);
  }

  // return newPoints;
}

pointsModifier = 0;
