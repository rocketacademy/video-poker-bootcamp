/* eslint-disable prefer-const */
// eslint-disable-next-line prefer-const
let points = 100;
let playerArr = [];
let score;
let playerCard;
let bet;
let cardElement;
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
