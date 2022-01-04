/* -------------------------- build board elements function -------------------------- */
const buildBoard = () => {
  // create element to hold everything inside
  boardElement = document.createElement('div');
  //  add class to board
  boardElement.classList.add('board');

  // create cards container to hold card images
  cardContainer = document.createElement('div');
  // add class to card container
  cardContainer.classList.add('card-container');

  // create button container
  buttonContainer = document.createElement('div');
  // add class to button container
  buttonContainer.classList.add('button-container');

  // create output or message container
  outputContainer = document.createElement('div');
  // add class to output or message container
  outputContainer.classList.add('output-container');

  // create points container
  pointsContainer = document.createElement('div');
  // add class to points container
  pointsContainer.classList.add('points-container');
  // append card and button container to board element

  // append containers to board element
  boardElement.appendChild(cardContainer);
  boardElement.appendChild(buttonContainer);
  boardElement.appendChild(outputContainer);
  boardElement.appendChild(pointsContainer);

  // append board element to body
  document.body.appendChild(boardElement);
};

/* -------------------------- create background music function ------------------------- */
const playMusic = () => {
  // create audio element in HTML
  myMusic = document.createElement('audio');
  // add class list to audio element
  myMusic.classList.add('music');
  // specifify the source of audio element
  myMusic.src = 'sounds/RGA-GT - Being Cool Doesn`t Make Me Fool.mp3';

  // create play and pause button for background music
  const startMusic = document.createElement('button');
  // add class list to play and pause button
  startMusic.classList.add('music-button');
  // insert play text to music button
  startMusic.innerHTML = 'Play';

  // create music button container
  const musicContainer = document.querySelector('#music-container');
  // append music button to music container
  musicContainer.appendChild(startMusic);

  // add click event listener to play and pause background music
  startMusic.addEventListener('click', () => {
    // if not playing then start playing
    if (audioPlay === false) {
      // play music
      myMusic.play();
      // change music button text to pause
      startMusic.innerHTML = 'Pause';
      // change audio playing to true
      audioPlay = true;
      // if audio playing then pause
    } else if (audioPlay === true) {
      // pause music
      myMusic.pause();
      // change music button text to play
      startMusic.innerHTML = 'Play';
      // change audtio playing back to false
      audioPlay = false;
    }
  });
};

/* ------------------------- coins falling function ------------------------- */
function gimmick(el) {
  const exists = document.getElementById('gimmick');
  if (exists) {
    exists.parentNode.removeChild(exists);
    return false;
  }

  const element = document.querySelector(el);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let focused = false;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.id = 'gimmick';

  const coin = new Image();
  coin.src = 'http://i.imgur.com/5ZW2MT3.png';
  // 440 wide, 40 high, 10 states
  coin.onload = function () {
    element.appendChild(canvas);
    focused = true;
    drawloop();
  };
  const coins = [];

  function drawloop() {
    if (focused) {
      requestAnimationFrame(drawloop);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.3) {
      coins.push({
        x: Math.random() * canvas.width | 0,
        y: -50,
        dy: 3,
        s: 0.5 + Math.random(),
        state: Math.random() * 10 | 0,
      });
    }
    let i = coins.length;
    while (i--) {
      const { x } = coins[i];
      const { y } = coins[i];
      const { s } = coins[i];
      const { state } = coins[i];
      coins[i].state = (state > 9) ? 0 : state + 0.1;
      coins[i].dy += 0.3;
      coins[i].y += coins[i].dy;

      ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s);

      if (y > canvas.height) {
        coins.splice(i, 1);
      }
    }
  }
}