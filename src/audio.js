const gameSound = document.createElement("audio");
gameSound.setAttribute("src","../assets/christmas.mp3");
gameSound.loop = true;
gameSound.volume = 0.2;
gameSound.autoplay = true;
document.body.appendChild(gameSound);

const playButton = document.createElement("img");
playButton.classList.add("audio");
playButton.setAttribute("src","../assets/music.png");
document.body.appendChild(playButton);

const pauseButton = document.createElement("img");
pauseButton.classList.add("audio","visible");
pauseButton.setAttribute("src","../assets/no-music.png");
document.body.appendChild(pauseButton);

//add event listener
let play = false;

function playAudio()
{
  if (!(play)) return;

	gameSound.load();
	gameSound.play();
  playButton.classList.remove("visible");
  pauseButton.classList.add("visible");
  play = false;
}

function pauseAudio()
{
  if (play) return;
	
  gameSound.pause();
  playButton.classList.add("visible");
  pauseButton.classList.remove("visible");
  play = true;
}

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);