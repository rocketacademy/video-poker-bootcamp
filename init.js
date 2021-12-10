const initGame = () => {
  // create overall container
  overallContainer = document.createElement('div');
  overallContainer.classList.add('overall-container');
  document.body.appendChild(overallContainer);

  // create card combination container
  const cardComboContainer = document.createElement('div');
  cardComboContainer.classList.add('card-combintaion-container', 'section');
  overallContainer.appendChild(cardComboContainer);

  // create card display container
  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container', 'section');
  overallContainer.appendChild(gameContainer);

  // create output container
  const outputContainer = document.createElement('div');
  outputContainer.classList.add('output-container', 'section');
  overallContainer.appendChild(outputContainer);

  // create input container, bet input and submit //
  const inputContainer = document.createElement('div');
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

  // create deal cards button
  dealCardBtn();
};
