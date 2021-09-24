/* eslint-disable no-unused-vars */

const openInstr = () => {
  document.querySelector('.instructions').classList.remove('hide');
};

const closeInstr = () => {
  document.querySelector('.instructions').classList.add('hide');
};

const createInstr = () => {
  const instrDiv = document.createElement('div');
  instrDiv.classList.add('instructions');
  instrDiv.classList.add('hide');
  document.body.appendChild(instrDiv);

  instrDiv.addEventListener('click', closeInstr);

  const instrHead = document.createElement('p');
  const instrBody = document.createElement('p');
  const instrFoot = document.createElement('p');
  const instrSource = document.createElement('p');
  instrHead.classList.add('instr-head');
  instrBody.classList.add('instr-body');
  instrFoot.classList.add('instr-head');
  instrSource.classList.add('instr-sources');
  instrDiv.appendChild(instrHead);
  instrDiv.appendChild(instrBody);
  instrDiv.appendChild(instrFoot);
  instrDiv.appendChild(instrSource);

  instrHead.innerHTML = '- INSTRUCTIONS -';
  instrBody.innerHTML = "1. INPUT A BET AND PRESS 'DEAL'. <br> 2. YOU ARE DEALT 5 CARDS. CHOOSE THE CARDS YOU WISH TO HOLD AND PRESS 'DRAW'. <br> 3. THE UNHELD CARDS WILL BE REPLACED AND YOU WIN CREDITS AS PER THE PAYOUT TABLE IF YOU HAVE A WINNING HAND. <br> 4. INPUT A NEW BET AND PRESS 'DEAL' TO START A NEW ROUND. THE GAME ENDS WHEN YOU RUN OUT OF CREDITS.";
  instrFoot.innerText = 'BONAM FORTUNA!';
  instrSource.innerHTML = '[Icons and overlay image from Freepik]';
};
