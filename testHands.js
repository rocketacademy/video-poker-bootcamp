/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const printTestHand = (testHand) => {
  for (let i = 0; i < hand.length; i += 1) {
    hand[i] = testHand[i];
    document.querySelectorAll('.unclicked-card')[i].querySelector('.card-name').innerText = `${hand[i].name}`;
    document.querySelectorAll('.unclicked-card')[i].querySelector('.suit-img').src = `vp-img/${hand[i].img}`;
    if (testHand[i].img === 'heart.png' || testHand[i].img === 'diamond.png') {
      document.querySelectorAll('.unclicked-card')[i].querySelector('.suit-img').classList.add('red');
    } else if (document.querySelectorAll('.unclicked-card')[i].querySelector('.suit-img').classList.contains('red')) {
      document.querySelectorAll('.unclicked-card')[i].querySelector('.suit-img').classList.remove('red');
    }
  }
};

// ♠️ ♣️ ❤️ ♦️

const royalFlushHand = [{
  name: 'Q', suit: '♠️', rank: 12, img: 'spade.png',
},
{
  name: '10', suit: '♠️', rank: 10, img: 'spade.png',
},
{
  name: 'K', suit: '♠️', rank: 13, img: 'spade.png',
},
{
  name: 'J', suit: '♠️', rank: 11, img: 'spade.png',
},
{
  name: 'A', suit: '♠️', rank: 1, img: 'spade.png',
}];

const straightFlushHand = [{
  name: '9', suit: '♦️', rank: 9, img: 'diamond.png',
}, {
  name: 'J', suit: '♦️', rank: 11, img: 'diamond.png',
}, {
  name: '7', suit: '♦️', rank: 7, img: 'diamond.png',
}, {
  name: '8', suit: '♦️', rank: 8, img: 'diamond.png',
}, {
  name: '10', suit: '♦️', rank: 10, img: 'diamond.png',
}];

const fourKindHand = [{
  name: '7', suit: '♦️', rank: 7, img: 'diamond.png',
}, {
  name: '7', suit: '❤️', rank: 7, img: 'heart.png',
}, {
  name: '7', suit: '♠️', rank: 7, img: 'spade.png',
}, {
  name: '7', suit: '♣️', rank: 7, img: 'club.png',
}, {
  name: '10', suit: '♦️', rank: 10, img: 'diamond.png',
}];

const fullHouseHand = [{
  name: '6', suit: '♦️', rank: 6, img: 'diamond.png',
}, {
  name: '6', suit: '❤️', rank: 6, img: 'heart.png',
}, {
  name: '6', suit: '♠️', rank: 6, img: 'spade.png',
}, {
  name: '3', suit: '♣️', rank: 3, img: 'club.png',
}, {
  name: '3', suit: '♦️', rank: 3, img: 'diamond.png',
}];

const flushHand = [{
  name: '2', suit: '♦️', rank: 2, img: 'diamond.png',
},
{
  name: '4', suit: '♦️', rank: 4, img: 'diamond.png',
},
{
  name: '9', suit: '♦️', rank: 9, img: 'diamond.png',
},
{
  name: '5', suit: '♦️', rank: 5, img: 'diamond.png',
},
{
  name: 'A', suit: '♦️', rank: 1, img: 'diamond.png',
}];

const straightHand = [{
  name: '5', suit: '♦️', rank: 5, img: 'diamond.png',
}, {
  name: '4', suit: '❤️', rank: 4, img: 'heart.png',
}, {
  name: '3', suit: '♠️', rank: 3, img: 'spade.png',
}, {
  name: '7', suit: '♣️', rank: 7, img: 'club.png',
}, {
  name: '6', suit: '♦️', rank: 6, img: 'diamond.png',
}];

const threeKindHand = [{
  name: '8', suit: '♦️', rank: 8, img: 'diamond.png',
}, {
  name: '2', suit: '❤️', rank: 2, img: 'heart.png',
}, {
  name: '8', suit: '♠️', rank: 8, img: 'spade.png',
}, {
  name: '8', suit: '♣️', rank: 8, img: 'club.png',
}, {
  name: 'Q', suit: '♦️', rank: 12, img: 'diamond.png',
}];

const twoPairsHand = [{
  name: '7', suit: '♦️', rank: 7, img: 'diamond.png',
}, {
  name: 'K', suit: '❤️', rank: 13, img: 'heart.png',
}, {
  name: 'K', suit: '♠️', rank: 13, img: 'spade.png',
}, {
  name: '7', suit: '♣️', rank: 7, img: 'club.png',
}, {
  name: '5', suit: '♦️', rank: 5, img: 'diamond.png',
}];

const jackPairHand = [{
  name: '9', suit: '♦️', rank: 9, img: 'diamond.png',
}, {
  name: 'J', suit: '❤️', rank: 11, img: 'heart.png',
}, {
  name: 'J', suit: '♠️', rank: 11, img: 'spade.png',
}, {
  name: '7', suit: '♣️', rank: 7, img: 'club.png',
}, {
  name: '5', suit: '♦️', rank: 5, img: 'diamond.png',
}];
