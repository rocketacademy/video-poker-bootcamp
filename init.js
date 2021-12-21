let overallContainer; // contains all assets
let gameContainer;
let cardComboContainer;
let statusContainer;
let outputContainer;
let inputContainer;
let buttonsContainer;
let betOneBtn;
let betFiveBtn;
let swapCardsBtn;
let dealCardsBtn;

let output;
let input;

const initGame = () => {
  // create overall container
  overallContainer = document.createElement('div');
  overallContainer.classList.add('overall-container');
  document.body.appendChild(overallContainer);

  // create card combination container
  cardComboContainer = document.createElement('div');
  cardComboContainer.innerText = 'VIDEO POKER';
  cardComboContainer.classList.add('card-combo-container', 'section');
  overallContainer.appendChild(cardComboContainer);

  // create card display container
  gameContainer = document.createElement('div');
  gameContainer.innerText = '';
  gameContainer.classList.add('game-container', 'section');
  overallContainer.appendChild(gameContainer);

  // create output container
  outputContainer = document.createElement('div');
  outputContainer.innerText = '💰PLACE YOUR BETS!💰';
  outputContainer.classList.add('output-container', 'section');
  overallContainer.appendChild(outputContainer);

  // create status container
  // tracks credits, bet amount
  statusContainer = document.createElement('div');
  statusContainer.classList.add('status-container', 'section');
  statusContainer.innerText = 'Total Credits: 100';
  overallContainer.appendChild(statusContainer);

  // buttonsContainer
  buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('buttons-container');
  overallContainer.appendChild(buttonsContainer);

  // // create input container, bet input and submit
  // inputContainer = document.createElement('div');
  // inputContainer.classList.add('input-container');
  // buttonsContainer.appendChild(inputContainer);

  /** removed input slider */
  // bet input slider
  // input = document.createElement('input');
  // input.type = 'range';
  // input.name = 'quantity';
  // input.classList.add('input-bet');
  // input.min = 0;
  // input.max = 100;
  // inputContainer.appendChild(input);
  // // output for slider
  // output = document.createElement('output');
  // output.classList.add('output');
  // output.setAttribute('for', 'quantity');
  // inputContainer.appendChild(output);

  // create bet one button
  betOneBtn = document.createElement('button');
  betOneBtn.classList.add('btn', 'betOneBtn');
  betOneBtn.innerText = 'Bet One';
  buttonsContainer.appendChild(betOneBtn);

  // create bet five button
  betFiveBtn = document.createElement('button');
  betFiveBtn.classList.add('btn', 'betFiveBtn');
  betFiveBtn.innerText = 'Bet Five';
  buttonsContainer.appendChild(betFiveBtn);

  // create deal cards button
  dealCardsBtn = document.createElement('button');
  dealCardsBtn.innerText = 'DEAL';
  dealCardsBtn.classList.add('btn-deal-cards', 'btn', 'play');
  buttonsContainer.appendChild(dealCardsBtn);
  dealCardsBtn.disabled = true;

  // create swap cards button
  swapCardsBtn = document.createElement('button');
  swapCardsBtn.innerText = 'SWAP';
  swapCardsBtn.classList.add('btn-swap-cards', 'btn', 'play');
  buttonsContainer.appendChild(swapCardsBtn);
  swapCardsBtn.disabled = true;

  /**
   * Variables & functions that make the betting slider function
   */
  const rangeInput = document.querySelector('.input-bet');
  const rangeOutput = document.querySelector('.output');

  /** logic for input slider */
  // const outputDefaultState = () => {
  //   rangeOutput.value = rangeInput.value;
  // };
  // rangeInput.addEventListener('input', function () {
  //   rangeOutput.value = this.value;
  // });
  // document.addEventListener('DOMContentLoaded', function () {
  //   outputDefaultState();
  // });
};

initGame();
