// const testElement = document.createElement('p');
// testElement.innerText = 'gRaPhIc DeSiGn iS mY pAsSiOn';
// document.body.appendChild(testElement);

/* WEIRD THINGS APPEARING WHENEVER I COPY AND PASTE CODE FROM W3SCHOOLS 
const { compare } = require("semver");

why the fuck is this here
const { sort } = require("prelude-ls");
*/


const testCard = {
        name: "queen",
        suit: "heart",
        suitSymbol: "♥",
        displayName: "Q",
        colour: "red",
        rank: 12,
      };

const testCard1 = {
        name: "10",
        suit: "heart",
        suitSymbol: "♥",
        displayName: "10",
        colour: "red",
        rank: 10,
      };


// const fakeCard = document.createElement('div');
// fakeCard.innerText = "fake card";
// fakeCard.classList.add('card');
// document.body.appendChild(fakeCard);

const spawnCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add('name', cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('div');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  document.body.appendChild(card);

  return card;
};

// const dummyCard = spawnCard(testCard);
// document.body.appendChild(dummyCard);

const getCardInfo = () => {
  console.log("queen of farts")
  // let x = testCard.activeElement.;
  // document.getElementById("card").innerHTML = x;
  // console.log(x);

}

// dummyCard.addEventListener('click', getCardInfo);



// CARD FACE GENERATION 



// const cardBtmLeft = document.createElement('div');
// cardBtmLeft.classList.add('card-face-btm-left');
// cardBtmLeft.innerText = "A";
// cardBack.appendChild(cardBtmLeft);

// const cardTop = document.createElement('div');
// cardTop.classList.add('card-face-top');
// fakeCardFace.appendChild(cardTop);

// const cardTopLeft = document.createElement('div');
// cardTopLeft.classList.add('card-face-top-left');
// cardTopLeft.innerText = "A";
// cardTop.appendChild(cardTopLeft);

// const cardTopRight = document.createElement('div');
// cardTopRight.classList.add('card-face-top-right');
// cardTopRight.innerText = "A";
// cardTop.appendChild(cardTopRight);

// const cardFaceInfo = document.createElement('div');
// cardFaceInfo.classList.add('card-face-info');
// fakeCardFace.appendChild(cardFaceInfo);

// const cardBtm = document.createElement('div');
// cardBtm.classList.add('card-face-btm');
// fakeCardFace.appendChild(cardBtm);

// const cardBtmLeft = document.createElement('div');
// cardBtmLeft.classList.add('card-face-btm-left');
// cardBtmLeft.innerText = "A";
// cardBtm.appendChild(cardBtmLeft);

// const cardBtmRight = document.createElement('div');
// cardBtmRight.classList.add('card-face-btm-right');
// cardBtmRight.innerText = "A";
// cardBtm.appendChild(cardBtmRight);

const spawnCard2 = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit-elements', cardInfo.colour);

  for (let i = 0; i < cardInfo.rank; i++) {
    suit.innerText += " " + cardInfo.suitSymbol;
  }

  // const name = document.createElement('div');
  // name.classList.add('name', cardInfo.colour);

  // if (cardInfo.displayName === "J") {
  //   name.innerText = `"jack"`;
  //   // name.classList.add('court');
  // } else if (cardInfo.displayName === "Q") {
  //   name.innerText = `"queen"`;
  //   // name.classList.add('court');

  // } else if (cardInfo.displayName === "K") {
  //   name.innerText = `"king"`;
  //   // name.classList.add('court');

  // } else {
  //   name.innerText = cardInfo.displayName;
  // // name.innerText = `"QUEEN"`;
  // }

  const card = document.createElement('div');
  card.classList.add('card-face-container');
  document.body.appendChild(card);

  const cardTop = document.createElement('div');
  cardTop.classList.add('card-face-top');
  card.appendChild(cardTop);

  const cardTopLeft = document.createElement('div');
  cardTopLeft.classList.add('card-face-top-left');
  card.appendChild(cardTopLeft);

  const cardFaceInfo = document.createElement('div');
  cardFaceInfo.classList.add('card-face-info');
  card.appendChild(cardFaceInfo);

  const cardBtm = document.createElement('div');
  cardBtm.classList.add('card-face-btm');
  card.appendChild(cardBtm);

  const cardBtmRight = document.createElement('div');
  cardBtmRight.classList.add('card-face-btm-right');
  cardBtm.appendChild(cardBtmRight);


  cardTopLeft.classList.add(cardInfo.colour);
  cardTopLeft.innerHTML = cardInfo.displayName + "<br />" + cardInfo.suitSymbol;
 
  cardBtmRight.classList.add(cardInfo.colour);
  cardBtmRight.innerHTML = cardInfo.displayName + "<br />" + cardInfo.suitSymbol;


  // card.appendChild(name);
  card.appendChild(suit);

  // cardFaceInfo.appendChild(name);
  cardFaceInfo.appendChild(suit);

  cardContainer.appendChild(card);

  return card;
};

// const difficultLife = spawnCard2(testCard1);

const testCard2 = {
        name: "queen",
        suit: "hearts",
        suitSymbol: "♥️",
        displayName: "Q",
        colour: "red",
        rank: 12,
      };

const testRoyalFlushHand = [
  {name: "ace", suit: "hearts"},
  {name: "king", suit: "hearts"},
  {name: "queen", suit: "hearts"},
  {name: "jack", suit: "hearts"},
  {name: "10", suit: "hearts"}]

const testStraightFlushHand = [
  {name: "3", rank: 3, suit: "hearts"},
  {name: "4", rank: 4, suit: "hearts"},
  {name: "6", rank: 6, suit: "hearts"},
  {name: "2", rank: 2, suit: "hearts"},
  {name: "5", rank: 5, suit: "hearts"}]

const testStraightHand = [
  {name: "ace", rank: 1, suit: "hearts"},
  {name: "king", rank: 13, suit: "clubs"},
  {name: "queen", rank: 12, suit: "spades"},
  {name: "jack", rank: 11, suit: "hearts"},
  {name: "10", rank: 10, suit: "diamonds"}]

const testFourKindHand = [
  {name: "3", suit: "spades"},
  {name: "4", suit: "heart"},
  {name: "3", suit: "diamonds"},
  {name: "3", suit: "heart"},
  {name: "3", suit: "clubs"}]

const testJacksBetterHand = [
  {name: "jack", suit: "spades"},
  {name: "4", suit: "heart"},
  {name: "jack", suit: "diamonds"},
  {name: "3", suit: "heart"},
  {name: "3", suit: "clubs"}]

const testFullHouseHand = [
  {name: "3", rank: 3, suit: "hearts"},
  {name: "3", rank: 3, suit: "spades"},
  {name: "2", rank: 2, suit: "clubs"},
  {name: "3", rank: 3, suit: "clubs"},
  {name: "2", rank: 2, suit: "hearts"}]