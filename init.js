const initGame = () => {
  // create overall container
  overallContainer = document.createElement('div');
  overallContainer.classList.add('overall-container');
  document.body.appendChild(overallContainer);

  // create card combination container
  cardComboContainer = document.createElement('div');
  cardComboContainer.innerText =
    'Container that shows all combination of cards.';
  cardComboContainer.classList.add('card-combintaion-container', 'section');
  overallContainer.appendChild(cardComboContainer);

  // create card display container
  gameContainer = document.createElement('div');
  gameContainer.innerText = 'Container that shows cards dealt to player.';
  gameContainer.classList.add('game-container', 'section');
  overallContainer.appendChild(gameContainer);

  // create output container
  outputContainer = document.createElement('div');
  outputContainer.innerText = 'Container that gives instructions to player.';
  outputContainer.classList.add('output-container', 'section');
  overallContainer.appendChild(outputContainer);

  // create input container, bet input and submit //
  inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');
  overallContainer.appendChild(inputContainer);
  // bet input slider
  input = document.createElement('input');
  input.type = 'range';
  input.name = 'quantity';
  input.classList.add('input-bet');
  input.min = 0;
  input.max = 100;
  inputContainer.appendChild(input);

  // output
  output = document.createElement('output');
  output.classList.add('output');
  output.setAttribute('for', 'quantity');
  overallContainer.appendChild(output);

  /**
   * Variables & functions that make the betting slider function
   */
  const rangeInput = document.querySelector('.input-bet');
  const rangeOutput = document.querySelector('.output');

  const outputDefaultState = () => {
    rangeOutput.value = rangeInput.value;
  };
  rangeInput.addEventListener('input', function () {
    rangeOutput.value = this.value;
  });
  document.addEventListener('DOMContentLoaded', function () {
    outputDefaultState();
  });

  // creates deal cards button
  dealCardBtn();
};
initGame();
