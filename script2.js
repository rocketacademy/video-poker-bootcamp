// create modal element to buy credits
const buyCreditsBox = document.createElement('div');
buyCreditsBox.classList.add('modal');
document.body.appendChild(buyCreditsBox);

// div for content
const creditsBoxContent = document.createElement('div');
creditsBoxContent.classList.add('modal-content');
buyCreditsBox.appendChild(creditsBoxContent);

// element for close window button
const creditsBoxClose = document.createElement('span');
creditsBoxClose.innerHTML = '&times';
creditsBoxClose.classList.add('close');
creditsBoxContent.appendChild(creditsBoxClose);

const boxHeader = document.createElement('div');
boxHeader.innerHTML = 'BUY CREDITS';
creditsBoxContent.appendChild(boxHeader);

// separate div for each element group in content box
const contentBoxOne = document.createElement('div');
const contentBoxTwo = document.createElement('div');
contentBoxOne.classList.add('content-box');
contentBoxTwo.classList.add('content-box');
creditsBoxContent.appendChild(contentBoxOne);
creditsBoxContent.appendChild(contentBoxTwo);

// element for first image of 100 coins
const creditsBoxImgOne = document.createElement('img');
creditsBoxImgOne.src = '/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/2set-golden-coins-piles-stacks-colorful-glossy-money-realistic-game-assets-row-from-one-coin-big-pile-stock-illustration-isolated-white-background_44769-1728 copy.jpg';
contentBoxOne.appendChild(creditsBoxImgOne);

// element for second image of 500 coins
const creditsBoxImgTwo = document.createElement('img');
creditsBoxImgTwo.src = '/Users/diyanaramlan/Documents/bootcamp/projects/poker/images/set-golden-coins-piles-stacks-colorful-glossy-money-realistic-game-assets-row-from-one-coin-big-pile-stock-illustration-isolated-white-background_44769-1728.jpeg';
creditsBoxImgTwo.classList.add('image-second');
contentBoxTwo.appendChild(creditsBoxImgTwo);

// element for coin text under first and second image
const firstCoinText = document.createElement('div');
const secondCoinText = document.createElement('div');
firstCoinText.innerHTML = '100 COINS';
secondCoinText.innerHTML = '500 COINS';
contentBoxOne.appendChild(firstCoinText);
contentBoxTwo.appendChild(secondCoinText);

// function when buy credit button is clicked
const purchaseCreditEvent = (x) => {
  playerPoints += Number(x);
  creditNumber.innerHTML = playerPoints;
  buyCreditsBox.style.display = 'none';
  output(`Your purchase for ${x} coins is successful!<br>Enter your bet and click deal to play game`);
};

// buttons for each image element
const buy100Button = document.createElement('button');
const buy500Button = document.createElement('button');
buy100Button.innerText = '$1.99';
buy500Button.innerText = '$4.99';
buy100Button.classList.add('button-buy');
buy500Button.classList.add('button-buy');
buy100Button.addEventListener('click', (event) => {
  purchaseCreditEvent(100);
});
buy500Button.addEventListener('click', (event) => {
  purchaseCreditEvent(500);
});
contentBoxOne.appendChild(buy100Button);
contentBoxTwo.appendChild(buy500Button);

// buy credit button
const buyCreditButton = document.createElement('button');
buyCreditButton.classList.add('creditNumber');
buyCreditButton.innerText = 'Buy';

// event listeners for credit window
buyCreditButton.onclick = function () {
  buyCreditsBox.style.display = 'block';
};

creditsBoxClose.onclick = function () {
  buyCreditsBox.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === buyCreditsBox) {
    buyCreditsBox.style.display = 'none';
  }
};

buttonGroupCredit.appendChild(buyCreditButton);
