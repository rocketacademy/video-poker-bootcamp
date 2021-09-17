// const player1SumRank = Math.abs(player1Card.rank);

let pointsModifier;
let flushState = false;
const suitList = [];
const nameList = [];

// adapted from https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
// this helper function helps to check if all values in an array are equal
// we need this to check for flushes
const allEqual = (arr) => arr.every((v) => v === arr[0]);

/**
 * A function that takes a swapped-out Video Poker Hand
 * Then Computes What Their Value at a Casino "Paytable" will be
 * Paytable values are taken from real life example: https://www.pagat.com/banking/video_poker.html
 * @param hand {object} is the player's swapped out hand to analyze
 * @return {number} after computing Paytable value of hand
 */
function calcHandScore(livehand) {
  // in actual video poker, the lowest kind of hand you need is 1 Jack or better card to gain 1 point
  for (const card in livehand) {
    suitList.push(hand[card].suit);
    nameList.push(hand[card].name);
  }

  if (allEqual(suitList) === true) {
    pointsModifier = 6;
    flushState = true;
  }

  return pointsModifier;

  // return newPoints;
}
