// eslint-disable-next-line prefer-const
let points = 100;
let score;
let playerCard;
const playerArr = [];
let bet;
let cardElement;

// create highlight function to indicate card to be swap
const selectSwapCard1 = () => {
  document.querySelector('#card1').classList.toggle('highlightRed');
  document.querySelector('#card1').classList.toggle('highlight');
};
const selectSwapCard2 = () => {
  document.querySelector('#card2').classList.toggle('highlightRed');
  document.querySelector('#card2').classList.toggle('highlight');
};
const selectSwapCard3 = () => {
  document.querySelector('#card3').classList.toggle('highlightRed');
  document.querySelector('#card3').classList.toggle('highlight');
};
const selectSwapCard4 = () => {
  document.querySelector('#card4').classList.toggle('highlightRed');
  document.querySelector('#card4').classList.toggle('highlight');
};
const selectSwapCard5 = () => {
  document.querySelector('#card5').classList.toggle('highlightRed');
  document.querySelector('#card5').classList.toggle('highlight');
};
