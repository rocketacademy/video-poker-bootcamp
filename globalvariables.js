/* eslint-disable prefer-const */
// eslint-disable-next-line prefer-const
let points = 100;
let score;
let playerCard;
let bet;
let cardElement;
let playerArr = [];
// Create card details as tally
let cardRankTally = {};
let cardSuitTally = {};

// eslint-disable-next-line prefer-const
// create highlight function to indicate card to be swap
const selectSwapCard1 = () => {
  document.querySelector('#card1').classList.toggle('selected');
  document.querySelector('#card1').classList.toggle('highlight');
};
const selectSwapCard2 = () => {
  document.querySelector('#card2').classList.toggle('selected');
  document.querySelector('#card2').classList.toggle('highlight');
};
const selectSwapCard3 = () => {
  document.querySelector('#card3').classList.toggle('selected');
  document.querySelector('#card3').classList.toggle('highlight');
};
const selectSwapCard4 = () => {
  document.querySelector('#card4').classList.toggle('selected');
  document.querySelector('#card4').classList.toggle('highlight');
};
const selectSwapCard5 = () => {
  document.querySelector('#card5').classList.toggle('selected');
  document.querySelector('#card5').classList.toggle('highlight');
};

let createRankTally = () => {
// Loop over playerArr
  for (let i = 0; i < playerArr.length; i += 1) {
  // eslint-disable-next-line prefer-destructuring
    const rank = playerArr[i].rank;
    // If we have seen the card rank before, increment its count
    if (rank in cardRankTally) {
      cardRankTally[rank] += 1;
    }
    // Else, initialise count of this card rank to 1
    else {
      cardRankTally[rank] = 1;
    }
  }
};

let createSuitTally = () => {
// Loop over playerArr
  for (let i = 0; i < playerArr.length; i += 1) {
  // eslint-disable-next-line prefer-destructuring
    const suit = playerArr[i].suit;
    // If we have seen the card suit before, increment its count
    if (suit in cardSuitTally) {
      cardSuitTally[suit] += 1;
    }
    // Else, initialise count of this card suit to 1
    else {
      cardSuitTally[suit] = 1;
    }
  }
};
