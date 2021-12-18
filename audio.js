const muteBtn = document.querySelector('.mute');
const bgMusic = new Audio('sounds/casino-bgm.mp3');
bgMusic.volume = 0.1;
/**
 * Enables play and pause of bgm music
 */
const playPause = () => {
  if (bgMusic.paused) {
    bgMusic.play();
    muteBtn.className = 'unmute';
  } else {
    bgMusic.pause();
    muteBtn.className = 'mute';
  }
};

muteBtn.addEventListener('click', playPause);

/**
 * Plays the insert coin effect when called
 */
const insertCoinEffect = () => {
  const audio = new Audio('sounds/insert-coin.mp3');
  audio.volume = 0.5;
  audio.play();
};
/**
 * Plays the flip card effect when called
 */
const flipEffect = () => {
  const audio = new Audio('sounds/flip-card.mp3');
  audio.play();
};
/**
 * Plays the win sound effect when called
 */
const winSoundEffect = () => {
  const audio = new Audio('sounds/win-sound.mp3');
  audio.volume = 0.1;
  audio.play();
};
/**
 * Plays the lose sound effect when called
 */
const loseSoundEffect = () => {
  const audio = new Audio('sounds/lose-sound.mp3');
  audio.volume = 0.5;
  audio.play();
};
